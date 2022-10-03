import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: any;
};

type R = any[];

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/Object.ToPairs',
    label: 'Object To Pairs',
    description: `
        Converts an object into an array of [key, value] pairs.
    `,
    keywords: ['object', 'key', 'value', 'entry', 'entries', 'pairs', 'tuples'],
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
