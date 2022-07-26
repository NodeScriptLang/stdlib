import { Operator } from '@nodescript/core/types';

import { toRegExp } from '../lib/regexp.js';

export const node: Operator<{
    string: string;
    regexp: any;
}, boolean> = {
    metadata: {
        channel: 'stdlib',
        name: 'RegExp.Test',
        version: '1.0.0',
        tags: ['Data', 'String', 'RegExp'],
        label: 'RegExp Test',
        description: 'Tests if a string matches specified regular expression.',
        keywords: ['regex', 'match'],
        params: {
            string: {
                schema: { type: 'string' },
            },
            regexp: {
                schema: { type: 'any' },
            },
        },
        result: { type: 'boolean' },
    },
    compute(params) {
        const { string } = params;
        const regexp = toRegExp(params.regexp);
        return regexp.test(string);
    },
};
