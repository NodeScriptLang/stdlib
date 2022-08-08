import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    separator: string;
    strings: string[];
}, string> = {
    metadata: {
        channel: 'stdlib',
        name: 'String.Join',
        version: '1.0.0',
        tags: ['Data', 'String'],
        label: 'Join Strings',
        description: 'Joins multiple strings together with a specified separator.',
        keywords: ['string', 'text', 'concatenate'],
        params: {
            separator: {
                schema: { type: 'string' },
            },
            strings: {
                schema: {
                    type: 'array',
                    items: { type: 'string' },
                },
            }
        },
        result: { type: 'string' },
    },
    compute(params) {
        const { strings, separator } = params;
        return strings.join(separator);
    }
};
