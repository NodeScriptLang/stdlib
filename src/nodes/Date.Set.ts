import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { parseDate } from '../lib/date.js';

type P = {
    date: any;
    year?: number;
    month?: number;
    day?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
    useUtc: boolean;
};
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.4',
    moduleName: 'Date / Set',
    description: 'Sets specified date components.',
    params: {
        date: {
            schema: { type: 'any' },
            attributes: {
                valuePlaceholder: 'now',
            },
        },
        year: {
            schema: { type: 'number', optional: true },
            advanced: true,
        },
        month: {
            schema: { type: 'number', optional: true },
            advanced: true,
        },
        day: {
            schema: { type: 'number', optional: true },
            advanced: true,
        },
        hours: {
            schema: { type: 'number', optional: true },
            advanced: true,
        },
        minutes: {
            schema: { type: 'number', optional: true },
            advanced: true,
        },
        seconds: {
            schema: { type: 'number', optional: true },
            advanced: true,
        },
        milliseconds: {
            schema: { type: 'number', optional: true },
            advanced: true,
        },
        useUtc: {
            schema: { type: 'boolean', default: true },
            advanced: true,
        },
    },
    result: {
        schema: { type: 'any' },
    }
};

const setters = {
    year: [Date.prototype.setUTCFullYear, Date.prototype.setFullYear],
    month: [Date.prototype.setUTCMonth, Date.prototype.setMonth],
    day: [Date.prototype.setUTCDate, Date.prototype.setDate],
    hours: [Date.prototype.setUTCHours, Date.prototype.setHours],
    minutes: [Date.prototype.setUTCMinutes, Date.prototype.setMinutes],
    seconds: [Date.prototype.setUTCSeconds, Date.prototype.setSeconds],
    milliseconds: [Date.prototype.setUTCMilliseconds, Date.prototype.setMilliseconds],
};

export const compute: ModuleCompute<P, R> = params => {
    const { date, useUtc } = params;
    const d = parseDate(date);

    if (params.year != null) {
        const [setUtc, setLocal] = setters.year;
        if (useUtc) {
            setUtc.call(d, params.year);
        } else {
            setLocal.call(d, params.year);
        }
    }

    if (params.month != null) {
        const [setUtc, setLocal] = setters.month;
        if (useUtc) {
            setUtc.call(d, params.month);
        } else {
            setLocal.call(d, params.month);
        }
    }

    for (const [key, [setUtc, setLocal]] of Object.entries(setters)) {
        if (key !== 'year' && key !== 'month') {
            const val = (params as any)[key];
            if (val != null) {
                if (useUtc) {
                    setUtc.call(d, val);
                } else {
                    setLocal.call(d, val);
                }
            }
        }
    }

    return d;
};
