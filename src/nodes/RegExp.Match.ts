import { Operator } from '@nodescript/core/types';

import { toRegExp } from '../lib/regexp.js';

export const node: Operator<{
    string: string;
    regexp: any;
}, any> = {
    metadata: {
        channel: 'stdlib',
        name: 'RegExp.Match',
        version: '1.0.0',
        tags: ['Data', 'String', 'RegExp'],
        label: 'RegExp Match',
        description: `
            Matches a string against a regular expression.
            Returns an array of matched groups, or an empty array if nothing matched.
        `,
        keywords: ['regex', 'match'],
        params: {
            string: {
                schema: { type: 'string' },
            },
            regexp: {
                schema: { type: 'any' },
            },
        },
        result: { type: 'any' },
    },
    compute(params) {
        const { string } = params;
        const regexp = toRegExp(params.regexp);
        const match = regexp.exec(string);
        return match ?? [];
    },
};
