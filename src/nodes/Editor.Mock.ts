import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    enabled: boolean;
    value: unknown;
    mock: unknown;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.0',
    moduleName: 'Editor / Mock',
    description: 'Editor-only. When enabled, returns the mock, otherwise returns the original value. When the module is published, the original value is always returned and mock is not evaluated. Useful for mocking heavy operations in development.',
    params: {
        enabled: {
            schema: { type: 'boolean' },
        },
        value: {
            deferred: true,
            schema: { type: 'any' },
        },
        mock: {
            deferred: true,
            schema: { type: 'any' },
        },
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { enabled, value, mock } = params;
    // Note: use ctx.locals directly to only check in this context's locals;
    // this prevents mocks from being used in sub-contexts (e.g. subgraphs or other modules)
    const isEditor = ctx.locals.get('NS_ENV') === 'editor';
    return isEditor && enabled ?
        ctx.resolveDeferred(mock) :
        ctx.resolveDeferred(value);
};
