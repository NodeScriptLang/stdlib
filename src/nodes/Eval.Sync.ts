import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    args: Record<string, unknown>;
    code: string;
}, unknown> = {
    metadata: {
        channel: 'stdlib',
        name: 'Eval.Sync',
        version: '1.1.1',
        tags: ['Eval'],
        label: 'Eval',
        description: 'Evaluates synchronous JavaScript code with provided arguments.',
        keywords: ['eval', 'compute', 'js', 'javascript', 'function', 'execute', 'expression', 'sync'],
        resizeMode: 'all',
        params: {
            args: {
                schema: {
                    type: 'object',
                },
                addItemLabel: 'Add argument',
                removeItemLabel: 'Remove argument',
            },
            code: {
                schema: {
                    type: 'string',
                },
                renderer: 'javascript',
            }
        },
        result: {
            type: 'any',
        },
    },
    compute() {},
    compile(node, ctx) {
        ctx.emitBlock(`const $p = {`, `}`, () => {
            ctx.emitProp('args');
        });
        const code = node.props.find(_ => _.key === 'code')?.value ?? '';
        const args = node.props.find(_ => _.key === 'args')?.entries ?? [];
        const argList = args.map(_ => _.key).join(',');
        const argVals = args.map(_ => `$p.args[${JSON.stringify(_.key)}]`).join(',');
        ctx.emitBlock(`${ctx.sym.result} = ((${argList}) => {`, `})(${argVals})`, () => {
            ctx.emitLine(code);
        });
    }
};
