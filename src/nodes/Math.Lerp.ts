import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    a: number;
    b: number;
    t: number;
    clamp: boolean;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Math / Lerp',
    description: `
        Computes a linear interpolation from a to b at t,
        where t is generally in the range of [0, 1].
        If clamp is true, t is clamped to [0, 1] range.
    `,
    keywords: ['interpolation'],
    params: {
        a: {
            schema: { type: 'number', default: 0 },
        },
        b: {
            schema: { type: 'number', default: 1 },
        },
        t: {
            schema: { type: 'number', default: 0.5 },
        },
        clamp: {
            schema: { type: 'boolean' },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { a, b, clamp } = params;
    const t = clamp ? Math.min(Math.max(params.t, 0), 1) : params.t;
    return a + (b - a) * t;
};
