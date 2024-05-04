import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: any;
    type: string;
};
type R = any;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Schema / Is Type',
    description: 'Returns true if value has specified type.',
    params: {
        value: {
            schema: {
                type: 'any'
            }
        },
        type: {
            schema: {
                type: 'string',
                enum: ['string', 'boolean', 'number', 'object', 'array', 'null'],
            },
        },
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    return ctx.lib.getType(params.value) === params.type;
};
