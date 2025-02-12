import { GraphEvalContext } from '@nodescript/core/types';
import { seqEndsWith, seqStartsWith, toRegExp } from '@nodescript/core/util';

export enum WhereOp {
    'EQUALS' = 'equals',
    'GREATER_THAN' = 'greater than',
    'LESS_THAN' = 'less than',
    'GREATER_THAN_OR_EQUAL' = 'greater than or equal',
    'LESS_THAN_OR_EQUAL' = 'less than or equal',
    'CONTAINS' = 'contains',
    'STARTS_WITH' = 'starts with',
    'ENDS_WITH' = 'ends with',
    'MATCHES' = 'matches',
}

export function where(ctx: GraphEvalContext, a: any, b: any, op: WhereOp) {
    switch (op) {
        case WhereOp.EQUALS:
            return ctx.lib.anyEquals(a, b);
        case WhereOp.GREATER_THAN:
            return a > b;
        case WhereOp.LESS_THAN:
            return a < b;
        case WhereOp.GREATER_THAN_OR_EQUAL:
            return a >= b;
        case WhereOp.LESS_THAN_OR_EQUAL:
            return a <= b;
        case WhereOp.CONTAINS:
            return ctx.lib.anyContains(a, b, {});
        case WhereOp.STARTS_WITH: {
            if (Array.isArray(a) && Array.isArray(b)) {
                return seqStartsWith(a, b);
            }
            return toString(ctx, a).startsWith(toString(ctx, b));
        }
        case WhereOp.ENDS_WITH: {
            if (Array.isArray(a) && Array.isArray(b)) {
                return seqEndsWith(a, b);
            }
            return toString(ctx, a).endsWith(toString(ctx, b));
        }
        case WhereOp.MATCHES: {
            const str = toString(ctx, a);
            const regex = toRegExp(b);
            return regex.test(str);
        }
        default: {
            return false;
        }
    }
}

function toString(ctx: GraphEvalContext, val: any) {
    const stringSchema = ctx.lib.getSchema<string>({ type: 'string' });
    return stringSchema.decode(val);
}
