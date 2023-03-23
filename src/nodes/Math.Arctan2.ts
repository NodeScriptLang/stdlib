import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    x: number;
    y: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Math / Arctan2',
    description: `
        Computes the arctangent of the angle between positive X axis
        and the ray to the point (x, y) in Cartesian system.
    `,
    keywords: ['arctangent'],
    params: {
        x: {
            schema: { type: 'number' },
        },
        y: {
            schema: { type: 'number' },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return Math.atan2(params.x, params.y);
};
