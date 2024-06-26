import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    token: string;
    prefix: string;
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.4',
    moduleName: 'Web / Bearer Auth',
    description: `
        Creates a Bearer token HTTP authorization header.
    `,
    params: {
        token: {
            schema: {
                type: 'string'
            },
        },
        prefix: {
            schema: {
                type: 'string',
                default: 'Bearer',
            },
            advanced: true,
        },
    },
    result: {
        schema: { type: 'string' },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { token, prefix } = params;
    return [prefix, token].join(' ');
};
