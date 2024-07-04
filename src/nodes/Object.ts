import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    properties: Record<string, unknown>;
};

type R = Record<string, unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.5.1',
    moduleName: 'Object',
    description: `
        Creates an object with computed values per each key.
        Key can be a JSON pointer or a dot-delimited path.
    `,
    params: {
        properties: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: { type: 'any' },
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
    const { properties } = params;
    const obj: any = {};
    for (const [key, value] of Object.entries(properties)) {
        if (key.startsWith('...')) {
            Object.assign(obj, value);
        } else {
            ctx.lib.set(obj, key, value);
        }
    }
    return obj;
};
