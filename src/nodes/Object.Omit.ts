import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: any;
    keys: string[];
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.4',
    moduleName: 'Object / Omit',
    description: `
        Creates a shallow copy of an object with specified keys removed.
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
    const object = typeof params.object === 'object' ? params.object : {};
    const res: any = { ...object };
    for (const key of params.keys) {
        delete res[key];
    }
    return res;
};
