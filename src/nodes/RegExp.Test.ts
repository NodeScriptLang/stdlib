import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { toRegExp } from '../lib/regexp.js';

type P = {
    string: string;
    regexp: any;
};

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.0',
    moduleName: 'RegExp.Test',
    description: 'Tests if a string matches specified regular expression.',
    keywords: ['regex', 'match'],
    params: {
        string: {
            schema: { type: 'string' },
        },
        regexp: {
            schema: { type: 'any' },
        },
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { string } = params;
    const regexp = toRegExp(params.regexp);
    return regexp.test(string);
};
