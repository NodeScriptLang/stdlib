import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { parseDate } from '../lib/date.js';

type P = {
    fromDate: any;
    toDate: any;
    unit: string;
};
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.6',
    moduleName: 'Date / Difference',
    description: 'Computes a difference between two dates in specified units.',
    params: {
        fromDate: {
            schema: { type: 'any' },
            attributes: {
                valuePlaceholder: 'now',
            },
        },
        toDate: {
            schema: { type: 'any' },
            attributes: {
                valuePlaceholder: 'now',
            },
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
        case 'millisecond': return round(ms);
        case 'second': return round(ms / 1000);
        case 'minute': return round(ms / 60 / 1000);
        case 'hour': return round(ms / 60 / 60 / 1000);
        case 'day': return round(ms / 24 / 60 / 60 / 1000);
        default: {
            throw new Error(`Unsupported unit: ${unit}`);
        }
    }
};

function round(ms: number) {
    return Math.sign(ms) * Math.floor(Math.abs(ms));
}
