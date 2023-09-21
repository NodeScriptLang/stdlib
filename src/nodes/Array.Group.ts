import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    keys: unknown[];
    strict: boolean;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.2.5',
    moduleName: 'Array / Group',
    description: `
        Groups the array by specified keys.
        The array items and keys are expected to correspond to each other by index.
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
                items: { type: 'any' },
            },
            hideEntries: true,
        },
        strict: {
            schema: { type: 'boolean' },
            advanced: true,
        }
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
    for (const [index, item] of array.entries()) {
        const groupKey = keys[index];
        const existingGroup = groups.find(g => ctx.lib.anyEquals(g.key, groupKey, { strict }));
        if (existingGroup) {
            existingGroup.items.push(item);
        } else {
            groups.push({ key: groupKey, items: [item] });
        }
    }
    return groups;
};
