import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';
import { objectTrim } from '@nodescript/object-trim';

type P = {
    object: unknown;
    maxArrayLength: number;
    maxStringLength: number;
    maxObjectFields: number;
    maxTotalFields: number;
    addPlaceholders: boolean;
    stringAbbrSymbol: string;
};

type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.1',
    moduleName: 'Object / Truncate',
    description: `
        Recursively truncates the object to meet specified constraints.
    `,
    params: {
        object: {
            schema: { type: 'any' },
        },
        maxArrayLength: {
            schema: { type: 'number', default: 10 },
        },
        maxStringLength: {
            schema: { type: 'number', default: 100 },
        },
        maxObjectFields: {
            schema: { type: 'number', default: 10 },
        },
        maxTotalFields: {
            schema: { type: 'number', default: 100 },
        },
        addPlaceholders: {
            schema: { type: 'boolean', default: true },
            advanced: true,
        },
        stringAbbrSymbol: {
            schema: { type: 'string', default: '...' },
            advanced: true,
        },
    },
    result: {
        schema: { type: 'any' },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    return objectTrim(params.object, {
        addPlaceholders: params.addPlaceholders,
        stringAbbrSymbol: params.stringAbbrSymbol,
        maxArrayLength: params.maxArrayLength,
        maxStringLength: params.maxStringLength,
        maxObjectFields: params.maxObjectFields,
        maxTotalFields: params.maxTotalFields,
    });
};
