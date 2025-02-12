import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    steps: unknown[];
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.0',
    moduleName: 'Flow / Try',
    description: `Runs the steps one-by-one and returns the first result that doesn't throw an error.`,
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
    let lastError = null;
    for (const step of params.steps) {
        try {
            return await ctx.resolveDeferred(step);
        } catch (error: any) {
            if (ctx.isControlException(error)) {
                throw error;
            }
            lastError = error;
        }
    }
    if (lastError) {
        throw lastError;
    }
    return undefined;
};
