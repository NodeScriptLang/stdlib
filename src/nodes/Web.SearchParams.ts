import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    params: Record<string, any>;
};

type R = any;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/Web.SearchParams',
    version: '1.0.0',
    label: 'Search Params',
    description: `
        Creates a search parameters from key/value pairs,
        suitable for using in URL query string, as well as
        request POST body with application/x-www-urlencoded content type.
    `,
    keywords: ['web', 'url', 'query'],
    params: {
        params: {
            schema: {
                type: 'object'
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
        searchParams.append(key, value);
    }
    return searchParams;
};
