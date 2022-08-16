import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    conditions: boolean[];
}, boolean> = {
    metadata: {
        channel: 'stdlib',
        name: 'Logic.Or',
        version: '1.0.1',
        tags: ['Logic', 'Data', 'Boolean'],
        label: 'Or',
        description: 'Returns true if any of the specified conditions are true, or false otherwise.',
        keywords: ['or', 'any', 'some'],
        params: {
            conditions: {
                schema: {
                    type: 'array',
                    items: { type: 'boolean' },
                },
            },
        },
        result: { type: 'boolean' },
    },
    compute(params) {
        for (const condition of params.conditions) {
            if (condition) {
                return true;
            }
        }
        return false;
    }
};
