import { Operator } from '@nodescript/core/types';

import { parseQueryString } from '../lib/web.js';

export const node: Operator<{
    url: string;
}, unknown> = {
    metadata: {
        channel: 'stdlib',
        name: 'Web.ParseURL',
        version: '1.0.0',
        tags: ['Data', 'Web', 'Parse', 'String'],
        label: 'Parse URL',
        description: `
            Parses a specified URL and allows accessing its specific components
            (protocol, hostname, port, pathname, search, hash, etc.).
        `,
        keywords: ['web', 'url', 'parse'],
        params: {
            url: {
                schema: { type: 'string' },
            },
        },
        result: {
            type: 'any',
        },
    },
    compute(params) {
        const { url } = params;
        const {
            protocol,
            host,
            hostname,
            port,
            pathname,
            search,
            hash,
            origin,
            username,
            password,
        } = new URL(url);
        const query = parseQueryString(search);
        return {
            protocol,
            origin,
            host,
            hostname,
            port,
            pathname,
            search,
            query,
            hash,
            username,
            password,
        };
    }
};