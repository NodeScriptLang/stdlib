import { Operator } from '@nodescript/core/types';

import { getValue } from '../lib/object.js';

export const node: Operator<{
    object: unknown;
    key: string;
}, unknown> = {
    metadata: {
        channel: 'stdlib',
        name: 'Object.Get',
        version: '1.0.1',
        tags: ['Data', 'Object'],
        label: 'Get',
        labelParam: 'key',
        description: `
            Gets a value at specified key.
            Key can be a JSON pointer or a dot-delimited path.
        `,
        keywords: ['object', 'key', 'value', 'get'],
        params: {
            object: {
                schema: { type: 'any' },
            },
            key: {
                schema: { type: 'string' },
            }
        },
        result: {
            type: 'object',
        },
    },
    compute(params) {
        return getValue(params.object, params.key);
    }
};
