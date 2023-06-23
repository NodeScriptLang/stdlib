import { SubgraphModuleCompute, SubgraphModuleDefinition } from '@nodescript/core/types';

type P = {
    limit: number;
    scope: Record<string, any>;
};

type R = Promise<unknown>;

type SI = {
    [key: string]: unknown;
};

type SO = {
    resume: boolean;
    result: any;
    [key: string]: unknown;
};

export const module: SubgraphModuleDefinition<P, R, SI, SO> = {
    version: '0.1.8',
    moduleName: 'Flow / Loop',
    description: 'Executes a subgraph in a loop. The subgraph decides whether to continue iterating or not and what result to return.',
    keywords: ['while'],
    evalMode: 'manual',
    params: {
        limit: {
            schema: {
                type: 'number',
                default: 10,
            },
        },
        scope: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: { type: 'any' },
            }
        },
    },
    result: {
        async: true,
        schema: {
            type: 'any',
        },
    },
    subgraph: {
        input: {},
        output: {
            type: 'object',
            properties: {
                resume: { type: 'boolean' },
                result: { type: 'any' },
            },
            additionalProperties: { type: 'any' },
        },
    },
};

export const compute: SubgraphModuleCompute<P, R, SI, SO> = async (params, ctx, subgraph) => {
    const { limit } = params;
    let iteration = 0;
    const scope = { ...params.scope };
    while (iteration < limit) {
        iteration += 1;
        const { resume, result, ...newScope } = await subgraph({
            ...scope,
        }, ctx.newScope());
        if (!resume) {
            return result;
        }
        Object.assign(scope, newScope);
    }
    throw new LoopLimitError('Loop limit exceeded');
};

class LoopLimitError extends Error {
    override name = this.constructor.name;
}
