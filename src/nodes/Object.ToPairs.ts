import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: any;
};

type R = any[];

export const module: ModuleDefinition<P, R> = {
    version: '1.1.3',
    moduleName: 'Object / To Pairs',
    description: `
        Converts an object into an array of [key, value] pairs.
    `,
    keywords: ['entries', 'tuples'],
    params: {
        object: {
            schema: { type: 'any' },
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
    const { object } = params;
    return Object.entries(object);
};
