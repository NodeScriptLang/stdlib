import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { merge } from '../lib/merge.js';

type P = {
    objects: unknown[];
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/Object.Merge',
    label: 'Merge',
    description: 'Recursively merges multiple objects into one.',
    keywords: ['object', 'key', 'value', 'get'],
    params: {
        objects: {
            schema: {
                type: 'array',
                items: { type: 'any' },
            },
        },
    },
    result: {
        schema: { type: 'object' },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { objects } = params;
    const [first, ...rest] = objects;
    if (rest.length === 0) {
        return first;
    }
    return rest.reduce((a, b) => merge(a, b), first);
};
