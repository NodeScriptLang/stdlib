import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';


type P = {
    a: unknown;
    b: unknown;
    strict: boolean;
};

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.2',
    moduleName: 'Logic.Equals',
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

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { a, b, strict } = params;
    return ctx.lib.anyEquals(a, b, { strict });
};
