import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    object: object;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/Object.RemoveUndefined',
    version: '1.0.0',
    label: 'Remove Undefined',
    description: `
        Removes undefined values from the object.
    `,
    keywords: ['object', 'trim'],
    params: {
        object: {
            schema: { type: 'any' },
            hideValue: true,
        },
    },
    result: {
        schema: { type: 'object' },
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
