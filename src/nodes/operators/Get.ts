import { Operator } from '@nodescript/core/types';

import { getValue } from '../../lib/object.js';

export const node: Operator<{
    object: unknown;
    key: string;
}, unknown> = {
    metadata: {
        channel: 'stdlib',
        name: 'Get',
        version: '1.0.0',
        tags: ['Data', 'Object'],
        label: 'Object',
        description: 'Gets a value at specified key. Key can also be a JSON pointer or dot-delimited path.',
        keywords: ['object', 'key', 'value', 'get'],
        params: {
            object: {
                schema: { type: 'any', },
            },
            key: {
                schema: { type: 'string', kind: 'key' },
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
