import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'Math.AngleFromRad',
    description: `
        Converts the radians to angle.
    `,
    keywords: ['angle'],
    params: {
        value: {
            schema: { type: 'number' },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return 180 * params.value / Math.PI;
};
