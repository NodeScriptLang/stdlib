import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    steps: unknown[];
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.2',
    moduleName: 'Flow / Fallback',
    description: 'Runs the steps one-by-one and returns the first non-null result.',
    params: {
        steps: {
            deferred: true,
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
        },
    },
    result: {
        async: true,
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = async (params, ctx) => {
    for (const step of params.steps) {
        const value = await ctx.resolveDeferred(step);
        if (value != null) {
            return value;
        }
    }
    return null;
};
