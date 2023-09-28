import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: string;
    start: number;
    end?: number;
};
type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'String / Substring',
    description: `
        Returns a subsrting of a given string.`,
    keywords: ['slice'],
    params: {
        string: {
            schema: { type: 'string' },
        },
        start: {
            schema: {
                type: 'number',
                default: 0,
            },
        },
        end: {
            schema: {
                type: 'number',
                optional: true,
            },
        },
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { string, start, end } = params;
    return string.substring(start, end);
};
