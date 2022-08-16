import { Operator } from '@nodescript/core/types';

export const node: Operator<{ value: boolean }, boolean> = {
    metadata: {
        channel: 'stdlib',
        name: 'Logic.Not',
        version: '1.0.0',
        tags: ['Logic', 'Data', 'Boolean'],
        label: 'Not',
        description: 'Returns the negated value of specified boolean.',
        keywords: ['check', 'null', 'undefined'],
        params: {
            value: {
                schema: { type: 'boolean' },
            },
        },
        result: { type: 'boolean' },
    },
    compute(params) {
        const { value } = params;
        return !value;
    }
};
