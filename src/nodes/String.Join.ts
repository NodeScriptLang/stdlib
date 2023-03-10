import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    separator: string;
    strings: string[];
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.2',
    moduleName: 'String.Join',
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
