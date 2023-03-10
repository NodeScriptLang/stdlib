import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { value: number };
type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Number',
    description: 'Converts value into a number.',
    keywords: ['number', 'integer', 'parse'],
    params: {
        value: {
            schema: { type: 'number' },
        }
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => params.value;
