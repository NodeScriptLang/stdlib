import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    conditions: boolean[];
};

type R = {
    positive: unknown[];
    negative: unknown[];
};

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Array.Bisect',
    description: `
        Splits the array into "positive" and "negative" subarrays,
        based on the per-element condition.
        The array and conditions are expected to correspond to each other by index.
    `,
    keywords: ['find', 'all', 'filter', 'match'],
    params: {
        array: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
            hideEntries: true,
        },
        conditions: {
            schema: {
                type: 'array',
                items: { type: 'boolean' },
            },
            hideEntries: true,
        },
    },
    result: {
        schema: {
            type: 'object',
            properties: {
                positive: {
                    type: 'any',
                },
                negative: {
                    type: 'any',
                },
            }
        },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { array, conditions } = params;
    const positive: any[] = [];
    const negative: any[] = [];
    for (const [i, item] of array.entries()) {
        if (conditions[i]) {
            positive.push(item);
        } else {
            negative.push(item);
        }
    }
    return { positive, negative };
};
