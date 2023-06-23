import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: any[];
    value: any;
    from: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'Array / Index Of',
    description: `
        Returns the index of specified in the array, or -1 if the value does not exist in the array.
    `,
    keywords: [],
    params: {
        array: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
        },
        value: {
            schema: { type: 'any' },
        },
        from: {
            schema: { type: 'number', default: 0 },
        },
    },
    result: {
        schema: {
            type: 'number',
        }
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { array, value, from } = params;
    return array.indexOf(value, from);
};
