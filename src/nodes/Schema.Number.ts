import { ModuleCompute, ModuleDefinition, SchemaSpec } from '@nodescript/core/types';

type P = {
    id?: string;
    optional?: boolean;
    nullable?: boolean;
    default?: number;
    minimum?: number;
    maximum?: number;
};
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.3',
    moduleName: 'Schema / Number',
    description: 'Creates a Number schema.',
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
                type: 'number',
                optional: true,
            },
            advanced: true,
        },
        minimum: {
            schema: {
                type: 'number',
                optional: true,
            },
            advanced: true,
        },
        maximum: {
            schema: {
                type: 'number',
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
        type: 'number',
        id: params.id,
        optional: params.optional,
        nullable: params.nullable,
        default: String(params.default),
        minimum: params.minimum,
        maximum: params.maximum,
    };
    return schema;
};
