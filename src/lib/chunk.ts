export function chunk<T>(array: T[], size: number): T[][] {
    if (size < 1) {
        return [array];
    }
    const result: T[][] = [];
    let i = 0;
    while (i < array.length) {
        result.push(array.slice(i, i + size));
        i += size;
    }
    return result;
}
