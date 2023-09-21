import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    a: unknown[];
    b: unknown[];
    key: string;
    strict: boolean;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    moduleName: 'Array / Merge By Key',
    version: '1.0.1',
    description: `
    Merges two arrays of objects by specified key.
    `,
    keywords: ['find', 'match'],
    params: {
        a: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
            hideEntries: true,
        },
        b: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
            hideEntries: true,
        },
        key: {
            schema: { type: 'string' },
        },
        strict: {
            schema: { type: 'boolean' },
            advanced: true,
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
    const { a, b, key, strict } = params;
    const result: any[] = [];
    for (const itemA of a) {
        if (!isObject(itemA)) {
            continue;
        }
        for (const itemB of b) {
            if (!isObject(itemB)) {
                continue;
            }
            const valA = ctx.lib.get(itemA, key);
            const valB = ctx.lib.get(itemB, key);
            const match = ctx.lib.anyEquals(valA, valB, { strict });
            if (match) {
                result.push({ ...itemA, ...itemB });
            }
        }
    }
    return result;
};

function isObject(val: unknown): val is object {
    return val != null && typeof val === 'object';
}
