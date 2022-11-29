import { binaryStringToBuffer } from '@nodescript/binary-utils';
import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: string;
    encoding: 'utf-8' | 'binary';
};

type R = ArrayBuffer;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/String.ToBytes',
    version: '1.0.0',
    label: 'String To Bytes',
    description: 'Converts a string into an ArrayBuffer.',
    keywords: ['string', 'text', 'byte', 'buffer', 'array', 'binary'],
    params: {
        string: {
            schema: {
                type: 'string',
            },
        },
        encoding: {
            schema: {
                type: 'string',
                enum: ['utf-8', 'binary'],
                default: 'utf-8',
            },
        }
    },
    result: {
        schema: { type: 'any' },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { string, encoding } = params;
    switch (encoding) {
        case 'binary':
            return binaryStringToBuffer(string);
        case 'utf-8': {
            return new TextEncoder().encode(string).buffer;
        }
        default:
            throw new Error(`Unsupported encoding: ${encoding}`);
    }
};
