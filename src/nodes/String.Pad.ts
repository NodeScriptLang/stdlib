import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: string;
    length: number;
    padding: string;
    start: boolean;
};
type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.2',
    moduleName: 'String.Pad',
    description: `
        Adds padding either to the start or to the end of the specified string
        (multiple times, if needed) until its length matches or exceeds the target length.

        Does nothing if the string is already matches or exceeds the target length,
        or if the padding is an empty string.`,
    keywords: ['string', 'text', 'pad', 'fill'],
    params: {
        string: {
            schema: { type: 'string' },
        },
        length: {
            schema: { type: 'number' },
        },
        padding: {
            schema: { type: 'string', default: '0' },
        },
        start: {
            schema: { type: 'boolean' },
        }
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { string, length, padding, start } = params;
    if (!padding) {
        return string;
    }
    return start ? string.padStart(length, padding) : string.padEnd(length, padding);
};
