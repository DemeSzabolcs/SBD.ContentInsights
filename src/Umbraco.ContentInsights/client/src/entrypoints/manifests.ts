export const entryPointManifests: UmbExtensionManifest[] = [
    {
        name: 'Umbraco Content Insights',
        alias: `Umbraco.ContentInsights.Entrypoint`,
        type: 'backofficeEntryPoint',
        js: () => import('./content-insights-entrypoint'),
    },
];
