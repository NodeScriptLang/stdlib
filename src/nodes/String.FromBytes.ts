import { bufferToBase64, bufferToBinaryString, bufferToHexString } from '@nodescript/binary-utils';
import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    buffer: ArrayBuffer;
    encoding: 'utf-8' | 'binary' | 'hex' | 'base64' | 'base64url' | 'iso-8859-1' | 'utf-16le';
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.0',
    moduleName: 'String / From Bytes',
    description: 'Converts an ArrayBuffer into a string in specified encoding.',
    keywords: ['buffer'],
    params: {
        buffer: {
            schema: {
                type: 'any',
            },
        },
        encoding: {
            schema: {
                type: 'string',
                enum: ['utf-8', 'binary', 'hex', 'base64', 'base64url', 'iso-8859-1', 'utf-16le'],
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
        case 'hex':
            return bufferToHexString(buffer);
        case 'base64':
            return bufferToBase64(buffer);
        case 'base64url':
            return bufferToBase64(buffer, true);
        case 'utf-8':
        case 'iso-8859-1':
        case 'utf-16le': {
            return new TextDecoder(encoding).decode(buffer);
        }
        default:
            throw new Error(`Unsupported encoding: ${encoding}`);
    }
};
