export enum FetchResponseType {
    AUTO = 'auto',
    JSON = 'json',
    URL_ENCODED = 'urlencoded',
    TEXT = 'text',
    BINARY = 'binary',
}

export enum FetchMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
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

export function mergeUrlQuery(url: string, query: Record<string, string | undefined>) {
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
        case typeof body === 'object':
            return [JSON.stringify(body), 'application/json'];
        case typeof body === 'string':
            return [body, 'text/plain'];
        default:
            return [undefined, undefined];
    }
}

export async function readResponse(response: Response, type: FetchResponseType) {
    switch (type) {
        case FetchResponseType.AUTO: {
            const contentType = response.headers.get('content-type') ?? 'text/plain';
            if (contentType.includes('application/json')) {
                return readResponse(response, FetchResponseType.JSON);
            }
            if (contentType.includes('application/x-www-form-urlencoded')) {
                return readResponse(response, FetchResponseType.URL_ENCODED);
            }
            return readResponse(response, FetchResponseType.TEXT);
        }
        case FetchResponseType.JSON: {
            return await response.json();
        }
        case FetchResponseType.URL_ENCODED: {
            const text = await response.text();
            return new URLSearchParams(text);
        }
        case FetchResponseType.TEXT: {
            return await response.text();
        }
        case FetchResponseType.BINARY: {
            return await response.arrayBuffer();
        }
        default: {
            throw new Error(`Unsupported response type: ${type}`);
        }
    }
}

export function headersToObject(
    headers: Headers | Record<string, string | string[]>
): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(headers)) {
        result[key] = Array.isArray(value) ? value : [value];
    }
    return result;
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
