import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    condition: boolean;
    positive: unknown;
    negative: unknown;
}, unknown> = {
    metadata: {
        channel: 'stdlib',
        name: 'Logic.If',
        version: '1.0.0',
        tags: ['Logic', 'Data'],
        label: 'If',
        description: 'Returns "positive" if specified condition is true, or "negative" otherwise.',
        keywords: ['check', 'condition'],
        params: {
            condition: {
                schema: { type: 'boolean' },
            },
            positive: {
                schema: { type: 'any' },
            },
            negative: {
                schema: { type: 'any' },
            },
        },
        result: { type: 'boolean' },
    },
    compute(params) {
        const { condition, positive, negative } = params;
        return condition ? positive : negative;
    }
};
