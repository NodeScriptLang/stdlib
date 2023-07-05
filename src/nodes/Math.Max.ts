import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    values: number[];
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.4',
    moduleName: 'Math / Max',
    description: `
        Computes the maximum of specified numbers.
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
    return Math.max(...params.values);
};
