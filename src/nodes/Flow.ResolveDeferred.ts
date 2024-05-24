import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: unknown;
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.3',
    moduleName: 'Flow / Resolve Deferred',
    description: 'Resolves a deferred value.',
    keywords: ['deferred'],
    params: {
        value: {
            schema: { type: 'any' },
            hideValue: true,
        },
    },
    result: {
        schema: { type: 'any' },
        async: true,
    },
};

export const compute: ModuleCompute<P, R> = async (params, ctx) => {
    const { value } = params;
    return await ctx.resolveDeferred(value);
};
