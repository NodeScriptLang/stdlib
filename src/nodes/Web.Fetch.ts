import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { determineRequestBody, FetchMethod, headersToObject, mergeUrlQuery } from '../lib/web.js';

type P = {
    method: FetchMethod;
    url: string;
    query: Record<string, string>;
    headers: Record<string, any>;
    body: any;
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = /* @__PURE__ */ {
    moduleId: '@stdlib/Web.Fetch',
    version: '1.1.2',
    label: 'Fetch',
    description: `
        Sends an HTTP request using natively available Fetch API.
        Note: when sent from the browser, the request is subject to Cross-Origin Resource Sharing (CORS) policy,
        along with other limitations. Use HTTP Request node for a general purpose HTTP client.
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
        query: {
            schema: {
                type: 'object',
                additionalProperties: { type: 'string' },
            },
        },
        headers: {
            schema: { type: 'object' },
        },
        body: {
            schema: { type: 'any' },
            hideValue: true,
        },
    },
    result: {
        async: true,
        schema: {
            type: 'any',
        },
    },
    cacheMode: 'always',
    evalMode: 'manual',
};

export const compute: ModuleCompute<P, R> = async params => {
    const { method, url, query, headers, body } = params;
    if (!url) {
        // Do not send requests to self by default
        return undefined;
    }
    if (!/^https?:\/\//.test(url)) {
        throw new Error('URL must start with http:// or https://');
    }
    const actualUrl = mergeUrlQuery(url, query);
    const actualHeaders = new Headers(headers);
    const [actualBody, bodyContentType] = determineRequestBody(method, body);
    if (bodyContentType && !actualHeaders.has('Content-Type')) {
        actualHeaders.set('Content-Type', bodyContentType);
    }
    const res = await fetch(actualUrl, {
        method,
        headers: actualHeaders,
        body: actualBody,
    });
    const bodyType = res.headers.get('Content-Type');
    let responseBody = await res.text();
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
