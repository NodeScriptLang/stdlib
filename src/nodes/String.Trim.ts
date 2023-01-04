import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { string: string };
type R = string;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/String.Trim',
    version: '1.0.0',
    label: 'Trim String',
    description: 'Removes leading and trailing whitespace from a string.',
    keywords: ['string', 'text', 'whitespace', 'space'],
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
