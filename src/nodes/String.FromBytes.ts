import { Operator } from '@nodescript/core/types';

export const node: Operator<{
    buffer: ArrayBuffer;
    encoding: 'utf-8' | 'binary' | 'iso-8859-1' | 'utf-16le';
}, string> = {
    metadata: {
        channel: 'stdlib',
        name: 'String.FromBytes',
        version: '1.0.0',
        tags: ['Data', 'String'],
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
            type: 'string'
        },
    },
    compute(params) {
        const { buffer, encoding } = params;
        switch (encoding) {
            case 'binary': {
                const view = new Uint8Array(buffer);
                let result = '';
                for (let i = 0; i < buffer.byteLength; i++) {
                    result += String.fromCharCode(view[i]);
                }
                return result;
            }
            case 'utf-8':
            case 'iso-8859-1':
            case 'utf-16le': {
                return new TextDecoder(encoding).decode(buffer);
            }
            default:
                throw new Error(`Unsupported encoding: ${encoding}`);
        }
    }
};
