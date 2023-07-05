import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    regexp: string;
    flags: string;
};

type R = RegExp;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.4',
    moduleName: 'RegExp',
    description: 'Creates a regular expression.',
    params: {
        regexp: {
            schema: { type: 'string' },
        },
        flags: {
            schema: { type: 'string' },
        },
    },
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const { regexp, flags } = params;
    return new RegExp(regexp, flags);
};
