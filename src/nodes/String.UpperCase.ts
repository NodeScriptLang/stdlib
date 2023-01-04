import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { string: string };
type R = string;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/String.UpperCase',
    version: '1.0.0',
    label: 'Upper Case',
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
