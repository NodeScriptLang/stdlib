import { ModuleCompute, ModuleDefinition, SchemaSpec } from '@nodescript/core/types';

import { removeUndefined } from '../lib/util.js';

type P = {
    id?: string;
    optional?: boolean;
    nullable?: boolean;
    items: any;
};
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.5',
    moduleName: 'Schema / Array',
    description: 'Creates a Array schema.',
    params: {
        id: {
            schema: {
                type: 'string',
                optional: true,
            },
            advanced: true,
        },
        optional: {
            schema: {
                type: 'boolean',
                optional: true,
            },
            advanced: true,
        },
        nullable: {
            schema: {
                type: 'boolean',
                optional: true,
            },
            advanced: true,
        },
        items: {
            schema: {
                type: 'any',
                optional: true,
            },
            hideValue: true,
        },
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const schema: SchemaSpec = {
        type: 'array',
        id: params.id,
        optional: params.optional,
        nullable: params.nullable,
        items: params.items ?? { type: 'any' },
    };
    return removeUndefined(schema);
};
