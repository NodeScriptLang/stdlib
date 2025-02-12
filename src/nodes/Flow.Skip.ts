import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    condition: boolean;
    value: unknown;
    token: string;
    message: string;
    status: number;
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'Flow / Skip',
    description: `
    Skips the evaluation if condition is true, otherwise returns the value.
    Skipped evaluation results in a control exception (by default with 204 status).
    The flow can subsequently be resumed with Flow / Continue.
    `,
    params: {
        condition: {
            schema: { type: 'boolean' },
        },
        value: {
            schema: { type: 'any' },
            deferred: true,
        },
        token: {
            schema: { type: 'string', default: '' },
            advanced: true,
        },
        message: {
            schema: { type: 'string', default: 'Evaluation skipped' },
            advanced: true,
        },
        status: {
            schema: { type: 'number', default: 204 },
            advanced: true,
        },
    },
    result: {
        async: true,
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = async (params, ctx) => {
    const { condition, value, token, message, status } = params;
    if (condition) {
        return ctx.skipEvaluation(message, token, status);
    }
    return await ctx.resolveDeferred(value);
};
