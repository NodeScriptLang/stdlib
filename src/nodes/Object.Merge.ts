import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    objects: unknown[];
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.3.4',
    moduleName: 'Object / Merge',
    description: 'Recursively merges multiple objects into one.',
    params: {
        objects: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
        },
    },
    result: {
        schema: {
            type: 'object',
            properties: {},
            additionalProperties: { type: 'any' },
        },
    },
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { objects } = params;
    const [first, ...rest] = objects;
    if (rest.length === 0) {
        return first;
    }
    return rest.reduce((a, b) => ctx.lib.merge(a, b), first);
};
