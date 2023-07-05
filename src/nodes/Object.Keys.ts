import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: any;
};

type R = string[];

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Object / Keys',
    description: `
        Creates an array consisting of object keys.
    `,
    params: {
        object: {
            schema: { type: 'any' },
        },
    },
    result: {
        schema: {
            type: 'array',
            items: { type: 'string' },
        },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { object } = params;
    return Object.keys(object);
};
