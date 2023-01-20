import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { toRegExp } from '../lib/regexp.js';

type P = {
    string: string;
    separator: any;
};

type R = string[];

export const module: ModuleDefinition<P, R> = {
    version: '1.1.0',
    moduleName: 'String.Split',
    description: `
        Splits a string into multiple components delimited with specified separator.
        Separator can be either a string or a regular expression.
    `,
    keywords: ['string', 'text', 'separate'],
    params: {
        string: {
            schema: {
                type: 'string',
            },
        },
        separator: {
            schema: { type: 'any' },
        },
    },
    result: {
        schema: {
            type: 'array',
            items: { type: 'string' },
        }
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { string, separator } = params;
    const regexp = toRegExp(separator);
    return string.split(regexp);
};
