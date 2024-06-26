import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {};
type R = any;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.4',
    moduleName: 'Null',
    description: 'Creates a null value.',
    params: {},
    result: {
        schema: { type: 'any' },
    }
};

export const compute: ModuleCompute<P, R> = () => null;
