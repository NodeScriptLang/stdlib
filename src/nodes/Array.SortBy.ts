import { Operator } from '@nodescript/core/types';

import { getValue } from '../lib/object.js';

export const node: Operator<{
    array: unknown[];
    keys: string[];
}, unknown[]> = {
    metadata: {
        channel: 'stdlib',
        name: 'Array.SortBy',
        version: '1.0.1',
        tags: ['Array', 'Data'],
        label: 'Sort By',
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
            keys: {
                schema: {
                    type: 'array',
                    items: { type: 'string' },
                },
            },
        },
        result: {
            type: 'array',
            items: { type: 'any' },
        },
    },
    compute(params) {
        const { array, keys } = params;
        const sortKeys = keys.length === 0 ? [''] : keys;
        return array.slice().sort((a, b) => {
            for (const k of sortKeys) {
                const [key, m] =
                    k.startsWith('-') ? [k.substring(1), -1] :
                        k.startsWith('+') ? [k.substring(1), 1] :
                            [k, 1];
                const aValue = getValue(a, key) as any;
                const bValue = getValue(b, key) as any;
                if (aValue < bValue) {
                    return -1 * m;
                }
                if (aValue > bValue) {
                    return 1 * m;
                }
            }
            return 0;
        });
    }
};
