import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: boolean;
};

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.4',
    moduleName: 'Boolean',
    description: 'Converts value into a boolean.',
    keywords: ['true', 'false'],
    params: {
        value: {
            schema: {
                type: 'boolean',
            },
        }
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return params.value;
};
