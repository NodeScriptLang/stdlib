import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    item: unknown;
    length: number;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.1.1',
    moduleName: 'Array.Repeat',
    description: `
        Constructs an array of given length filled with specified item.
    `,
    keywords: ['fill', 'array'],
    params: {
        item: {
            schema: { type: 'any' },
        },
        length: {
            schema: {
                type: 'number',
                default: 1,
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
    const { item, length } = params;
    const array = new Array<any>(length);
    for (let i = 0; i < length; i++) {
        array[i] = item;
    }
    return array;
};
