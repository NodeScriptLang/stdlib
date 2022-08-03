import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    array: unknown[];
    conditions: boolean[];
}, unknown[]> = {
    metadata: {
        channel: 'stdlib',
        name: 'Array.Filter',
        version: '1.0.0',
        tags: ['Array', 'Data'],
        label: 'Filter',
        description: `
            Returns items of speicified array for which the corresponding condition is true.
            The array and conditions are expected to correspond to each other by index.
        `,
        keywords: ['find', 'all'],
        params: {
            array: {
                schema: {
                    type: 'array',
                    items: { type: 'any' },
                },
                hideEntries: true,
            },
            conditions: {
                schema: {
                    type: 'array',
                    items: { type: 'boolean' },
                },
                hideEntries: true,
            },
        },
        result: {
            type: 'array',
            items: { type: 'any' },
        },
    },
    compute(params) {
        const { array, conditions } = params;
        const res: any[] = [];
        for (const [i, item] of array.entries()) {
            if (conditions[i]) {
                res.push(item);
            }
        }
        return res;
    }
};
