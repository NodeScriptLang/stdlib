import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    key: string;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.3.0',
    moduleName: 'Array / Unique By Key',
    description: `
        Returns an array consisting of unique items.
    `,
    keywords: ['deduplicate'],
    params: {
        array: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
        },
        key: {
            schema: { type: 'string' },
        }
    },
    result: {
        schema: {
            type: 'array',
            items: { type: 'any' },
        }
    },
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { array, key = '' } = params;
    const keys = new Set();
    const result = [];
    for (const val of array) {
        const k = ctx.lib.get(val, key);
        if (keys.has(k)) {
            continue;
        }
        keys.add(k);
        result.push(val);
    }
    return result;
};
