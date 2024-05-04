export function isNull(value: any) {
    return typeof value === 'number' ? isNaN(value) : value == null;
}

export function isEmpty(value: any) {
    return (typeof value === 'number' && isNaN(value as number)) ||
        value == null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);
}
