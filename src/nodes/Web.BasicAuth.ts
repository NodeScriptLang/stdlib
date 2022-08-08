import { Operator } from '@nodescript/core/types';

import { encodeBase64 } from '../lib/base64.js';

export const node: Operator<{
    username: string;
    password: string;
}, string> = {
    metadata: {
        channel: 'stdlib',
        name: 'Web.BasicAuth',
        version: '1.0.0',
        tags: ['Data', 'Web'],
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
            type: 'string',
        },
    },
    compute(params) {
        const { username, password } = params;
        return `Basic ${encodeBase64(`${username}:${password}`)}`;
    }
};
