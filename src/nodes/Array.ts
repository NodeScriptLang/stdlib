import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    items: unknown[];
}, unknown[]> = {
    metadata: {
        channel: 'stdlib',
        name: 'Array',
        version: '1.0.0',
        tags: ['Data', 'Array'],
        label: 'Array',
        description: 'Creates an array with computed items.',
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
