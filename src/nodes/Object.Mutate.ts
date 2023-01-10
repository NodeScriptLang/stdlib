import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: any;
    key: string;
    value: any;
};

type R = Record<string, unknown>;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/Object.Mutate',
    version: '1.2.0',
    label: 'Mutate Object',
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
        schema: { type: 'object' },
    },
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { object, key, value } = params;
    ctx.set(object, key, value);
    return object;
};
