import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: string;
    start: boolean;
    end: boolean;
};
type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.0',
    moduleName: 'String / Trim',
    description: 'Removes leading and trailing whitespace from a string.',
    keywords: ['whitespace'],
    params: {
        string: {
            schema: { type: 'string' },
        },
        start: {
            schema: { type: 'boolean', default: true },
            advanced: true,
        },
        end: {
            schema: { type: 'boolean', default: true },
            advanced: true,
        },
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { string, start, end } = params;
    switch (true) {
        case start && end:
            return string.trim();
        case start:
            return string.trimStart();
        case end:
            return string.trimEnd();
        default:
            return string;
    }
};
