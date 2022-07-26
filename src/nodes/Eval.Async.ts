import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    args: Record<string, unknown>;
    code: string;
}, Promise<unknown>> = {
    metadata: {
        channel: 'stdlib',
        name: 'Eval.Async',
        version: '1.0.0',
        tags: ['Eval'],
        label: 'Eval Async',
        description: 'Evaluates asynchronous JavaScript code with provided arguments.',
        keywords: ['eval', 'compute', 'js', 'javascript', 'function', 'execute', 'expression', 'async'],
        async: true,
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
    async compute(params) {
        const { args, code } = params;
        const argKeys = Object.keys(args);
        const argValues = Object.values(args);
        const res = await evalEsmModule(`export async function fn(${argKeys.join(',')}) { ${code}; }`);
        const val = await res.fn(...argValues);
        return val;
    }
};

async function evalEsmModule(code: string) {
    return await import(codeToUrl(code));
}

function codeToUrl(code: string) {
    return `data:text/javascript;base64,${btoa(code)}`;
}
