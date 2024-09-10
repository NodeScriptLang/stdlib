import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';


type P = {
    string: string;
    regexp: any;
    flags: string;
};

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    version: '1.3.0',
    moduleName: 'RegExp / Test',
    description: 'Tests if a string matches specified regular expression.',
    keywords: ['match'],
    params: {
        string: {
            schema: { type: 'string' },
        },
        regexp: {
            schema: { type: 'any' },
        },
        flags: {
            schema: {
                type: 'string',
                description: 'If specified, overrides the flags of the regular expression.'
            },
            advanced: true,
        },
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { string, flags } = params;
    let regexp = ctx.lib.toRegExp(params.regexp);
    if (flags) {
        regexp = new RegExp(regexp.source, flags);
    }
    return regexp.test(string);
};
