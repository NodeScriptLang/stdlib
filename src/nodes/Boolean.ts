import { Operator } from '@nodescript/core/types';

export const node: Operator<{ value: boolean }, boolean> = {
    metadata: {
        name: '@stdlib/Boolean',
        version: '1.0.0',
        label: 'Boolean',
        description: 'Converts value into a boolean.',
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
