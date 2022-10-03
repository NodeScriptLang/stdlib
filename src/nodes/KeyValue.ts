import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    key: string;
    value: unknown;
};

type R = Record<string, unknown>;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/KeyValue',
    label: 'Key Value',
    description: 'Creates an object with computed key and value.',
    keywords: ['object', 'key', 'value', 'entries', 'wrap'],
    params: {
        key: {
            schema: {
                type: 'string',
            },
        },
        value: {
            schema: {
                type: 'any',
            },
        }
    },
    result: {
        schema: { type: 'object' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { key, value } = params;
    return { [key]: value };
};
