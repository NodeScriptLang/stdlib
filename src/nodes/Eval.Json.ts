import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    code: string;
}, unknown> = {
    metadata: {
        channel: 'stdlib',
        name: 'Eval.Json',
        version: '1.1.0',
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
    compute() {},
    compile(node, ctx) {
        const code = node.props.find(_ => _.key === 'code')?.value ?? '';
        ctx.emitLine(`${ctx.sym.result} = ${code};`);
    }
};
