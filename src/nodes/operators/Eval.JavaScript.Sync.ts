import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    args: Record<string, unknown>;
    code: string;
}, unknown> = {
    metadata: {
        channel: 'stdlib',
        name: 'Eval.JavaScript.Sync',
        version: '1.0.0',
        tags: ['Eval'],
        label: 'JavaScript Sync',
        description: 'Evaluates synchronous JavaScript code with provided arguments.',
        keywords: ['eval', 'compute', 'js', 'javascript', 'function', 'execute', 'expression', 'sync'],
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
                    kind: 'javascript',
                },
            }
        },
        result: {
            type: 'any',
        },
    },
    compute(params) {
        const { args, code } = params;
        const argKeys = Object.keys(args);
        const argValues = Object.values(args);
        const fn = compileSyncJs(code, ...argKeys);
        return fn(...argValues);
    }
};

function compileSyncJs(expr: string, ...args: string[]): Function {
    return new Function(...args, `return (() => { ${expr} })(${args.join(',')})`);
}
