import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: any;
    key: string;
    value: any;
};

type R = Record<string, unknown>;

export const module: ModuleDefinition<P, R> = {
    version: '1.3.1',
    moduleName: 'Object.Mutate',
    description: `
        Mutates the specified object by assigning the specified key-value to it.
        The key can be a JSON pointer or a dot-delimited path.
    `,
    keywords: ['object', 'key', 'value', 'entries', 'wrap'],
    params: {
        object: {
            schema: { type: 'any' },
        },
        key: {
            schema: { type: 'string' },
            hint: { pathof: 'object' },
        },
        value: {
            schema: { type: 'any' },
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
    const { object, key, value } = params;
    ctx.set(object, key, value);
    return object;
};
