import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { a: string; b: string };
type R = boolean;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'String / Starts With',
    description: 'Determines whether string "b" appears at the start of string "a".',
    params: {
        a: {
            schema: { type: 'string' },
        },
        b: {
            schema: { type: 'string' },
        },
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { a, b } = params;
    return a.startsWith(b);
};
