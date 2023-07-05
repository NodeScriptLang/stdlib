import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    a: number;
    b: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.3',
    moduleName: 'Math / Subtract',
    description: `
        Computes a - b.
    `,
    keywords: ['minus'],
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
    return params.a - params.b;
};
