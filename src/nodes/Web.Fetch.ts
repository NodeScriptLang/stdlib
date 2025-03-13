import { FetchMethod, ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import {
    determineRequestBody,
    FetchResponseType,
    HttpRequestFailed,
    mergeUrlQuery,
    readResponse,
} from '../lib/web.js';

type P = {
    method: FetchMethod;
    url: string;
    query: Record<string, string | string[] | undefined>;
    headers: Record<string, string | undefined>;
    body: any;
    throw: boolean;
    responseType: FetchResponseType;
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.8.0',
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
                additionalProperties: { type: 'any', optional: true },
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
        },
        responseType: {
            schema: {
                type: 'string',
                enum: ['auto', 'json', 'text', 'binary'] as FetchResponseType[],
                default: 'auto',
            },
            advanced: true,
        },
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
    const startedAt = Date.now();
    const {
        method,
        url,
        query,
        headers,
        body,
        responseType = 'auto',
    } = params;
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
    if (params.throw && !res.ok) {
        const responseBody = await res.text();
        const details = ctx.lib.parseJson(responseBody) ?? { response: responseBody };
        throw new HttpRequestFailed(res.status, method, url, details);
    }
    const resHeaders = convertResponseHeaders(res.headers);
    const resBody = await readResponse({
        status: res.status,
        headers: resHeaders,
        body: res,
    }, responseType);
    return {
        url: res.url,
        status: res.status,
        headers: resHeaders,
        body: resBody,
        latency: Date.now() - startedAt,
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

function convertResponseHeaders(headers: Headers) {
    const result: Record<string, string[]> = {};
    for (const [key, value] of headers) {
        result[key.toLowerCase()] = Array.isArray(value) ? value : [value];
    }
    return result;
}
