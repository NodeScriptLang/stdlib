import { Operator } from '@nodescript/core/types';

import { base64ToBuffer, base64ToString } from '../lib/base64.js';

export const node: Operator<{
    value: string;
    algorithm: string;
    output: 'string' | 'binary';
}, any> = {
    metadata: {
        channel: 'stdlib',
        name: 'String.Base64Decode',
        version: '1.2.1',
        tags: ['Data', 'String'],
        label: 'Base64 Decode',
        description: 'Decodes a Base64-encoded string into UTF-8 or a byte buffer.',
        keywords: ['string', 'text', 'decode', 'base64', 'binary'],
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
            output: {
                schema: {
                    type: 'string',
                    enum: ['string', 'binary'],
                    default: 'string',
                }
            },
        },
        result: { type: 'string' },
    },
    compute(params) {
        const { value, algorithm, output } = params;
        const urlMode = algorithm === 'base64url';
        return output === 'string' ?
            base64ToString(value, urlMode) :
            base64ToBuffer(value, urlMode);
    }
};
