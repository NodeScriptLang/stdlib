import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';
import { set } from '@nodescript/pointer';

type P = {
    object: any;
    mutations: Record<string, unknown>;
};

type R = Record<string, unknown>;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/Object.Mutate',
    version: '1.0.0',
    label: 'Mutate Object',
    description: `
        Mutates the specified object by assigning specified key-value entries to it.
        Each key can be a JSON pointer or a dot-delimited path.
    `,
    keywords: ['object', 'key', 'value', 'entries', 'wrap'],
    params: {
        object: {
            schema: { type: 'any' },
        },
        mutations: {
            schema: { type: 'object' },
        }
    },
    result: {
        schema: { type: 'object' },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const obj = params.object;
    for (const [key, value] of Object.entries(params.mutations)) {
        set(obj, key, value);
    }
    return obj;
};
