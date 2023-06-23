import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: object;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.4',
    moduleName: 'Object / Remove Undefined',
    description: `
        Removes undefined values from the object.
    `,
    params: {
        object: {
            schema: { type: 'any' },
            hideValue: true,
        },
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
    const { object } = params;
    const res: any = {};
    for (const [key, value] of Object.entries(object)) {
        if (value !== undefined) {
            res[key] = value;
        }
    }
    return res;
};
