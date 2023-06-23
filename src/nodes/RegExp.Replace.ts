import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: string;
    regexp: any;
    replacement: string;
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.3',
    moduleName: 'RegExp / Replace',
    description: `
        Replaces all occurrences of a regular expression in a string.
        If the regexp is a string, it is converted to a regular expression with Global flag.
        Use RegExp node to create a regular expression with custom flags.'
    `,
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

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { string, replacement } = params;
    const regexp = ctx.lib.toRegExp(params.regexp);
    return string.replace(regexp, replacement);
};
