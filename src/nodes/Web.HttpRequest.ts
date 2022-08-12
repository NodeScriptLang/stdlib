import { Operator } from '@nodescript/core/types';

import { base64ToString, stringToBase64 } from '../lib/base64.js';
import {
    determineRequestBody,
    FetchHeaders,
    FetchMethod,
    getHeaderValue,
} from '../lib/web.js';

export const node: Operator<{
    method: FetchMethod;
    url: string;
    headers: Record<string, any>;
    body: any;
    followRedirects: boolean;
    proxyUrl: string;
}, Promise<unknown>> = {
    metadata: {
        channel: 'stdlib',
        name: 'Web.HttpRequest',
        version: '1.1.0',
        tags: ['Web'],
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
            type: 'any',
        },
        async: true,
        cacheMode: 'always',
        evalMode: 'manual',
    },
    async compute(params) {
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
    }
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
    if (/\blocalhost|127.0.0.1\b/.test(origin)) {
        return 'http://localhost:8080';
    }
    if (/\bstaging|demo\b/.test(origin)) {
        return 'https://hub.staging.nodescript.dev';
    }
    return 'https://hub.nodescript.dev';
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
