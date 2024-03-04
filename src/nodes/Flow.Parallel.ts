import { SubgraphModuleCompute, SubgraphModuleDefinition } from '@nodescript/core/types';


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
    version: '1.1.1',
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
    return new Promise((resolve, reject) => {
        const promises: Promise<any>[] = [];
        const runTask = async (index: number) => {
            const item = array[index];
            const res = await subgraph({
                item,
                index,
                ...scope,
            }, ctx.newScope());
            return res.result;
        };
        const next = () => {
            if (promises.length < array.length) {
                const prom = runTask(promises.length);
                promises.push(prom);
                prom.then(next, reject);
            } else {
                Promise.all(promises).then(resolve);
            }
        };
        const initialCount = Math.max(1, Math.min(array.length, concurrency));
        for (let i = 0; i < initialCount; i++) {
            next();
        }
    });
};
