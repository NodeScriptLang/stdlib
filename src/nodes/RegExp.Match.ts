import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: string;
    regexp: any;
    flags: string;
};

type R = any;

export const module: ModuleDefinition<P, R> = {
    version: '1.3.0',
    moduleName: 'RegExp / Match',
    description: `
        Matches a string against a regular expression.
        Returns an array of matched groups, or an empty array if nothing matched.
    `,
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
        }
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { string, flags } = params;
    let regexp = ctx.lib.toRegExp(params.regexp);
    if (flags) {
        regexp = new RegExp(regexp.source, flags);
    }
    const match = regexp.exec(string);
    return match ?? [];
};
