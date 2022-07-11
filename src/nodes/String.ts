import { Operator } from '@nodescript/core/types';

export const node: Operator<{ value: string }, string> = {
    metadata: {
        channel: 'stdlib',
        name: 'String',
        version: '1.0.0',
        tags: ['Data', 'String'],
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
