import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    key: string;
    strict: boolean;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Array / Group By Key',
    description: `
        Groups the array by specified key.

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
        key: {
            schema: {
                type: 'string',
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
    const { array, key, strict } = params;
    const groups: Array<{ key: any; items: any[] }> = [];
    for (const item of array) {
        const groupKey = ctx.lib.get(item, key);
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
