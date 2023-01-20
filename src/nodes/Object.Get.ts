import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: unknown;
    key: string;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.0',
    moduleName: 'Object.Get',
    labelParam: 'key',
    description: `
        Gets a value at specified key.
        Key can be a JSON pointer or a dot-delimited path.
    `,
    keywords: ['object', 'key', 'value', 'get'],
    params: {
        object: {
            schema: { type: 'any' },
        },
        key: {
            schema: { type: 'string' },
            hint: {
                pathof: 'object',
            }
        }
    },
    result: {
        schema: { type: 'any' },
    },
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    return ctx.get(params.object, params.key);
};
