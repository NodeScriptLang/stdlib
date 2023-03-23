import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    key: string;
    value: unknown;
    raw: boolean;
};

type R = Record<string, unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.4.0',
    moduleName: 'Object / Key Value',
    description: 'Creates an object with computed key and value. If raw is specified, the key is interpreted as-is.',
    keywords: ['object', 'key', 'value', 'entries', 'wrap'],
    params: {
        key: {
            schema: {
                type: 'string',
            },
        },
        value: {
            schema: {
                type: 'any',
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
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { key, value, raw } = params;
    const res: any = {};
    if (raw) {
        res[key] = value;
    } else {
        ctx.lib.set(res, key, value);
    }
    return res;
};
