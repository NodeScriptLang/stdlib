import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { value: string };
type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.4',
    moduleName: 'Text',
    description: 'Creates a multi-line string constant.',
    keywords: ['string', 'multiline', 'text'],
    params: {
        value: {
            schema: { type: 'string' },
            attributes: {
                renderer: 'textarea',
            },
        },
    },
    result: {
        schema: { type: 'string' },
    },
};

export const compute: ModuleCompute<P, R> = params => params.value;
