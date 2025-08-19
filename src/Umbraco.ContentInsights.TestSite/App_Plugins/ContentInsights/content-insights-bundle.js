const n = [
  {
    name: "Umbraco Content Insights",
    alias: "Umbraco.ContentInsights.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./content-insights-entrypoint-BJxUqE9u.js")
  }
], e = [
  {
    type: "section",
    alias: "Umbraco.ContentInsights.Section",
    name: "Content Insights",
    meta: {
      label: "Content Insights",
      pathname: "content-insights"
    }
  },
  {
    type: "sectionView",
    alias: "Umbraco.ContentInsights.SectionView",
    name: "Content Insights",
    elementName: "content-insights",
    element: () => import("./content-insights-CSTcqhwt.js").then((t) => ({ default: t.ContentInsights })),
    meta: {
      label: "Content Insights",
      pathname: "content-insights",
      icon: "umb:document"
    }
  }
], s = [
  ...e,
  ...n
];
export {
  s as default
};
//# sourceMappingURL=content-insights-bundle.js.map
