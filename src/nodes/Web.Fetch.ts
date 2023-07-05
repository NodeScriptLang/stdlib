import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { determineRequestBody, FetchMethod, headersToObject, HttpRequestFailed, mergeUrlQuery } from '../lib/web.js';

type P = {
    method: FetchMethod;
    url: string;
    query: Record<string, string | undefined>;
    headers: Record<string, string | undefined>;
    body: any;
    throw: boolean;
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.5.2',
    moduleName: 'Web / Fetch',
    description: `
        Sends an HTTP request using natively available Fetch API.
        Note: when sent from the browser, the request is subject to Cross-Origin Resource Sharing (CORS) policy,
        along with other limitations. Use HTTP Request node for a general purpose HTTP client.
    `,
    keywords: ['http', 'request'],
    params: {
        method: {
            schema: {
                type: 'string',
                enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
                default: 'GET' as any,
            },
        },
        url: {
            schema: { type: 'string' },
        },
        query: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: { type: 'string', optional: true },
            },
            advanced: true,
        },
        headers: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: { type: 'string', optional: true },
            },
            advanced: true,
        },
        body: {
            schema: { type: 'any' },
            hideValue: true,
            advanced: true,
        },
        throw: {
            schema: { type: 'boolean', default: true },
            advanced: true,
        }
    },
    result: {
        async: true,
        schema: {
            type: 'object',
            properties: {
                status: { type: 'number' },
                url: { type: 'string' },
                headers: {
                    type: 'object',
                    additionalProperties: { type: 'any' },
                },
                body: { type: 'any' },
            }
        },
    },
    cacheMode: 'always',
    evalMode: 'manual',
};

export const compute: ModuleCompute<P, R> = async (params, ctx) => {
    const { method, url, query, headers, body } = params;
    if (!url) {
        // Do not send requests to self by default
        return undefined;
    }
    if (!/^https?:\/\//.test(url)) {
        throw new Error('URL must start with http:// or https://');
    }
    const actualUrl = mergeUrlQuery(url, query);
    const actualHeaders = prepareHeaders(headers);
    const [actualBody, bodyContentType] = determineRequestBody(method, body);
    if (bodyContentType && !actualHeaders.has('Content-Type')) {
        actualHeaders.set('Content-Type', bodyContentType);
    }
    const res = await fetch(actualUrl, {
        method,
        headers: actualHeaders,
        body: actualBody,
    });
    let responseBody = await res.text();
    if (params.throw && !res.ok) {
        const details = ctx.lib.parseJson(responseBody) ?? { response: responseBody };
        throw new HttpRequestFailed(res.status, method, url, details);
    }
    const bodyType = res.headers.get('Content-Type');
    if (bodyType && bodyType.startsWith('application/json')) {
        responseBody = JSON.parse(responseBody);
    }
    return {
        url: res.url,
        status: res.status,
        headers: headersToObject(res.headers),
        body: responseBody,
    };
};

function prepareHeaders(headers: Record<string, unknown>): Headers {
    const entries: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
        if (value === undefined) {
            continue;
        }
        entries[key] = String(value);
    }
    return new Headers(entries);
}
