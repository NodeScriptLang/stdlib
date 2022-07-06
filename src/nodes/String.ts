import { Operator } from '@nodescript/core/types';

export const node: Operator<{ value: string }, string> = {
    metadata: {
        name: '@stdlib/String',
        version: '1.0.0',
        label: 'String',
        description: 'Converts value into a string.',
        params: {
            value: {
                schema: {
                    type: 'string',
                },
            }
        },
        result: { type: 'string' },
    },
    compute(params) {
        return params.value;
    }
};
