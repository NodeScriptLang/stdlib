import { Operator } from '@nodescript/core/types';

import { anyEquals } from '../lib/compare.js';

export const node: Operator<{
    array: unknown[];
    strict: boolean;
}, unknown[]> = {
    metadata: {
        channel: 'stdlib',
        name: 'Array.Unique',
        version: '1.0.0',
        tags: ['Array', 'Data'],
        label: 'Array Unique',
        description:
            'Returns an array consisting of unique items. ' +
            'If strict is true, entries are compared by value (fast), otherwise they are compared structurally (slow), ' +
            'in a similar way to Equals.',
        keywords: ['unique', 'deduplicate'],
        params: {
            array: {
                schema: {
                    type: 'array',
                    items: { type: 'any' },
                },
            },
            strict: {
                schema: {
                    type: 'boolean',
                    default: true,
                },
            }
        },
        result: {
            type: 'array',
            items: { type: 'any' },
        },
    },
    compute(params) {
        const { array, strict } = params;
        if (strict) {
            const set = new Set(array);
            return [...set];
        }
        const result = [];
        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            let found = false;
            for (let j = i + 1; j < array.length; j++) {
                if (anyEquals(item, array[j])) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                result.push(item);
            }
        }
        return result;
    }
};
