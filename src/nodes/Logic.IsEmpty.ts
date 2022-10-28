import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = { value: unknown };

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/Logic.IsEmpty',
    version: '1.0.0',
    label: 'Is Empty',
    description: `
        Returns true if the specified value is empty.
        Empty values are: null, undefined, NaN, empty string or an array with 0 length.
    `,
    keywords: ['check'],
    params: {
        value: {
            schema: { type: 'any' },
        },
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { value } = params;
    return (typeof value === 'number' && isNaN(value as number)) ||
        value == null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);
};
