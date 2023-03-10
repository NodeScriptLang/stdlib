import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: number;
    exponent: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Math.Power',
    description: `
        Computes value to the power of exponent.
    `,
    keywords: ['exponentiation'],
    params: {
        value: {
            schema: { type: 'number' },
        },
        exponent: {
            schema: { type: 'number' },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return Math.pow(params.value, params.exponent);
};
