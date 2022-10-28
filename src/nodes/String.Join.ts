import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    separator: string;
    strings: string[];
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/String.Join',
    version: '1.0.0',
    label: 'Join Strings',
    description: 'Joins multiple strings together with a specified separator.',
    keywords: ['string', 'text', 'concatenate'],
    params: {
        separator: {
            schema: { type: 'string' },
        },
        strings: {
            schema: {
                type: 'array',
                items: { type: 'string' },
            },
        }
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { strings, separator } = params;
    return strings.join(separator);
};
