import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    key: string;
    value: unknown;
};

type R = Record<string, unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.2',
    moduleName: 'Object.KeyValue',
    description: 'Creates an object with computed key and value.',
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
        }
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
    const { key, value } = params;
    const res = {};
    ctx.set(res, key, value);
    return res;
};
