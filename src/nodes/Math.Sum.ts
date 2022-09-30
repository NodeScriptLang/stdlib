import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    items: any[];
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    label: 'Sum',
    description: `
        Computes a sum of specified items.
        Each item can either be a number or an array of numbers.
        Non-numbers are ignored.
    `,
    keywords: ['plus', 'add', 'sum'],
    params: {
        items: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    let result = 0;
    for (const item of params.items.flat()) {
        const num = Number(item);
        if (!isNaN(num)) {
            result += num;
        }
    }
    return result;
};
