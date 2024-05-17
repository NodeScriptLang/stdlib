import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    schema: any;
    value: any;
    strictRequired: boolean;
};
type R = any;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Schema / Validate',
    description: 'Returns an array of validation errors if the value does not conform to specified schema.',
    params: {
        schema: {
            schema: {
                type: 'any'
            }
        },
        value: {
            schema: {
                type: 'any'
            }
        },
        strictRequired: {
            schema: {
                type: 'boolean',
            },
            advanced: true,
        },
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    return ctx.lib.getSchema(params.schema).validate(params.value, {
        strictRequired: params.strictRequired,
    });
};
