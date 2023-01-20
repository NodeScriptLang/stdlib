import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    start: number;
    end: number;
    step: number;
};

type R = unknown[];

export const module: ModuleDefinition<P, R> = {
    version: '1.1.0',
    moduleName: 'Array.Range',
    description: `
        Constructs a sequence of numbers with specified start (inclusive), end (exclusive)
        and increment step.
    `,
    keywords: ['array'],
    params: {
        start: {
            schema: { type: 'number', default: 0 },
        },
        end: {
            schema: { type: 'number', default: 10 },
        },
        step: {
            schema: { type: 'number', default: 1 },
        },
    },
    result: {
        schema: {
            type: 'array',
            items: { type: 'any' },
        }
    },
};

export const compute: ModuleCompute<P, R> = params => {
    const { start, end, step } = params;
    if (start === end) {
        return [];
    }
    const converge = (start < end) === (start < start + step);
    if (!converge) {
        throw new Error('Range does not converge');
    }
    const length = Math.abs(Math.ceil((end - start) / step));
    const result = new Array<number>(length);
    for (let i = 0; i < length; i++) {
        result[i] = start + i * step;
    }
    return result;
};
