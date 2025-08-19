import { type UmbEntryPointOnInit, type UmbEntryPointOnUnload } from '@umbraco-cms/backoffice/extension-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { umbHttpClient } from '@umbraco-cms/backoffice/http-client';

export const onInit: UmbEntryPointOnInit = (_host, _extensionRegistry) => {
    _host.consumeContext(UMB_AUTH_CONTEXT, async (authContext) => {
        if (!authContext) {
            return;
        }

        const config = authContext.getOpenApiConfiguration();

        umbHttpClient.setConfig({
            baseUrl: config.base,
            credentials: config.credentials
        });

        // For every request being made, add the token to the headers
        // Can't use the setConfig approach above as its set only once and
        // tokens expire and get refreshed
        umbHttpClient.interceptors.request.use(async (request, _options) => {
            const token = await config.token();
            request.headers.set('Authorization', `Bearer ${token}`);
            return request;
        });

    });
};

export const onUnload: UmbEntryPointOnUnload = (_host, _extensionRegistry) => {
};
