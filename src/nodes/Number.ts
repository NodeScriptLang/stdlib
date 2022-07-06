import { Operator } from '@nodescript/core/types';

export const node: Operator<{ value: number }, number> = {
    metadata: {
        name: '@stdlib/Number',
        version: '1.0.0',
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
