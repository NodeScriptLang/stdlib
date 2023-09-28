import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: any;
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'String / Remove Diacritics',
    description: `
        Removes diacritic characters (accents, overlays, etc) from a given string.
    `,
    keywords: ['accent', 'sanitize'],
    params: {
        string: {
            schema: { type: 'string' },
        },
    },
    result: {
        schema: {
            type: 'string',
        }
    },
};

export const compute: ModuleCompute<P, R> = params => {
    return params.string.normalize('NFD').replace(/\p{M}/gu, '');
};
