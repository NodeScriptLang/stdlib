import { ModuleCompute, ModuleDefinition, SchemaSpec } from '@nodescript/core/types';

import { removeUndefined } from '../lib/util.js';

type P = {
    id?: string;
    optional?: boolean;
    nullable?: boolean;
    properties: Record<string, any>;
    additionalProperties?: any;
};
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.5',
    moduleName: 'Schema / Object',
    description: 'Creates a Object schema.',
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
        properties: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: {
                    type: 'any'
                },
            },
            hideValue: true,
        },
        additionalProperties: {
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
        type: 'object',
        id: params.id,
        optional: params.optional,
        nullable: params.nullable,
        properties: params.properties ?? {},
        additionalProperties: params.additionalProperties,
    };
    return removeUndefined(schema);
};
