import { GraphEvalContext, ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import {
    determineRequestBody,
    FetchError,
    FetchMethod,
    FetchResponseType,
    headersToObject,
    HttpRequestFailed,
    mergeUrlQuery,
    readResponse,
} from '../lib/web.js';

type P = {
    method: FetchMethod;
    url: string;
    query: Record<string, string | undefined>;
    headers: Record<string, string | undefined>;
    body: any;
    followRedirects: boolean;
    proxyUrl: string;
    throw: boolean;
    retries: number;
    responseType: FetchResponseType;
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '2.1.2',
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
            schema: { type: 'number', default: 1 },
            advanced: true,
        },
        responseType: {
            schema: {
                type: 'string',
                enum: Object.values(FetchResponseType),
                default: FetchResponseType.AUTO,
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
    const { url, retries } = params;
    if (!url.trim()) {
        // Do not send requests to self by default
        return undefined;
    }
    if (!/^https?:\/\//.test(url)) {
        throw new Error('URL must start with http:// or https://');
    }
    const maxAttempts = 1 + (Math.min(Math.max(retries, 0), 10) || 0);
    let lastError = null;
    let delay = 500;
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        try {
            return await sendSingle(params, ctx);
        } catch (error: any) {
            lastError = error;
            // Retry only on 5xx and connection errors
            if (error.status >= 500) {
                await new Promise(r => setTimeout(r, delay));
                delay = Math.max(delay * 2, 5_000);
            } else {
                break;
            }
        }
    }
    throw lastError;
};

interface HttpResponseSpec {
    status: number;
    headers: Record<string, string[]>;
    body: any;
}

async function sendSingle(params: P, ctx: GraphEvalContext): Promise<HttpResponseSpec> {
    const {
        method,
        url,
        query,
        headers,
        body,
        proxyUrl,
        followRedirects,
        responseType = FetchResponseType.AUTO,
    } = params;
    const actualUrl = mergeUrlQuery(url, query);
    const actualHeaders = prepHeaders(headers);
    const [actualBody, contentType] = determineRequestBody(method, body);
    if (contentType && !actualHeaders['content-type']) {
        actualHeaders['content-type'] = contentType;
    }
    const fetchServiceUrl = getAdapterUrl(params, ctx);
    const res = await fetch(fetchServiceUrl + '/request', {
        method: 'POST',
        headers: {
            'x-fetch-method': method,
            'x-fetch-url': actualUrl,
            'x-fetch-headers': JSON.stringify(actualHeaders),
            'x-fetch-follow-redirects': String(followRedirects),
            'x-fetch-proxy': proxyUrl.trim(),
        },
        body: actualBody,
    });
    if (!res.ok) {
        const responseBodyText = await res.text();
        const message = (ctx.lib.parseJson(responseBodyText, {})).message ?? responseBodyText;
        throw new FetchError(res.status, message);
    }
    const status = Number(res.headers.get('x-fetch-status')) || 0;
    const responseHeaders = ctx.lib.parseJson(res.headers.get('x-fetch-headers') ?? '{}', {});
    const isErrorStatus = status === 0 || status >= 400;
    if (params.throw && isErrorStatus) {
        const responseBodyText = await res.text();
        const details = ctx.lib.parseJson(responseBodyText) ?? { response: responseBodyText };
        throw new HttpRequestFailed(status, method, url, details);
    }
    return {
        status,
        headers: headersToObject(responseHeaders),
        body: await readResponse(res, responseType),
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

function getAdapterUrl(params: P, ctx: GraphEvalContext) {
    return ctx.getLocal<string>('FETCH_SERVICE_URL') ?? 'https://fetch.nodescript.dev';
}
