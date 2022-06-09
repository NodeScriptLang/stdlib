import { Operator } from '@nodescript/core/types';

export const node: Operator<{ value: boolean }, boolean> = {
    metadata: {
        label: 'Boolean',
        description: 'Converts value into a boolean.',
        category: ['Data'],
        params: {
            value: {
                schema: {
                    type: 'boolean',
                },
            }
        },
        result: { type: 'boolean' },
    },
    compute(params) {
        return params.value;
    }
};
