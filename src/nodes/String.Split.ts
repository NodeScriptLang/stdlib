import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: string;
    separator: any;
};

type R = string[];

export const module: ModuleDefinition<P, R> = {
    version: '1.2.2',
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

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { string, separator } = params;
    const regexp = ctx.lib.toRegExp(separator);
    return string.split(regexp);
};
