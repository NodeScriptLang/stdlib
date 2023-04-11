export enum FetchMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
}

export type FetchHeaders = Record<string, string[]>;

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

export function headersToObject(headers: Headers): FetchHeaders {
    const result: Record<string, string[]> = {};
    for (const [key, value] of headers as any) {
        result[key] = [value];
    }
    return result;
}

export function getHeaderValues(headers: FetchHeaders, name: string): string[] {
    const existing = Object.entries(headers).find(_ => _[0].toLowerCase() === name.toLowerCase());
    return existing ? existing[1] : [];
}

export function getHeaderValue(headers: FetchHeaders, name: string): string | undefined {
    return getHeaderValues(headers, name)[0];
}

export class HttpRequestFailed extends Error {
    override name = this.constructor.name;
    details = {};

    constructor(status: number, method: string, url: string, details: any) {
        super(`${status} - ${method} ${url}`);
        this.details = details;
    }

}

export class FetchAdapterError extends Error {
    override name = this.constructor.name;
    details = {};

    constructor(status: number, method: string, url: string, details: any) {
        super(`${status} - ${method} ${url}`);
        this.details = details;
    }
}
