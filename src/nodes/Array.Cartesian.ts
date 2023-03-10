import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: Array<Array<any>>;
};

type R = any[];

export const module: ModuleDefinition<P, R> = {
    version: '1.1.2',
    moduleName: 'Array.Cartesian',
    description: `
        Computes a Cartesian product of a two-dimensional array.
    `,
    keywords: ['combinations'],
    params: {
        array: {
            schema: {
                type: 'array',
                items: {
                    type: 'array',
                    items: { type: 'any' },
                },
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
    const { array } = params;
    if (array.length === 0) {
        return [];
    }
    let buf: any[][] = array[0].map(_ => [_]);
    let current: any[][] = [];
    for (const list of array.slice(1)) {
        for (const existing of buf) {
            for (const item of list) {
                current.push([...existing, item]);
            }
        }
        buf = current;
        current = [];
    }
    return buf;
};
