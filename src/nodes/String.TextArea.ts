import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { value: string };
type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'String / Text Area',
    description: 'Creates a multi-line string',
    keywords: ['multiline'],
    resizeMode: 'all',
    params: {
        value: {
            schema: { type: 'string' },
            attributes: {
                renderer: 'textarea',
                valuePlaceholder: 'Value'
            },
        },
    },
    result: {
        schema: { type: 'string' },
    },
};

export const compute: ModuleCompute<P, R> = params => params.value;
