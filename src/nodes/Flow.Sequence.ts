import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    steps: unknown[];
};

type R = Promise<unknown[]>;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.4',
    moduleName: 'Flow / Sequence',
    description: 'Runs the steps sequentialy and returns an array of their result.',
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
        schema: {
            type: 'array',
            items: { type: 'any' },
        },
    }
};

export const compute: ModuleCompute<P, R> = async (params, ctx) => {
    const results = [];
    for (const step of params.steps) {
        const value = await ctx.resolveDeferred(step);
        results.push(value);
    }
    return results;
};
