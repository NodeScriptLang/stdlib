import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Array / Shuffle',
    description: `Returns a copy of an array with its items appearing in random order. Uses Fisher-Yates algorithm.`,
    keywords: ['randomize'],
    params: {
        array: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
        },
    },
    result: {
        schema: {
            type: 'array',
            items: { type: 'any' },
        }
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const arr = params.array.slice();
    let currentIndex = arr.length;
    while (currentIndex >= 1) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // Swap random with current
        const t = arr[randomIndex];
        arr[randomIndex] = arr[currentIndex];
        arr[currentIndex] = t;
    }
    return arr;
};
