import { bufferToBinaryString } from '@nodescript/binary-utils';
import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    buffer: ArrayBuffer;
    encoding: 'utf-8' | 'binary' | 'iso-8859-1' | 'utf-16le';
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/String.FromBytes',
    version: '1.0.0',
    label: 'String From Bytes',
    description: 'Converts an ArrayBuffer into a string in specified encoding.',
    keywords: ['string', 'text', 'byte', 'buffer', 'array', 'binary'],
    params: {
        buffer: {
            schema: {
                type: 'any',
            },
        },
        encoding: {
            schema: {
                type: 'string',
                enum: ['utf-8', 'binary', 'iso-8859-1', 'utf-16le'],
                default: 'utf-8',
            },
        }
    },
    result: {
        schema: { type: 'string' },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { buffer, encoding } = params;
    switch (encoding) {
        case 'binary':
            return bufferToBinaryString(buffer);
        case 'utf-8':
        case 'iso-8859-1':
        case 'utf-16le': {
            return new TextDecoder(encoding).decode(buffer);
        }
        default:
            throw new Error(`Unsupported encoding: ${encoding}`);
    }
};
