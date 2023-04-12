import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    array: unknown[];
    key: string;
    value: any;
    strict: boolean;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    moduleName: 'Array / Find By Key',
    version: '1.0.0',
    description: `
        Finds the first occurrence of an array item where the value at specified key
        equals to the specified value.
    `,
    keywords: ['find'],
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
        value: {
            schema: { type: 'any' },
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
    const { array, key, value, strict } = params;
    for (const item of array) {
        const val = key === '' ? item : ctx.lib.get(item, key);
        const match = strict ? val === value : ctx.lib.anyEquals(val, value);
        if (match) {
            return item;
        }
    }
    return null;
};
