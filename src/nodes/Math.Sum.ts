import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    items: any[];
}, number> = {
    metadata: {
        channel: 'stdlib',
        name: 'Math.Sum',
        version: '1.0.0',
        tags: ['Data', 'Math', 'Number'],
        label: 'Sum',
        description: `
        Computes a sum of specified items.
        Each item can either be a number or an array of numbers.
        Non-numbers are ignored.
        `,
        keywords: ['plus', 'add', 'sum'],
        params: {
            items: {
                schema: {
                    type: 'array',
                    items: { type: 'any' },
                },
            },
        },
        result: { type: 'number' },
    },
    compute(params) {
        let result = 0;
        for (const item of params.items.flat()) {
            const num = Number(item);
            if (!isNaN(num)) {
                result += num;
            }
        }
        return result;
    }
};
