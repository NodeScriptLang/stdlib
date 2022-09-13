import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    code: string;
}, unknown> = {
    metadata: {
        channel: 'stdlib',
        name: 'Eval.Json',
        version: '1.1.2',
        tags: ['Eval', 'Parse'],
        label: 'Json',
        description: 'Parses JSON string.',
        keywords: ['eval', 'json', 'data', 'parse'],
        resizeMode: 'all',
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
    compute() {},
    compile(node, ctx) {
        const code = node.props.find(_ => _.key === 'code')?.value ?? '';
        try {
            // We need to make sure it's actually JSON
            JSON.parse(code);
            ctx.emitLine(`${ctx.sym.result} = ${code};`);
        } catch (error: any) {
            ctx.emitLine(`throw new Error(${JSON.stringify(error.message)})`);
        }
    }
};
