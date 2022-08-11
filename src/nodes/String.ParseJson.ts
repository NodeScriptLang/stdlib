import { Operator } from '@nodescript/core/types';

export const node: Operator<{ value: string }, unknown> = {
    metadata: {
        channel: 'stdlib',
        name: 'String.ParseJson',
        version: '1.0.0',
        tags: ['Data', 'String', 'Parse'],
        label: 'Parse JSON',
        description: 'Parses a specified string as JSON.',
        keywords: ['string', 'text', 'parse'],
        params: {
            value: {
                schema: {
                    type: 'string',
                },
            }
        },
        result: { type: 'any' },
    },
    compute(params) {
        return JSON.parse(params.value);
    }
};
