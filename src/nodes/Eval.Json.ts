import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    code: string;
}, unknown> = {
    metadata: {
        channel: 'stdlib',
        name: 'Eval.Json',
        version: '1.0.1',
        tags: ['Eval', 'Parse'],
        label: 'Json',
        description: 'Parses JSON string.',
        keywords: ['eval', 'json', 'data', 'parse'],
        params: {
            code: {
                schema: {
                    type: 'string',
                },
                renderer: 'json',
            }
        },
        result: {
            type: 'any',
        },
    },
    compute(params) {
        const { code } = params;
        return JSON.parse(code);
    }
};
