import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    items: unknown[];
}, unknown[]> = {
    metadata: {
        label: 'Array',
        description: 'Creates an array with computed items.',
        category: ['Data'],
        params: {
            items: {
                schema: {
                    type: 'array',
                    items: { type: 'any' }
                },
            }
        },
        result: {
            type: 'array',
            items: { type: 'any' },
        },
    },
    compute(params) {
        return params.items;
    }
};
