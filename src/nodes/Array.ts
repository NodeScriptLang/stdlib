import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    items: unknown[];
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.0.4',
    moduleName: 'Array',
    description: 'Creates an array with computed items.',
    keywords: ['list'],
    params: {
        items: {
            schema: {
                type: 'array',
                items: { type: 'any' }
            },
        }
    },
    result: {
        schema: {
            type: 'array',
            items: { type: 'any' },
        }
    },
};

export const compute: ModuleCompute<P, R> = params => {
    return params.items;
};
