import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: unknown;
    keys: string[];
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.4.2',
    moduleName: 'Object / Pick',
    description: `
        Picks specified keys from an object.
    `,
    keywords: ['object', 'key', 'select', 'allowlist'],
    params: {
        object: {
            schema: { type: 'any' },
        },
        keys: {
            schema: {
                type: 'array',
                items: { type: 'string' },
            },
            attributes: {
                keyof: 'object',
            },
        }
    },
    result: {
        schema: {
            type: 'object',
            properties: {},
            additionalProperties: { type: 'any' },
        },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { object, keys } = params;
    const res: any = {};
    for (const key of keys) {
        const value = (object as any)[key];
        if (value !== undefined) {
            res[key] = value;
        }
    }
    return res;
};
