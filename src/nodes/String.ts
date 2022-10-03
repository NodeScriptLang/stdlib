import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { value: string };
type R = string;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/String',
    label: 'String',
    description: 'Convert value into a string.',
    keywords: ['string', 'text'],
    params: {
        value: {
            schema: { type: 'string' },
        }
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = params => params.value;
