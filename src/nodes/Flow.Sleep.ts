import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    ms: number;
    then: unknown;
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Flow / Sleep',
    description: `
    Pauses execution for specified number of milliseconds, then resolves and returns the "then" value.
    `,
    evalMode: 'manual',
    params: {
        ms: {
            schema: { type: 'number', default: 1000 },
        },
        then: {
            deferred: true,
            schema: { type: 'any' },
        },
    },
    result: {
        async: true,
        schema: {
            type: 'array',
            items: { type: 'any' },
        },
    }
};

export const compute: ModuleCompute<P, R> = async (params, ctx) => {
    await new Promise(resolve => setTimeout(resolve, params.ms));
    return await ctx.resolveDeferred(params.then);
};
