import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { stringToBase64 } from '../lib/base64.js';

type P = {
    username: string;
    password: string;
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/Web.BasicAuth',
    label: 'Basic Auth',
    description: `
        Creates a basic HTTP authorization header given a username and a password.
    `,
    keywords: ['web', 'url', 'http', 'authorization'],
    params: {
        username: {
            schema: {
                type: 'string'
            },
        },
        password: {
            schema: {
                type: 'string'
            },
        },
    },
    result: {
        schema: { type: 'string' },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { username, password } = params;
    return `Basic ${stringToBase64(`${username}:${password}`)}`;
};
