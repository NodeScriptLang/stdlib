import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { value: string };
type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'String',
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
