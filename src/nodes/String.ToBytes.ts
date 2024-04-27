import { base64ToBuffer, binaryStringToBuffer, hexStringToBuffer } from '@nodescript/binary-utils';
import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: string;
    encoding: 'utf-8' | 'hex' | 'base64' | 'base64url' | 'binary';
};

type R = ArrayBuffer;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.0',
    moduleName: 'String / To Bytes',
    description: 'Converts a string into an ArrayBuffer.',
    keywords: ['buffer'],
    params: {
        string: {
            schema: {
                type: 'string',
            },
        },
        encoding: {
            schema: {
                type: 'string',
                enum: ['utf-8', 'hex', 'base64', 'base64url', 'binary'],
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
        case 'utf-8': {
            return new TextEncoder().encode(string).buffer;
        }
        case 'binary':
            return binaryStringToBuffer(string);
        case 'hex':
            return hexStringToBuffer(string);
        case 'base64':
            return base64ToBuffer(string);
        case 'base64url':
            return base64ToBuffer(string, true);
        default:
            throw new Error(`Unsupported encoding: ${encoding}`);
    }
};
