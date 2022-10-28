import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: any;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/Array.Length',
    version: '1.0.0',
    label: 'Array Length',
    description: `
        Returns the length of an array.
    `,
    keywords: ['size', 'count'],
    params: {
        array: {
            schema: { type: 'any' },
        },
    },
    result: {
        schema: {
            type: 'number',
        }
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { array } = params;
    if (array) {
        if (typeof array.length === 'number') {
            return array.length;
        }
        if (typeof array.byteLength === 'number') {
            return array.byteLength;
        }
        if (typeof array.size === 'number') {
            return array.size;
        }
    }
    return 0;
};
