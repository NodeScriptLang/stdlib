export enum PivotFieldType {
    ARRAY = 'ARRAY',
    SET = 'SET',
    COUNT = 'COUNT',
    FIRST = 'FIRST',
    LAST = 'LAST',
    MIN = 'MIN',
    MAX = 'MAX',
    SUM = 'SUM',
    PRODUCT = 'PRODUCT',
    AVERAGE = 'AVERAGE',
}

export function pivot(
    items: any[],
    rows: string[],
    columns: Record<string, PivotFieldType>
) {
    const groups = group(items, rows);
    const results = [];
    for (const group of groups.values()) {
        const result: any = {};
        for (const rowKey of rows) {
            result[rowKey] = group?.[0][rowKey] ?? undefined;
        }
        for (const [colKey, colType] of Object.entries(columns)) {
            const value = aggregate(group, colKey, colType);
            result[colKey] = value;
        }
        results.push(result);
    }
    return results;
}

function group(items: any[], rows: string[]) {
    const sortedKeys = rows.slice().sort();
    const groups = new Map<string, any[]>();
    for (const item of items) {
        const groupKey = sortedKeys.map(key => item[key]).join(':');
        const group = groups.get(groupKey);
        if (group) {
            group.push(item);
        } else {
            groups.set(groupKey, [item]);
        }
    }
    return groups;
}

function aggregate(items: any[], key: string, type: PivotFieldType) {
    switch (type) {
        case PivotFieldType.COUNT: {
            return items.length;
        }
        case PivotFieldType.ARRAY:
        case PivotFieldType.SET: {
            const values = items.map(_ => _[key]);
            switch (type) {
                case PivotFieldType.ARRAY: return values;
                case PivotFieldType.SET: return [...new Set(values)];
                default: return undefined;
            }
        }
        case PivotFieldType.FIRST: {
            return items?.[0][key] ?? undefined;
        }
        case PivotFieldType.LAST: {
            const last = (items ?? []).at(-1);
            return last?.[key] ?? undefined;
        }
        case PivotFieldType.MIN:
        case PivotFieldType.MAX:
        case PivotFieldType.SUM:
        case PivotFieldType.PRODUCT:
        case PivotFieldType.AVERAGE: {
            const nums = items.map(_ => Number(_?.[key])).filter(_ => !isNaN(_));
            if (!nums.length) {
                return undefined;
            }
            switch (type) {
                case PivotFieldType.MIN: return Math.min(...nums);
                case PivotFieldType.MAX: return Math.max(...nums);
                case PivotFieldType.SUM:
                    return nums.reduce((acc, n) => acc + n, 0);
                case PivotFieldType.PRODUCT:
                    return nums.reduce((acc, n) => acc * n, 1);
                case PivotFieldType.AVERAGE:
                    return nums.reduce((acc, n) => acc + n, 1) / items.length;
                default: return undefined;
            }
        }
        default: return undefined;
    }
}
