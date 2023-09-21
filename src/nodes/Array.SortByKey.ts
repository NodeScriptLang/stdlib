import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    key: string;
    reverse: boolean;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    moduleName: 'Array / Sort By Key',
    version: '1.0.3',
    description: `
        Sorts the array by specified keys.
        Keys are specified as dot-separated paths or JSON pointers.
    `,
    keywords: ['order', 'collate'],
    params: {
        array: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
            hideEntries: true,
        },
        key: {
            schema: { type: 'string' },
        },
        reverse: {
            schema: { type: 'boolean' },
        },
    },
    result: {
        schema: {
            type: 'array',
            items: { type: 'any' },
        }
    },
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { array, key, reverse } = params;
    const m = reverse ? -1 : 1;
    return array.slice().sort((a, b) => {
        const aValue: any = key === '' ? a : ctx.lib.get(a, key);
        const bValue: any = key === '' ? b : ctx.lib.get(b, key);
        if (aValue < bValue) {
            return -1 * m;
        }
        if (aValue > bValue) {
            return 1 * m;
        }
        return 0;
    });
};
