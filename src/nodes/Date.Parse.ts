import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { parseDate } from '../lib/date.js';

type P = { date: any };
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.5',
    moduleName: 'Date / Parse',
    description: 'Returns individual components of the date, i.e. year, month, week, day of month, etc.',
    keywords: ['date', 'string', 'parse'],
    params: {
        date: {
            schema: { type: 'any' },
            valuePlaceholder: 'now',
        }
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const date = parseDate(params.date);
    return {
        local: {
            milliseconds: date.getMilliseconds(),
            seconds: date.getSeconds(),
            minutes: date.getMinutes(),
            hours: date.getHours(),
            dayOfMonth: date.getDate(),
            dayOfWeek: date.getDay(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            date: formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
            time: formatTime(date.getHours(), date.getMinutes(), date.getSeconds()),
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
            date: formatDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()),
            time: formatTime(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()),
        },
        iso: date.toISOString(),
        full: date.toUTCString(),
        epoch: date.getTime(),
        tzOffset: date.getTimezoneOffset(),
    };
};

function formatDate(year: number, month: number, day: number) {
    return [
        String(year).padStart(4, '0'),
        String(month).padStart(2, '0'),
        String(day).padStart(2, '0'),
    ].join('-');
}

function formatTime(hours: number, minutes: number, seconds: number) {
    return [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0'),
    ].join(':');
}
