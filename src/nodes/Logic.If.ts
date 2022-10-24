import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    condition: boolean;
    positive: unknown;
    negative: unknown;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/Logic.If',
    version: '1.0.0',
    label: 'If',
    description: 'Returns "positive" if specified condition is true, or "negative" otherwise.',
    keywords: ['check', 'condition'],
    params: {
        condition: {
            schema: { type: 'boolean' },
        },
        positive: {
            schema: { type: 'any' },
        },
        negative: {
            schema: { type: 'any' },
        },
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { condition, positive, negative } = params;
    return condition ? positive : negative;
};
