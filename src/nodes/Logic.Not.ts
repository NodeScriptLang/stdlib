import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { value: boolean };

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/Not',
    label: 'Not',
    description: 'Returns the negated value of specified boolean.',
    keywords: ['check', 'null', 'undefined'],
    params: {
        value: {
            schema: { type: 'boolean' },
        },
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { value } = params;
    return !value;
};
