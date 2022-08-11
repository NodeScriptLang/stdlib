import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    params: Record<string, any>;
}, any> = {
    metadata: {
        channel: 'stdlib',
        name: 'Web.SearchParams',
        version: '1.0.1',
        tags: ['Data', 'Web', 'String'],
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
            type: 'any',
        },
    },
    compute(params) {
        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params.params)) {
            searchParams.append(key, value);
        }
        return searchParams;
    }
};
