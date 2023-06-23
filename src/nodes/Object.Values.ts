import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: any;
};

type R = any[];

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'Object / Values',
    description: `
        Creates an array consisting of object values.
    `,
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
    return Object.values(object);
};
