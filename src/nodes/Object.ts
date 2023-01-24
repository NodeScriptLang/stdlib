import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    properties: Record<string, unknown>;
};

type R = Record<string, unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.3.0',
    moduleName: 'Object',
    description: `
        Creates an object with computed values per each key.
        Each key can be a JSON pointer or a dot-delimited path.
    `,
    keywords: ['object', 'key', 'value', 'entries', 'wrap'],
    params: {
        properties: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: { type: 'any' },
            },
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
    const obj: any = {};
    for (const [key, value] of Object.entries(params.properties)) {
        if (key.startsWith('...')) {
            Object.assign(obj, value);
        } else {
            ctx.lib.set(obj, key, value);
        }
    }
    return obj;
};
