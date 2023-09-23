import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    baseUrl: string;
    protocol?: string;
    host?: string;
    port?: number;
    pathname?: string;
    search?: any;
    hash?: string;
    username?: string;
    password?: string;
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'Web / Url',
    description: `
        Creates a URL with specified components.
    `,
    params: {
        baseUrl: {
            schema: { type: 'string' },
        },
        protocol: {
            schema: { type: 'string', optional: true },
            advanced: true,
        },
        host: {
            schema: { type: 'string', optional: true },
            advanced: true,
        },
        port: {
            schema: { type: 'number', optional: true },
            advanced: true,
        },
        pathname: {
            schema: { type: 'string', optional: true },
            advanced: true,
        },
        search: {
            schema: { type: 'any', optional: true },
            advanced: true,
        },
        hash: {
            schema: { type: 'string', optional: true },
            advanced: true,
        },
        username: {
            schema: { type: 'string', optional: true },
            advanced: true,
        },
        password: {
            schema: { type: 'string', optional: true },
            advanced: true,
        },
    },
    result: {
        schema: {
            type: 'string',
        },
    },
};

const keys = ['protocol', 'host', 'port', 'pathname', 'search', 'hash', 'username', 'password'];

export const compute: ModuleCompute<P, R> = params => {
    const url = createInitialUrl(params);
    for (const key of keys) {
        const val = (params as any)[key];
        if (val) {
            (url as any)[key] = val;
        }
    }
    return url.href;
};

function createInitialUrl(params: P) {
    const { baseUrl, protocol, host } = params;
    if (baseUrl) {
        return new URL(baseUrl);
    }
    if (protocol && host) {
        return new URL(protocol + '//' + host);
    }
    throw new InvalidArgumentsError('Either baseUrl or protocol + host must be specified');
}

class InvalidArgumentsError extends Error {
    override name = this.constructor.name;
    status = 500;
}
