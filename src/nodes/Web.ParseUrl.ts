import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { parseQueryString } from '../lib/web.js';

type P = {
    url: string;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/Web.ParseUrl',
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
        schema: { type: 'any' },
    },
};

export const compute: ModuleCompute<P, R> = params => {
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
};
