import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { parseDate } from '../lib/date.js';

type P = { date: any };
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.3',
    moduleName: 'Date.Parse',
    description: 'Returns individual components of the date, i.e. year, month, week, day of month, etc.',
    keywords: ['date', 'string', 'parse'],
    params: {
        date: {
            schema: { type: 'any' },
        }
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const date = parseDate(params.date);
    return {
        date,
        local: {
            milliseconds: date.getMilliseconds(),
            seconds: date.getSeconds(),
            minutes: date.getMinutes(),
            hours: date.getHours(),
            dayOfMonth: date.getDate(),
            dayOfWeek: date.getDay(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        },
        utc: {
            milliseconds: date.getUTCMilliseconds(),
            seconds: date.getUTCSeconds(),
            minutes: date.getUTCMinutes(),
            hours: date.getUTCHours(),
            dayOfMonth: date.getUTCDate(),
            dayOfWeek: date.getUTCDay(),
            month: date.getUTCMonth() + 1,
            year: date.getUTCFullYear(),
        },
        iso: date.toISOString(),
        full: date.toUTCString(),
        epoch: date.getTime(),
        tzOffset: date.getTimezoneOffset(),
    };
};
