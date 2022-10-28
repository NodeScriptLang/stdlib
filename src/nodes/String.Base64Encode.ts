import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { bufferToBase64, stringToBase64 } from '../lib/base64.js';

type P = {
    value: any;
    algorithm: 'base64' | 'base64url';
};

type R = string;

export const module: ModuleDefinition<P, R> = {
    moduleId: '@stdlib/String.Base64Encode',
    version: '1.0.0',
    label: 'Base64 Encode',
    description: 'Encodes a UTF-8 string or a binary buffer into a Base64 string.',
    keywords: ['string', 'text'],
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
    const str = ctx.convertType<string>(value, { type: 'string' });
    return stringToBase64(str, urlMode);
};
