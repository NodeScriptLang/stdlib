import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { removeUndefined } from '../lib/util.js';

type P = {
    object: object;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.6',
    moduleName: 'Object / Remove Undefined',
    description: `
        Removes undefined values from the object.
    `,
    params: {
        object: {
            schema: { type: 'any' },
            hideValue: true,
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

export const compute: ModuleCompute<P, R> = params => {
    const { object } = params;
    removeUndefined(object);
};
