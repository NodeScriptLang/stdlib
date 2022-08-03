import { Operator } from '@nodescript/core/types';

import { anyEquals } from '../lib/compare.js';
import { getValue } from '../lib/object.js';

export const node: Operator<{
    array: unknown[];
    keys: Record<string, string>;
    strict: boolean;
}, unknown[]> = {
    metadata: {
        channel: 'stdlib',
        name: 'Array.GroupBy',
        version: '1.0.0',
        tags: ['Array', 'Data'],
        label: 'Group By',
        description: `
            Groups the array by specified keys.
            Keys are specified as key-value entries
            with values being either dot-separated paths or JSON pointers.

            If strict is true, entries are compared by value (fast),
            otherwise they are compared structurally (slow),
            in a similar way to Equals.
        `,
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
                    type: 'object',
                    additionalProperties: { type: 'string' },
                },
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
        const groups: any[] = [];
        for (const item of array.values()) {
            const groupKey: any = {};
            for (const [key, pointer] of Object.entries(keys)) {
                const val = getValue(item, pointer);
                groupKey[key] = val;
            }
            const existingGroup = groups.find(g => {
                return Object.keys(groupKey).every(k => {
                    return strict ? g[k] === groupKey[k] : anyEquals(g[k], groupKey[k]);
                });
            });
            if (existingGroup) {
                existingGroup.items.push(item);
            } else {
                groups.push({ ...groupKey, items: [item] });
            }
        }
        return groups;
    }
};
