import { GraphEvalContext } from '@nodescript/core/types';

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
    ctx: GraphEvalContext,
    items: any[],
    groupBy: string[],
    fields: Record<string, PivotFieldType>,
    sortBy: string[],
) {
    const results = [];
    const sorted = sortByKeys(ctx, items, sortBy);
    const groups = groupByKeys(ctx, sorted, groupBy);
    for (const group of groups) {
        const result: any = {};
        for (const rowKey of groupBy) {
            const [readKey, writeKey] = parseKey(rowKey);
            const value = ctx.lib.get(group?.[0], readKey);
            ctx.lib.set(result, writeKey, value);
        }
        for (const [fieldKey, fieldType] of Object.entries(fields)) {
            const [readKey, writeKey] = parseKey(fieldKey);
            const value = aggregate(ctx, group, readKey, fieldType);
            ctx.lib.set(result, writeKey, value);
        }
        results.push(result);
    }
    return results;
}

function sortByKeys(ctx: GraphEvalContext, items: any[], keys: string[]): any[] {
    return items.sort((a: any, b: any) => {
        for (const key of keys) {
            const valA = ctx.lib.get(a, key) as any;
            const valB = ctx.lib.get(b, key) as any;
            if (valA === valB) {
                continue;
            }
            return valA > valB ? 1 : -1;
        }
        return 0;
    });
}

function groupByKeys(ctx: GraphEvalContext, items: any[], keys: string[]): Iterable<any> {
    if (!keys.length) {
        return [items];
    }
    const sortedKeys = keys.map(k => parseKey(k)[0]).sort();
    const groups = new Map<string, any[]>();
    for (const item of items) {
        const groupId = sortedKeys.map(key => ctx.lib.get(item, key)).join(':');
        const group = groups.get(groupId);
        if (group) {
            group.push(item);
        } else {
            groups.set(groupId, [item]);
        }
    }
    return groups.values();
}

function aggregate(ctx: GraphEvalContext, items: any[], readKey: string, type: PivotFieldType) {
    switch (type) {
        case PivotFieldType.COUNT: {
            return items.length;
        }
        case PivotFieldType.ARRAY:
        case PivotFieldType.SET: {
            const values = items.map(_ => ctx.lib.get(_, readKey));
            switch (type) {
                case PivotFieldType.ARRAY: return values;
                case PivotFieldType.SET: return [...new Set(values)];
                default: return undefined;
            }
        }
        case PivotFieldType.FIRST: {
            const first = items?.[0];
            return ctx.lib.get(first, readKey) ?? undefined;
        }
        case PivotFieldType.LAST: {
            const last = items?.at(-1);
            return ctx.lib.get(last, readKey) ?? undefined;
        }
        case PivotFieldType.MIN:
        case PivotFieldType.MAX:
        case PivotFieldType.SUM:
        case PivotFieldType.PRODUCT:
        case PivotFieldType.AVERAGE: {
            const nums = items.map(_ => {
                return Number(ctx.lib.get(_, readKey));
            }).filter(_ => !isNaN(_));
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

function parseKey(key: string): [string, string] {
    const [a, b] = key.split(':');
    return [a, b || a];
}
