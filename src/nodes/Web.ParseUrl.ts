import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { parseQueryString } from '../lib/web.js';

type P = {
    url: string;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.0',
    moduleName: 'Web / Parse Url',
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
        schema: {
            type: 'object',
            properties: {
                protocol: { type: 'string' },
                host: { type: 'string' },
                hostname: { type: 'string' },
                port: { type: 'string' },
                pathname: { type: 'string' },
                search: { type: 'string' },
                hash: { type: 'string' },
                origin: { type: 'string' },
                username: { type: 'string' },
                password: { type: 'string' },
            }
        },
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
