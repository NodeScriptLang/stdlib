import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: unknown;
    keys: string[];
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.3.2',
    moduleName: 'Object.Pick',
    description: `
        Picks specified keys from an object.
        Keys can be JSON pointers or dot-delimited paths.
    `,
    keywords: ['object', 'key', 'select', 'allowlist'],
    params: {
        object: {
            schema: { type: 'any' },
        },
        keys: {
            schema: {
                type: 'array',
                items: { type: 'string' },
            },
            hint: {
                pathof: 'object',
            }
        }
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
    const { object, keys } = params;
    const res = {};
    for (const key of keys) {
        const value = ctx.lib.get(object, key);
        if (value !== undefined) {
            ctx.lib.set(res, key, value);
        }
    }
    return res;
};
