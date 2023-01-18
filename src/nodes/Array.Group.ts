import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { anyEquals } from '../lib/compare.js';

type P = {
    array: unknown[];
    keys: unknown[];
    strict: boolean;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/Array.Group',
    version: '1.1.0',
    label: 'Array.Group',
    description: `
        Groups the array by specified keys.
        The array and keys are expected to correspond to each other by index.

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
        schema: {
            type: 'array',
            items: { type: 'any' },
        }
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { array, keys, strict } = params;
    const groups: Array<{ key: any; items: any[] }> = [];
    for (const [index, item] of array.entries()) {
        const groupKey = keys[index];
        const existingGroup = groups.find(g => {
            return strict ? g.key === groupKey : anyEquals(g.key, groupKey);
        });
        if (existingGroup) {
            existingGroup.items.push(item);
        } else {
            groups.push({ key: groupKey, items: [item] });
        }
    }
    return groups;
};
