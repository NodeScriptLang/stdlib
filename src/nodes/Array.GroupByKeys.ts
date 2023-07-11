import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    keys: string[];
    strict: boolean;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Array / Group By Keys',
    description: `
        Groups the array by specified keys.

        If strict is true, entries are compared by value (fast),
        otherwise they are compared structurally (slow),
        in a similar way to Equals.
    `,
    keywords: ['collate'],
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
                items: { type: 'string' },
            },
        },
        strict: {
            schema: { type: 'boolean' },
        },
    },
    result: {
        schema: {
            type: 'array',
            items: { type: 'any' },
        }
    },
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { array, keys, strict } = params;
    const groups: Array<{ key: any; items: any[] }> = [];
    for (const item of array) {
        const groupKey: Record<string, any> = {};
        for (const key of keys) {
            groupKey[key] = ctx.lib.get(item, key);
        }
        const existingGroup = groups.find(g => {
            return strict ? g.key === groupKey : ctx.lib.anyEquals(g.key, groupKey);
        });
        if (existingGroup) {
            existingGroup.items.push(item);
        } else {
            groups.push({ key: groupKey, items: [item] });
        }
    }
    return groups;
};
