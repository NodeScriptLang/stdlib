import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    pairs: any[];
};

type R = any;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.4',
    moduleName: 'Object / From Pairs',
    description: `
        Converts an array of [key, value] pairs into an object.
    `,
    keywords: ['entries', 'tuples'],
    params: {
        pairs: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
        },
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { pairs } = params;
    return Object.fromEntries(pairs);
};
