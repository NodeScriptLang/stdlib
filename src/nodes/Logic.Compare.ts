import { Operator } from '@nodescript/core/types';

import { anyEquals } from '../lib/compare.js';

export enum CompareOp {
    Equal = 'Equal',
    NotEqual = 'Not Equal',
    GreaterThan = 'Greater Than',
    GreaterThanOrEqual = 'Greater Than or Equal',
    LessThan = 'Less Than',
    LessThanOrEqual = 'Less Than or Equal',
}

export const node: Operator<{
    op: CompareOp;
    a: unknown;
    b: unknown;
}, boolean> = {
    metadata: {
        channel: 'stdlib',
        name: 'Logic.Compare',
        version: '1.0.0',
        tags: ['Logic', 'Data', 'Boolean'],
        label: 'Compare',
        description: 'Compares two values using the specified operator.',
        keywords: ['compare', 'greater', 'less', 'than', 'equals'],
        params: {
            op: {
                label: 'Operator',
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
        result: { type: 'boolean' },
    },
    compute(params) {
        const { a, b, op } = params;
        switch (op) {
            case CompareOp.Equal:
                return anyEquals(a, b, { strict: true });
            case CompareOp.NotEqual:
                return !anyEquals(a, b, { strict: true });
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
    }
};
