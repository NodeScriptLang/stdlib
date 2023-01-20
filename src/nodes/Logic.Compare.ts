import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { anyEquals } from '../lib/compare.js';

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
    version: '1.1.0',
    moduleName: 'Logic.Compare',
    labelParam: 'op',
    description: 'Compares two values using the specified operator.',
    keywords: ['compare', 'greater', 'less', 'than', 'equals'],
    params: {
        op: {
            moduleName: 'Operator',
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

export const compute: ModuleCompute<P, R> = params => {
    const { a, b, op } = params;
    switch (op) {
        case CompareOp.Equal:
            return anyEquals(a, b);
        case CompareOp.NotEqual:
            return !anyEquals(a, b);
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
