const n = [
  {
    name: "Umbraco Content Insights",
    alias: "SBD.ContentInsights.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./content-insights-entrypoint-DXq6e20s.js")
  }
], e = [
  {
    type: "section",
    alias: "SBD.ContentInsights.Section",
    name: "Content Insights",
    meta: {
      label: "Content Insights",
      pathname: "content-insights"
    }
  }
], i = [
  {
    type: "dashboard",
    alias: "SBD.ContentInsights.Dashboards.ContentOverview",
    name: "Content Overview",
    elementName: "content-overview",
    element: () => import("./content-overview-Dqnof2fu.js").then((t) => ({ default: t.ContentOverview })),
    meta: {
      label: "Content Overview",
      pathname: "content-overview"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "SBD.ContentInsights.Section"
      }
    ]
  },
  {
    type: "dashboard",
    alias: "SBD.ContentInsights.Dashboards.UserContributions",
    name: "User Contributions",
    elementName: "user-contributions",
    element: () => import("./user-contributions-teYZQLQI.js").then((t) => ({ default: t.UserContributions })),
    meta: {
      label: "User Contributions",
      pathname: "user-contributions"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "SBD.ContentInsights.Section"
      }
    ]
  },
  {
    type: "dashboard",
    alias: "SBD.ContentInsights.Dashboards.ContentQualityAndLifecycle",
    name: "Content Quality & Lifecycle",
    elementName: "content-quality-and-lifecycle",
    element: () => import("./content-quality-and-lifecycle-CjrquC4v.js").then((t) => ({ default: t.ContentQualityAndLifecycle })),
    meta: {
      label: "Content Quality & Lifecycle",
      pathname: "content-quality-and-lifecycle"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "SBD.ContentInsights.Section"
      }
    ]
  }
], o = [
  ...e,
  ...n,
  ...i
];
export {
  o as default
};
//# sourceMappingURL=content-insights-bundle.js.map
