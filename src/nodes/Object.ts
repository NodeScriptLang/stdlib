import { Operator } from '@nodescript/core/types';

import { setValue } from '../lib/object.js';

export const node: Operator<{
    properties: Record<string, unknown>;
}, Record<string, unknown>> = {
    metadata: {
        channel: 'stdlib',
        name: 'Object',
        version: '1.0.0',
        tags: ['Data', 'Object'],
        label: 'Object',
        description:
            'Creates an object with computed values per each key. ' +
            'Each key can be a JSON pointer or a dot-delimited path.',
        keywords: ['object', 'key', 'value', 'entries', 'wrap'],
        params: {
            properties: {
                schema: {
                    type: 'object',
                },
            }
        },
        result: {
            type: 'object',
        },
    },
    compute(params) {
        const obj: any = {};
        for (const [key, value] of Object.entries(params.properties)) {
            setValue(obj, key, value);
        }
        return obj;
    }
};
