import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {};
type R = any;

export const module: ModuleDefinition<P, R> = {
    moduleName: '@stdlib/Null',
    label: 'Null',
    description: 'Creates a null value.',
    keywords: [],
    params: {},
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = () => null;
