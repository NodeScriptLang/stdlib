import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { isEmpty } from '../lib/util.js';

type P = { value: unknown };

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.4',
    moduleName: 'Logic / Is Not Empty',
    description: `
        Returns false if the specified value is empty.
        Empty values are: null, undefined, NaN, empty string or an array with 0 length.
    `,
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
    return !isEmpty(params.value);
};
