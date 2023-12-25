import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { value: string };
type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.7',
    moduleName: 'String',
    description: 'Convert value into a string.',
    resizeMode: 'all',
    params: {
        value: {
            schema: { type: 'string' },
            attributes: {
                renderer: 'textarea',
                valuePlaceholder: 'Value',
            },
        },
    },
    result: {
        schema: { type: 'string' },
    },
};

export const compute: ModuleCompute<P, R> = params => params.value;
