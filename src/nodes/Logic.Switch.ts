import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { anyEquals } from '../lib/compare.js';

type P = {
    value: unknown;
    cases: Record<string, unknown>;
    default: unknown;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/Logic.Switch',
    label: 'Switch',
    description: `
        Matches a value against a series of cases and returns the result of the first match.
        The cases are specified as key-value pairs with key indicating a value to match against,
        and the value indicating the result to return.
    `,
    keywords: ['match', 'map', 'select'],
    params: {
        value: {
            schema: { type: 'any' },
        },
        cases: {
            schema: { type: 'object' },
        },
        default: {
            schema: { type: 'any' },
        }
    },
    result: {
        schema: { type: 'any' },
    }
};
export const compute: ModuleCompute<P, R> = params => {
    const { value, cases, default: defaultValue } = params;
    for (const [key, result] of Object.entries(cases)) {
        const match = anyEquals(value, key);
        if (match) {
            return result;
        }
    }
    return defaultValue;
};
