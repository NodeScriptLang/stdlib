import { base64ToString, stringToBase64 } from '@nodescript/binary-utils';
import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import {
    determineRequestBody,
    FetchHeaders,
    FetchMethod,
    getHeaderValue,
    HttpRequestFailed,
    mergeUrlQuery,
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
    adapterUrl: string;
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.5.0',
    moduleName: 'Web.HttpRequest',
    description: `
        Sends an HTTP request using backend-powered HTTP client.
        The request is not subject to CORS limitations of the browser
        and can be used to specify and access arbitrary request/response headders.
    `,
    keywords: ['http', 'request', 'send'],
    params: {
        method: {
            schema: {
                type: 'string',
                enum: ['GET', 'POST', 'PUT', 'DELETE'],
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
        adapterUrl: {
            schema: { type: 'string', default: 'https://fetch.nodescript.dev' },
            advanced: true,
        },
    },
    result: {
        async: true,
        schema: { type: 'any' },
    },
    cacheMode: 'always',
    evalMode: 'manual',
};

export const compute: ModuleCompute<P, R> = async (params, ctx) => {
    const { method, url, query, headers, body, proxyUrl, followRedirects, adapterUrl } = params;
    if (!url) {
        // Do not send requests to self by default
        return undefined;
    }
    if (!/^https?:\/\//.test(url)) {
        throw new Error('URL must start with http:// or https://');
    }
    const actualUrl = mergeUrlQuery(url, query);
    const actualHeaders = prepareHeaders(headers);
    const [actualBody, contentType] = determineRequestBody(method, body);
    if (contentType && !getHeaderValue(actualHeaders, 'Content-Type')) {
        actualHeaders['Content-Type'] = [contentType];
    }
    const fetchServiceUrl = `${adapterUrl}/Fetch/sendRequest`;
    const proxy = proxyUrl.trim() ? proxyUrl : undefined;
    const request: FetchServiceRequest = {
        url: actualUrl,
        method,
        headers: actualHeaders,
        bodyBase64: actualBody ? stringToBase64(actualBody) : undefined,
        followRedirects,
        proxy,
    };
    const res = await fetch(fetchServiceUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            request
        }),
    });
    const json = await res.json();
    const response: FetchServiceResponse = json.response;
    const responseBodyText = base64ToString(response.bodyBase64);
    if (params.throw && response.status >= 400) {
        const details = ctx.lib.parseJson(responseBodyText) ?? { response: responseBodyText };
        throw new HttpRequestFailed(response.status, method, url, details);
    }
    const isJson = (getHeaderValue(response.headers, 'Content-Type') ?? '').includes('application/json');
    const responseBody = isJson ? JSON.parse(responseBodyText) : responseBodyText;
    return {
        url: response.url,
        status: response.status,
        headers: response.headers,
        body: responseBody,
    };
};

function prepareHeaders(headers: Record<string, unknown>): FetchHeaders {
    const result: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(headers)) {
        if (value === undefined) {
            continue;
        }
        result[key] = Array.isArray(value) ? value.map(_ => String(_)) : [String(value)];
    }
    return result;
}

interface FetchServiceRequest {
    method: string;
    url: string;
    headers: FetchHeaders;
    bodyBase64?: string;
    followRedirects?: boolean;
    proxy?: string;
}

interface FetchServiceResponse {
    status: number;
    url: string;
    headers: FetchHeaders;
    bodyBase64: string;
}
