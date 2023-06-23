import { ModuleCompute, ModuleDefinition, SchemaSpec } from '@nodescript/core/types';

type P = {
    id?: string;
    optional?: boolean;
    nullable?: boolean;
    default?: string;
    enum: string[];
    regex?: string;
    regexFlags?: string;
};
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.3',
    moduleName: 'Schema / String',
    description: 'Creates a String schema.',
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
                type: 'string',
                optional: true,
            },
            advanced: true,
        },
        enum: {
            schema: {
                type: 'array',
                items: { type: 'string' },
            },
            advanced: true,
        },
        regex: {
            schema: {
                type: 'string',
                optional: true,
            },
            advanced: true,
        },
        regexFlags: {
            schema: {
                type: 'string',
                optional: true,
            },
            advanced: true,
        }
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const enumArr = params.enum.length > 0 ? params.enum : undefined;
    const schema: SchemaSpec = {
        type: 'string',
        id: params.id,
        nullable: params.nullable,
        optional: params.optional,
        default: params.default,
        enum: enumArr,
        regex: params.regex,
        regexFlags: params.regexFlags,
    };
    return schema;
};
