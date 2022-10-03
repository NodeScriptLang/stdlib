import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { getValue } from '../lib/object.js';

type P = {
    object: unknown;
    key: string;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/Object.Get',
    label: 'Get',
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
        }
    },
    result: {
        schema: { type: 'object' },
    },
    attributes: {
        edgeUxRole: 'Get',
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return getValue(params.object, params.key);
};
