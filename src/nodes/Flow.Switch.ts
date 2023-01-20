import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { anyEquals } from '../lib/compare.js';

type P = {
    value: string;
    cases: Record<string, unknown>;
    default: unknown;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.0',
    moduleName: 'Flow.Switch',
    description: `
        Matches a value against a series of cases and returns the result of the first match.
        The cases are specified as key-value pairs with key indicating a value to match against,
        and the value indicating the result to return.
    `,
    keywords: ['match', 'map', 'select'],
    params: {
        value: {
            schema: { type: 'string' },
        },
        cases: {
            deferred: true,
            schema: { type: 'object' },
        },
        default: {
            deferred: true,
            schema: { type: 'any' },
        }
    },
    result: {
        schema: { type: 'any' },
    }
};
export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { value } = params;
    for (const [key, result] of Object.entries(params.cases)) {
        const match = anyEquals(value, key);
        if (match) {
            return ctx.resolveDeferred(result);
        }
    }
    return ctx.resolveDeferred(params.default);
};
