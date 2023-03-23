import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: string;
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Reg Exp / Escape',
    description: `
        Escapes the characters that have special meaning in regular expressions.
        Used to create regular expressions that match characters like dot, question mark, dollar sign,
        curly and square brackets, parentheses, etc.
    `,
    keywords: ['regex', 'string', 'escape'],
    params: {
        string: {
            schema: { type: 'string' },
        },
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return params.string
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d');
};
