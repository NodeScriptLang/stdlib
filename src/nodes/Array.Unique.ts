import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    strict: boolean;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.2.2',
    moduleName: 'Array / Unique',
    description: `
        Returns an array consisting of unique items.
        If strict is true, entries are compared by value (fast),
        otherwise they are compared structurally (slow),
        in a similar way to Equals.
    `,
    keywords: ['unique', 'deduplicate'],
    params: {
        array: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
        },
        strict: {
            schema: {
                type: 'boolean',
                default: true,
            },
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
    const { array, strict } = params;
    if (strict) {
        const set = new Set(array);
        return [...set];
    }
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        let found = false;
        for (let j = i + 1; j < array.length; j++) {
            if (ctx.lib.anyEquals(item, array[j])) {
                found = true;
                break;
            }
        }
        if (!found) {
            result.push(item);
        }
    }
    return result;
};
