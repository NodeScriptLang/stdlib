export function encodeBase64(str: string) {
    return btoa(unescape(encodeURIComponent(str)));
}

export function decodeBase64(str: string) {
    return decodeURIComponent(escape(atob(str)));
}
