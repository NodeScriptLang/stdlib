import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    params: Record<string, any>;
};

type R = any;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.4',
    moduleName: 'Web / Search Params',
    description: `
        Creates a search parameters from key/value pairs,
        suitable for using in URL query string, as well as
        request POST body with application/x-www-urlencoded content type.
    `,
    keywords: ['web', 'url', 'query'],
    params: {
        params: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: { type: 'any' },
            },
        },
    },
    result: {
        schema: { type: 'any' },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params.params)) {
        if (value === undefined) {
            continue;
        }
        const arr = Array.isArray(value) ? value : [value];
        for (const value of arr) {
            searchParams.append(key, value);
        }
    }
    return searchParams;
};
