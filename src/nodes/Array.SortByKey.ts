import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { getValue } from '../lib/object.js';

type P = {
    array: unknown[];
    key: string;
    reverse: boolean;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    label: 'Sort By Key',
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
        }
    },
    result: {
        schema: {
            type: 'array',
            items: { type: 'any' },
        }
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { array, key, reverse } = params;
    const m = reverse ? -1 : 1;
    return array.slice().sort((a, b) => {
        const aValue = getValue(a, key) as any;
        const bValue = getValue(b, key) as any;
        if (aValue < bValue) {
            return -1 * m;
        }
        if (aValue > bValue) {
            return 1 * m;
        }
        return 0;
    });
};
