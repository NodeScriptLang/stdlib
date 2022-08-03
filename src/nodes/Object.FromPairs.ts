import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    pairs: any[];
}, any> = {
    metadata: {
        channel: 'stdlib',
        name: 'Object.FromPairs',
        version: '1.0.0',
        tags: ['Data', 'Object'],
        label: 'Object From Pairs',
        description: `
            Converts an array of [key, value] pairs into an object.
        `,
        keywords: ['object', 'key', 'value', 'entry', 'entries', 'pairs', 'tuples'],
        params: {
            pairs: {
                schema: {
                    type: 'array',
                    items: { type: 'any' },
                },
            },
        },
        result: { type: 'any' },
    },
    compute(params) {
        const { pairs } = params;
        return Object.fromEntries(pairs);
    }
};
