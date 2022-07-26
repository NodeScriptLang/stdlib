import { Operator } from '@nodescript/core/types';

import { anyEquals } from '../lib/compare.js';

export const node: Operator<{
    a: unknown;
    b: unknown;
    strict: boolean;
}, boolean> = {
    metadata: {
        channel: 'stdlib',
        name: 'Logic.Equals',
        version: '1.0.0',
        tags: ['Logic', 'Data', 'Boolean'],
        label: 'Equals',
        description: 'Checks if two values are structurally equal.',
        keywords: ['check', 'equal', 'compare'],
        params: {
            a: {
                schema: { type: 'any' },
            },
            b: {
                schema: { type: 'any' },
            },
            strict: {
                schema: { type: 'boolean', default: false, },
            },
        },
        result: { type: 'boolean' },
    },
    compute(params) {
        const { a, b, strict } = params;
        return anyEquals(a, b, { strict });
    }
};
