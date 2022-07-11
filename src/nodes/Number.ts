import { Operator } from '@nodescript/core/types';

export const node: Operator<{ value: number }, number> = {
    metadata: {
        channel: 'stdlib',
        name: 'Number',
        version: '1.0.0',
        tags: ['Data', 'Number', 'Math'],
        label: 'Number',
        description: 'Converts value into a number.',
        params: {
            value: {
                schema: { type: 'number' },
            }
        },
        result: { type: 'number' },
    },
    compute(params) {
        return params.value;
    }
};
