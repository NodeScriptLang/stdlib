import { base64ToBuffer, base64ToString } from '@nodescript/binary-utils';
import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: string;
    algorithm: string;
    output: 'string' | 'binary';
};

type R = any;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.4',
    moduleName: 'String / Base64 Decode',
    description: 'Decodes a Base64-encoded string into UTF-8 or a byte buffer.',
    params: {
        value: {
            schema: {
                type: 'string',
            },
        },
        algorithm: {
            schema: {
                type: 'string',
                enum: ['base64', 'base64url'],
                default: 'base64',
            }
        },
        output: {
            schema: {
                type: 'string',
                enum: ['string', 'binary'],
                default: 'string',
            }
        },
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { value, algorithm, output } = params;
    const urlMode = algorithm === 'base64url';
    return output === 'string' ?
        base64ToString(value, urlMode) :
        base64ToBuffer(value, urlMode);
};
