export function isNull(value: any) {
    return typeof value === 'number' ? isNaN(value) : value == null;
}

export function isEmpty(value: any) {
    return (typeof value === 'number' && isNaN(value as number)) ||
        value == null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);
}

export function removeUndefined<T extends object>(obj: T): T {
    const res: any = {};
    for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
            res[key] = value;
        }
    }
    return res;
}
