import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    array: unknown[];
}, number> = {
    metadata: {
        channel: 'stdlib',
        name: 'Array.Length',
        version: '1.0.0',
        tags: ['Array', 'Data'],
        label: 'Array Length',
        description: 'Returns the length of an array.',
        keywords: ['size', 'count'],
        params: {
            array: {
                schema: {
                    type: 'array',
                    items: { type: 'any' },
                },
            },
        },
        result: {
            type: 'number',
        },
    },
    compute(params) {
        const { array } = params;
        return array.length;
    }
};
