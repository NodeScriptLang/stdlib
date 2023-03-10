import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: number;
    fromMin: number;
    fromMax: number;
    toMin: number;
    toMax: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Math.MapRange',
    description: `
        Computes a linear mapping of specified value from one range to another.
    `,
    keywords: [],
    params: {
        value: {
            schema: { type: 'number', default: 0.5 },
        },
        fromMin: {
            schema: { type: 'number', default: 0 },
        },
        fromMax: {
            schema: { type: 'number', default: 1 },
        },
        toMin: {
            schema: { type: 'number', default: 0 },
        },
        toMax: {
            schema: { type: 'number', default: 1 },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { value, fromMin, fromMax, toMin, toMax } = params;
    return toMin + (value - fromMin) * (toMax - toMin) / (fromMax - fromMin);
};
