import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { value: boolean };

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.4',
    moduleName: 'Logic / Not',
    description: 'Returns the negated value of specified boolean.',
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
