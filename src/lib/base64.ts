export type Base64Algorithm = 'base64' | 'base64url';

export function encodeBase64(str: string, alg: Base64Algorithm = 'base64') {
    const text = btoa(unescape(encodeURIComponent(str)));
    return alg === 'base64url' ? fromBase64(text) : text;
}

export function decodeBase64(str: string, alg: Base64Algorithm = 'base64') {
    const text = alg === 'base64url' ? toBase64(str) : str;
    return decodeURIComponent(escape(atob(text)));
}

function fromBase64(base64: string): string {
    return base64
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function toBase64(base64url: string): string {
    return padString(base64url)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
}

export function padString(input: string): string {
    let result = input;
    let remainder = result.length % 4;
    while (remainder > 0) {
        result += '=';
        remainder -= 1;
    }
    return result;
}
