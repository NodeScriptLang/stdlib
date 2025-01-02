import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Array / Reverse',
    description: `
        Returns a new array with elements in reversed order.
    `,
    keywords: ['invert', 'flip'],
    params: {
        array: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
            hideEntries: true,
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
    const { array } = params;
    return [...array].reverse();
};
