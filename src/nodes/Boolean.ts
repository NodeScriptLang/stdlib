import { Operator } from '@nodescript/core/types';

export const node: Operator<{ value: boolean }, boolean> = {
    metadata: {
        channel: 'stdlib',
        name: 'Boolean',
        version: '1.0.0',
        tags: ['Data', 'Boolean'],
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
