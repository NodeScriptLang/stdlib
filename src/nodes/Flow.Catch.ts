import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: unknown;
};

type R = Promise<{
    result?: unknown;
    error?: unknown;
}>;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Flow / Catch',
    description: `
        Computes the value and catches the error it produces.
        Returns an object with either "result" or "error",
        depending on whether the "value" threw an error or not.
    `,
    params: {
        value: {
            deferred: true,
            schema: {
                type: 'any',
            },
        },
    },
    result: {
        async: true,
        schema: {
            type: 'object',
            properties: {
                result: { type: 'any', optional: true },
                error: { type: 'any', optional: true },
            }
        },
    }
};

export const compute: ModuleCompute<P, R> = async (params, ctx) => {
    try {
        const value = await ctx.resolveDeferred(params.value);
        return { value };
    } catch (error) {
        return { error };
    }
};
