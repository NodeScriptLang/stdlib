import { Operator } from '@nodescript/core/types';

export const node: Operator<{ value: unknown }, boolean> = {
    metadata: {
        channel: 'stdlib',
        name: 'Logic.IsNull',
        version: '1.0.0',
        tags: ['Logic', 'Data', 'Boolean'],
        label: 'Is Null',
        description: 'Returns true if the specified value is null, undefined or NaN.',
        keywords: ['check', 'null', 'undefined'],
        params: {
            value: {
                schema: { type: 'any' },
            },
        },
        result: { type: 'boolean' },
    },
    compute(params) {
        const { value } = params;
        return typeof value === 'number' ? isNaN(value) : value == null;
    }
};
