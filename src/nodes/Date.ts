import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { parseDate } from '../lib/date.js';

type P = { value: any };
type R = Date;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.3',
    moduleName: 'Date',
    description: 'Creates a date object. The value can either be an ISO 8601 formatted string or a number of milliseconds since epoch.',
    keywords: ['date', 'string', 'parse'],
    params: {
        value: {
            schema: { type: 'any' },
            valuePlaceholder: 'now',
        }
    },
    result: {
        schema: { type: 'any' },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    return parseDate(params.value);
};
