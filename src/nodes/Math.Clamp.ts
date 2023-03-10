import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: number;
    min: number;
    max: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Math.Clamp',
    description: `
        Returns a value clamped to inclusive range of min and max.
    `,
    keywords: [],
    params: {
        value: {
            schema: { type: 'number' },
        },
        min: {
            schema: { type: 'number' },
        },
        max: {
            schema: { type: 'number' },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return Math.min(Math.max(params.value, params.min), params.max);
};
