import { ModuleCompute, ModuleDefinition } from '@nodescript/core/types';
import { unifiedFetch } from '@nodescript/unified-fetch/frontend';
import { FetchMethod } from '@nodescript/unified-fetch/types';

import {
    determineRequestBody,
    FetchResponseType,
    HttpRequestFailed,
    readResponse,
} from '../lib/web.js';

type P = {
    clientId: string;
    clientSecret: string;
    authorizationUrl: string;
    tokenUrl: string;
    redirectUri: string;
    code: string;
};

type R = Promise<{
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
    tokenType?: string;
}>;

export const module: ModuleDefinition<P, R> = {
    version: '1.0.0',
    moduleName: 'Web / OAuth',
    description: `
        Handles OAuth 2.0 authentication flow and retrieves access tokens.
    `,
    params: {
        clientId: {
            schema: {
                type: 'string'
            },
        },
        clientSecret: {
            schema: {
                type: 'string'
            },
        },
        authorizationUrl: {
            schema: {
                type: 'string'
            },
        },
        tokenUrl: {
            schema: {
                type: 'string'
            },
        },
        redirectUri: {
            schema: {
                type: 'string'
            },
        },
        code: {
            schema: {
                type: 'string'
            },
        },
    },
    result: {
        async: true,
        schema: {
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
                refreshToken: { type: 'string', optional: true },
                expiresIn: { type: 'number', optional: true },
                tokenType: { type: 'string', optional: true },
            }
        },
    },
};

export const compute: ModuleCompute<P, R> = async params => {
    const { clientId, clientSecret, tokenUrl, redirectUri, code } = params;

    const requestBody = determineRequestBody(FetchMethod.POST, {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
    });

    const response = await unifiedFetch({
        method: FetchMethod.POST,
        url: tokenUrl,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestBody[0]
    });

    if (response.status !== 200) {
        throw new HttpRequestFailed(response.status, FetchMethod.POST, tokenUrl, await response.body.text());
    }

    const responseBody = await readResponse(response, FetchResponseType.JSON);

    return {
        accessToken: responseBody.access_token,
        refreshToken: responseBody.refresh_token,
        expiresIn: responseBody.expires_in,
        tokenType: responseBody.token_type,
    };
};
