import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';
import { get, set } from '@nodescript/pointer';

type P = {
    object: unknown;
    keys: string[];
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/Object.Pick',
    version: '1.0.0',
    label: 'Pick',
    description: `
        Picks specified keys from an object.
        Keys can be JSON pointers or dot-delimited paths.
    `,
    keywords: ['object', 'key', 'select', 'allowlist'],
    params: {
        object: {
            schema: { type: 'any' },
        },
        keys: {
            schema: {
                type: 'array',
                items: { type: 'string' },
            },
            hint: {
                pathof: 'object',
            }
        }
    },
    result: {
        schema: { type: 'object' },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { object, keys } = params;
    const res = {};
    for (const key of keys) {
        const value = get(object, key);
        if (value !== undefined) {
            set(res, key, value);
        }
    }
    return res;
};
