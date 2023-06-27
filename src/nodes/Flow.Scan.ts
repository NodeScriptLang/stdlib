import { SubgraphModuleCompute, SubgraphModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    scope: Record<string, any>;
};

type R = Promise<unknown>;

type SI = {
    item: unknown;
    index: number;
    [key: string]: unknown;
};

type SO = {
    resume: boolean;
    result: unknown;
    [key: string]: unknown;
};

export const module: SubgraphModuleDefinition<P, R, SI, SO> = {
    version: '1.2.1',
    moduleName: 'Flow / Scan',
    description: 'Executes a subgraph for each array item. The subgraph decides whether to continue iterating or not and what result to return.',
    keywords: ['loop', 'find', 'iterate'],
    params: {
        array: {
            schema: {
                type: 'array',
                items: { type: 'any' },
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
        input: {
            item: { type: 'any' },
            index: { type: 'number' },
        },
        output: {
            type: 'object',
            properties: {
                resume: { type: 'boolean' },
                result: { type: 'any' },
                additionalProperties: { type: 'any' },
            },
        },
    },
};

export const compute: SubgraphModuleCompute<P, R, SI, SO> = async (params, ctx, subgraph) => {
    const { array } = params;
    const scope = { ...params.scope };
    for (let index = 0; index < array.length; index++) {
        const item = array[index];
        const { resume, result, ...newScope } = await subgraph({
            item,
            index,
            ...scope,
        }, ctx.newScope());
        if (!resume) {
            return result;
        }
        Object.assign(scope, newScope);
    }
    return null;
};
