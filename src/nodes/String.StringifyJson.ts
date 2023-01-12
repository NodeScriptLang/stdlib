import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: any;
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/String.StringifyJson',
    version: '1.0.0',
    label: 'Stringify JSON',
    description: 'Returns a JSON string representation of provided value.',
    keywords: ['string', 'json', 'convert'],
    params: {
        value: {
            schema: { type: 'any' },
        }
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return JSON.stringify(params.value);
};
