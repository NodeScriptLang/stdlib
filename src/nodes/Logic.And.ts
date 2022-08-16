import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    conditions: boolean[];
}, boolean> = {
    metadata: {
        channel: 'stdlib',
        name: 'Logic.And',
        version: '1.0.0',
        tags: ['Logic', 'Data', 'Boolean'],
        label: 'And',
        description: 'Returns false if any of the specified conditions are false, or true otherwise.',
        keywords: ['and', 'all', 'every'],
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
            if (!condition) {
                return false;
            }
        }
        return true;
    }
};
