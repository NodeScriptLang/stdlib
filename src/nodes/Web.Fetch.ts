import { Operator } from '@nodescript/core/types';

import { determineRequestBody, FetchMethod, headersToObject } from '../lib/web.js';

export const node: Operator<{
    method: FetchMethod;
    url: string;
    headers: Record<string, any>;
    body: any;
}, Promise<unknown>> = {
    metadata: {
        channel: 'stdlib',
        name: 'Web.Fetch',
        version: '1.0.4',
        tags: ['Web'],
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
            headers: {
                schema: { type: 'object' },
            },
            body: {
                schema: { type: 'any' },
                hideValue: true,
            },
        },
        result: {
            type: 'any',
        },
        async: true,
        cacheMode: 'always',
        evalMode: 'manual',
    },
    async compute(params) {
        const { method, url, headers, body } = params;
        if (!url) {
            // Do not send requests to self by default
            return undefined;
        }
        if (!/^https?:\/\//.test(url)) {
            throw new Error('URL must start with http:// or https://');
        }
        const actualHeaders = new Headers(headers);
        const [actualBody, bodyContentType] = determineRequestBody(method, body);
        if (bodyContentType && !actualHeaders.has('Content-Type')) {
            actualHeaders.set('Content-Type', bodyContentType);
        }
        const res = await fetch(url, {
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
    }
};
