export function binaryStringToBuffer(string: string): ArrayBuffer {
    const buf = new Uint8Array(string.length);
    for (let i = 0; i < string.length; i++) {
        buf[i] = string.charCodeAt(i);
    }
    return buf.buffer;
}

export function bufferToBinaryString(buffer: ArrayBuffer): string {
    const view = new Uint8Array(buffer);
    let result = '';
    for (let i = 0; i < buffer.byteLength; i++) {
        result += String.fromCharCode(view[i]);
    }
    return result;
}
