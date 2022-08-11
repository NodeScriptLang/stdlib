import { Operator } from '@nodescript/core/types';

import { Base64Algorithm, decodeBase64 } from '../lib/base64.js';

export const node: Operator<{
    value: string;
    algorithm: Base64Algorithm;
}, string> = {
    metadata: {
        channel: 'stdlib',
        name: 'String.Base64Decode',
        version: '1.1.1',
        tags: ['Data', 'String'],
        label: 'Base64 Decode',
        description: 'Decodes a string from Base64 into UTF-8.',
        keywords: ['string', 'text'],
        params: {
            value: {
                schema: {
                    type: 'string',
                },
            },
            algorithm: {
                schema: {
                    type: 'string',
                    enum: ['base64', 'base64url'],
                    default: 'base64',
                }
            },
        },
        result: { type: 'string' },
    },
    compute(params) {
        return decodeBase64(params.value, params.algorithm);
    }
};
