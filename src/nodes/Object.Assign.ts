import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    objects: unknown[];
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.2',
    moduleName: 'Object / Assign',
    description: `
        Copies properties of each specified object onto the first one.
    `,
    keywords: ['object', 'assign', 'copy'],
    params: {
        objects: {
            schema: {
                type: 'array',
                items: {
                    type: 'any',
                }
            },
        },
    },
    result: {
        schema: {
            type: 'any',
        },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { objects } = params;
    return Object.assign({}, ...objects);
};
