import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    a: number;
    b: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.4',
    moduleName: 'Math / Add',
    description: `
        Computes a + b.
    `,
    keywords: ['plus', 'sum'],
    params: {
        a: {
            schema: { type: 'number' },
        },
        b: {
            schema: { type: 'number' },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return params.a + params.b;
};
