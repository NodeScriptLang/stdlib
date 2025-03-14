import { FetchMethod, FetchResponseSpec } from '@nodescript/core/types';

// All typed array share the same prototype
const TypedArray = Object.getPrototypeOf(Uint8Array);

export type FetchResponseType = 'auto' | 'json' | 'urlencoded' | 'text' | 'binary';

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

export function determineRequestBody(method: FetchMethod, body: any): [string | FormData | undefined, string | undefined] {
    switch (true) {
        case method === FetchMethod.GET:
            return [undefined, undefined];
        case (body instanceof URLSearchParams):
            return [body.toString(), 'application/x-www-form-urlencoded'];
        case (body instanceof FormData):
            return [body, undefined];
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
        case 'auto': {
            const contentType = String(res.headers['content-type'] ?? 'text/plain');
            if (contentType.includes('application/json')) {
                return readResponse(res, 'json');
            }
            if (contentType.includes('application/x-www-form-urlencoded')) {
                return readResponse(res, 'urlencoded');
            }
            return readResponse(res, 'text');
        }
        case 'json': {
            return await res.body.json();
        }
        case 'urlencoded': {
            const text = await res.body.text();
            return new URLSearchParams(text);
        }
        case 'text': {
            return await res.body.text();
        }
        case 'binary': {
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
