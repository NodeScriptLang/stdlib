import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { pivot, PivotFieldType } from '../lib/pivot.js';

type P = {
    array: unknown[];
    groupBy: string[];
    fields: Record<string, PivotFieldType>;
    sortBy: string[];
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.3.1',
    moduleName: 'Array / Pivot',
    description: `
        Performs grouping and aggregations on an array of objects.
    `,
    keywords: ['group', 'aggregate'],
    params: {
        array: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
            hideEntries: true,
        },
        groupBy: {
            schema: {
                type: 'array',
                items: { type: 'string' },
            },
            attributes: {
                keyof: 'array',
                aliases: ['rows'],
            },
        },
        fields: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: {
                    type: 'string',
                    enum: Object.values(PivotFieldType),
                    default: 'ARRAY',
                },
            },
            attributes: {
                valuePlaceholder: 'ARRAY',
                aliases: ['columns'],
            },
        },
        sortBy: {
            schema: {
                type: 'array',
                items: { type: 'string' },
            },
            attributes: {
                keyof: 'array',
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

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { array, groupBy, fields, sortBy } = params;
    return pivot(ctx, array, groupBy, fields, sortBy);
};
