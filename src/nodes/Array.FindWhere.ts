import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { where, WhereOp } from '../lib/where.js';

type P = {
    array: unknown[];
    key: string;
    value: any;
    op: WhereOp;
    not: boolean;
    limit?: number;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    moduleName: 'Array / Find Where',
    version: '1.1.0',
    description: `
        Returns items from the array that match specified conditions.
    `,
    keywords: ['find', 'match', 'filter'],
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
            attributes: {
                keyof: 'array',
            },
        },
        value: {
            schema: { type: 'any' },
        },
        op: {
            schema: {
                type: 'string',
                enum: Object.values(WhereOp),
                default: WhereOp.EQUALS,
            },
        },
        not: {
            schema: { type: 'boolean' },
            advanced: true,
        },
        limit: {
            schema: { type: 'number', optional: true },
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
    const { array, key, value, limit, not, op } = params;
    const results: unknown[] = [];
    for (const item of array) {
        const val = key === '' ? item : ctx.lib.get(item, key);
        let match = where(ctx, val, value, op);
        if (not) {
            match = !match;
        }
        if (match) {
            results.push(item);
        }
        if (limit && results.length >= limit) {
            break;
        }
    }
    return results;
};
