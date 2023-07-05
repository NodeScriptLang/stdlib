import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    start: number;
    end: number;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.1.3',
    moduleName: 'Array / Slice',
    description: `
        Returns a portion of an array, starting and ending at specified indexes.
        Start index is inclusive, end index is exclusive.
    `,
    keywords: ['subsequence', 'sublist'],
    params: {
        array: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
        },
        start: {
            schema: {
                type: 'number',
                default: 0,
            },
        },
        end: {
            schema: {
                type: 'number',
                default: Infinity,
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
    const { array, start, end } = params;
    return array.slice(start, end);
};
