import { FetchMethod, FetchResponseSpec } from '@nodescript/unified-fetch/types';

// All typed array share the same prototype
const TypedArray = Object.getPrototypeOf(Uint8Array);

export enum FetchResponseType {
    AUTO = 'auto',
    JSON = 'json',
    URL_ENCODED = 'urlencoded',
    TEXT = 'text',
    BINARY = 'binary',
}

export function parseQueryString(qs: string): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    const searchParams = new URLSearchParams(qs);
    for (const key of searchParams.keys()) {
        const values = searchParams.getAll(key);
        result[key] = values;
    }
    return result;
}

export function mergeUrlQuery(url: string, query: Record<string, string | string[] | undefined>) {
    const parsedUrl = new URL(url);
    for (const [key, value] of Object.entries(query)) {
        if (value === undefined) {
            continue;
        }
        const arr = Array.isArray(value) ? value : [value];
        for (const value of arr) {
            parsedUrl.searchParams.append(key, value);
        }
    }
    return parsedUrl.toString();
}

export function determineRequestBody(method: FetchMethod, body: any): [string | undefined, string | undefined] {
    switch (true) {
        case method === FetchMethod.GET:
            return [undefined, undefined];
        case (body instanceof URLSearchParams):
            return [body.toString(), 'application/x-www-form-urlencoded'];
        case (body instanceof ArrayBuffer || body instanceof TypedArray): {
            return [body, undefined];
        }
        case typeof body === 'object':
            return [JSON.stringify(body), 'application/json'];
        case typeof body === 'string':
            return [body, 'text/plain'];
        default:
            return [undefined, undefined];
    }
}

export async function readResponse(res: FetchResponseSpec, type: FetchResponseType): Promise<any> {
    if (res.status === 204) {
        return undefined;
    }
    switch (type) {
        case FetchResponseType.AUTO: {
            const contentType = String(res.headers['content-type'] ?? 'text/plain');
            if (contentType.includes('application/json')) {
                return readResponse(res, FetchResponseType.JSON);
            }
            if (contentType.includes('application/x-www-form-urlencoded')) {
                return readResponse(res, FetchResponseType.URL_ENCODED);
            }
            return readResponse(res, FetchResponseType.TEXT);
        }
        case FetchResponseType.JSON: {
            return await res.body.json();
        }
        case FetchResponseType.URL_ENCODED: {
            const text = await res.body.text();
            return new URLSearchParams(text);
        }
        case FetchResponseType.TEXT: {
            return await res.body.text();
        }
        case FetchResponseType.BINARY: {
            return await res.body.arrayBuffer();
        }
        default: {
            throw new Error(`Unsupported response type: ${type}`);
        }
    }
}

export class HttpRequestFailed extends Error {
    override name = this.constructor.name;
    details = {};
    status = 500;

    constructor(status: number, method: string, url: string, details: any) {
        super(`${status} - ${method} ${url}`);
        this.status = status;
        this.details = details;
    }
}

export class FetchError extends Error {
    override name = this.constructor.name;
    status = 500;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}
