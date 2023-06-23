import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    values: number[];
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.3',
    moduleName: 'Math / Hypot',
    description: `
        Computes N-dimensional hypothenuse (the square root of the sum of squares).
    `,
    params: {
        values: {
            schema: {
                type: 'array',
                items: { type: 'number' },
            },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return Math.hypot(...params.values);
};
