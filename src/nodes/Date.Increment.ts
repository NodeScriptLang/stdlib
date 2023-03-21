import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { parseDate } from '../lib/date.js';

type P = {
    date: any;
    increment: number;
    unit: string;
};
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.2',
    moduleName: 'Date.Increment',
    description: 'Increments a specified date component.',
    keywords: ['date', 'increment', 'add', 'plus'],
    params: {
        date: {
            schema: { type: 'any' },
            valuePlaceholder: 'now',
        },
        increment: {
            schema: {
                type: 'number',
                default: 0,
            },
        },
        unit: {
            schema: {
                type: 'string',
                enum: ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'],
                default: 'day',
            }
        }
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { date, increment, unit } = params;
    const d = parseDate(date);
    switch (unit) {
        case 'year': {
            const val = d.getUTCFullYear();
            d.setUTCFullYear(val + increment);
            return d;
        }
        case 'month': {
            const val = d.getUTCMonth();
            d.setUTCMonth(val + increment);
            return d;
        }
        case 'day': {
            const val = d.getUTCDate();
            d.setUTCDate(val + increment);
            return d;
        }
        case 'hour': {
            const val = d.getUTCHours();
            d.setUTCHours(val + increment);
            return d;
        }
        case 'minute': {
            const val = d.getUTCMinutes();
            d.setUTCMinutes(val + increment);
            return d;
        }
        case 'second': {
            const val = d.getUTCSeconds();
            d.setUTCSeconds(val + increment);
            return d;
        }
        case 'millisecond': {
            const val = d.getUTCMilliseconds();
            d.setUTCMilliseconds(val + increment);
            return d;
        }
        default: {
            throw new Error(`Unsupported unit: ${unit}`);
        }
    }
};
