import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    object: any;
}, any[]> = {
    metadata: {
        channel: 'stdlib',
        name: 'Object.ToPairs',
        version: '1.0.0',
        tags: ['Data', 'Object'],
        label: 'Object To Pairs',
        description: `
            Converts an object into an array of [key, value] pairs.
        `,
        keywords: ['object', 'key', 'value', 'entry', 'entries', 'pairs', 'tuples'],
        params: {
            object: {
                schema: { type: 'any' },
            },
        },
        result: {
            type: 'array',
            items: { type: 'any' },
        },
    },
    compute(params) {
        const { object } = params;
        return Object.entries(object);
    }
};
