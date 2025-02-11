import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    params: Record<string, any>;
};

type R = any;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Web / Form Data',
    description: `
        Creates a Form Data compatible with Fetch request body.
        Used to send multipart/form-data requests.
    `,
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
    const formData = new FormData();
    for (const [key, value] of Object.entries(params.params)) {
        if (value == null) {
            continue;
        }
        const arr = Array.isArray(value) ? value : [value];
        for (const value of arr) {
            if (value instanceof ArrayBuffer) {
                formData.append(key, new Blob([value]));
            } else {
                formData.append(key, value);
            }
        }
    }
    return formData;
};
