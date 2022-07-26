import { Operator } from '@nodescript/core/types';

import { anyContains } from '../lib/compare.js';

export const node: Operator<{
    haystack: unknown;
    needle: unknown;
    strict: boolean;
}, boolean> = {
    metadata: {
        channel: 'stdlib',
        name: 'Logic.Contains',
        version: '1.0.0',
        tags: ['Logic', 'Data', 'Boolean'],
        label: 'Contains',
        description: 'Checks if Needle occurs anywhere inside Haystack.',
        keywords: ['check', 'includes', 'find', 'search'],
        params: {
            haystack: {
                schema: { type: 'any' },
            },
            needle: {
                schema: { type: 'any' },
            },
            strict: {
                schema: { type: 'boolean', default: false, },
            },
        },
        result: { type: 'boolean' },
    },
    compute(params) {
        const { haystack, needle, strict } = params;
        return anyContains(haystack, needle, { strict });
    }
};
