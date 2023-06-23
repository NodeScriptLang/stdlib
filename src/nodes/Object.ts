import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    properties: Record<string, unknown>;
    raw: boolean;
};

type R = Record<string, unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.4.1',
    moduleName: 'Object',
    description: `
        Creates an object with computed values per each key.
        If raw is false, key can be a JSON pointer or a dot-delimited path.
        If raw is true, key is interpreted as-is.
    `,
    params: {
        properties: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: { type: 'any' },
            },
        },
        raw: {
            schema: {
                type: 'boolean',
                default: false,
            },
            advanced: true,
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
    const { properties, raw } = params;
    const obj: any = {};
    for (const [key, value] of Object.entries(properties)) {
        if (key.startsWith('...')) {
            Object.assign(obj, value);
        } else if (raw) {
            obj[key] = value;
        } else {
            ctx.lib.set(obj, key, value);
        }
    }
    return obj;
};
