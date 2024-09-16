import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: number;
    places: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.1',
    moduleName: 'Math / Ceil',
    description: `
        Rounds the closest integer number not below the specified value.
    `,
    keywords: ['round'],
    params: {
        value: {
            schema: { type: 'number' },
        },
        places: {
            schema: {
                type: 'number',
                description: `
                    The number of decimal places to which to round.
                    Can be negative, in which case the value is rounded to the specified
                    number of digits to the left of the decimal point.
                `
            },
            attributes: {
                valuePlaceholder: 0,
            },
        },
    },
    result: {
        schema: { type: 'number' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const places = Math.round(params.places);
    if (places === 0) {
        return Math.ceil(params.value);
    }
    const multiplier = Math.pow(10, places);
    return Math.ceil(params.value * multiplier) / multiplier;
};
