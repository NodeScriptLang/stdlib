import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    schema: any;
    value: any;
    strictRequired: boolean;
    ignoreErrors: boolean;
};
type R = any;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.3',
    moduleName: 'Schema / Decode',
    description: 'Returns an object confirming to specified schema.',
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
        ignoreErrors: {
            schema: {
                type: 'boolean',
            },
            advanced: true,
        }
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    return ctx.lib.getSchema(params.schema).decode(params.value, {
        strictRequired: params.strictRequired,
        ignoreErrors: params.ignoreErrors,
    });
};
