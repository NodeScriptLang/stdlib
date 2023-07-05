import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    string: string;
    patterns: Record<string, unknown>;
    default: unknown;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.3.6',
    moduleName: 'RegExp / Switch',
    description: `
        Matches a string against a series of regular expressions specified as pattern keys.
        Returns the value of the first matching pattern, or null if none match.
    `,
    keywords: ['match', 'select'],
    params: {
        string: {
            schema: { type: 'string' },
        },
        patterns: {
            deferred: true,
            schema: {
                type: 'object',
                properties: {},
                additionalProperties: { type: 'any' },
            },
        },
        default: {
            deferred: true,
            schema: { type: 'any' },
        }
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = (params, ctx) => {
    const { string } = params;
    for (const [key, value] of Object.entries(params.patterns)) {
        const re = ctx.lib.toRegExp(key);
        if (re.test(string)) {
            return ctx.resolveDeferred(value);
        }
    }
    return ctx.resolveDeferred(params.default);
};
