import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    regexp: string;
    flags: string;
}, RegExp> = {
    metadata: {
        channel: 'stdlib',
        name: 'RegExp',
        version: '1.0.0',
        tags: ['Data', 'String', 'RegExp'],
        label: 'RegExp',
        description: 'Creates a regular expression.',
        keywords: ['regex', 'match'],
        params: {
            regexp: {
                schema: { type: 'string' },
            },
            flags: {
                schema: { type: 'string' },
            },
        },
        result: { type: 'any' },
    },
    compute(params) {
        const { regexp, flags } = params;
        return new RegExp(regexp, flags);
    }
};
