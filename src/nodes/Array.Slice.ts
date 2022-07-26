import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    array: unknown[];
    start: number;
    end: number;
}, unknown[]> = {
    metadata: {
        channel: 'stdlib',
        name: 'Array.Slice',
        version: '1.0.0',
        tags: ['Array', 'Data'],
        label: 'Slice',
        description:
            'Returns a portion of an Array, starting and ending at specified indexes. ' +
            'Start index is inclusive, end index is exclusive.',
        keywords: ['subsequence', 'sublist'],
        params: {
            array: {
                schema: {
                    type: 'array',
                    items: { type: 'any' },
                },
            },
            start: {
                schema: {
                    type: 'number',
                    default: 0,
                },
            },
            end: {
                schema: {
                    type: 'number',
                    default: Infinity,
                },
            },
        },
        result: {
            type: 'array',
            items: { type: 'any' },
        },
    },
    compute(params) {
        const { array, start, end } = params;
        return array.slice(start, end);
    }
};
