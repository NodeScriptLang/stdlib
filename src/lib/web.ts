export function parseQueryString(qs: string): Record<string, string[]> {
    const result: Record<string, string[]> = {};
    const searchParams = new URLSearchParams(qs);
    for (const key of searchParams.keys()) {
        const values = searchParams.getAll(key);
        result[key] = values;
    }
    return result;
}
