import { Operator } from '@nodescript/core/types';

import { anyEquals } from '../lib/compare.js';

export const node: Operator<{
    value: unknown;
    cases: Record<string, unknown>;
    default: unknown;
}, unknown> = {
    metadata: {
        channel: 'stdlib',
        name: 'Logic.Switch',
        version: '1.0.0',
        tags: ['Data', 'Logic'],
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
        result: { type: 'any' },
    },
    compute(params) {
        const { value, cases, default: defaultValue } = params;
        for (const [key, result] of Object.entries(cases)) {
            const match = anyEquals(value, key);
            if (match) {
                return result;
            }
        }
        return defaultValue;
    },
};
