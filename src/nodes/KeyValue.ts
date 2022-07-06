import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    key: string;
    value: unknown;
}, Record<string, unknown>> = {
    metadata: {
        name: '@stdlib/KeyValue',
        version: '1.0.0',
        label: 'KeyValue',
        description: 'Creates an object with computed key and value.',
        params: {
            key: {
                schema: {
                    type: 'string',
                },
            },
            value: {
                schema: {
                    type: 'any',
                },
            }
        },
        result: { type: 'object' },
    },
    compute(params) {
        const { key, value } = params;
        return { [key]: value };
    }
};
