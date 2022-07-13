import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    key: string;
    value: unknown;
}, Record<string, unknown>> = {
    metadata: {
        channel: 'stdlib',
        name: 'KeyValue',
        version: '1.0.0',
        tags: ['Data', 'Object'],
        label: 'Key Value',
        description: 'Creates an object with computed key and value.',
        keywords: ['object', 'key', 'value', 'entries', 'wrap'],
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
