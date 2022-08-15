import { Operator } from '@nodescript/core/types';

import { toRegExp } from '../lib/regexp.js';

export const node: Operator<{
    string: string;
    separator: any;
}, string[]> = {
    metadata: {
        channel: 'stdlib',
        name: 'String.Split',
        version: '1.0.0',
        tags: ['Data', 'String'],
        label: 'Split String',
        description: `
            Splits a string into multiple components delimited with specified separator.
            Separator can be either a string or a regular expression.
        `,
        keywords: ['string', 'text', 'separate'],
        params: {
            string: {
                schema: {
                    type: 'string',
                },
            },
            separator: {
                schema: { type: 'any' },
            },
        },
        result: {
            type: 'array',
            items: { type: 'string' },
        },
    },
    compute(params) {
        const { string, separator } = params;
        const regexp = toRegExp(separator);
        return string.split(regexp);
    }
};
