import { Operator } from '@nodescript/core/types';

import { anyEquals } from '../lib/compare.js';

type Group = [unknown, unknown[]];

export const node: Operator<{
    array: unknown[];
    keys: unknown[];
    strict: boolean;
}, unknown[]> = {
    metadata: {
        channel: 'stdlib',
        name: 'Array.Group',
        version: '1.0.1',
        tags: ['Array', 'Data'],
        label: 'Group',
        description:
            'Groups the array by specified keys, collating elements index-wise. ' +
            'Both array and keys should have the same size. ' +
            'If strict is true, entries are compared by value (fast), ' +
            'otherwise they are compared structurally (slow), ' +
            'in a similar way to Equals.',
        keywords: ['group', 'collate'],
        params: {
            array: {
                schema: {
                    type: 'array',
                    items: { type: 'any' },
                },
                hideEntries: true,
            },
            keys: {
                schema: {
                    type: 'array',
                    items: { type: 'any' },
                },
                hideEntries: true,
            },
            strict: {
                schema: { type: 'boolean' },
            }
        },
        result: {
            type: 'array',
            items: { type: 'any' },
        },
    },
    compute(params) {
        const { array, keys, strict } = params;
        const groups: Group[] = [];
        for (const [i, item] of array.entries()) {
            const key = keys[i];
            let group = groups.find(_ => strict ? _[0] === key : anyEquals(_[0], key));
            if (!group) {
                group = [key, []];
                groups.push(group);
            }
            group[1].push(item);
        }
        return groups;
    }
};
