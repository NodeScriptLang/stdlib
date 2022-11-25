import { stringToBase64 } from '@flexent/binary-utils';
import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    username: string;
    password: string;
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/Web.BasicAuth',
    version: '1.0.0',
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
