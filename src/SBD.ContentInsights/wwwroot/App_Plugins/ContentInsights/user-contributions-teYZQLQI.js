import { G as d, c as S, r as f, k as g, l as y, n as C, x as T, q as v, o as D, p as P, w as x, y as E, z as A, C as O, u as U, D as w, E as m, F as _ } from "./general.styles-CoNEUuD3.js";
import { UmbLitElement as B } from "@umbraco-cms/backoffice/lit-element";
let u = null, a = null, n = null, p;
function I(t, e) {
  const r = e.authors.map((s) => s.name), o = d(e);
  return u = { documents: [], authors: [] }, u.documents = [...e.documents], u.authors = [...e.authors], a = { documents: [], authors: [] }, a.documents = [...e.documents], a.authors = [...e.authors], n = S(t, r, o, (s, i) => {
    a && a.authors.splice(i, 1);
  }), { barChart: n.chart };
}
function b(t) {
  if (!n || !a) return;
  p = t;
  const e = t === "all" ? d(a) : d(a, t);
  n.chart.data.datasets[0].data = [...e], n.chart.update();
}
function G() {
  n && (f(n), !(!a || !u) && (a.authors = [...u.authors], a.documents = [...u.documents], b(p)));
}
var $ = Object.defineProperty, q = Object.getOwnPropertyDescriptor, l = (t, e, r, o) => {
  for (var s = o > 1 ? void 0 : o ? q(e, r) : e, i = t.length - 1, h; i >= 0; i--)
    (h = t[i]) && (s = (o ? h(e, r, s) : h(s)) || s);
  return o && s && $(e, r, s), s;
};
O.register(...U);
let c = class extends B {
  constructor() {
    super(...arguments), this.documentsTableState = {
      documentsWithAuthors: { documents: [], authors: [] },
      filteredDocumentCount: 0,
      currentPage: 1,
      itemsPerPage: 10,
      sortColumn: null,
      sortDescending: !1
    }, this.documentTypeSelectOptions = [], this.hasError = !1;
  }
  handleDocumentTypeSelectChange(t) {
    const r = t.target.value;
    g(r, this.documentsTableState), b(r), this.documentsTableState.currentPage = 1, this.requestUpdate();
  }
  render() {
    return this.hasError ? y() : T`
    <uui-box class="dashboard">
        <div class="dashboard-flex">
            <div class="dashboard-section">
                <div class="section-header">
                    <uui-icon name="icon-users" class="uii-icon"></uui-icon>
                    <h2>Document count by Users</h2>
                </div>
                <div>
                    <p>
                    In case of public and trashed documents, the user is the person who last published the document.
                    </br>
                    In case of draft documents, the user is the person who last edited the document.
                    </p>
                </div>
                <div class="reset-button">
                    <p>Click on the bars to remove them, click on reset to reset the chart.</p>
                    <uui-button type="button" look="primary" color="danger" label="Reset" @click=${G}></uui-button>
                </div>
                <div class="select-container">
                    <uui-select class="document-type-select" id="documentTypeSelect" label="documentTypeSelect" .options=${this.documentTypeSelectOptions} @change=${this.handleDocumentTypeSelectChange}></uui-select>
                </div>
                <uui-box class="chart-box bar-chart">
                    <canvas id="documentsByUsersChart"></canvas>
                </uui-box>
            </div>
        </div>
      ${C(
      this.documentsTableState,
      (t) => this.documentsTableState = A(this.documentsTableState, t),
      (t) => this.documentsTableState = E(this.documentsTableState, t),
      (t) => this.documentsTableState = x(this.documentsTableState, t)
    )}
    </uui-box>
    `;
  }
  async firstUpdated() {
    const { data: t, error: e } = await v();
    if (e || !t?.documents || !t?.authors) {
      this.hasError = !0, console.error(e);
      return;
    }
    const { data: r, error: o } = await D();
    if (o || !r) {
      this.hasError = !0, console.error(o);
      return;
    }
    this.documentTypeSelectOptions = P(r);
    const s = this.renderRoot.querySelector("#documentsByUsersChart");
    I(s, t), this.documentsTableState = {
      ...this.documentsTableState,
      documentsWithAuthors: t
    };
  }
};
c.styles = w;
l([
  m()
], c.prototype, "documentsTableState", 2);
l([
  m()
], c.prototype, "documentTypeSelectOptions", 2);
l([
  m()
], c.prototype, "hasError", 2);
c = l([
  _("user-contributions")
], c);
export {
  c as UserContributions
};
//# sourceMappingURL=user-contributions-teYZQLQI.js.map
