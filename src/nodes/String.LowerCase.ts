import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { string: string };
type R = string;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/String.LowerCase',
    version: '1.1.0',
    label: 'String.LowerCase',
    description: 'Transforms a string to lower case.',
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

export const compute: ModuleCompute<P, R> = params => params.string.toLowerCase();
