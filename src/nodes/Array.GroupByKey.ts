import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    key: string;
    strict: boolean;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'Array / Group By Key',
    description: `
        Groups the array by specified key.
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
            advanced: true,
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
        const existingGroup = groups.find(g => ctx.lib.anyEquals(g.key, groupKey, { strict }));
        if (existingGroup) {
            existingGroup.items.push(item);
        } else {
            groups.push({ key: groupKey, items: [item] });
        }
    }
    return groups;
};
