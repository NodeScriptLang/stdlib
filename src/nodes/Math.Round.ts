import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    value: number;
    places: number;
};

type R = number;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.2',
    moduleName: 'Math / Round',
    description: `
        Rounds the specified number.
    `,
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
        return Math.round(params.value);
    }
    const multiplier = Math.pow(10, places);
    return Math.round(params.value * multiplier) / multiplier;
};
