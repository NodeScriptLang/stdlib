import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { value: unknown };

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.2',
    moduleName: 'Logic.IsNull',
    description: 'Returns true if the specified value is null, undefined or NaN.',
    keywords: ['check', 'null', 'undefined'],
    params: {
        value: {
            schema: { type: 'any' },
        },
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { value } = params;
    return typeof value === 'number' ? isNaN(value) : value == null;
};
