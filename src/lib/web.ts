export enum FetchMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
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

export function getHeaderValue(headers: FetchHeaders, name: string): string[] {
    const existing = Object.entries(headers).find(_ => _[0].toLowerCase() === name.toLowerCase());
    return existing ? existing[1] : [];
}
