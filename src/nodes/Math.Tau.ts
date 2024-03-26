import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Math / Tau',
    description: `
        Returns the value of Tau (2 * Pi).
    `,
    params: {},
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = () => 2 * Math.PI;
