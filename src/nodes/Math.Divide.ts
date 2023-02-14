import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    a: number;
    b: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Math.Divide',
    description: `
        Computes a / b.
    `,
    keywords: ['over', 'fraction'],
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
    return params.a / params.b;
};
