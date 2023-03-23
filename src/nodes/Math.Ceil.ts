import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Math / Ceil',
    description: `
        Rounds the closest integer number not below the specified value.
    `,
    keywords: ['round'],
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
    return Math.ceil(params.value);
};
