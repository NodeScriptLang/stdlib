import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { parseDate } from '../lib/date.js';

type P = {
    fromDate: any;
    toDate: any;
    unit: string;
};
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'Date.Difference',
    description: 'Computes a difference between two dates in specified units.',
    keywords: ['date', 'difference'],
    params: {
        fromDate: {
            schema: { type: 'any' },
        },
        toDate: {
            schema: { type: 'any' },
        },
        unit: {
            schema: {
                type: 'string',
                enum: ['day', 'hour', 'minute', 'second', 'millisecond'],
                default: 'day',
            }
        }
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { fromDate, toDate, unit } = params;
    const from = parseDate(fromDate);
    const to = parseDate(toDate);
    const ms = to.getTime() - from.getTime();
    switch (unit) {
        case 'millisecond': return ms;
        case 'second': return Math.floor(ms / 1000);
        case 'minute': return Math.floor(ms / 60 / 1000);
        case 'hour': return Math.floor(ms / 60 / 60 / 1000);
        case 'day': return Math.floor(ms / 24 / 60 / 60 / 1000);
        default: {
            throw new Error(`Unsupported unit: ${unit}`);
        }
    }
};
