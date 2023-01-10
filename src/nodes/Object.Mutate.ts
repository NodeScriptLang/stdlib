import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';
import { set } from '@nodescript/pointer';

type P = {
    object: any;
    key: string;
    value: any;
};

type R = Record<string, unknown>;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/Object.Mutate',
    version: '1.1.0',
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

export const compute: ModuleCompute<P, R> = params => {
    const { object, key, value } = params;
    set(object, key, value);
    return object;
};
