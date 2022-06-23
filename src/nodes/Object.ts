import { Operator } from '@nodescript/core/types';

import { setValue } from '../lib/object.js';

export const node: Operator<{
    properties: Record<string, unknown>;
}, Record<string, unknown>> = {
    metadata: {
        label: 'Object',
        description: 'Creates an object with computed values per each key.',
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
