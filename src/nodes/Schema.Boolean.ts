import { ModuleCompute, ModuleDefinition, SchemaSpec } from '@nodescript/core/types';

type P = {
    id?: string;
    optional?: boolean;
    nullable?: boolean;
    default?: boolean;
};
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Schema.Boolean',
    description: 'Creates a Boolean schema.',
    keywords: [],
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
        default: {
            schema: {
                type: 'boolean',
                optional: true,
            },
            advanced: true,
        },
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const schema: SchemaSpec = {
        type: 'boolean',
        id: params.id,
        optional: params.optional,
        nullable: params.nullable,
        default: String(params.default),
    };
    return schema;
};
