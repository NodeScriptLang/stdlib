import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.3',
    moduleName: 'Math / Arcsin',
    description: `
        Computes the arcsine of specified angle in radians.
    `,
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
    return Math.asin(params.value);
};
