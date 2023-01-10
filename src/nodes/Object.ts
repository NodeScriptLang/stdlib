import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    properties: Record<string, unknown>;
};

type R = Record<string, unknown>;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/Object',
    version: '1.2.0',
    label: 'Object',
    description: `
        Creates an object with computed values per each key.
        Each key can be a JSON pointer or a dot-delimited path.
    `,
    keywords: ['object', 'key', 'value', 'entries', 'wrap'],
    params: {
        properties: {
            schema: {
                type: 'object',
            },
        }
    },
    result: {
        schema: { type: 'object' },
    },
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const obj: any = {};
    for (const [key, value] of Object.entries(params.properties)) {
        if (key.startsWith('...')) {
            Object.assign(obj, value);
        } else {
            ctx.set(obj, key, value);
        }
    }
    return obj;
};
