import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    params: Record<string, any>;
};

type R = any;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.4',
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
        const arr = Array.isArray(value) ? value : [value];
        for (const value of arr) {
            if (value == null) {
                continue;
            }
            if (typeof value === 'object' && typeof value.filename === 'string') {
                // Data must be a Blob in this case
                const data = typeof value.data === 'string' ?
                    new TextEncoder().encode(value.data).buffer : value.data;
                if (!(data instanceof ArrayBuffer)) {
                    throw new TypeError('Value must be a string, ArrayBuffer or an object with { filename: string, data: string | ArrayBuffer }');
                }
                formData.append(key, new Blob([data]), value.filename);
            } else if (typeof value === 'string') {
                formData.append(key, value);
            } else if (value instanceof ArrayBuffer) {
                formData.append(key, new Blob([value]));
            } else {
                throw new TypeError('Value must be a string, ArrayBuffer or an object with { filename: string, data: string | ArrayBuffer }');
            }
        }
    }
    return formData;
};
