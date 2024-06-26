import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    conditions: boolean[];
};

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.4',
    moduleName: 'Logic / Or',
    description: 'Returns true if any of the specified conditions are true, or false otherwise.',
    keywords: ['any', 'some'],
    params: {
        conditions: {
            schema: {
                type: 'array',
                items: { type: 'boolean' },
            },
        },
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    for (const condition of params.conditions) {
        if (condition) {
            return true;
        }
    }
    return false;
};
