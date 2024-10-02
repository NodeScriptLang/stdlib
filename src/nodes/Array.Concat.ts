import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    arrays: unknown[][];
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Array / Concat',
    description: `
        Merges multiple arrays into a single array.
    `,
    keywords: ['concatenate', 'merge'],
    params: {
        arrays: {
            schema: {
                type: 'array',
                items: {
                    type: 'array',
                    items: { type: 'any' },
                },
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

export const compute: ModuleCompute<P, R> = params => {
    return params.arrays.flat(1);
};
