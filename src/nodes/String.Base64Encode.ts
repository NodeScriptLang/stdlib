import { bufferToBase64, stringToBase64 } from '@nodescript/binary-utils';
import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: any;
    algorithm: 'base64' | 'base64url';
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.4',
    moduleName: 'String / Base64 Encode',
    description: 'Encodes a UTF-8 string or a binary buffer into a Base64 string.',
    params: {
        value: {
            schema: {
                type: 'any',
            },
        },
        algorithm: {
            schema: {
                type: 'string',
                enum: ['base64', 'base64url'],
                default: 'base64',
            }
        },
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { value, algorithm } = params;
    const urlMode = algorithm === 'base64url';
    if (value instanceof ArrayBuffer) {
        return bufferToBase64(value, urlMode);
    }
    const isTypedArray = value instanceof Object.getPrototypeOf(Uint8Array);
    if (isTypedArray) {
        return bufferToBase64(value.buffer, urlMode);
    }
    const str = ctx.convertType(value, { type: 'string' }) as string;
    return stringToBase64(str, urlMode);
};
