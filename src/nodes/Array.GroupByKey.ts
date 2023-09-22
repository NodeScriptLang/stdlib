import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    key: string;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.1.0',
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
    },
    result: {
        schema: {
            type: 'array',
            items: { type: 'any' },
        }
    },
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { array, key } = params;
    const groups = new Map<any, any[]>();
    for (const item of array) {
        const groupKey = ctx.lib.get(item, key);
        const existingGroup = groups.get(groupKey);
        if (existingGroup) {
            existingGroup.push(item);
        } else {
            groups.set(groupKey, [item]);
        }
    }
    return [...groups].map(([key, items]) => ({ key, items }));
};
