import { Operator } from '@nodescript/core/types';

import { decodeBase64 } from '../lib/base64.js';

export const node: Operator<{ value: string }, string> = {
    metadata: {
        channel: 'stdlib',
        name: 'String.Base64Decode',
        version: '1.0.0',
        tags: ['Data', 'String'],
        label: 'Base64 Decode',
        description: 'Decodes a string from Base64 into UTF-8.',
        keywords: ['string', 'text'],
        params: {
            value: {
                schema: {
                    type: 'string',
                },
            }
        },
        result: { type: 'string' },
    },
    compute(params) {
        return decodeBase64(params.value);
    }
};
