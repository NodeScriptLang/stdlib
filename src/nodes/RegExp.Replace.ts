import { Operator } from '@nodescript/core/types';

import { toRegExp } from '../lib/regexp.js';

export const node: Operator<{
    string: string;
    regexp: any;
    replacement: string;
}, string> = {
    metadata: {
        channel: 'stdlib',
        name: 'RegExp.Replace',
        version: '1.0.0',
        tags: ['Data', 'String', 'RegExp'],
        label: 'RegExp Replace',
        description: `
            Replaces all occurrences of a regular expression in a string.
            If the regexp is a string, it is converted to a regular expression with Global flag.
            Use RegExp node to create a regular expression with custom flags.'
        `,
        keywords: ['regex', 'match', 'replace'],
        params: {
            string: {
                schema: { type: 'string' },
            },
            regexp: {
                schema: { type: 'any' },
            },
            replacement: {
                schema: { type: 'string' },
            },
        },
        result: { type: 'string' },
    },
    compute(params) {
        const { string, replacement } = params;
        const regexp = toRegExp(params.regexp);
        return string.replace(regexp, replacement);
    },
};
