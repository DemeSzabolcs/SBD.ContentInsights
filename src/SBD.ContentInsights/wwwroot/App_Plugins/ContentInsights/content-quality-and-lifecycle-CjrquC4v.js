import { c as y, j as g, H as b, k as p, l as T, n as D, x as v, q as S, o as C, p as O, w as A, y as I, z as w, C as P, u as $, D as x, E as l, F as E } from "./general.styles-CoNEUuD3.js";
import { UmbLitElement as V } from "@umbraco-cms/backoffice/lit-element";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = (t, e, a) => (a.configurable = !0, a.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, a), a);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function m(t, e) {
  return (a, n, s) => {
    const o = (u) => u.renderRoot?.querySelector(t) ?? null;
    return q(a, n, { get() {
      return o(this);
    } });
  };
}
const f = [
  { label: "0–7 days", from: 0, to: 7 },
  { label: "8–30 days", from: 8, to: 30 },
  { label: "1–3 months", from: 31, to: 90 },
  { label: "3–6 months", from: 91, to: 180 },
  { label: "6–12 months", from: 181, to: 365 },
  { label: "1+ years", from: 366, to: 1 / 0 }
];
let d = null, c;
function h(t, e) {
  let a = e ? t.filter((n) => n.type === e) : t;
  return a = a.filter((n) => n.status !== g.Draft), f.map((n) => a.filter((s) => {
    const o = b(s);
    return o >= n.from && o <= n.to;
  }).length);
}
function L(t, e) {
  const a = f.map((s) => s.label), n = h(e);
  return c = [...e], d = y(t, a, n, void 0, !1), { barChart: d.chart };
}
function R(t) {
  if (!d || !c) return;
  const e = t === "all" ? h(c) : h(c, t);
  d.chart.data.datasets[0].data = [...e], d.chart.update();
}
var U = Object.defineProperty, W = Object.getOwnPropertyDescriptor, i = (t, e, a, n) => {
  for (var s = n > 1 ? void 0 : n ? W(e, a) : e, o = t.length - 1, u; o >= 0; o--)
    (u = t[o]) && (s = (n ? u(e, a, s) : u(s)) || s);
  return n && s && U(e, a, s), s;
};
P.register(...$);
let r = class extends V {
  constructor() {
    super(...arguments), this.documentsTableState = {
      documentsWithAuthors: { documents: [], authors: [] },
      filteredDocumentCount: 0,
      currentPage: 1,
      itemsPerPage: 10,
      sortColumn: null,
      sortDescending: !1
    }, this.documentTypeSelectOptions = [], this.hasError = !1, this.draftDocumentCountInTimeRange = 0, this.draftsOlderThanDays = 30, this.selectValue = "all", this.selectName = "All Document Types", this.draftOnly = !0;
  }
  get draftsLabel() {
    return this.draftOnly ? "Drafts" : "All Documents";
  }
  handleAnyInputChange() {
    p(this.selectValue, this.documentsTableState, this.draftOnly, this.draftsOlderThanDays), this.draftDocumentCountInTimeRange = this.documentsTableState.filteredDocumentCount;
  }
  handleDocumentTypeSelectChange(t) {
    this.selectValue = t.target.value, this.selectName = this.documentTypeSelectOptions.find((e) => e.value === this.selectValue)?.name ?? "All Document Types", this.handleAnyInputChange(), R(this.selectValue), this.documentsTableState.currentPage = 1, this.requestUpdate();
  }
  handleDraftsOlderThanAnyInput(t) {
    const e = Number(t.target.value);
    if (e < 0 || e > 365) {
      this.warningMessage.style.visibility = "visible";
      return;
    }
    this.warningMessage.style.visibility = "hidden", this.draftsOlderThanDays = e, this.draftInput.value = String(e), this.draftSlider.value = String(e), this.handleAnyInputChange();
  }
  handleListAllDocumentsChange(t) {
    const e = !!t.target.checked;
    this.draftOnly = !e, this.handleAnyInputChange(), this.requestUpdate();
  }
  render() {
    return this.hasError ? T() : v`
    <uui-box class="dashboard">
        <div>
            <div class="dashboard-section">
                <div class="section-header">
                    <uui-icon name="icon-time" class="uii-icon"></uui-icon>
                    <h2>Document Age Distribution</h2>
                </div>
                 <div>
                    <p>
                        Trashed documents (documents in the recyclebin) are not counted.
                    </p>
                </div>
                <div class="select-container">
                    <uui-select class="document-type-select" id="documentTypeSelect" label="documentTypeSelect" .options=${this.documentTypeSelectOptions} @change=${this.handleDocumentTypeSelectChange}></uui-select>
                </div>
                <uui-box class="chart-box bar-chart">
                    <canvas id="documentAgeDistributionChart"></canvas>
                </uui-box>
            </div>
        <div>
            <div class="dashboard-section">
                <div class="section-header">
                    <uui-icon name="icon-alert" class="uii-icon-warning"></uui-icon>
                    <h2>${this.draftsLabel} Requiring Attention</h2>
                </div>
                <div>
                    <p id="draftsOlderThanWarning" class="warning-message">Value must be between 0 and 365!</p>
                </div>
                 <div class="drafts-requiring-attention-container">
                    <p class="drafts-older-than-days-days">
                        ${this.draftsLabel} older than ${this.draftsOlderThanDays} days:
                    </p>
                    <h3 class="warning drafts-older-than-days-count">${this.draftDocumentCountInTimeRange}</h3>
                    <uui-slider id="draftsOlderThanSlider" min="0" max="365" step="1" label="Slider label" value="30" @input=${this.handleDraftsOlderThanAnyInput}></uui-slider>
                    <uui-input id="draftsOlderThanInput" label="Label" placeholder="30" type="number" inputmode="numeric" min="0" max="365" value="30" @change=${this.handleDraftsOlderThanAnyInput}></uui-input>
                </div>
                  <uui-toggle label="List all documents anyway" @change=${this.handleListAllDocumentsChange}></uui-toggle>
                  <p> Filtering for: ${this.selectName}
            </div>
        </div>
      ${D(
      this.documentsTableState,
      (t) => this.documentsTableState = w(this.documentsTableState, t),
      (t) => this.documentsTableState = I(this.documentsTableState, t),
      (t) => this.documentsTableState = A(this.documentsTableState, t)
    )}
    </uui-box>
    `;
  }
  async firstUpdated() {
    const { data: t, error: e } = await S();
    if (e || !t?.documents || !t?.authors) {
      this.hasError = !0, console.error(t);
      return;
    }
    const { data: a, error: n } = await C();
    if (n || !a) {
      this.hasError = !0, console.error(n);
      return;
    }
    this.documentTypeSelectOptions = O(a);
    const s = this.renderRoot.querySelector("#documentAgeDistributionChart");
    L(s, t.documents), this.documentsTableState = {
      ...this.documentsTableState,
      documentsWithAuthors: t
    }, p(this.selectValue, this.documentsTableState, this.draftOnly, this.draftsOlderThanDays), this.draftDocumentCountInTimeRange = this.documentsTableState.filteredDocumentCount, this.requestUpdate();
  }
};
r.styles = x;
i([
  l()
], r.prototype, "documentsTableState", 2);
i([
  m("#draftsOlderThanSlider")
], r.prototype, "draftSlider", 2);
i([
  m("#draftsOlderThanInput")
], r.prototype, "draftInput", 2);
i([
  m("#draftsOlderThanWarning")
], r.prototype, "warningMessage", 2);
i([
  l()
], r.prototype, "documentTypeSelectOptions", 2);
i([
  l()
], r.prototype, "hasError", 2);
i([
  l()
], r.prototype, "draftDocumentCountInTimeRange", 2);
i([
  l()
], r.prototype, "draftsOlderThanDays", 2);
i([
  l()
], r.prototype, "selectValue", 2);
i([
  l()
], r.prototype, "selectName", 2);
i([
  l()
], r.prototype, "draftOnly", 2);
r = i([
  E("content-quality-and-lifecycle")
], r);
export {
  r as ContentQualityAndLifecycle
};
//# sourceMappingURL=content-quality-and-lifecycle-CjrquC4v.js.map
