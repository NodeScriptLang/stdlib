import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { isNull } from '../lib/util.js';

type P = { value: unknown };

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.4',
    moduleName: 'Logic / Is Null',
    description: 'Returns true if the specified value is null, undefined or NaN.',
    params: {
        value: {
            schema: { type: 'any' },
        },
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return isNull(params.value);
};
