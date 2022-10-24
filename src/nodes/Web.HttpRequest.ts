import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { base64ToString, stringToBase64 } from '../lib/base64.js';
import {
    determineRequestBody,
    FetchHeaders,
    FetchMethod,
    getHeaderValue,
} from '../lib/web.js';

type P = {
    method: FetchMethod;
    url: string;
    headers: Record<string, any>;
    body: any;
    followRedirects: boolean;
    proxyUrl: string;
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/Web.HttpRequest',
    version: '1.0.0',
    label: 'Http Request',
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
                enum: Object.values(FetchMethod),
                default: FetchMethod.GET,
            },
        },
        url: {
            schema: { type: 'string' },
        },
        headers: {
            schema: { type: 'object' },
        },
        body: {
            schema: { type: 'any' },
            hideValue: true,
        },
        followRedirects: {
            schema: { type: 'boolean', default: true },
        },
        proxyUrl: {
            schema: { type: 'string' },
        }
    },
    result: {
        async: true,
        schema: { type: 'any' },
    },
    cacheMode: 'always',
    evalMode: 'manual',
};

export const compute: ModuleCompute<P, R> = async params => {
    const { method, url, headers, body, followRedirects, proxyUrl } = params;
    if (!url) {
        // Do not send requests to self by default
        return undefined;
    }
    if (!/^https?:\/\//.test(url)) {
        throw new Error('URL must start with http:// or https://');
    }
    const actualHeaders = prepareHeaders(headers);
    const [actualBody, contentType] = determineRequestBody(method, body);
    if (contentType && !getHeaderValue(actualHeaders, 'Content-Type')) {
        actualHeaders['Content-Type'] = [contentType];
    }
    const fetchServiceUrl = `${getHubUrl()}/Fetch/sendRequest`;
    const proxy = proxyUrl.trim() ? proxyUrl : undefined;
    const request: FetchServiceRequest = {
        url,
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
        result[key] = Array.isArray(value) ? value.map(_ => String(_)) : [String(value)];
    }
    return result;
}

function getHubUrl() {
    const origin = globalThis.location?.origin ?? '';
    if (/\bstaging\.|demo\.|localhost|127.0.0.1\b/.test(origin)) {
        return 'https://fetch.staging.nodescript.dev';
    }
    return 'https://fetch.nodescript.dev';
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
