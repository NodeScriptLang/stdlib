import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';

type P = {
    name: string;
    message: string;
    status: number;
    details: any;
};
type R = unknown;

export const module: ModuleDefinition<P, R> = {
    version: '1.1.1',
    moduleName: 'Error',
    description: 'Raise an error with specified name and message.',
    params: {
        name: {
            schema: { type: 'string', default: 'Error' },
        },
        message: {
            schema: { type: 'string', default: 'An error has occurred' },
        },
        status: {
            schema: { type: 'number', default: 500 },
        },
        details: {
            schema: { type: 'any' },
        }
    },
    result: {
        schema: { type: 'string' },
    }
};

export const compute: ModuleCompute<P, R> = params => {
    const error = new Error(params.message);
    error.name = params.name;
    (error as any).message = params.message;
    (error as any).status = params.status;
    (error as any).details = params.details;
    throw error;
};
