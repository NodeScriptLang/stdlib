import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Math.Arctan',
    description: `
        Computes the arctangent of specified angle in radians.
    `,
    keywords: ['arctangent'],
    params: {
        value: {
            schema: { type: 'number' },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return Math.atan(params.value);
};
