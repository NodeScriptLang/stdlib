import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.4',
    moduleName: 'Math / E',
    description: `
        Returns the value of E (Euler's number).
    `,
    params: {},
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = () => {
    return Math.E;
};
