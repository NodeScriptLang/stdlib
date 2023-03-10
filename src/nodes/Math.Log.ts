import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: number;
    base: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'Math.Log',
    description: `
        Computes the logarithm of specified value.
    `,
    keywords: ['logarithm'],
    params: {
        value: {
            schema: { type: 'number' },
        },
        base: {
            schema: { type: 'number', default: 2 },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return Math.log(params.value) / Math.log(params.base);
};
