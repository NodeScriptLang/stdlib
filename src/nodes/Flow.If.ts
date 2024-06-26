import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    condition: boolean;
    positive: unknown;
    negative: unknown;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.3',
    moduleName: 'Flow / If',
    description: 'Returns "positive" if specified condition is true, or "negative" otherwise.',
    keywords: ['check', 'condition'],
    params: {
        condition: {
            schema: { type: 'boolean' },
        },
        positive: {
            deferred: true,
            schema: { type: 'any' },
        },
        negative: {
            deferred: true,
            schema: { type: 'any' },
        },
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { condition, positive, negative } = params;
    return condition ?
        ctx.resolveDeferred(positive) :
        ctx.resolveDeferred(negative);
};
