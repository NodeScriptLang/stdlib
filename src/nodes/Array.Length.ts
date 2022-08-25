import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    array: any;
}, number> = {
    metadata: {
        channel: 'stdlib',
        name: 'Array.Length',
        version: '1.1.0',
        tags: ['Array', 'Data'],
        label: 'Array Length',
        description: `
            Returns the length of an array.
        `,
        keywords: ['size', 'count'],
        params: {
            array: {
                schema: { type: 'any' },
            },
        },
        result: {
            type: 'number',
        },
    },
    compute(params) {
        const { array } = params;
        if (array) {
            if (typeof array.length === 'number') {
                return array.length;
            }
            if (typeof array.byteLength === 'number') {
                return array.byteLength;
            }
            if (typeof array.size === 'number') {
                return array.size;
            }
        }
        return 0;
    }
};
