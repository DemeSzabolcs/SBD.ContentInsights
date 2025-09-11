export const dashboardsManifest: UmbExtensionManifest[] = [
    {
        type: 'dashboard',
        alias: 'Umbraco.ContentInsights.Dashboards.ContentOverview',
        name: 'Content Overview',
        elementName: 'content-overview',
        element: () =>
            import('./content-overview/content-overview').then((m) => ({ default: m.ContentOverview })),
        meta: {
            label: 'Content Overview',
            pathname: 'content-overview',
        },
        "conditions": [
            {
                "alias": "Umb.Condition.SectionAlias",
                "match": "Umbraco.ContentInsights.Section"
            }
        ]
    },
    {
        type: 'dashboard',
        alias: 'Umbraco.ContentInsights.Dashboards.UserContributions',
        name: 'User Contributions',
        elementName: 'user-contributions',
        element: () =>
            import('./user-contributions/user-contributions').then((m) => ({ default: m.ContentOverview })),
        meta: {
            label: 'User Contributions',
            pathname: 'user-contributions',
        },
        "conditions": [
            {
                "alias": "Umb.Condition.SectionAlias",
                "match": "Umbraco.ContentInsights.Section"
            }
        ]
    },
    {
        type: 'dashboard',
        alias: 'Umbraco.ContentInsights.Dashboards.ContentQualityAndLifecycle',
        name: 'Content Quality & Lifecycle',
        elementName: 'content-quality-and-lifecycle',
        element: () =>
            import('./content-quality-and-lifecycle/content-quality-and-lifecycle').then((m) => ({ default: m.ContentOverview })),
        meta: {
            label: 'Content Quality & Lifecycle',
            pathname: 'content-quality-and-lifecycle',
        },
        "conditions": [
            {
                "alias": "Umb.Condition.SectionAlias",
                "match": "Umbraco.ContentInsights.Section"
            }
        ]
    },
];
