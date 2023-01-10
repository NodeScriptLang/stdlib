import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';
import { set } from '@nodescript/pointer';

type P = {
    key: string;
    value: unknown;
};

type R = Record<string, unknown>;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/KeyValue',
    version: '1.1.0',
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
    const res = {};
    set(res, key, value);
    return res;
};
