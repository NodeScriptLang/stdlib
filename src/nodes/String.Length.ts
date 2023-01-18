import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: any;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/String.Length',
    version: '1.1.0',
    label: 'String.Length',
    description: `
        Returns the length of a string.
    `,
    keywords: ['size', 'count'],
    params: {
        string: {
            schema: { type: 'string' },
        },
    },
    result: {
        schema: {
            type: 'number',
        }
    },
};

export const compute: ModuleCompute<P, R> = params => params.string.length;
