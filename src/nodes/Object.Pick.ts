import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: unknown;
    keys: string[];
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.4.6',
    moduleName: 'Object / Pick',
    description: `
        Picks specified keys from an object.
    `,
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
    const object = typeof params.object === 'object' ? params.object ?? {} : {};
    const res: any = {};
    for (const key of params.keys) {
        const value = (object as any)[key];
        if (value !== undefined) {
            res[key] = value;
        }
    }
    return res;
};
