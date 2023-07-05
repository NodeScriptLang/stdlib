import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { string: string };
type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.4',
    moduleName: 'String / Upper Case',
    description: 'Transforms a string to upper case.',
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
