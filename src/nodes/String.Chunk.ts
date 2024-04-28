import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: string;
    size: number;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'String / Chunk',
    description: `
        Creates an array of strings split into sub-strings of specified size.
        If the string cannot be split evenly, the final chunk will contain the remaining characters.
    `,
    params: {
        string: {
            schema: {
                type: 'string',
            },
        },
        size: {
            schema: {
                type: 'number',
                default: 1,
                minimum: 1
            },
        },
    },
    result: {
        schema: {
            type: 'array',
            items: {
                type: 'any',
            },
        },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { string, size } = params;
    const result = new Array<string>(Math.ceil(string.length / size));
    let i = 0;
    while (i < string.length) {
        result.push(string.substring(i, i + size));
        i += size;
    }
    return result;
};
