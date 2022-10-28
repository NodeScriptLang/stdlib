import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    pairs: any[];
};

type R = any;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/Object.FromPairs',
    version: '1.0.0',
    label: 'Object From Pairs',
    description: `
        Converts an array of [key, value] pairs into an object.
    `,
    keywords: ['object', 'key', 'value', 'entry', 'entries', 'pairs', 'tuples'],
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
