import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: any;
};
type R = any;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Schema / Get Type',
    description: 'Returns the type of specified value.',
    params: {
        value: {
            schema: {
                type: 'any'
            }
        },
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    return ctx.lib.getType(params.value);
};
