import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    conditions: boolean[];
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.1.0',
    moduleName: 'Array.Filter',
    description: `
        Returns items of specified array for which the corresponding condition is true.
        The array and conditions are expected to correspond to each other by index.
    `,
    keywords: ['find', 'all'],
    params: {
        array: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
            hideEntries: true,
        },
        conditions: {
            schema: {
                type: 'array',
                items: { type: 'boolean' },
            },
            hideEntries: true,
        },
    },
    result: {
        schema: {
            type: 'array',
            items: { type: 'any' },
        },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { array, conditions } = params;
    const res: any[] = [];
    for (const [i, item] of array.entries()) {
        if (conditions[i]) {
            res.push(item);
        }
    }
    return res;
};
