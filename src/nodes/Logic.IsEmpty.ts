import { Operator } from '@nodescript/core/types';

export const node: Operator<{ value: unknown }, boolean> = {
    metadata: {
        channel: 'stdlib',
        name: 'Logic.IsEmpty',
        version: '1.0.1',
        tags: ['Logic', 'Data', 'Boolean'],
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
        result: { type: 'boolean' },
    },
    compute(params) {
        const { value } = params;
        return (typeof value === 'number' && isNaN(value as number)) ||
            value == null ||
            value === '' ||
            (Array.isArray(value) && value.length === 0);
    }
};
