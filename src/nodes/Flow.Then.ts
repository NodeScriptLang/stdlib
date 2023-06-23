import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    step: unknown;
    then: unknown;
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'Flow / Then',
    description: `
    Runs the specified step, discards its result and a "then" value.
    Useful when joining mutliple asynchronous processes together.
    `,
    params: {
        step: {
            deferred: true,
            schema: { type: 'any' },
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
    await ctx.resolveDeferred(params.step);
    return await ctx.resolveDeferred(params.then);
};
