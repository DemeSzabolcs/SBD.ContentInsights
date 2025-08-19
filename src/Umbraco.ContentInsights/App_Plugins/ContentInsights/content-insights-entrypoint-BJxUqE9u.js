import "@umbraco-cms/backoffice/extension-api";
import { UMB_AUTH_CONTEXT as a } from "@umbraco-cms/backoffice/auth";
import { umbHttpClient as i } from "@umbraco-cms/backoffice/http-client";
const g = (e, r) => {
  e.consumeContext(a, async (n) => {
    if (!n)
      return;
    const t = n.getOpenApiConfiguration();
    i.setConfig({
      baseUrl: t.base,
      credentials: t.credentials
    }), i.interceptors.request.use(async (o, c) => {
      const s = await t.token();
      return o.headers.set("Authorization", `Bearer ${s}`), o;
    });
  });
}, u = (e, r) => {
};
export {
  g as onInit,
  u as onUnload
};
//# sourceMappingURL=content-insights-entrypoint-BJxUqE9u.js.map
