import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

enum CompareOp {
    Equal = 'Equal',
    NotEqual = 'Not Equal',
    GreaterThan = 'Greater Than',
    GreaterThanOrEqual = 'Greater Than or Equal',
    LessThan = 'Less Than',
    LessThanOrEqual = 'Less Than or Equal',
}

type P = {
    op: CompareOp;
    a: unknown;
    b: unknown;
};

type R = boolean;

export const module: ModuleDefinition<P, R> = {
    version: '1.2.3',
    moduleName: 'Logic / Compare',
    labelParam: 'op',
    description: 'Compares two values using the specified operator.',
    keywords: ['compare', 'greater', 'less', 'than', 'equals'],
    params: {
        op: {
            schema: {
                type: 'string',
                enum: Object.values(CompareOp),
                default: CompareOp.Equal,
            },
        },
        a: {
            schema: { type: 'any' },
        },
        b: {
            schema: { type: 'any' },
        },
    },
    result: {
        schema: { type: 'boolean' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { a, b, op } = params;
    switch (op) {
        case CompareOp.Equal:
            return ctx.lib.anyEquals(a, b);
        case CompareOp.NotEqual:
            return !ctx.lib.anyEquals(a, b);
        case CompareOp.LessThan:
            return (a as any) < (b as any);
        case CompareOp.LessThanOrEqual:
            return (a as any) <= (b as any);
        case CompareOp.GreaterThan:
            return (a as any) > (b as any);
        case CompareOp.GreaterThanOrEqual:
            return (a as any) >= (b as any);
        default:
            return false;
    }
};
