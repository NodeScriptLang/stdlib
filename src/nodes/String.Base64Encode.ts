import { Operator } from '@nodescript/core/types';

import { encodeBase64 } from '../lib/base64.js';

export const node: Operator<{ value: string }, string> = {
    metadata: {
        channel: 'stdlib',
        name: 'String.Base64Encode',
        version: '1.0.0',
        tags: ['Data', 'String'],
        label: 'Base64 Encode',
        description: 'Encodes a UTF-8 string into Base64.',
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
        return encodeBase64(params.value);
    }
};
