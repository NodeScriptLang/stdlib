// https://datatracker.ietf.org/doc/html/rfc4648#section-4
const alphabetBase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const alphabetUrl = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
// Reverse lookup tables
const lookupBase = createLookupTable(alphabetBase);
const lookupUrl = createLookupTable(alphabetUrl);

/**
 * Encodes a binary buffer into a base64 string.
 */
export function bufferToBase64(buffer: ArrayBuffer, urlMode = false): string {
    const alphabet = urlMode ? alphabetUrl : alphabetBase;
    const bytes = new Uint8Array(buffer);
    let result = '';
    // Read 3 octets, convert to 4 sixtets, look them up in alphabet, append
    for (let i = 0; i < bytes.length; i += 3) {
        const a = bytes[i];
        const b = bytes[i + 1] || 0;
        const c = bytes[i + 2] || 0;
        const triple = (a << 16) | (b << 8) | c;
        result += alphabet[(triple >> 18) & 0x3f];
        result += alphabet[(triple >> 12) & 0x3f];
        result += alphabet[(triple >> 6) & 0x3f];
        result += alphabet[triple & 0x3f];
    }
    // Pad the result if necessary
    if (bytes.length % 3 === 1) {
        result = result.slice(0, -2) + (urlMode ? '' : '==');
    } else if (bytes.length % 3 === 2) {
        result = result.slice(0, -1) + (urlMode ? '' : '=');
    }
    return result;
}

/**
 * Encodes a UTF-8 string into a base64 string.
 */
export function stringToBase64(string: string, urlMode = false) {
    const buffer = new TextEncoder().encode(string);
    return bufferToBase64(buffer, urlMode);
}

/**
 * Decodes a base64 string into a binary buffer.
 */
export function base64ToBuffer(encoded: string, urlMode = false): ArrayBuffer {
    const lookup = urlMode ? lookupUrl : lookupBase;
    // Remove padding
    const data = encoded.replace(/=+$/, '');
    const byteLength = Math.floor(data.length * 0.75);
    const bytes = new Uint8Array(byteLength);
    // Read 4 characters, look them up in alphabet, convert to 3 octets, append
    let p = 0;
    for (let i = 0; i < data.length; i += 4) {
        const a = lookup[data.charCodeAt(i)] || 0;
        const b = lookup[data.charCodeAt(i + 1)] || 0;
        const c = lookup[data.charCodeAt(i + 2)] || 0;
        const d = lookup[data.charCodeAt(i + 3)] || 0;
        const triple = (a << 18) | (b << 12) | (c << 6) | d;
        bytes[p++] = (triple >> 16) & 0xff;
        bytes[p++] = (triple >> 8) & 0xff;
        bytes[p++] = triple & 0xff;
    }
    return bytes.buffer;
}

/**
 * Decodes a base64 string into a UTF-8 string.
 */
export function base64ToString(encoded: string, urlMode = false) {
    const buffer = base64ToBuffer(encoded, urlMode);
    return new TextDecoder().decode(buffer);
}

function createLookupTable(alphabet: string) {
    const table = new Uint8Array(256);
    for (let i = 0; i < alphabet.length; i++) {
        table[alphabet.charCodeAt(i)] = i;
    }
    return table;
}
