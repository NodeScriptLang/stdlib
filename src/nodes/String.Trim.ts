import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { string: string };
type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.4',
    moduleName: 'String / Trim',
    description: 'Removes leading and trailing whitespace from a string.',
    keywords: ['whitespace'],
    params: {
        string: {
            schema: { type: 'string' },
        }
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = params => params.string.trim();
