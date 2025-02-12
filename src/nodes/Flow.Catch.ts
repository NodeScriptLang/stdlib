import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: unknown;
};

type R = Promise<{
    value?: unknown;
    error?: unknown;
}>;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.2',
    moduleName: 'Flow / Catch',
    description: `
        Computes the value and catches the error it produces.
        Returns an object with either "value" or "error",
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
                value: { type: 'any', optional: true },
                error: { type: 'any', optional: true },
            }
        },
    }
};

export const compute: ModuleCompute<P, R> = async (params, ctx) => {
    try {
        const value = await ctx.resolveDeferred(params.value);
        return { value };
    } catch (error: any) {
        if (ctx.isControlException(error)) {
            throw error;
        }
        return {
            error: {
                name: error?.name ?? '',
                message: error?.message ?? '',
                ...error,
            },
        };
    }
};
