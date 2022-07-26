import { Operator } from '@nodescript/core/types';

import { merge } from '../lib/merge.js';

export const node: Operator<{
    objects: unknown[];
}, unknown> = {
    metadata: {
        channel: 'stdlib',
        name: 'Object.Merge',
        version: '1.0.0',
        tags: ['Data', 'Object'],
        label: 'Merge',
        description: 'Recursively merges multiple objects into one.',
        keywords: ['object', 'key', 'value', 'get'],
        params: {
            objects: {
                schema: {
                    type: 'array',
                    items: { type: 'any' },
                },
            },
        },
        result: {
            type: 'object',
        },
    },
    compute(params) {
        const { objects } = params;
        const [first, ...rest] = objects;
        if (rest.length === 0) {
            return first;
        }
        return rest.reduce((a, b) => merge(a, b), first);
    }
};
