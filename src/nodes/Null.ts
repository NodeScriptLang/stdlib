import { Operator } from '@nodescript/core/types';

export const node: Operator<{}, any> = {
    metadata: {
        channel: 'stdlib',
        name: 'Null',
        version: '1.0.0',
        tags: ['Data', 'Object'],
        label: 'Null',
        description: 'Creates a null value.',
        keywords: [],
        params: {},
        result: { type: 'any' },
    },
    compute() {
        return null;
    }
};
