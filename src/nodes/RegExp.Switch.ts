import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

import { toRegExp } from '../lib/regexp.js';

type P = {
    string: string;
    patterns: Record<string, unknown>;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/RegExp.Switch',
    version: '1.0.0',
    label: 'RegExp Switch',
    description: `
        Matches a string against a series of regular expressions specified as pattern keys.
        Returns the value of the first matching pattern, or null if none match.
    `,
    keywords: ['regex', 'match', 'map', 'select'],
    params: {
        string: {
            schema: { type: 'string' },
        },
        patterns: {
            schema: {
                type: 'object',
            },
        },
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { string, patterns } = params;
    for (const [key, value] of Object.entries(patterns)) {
        const re = toRegExp(key);
        if (re.test(string)) {
            return value;
        }
    }
    return null;
};
