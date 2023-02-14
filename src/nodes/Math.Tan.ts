import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Math.Tan',
    description: `
        Computes the tangent of specified number.
    `,
    keywords: ['tangent'],
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
    return Math.tan(params.value);
};
