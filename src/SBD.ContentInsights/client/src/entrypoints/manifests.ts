export const entryPointManifests: UmbExtensionManifest[] = [
    {
        name: 'Umbraco Content Insights',
        alias: `SBD.ContentInsights.Entrypoint`,
        type: 'backofficeEntryPoint',
        js: () => import('./content-insights-entrypoint'),
    },
];
