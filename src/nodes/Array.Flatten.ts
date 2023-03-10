import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[][];
    depth: number;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.1.1',
    moduleName: 'Array.Flatten',
    description: `
        Returns an array with all sub-array elements concatenated into it recursively up to the specified depth.
    `,
    keywords: ['subsequence', 'sublist'],
    params: {
        array: {
            schema: {
                type: 'array',
                items: {
                    type: 'array',
                    items: { type: 'any' },
                },
            },
        },
        depth: {
            schema: {
                type: 'number',
                default: 1,
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
    const { array, depth } = params;
    return array.flat(depth);
};
