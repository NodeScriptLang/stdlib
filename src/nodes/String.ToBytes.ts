import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    string: string;
    encoding: 'utf-8' | 'binary';
}, ArrayBuffer> = {
    metadata: {
        channel: 'stdlib',
        name: 'String.ToBytes',
        version: '1.0.0',
        tags: ['Data', 'String'],
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
            type: 'any'
        },
    },
    compute(params) {
        const { string, encoding } = params;
        switch (encoding) {
            case 'binary': {
                const buf = new Uint8Array(string.length);
                for (let i = 0; i < string.length; i++) {
                    buf[i] = string.charCodeAt(i);
                }
                return buf.buffer;
            }
            case 'utf-8': {
                return new TextEncoder().encode(string).buffer;
            }
            default:
                throw new Error(`Unsupported encoding: ${encoding}`);
        }
    }
};
