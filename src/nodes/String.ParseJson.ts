import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: string;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    label: 'Parse JSON',
    description: 'Parses a specified string as JSON.',
    keywords: ['string', 'text', 'parse'],
    params: {
        value: {
            schema: {
                type: 'string',
            },
        }
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return JSON.parse(params.value);
};
