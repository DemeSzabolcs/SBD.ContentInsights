export const sectionManifest: UmbExtensionManifest[] = [
    {
        type: 'section',
        alias: 'Umbraco.ContentInsights.Section',
        name: 'Content Insights',
        meta: {
            label: 'Content Insights',
            pathname: 'content-insights',
        },
    },
    {
        type: 'sectionView',
        alias: 'Umbraco.ContentInsights.SectionView',
        name: 'Content Insights',
        elementName: 'content-insights',
        element: () =>
            import('./content-insights').then((m) => ({ default: m.ContentInsights })),
        meta: {
            label: 'Content Insights',
            pathname: 'content-insights',
            icon: 'umb:document',
        },
    },
];
