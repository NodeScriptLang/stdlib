import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { anyEquals } from '../lib/compare.js';

type P = {
    a: unknown;
    b: unknown;
    strict: boolean;
};

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/Logic.Equals',
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
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { a, b, strict } = params;
    return anyEquals(a, b, { strict });
};
