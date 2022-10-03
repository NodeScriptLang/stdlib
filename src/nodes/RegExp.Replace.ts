import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { toRegExp } from '../lib/regexp.js';

type P = {
    string: string;
    regexp: any;
    replacement: string;
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/RegExp.Replace',
    label: 'RegExp Replace',
    description: `
        Replaces all occurrences of a regular expression in a string.
        If the regexp is a string, it is converted to a regular expression with Global flag.
        Use RegExp node to create a regular expression with custom flags.'
    `,
    keywords: ['regex', 'match', 'replace'],
    params: {
        string: {
            schema: { type: 'string' },
        },
        regexp: {
            schema: { type: 'any' },
        },
        replacement: {
            schema: { type: 'string' },
        },
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { string, replacement } = params;
    const regexp = toRegExp(params.regexp);
    return string.replace(regexp, replacement);
};
