import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    values: number[];
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Math / Mean',
    description: `
        Computes the arithmetic mean of specified numbers.
    `,
    keywords: ['statistics', 'average'],
    params: {
        values: {
            schema: {
                type: 'array',
                items: { type: 'number' },
            },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { values } = params;
    if (!values.length) {
        return 0;
    }
    let sum = 0;
    for (const num of values) {
        if (!isNaN(num)) {
            sum += num;
        }
    }
    return sum / values.length;
};
