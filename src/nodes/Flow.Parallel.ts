import { SubgraphModuleCompute, SubgraphModuleDefinition } from '@nodescript/core/types';

import { chunk } from '../lib/chunk.js';

type P = {
    array: unknown[];
    scope: Record<string, any>;
    concurrency: number;
};

type R = Promise<unknown>;

type SI = {
    item: unknown;
    index: number;
};

type SO = {
    result: unknown;
};

export const module: SubgraphModuleDefinition<P, R, SI, SO> = {
    version: '1.0.1',
    moduleName: 'Flow / Parallel',
    description: 'Executes a subgraph for each array item. Execution occurs in batches according to specified concurrency. Returns an array of results returned by the subgraph.',
    keywords: ['loop', 'async', 'map'],
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
        concurrency: {
            schema: {
                type: 'number',
                default: 10,
            },
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
                result: { type: 'any' },
            },
        },
    },
};

export const compute: SubgraphModuleCompute<P, R, SI, SO> = async (params, ctx, subgraph) => {
    const { array, concurrency, scope } = params;
    const batches = chunk(array, concurrency);
    const results: any[] = [];
    let index = 0;
    for (const batch of batches) {
        const promises = batch.map(item => {
            const res = subgraph({
                item,
                index,
                ...scope,
            }, ctx.newScope());
            index += 1;
            return res;
        });
        const res = await Promise.all(promises);
        for (const { result } of res) {
            results.push(result);
        }
    }
    return results;
};
