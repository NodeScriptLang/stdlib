import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { chunk } from '../lib/chunk.js';

type P = {
    array: unknown[];
    size: number;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Array / Chunk',
    description: `
        Creates an array of items split into sub-arrays of specified size.
        If the array cannot be split evenly, the final chunk will contain the remaining elements.
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
    return chunk(array, size);
};
