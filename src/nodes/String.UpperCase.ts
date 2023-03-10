import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { string: string };
type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.1',
    moduleName: 'String.UpperCase',
    description: 'Transforms a string to upper case.',
    keywords: [],
    params: {
        string: {
            schema: { type: 'string' },
        }
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = params => params.string.toUpperCase();
