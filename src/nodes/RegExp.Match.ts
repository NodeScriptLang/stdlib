import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: string;
    regexp: any;
};

type R = any;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.2',
    moduleName: 'RegExp.Match',
    description: `
        Matches a string against a regular expression.
        Returns an array of matched groups, or an empty array if nothing matched.
    `,
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
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { string } = params;
    const regexp = ctx.lib.toRegExp(params.regexp);
    const match = regexp.exec(string);
    return match ?? [];
};
