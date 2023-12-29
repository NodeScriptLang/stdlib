import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    size: number;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'Array / Chunk',
    description: `
        Creates an array of items split into sub-arrays of specified size.
        If an array cannot be split evenly, the final chunk contain the remaining elements.
    `,
    params: {
        array: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
            hideEntries: true,
        },
        size: {
            schema: {
                type: 'number',
                default: 1,
            },
        },
    },
    result: {
        schema: {
            type: 'array',
            items: {
                type: 'any',
            },
        },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { array, size } = params;
    const result: unknown[] = [];
    let i = 0;
    while (i < array.length) {
        result.push(array.slice(i, i + size));
        i += size;
    }
    return result;
};
