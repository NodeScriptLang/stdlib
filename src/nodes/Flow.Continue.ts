import { SYM_SKIPPED } from '@nodescript/core/runtime';
import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: unknown;
    skipped: unknown;
    token: string;
};

type R = Promise<unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'Flow / Continue',
    description: `
        Evaluates and returns "skipped" if the evaluation of "value"
        was previously skipped with Flow / Skip.
        Otherwise, returns "value" and does not evaluate "skipped".
        If "token" is set, it must match the "token" used on Flow / Skip.
    `,
    params: {
        value: {
            deferred: true,
            schema: { type: 'any' },
        },
        skipped: {
            deferred: true,
            schema: { type: 'any' },
        },
        token: {
            schema: { type: 'string', default: '' },
            advanced: true,
        },
    },
    result: {
        async: true,
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = async (params, ctx) => {
    const { value, skipped, token } = params;
    try {
        return await ctx.resolveDeferred(value);
    } catch (error: any) {
        if (error && error[SYM_SKIPPED]) {
            if (token === '' || error.token === token) {
                return await ctx.resolveDeferred(skipped);
            }
        }
        throw error;
    }
};
