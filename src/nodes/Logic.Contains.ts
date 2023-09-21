import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';


type P = {
    haystack: unknown;
    needle: unknown;
    strict: boolean;
};

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.5',
    moduleName: 'Logic / Contains',
    description: 'Checks if "needle" occurs anywhere inside "haystack".',
    keywords: ['includes'],
    params: {
        haystack: {
            schema: { type: 'any' },
        },
        needle: {
            schema: { type: 'any' },
        },
        strict: {
            schema: { type: 'boolean' },
            advanced: true,
        },
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { haystack, needle, strict } = params;
    return ctx.lib.anyContains(haystack, needle, { strict });
};
