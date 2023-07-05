import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    status: number;
    headers: Record<string, string[]>;
    body: any;
};
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.4',
    moduleName: 'Web / Http Response',
    description: 'Creates a Http Response object.',
    params: {
        status: {
            schema: {
                type: 'number',
                default: 200,
            },
        },
        headers: {
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: {
                    type: 'string',
                },
            },
        },
        body: {
            schema: {
                type: 'any',
            },
        },
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { status, headers, body } = params;
    return {
        $response: {
            status,
            headers,
            body,
        },
    };
};
