import { FetchMethod, GraphEvalContext, ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { withRetry } from '../lib/retry.js';
import { removeUndefined } from '../lib/util.js';
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
    responseType: FetchResponseType;
    followRedirects: boolean;
    proxyUrl: string;
    throw: boolean;
    retries: number;
    timeout?: number;
    ca?: string;
    ciphers?: string;
    rejectUnauthorized?: boolean;
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '2.7.1',
    moduleName: 'Web / Http Request',
    description: `
        Sends an HTTP request using backend-powered HTTP client.
        The request is not subject to CORS limitations of the browser
        and can be used to specify and access arbitrary request/response headders.
    `,
    keywords: ['fetch'],
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
        responseType: {
            schema: {
                type: 'string',
                enum: ['auto', 'json', 'text', 'binary'] as FetchResponseType[],
                default: 'auto',
            },
            advanced: true,
        },
        followRedirects: {
            schema: { type: 'boolean', default: true },
            advanced: true,
        },
        proxyUrl: {
            schema: { type: 'string' },
            advanced: true,
        },
        throw: {
            schema: { type: 'boolean', default: true },
            advanced: true,
        },
        retries: {
            schema: { type: 'number', default: 0 },
            advanced: true,
        },
        timeout: {
            schema: { type: 'number', optional: true },
            advanced: true,
        },
        ca: {
            schema: { type: 'string', optional: true },
            advanced: true,
        },
        ciphers: {
            schema: { type: 'string', optional: true },
            advanced: true,
        },
        rejectUnauthorized: {
            schema: { type: 'boolean', optional: true },
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
    const { url, retries = 0 } = params;
    if (!url.trim()) {
        // Do not send requests to self by default
        return undefined;
    }
    if (!/^https?:\/\//.test(url)) {
        throw new Error('URL must start with http:// or https://');
    }
    return await withRetry(() => sendSingle(params, ctx), {
        retries,
        initialDelay: 500,
        maxDelay: 5000,
    });
};

interface HttpResponseSpec {
    status: number;
    headers: Record<string, string[]>;
    body: any;
    latency: number;
}

async function sendSingle(params: P, ctx: GraphEvalContext): Promise<HttpResponseSpec> {
    const startedAt = Date.now();
    const {
        method,
        url,
        query,
        headers,
        body,
        responseType = 'auto',
        proxyUrl,
    } = params;
    const actualHeaders = prepHeaders(headers);
    const [actualBody, contentType] = determineRequestBody(method, body);
    if (contentType && !actualHeaders['content-type']) {
        actualHeaders['content-type'] = contentType;
    }
    const actualUrl = mergeUrlQuery(url, query);
    const res = await ctx.lib.fetch({
        method,
        url: actualUrl,
        headers: actualHeaders,
        connectOptions: removeUndefined({
            ca: params.ca ?? undefined,
            ciphers: params.ciphers ?? undefined,
            rejectUnauthorized: params.rejectUnauthorized ?? undefined,
        }),
        followRedirects: params.followRedirects,
        proxy: proxyUrl.trim(),
        timeout: params.timeout ?? 120_000,
    }, actualBody);
    const status = res.status;
    const responseHeaders = res.headers;
    const isErrorStatus = status === 0 || status >= 400;
    if (params.throw && isErrorStatus) {
        const responseBodyText = await res.body.text();
        const details = ctx.lib.parseJson(responseBodyText) ?? { response: responseBodyText };
        throw new HttpRequestFailed(status, method, url, details);
    }
    return {
        status,
        headers: convertResponseHeaders(responseHeaders),
        body: await readResponse(res, responseType),
        latency: Date.now() - startedAt,
    };
}

function prepHeaders(headers: Record<string, unknown>): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
        if (value === undefined) {
            continue;
        }
        result[key] = String(value);
    }
    return result;
}

function convertResponseHeaders(
    headers: Record<string, string | string[]>
): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(headers)) {
        result[key] = Array.isArray(value) ? value : [value];
    }
    return result;
}
