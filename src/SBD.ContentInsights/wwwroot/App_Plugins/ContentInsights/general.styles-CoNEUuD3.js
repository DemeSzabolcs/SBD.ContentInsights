import { c as Xn } from "./client.gen-BLF81e25.js";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ue = globalThis, ji = Ue.ShadowRoot && (Ue.ShadyCSS === void 0 || Ue.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ui = Symbol(), fs = /* @__PURE__ */ new WeakMap();
let Kn = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Ui) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ji && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = fs.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && fs.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const tr = (i) => new Kn(typeof i == "string" ? i : i + "", void 0, Ui), qn = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + i[o + 1], i[0]);
  return new Kn(e, i, Ui);
}, er = (i, t) => {
  if (ji) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = Ue.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, i.appendChild(s);
  }
}, gs = ji ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return tr(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ir, defineProperty: sr, getOwnPropertyDescriptor: nr, getOwnPropertyNames: or, getOwnPropertySymbols: rr, getPrototypeOf: ar } = Object, ri = globalThis, ps = ri.trustedTypes, lr = ps ? ps.emptyScript : "", cr = ri.reactiveElementPolyfillSupport, de = (i, t) => i, qe = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? lr : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, Yi = (i, t) => !ir(i, t), ms = { attribute: !0, type: String, converter: qe, reflect: !1, useDefault: !1, hasChanged: Yi };
Symbol.metadata ??= Symbol("metadata"), ri.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Yt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ms) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && sr(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: o } = nr(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: n, set(r) {
      const a = n?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ms;
  }
  static _$Ei() {
    if (this.hasOwnProperty(de("elementProperties"))) return;
    const t = ar(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(de("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(de("properties"))) {
      const e = this.properties, s = [...or(e), ...rr(e)];
      for (const n of s) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, n] of e) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const n = this._$Eu(e, s);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) e.unshift(gs(n));
    } else t !== void 0 && e.push(gs(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return er(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : qe).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : qe;
      this._$Em = n;
      const a = r.fromAttribute(e, o.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      const n = this.constructor, o = this[t];
      if (s ??= n.getPropertyOptions(t), !((s.hasChanged ?? Yi)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: n, wrapped: o }, r) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, o] of s) {
        const { wrapped: r } = o, a = this[n];
        r !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Yt.elementStyles = [], Yt.shadowRootOptions = { mode: "open" }, Yt[de("elementProperties")] = /* @__PURE__ */ new Map(), Yt[de("finalized")] = /* @__PURE__ */ new Map(), cr?.({ ReactiveElement: Yt }), (ri.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xi = globalThis, Ge = Xi.trustedTypes, bs = Ge ? Ge.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Gn = "$lit$", mt = `lit$${Math.random().toFixed(9).slice(2)}$`, Zn = "?" + mt, hr = `<${Zn}>`, zt = document, me = () => zt.createComment(""), be = (i) => i === null || typeof i != "object" && typeof i != "function", Ki = Array.isArray, dr = (i) => Ki(i) || typeof i?.[Symbol.iterator] == "function", mi = `[ 	
\f\r]`, ee = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _s = /-->/g, xs = />/g, At = RegExp(`>|${mi}(?:([^\\s"'>=/]+)(${mi}*=${mi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ys = /'/g, vs = /"/g, Jn = /^(?:script|style|textarea|title)$/i, ur = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), Ei = ur(1), Kt = Symbol.for("lit-noChange"), j = Symbol.for("lit-nothing"), Ss = /* @__PURE__ */ new WeakMap(), Rt = zt.createTreeWalker(zt, 129);
function Qn(i, t) {
  if (!Ki(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bs !== void 0 ? bs.createHTML(t) : t;
}
const fr = (i, t) => {
  const e = i.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = ee;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let c, h, d = -1, u = 0;
    for (; u < l.length && (r.lastIndex = u, h = r.exec(l), h !== null); ) u = r.lastIndex, r === ee ? h[1] === "!--" ? r = _s : h[1] !== void 0 ? r = xs : h[2] !== void 0 ? (Jn.test(h[2]) && (n = RegExp("</" + h[2], "g")), r = At) : h[3] !== void 0 && (r = At) : r === At ? h[0] === ">" ? (r = n ?? ee, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? At : h[3] === '"' ? vs : ys) : r === vs || r === ys ? r = At : r === _s || r === xs ? r = ee : (r = At, n = void 0);
    const f = r === At && i[a + 1].startsWith("/>") ? " " : "";
    o += r === ee ? l + hr : d >= 0 ? (s.push(c), l.slice(0, d) + Gn + l.slice(d) + mt + f) : l + mt + (d === -2 ? a : f);
  }
  return [Qn(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class _e {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, h] = fr(t, e);
    if (this.el = _e.createElement(c, s), Rt.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = Rt.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(Gn)) {
          const u = h[r++], f = n.getAttribute(d).split(mt), g = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: o, name: g[2], strings: f, ctor: g[1] === "." ? pr : g[1] === "?" ? mr : g[1] === "@" ? br : ai }), n.removeAttribute(d);
        } else d.startsWith(mt) && (l.push({ type: 6, index: o }), n.removeAttribute(d));
        if (Jn.test(n.tagName)) {
          const d = n.textContent.split(mt), u = d.length - 1;
          if (u > 0) {
            n.textContent = Ge ? Ge.emptyScript : "";
            for (let f = 0; f < u; f++) n.append(d[f], me()), Rt.nextNode(), l.push({ type: 2, index: ++o });
            n.append(d[u], me());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Zn) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(mt, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += mt.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = zt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function qt(i, t, e = i, s) {
  if (t === Kt) return t;
  let n = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = be(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(i), n._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = n : e._$Cl = n), n !== void 0 && (t = qt(i, n._$AS(i, t.values), n, s)), t;
}
class gr {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, n = (t?.creationScope ?? zt).importNode(e, !0);
    Rt.currentNode = n;
    let o = Rt.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new Pe(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new _r(o, this, t)), this._$AV.push(c), l = s[++a];
      }
      r !== l?.index && (o = Rt.nextNode(), r++);
    }
    return Rt.currentNode = zt, n;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class Pe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, n) {
    this.type = 2, this._$AH = j, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = qt(this, t, e), be(t) ? t === j || t == null || t === "" ? (this._$AH !== j && this._$AR(), this._$AH = j) : t !== this._$AH && t !== Kt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : dr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== j && be(this._$AH) ? this._$AA.nextSibling.data = t : this.T(zt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = _e.createElement(Qn(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new gr(n, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ss.get(t.strings);
    return e === void 0 && Ss.set(t.strings, e = new _e(t)), e;
  }
  k(t) {
    Ki(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const o of t) n === e.length ? e.push(s = new Pe(this.O(me()), this.O(me()), this, this.options)) : s = e[n], s._$AI(o), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ai {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, n, o) {
    this.type = 1, this._$AH = j, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = j;
  }
  _$AI(t, e = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = qt(this, t, e, 0), r = !be(t) || t !== this._$AH && t !== Kt, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = qt(this, a[s + l], e, l), c === Kt && (c = this._$AH[l]), r ||= !be(c) || c !== this._$AH[l], c === j ? t = j : t !== j && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === j ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class pr extends ai {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === j ? void 0 : t;
  }
}
class mr extends ai {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== j);
  }
}
class br extends ai {
  constructor(t, e, s, n, o) {
    super(t, e, s, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = qt(this, t, e, 0) ?? j) === Kt) return;
    const s = this._$AH, n = t === j && s !== j || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== j && (s === j || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _r {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    qt(this, t);
  }
}
const xr = Xi.litHtmlPolyfillSupport;
xr?.(_e, Pe), (Xi.litHtmlVersions ??= []).push("3.3.1");
const yr = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = n = new Pe(t.insertBefore(me(), o), o, void 0, e ?? {});
  }
  return n._$AI(i), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qi = globalThis;
class Ye extends Yt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = yr(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Kt;
  }
}
Ye._$litElement$ = !0, Ye.finalized = !0, qi.litElementHydrateSupport?.({ LitElement: Ye });
const vr = qi.litElementPolyfillSupport;
vr?.({ LitElement: Ye });
(qi.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const su = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Sr = { attribute: !0, type: String, converter: qe, reflect: !1, hasChanged: Yi }, Mr = (i = Sr, t, e) => {
  const { kind: s, metadata: n } = e;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, i);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, i, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, i);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function wr(i) {
  return (t, e) => typeof e == "object" ? Mr(i, t, e) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function nu(i) {
  return wr({ ...i, state: !0, attribute: !1 });
}
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function Ae(i) {
  return i + 0.5 | 0;
}
const bt = (i, t, e) => Math.max(Math.min(i, e), t);
function ae(i) {
  return bt(Ae(i * 2.55), 0, 255);
}
function yt(i) {
  return bt(Ae(i * 255), 0, 255);
}
function dt(i) {
  return bt(Ae(i / 2.55) / 100, 0, 1);
}
function Ms(i) {
  return bt(Ae(i * 100), 0, 100);
}
const it = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Li = [..."0123456789ABCDEF"], kr = (i) => Li[i & 15], Pr = (i) => Li[(i & 240) >> 4] + Li[i & 15], Oe = (i) => (i & 240) >> 4 === (i & 15), Ar = (i) => Oe(i.r) && Oe(i.g) && Oe(i.b) && Oe(i.a);
function Cr(i) {
  var t = i.length, e;
  return i[0] === "#" && (t === 4 || t === 5 ? e = {
    r: 255 & it[i[1]] * 17,
    g: 255 & it[i[2]] * 17,
    b: 255 & it[i[3]] * 17,
    a: t === 5 ? it[i[4]] * 17 : 255
  } : (t === 7 || t === 9) && (e = {
    r: it[i[1]] << 4 | it[i[2]],
    g: it[i[3]] << 4 | it[i[4]],
    b: it[i[5]] << 4 | it[i[6]],
    a: t === 9 ? it[i[7]] << 4 | it[i[8]] : 255
  })), e;
}
const Dr = (i, t) => i < 255 ? t(i) : "";
function Or(i) {
  var t = Ar(i) ? kr : Pr;
  return i ? "#" + t(i.r) + t(i.g) + t(i.b) + Dr(i.a, t) : void 0;
}
const Tr = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function to(i, t, e) {
  const s = t * Math.min(e, 1 - e), n = (o, r = (o + i / 30) % 12) => e - s * Math.max(Math.min(r - 3, 9 - r, 1), -1);
  return [n(0), n(8), n(4)];
}
function Er(i, t, e) {
  const s = (n, o = (n + i / 60) % 6) => e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function Lr(i, t, e) {
  const s = to(i, 1, 0.5);
  let n;
  for (t + e > 1 && (n = 1 / (t + e), t *= n, e *= n), n = 0; n < 3; n++)
    s[n] *= 1 - t - e, s[n] += t;
  return s;
}
function Rr(i, t, e, s, n) {
  return i === n ? (t - e) / s + (t < e ? 6 : 0) : t === n ? (e - i) / s + 2 : (i - t) / s + 4;
}
function Gi(i) {
  const e = i.r / 255, s = i.g / 255, n = i.b / 255, o = Math.max(e, s, n), r = Math.min(e, s, n), a = (o + r) / 2;
  let l, c, h;
  return o !== r && (h = o - r, c = a > 0.5 ? h / (2 - o - r) : h / (o + r), l = Rr(e, s, n, h, o), l = l * 60 + 0.5), [l | 0, c || 0, a];
}
function Zi(i, t, e, s) {
  return (Array.isArray(t) ? i(t[0], t[1], t[2]) : i(t, e, s)).map(yt);
}
function Ji(i, t, e) {
  return Zi(to, i, t, e);
}
function Ir(i, t, e) {
  return Zi(Lr, i, t, e);
}
function $r(i, t, e) {
  return Zi(Er, i, t, e);
}
function eo(i) {
  return (i % 360 + 360) % 360;
}
function Fr(i) {
  const t = Tr.exec(i);
  let e = 255, s;
  if (!t)
    return;
  t[5] !== s && (e = t[6] ? ae(+t[5]) : yt(+t[5]));
  const n = eo(+t[2]), o = +t[3] / 100, r = +t[4] / 100;
  return t[1] === "hwb" ? s = Ir(n, o, r) : t[1] === "hsv" ? s = $r(n, o, r) : s = Ji(n, o, r), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: e
  };
}
function zr(i, t) {
  var e = Gi(i);
  e[0] = eo(e[0] + t), e = Ji(e), i.r = e[0], i.g = e[1], i.b = e[2];
}
function Br(i) {
  if (!i)
    return;
  const t = Gi(i), e = t[0], s = Ms(t[1]), n = Ms(t[2]);
  return i.a < 255 ? `hsla(${e}, ${s}%, ${n}%, ${dt(i.a)})` : `hsl(${e}, ${s}%, ${n}%)`;
}
const ws = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, ks = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function Nr() {
  const i = {}, t = Object.keys(ks), e = Object.keys(ws);
  let s, n, o, r, a;
  for (s = 0; s < t.length; s++) {
    for (r = a = t[s], n = 0; n < e.length; n++)
      o = e[n], a = a.replace(o, ws[o]);
    o = parseInt(ks[r], 16), i[a] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return i;
}
let Te;
function Hr(i) {
  Te || (Te = Nr(), Te.transparent = [0, 0, 0, 0]);
  const t = Te[i.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Wr = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Vr(i) {
  const t = Wr.exec(i);
  let e = 255, s, n, o;
  if (t) {
    if (t[7] !== s) {
      const r = +t[7];
      e = t[8] ? ae(r) : bt(r * 255, 0, 255);
    }
    return s = +t[1], n = +t[3], o = +t[5], s = 255 & (t[2] ? ae(s) : bt(s, 0, 255)), n = 255 & (t[4] ? ae(n) : bt(n, 0, 255)), o = 255 & (t[6] ? ae(o) : bt(o, 0, 255)), {
      r: s,
      g: n,
      b: o,
      a: e
    };
  }
}
function jr(i) {
  return i && (i.a < 255 ? `rgba(${i.r}, ${i.g}, ${i.b}, ${dt(i.a)})` : `rgb(${i.r}, ${i.g}, ${i.b})`);
}
const bi = (i) => i <= 31308e-7 ? i * 12.92 : Math.pow(i, 1 / 2.4) * 1.055 - 0.055, jt = (i) => i <= 0.04045 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
function Ur(i, t, e) {
  const s = jt(dt(i.r)), n = jt(dt(i.g)), o = jt(dt(i.b));
  return {
    r: yt(bi(s + e * (jt(dt(t.r)) - s))),
    g: yt(bi(n + e * (jt(dt(t.g)) - n))),
    b: yt(bi(o + e * (jt(dt(t.b)) - o))),
    a: i.a + e * (t.a - i.a)
  };
}
function Ee(i, t, e) {
  if (i) {
    let s = Gi(i);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * e, t === 0 ? 360 : 1)), s = Ji(s), i.r = s[0], i.g = s[1], i.b = s[2];
  }
}
function io(i, t) {
  return i && Object.assign(t || {}, i);
}
function Ps(i) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(i) ? i.length >= 3 && (t = { r: i[0], g: i[1], b: i[2], a: 255 }, i.length > 3 && (t.a = yt(i[3]))) : (t = io(i, { r: 0, g: 0, b: 0, a: 1 }), t.a = yt(t.a)), t;
}
function Yr(i) {
  return i.charAt(0) === "r" ? Vr(i) : Fr(i);
}
class xe {
  constructor(t) {
    if (t instanceof xe)
      return t;
    const e = typeof t;
    let s;
    e === "object" ? s = Ps(t) : e === "string" && (s = Cr(t) || Hr(t) || Yr(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = io(this._rgb);
    return t && (t.a = dt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Ps(t);
  }
  rgbString() {
    return this._valid ? jr(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Or(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Br(this._rgb) : void 0;
  }
  mix(t, e) {
    if (t) {
      const s = this.rgb, n = t.rgb;
      let o;
      const r = e === o ? 0.5 : e, a = 2 * r - 1, l = s.a - n.a, c = ((a * l === -1 ? a : (a + l) / (1 + a * l)) + 1) / 2;
      o = 1 - c, s.r = 255 & c * s.r + o * n.r + 0.5, s.g = 255 & c * s.g + o * n.g + 0.5, s.b = 255 & c * s.b + o * n.b + 0.5, s.a = r * s.a + (1 - r) * n.a, this.rgb = s;
    }
    return this;
  }
  interpolate(t, e) {
    return t && (this._rgb = Ur(this._rgb, t._rgb, e)), this;
  }
  clone() {
    return new xe(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = yt(t), this;
  }
  clearer(t) {
    const e = this._rgb;
    return e.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, e = Ae(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = e, this;
  }
  opaquer(t) {
    const e = this._rgb;
    return e.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return Ee(this._rgb, 2, t), this;
  }
  darken(t) {
    return Ee(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Ee(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Ee(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return zr(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function lt() {
}
const Xr = /* @__PURE__ */ (() => {
  let i = 0;
  return () => i++;
})();
function D(i) {
  return i == null;
}
function $(i) {
  if (Array.isArray && Array.isArray(i))
    return !0;
  const t = Object.prototype.toString.call(i);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function O(i) {
  return i !== null && Object.prototype.toString.call(i) === "[object Object]";
}
function N(i) {
  return (typeof i == "number" || i instanceof Number) && isFinite(+i);
}
function et(i, t) {
  return N(i) ? i : t;
}
function P(i, t) {
  return typeof i > "u" ? t : i;
}
const Kr = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 : +i / t, so = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 * t : +i;
function I(i, t, e) {
  if (i && typeof i.call == "function")
    return i.apply(e, t);
}
function L(i, t, e, s) {
  let n, o, r;
  if ($(i))
    for (o = i.length, n = 0; n < o; n++)
      t.call(e, i[n], n);
  else if (O(i))
    for (r = Object.keys(i), o = r.length, n = 0; n < o; n++)
      t.call(e, i[r[n]], r[n]);
}
function Ze(i, t) {
  let e, s, n, o;
  if (!i || !t || i.length !== t.length)
    return !1;
  for (e = 0, s = i.length; e < s; ++e)
    if (n = i[e], o = t[e], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
      return !1;
  return !0;
}
function Je(i) {
  if ($(i))
    return i.map(Je);
  if (O(i)) {
    const t = /* @__PURE__ */ Object.create(null), e = Object.keys(i), s = e.length;
    let n = 0;
    for (; n < s; ++n)
      t[e[n]] = Je(i[e[n]]);
    return t;
  }
  return i;
}
function no(i) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(i) === -1;
}
function qr(i, t, e, s) {
  if (!no(i))
    return;
  const n = t[i], o = e[i];
  O(n) && O(o) ? ye(n, o, s) : t[i] = Je(o);
}
function ye(i, t, e) {
  const s = $(t) ? t : [
    t
  ], n = s.length;
  if (!O(i))
    return i;
  e = e || {};
  const o = e.merger || qr;
  let r;
  for (let a = 0; a < n; ++a) {
    if (r = s[a], !O(r))
      continue;
    const l = Object.keys(r);
    for (let c = 0, h = l.length; c < h; ++c)
      o(l[c], i, r, e);
  }
  return i;
}
function ue(i, t) {
  return ye(i, t, {
    merger: Gr
  });
}
function Gr(i, t, e) {
  if (!no(i))
    return;
  const s = t[i], n = e[i];
  O(s) && O(n) ? ue(s, n) : Object.prototype.hasOwnProperty.call(t, i) || (t[i] = Je(n));
}
const As = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (i) => i,
  // default resolvers
  x: (i) => i.x,
  y: (i) => i.y
};
function Zr(i) {
  const t = i.split("."), e = [];
  let s = "";
  for (const n of t)
    s += n, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (e.push(s), s = "");
  return e;
}
function Jr(i) {
  const t = Zr(i);
  return (e) => {
    for (const s of t) {
      if (s === "")
        break;
      e = e && e[s];
    }
    return e;
  };
}
function vt(i, t) {
  return (As[t] || (As[t] = Jr(t)))(i);
}
function Qi(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
const ve = (i) => typeof i < "u", St = (i) => typeof i == "function", Cs = (i, t) => {
  if (i.size !== t.size)
    return !1;
  for (const e of i)
    if (!t.has(e))
      return !1;
  return !0;
};
function Qr(i) {
  return i.type === "mouseup" || i.type === "click" || i.type === "contextmenu";
}
const E = Math.PI, F = 2 * E, ta = F + E, Qe = Number.POSITIVE_INFINITY, ea = E / 180, W = E / 2, Ct = E / 4, Ds = E * 2 / 3, _t = Math.log10, at = Math.sign;
function fe(i, t, e) {
  return Math.abs(i - t) < e;
}
function Os(i) {
  const t = Math.round(i);
  i = fe(i, t, i / 1e3) ? t : i;
  const e = Math.pow(10, Math.floor(_t(i))), s = i / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * e;
}
function ia(i) {
  const t = [], e = Math.sqrt(i);
  let s;
  for (s = 1; s < e; s++)
    i % s === 0 && (t.push(s), t.push(i / s));
  return e === (e | 0) && t.push(e), t.sort((n, o) => n - o).pop(), t;
}
function sa(i) {
  return typeof i == "symbol" || typeof i == "object" && i !== null && !(Symbol.toPrimitive in i || "toString" in i || "valueOf" in i);
}
function Gt(i) {
  return !sa(i) && !isNaN(parseFloat(i)) && isFinite(i);
}
function na(i, t) {
  const e = Math.round(i);
  return e - t <= i && e + t >= i;
}
function oo(i, t, e) {
  let s, n, o;
  for (s = 0, n = i.length; s < n; s++)
    o = i[s][e], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function nt(i) {
  return i * (E / 180);
}
function ts(i) {
  return i * (180 / E);
}
function Ts(i) {
  if (!N(i))
    return;
  let t = 1, e = 0;
  for (; Math.round(i * t) / t !== i; )
    t *= 10, e++;
  return e;
}
function ro(i, t) {
  const e = t.x - i.x, s = t.y - i.y, n = Math.sqrt(e * e + s * s);
  let o = Math.atan2(s, e);
  return o < -0.5 * E && (o += F), {
    angle: o,
    distance: n
  };
}
function Ri(i, t) {
  return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}
function oa(i, t) {
  return (i - t + ta) % F - E;
}
function q(i) {
  return (i % F + F) % F;
}
function Se(i, t, e, s) {
  const n = q(i), o = q(t), r = q(e), a = q(o - n), l = q(r - n), c = q(n - o), h = q(n - r);
  return n === o || n === r || s && o === r || a > l && c < h;
}
function U(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function ra(i) {
  return U(i, -32768, 32767);
}
function ut(i, t, e, s = 1e-6) {
  return i >= Math.min(t, e) - s && i <= Math.max(t, e) + s;
}
function es(i, t, e) {
  e = e || ((r) => i[r] < t);
  let s = i.length - 1, n = 0, o;
  for (; s - n > 1; )
    o = n + s >> 1, e(o) ? n = o : s = o;
  return {
    lo: n,
    hi: s
  };
}
const ft = (i, t, e, s) => es(i, e, s ? (n) => {
  const o = i[n][t];
  return o < e || o === e && i[n + 1][t] === e;
} : (n) => i[n][t] < e), aa = (i, t, e) => es(i, e, (s) => i[s][t] >= e);
function la(i, t, e) {
  let s = 0, n = i.length;
  for (; s < n && i[s] < t; )
    s++;
  for (; n > s && i[n - 1] > e; )
    n--;
  return s > 0 || n < i.length ? i.slice(s, n) : i;
}
const ao = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function ca(i, t) {
  if (i._chartjs) {
    i._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(i, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), ao.forEach((e) => {
    const s = "_onData" + Qi(e), n = i[e];
    Object.defineProperty(i, e, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const r = n.apply(this, o);
        return i._chartjs.listeners.forEach((a) => {
          typeof a[s] == "function" && a[s](...o);
        }), r;
      }
    });
  });
}
function Es(i, t) {
  const e = i._chartjs;
  if (!e)
    return;
  const s = e.listeners, n = s.indexOf(t);
  n !== -1 && s.splice(n, 1), !(s.length > 0) && (ao.forEach((o) => {
    delete i[o];
  }), delete i._chartjs);
}
function lo(i) {
  const t = new Set(i);
  return t.size === i.length ? i : Array.from(t);
}
const co = function() {
  return typeof window > "u" ? function(i) {
    return i();
  } : window.requestAnimationFrame;
}();
function ho(i, t) {
  let e = [], s = !1;
  return function(...n) {
    e = n, s || (s = !0, co.call(window, () => {
      s = !1, i.apply(t, e);
    }));
  };
}
function ha(i, t) {
  let e;
  return function(...s) {
    return t ? (clearTimeout(e), e = setTimeout(i, t, s)) : i.apply(this, s), t;
  };
}
const is = (i) => i === "start" ? "left" : i === "end" ? "right" : "center", K = (i, t, e) => i === "start" ? t : i === "end" ? e : (t + e) / 2, da = (i, t, e, s) => i === (s ? "left" : "right") ? e : i === "center" ? (t + e) / 2 : t;
function uo(i, t, e) {
  const s = t.length;
  let n = 0, o = s;
  if (i._sorted) {
    const { iScale: r, vScale: a, _parsed: l } = i, c = i.dataset && i.dataset.options ? i.dataset.options.spanGaps : null, h = r.axis, { min: d, max: u, minDefined: f, maxDefined: g } = r.getUserBounds();
    if (f) {
      if (n = Math.min(
        // @ts-expect-error Need to type _parsed
        ft(l, h, d).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        e ? s : ft(t, h, r.getPixelForValue(d)).lo
      ), c) {
        const p = l.slice(0, n + 1).reverse().findIndex((m) => !D(m[a.axis]));
        n -= Math.max(0, p);
      }
      n = U(n, 0, s - 1);
    }
    if (g) {
      let p = Math.max(
        // @ts-expect-error Need to type _parsed
        ft(l, r.axis, u, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        e ? 0 : ft(t, h, r.getPixelForValue(u), !0).hi + 1
      );
      if (c) {
        const m = l.slice(p - 1).findIndex((b) => !D(b[a.axis]));
        p += Math.max(0, m);
      }
      o = U(p, n, s) - n;
    } else
      o = s - n;
  }
  return {
    start: n,
    count: o
  };
}
function fo(i) {
  const { xScale: t, yScale: e, _scaleRanges: s } = i, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: e.min,
    ymax: e.max
  };
  if (!s)
    return i._scaleRanges = n, !0;
  const o = s.xmin !== t.min || s.xmax !== t.max || s.ymin !== e.min || s.ymax !== e.max;
  return Object.assign(s, n), o;
}
const Le = (i) => i === 0 || i === 1, Ls = (i, t, e) => -(Math.pow(2, 10 * (i -= 1)) * Math.sin((i - t) * F / e)), Rs = (i, t, e) => Math.pow(2, -10 * i) * Math.sin((i - t) * F / e) + 1, ge = {
  linear: (i) => i,
  easeInQuad: (i) => i * i,
  easeOutQuad: (i) => -i * (i - 2),
  easeInOutQuad: (i) => (i /= 0.5) < 1 ? 0.5 * i * i : -0.5 * (--i * (i - 2) - 1),
  easeInCubic: (i) => i * i * i,
  easeOutCubic: (i) => (i -= 1) * i * i + 1,
  easeInOutCubic: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i : 0.5 * ((i -= 2) * i * i + 2),
  easeInQuart: (i) => i * i * i * i,
  easeOutQuart: (i) => -((i -= 1) * i * i * i - 1),
  easeInOutQuart: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i : -0.5 * ((i -= 2) * i * i * i - 2),
  easeInQuint: (i) => i * i * i * i * i,
  easeOutQuint: (i) => (i -= 1) * i * i * i * i + 1,
  easeInOutQuint: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i * i : 0.5 * ((i -= 2) * i * i * i * i + 2),
  easeInSine: (i) => -Math.cos(i * W) + 1,
  easeOutSine: (i) => Math.sin(i * W),
  easeInOutSine: (i) => -0.5 * (Math.cos(E * i) - 1),
  easeInExpo: (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)),
  easeOutExpo: (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1,
  easeInOutExpo: (i) => Le(i) ? i : i < 0.5 ? 0.5 * Math.pow(2, 10 * (i * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2),
  easeInCirc: (i) => i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1),
  easeOutCirc: (i) => Math.sqrt(1 - (i -= 1) * i),
  easeInOutCirc: (i) => (i /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - i * i) - 1) : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
  easeInElastic: (i) => Le(i) ? i : Ls(i, 0.075, 0.3),
  easeOutElastic: (i) => Le(i) ? i : Rs(i, 0.075, 0.3),
  easeInOutElastic(i) {
    return Le(i) ? i : i < 0.5 ? 0.5 * Ls(i * 2, 0.1125, 0.45) : 0.5 + 0.5 * Rs(i * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(i) {
    return i * i * ((1.70158 + 1) * i - 1.70158);
  },
  easeOutBack(i) {
    return (i -= 1) * i * ((1.70158 + 1) * i + 1.70158) + 1;
  },
  easeInOutBack(i) {
    let t = 1.70158;
    return (i /= 0.5) < 1 ? 0.5 * (i * i * (((t *= 1.525) + 1) * i - t)) : 0.5 * ((i -= 2) * i * (((t *= 1.525) + 1) * i + t) + 2);
  },
  easeInBounce: (i) => 1 - ge.easeOutBounce(1 - i),
  easeOutBounce(i) {
    return i < 1 / 2.75 ? 7.5625 * i * i : i < 2 / 2.75 ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75 : i < 2.5 / 2.75 ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375 : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
  },
  easeInOutBounce: (i) => i < 0.5 ? ge.easeInBounce(i * 2) * 0.5 : ge.easeOutBounce(i * 2 - 1) * 0.5 + 0.5
};
function ss(i) {
  if (i && typeof i == "object") {
    const t = i.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Is(i) {
  return ss(i) ? i : new xe(i);
}
function _i(i) {
  return ss(i) ? i : new xe(i).saturate(0.5).darken(0.1).hexString();
}
const ua = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], fa = [
  "color",
  "borderColor",
  "backgroundColor"
];
function ga(i) {
  i.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), i.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), i.set("animations", {
    colors: {
      type: "color",
      properties: fa
    },
    numbers: {
      type: "number",
      properties: ua
    }
  }), i.describe("animations", {
    _fallback: "animation"
  }), i.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function pa(i) {
  i.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const $s = /* @__PURE__ */ new Map();
function ma(i, t) {
  t = t || {};
  const e = i + JSON.stringify(t);
  let s = $s.get(e);
  return s || (s = new Intl.NumberFormat(i, t), $s.set(e, s)), s;
}
function Ce(i, t, e) {
  return ma(t, e).format(i);
}
const go = {
  values(i) {
    return $(i) ? i : "" + i;
  },
  numeric(i, t, e) {
    if (i === 0)
      return "0";
    const s = this.chart.options.locale;
    let n, o = i;
    if (e.length > 1) {
      const c = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
      (c < 1e-4 || c > 1e15) && (n = "scientific"), o = ba(i, e);
    }
    const r = _t(Math.abs(o)), a = isNaN(r) ? 1 : Math.max(Math.min(-1 * Math.floor(r), 20), 0), l = {
      notation: n,
      minimumFractionDigits: a,
      maximumFractionDigits: a
    };
    return Object.assign(l, this.options.ticks.format), Ce(i, s, l);
  },
  logarithmic(i, t, e) {
    if (i === 0)
      return "0";
    const s = e[t].significand || i / Math.pow(10, Math.floor(_t(i)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(s) || t > 0.8 * e.length ? go.numeric.call(this, i, t, e) : "";
  }
};
function ba(i, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(e) >= 1 && i !== Math.floor(i) && (e = i - Math.floor(i)), e;
}
var li = {
  formatters: go
};
function _a(i) {
  i.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, e) => e.lineWidth,
      tickColor: (t, e) => e.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: li.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), i.route("scale.ticks", "color", "", "color"), i.route("scale.grid", "color", "", "borderColor"), i.route("scale.border", "color", "", "borderColor"), i.route("scale.title", "color", "", "color"), i.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), i.describe("scales", {
    _fallback: "scale"
  }), i.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const Bt = /* @__PURE__ */ Object.create(null), Ii = /* @__PURE__ */ Object.create(null);
function pe(i, t) {
  if (!t)
    return i;
  const e = t.split(".");
  for (let s = 0, n = e.length; s < n; ++s) {
    const o = e[s];
    i = i[o] || (i[o] = /* @__PURE__ */ Object.create(null));
  }
  return i;
}
function xi(i, t, e) {
  return typeof t == "string" ? ye(pe(i, t), e) : ye(pe(i, ""), t);
}
class xa {
  constructor(t, e) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (s) => s.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (s, n) => _i(n.backgroundColor), this.hoverBorderColor = (s, n) => _i(n.borderColor), this.hoverColor = (s, n) => _i(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(e);
  }
  set(t, e) {
    return xi(this, t, e);
  }
  get(t) {
    return pe(this, t);
  }
  describe(t, e) {
    return xi(Ii, t, e);
  }
  override(t, e) {
    return xi(Bt, t, e);
  }
  route(t, e, s, n) {
    const o = pe(this, t), r = pe(this, s), a = "_" + e;
    Object.defineProperties(o, {
      [a]: {
        value: o[e],
        writable: !0
      },
      [e]: {
        enumerable: !0,
        get() {
          const l = this[a], c = r[n];
          return O(l) ? Object.assign({}, c, l) : P(l, c);
        },
        set(l) {
          this[a] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((e) => e(this));
  }
}
var B = /* @__PURE__ */ new xa({
  _scriptable: (i) => !i.startsWith("on"),
  _indexable: (i) => i !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  ga,
  pa,
  _a
]);
function ya(i) {
  return !i || D(i.size) || D(i.family) ? null : (i.style ? i.style + " " : "") + (i.weight ? i.weight + " " : "") + i.size + "px " + i.family;
}
function ti(i, t, e, s, n) {
  let o = t[n];
  return o || (o = t[n] = i.measureText(n).width, e.push(n)), o > s && (s = o), s;
}
function va(i, t, e, s) {
  s = s || {};
  let n = s.data = s.data || {}, o = s.garbageCollect = s.garbageCollect || [];
  s.font !== t && (n = s.data = {}, o = s.garbageCollect = [], s.font = t), i.save(), i.font = t;
  let r = 0;
  const a = e.length;
  let l, c, h, d, u;
  for (l = 0; l < a; l++)
    if (d = e[l], d != null && !$(d))
      r = ti(i, n, o, r, d);
    else if ($(d))
      for (c = 0, h = d.length; c < h; c++)
        u = d[c], u != null && !$(u) && (r = ti(i, n, o, r, u));
  i.restore();
  const f = o.length / 2;
  if (f > e.length) {
    for (l = 0; l < f; l++)
      delete n[o[l]];
    o.splice(0, f);
  }
  return r;
}
function Dt(i, t, e) {
  const s = i.currentDevicePixelRatio, n = e !== 0 ? Math.max(e / 2, 0.5) : 0;
  return Math.round((t - n) * s) / s + n;
}
function Fs(i, t) {
  !t && !i || (t = t || i.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, i.width, i.height), t.restore());
}
function $i(i, t, e, s) {
  po(i, t, e, s, null);
}
function po(i, t, e, s, n) {
  let o, r, a, l, c, h, d, u;
  const f = t.pointStyle, g = t.rotation, p = t.radius;
  let m = (g || 0) * ea;
  if (f && typeof f == "object" && (o = f.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    i.save(), i.translate(e, s), i.rotate(m), i.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height), i.restore();
    return;
  }
  if (!(isNaN(p) || p <= 0)) {
    switch (i.beginPath(), f) {
      // Default includes circle
      default:
        n ? i.ellipse(e, s, n / 2, p, 0, 0, F) : i.arc(e, s, p, 0, F), i.closePath();
        break;
      case "triangle":
        h = n ? n / 2 : p, i.moveTo(e + Math.sin(m) * h, s - Math.cos(m) * p), m += Ds, i.lineTo(e + Math.sin(m) * h, s - Math.cos(m) * p), m += Ds, i.lineTo(e + Math.sin(m) * h, s - Math.cos(m) * p), i.closePath();
        break;
      case "rectRounded":
        c = p * 0.516, l = p - c, r = Math.cos(m + Ct) * l, d = Math.cos(m + Ct) * (n ? n / 2 - c : l), a = Math.sin(m + Ct) * l, u = Math.sin(m + Ct) * (n ? n / 2 - c : l), i.arc(e - d, s - a, c, m - E, m - W), i.arc(e + u, s - r, c, m - W, m), i.arc(e + d, s + a, c, m, m + W), i.arc(e - u, s + r, c, m + W, m + E), i.closePath();
        break;
      case "rect":
        if (!g) {
          l = Math.SQRT1_2 * p, h = n ? n / 2 : l, i.rect(e - h, s - l, 2 * h, 2 * l);
          break;
        }
        m += Ct;
      /* falls through */
      case "rectRot":
        d = Math.cos(m) * (n ? n / 2 : p), r = Math.cos(m) * p, a = Math.sin(m) * p, u = Math.sin(m) * (n ? n / 2 : p), i.moveTo(e - d, s - a), i.lineTo(e + u, s - r), i.lineTo(e + d, s + a), i.lineTo(e - u, s + r), i.closePath();
        break;
      case "crossRot":
        m += Ct;
      /* falls through */
      case "cross":
        d = Math.cos(m) * (n ? n / 2 : p), r = Math.cos(m) * p, a = Math.sin(m) * p, u = Math.sin(m) * (n ? n / 2 : p), i.moveTo(e - d, s - a), i.lineTo(e + d, s + a), i.moveTo(e + u, s - r), i.lineTo(e - u, s + r);
        break;
      case "star":
        d = Math.cos(m) * (n ? n / 2 : p), r = Math.cos(m) * p, a = Math.sin(m) * p, u = Math.sin(m) * (n ? n / 2 : p), i.moveTo(e - d, s - a), i.lineTo(e + d, s + a), i.moveTo(e + u, s - r), i.lineTo(e - u, s + r), m += Ct, d = Math.cos(m) * (n ? n / 2 : p), r = Math.cos(m) * p, a = Math.sin(m) * p, u = Math.sin(m) * (n ? n / 2 : p), i.moveTo(e - d, s - a), i.lineTo(e + d, s + a), i.moveTo(e + u, s - r), i.lineTo(e - u, s + r);
        break;
      case "line":
        r = n ? n / 2 : Math.cos(m) * p, a = Math.sin(m) * p, i.moveTo(e - r, s - a), i.lineTo(e + r, s + a);
        break;
      case "dash":
        i.moveTo(e, s), i.lineTo(e + Math.cos(m) * (n ? n / 2 : p), s + Math.sin(m) * p);
        break;
      case !1:
        i.closePath();
        break;
    }
    i.fill(), t.borderWidth > 0 && i.stroke();
  }
}
function gt(i, t, e) {
  return e = e || 0.5, !t || i && i.x > t.left - e && i.x < t.right + e && i.y > t.top - e && i.y < t.bottom + e;
}
function ci(i, t) {
  i.save(), i.beginPath(), i.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), i.clip();
}
function hi(i) {
  i.restore();
}
function Sa(i, t, e, s, n) {
  if (!t)
    return i.lineTo(e.x, e.y);
  if (n === "middle") {
    const o = (t.x + e.x) / 2;
    i.lineTo(o, t.y), i.lineTo(o, e.y);
  } else n === "after" != !!s ? i.lineTo(t.x, e.y) : i.lineTo(e.x, t.y);
  i.lineTo(e.x, e.y);
}
function Ma(i, t, e, s) {
  if (!t)
    return i.lineTo(e.x, e.y);
  i.bezierCurveTo(s ? t.cp1x : t.cp2x, s ? t.cp1y : t.cp2y, s ? e.cp2x : e.cp1x, s ? e.cp2y : e.cp1y, e.x, e.y);
}
function wa(i, t) {
  t.translation && i.translate(t.translation[0], t.translation[1]), D(t.rotation) || i.rotate(t.rotation), t.color && (i.fillStyle = t.color), t.textAlign && (i.textAlign = t.textAlign), t.textBaseline && (i.textBaseline = t.textBaseline);
}
function ka(i, t, e, s, n) {
  if (n.strikethrough || n.underline) {
    const o = i.measureText(s), r = t - o.actualBoundingBoxLeft, a = t + o.actualBoundingBoxRight, l = e - o.actualBoundingBoxAscent, c = e + o.actualBoundingBoxDescent, h = n.strikethrough ? (l + c) / 2 : c;
    i.strokeStyle = i.fillStyle, i.beginPath(), i.lineWidth = n.decorationWidth || 2, i.moveTo(r, h), i.lineTo(a, h), i.stroke();
  }
}
function Pa(i, t) {
  const e = i.fillStyle;
  i.fillStyle = t.color, i.fillRect(t.left, t.top, t.width, t.height), i.fillStyle = e;
}
function Nt(i, t, e, s, n, o = {}) {
  const r = $(t) ? t : [
    t
  ], a = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, c;
  for (i.save(), i.font = n.string, wa(i, o), l = 0; l < r.length; ++l)
    c = r[l], o.backdrop && Pa(i, o.backdrop), a && (o.strokeColor && (i.strokeStyle = o.strokeColor), D(o.strokeWidth) || (i.lineWidth = o.strokeWidth), i.strokeText(c, e, s, o.maxWidth)), i.fillText(c, e, s, o.maxWidth), ka(i, e, s, c, o), s += Number(n.lineHeight);
  i.restore();
}
function Me(i, t) {
  const { x: e, y: s, w: n, h: o, radius: r } = t;
  i.arc(e + r.topLeft, s + r.topLeft, r.topLeft, 1.5 * E, E, !0), i.lineTo(e, s + o - r.bottomLeft), i.arc(e + r.bottomLeft, s + o - r.bottomLeft, r.bottomLeft, E, W, !0), i.lineTo(e + n - r.bottomRight, s + o), i.arc(e + n - r.bottomRight, s + o - r.bottomRight, r.bottomRight, W, 0, !0), i.lineTo(e + n, s + r.topRight), i.arc(e + n - r.topRight, s + r.topRight, r.topRight, 0, -W, !0), i.lineTo(e + r.topLeft, s);
}
const Aa = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Ca = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Da(i, t) {
  const e = ("" + i).match(Aa);
  if (!e || e[1] === "normal")
    return t * 1.2;
  switch (i = +e[2], e[3]) {
    case "px":
      return i;
    case "%":
      i /= 100;
      break;
  }
  return t * i;
}
const Oa = (i) => +i || 0;
function ns(i, t) {
  const e = {}, s = O(t), n = s ? Object.keys(t) : t, o = O(i) ? s ? (r) => P(i[r], i[t[r]]) : (r) => i[r] : () => i;
  for (const r of n)
    e[r] = Oa(o(r));
  return e;
}
function mo(i) {
  return ns(i, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function It(i) {
  return ns(i, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Z(i) {
  const t = mo(i);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function V(i, t) {
  i = i || {}, t = t || B.font;
  let e = P(i.size, t.size);
  typeof e == "string" && (e = parseInt(e, 10));
  let s = P(i.style, t.style);
  s && !("" + s).match(Ca) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const n = {
    family: P(i.family, t.family),
    lineHeight: Da(P(i.lineHeight, t.lineHeight), e),
    size: e,
    style: s,
    weight: P(i.weight, t.weight),
    string: ""
  };
  return n.string = ya(n), n;
}
function le(i, t, e, s) {
  let n, o, r;
  for (n = 0, o = i.length; n < o; ++n)
    if (r = i[n], r !== void 0 && (t !== void 0 && typeof r == "function" && (r = r(t)), e !== void 0 && $(r) && (r = r[e % r.length]), r !== void 0))
      return r;
}
function Ta(i, t, e) {
  const { min: s, max: n } = i, o = so(t, (n - s) / 2), r = (a, l) => e && a === 0 ? 0 : a + l;
  return {
    min: r(s, -Math.abs(o)),
    max: r(n, o)
  };
}
function Mt(i, t) {
  return Object.assign(Object.create(i), t);
}
function os(i, t = [
  ""
], e, s, n = () => i[0]) {
  const o = e || i;
  typeof s > "u" && (s = yo("_fallback", i));
  const r = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: i,
    _rootScopes: o,
    _fallback: s,
    _getTarget: n,
    override: (a) => os([
      a,
      ...i
    ], t, o, s)
  };
  return new Proxy(r, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(a, l) {
      return delete a[l], delete a._keys, delete i[0][l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(a, l) {
      return _o(a, l, () => Ba(l, t, i, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(a, l) {
      return Reflect.getOwnPropertyDescriptor(a._scopes[0], l);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(a, l) {
      return Bs(a).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(a) {
      return Bs(a);
    },
    /**
    * A trap for setting property values.
    */
    set(a, l, c) {
      const h = a._storage || (a._storage = n());
      return a[l] = h[l] = c, delete a._keys, !0;
    }
  });
}
function Zt(i, t, e, s) {
  const n = {
    _cacheable: !1,
    _proxy: i,
    _context: t,
    _subProxy: e,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: bo(i, s),
    setContext: (o) => Zt(i, o, e, s),
    override: (o) => Zt(i.override(o), t, e, s)
  };
  return new Proxy(n, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, r) {
      return delete o[r], delete i[r], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, r, a) {
      return _o(o, r, () => La(o, r, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, r) {
      return o._descriptors.allKeys ? Reflect.has(i, r) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(i, r);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i);
    },
    /**
    * A trap for the in operator.
    */
    has(o, r) {
      return Reflect.has(i, r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(i);
    },
    /**
    * A trap for setting property values.
    */
    set(o, r, a) {
      return i[r] = a, delete o[r], !0;
    }
  });
}
function bo(i, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: e = t.scriptable, _indexable: s = t.indexable, _allKeys: n = t.allKeys } = i;
  return {
    allKeys: n,
    scriptable: e,
    indexable: s,
    isScriptable: St(e) ? e : () => e,
    isIndexable: St(s) ? s : () => s
  };
}
const Ea = (i, t) => i ? i + Qi(t) : t, rs = (i, t) => O(t) && i !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function _o(i, t, e) {
  if (Object.prototype.hasOwnProperty.call(i, t) || t === "constructor")
    return i[t];
  const s = e();
  return i[t] = s, s;
}
function La(i, t, e) {
  const { _proxy: s, _context: n, _subProxy: o, _descriptors: r } = i;
  let a = s[t];
  return St(a) && r.isScriptable(t) && (a = Ra(t, a, i, e)), $(a) && a.length && (a = Ia(t, a, i, r.isIndexable)), rs(t, a) && (a = Zt(a, n, o && o[t], r)), a;
}
function Ra(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: r, _stack: a } = e;
  if (a.has(i))
    throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + i);
  a.add(i);
  let l = t(o, r || s);
  return a.delete(i), rs(i, l) && (l = as(n._scopes, n, i, l)), l;
}
function Ia(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: r, _descriptors: a } = e;
  if (typeof o.index < "u" && s(i))
    return t[o.index % t.length];
  if (O(t[0])) {
    const l = t, c = n._scopes.filter((h) => h !== l);
    t = [];
    for (const h of l) {
      const d = as(c, n, i, h);
      t.push(Zt(d, o, r && r[i], a));
    }
  }
  return t;
}
function xo(i, t, e) {
  return St(i) ? i(t, e) : i;
}
const $a = (i, t) => i === !0 ? t : typeof i == "string" ? vt(t, i) : void 0;
function Fa(i, t, e, s, n) {
  for (const o of t) {
    const r = $a(e, o);
    if (r) {
      i.add(r);
      const a = xo(r._fallback, e, n);
      if (typeof a < "u" && a !== e && a !== s)
        return a;
    } else if (r === !1 && typeof s < "u" && e !== s)
      return null;
  }
  return !1;
}
function as(i, t, e, s) {
  const n = t._rootScopes, o = xo(t._fallback, e, s), r = [
    ...i,
    ...n
  ], a = /* @__PURE__ */ new Set();
  a.add(s);
  let l = zs(a, r, e, o || e, s);
  return l === null || typeof o < "u" && o !== e && (l = zs(a, r, o, l, s), l === null) ? !1 : os(Array.from(a), [
    ""
  ], n, o, () => za(t, e, s));
}
function zs(i, t, e, s, n) {
  for (; e; )
    e = Fa(i, t, e, s, n);
  return e;
}
function za(i, t, e) {
  const s = i._getTarget();
  t in s || (s[t] = {});
  const n = s[t];
  return $(n) && O(e) ? e : n || {};
}
function Ba(i, t, e, s) {
  let n;
  for (const o of t)
    if (n = yo(Ea(o, i), e), typeof n < "u")
      return rs(i, n) ? as(e, s, i, n) : n;
}
function yo(i, t) {
  for (const e of t) {
    if (!e)
      continue;
    const s = e[i];
    if (typeof s < "u")
      return s;
  }
}
function Bs(i) {
  let t = i._keys;
  return t || (t = i._keys = Na(i._scopes)), t;
}
function Na(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i)
    for (const s of Object.keys(e).filter((n) => !n.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
function vo(i, t, e, s) {
  const { iScale: n } = i, { key: o = "r" } = this._parsing, r = new Array(s);
  let a, l, c, h;
  for (a = 0, l = s; a < l; ++a)
    c = a + e, h = t[c], r[a] = {
      r: n.parse(vt(h, o), c)
    };
  return r;
}
const Ha = Number.EPSILON || 1e-14, Jt = (i, t) => t < i.length && !i[t].skip && i[t], So = (i) => i === "x" ? "y" : "x";
function Wa(i, t, e, s) {
  const n = i.skip ? t : i, o = t, r = e.skip ? t : e, a = Ri(o, n), l = Ri(r, o);
  let c = a / (a + l), h = l / (a + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const d = s * c, u = s * h;
  return {
    previous: {
      x: o.x - d * (r.x - n.x),
      y: o.y - d * (r.y - n.y)
    },
    next: {
      x: o.x + u * (r.x - n.x),
      y: o.y + u * (r.y - n.y)
    }
  };
}
function Va(i, t, e) {
  const s = i.length;
  let n, o, r, a, l, c = Jt(i, 0);
  for (let h = 0; h < s - 1; ++h)
    if (l = c, c = Jt(i, h + 1), !(!l || !c)) {
      if (fe(t[h], 0, Ha)) {
        e[h] = e[h + 1] = 0;
        continue;
      }
      n = e[h] / t[h], o = e[h + 1] / t[h], a = Math.pow(n, 2) + Math.pow(o, 2), !(a <= 9) && (r = 3 / Math.sqrt(a), e[h] = n * r * t[h], e[h + 1] = o * r * t[h]);
    }
}
function ja(i, t, e = "x") {
  const s = So(e), n = i.length;
  let o, r, a, l = Jt(i, 0);
  for (let c = 0; c < n; ++c) {
    if (r = a, a = l, l = Jt(i, c + 1), !a)
      continue;
    const h = a[e], d = a[s];
    r && (o = (h - r[e]) / 3, a[`cp1${e}`] = h - o, a[`cp1${s}`] = d - o * t[c]), l && (o = (l[e] - h) / 3, a[`cp2${e}`] = h + o, a[`cp2${s}`] = d + o * t[c]);
  }
}
function Ua(i, t = "x") {
  const e = So(t), s = i.length, n = Array(s).fill(0), o = Array(s);
  let r, a, l, c = Jt(i, 0);
  for (r = 0; r < s; ++r)
    if (a = l, l = c, c = Jt(i, r + 1), !!l) {
      if (c) {
        const h = c[t] - l[t];
        n[r] = h !== 0 ? (c[e] - l[e]) / h : 0;
      }
      o[r] = a ? c ? at(n[r - 1]) !== at(n[r]) ? 0 : (n[r - 1] + n[r]) / 2 : n[r - 1] : n[r];
    }
  Va(i, n, o), ja(i, o, t);
}
function Re(i, t, e) {
  return Math.max(Math.min(i, e), t);
}
function Ya(i, t) {
  let e, s, n, o, r, a = gt(i[0], t);
  for (e = 0, s = i.length; e < s; ++e)
    r = o, o = a, a = e < s - 1 && gt(i[e + 1], t), o && (n = i[e], r && (n.cp1x = Re(n.cp1x, t.left, t.right), n.cp1y = Re(n.cp1y, t.top, t.bottom)), a && (n.cp2x = Re(n.cp2x, t.left, t.right), n.cp2y = Re(n.cp2y, t.top, t.bottom)));
}
function Xa(i, t, e, s, n) {
  let o, r, a, l;
  if (t.spanGaps && (i = i.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Ua(i, n);
  else {
    let c = s ? i[i.length - 1] : i[0];
    for (o = 0, r = i.length; o < r; ++o)
      a = i[o], l = Wa(c, a, i[Math.min(o + 1, r - (s ? 0 : 1)) % r], t.tension), a.cp1x = l.previous.x, a.cp1y = l.previous.y, a.cp2x = l.next.x, a.cp2y = l.next.y, c = a;
  }
  t.capBezierPoints && Ya(i, e);
}
function ls() {
  return typeof window < "u" && typeof document < "u";
}
function cs(i) {
  let t = i.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function ei(i, t, e) {
  let s;
  return typeof i == "string" ? (s = parseInt(i, 10), i.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[e])) : s = i, s;
}
const di = (i) => i.ownerDocument.defaultView.getComputedStyle(i, null);
function Ka(i, t) {
  return di(i).getPropertyValue(t);
}
const qa = [
  "top",
  "right",
  "bottom",
  "left"
];
function $t(i, t, e) {
  const s = {};
  e = e ? "-" + e : "";
  for (let n = 0; n < 4; n++) {
    const o = qa[n];
    s[o] = parseFloat(i[t + "-" + o + e]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const Ga = (i, t, e) => (i > 0 || t > 0) && (!e || !e.shadowRoot);
function Za(i, t) {
  const e = i.touches, s = e && e.length ? e[0] : i, { offsetX: n, offsetY: o } = s;
  let r = !1, a, l;
  if (Ga(n, o, i.target))
    a = n, l = o;
  else {
    const c = t.getBoundingClientRect();
    a = s.clientX - c.left, l = s.clientY - c.top, r = !0;
  }
  return {
    x: a,
    y: l,
    box: r
  };
}
function Et(i, t) {
  if ("native" in i)
    return i;
  const { canvas: e, currentDevicePixelRatio: s } = t, n = di(e), o = n.boxSizing === "border-box", r = $t(n, "padding"), a = $t(n, "border", "width"), { x: l, y: c, box: h } = Za(i, e), d = r.left + (h && a.left), u = r.top + (h && a.top);
  let { width: f, height: g } = t;
  return o && (f -= r.width + a.width, g -= r.height + a.height), {
    x: Math.round((l - d) / f * e.width / s),
    y: Math.round((c - u) / g * e.height / s)
  };
}
function Ja(i, t, e) {
  let s, n;
  if (t === void 0 || e === void 0) {
    const o = i && cs(i);
    if (!o)
      t = i.clientWidth, e = i.clientHeight;
    else {
      const r = o.getBoundingClientRect(), a = di(o), l = $t(a, "border", "width"), c = $t(a, "padding");
      t = r.width - c.width - l.width, e = r.height - c.height - l.height, s = ei(a.maxWidth, o, "clientWidth"), n = ei(a.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: e,
    maxWidth: s || Qe,
    maxHeight: n || Qe
  };
}
const Ie = (i) => Math.round(i * 10) / 10;
function Qa(i, t, e, s) {
  const n = di(i), o = $t(n, "margin"), r = ei(n.maxWidth, i, "clientWidth") || Qe, a = ei(n.maxHeight, i, "clientHeight") || Qe, l = Ja(i, t, e);
  let { width: c, height: h } = l;
  if (n.boxSizing === "content-box") {
    const u = $t(n, "border", "width"), f = $t(n, "padding");
    c -= f.width + u.width, h -= f.height + u.height;
  }
  return c = Math.max(0, c - o.width), h = Math.max(0, s ? c / s : h - o.height), c = Ie(Math.min(c, r, l.maxWidth)), h = Ie(Math.min(h, a, l.maxHeight)), c && !h && (h = Ie(c / 2)), (t !== void 0 || e !== void 0) && s && l.height && h > l.height && (h = l.height, c = Ie(Math.floor(h * s))), {
    width: c,
    height: h
  };
}
function Ns(i, t, e) {
  const s = t || 1, n = Math.floor(i.height * s), o = Math.floor(i.width * s);
  i.height = Math.floor(i.height), i.width = Math.floor(i.width);
  const r = i.canvas;
  return r.style && (e || !r.style.height && !r.style.width) && (r.style.height = `${i.height}px`, r.style.width = `${i.width}px`), i.currentDevicePixelRatio !== s || r.height !== n || r.width !== o ? (i.currentDevicePixelRatio = s, r.height = n, r.width = o, i.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const tl = function() {
  let i = !1;
  try {
    const t = {
      get passive() {
        return i = !0, !1;
      }
    };
    ls() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return i;
}();
function Hs(i, t) {
  const e = Ka(i, t), s = e && e.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function Lt(i, t, e, s) {
  return {
    x: i.x + e * (t.x - i.x),
    y: i.y + e * (t.y - i.y)
  };
}
function el(i, t, e, s) {
  return {
    x: i.x + e * (t.x - i.x),
    y: s === "middle" ? e < 0.5 ? i.y : t.y : s === "after" ? e < 1 ? i.y : t.y : e > 0 ? t.y : i.y
  };
}
function il(i, t, e, s) {
  const n = {
    x: i.cp2x,
    y: i.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, r = Lt(i, n, e), a = Lt(n, o, e), l = Lt(o, t, e), c = Lt(r, a, e), h = Lt(a, l, e);
  return Lt(c, h, e);
}
const sl = function(i, t) {
  return {
    x(e) {
      return i + i + t - e;
    },
    setWidth(e) {
      t = e;
    },
    textAlign(e) {
      return e === "center" ? e : e === "right" ? "left" : "right";
    },
    xPlus(e, s) {
      return e - s;
    },
    leftForLtr(e, s) {
      return e - s;
    }
  };
}, nl = function() {
  return {
    x(i) {
      return i;
    },
    setWidth(i) {
    },
    textAlign(i) {
      return i;
    },
    xPlus(i, t) {
      return i + t;
    },
    leftForLtr(i, t) {
      return i;
    }
  };
};
function Xt(i, t, e) {
  return i ? sl(t, e) : nl();
}
function Mo(i, t) {
  let e, s;
  (t === "ltr" || t === "rtl") && (e = i.canvas.style, s = [
    e.getPropertyValue("direction"),
    e.getPropertyPriority("direction")
  ], e.setProperty("direction", t, "important"), i.prevTextDirection = s);
}
function wo(i, t) {
  t !== void 0 && (delete i.prevTextDirection, i.canvas.style.setProperty("direction", t[0], t[1]));
}
function ko(i) {
  return i === "angle" ? {
    between: Se,
    compare: oa,
    normalize: q
  } : {
    between: ut,
    compare: (t, e) => t - e,
    normalize: (t) => t
  };
}
function Ws({ start: i, end: t, count: e, loop: s, style: n }) {
  return {
    start: i % e,
    end: t % e,
    loop: s && (t - i + 1) % e === 0,
    style: n
  };
}
function ol(i, t, e) {
  const { property: s, start: n, end: o } = e, { between: r, normalize: a } = ko(s), l = t.length;
  let { start: c, end: h, loop: d } = i, u, f;
  if (d) {
    for (c += l, h += l, u = 0, f = l; u < f && r(a(t[c % l][s]), n, o); ++u)
      c--, h--;
    c %= l, h %= l;
  }
  return h < c && (h += l), {
    start: c,
    end: h,
    loop: d,
    style: i.style
  };
}
function Po(i, t, e) {
  if (!e)
    return [
      i
    ];
  const { property: s, start: n, end: o } = e, r = t.length, { compare: a, between: l, normalize: c } = ko(s), { start: h, end: d, loop: u, style: f } = ol(i, t, e), g = [];
  let p = !1, m = null, b, _, v;
  const y = () => l(n, v, b) && a(n, v) !== 0, x = () => a(o, b) === 0 || l(o, v, b), S = () => p || y(), M = () => !p || x();
  for (let w = h, k = h; w <= d; ++w)
    _ = t[w % r], !_.skip && (b = c(_[s]), b !== v && (p = l(b, n, o), m === null && S() && (m = a(b, n) === 0 ? w : k), m !== null && M() && (g.push(Ws({
      start: m,
      end: w,
      loop: u,
      count: r,
      style: f
    })), m = null), k = w, v = b));
  return m !== null && g.push(Ws({
    start: m,
    end: d,
    loop: u,
    count: r,
    style: f
  })), g;
}
function Ao(i, t) {
  const e = [], s = i.segments;
  for (let n = 0; n < s.length; n++) {
    const o = Po(s[n], i.points, t);
    o.length && e.push(...o);
  }
  return e;
}
function rl(i, t, e, s) {
  let n = 0, o = t - 1;
  if (e && !s)
    for (; n < t && !i[n].skip; )
      n++;
  for (; n < t && i[n].skip; )
    n++;
  for (n %= t, e && (o += n); o > n && i[o % t].skip; )
    o--;
  return o %= t, {
    start: n,
    end: o
  };
}
function al(i, t, e, s) {
  const n = i.length, o = [];
  let r = t, a = i[t], l;
  for (l = t + 1; l <= e; ++l) {
    const c = i[l % n];
    c.skip || c.stop ? a.skip || (s = !1, o.push({
      start: t % n,
      end: (l - 1) % n,
      loop: s
    }), t = r = c.stop ? l : null) : (r = l, a.skip && (t = l)), a = c;
  }
  return r !== null && o.push({
    start: t % n,
    end: r % n,
    loop: s
  }), o;
}
function ll(i, t) {
  const e = i.points, s = i.options.spanGaps, n = e.length;
  if (!n)
    return [];
  const o = !!i._loop, { start: r, end: a } = rl(e, n, o, s);
  if (s === !0)
    return Vs(i, [
      {
        start: r,
        end: a,
        loop: o
      }
    ], e, t);
  const l = a < r ? a + n : a, c = !!i._fullLoop && r === 0 && a === n - 1;
  return Vs(i, al(e, r, l, c), e, t);
}
function Vs(i, t, e, s) {
  return !s || !s.setContext || !e ? t : cl(i, t, e, s);
}
function cl(i, t, e, s) {
  const n = i._chart.getContext(), o = js(i.options), { _datasetIndex: r, options: { spanGaps: a } } = i, l = e.length, c = [];
  let h = o, d = t[0].start, u = d;
  function f(g, p, m, b) {
    const _ = a ? -1 : 1;
    if (g !== p) {
      for (g += l; e[g % l].skip; )
        g -= _;
      for (; e[p % l].skip; )
        p += _;
      g % l !== p % l && (c.push({
        start: g % l,
        end: p % l,
        loop: m,
        style: b
      }), h = b, d = p % l);
    }
  }
  for (const g of t) {
    d = a ? d : g.start;
    let p = e[d % l], m;
    for (u = d + 1; u <= g.end; u++) {
      const b = e[u % l];
      m = js(s.setContext(Mt(n, {
        type: "segment",
        p0: p,
        p1: b,
        p0DataIndex: (u - 1) % l,
        p1DataIndex: u % l,
        datasetIndex: r
      }))), hl(m, h) && f(d, u - 1, g.loop, h), p = b, h = m;
    }
    d < u - 1 && f(d, u - 1, g.loop, h);
  }
  return c;
}
function js(i) {
  return {
    backgroundColor: i.backgroundColor,
    borderCapStyle: i.borderCapStyle,
    borderDash: i.borderDash,
    borderDashOffset: i.borderDashOffset,
    borderJoinStyle: i.borderJoinStyle,
    borderWidth: i.borderWidth,
    borderColor: i.borderColor
  };
}
function hl(i, t) {
  if (!t)
    return !1;
  const e = [], s = function(n, o) {
    return ss(o) ? (e.includes(o) || e.push(o), e.indexOf(o)) : o;
  };
  return JSON.stringify(i, s) !== JSON.stringify(t, s);
}
function $e(i, t, e) {
  return i.options.clip ? i[e] : t[e];
}
function dl(i, t) {
  const { xScale: e, yScale: s } = i;
  return e && s ? {
    left: $e(e, t, "left"),
    right: $e(e, t, "right"),
    top: $e(s, t, "top"),
    bottom: $e(s, t, "bottom")
  } : t;
}
function Co(i, t) {
  const e = t._clip;
  if (e.disabled)
    return !1;
  const s = dl(t, i.chartArea);
  return {
    left: e.left === !1 ? 0 : s.left - (e.left === !0 ? 0 : e.left),
    right: e.right === !1 ? i.width : s.right + (e.right === !0 ? 0 : e.right),
    top: e.top === !1 ? 0 : s.top - (e.top === !0 ? 0 : e.top),
    bottom: e.bottom === !1 ? i.height : s.bottom + (e.bottom === !0 ? 0 : e.bottom)
  };
}
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class ul {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, e, s, n) {
    const o = e.listeners[n], r = e.duration;
    o.forEach((a) => a({
      chart: t,
      initial: e.initial,
      numSteps: r,
      currentStep: Math.min(s - e.start, r)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = co.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let e = 0;
    this._charts.forEach((s, n) => {
      if (!s.running || !s.items.length)
        return;
      const o = s.items;
      let r = o.length - 1, a = !1, l;
      for (; r >= 0; --r)
        l = o[r], l._active ? (l._total > s.duration && (s.duration = l._total), l.tick(t), a = !0) : (o[r] = o[o.length - 1], o.pop());
      a && (n.draw(), this._notify(n, s, t, "progress")), o.length || (s.running = !1, this._notify(n, s, t, "complete"), s.initial = !1), e += o.length;
    }), this._lastDate = t, e === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const e = this._charts;
    let s = e.get(t);
    return s || (s = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, e.set(t, s)), s;
  }
  listen(t, e, s) {
    this._getAnims(t).listeners[e].push(s);
  }
  add(t, e) {
    !e || !e.length || this._getAnims(t).items.push(...e);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const e = this._charts.get(t);
    e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((s, n) => Math.max(s, n._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const e = this._charts.get(t);
    return !(!e || !e.running || !e.items.length);
  }
  stop(t) {
    const e = this._charts.get(t);
    if (!e || !e.items.length)
      return;
    const s = e.items;
    let n = s.length - 1;
    for (; n >= 0; --n)
      s[n].cancel();
    e.items = [], this._notify(t, e, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var ct = /* @__PURE__ */ new ul();
const Us = "transparent", fl = {
  boolean(i, t, e) {
    return e > 0.5 ? t : i;
  },
  color(i, t, e) {
    const s = Is(i || Us), n = s.valid && Is(t || Us);
    return n && n.valid ? n.mix(s, e).hexString() : t;
  },
  number(i, t, e) {
    return i + (t - i) * e;
  }
};
class gl {
  constructor(t, e, s, n) {
    const o = e[s];
    n = le([
      t.to,
      n,
      o,
      t.from
    ]);
    const r = le([
      t.from,
      o,
      n
    ]);
    this._active = !0, this._fn = t.fn || fl[t.type || typeof r], this._easing = ge[t.easing] || ge.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = s, this._from = r, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, e, s) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = s - this._start, r = this._duration - o;
      this._start = s, this._duration = Math.floor(Math.max(r, t.duration)), this._total += o, this._loop = !!t.loop, this._to = le([
        t.to,
        e,
        n,
        t.from
      ]), this._from = le([
        t.from,
        n,
        e
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const e = t - this._start, s = this._duration, n = this._prop, o = this._from, r = this._loop, a = this._to;
    let l;
    if (this._active = o !== a && (r || e < s), !this._active) {
      this._target[n] = a, this._notify(!0);
      return;
    }
    if (e < 0) {
      this._target[n] = o;
      return;
    }
    l = e / s % 2, l = r && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[n] = this._fn(o, a, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((e, s) => {
      t.push({
        res: e,
        rej: s
      });
    });
  }
  _notify(t) {
    const e = t ? "res" : "rej", s = this._promises || [];
    for (let n = 0; n < s.length; n++)
      s[n][e]();
  }
}
class Do {
  constructor(t, e) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(e);
  }
  configure(t) {
    if (!O(t))
      return;
    const e = Object.keys(B.animation), s = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!O(o))
        return;
      const r = {};
      for (const a of e)
        r[a] = o[a];
      ($(o.properties) && o.properties || [
        n
      ]).forEach((a) => {
        (a === n || !s.has(a)) && s.set(a, r);
      });
    });
  }
  _animateOptions(t, e) {
    const s = e.options, n = ml(t, s);
    if (!n)
      return [];
    const o = this._createAnimations(n, s);
    return s.$shared && pl(t.options.$animations, s).then(() => {
      t.options = s;
    }, () => {
    }), o;
  }
  _createAnimations(t, e) {
    const s = this._properties, n = [], o = t.$animations || (t.$animations = {}), r = Object.keys(e), a = Date.now();
    let l;
    for (l = r.length - 1; l >= 0; --l) {
      const c = r[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        n.push(...this._animateOptions(t, e));
        continue;
      }
      const h = e[c];
      let d = o[c];
      const u = s.get(c);
      if (d)
        if (u && d.active()) {
          d.update(u, h, a);
          continue;
        } else
          d.cancel();
      if (!u || !u.duration) {
        t[c] = h;
        continue;
      }
      o[c] = d = new gl(u, t, c, h), n.push(d);
    }
    return n;
  }
  update(t, e) {
    if (this._properties.size === 0) {
      Object.assign(t, e);
      return;
    }
    const s = this._createAnimations(t, e);
    if (s.length)
      return ct.add(this._chart, s), !0;
  }
}
function pl(i, t) {
  const e = [], s = Object.keys(t);
  for (let n = 0; n < s.length; n++) {
    const o = i[s[n]];
    o && o.active() && e.push(o.wait());
  }
  return Promise.all(e);
}
function ml(i, t) {
  if (!t)
    return;
  let e = i.options;
  if (!e) {
    i.options = t;
    return;
  }
  return e.$shared && (i.options = e = Object.assign({}, e, {
    $shared: !1,
    $animations: {}
  })), e;
}
function Ys(i, t) {
  const e = i && i.options || {}, s = e.reverse, n = e.min === void 0 ? t : 0, o = e.max === void 0 ? t : 0;
  return {
    start: s ? o : n,
    end: s ? n : o
  };
}
function bl(i, t, e) {
  if (e === !1)
    return !1;
  const s = Ys(i, e), n = Ys(t, e);
  return {
    top: n.end,
    right: s.end,
    bottom: n.start,
    left: s.start
  };
}
function _l(i) {
  let t, e, s, n;
  return O(i) ? (t = i.top, e = i.right, s = i.bottom, n = i.left) : t = e = s = n = i, {
    top: t,
    right: e,
    bottom: s,
    left: n,
    disabled: i === !1
  };
}
function Oo(i, t) {
  const e = [], s = i._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = s.length; n < o; ++n)
    e.push(s[n].index);
  return e;
}
function Xs(i, t, e, s = {}) {
  const n = i.keys, o = s.mode === "single";
  let r, a, l, c;
  if (t === null)
    return;
  let h = !1;
  for (r = 0, a = n.length; r < a; ++r) {
    if (l = +n[r], l === e) {
      if (h = !0, s.all)
        continue;
      break;
    }
    c = i.values[l], N(c) && (o || t === 0 || at(t) === at(c)) && (t += c);
  }
  return !h && !s.all ? 0 : t;
}
function xl(i, t) {
  const { iScale: e, vScale: s } = t, n = e.axis === "x" ? "x" : "y", o = s.axis === "x" ? "x" : "y", r = Object.keys(i), a = new Array(r.length);
  let l, c, h;
  for (l = 0, c = r.length; l < c; ++l)
    h = r[l], a[l] = {
      [n]: h,
      [o]: i[h]
    };
  return a;
}
function yi(i, t) {
  const e = i && i.options.stacked;
  return e || e === void 0 && t.stack !== void 0;
}
function yl(i, t, e) {
  return `${i.id}.${t.id}.${e.stack || e.type}`;
}
function vl(i) {
  const { min: t, max: e, minDefined: s, maxDefined: n } = i.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: n ? e : Number.POSITIVE_INFINITY
  };
}
function Sl(i, t, e) {
  const s = i[t] || (i[t] = {});
  return s[e] || (s[e] = {});
}
function Ks(i, t, e, s) {
  for (const n of t.getMatchingVisibleMetas(s).reverse()) {
    const o = i[n.index];
    if (e && o > 0 || !e && o < 0)
      return n.index;
  }
  return null;
}
function qs(i, t) {
  const { chart: e, _cachedMeta: s } = i, n = e._stacks || (e._stacks = {}), { iScale: o, vScale: r, index: a } = s, l = o.axis, c = r.axis, h = yl(o, r, s), d = t.length;
  let u;
  for (let f = 0; f < d; ++f) {
    const g = t[f], { [l]: p, [c]: m } = g, b = g._stacks || (g._stacks = {});
    u = b[c] = Sl(n, h, p), u[a] = m, u._top = Ks(u, r, !0, s.type), u._bottom = Ks(u, r, !1, s.type);
    const _ = u._visualValues || (u._visualValues = {});
    _[a] = m;
  }
}
function vi(i, t) {
  const e = i.scales;
  return Object.keys(e).filter((s) => e[s].axis === t).shift();
}
function Ml(i, t) {
  return Mt(i, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function wl(i, t, e) {
  return Mt(i, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: e,
    index: t,
    mode: "default",
    type: "data"
  });
}
function ie(i, t) {
  const e = i.controller.index, s = i.vScale && i.vScale.axis;
  if (s) {
    t = t || i._parsed;
    for (const n of t) {
      const o = n._stacks;
      if (!o || o[s] === void 0 || o[s][e] === void 0)
        return;
      delete o[s][e], o[s]._visualValues !== void 0 && o[s]._visualValues[e] !== void 0 && delete o[s]._visualValues[e];
    }
  }
}
const Si = (i) => i === "reset" || i === "none", Gs = (i, t) => t ? i : Object.assign({}, i), kl = (i, t, e) => i && !t.hidden && t._stacked && {
  keys: Oo(e, !0),
  values: null
};
class wt {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, e) {
    this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = yi(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && ie(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, e = this._cachedMeta, s = this.getDataset(), n = (d, u, f, g) => d === "x" ? u : d === "r" ? g : f, o = e.xAxisID = P(s.xAxisID, vi(t, "x")), r = e.yAxisID = P(s.yAxisID, vi(t, "y")), a = e.rAxisID = P(s.rAxisID, vi(t, "r")), l = e.indexAxis, c = e.iAxisID = n(l, o, r, a), h = e.vAxisID = n(l, r, o, a);
    e.xScale = this.getScaleForId(o), e.yScale = this.getScaleForId(r), e.rScale = this.getScaleForId(a), e.iScale = this.getScaleForId(c), e.vScale = this.getScaleForId(h);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const e = this._cachedMeta;
    return t === e.iScale ? e.vScale : e.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && Es(this._data, this), t._stacked && ie(t);
  }
  _dataCheck() {
    const t = this.getDataset(), e = t.data || (t.data = []), s = this._data;
    if (O(e)) {
      const n = this._cachedMeta;
      this._data = xl(e, n);
    } else if (s !== e) {
      if (s) {
        Es(s, this);
        const n = this._cachedMeta;
        ie(n), n._parsed = [];
      }
      e && Object.isExtensible(e) && ca(e, this), this._syncList = [], this._data = e;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const e = this._cachedMeta, s = this.getDataset();
    let n = !1;
    this._dataCheck();
    const o = e._stacked;
    e._stacked = yi(e.vScale, e), e.stack !== s.stack && (n = !0, ie(e), e.stack = s.stack), this._resyncElements(t), (n || o !== e._stacked) && (qs(this, e._parsed), e._stacked = yi(e.vScale, e));
  }
  configure() {
    const t = this.chart.config, e = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), e, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, e) {
    const { _cachedMeta: s, _data: n } = this, { iScale: o, _stacked: r } = s, a = o.axis;
    let l = t === 0 && e === n.length ? !0 : s._sorted, c = t > 0 && s._parsed[t - 1], h, d, u;
    if (this._parsing === !1)
      s._parsed = n, s._sorted = !0, u = n;
    else {
      $(n[t]) ? u = this.parseArrayData(s, n, t, e) : O(n[t]) ? u = this.parseObjectData(s, n, t, e) : u = this.parsePrimitiveData(s, n, t, e);
      const f = () => d[a] === null || c && d[a] < c[a];
      for (h = 0; h < e; ++h)
        s._parsed[h + t] = d = u[h], l && (f() && (l = !1), c = d);
      s._sorted = l;
    }
    r && qs(this, u);
  }
  parsePrimitiveData(t, e, s, n) {
    const { iScale: o, vScale: r } = t, a = o.axis, l = r.axis, c = o.getLabels(), h = o === r, d = new Array(n);
    let u, f, g;
    for (u = 0, f = n; u < f; ++u)
      g = u + s, d[u] = {
        [a]: h || o.parse(c[g], g),
        [l]: r.parse(e[g], g)
      };
    return d;
  }
  parseArrayData(t, e, s, n) {
    const { xScale: o, yScale: r } = t, a = new Array(n);
    let l, c, h, d;
    for (l = 0, c = n; l < c; ++l)
      h = l + s, d = e[h], a[l] = {
        x: o.parse(d[0], h),
        y: r.parse(d[1], h)
      };
    return a;
  }
  parseObjectData(t, e, s, n) {
    const { xScale: o, yScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(n);
    let h, d, u, f;
    for (h = 0, d = n; h < d; ++h)
      u = h + s, f = e[u], c[h] = {
        x: o.parse(vt(f, a), u),
        y: r.parse(vt(f, l), u)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, e, s) {
    const n = this.chart, o = this._cachedMeta, r = e[t.axis], a = {
      keys: Oo(n, !0),
      values: e._stacks[t.axis]._visualValues
    };
    return Xs(a, r, o.index, {
      mode: s
    });
  }
  updateRangeFromParsed(t, e, s, n) {
    const o = s[e.axis];
    let r = o === null ? NaN : o;
    const a = n && s._stacks[e.axis];
    n && a && (n.values = a, r = Xs(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, r), t.max = Math.max(t.max, r);
  }
  getMinMax(t, e) {
    const s = this._cachedMeta, n = s._parsed, o = s._sorted && t === s.iScale, r = n.length, a = this._getOtherScale(t), l = kl(e, s, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: d } = vl(a);
    let u, f;
    function g() {
      f = n[u];
      const p = f[a.axis];
      return !N(f[t.axis]) || h > p || d < p;
    }
    for (u = 0; u < r && !(!g() && (this.updateRangeFromParsed(c, t, f, l), o)); ++u)
      ;
    if (o) {
      for (u = r - 1; u >= 0; --u)
        if (!g()) {
          this.updateRangeFromParsed(c, t, f, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed, s = [];
    let n, o, r;
    for (n = 0, o = e.length; n < o; ++n)
      r = e[n][t.axis], N(r) && s.push(r);
    return s;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = e.iScale, n = e.vScale, o = this.getParsed(t);
    return {
      label: s ? "" + s.getLabelForValue(o[s.axis]) : "",
      value: n ? "" + n.getLabelForValue(o[n.axis]) : ""
    };
  }
  _update(t) {
    const e = this._cachedMeta;
    this.update(t || "default"), e._clip = _l(P(this.options.clip, bl(e.xScale, e.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, e = this.chart, s = this._cachedMeta, n = s.data || [], o = e.chartArea, r = [], a = this._drawStart || 0, l = this._drawCount || n.length - a, c = this.options.drawActiveElementsOnTop;
    let h;
    for (s.dataset && s.dataset.draw(t, o, a, l), h = a; h < a + l; ++h) {
      const d = n[h];
      d.hidden || (d.active && c ? r.push(d) : d.draw(t, o));
    }
    for (h = 0; h < r.length; ++h)
      r[h].draw(t, o);
  }
  getStyle(t, e) {
    const s = e ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(t || 0, s);
  }
  getContext(t, e, s) {
    const n = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const r = this._cachedMeta.data[t];
      o = r.$context || (r.$context = wl(this.getContext(), t, r)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Ml(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!e, o.mode = s, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = "default", s) {
    const n = e === "active", o = this._cachedDataOpts, r = t + "-" + e, a = o[r], l = this.enableOptionSharing && ve(s);
    if (a)
      return Gs(a, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, t), d = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], u = c.getOptionScopes(this.getDataset(), h), f = Object.keys(B.elements[t]), g = () => this.getContext(s, n, e), p = c.resolveNamedOptions(u, f, g, d);
    return p.$shared && (p.$shared = l, o[r] = Object.freeze(Gs(p, l))), p;
  }
  _resolveAnimations(t, e, s) {
    const n = this.chart, o = this._cachedDataOpts, r = `animation-${e}`, a = o[r];
    if (a)
      return a;
    let l;
    if (n.options.animation !== !1) {
      const h = this.chart.config, d = h.datasetAnimationScopeKeys(this._type, e), u = h.getOptionScopes(this.getDataset(), d);
      l = h.createResolver(u, this.getContext(t, s, e));
    }
    const c = new Do(n, l && l.animations);
    return l && l._cacheable && (o[r] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, e) {
    return !e || Si(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, e) {
    const s = this.resolveDataElementOptions(t, e), n = this._sharedOptions, o = this.getSharedOptions(s), r = this.includeOptions(e, o) || o !== n;
    return this.updateSharedOptions(o, e, s), {
      sharedOptions: o,
      includeOptions: r
    };
  }
  updateElement(t, e, s, n) {
    Si(n) ? Object.assign(t, s) : this._resolveAnimations(e, n).update(t, s);
  }
  updateSharedOptions(t, e, s) {
    t && !Si(e) && this._resolveAnimations(void 0, e).update(t, s);
  }
  _setStyle(t, e, s, n) {
    t.active = n;
    const o = this.getStyle(e, n);
    this._resolveAnimations(e, s, n).update(t, {
      options: !n && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !1);
  }
  setHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const e = this._data, s = this._cachedMeta.data;
    for (const [a, l, c] of this._syncList)
      this[a](l, c);
    this._syncList = [];
    const n = s.length, o = e.length, r = Math.min(o, n);
    r && this.parse(0, r), o > n ? this._insertElements(n, o - n, t) : o < n && this._removeElements(o, n - o);
  }
  _insertElements(t, e, s = !0) {
    const n = this._cachedMeta, o = n.data, r = t + e;
    let a;
    const l = (c) => {
      for (c.length += e, a = c.length - 1; a >= r; a--)
        c[a] = c[a - e];
    };
    for (l(o), a = t; a < r; ++a)
      o[a] = new this.dataElementType();
    this._parsing && l(n._parsed), this.parse(t, e), s && this.updateElements(o, t, e, "reset");
  }
  updateElements(t, e, s, n) {
  }
  _removeElements(t, e) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const n = s._parsed.splice(t, e);
      s._stacked && ie(s, n);
    }
    s.data.splice(t, e);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [e, s, n] = t;
      this[e](s, n);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, e) {
    e && this._sync([
      "_removeElements",
      t,
      e
    ]);
    const s = arguments.length - 2;
    s && this._sync([
      "_insertElements",
      t,
      s
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
function Pl(i, t) {
  if (!i._cache.$bar) {
    const e = i.getMatchingVisibleMetas(t);
    let s = [];
    for (let n = 0, o = e.length; n < o; n++)
      s = s.concat(e[n].controller.getAllParsedValues(i));
    i._cache.$bar = lo(s.sort((n, o) => n - o));
  }
  return i._cache.$bar;
}
function Al(i) {
  const t = i.iScale, e = Pl(t, i.type);
  let s = t._length, n, o, r, a;
  const l = () => {
    r === 32767 || r === -32768 || (ve(a) && (s = Math.min(s, Math.abs(r - a) || s)), a = r);
  };
  for (n = 0, o = e.length; n < o; ++n)
    r = t.getPixelForValue(e[n]), l();
  for (a = void 0, n = 0, o = t.ticks.length; n < o; ++n)
    r = t.getPixelForTick(n), l();
  return s;
}
function Cl(i, t, e, s) {
  const n = e.barThickness;
  let o, r;
  return D(n) ? (o = t.min * e.categoryPercentage, r = e.barPercentage) : (o = n * s, r = 1), {
    chunk: o / s,
    ratio: r,
    start: t.pixels[i] - o / 2
  };
}
function Dl(i, t, e, s) {
  const n = t.pixels, o = n[i];
  let r = i > 0 ? n[i - 1] : null, a = i < n.length - 1 ? n[i + 1] : null;
  const l = e.categoryPercentage;
  r === null && (r = o - (a === null ? t.end - t.start : a - o)), a === null && (a = o + o - r);
  const c = o - (o - Math.min(r, a)) / 2 * l;
  return {
    chunk: Math.abs(a - r) / 2 * l / s,
    ratio: e.barPercentage,
    start: c
  };
}
function Ol(i, t, e, s) {
  const n = e.parse(i[0], s), o = e.parse(i[1], s), r = Math.min(n, o), a = Math.max(n, o);
  let l = r, c = a;
  Math.abs(r) > Math.abs(a) && (l = a, c = r), t[e.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: n,
    end: o,
    min: r,
    max: a
  };
}
function To(i, t, e, s) {
  return $(i) ? Ol(i, t, e, s) : t[e.axis] = e.parse(i, s), t;
}
function Zs(i, t, e, s) {
  const n = i.iScale, o = i.vScale, r = n.getLabels(), a = n === o, l = [];
  let c, h, d, u;
  for (c = e, h = e + s; c < h; ++c)
    u = t[c], d = {}, d[n.axis] = a || n.parse(r[c], c), l.push(To(u, d, o, c));
  return l;
}
function Mi(i) {
  return i && i.barStart !== void 0 && i.barEnd !== void 0;
}
function Tl(i, t, e) {
  return i !== 0 ? at(i) : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1);
}
function El(i) {
  let t, e, s, n, o;
  return i.horizontal ? (t = i.base > i.x, e = "left", s = "right") : (t = i.base < i.y, e = "bottom", s = "top"), t ? (n = "end", o = "start") : (n = "start", o = "end"), {
    start: e,
    end: s,
    reverse: t,
    top: n,
    bottom: o
  };
}
function Ll(i, t, e, s) {
  let n = t.borderSkipped;
  const o = {};
  if (!n) {
    i.borderSkipped = o;
    return;
  }
  if (n === !0) {
    i.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: r, end: a, reverse: l, top: c, bottom: h } = El(i);
  n === "middle" && e && (i.enableBorderRadius = !0, (e._top || 0) === s ? n = c : (e._bottom || 0) === s ? n = h : (o[Js(h, r, a, l)] = !0, n = c)), o[Js(n, r, a, l)] = !0, i.borderSkipped = o;
}
function Js(i, t, e, s) {
  return s ? (i = Rl(i, t, e), i = Qs(i, e, t)) : i = Qs(i, t, e), i;
}
function Rl(i, t, e) {
  return i === t ? e : i === e ? t : i;
}
function Qs(i, t, e) {
  return i === "start" ? t : i === "end" ? e : i;
}
function Il(i, { inflateAmount: t }, e) {
  i.inflateAmount = t === "auto" ? e === 1 ? 0.33 : 0 : t;
}
class $l extends wt {
  static id = "bar";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "bar",
    categoryPercentage: 0.8,
    barPercentage: 0.9,
    grouped: !0,
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "base",
          "width",
          "height"
        ]
      }
    }
  };
  static overrides = {
    scales: {
      _index_: {
        type: "category",
        offset: !0,
        grid: {
          offset: !0
        }
      },
      _value_: {
        type: "linear",
        beginAtZero: !0
      }
    }
  };
  parsePrimitiveData(t, e, s, n) {
    return Zs(t, e, s, n);
  }
  parseArrayData(t, e, s, n) {
    return Zs(t, e, s, n);
  }
  parseObjectData(t, e, s, n) {
    const { iScale: o, vScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = o.axis === "x" ? a : l, h = r.axis === "x" ? a : l, d = [];
    let u, f, g, p;
    for (u = s, f = s + n; u < f; ++u)
      p = e[u], g = {}, g[o.axis] = o.parse(vt(p, c), u), d.push(To(vt(p, h), g, r, u));
    return d;
  }
  updateRangeFromParsed(t, e, s, n) {
    super.updateRangeFromParsed(t, e, s, n);
    const o = s._custom;
    o && e === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, { iScale: s, vScale: n } = e, o = this.getParsed(t), r = o._custom, a = Mi(r) ? "[" + r.start + ", " + r.end + "]" : "" + n.getLabelForValue(o[n.axis]);
    return {
      label: "" + s.getLabelForValue(o[s.axis]),
      value: a
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const e = this._cachedMeta;
    this.updateElements(e.data, 0, e.data.length, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { index: r, _cachedMeta: { vScale: a } } = this, l = a.getBasePixel(), c = a.isHorizontal(), h = this._getRuler(), { sharedOptions: d, includeOptions: u } = this._getSharedOptions(e, n);
    for (let f = e; f < e + s; f++) {
      const g = this.getParsed(f), p = o || D(g[a.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(f), m = this._calculateBarIndexPixels(f, h), b = (g._stacks || {})[a.axis], _ = {
        horizontal: c,
        base: p.base,
        enableBorderRadius: !b || Mi(g._custom) || r === b._top || r === b._bottom,
        x: c ? p.head : m.center,
        y: c ? m.center : p.head,
        height: c ? m.size : Math.abs(p.size),
        width: c ? Math.abs(p.size) : m.size
      };
      u && (_.options = d || this.resolveDataElementOptions(f, t[f].active ? "active" : n));
      const v = _.options || t[f].options;
      Ll(_, v, b, r), Il(_, v, h.ratio), this.updateElement(t[f], f, _, n);
    }
  }
  _getStacks(t, e) {
    const { iScale: s } = this._cachedMeta, n = s.getMatchingVisibleMetas(this._type).filter((h) => h.controller.options.grouped), o = s.options.stacked, r = [], a = this._cachedMeta.controller.getParsed(e), l = a && a[s.axis], c = (h) => {
      const d = h._parsed.find((f) => f[s.axis] === l), u = d && d[h.vScale.axis];
      if (D(u) || isNaN(u))
        return !0;
    };
    for (const h of n)
      if (!(e !== void 0 && c(h)) && ((o === !1 || r.indexOf(h.stack) === -1 || o === void 0 && h.stack === void 0) && r.push(h.stack), h.index === t))
        break;
    return r.length || r.push(void 0), r;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const t = this.chart.scales, e = this.chart.options.indexAxis;
    return Object.keys(t).filter((s) => t[s].axis === e).shift();
  }
  _getAxis() {
    const t = {}, e = this.getFirstScaleIdForIndexAxis();
    for (const s of this.chart.data.datasets)
      t[P(this.chart.options.indexAxis === "x" ? s.xAxisID : s.yAxisID, e)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, e, s) {
    const n = this._getStacks(t, s), o = e !== void 0 ? n.indexOf(e) : -1;
    return o === -1 ? n.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, e = this._cachedMeta, s = e.iScale, n = [];
    let o, r;
    for (o = 0, r = e.data.length; o < r; ++o)
      n.push(s.getPixelForValue(this.getParsed(o)[s.axis], o));
    const a = t.barThickness;
    return {
      min: a || Al(e),
      pixels: n,
      start: s._startPixel,
      end: s._endPixel,
      stackCount: this._getStackCount(),
      scale: s,
      grouped: t.grouped,
      ratio: a ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: e, _stacked: s, index: n }, options: { base: o, minBarLength: r } } = this, a = o || 0, l = this.getParsed(t), c = l._custom, h = Mi(c);
    let d = l[e.axis], u = 0, f = s ? this.applyStack(e, l, s) : d, g, p;
    f !== d && (u = f - d, f = d), h && (d = c.barStart, f = c.barEnd - c.barStart, d !== 0 && at(d) !== at(c.barEnd) && (u = 0), u += d);
    const m = !D(o) && !h ? o : u;
    let b = e.getPixelForValue(m);
    if (this.chart.getDataVisibility(t) ? g = e.getPixelForValue(u + f) : g = b, p = g - b, Math.abs(p) < r) {
      p = Tl(p, e, a) * r, d === a && (b -= p / 2);
      const _ = e.getPixelForDecimal(0), v = e.getPixelForDecimal(1), y = Math.min(_, v), x = Math.max(_, v);
      b = Math.max(Math.min(b, x), y), g = b + p, s && !h && (l._stacks[e.axis]._visualValues[n] = e.getValueForPixel(g) - e.getValueForPixel(b));
    }
    if (b === e.getPixelForValue(a)) {
      const _ = at(p) * e.getLineWidthForValue(a) / 2;
      b += _, p -= _;
    }
    return {
      size: p,
      base: b,
      head: g,
      center: g + p / 2
    };
  }
  _calculateBarIndexPixels(t, e) {
    const s = e.scale, n = this.options, o = n.skipNull, r = P(n.maxBarThickness, 1 / 0);
    let a, l;
    const c = this._getAxisCount();
    if (e.grouped) {
      const h = o ? this._getStackCount(t) : e.stackCount, d = n.barThickness === "flex" ? Dl(t, e, n, h * c) : Cl(t, e, n, h * c), u = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, f = this._getAxis().indexOf(P(u, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + f;
      a = d.start + d.chunk * g + d.chunk / 2, l = Math.min(r, d.chunk * d.ratio);
    } else
      a = s.getPixelForValue(this.getParsed(t)[s.axis], t), l = Math.min(r, e.min * e.ratio);
    return {
      base: a - l / 2,
      head: a + l / 2,
      center: a,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, e = t.vScale, s = t.data, n = s.length;
    let o = 0;
    for (; o < n; ++o)
      this.getParsed(o)[e.axis] !== null && !s[o].hidden && s[o].draw(this._ctx);
  }
}
class Fl extends wt {
  static id = "bubble";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "point",
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "borderWidth",
          "radius"
        ]
      }
    }
  };
  static overrides = {
    scales: {
      x: {
        type: "linear"
      },
      y: {
        type: "linear"
      }
    }
  };
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(t, e, s, n) {
    const o = super.parsePrimitiveData(t, e, s, n);
    for (let r = 0; r < o.length; r++)
      o[r]._custom = this.resolveDataElementOptions(r + s).radius;
    return o;
  }
  parseArrayData(t, e, s, n) {
    const o = super.parseArrayData(t, e, s, n);
    for (let r = 0; r < o.length; r++) {
      const a = e[s + r];
      o[r]._custom = P(a[2], this.resolveDataElementOptions(r + s).radius);
    }
    return o;
  }
  parseObjectData(t, e, s, n) {
    const o = super.parseObjectData(t, e, s, n);
    for (let r = 0; r < o.length; r++) {
      const a = e[s + r];
      o[r]._custom = P(a && a.r && +a.r, this.resolveDataElementOptions(r + s).radius);
    }
    return o;
  }
  getMaxOverflow() {
    const t = this._cachedMeta.data;
    let e = 0;
    for (let s = t.length - 1; s >= 0; --s)
      e = Math.max(e, t[s].size(this.resolveDataElementOptions(s)) / 2);
    return e > 0 && e;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart.data.labels || [], { xScale: n, yScale: o } = e, r = this.getParsed(t), a = n.getLabelForValue(r.x), l = o.getLabelForValue(r.y), c = r._custom;
    return {
      label: s[t] || "",
      value: "(" + a + ", " + l + (c ? ", " + c : "") + ")"
    };
  }
  update(t) {
    const e = this._cachedMeta.data;
    this.updateElements(e, 0, e.length, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a } = this._cachedMeta, { sharedOptions: l, includeOptions: c } = this._getSharedOptions(e, n), h = r.axis, d = a.axis;
    for (let u = e; u < e + s; u++) {
      const f = t[u], g = !o && this.getParsed(u), p = {}, m = p[h] = o ? r.getPixelForDecimal(0.5) : r.getPixelForValue(g[h]), b = p[d] = o ? a.getBasePixel() : a.getPixelForValue(g[d]);
      p.skip = isNaN(m) || isNaN(b), c && (p.options = l || this.resolveDataElementOptions(u, f.active ? "active" : n), o && (p.options.radius = 0)), this.updateElement(f, u, p, n);
    }
  }
  resolveDataElementOptions(t, e) {
    const s = this.getParsed(t);
    let n = super.resolveDataElementOptions(t, e);
    n.$shared && (n = Object.assign({}, n, {
      $shared: !1
    }));
    const o = n.radius;
    return e !== "active" && (n.radius = 0), n.radius += P(s && s._custom, o), n;
  }
}
function zl(i, t, e) {
  let s = 1, n = 1, o = 0, r = 0;
  if (t < F) {
    const a = i, l = a + t, c = Math.cos(a), h = Math.sin(a), d = Math.cos(l), u = Math.sin(l), f = (v, y, x) => Se(v, a, l, !0) ? 1 : Math.max(y, y * e, x, x * e), g = (v, y, x) => Se(v, a, l, !0) ? -1 : Math.min(y, y * e, x, x * e), p = f(0, c, d), m = f(W, h, u), b = g(E, c, d), _ = g(E + W, h, u);
    s = (p - b) / 2, n = (m - _) / 2, o = -(p + b) / 2, r = -(m + _) / 2;
  }
  return {
    ratioX: s,
    ratioY: n,
    offsetX: o,
    offsetY: r
  };
}
class hs extends wt {
  static id = "doughnut";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "arc",
    animation: {
      animateRotate: !0,
      animateScale: !1
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "circumference",
          "endAngle",
          "innerRadius",
          "outerRadius",
          "startAngle",
          "x",
          "y",
          "offset",
          "borderWidth",
          "spacing"
        ]
      }
    },
    cutout: "50%",
    rotation: 0,
    circumference: 360,
    radius: "100%",
    spacing: 0,
    indexAxis: "r"
  };
  static descriptors = {
    _scriptable: (t) => t !== "spacing",
    _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
  };
  static overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(t) {
            const e = t.data;
            if (e.labels.length && e.datasets.length) {
              const { labels: { pointStyle: s, color: n } } = t.legend.options;
              return e.labels.map((o, r) => {
                const l = t.getDatasetMeta(0).controller.getStyle(r);
                return {
                  text: o,
                  fillStyle: l.backgroundColor,
                  strokeStyle: l.borderColor,
                  fontColor: n,
                  lineWidth: l.borderWidth,
                  pointStyle: s,
                  hidden: !t.getDataVisibility(r),
                  index: r
                };
              });
            }
            return [];
          }
        },
        onClick(t, e, s) {
          s.chart.toggleDataVisibility(e.index), s.chart.update();
        }
      }
    }
  };
  constructor(t, e) {
    super(t, e), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, e) {
    const s = this.getDataset().data, n = this._cachedMeta;
    if (this._parsing === !1)
      n._parsed = s;
    else {
      let o = (l) => +s[l];
      if (O(s[t])) {
        const { key: l = "value" } = this._parsing;
        o = (c) => +vt(s[c], l);
      }
      let r, a;
      for (r = t, a = t + e; r < a; ++r)
        n._parsed[r] = o(r);
    }
  }
  _getRotation() {
    return nt(this.options.rotation - 90);
  }
  _getCircumference() {
    return nt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = F, e = -F;
    for (let s = 0; s < this.chart.data.datasets.length; ++s)
      if (this.chart.isDatasetVisible(s) && this.chart.getDatasetMeta(s).type === this._type) {
        const n = this.chart.getDatasetMeta(s).controller, o = n._getRotation(), r = n._getCircumference();
        t = Math.min(t, o), e = Math.max(e, o + r);
      }
    return {
      rotation: t,
      circumference: e - t
    };
  }
  update(t) {
    const e = this.chart, { chartArea: s } = e, n = this._cachedMeta, o = n.data, r = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, a = Math.max((Math.min(s.width, s.height) - r) / 2, 0), l = Math.min(Kr(this.options.cutout, a), 1), c = this._getRingWeight(this.index), { circumference: h, rotation: d } = this._getRotationExtents(), { ratioX: u, ratioY: f, offsetX: g, offsetY: p } = zl(d, h, l), m = (s.width - r) / u, b = (s.height - r) / f, _ = Math.max(Math.min(m, b) / 2, 0), v = so(this.options.radius, _), y = Math.max(v * l, 0), x = (v - y) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * v, this.offsetY = p * v, n.total = this.calculateTotal(), this.outerRadius = v - x * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - x * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, e) {
    const s = this.options, n = this._cachedMeta, o = this._getCircumference();
    return e && s.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / F);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", r = this.chart, a = r.chartArea, c = r.options.animation, h = (a.left + a.right) / 2, d = (a.top + a.bottom) / 2, u = o && c.animateScale, f = u ? 0 : this.innerRadius, g = u ? 0 : this.outerRadius, { sharedOptions: p, includeOptions: m } = this._getSharedOptions(e, n);
    let b = this._getRotation(), _;
    for (_ = 0; _ < e; ++_)
      b += this._circumference(_, o);
    for (_ = e; _ < e + s; ++_) {
      const v = this._circumference(_, o), y = t[_], x = {
        x: h + this.offsetX,
        y: d + this.offsetY,
        startAngle: b,
        endAngle: b + v,
        circumference: v,
        outerRadius: g,
        innerRadius: f
      };
      m && (x.options = p || this.resolveDataElementOptions(_, y.active ? "active" : n)), b += v, this.updateElement(y, _, x, n);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, e = t.data;
    let s = 0, n;
    for (n = 0; n < e.length; n++) {
      const o = t._parsed[n];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(n) && !e[n].hidden && (s += Math.abs(o));
    }
    return s;
  }
  calculateCircumference(t) {
    const e = this._cachedMeta.total;
    return e > 0 && !isNaN(t) ? F * (Math.abs(t) / e) : 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart, n = s.data.labels || [], o = Ce(e._parsed[t], s.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let e = 0;
    const s = this.chart;
    let n, o, r, a, l;
    if (!t) {
      for (n = 0, o = s.data.datasets.length; n < o; ++n)
        if (s.isDatasetVisible(n)) {
          r = s.getDatasetMeta(n), t = r.data, a = r.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (n = 0, o = t.length; n < o; ++n)
      l = a.resolveDataElementOptions(n), l.borderAlign !== "inner" && (e = Math.max(e, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return e;
  }
  getMaxOffset(t) {
    let e = 0;
    for (let s = 0, n = t.length; s < n; ++s) {
      const o = this.resolveDataElementOptions(s);
      e = Math.max(e, o.offset || 0, o.hoverOffset || 0);
    }
    return e;
  }
  _getRingWeightOffset(t) {
    let e = 0;
    for (let s = 0; s < t; ++s)
      this.chart.isDatasetVisible(s) && (e += this._getRingWeight(s));
    return e;
  }
  _getRingWeight(t) {
    return Math.max(P(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Bl extends wt {
  static id = "line";
  static defaults = {
    datasetElementType: "line",
    dataElementType: "point",
    showLine: !0,
    spanGaps: !1
  };
  static overrides = {
    scales: {
      _index_: {
        type: "category"
      },
      _value_: {
        type: "linear"
      }
    }
  };
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const e = this._cachedMeta, { dataset: s, data: n = [], _dataset: o } = e, r = this.chart._animationsDisabled;
    let { start: a, count: l } = uo(e, n, r);
    this._drawStart = a, this._drawCount = l, fo(e) && (a = 0, l = n.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!o._decimated, s.points = n;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !r,
      options: c
    }, t), this.updateElements(n, a, l, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: d } = this._getSharedOptions(e, n), u = r.axis, f = a.axis, { spanGaps: g, segment: p } = this.options, m = Gt(g) ? g : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || o || n === "none", _ = e + s, v = t.length;
    let y = e > 0 && this.getParsed(e - 1);
    for (let x = 0; x < v; ++x) {
      const S = t[x], M = b ? S : {};
      if (x < e || x >= _) {
        M.skip = !0;
        continue;
      }
      const w = this.getParsed(x), k = D(w[f]), A = M[u] = r.getPixelForValue(w[u], x), C = M[f] = o || k ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, w, l) : w[f], x);
      M.skip = isNaN(A) || isNaN(C) || k, M.stop = x > 0 && Math.abs(w[u] - y[u]) > m, p && (M.parsed = w, M.raw = c.data[x]), d && (M.options = h || this.resolveDataElementOptions(x, S.active ? "active" : n)), b || this.updateElement(S, x, M, n), y = w;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.dataset, s = e.options && e.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return s;
    const o = n[0].size(this.resolveDataElementOptions(0)), r = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(s, o, r) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
class Eo extends wt {
  static id = "polarArea";
  static defaults = {
    dataElementType: "arc",
    animation: {
      animateRotate: !0,
      animateScale: !0
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "startAngle",
          "endAngle",
          "innerRadius",
          "outerRadius"
        ]
      }
    },
    indexAxis: "r",
    startAngle: 0
  };
  static overrides = {
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          generateLabels(t) {
            const e = t.data;
            if (e.labels.length && e.datasets.length) {
              const { labels: { pointStyle: s, color: n } } = t.legend.options;
              return e.labels.map((o, r) => {
                const l = t.getDatasetMeta(0).controller.getStyle(r);
                return {
                  text: o,
                  fillStyle: l.backgroundColor,
                  strokeStyle: l.borderColor,
                  fontColor: n,
                  lineWidth: l.borderWidth,
                  pointStyle: s,
                  hidden: !t.getDataVisibility(r),
                  index: r
                };
              });
            }
            return [];
          }
        },
        onClick(t, e, s) {
          s.chart.toggleDataVisibility(e.index), s.chart.update();
        }
      }
    },
    scales: {
      r: {
        type: "radialLinear",
        angleLines: {
          display: !1
        },
        beginAtZero: !0,
        grid: {
          circular: !0
        },
        pointLabels: {
          display: !1
        },
        startAngle: 0
      }
    }
  };
  constructor(t, e) {
    super(t, e), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart, n = s.data.labels || [], o = Ce(e._parsed[t].r, s.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  parseObjectData(t, e, s, n) {
    return vo.bind(this)(t, e, s, n);
  }
  update(t) {
    const e = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(e, 0, e.length, t);
  }
  getMinMax() {
    const t = this._cachedMeta, e = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    return t.data.forEach((s, n) => {
      const o = this.getParsed(n).r;
      !isNaN(o) && this.chart.getDataVisibility(n) && (o < e.min && (e.min = o), o > e.max && (e.max = o));
    }), e;
  }
  _updateRadius() {
    const t = this.chart, e = t.chartArea, s = t.options, n = Math.min(e.right - e.left, e.bottom - e.top), o = Math.max(n / 2, 0), r = Math.max(s.cutoutPercentage ? o / 100 * s.cutoutPercentage : 1, 0), a = (o - r) / t.getVisibleDatasetCount();
    this.outerRadius = o - a * this.index, this.innerRadius = this.outerRadius - a;
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", r = this.chart, l = r.options.animation, c = this._cachedMeta.rScale, h = c.xCenter, d = c.yCenter, u = c.getIndexAngle(0) - 0.5 * E;
    let f = u, g;
    const p = 360 / this.countVisibleElements();
    for (g = 0; g < e; ++g)
      f += this._computeAngle(g, n, p);
    for (g = e; g < e + s; g++) {
      const m = t[g];
      let b = f, _ = f + this._computeAngle(g, n, p), v = r.getDataVisibility(g) ? c.getDistanceFromCenterForValue(this.getParsed(g).r) : 0;
      f = _, o && (l.animateScale && (v = 0), l.animateRotate && (b = _ = u));
      const y = {
        x: h,
        y: d,
        innerRadius: 0,
        outerRadius: v,
        startAngle: b,
        endAngle: _,
        options: this.resolveDataElementOptions(g, m.active ? "active" : n)
      };
      this.updateElement(m, g, y, n);
    }
  }
  countVisibleElements() {
    const t = this._cachedMeta;
    let e = 0;
    return t.data.forEach((s, n) => {
      !isNaN(this.getParsed(n).r) && this.chart.getDataVisibility(n) && e++;
    }), e;
  }
  _computeAngle(t, e, s) {
    return this.chart.getDataVisibility(t) ? nt(this.resolveDataElementOptions(t, e).angle || s) : 0;
  }
}
class Nl extends hs {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
class Hl extends wt {
  static id = "radar";
  static defaults = {
    datasetElementType: "line",
    dataElementType: "point",
    indexAxis: "r",
    showLine: !0,
    elements: {
      line: {
        fill: "start"
      }
    }
  };
  static overrides = {
    aspectRatio: 1,
    scales: {
      r: {
        type: "radialLinear"
      }
    }
  };
  getLabelAndValue(t) {
    const e = this._cachedMeta.vScale, s = this.getParsed(t);
    return {
      label: e.getLabels()[t],
      value: "" + e.getLabelForValue(s[e.axis])
    };
  }
  parseObjectData(t, e, s, n) {
    return vo.bind(this)(t, e, s, n);
  }
  update(t) {
    const e = this._cachedMeta, s = e.dataset, n = e.data || [], o = e.iScale.getLabels();
    if (s.points = n, t !== "resize") {
      const r = this.resolveDatasetElementOptions(t);
      this.options.showLine || (r.borderWidth = 0);
      const a = {
        _loop: !0,
        _fullLoop: o.length === n.length,
        options: r
      };
      this.updateElement(s, void 0, a, t);
    }
    this.updateElements(n, 0, n.length, t);
  }
  updateElements(t, e, s, n) {
    const o = this._cachedMeta.rScale, r = n === "reset";
    for (let a = e; a < e + s; a++) {
      const l = t[a], c = this.resolveDataElementOptions(a, l.active ? "active" : n), h = o.getPointPositionForValue(a, this.getParsed(a).r), d = r ? o.xCenter : h.x, u = r ? o.yCenter : h.y, f = {
        x: d,
        y: u,
        angle: h.angle,
        skip: isNaN(d) || isNaN(u),
        options: c
      };
      this.updateElement(l, a, f, n);
    }
  }
}
class Wl extends wt {
  static id = "scatter";
  static defaults = {
    datasetElementType: !1,
    dataElementType: "point",
    showLine: !1,
    fill: !1
  };
  static overrides = {
    interaction: {
      mode: "point"
    },
    scales: {
      x: {
        type: "linear"
      },
      y: {
        type: "linear"
      }
    }
  };
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart.data.labels || [], { xScale: n, yScale: o } = e, r = this.getParsed(t), a = n.getLabelForValue(r.x), l = o.getLabelForValue(r.y);
    return {
      label: s[t] || "",
      value: "(" + a + ", " + l + ")"
    };
  }
  update(t) {
    const e = this._cachedMeta, { data: s = [] } = e, n = this.chart._animationsDisabled;
    let { start: o, count: r } = uo(e, s, n);
    if (this._drawStart = o, this._drawCount = r, fo(e) && (o = 0, r = s.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: a, _dataset: l } = e;
      a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!l._decimated, a.points = s;
      const c = this.resolveDatasetElementOptions(t);
      c.segment = this.options.segment, this.updateElement(a, void 0, {
        animated: !n,
        options: c
      }, t);
    } else this.datasetElementType && (delete e.dataset, this.datasetElementType = !1);
    this.updateElements(s, o, r, t);
  }
  addElements() {
    const { showLine: t } = this.options;
    !this.datasetElementType && t && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta, h = this.resolveDataElementOptions(e, n), d = this.getSharedOptions(h), u = this.includeOptions(n, d), f = r.axis, g = a.axis, { spanGaps: p, segment: m } = this.options, b = Gt(p) ? p : Number.POSITIVE_INFINITY, _ = this.chart._animationsDisabled || o || n === "none";
    let v = e > 0 && this.getParsed(e - 1);
    for (let y = e; y < e + s; ++y) {
      const x = t[y], S = this.getParsed(y), M = _ ? x : {}, w = D(S[g]), k = M[f] = r.getPixelForValue(S[f], y), A = M[g] = o || w ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, S, l) : S[g], y);
      M.skip = isNaN(k) || isNaN(A) || w, M.stop = y > 0 && Math.abs(S[f] - v[f]) > b, m && (M.parsed = S, M.raw = c.data[y]), u && (M.options = d || this.resolveDataElementOptions(y, x.active ? "active" : n)), _ || this.updateElement(x, y, M, n), v = S;
    }
    this.updateSharedOptions(d, n, h);
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.data || [];
    if (!this.options.showLine) {
      let a = 0;
      for (let l = e.length - 1; l >= 0; --l)
        a = Math.max(a, e[l].size(this.resolveDataElementOptions(l)) / 2);
      return a > 0 && a;
    }
    const s = t.dataset, n = s.options && s.options.borderWidth || 0;
    if (!e.length)
      return n;
    const o = e[0].size(this.resolveDataElementOptions(0)), r = e[e.length - 1].size(this.resolveDataElementOptions(e.length - 1));
    return Math.max(n, o, r) / 2;
  }
}
var Vl = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: $l,
  BubbleController: Fl,
  DoughnutController: hs,
  LineController: Bl,
  PieController: Nl,
  PolarAreaController: Eo,
  RadarController: Hl,
  ScatterController: Wl
});
function Ot() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class ds {
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(ds.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Ot();
  }
  parse() {
    return Ot();
  }
  format() {
    return Ot();
  }
  add() {
    return Ot();
  }
  diff() {
    return Ot();
  }
  startOf() {
    return Ot();
  }
  endOf() {
    return Ot();
  }
}
var jl = {
  _date: ds
};
function Ul(i, t, e, s) {
  const { controller: n, data: o, _sorted: r } = i, a = n._cachedMeta.iScale, l = i.dataset && i.dataset.options ? i.dataset.options.spanGaps : null;
  if (a && t === a.axis && t !== "r" && r && o.length) {
    const c = a._reversePixels ? aa : ft;
    if (s) {
      if (n._sharedOptions) {
        const h = o[0], d = typeof h.getRange == "function" && h.getRange(t);
        if (d) {
          const u = c(o, t, e - d), f = c(o, t, e + d);
          return {
            lo: u.lo,
            hi: f.hi
          };
        }
      }
    } else {
      const h = c(o, t, e);
      if (l) {
        const { vScale: d } = n._cachedMeta, { _parsed: u } = i, f = u.slice(0, h.lo + 1).reverse().findIndex((p) => !D(p[d.axis]));
        h.lo -= Math.max(0, f);
        const g = u.slice(h.hi).findIndex((p) => !D(p[d.axis]));
        h.hi += Math.max(0, g);
      }
      return h;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function ui(i, t, e, s, n) {
  const o = i.getSortedVisibleDatasetMetas(), r = e[t];
  for (let a = 0, l = o.length; a < l; ++a) {
    const { index: c, data: h } = o[a], { lo: d, hi: u } = Ul(o[a], t, r, n);
    for (let f = d; f <= u; ++f) {
      const g = h[f];
      g.skip || s(g, c, f);
    }
  }
}
function Yl(i) {
  const t = i.indexOf("x") !== -1, e = i.indexOf("y") !== -1;
  return function(s, n) {
    const o = t ? Math.abs(s.x - n.x) : 0, r = e ? Math.abs(s.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2));
  };
}
function wi(i, t, e, s, n) {
  const o = [];
  return !n && !i.isPointInArea(t) || ui(i, e, t, function(a, l, c) {
    !n && !gt(a, i.chartArea, 0) || a.inRange(t.x, t.y, s) && o.push({
      element: a,
      datasetIndex: l,
      index: c
    });
  }, !0), o;
}
function Xl(i, t, e, s) {
  let n = [];
  function o(r, a, l) {
    const { startAngle: c, endAngle: h } = r.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: d } = ro(r, {
      x: t.x,
      y: t.y
    });
    Se(d, c, h) && n.push({
      element: r,
      datasetIndex: a,
      index: l
    });
  }
  return ui(i, e, t, o), n;
}
function Kl(i, t, e, s, n, o) {
  let r = [];
  const a = Yl(e);
  let l = Number.POSITIVE_INFINITY;
  function c(h, d, u) {
    const f = h.inRange(t.x, t.y, n);
    if (s && !f)
      return;
    const g = h.getCenterPoint(n);
    if (!(!!o || i.isPointInArea(g)) && !f)
      return;
    const m = a(t, g);
    m < l ? (r = [
      {
        element: h,
        datasetIndex: d,
        index: u
      }
    ], l = m) : m === l && r.push({
      element: h,
      datasetIndex: d,
      index: u
    });
  }
  return ui(i, e, t, c), r;
}
function ki(i, t, e, s, n, o) {
  return !o && !i.isPointInArea(t) ? [] : e === "r" && !s ? Xl(i, t, e, n) : Kl(i, t, e, s, n, o);
}
function tn(i, t, e, s, n) {
  const o = [], r = e === "x" ? "inXRange" : "inYRange";
  let a = !1;
  return ui(i, e, t, (l, c, h) => {
    l[r] && l[r](t[e], n) && (o.push({
      element: l,
      datasetIndex: c,
      index: h
    }), a = a || l.inRange(t.x, t.y, n));
  }), s && !a ? [] : o;
}
var ql = {
  modes: {
    index(i, t, e, s) {
      const n = Et(t, i), o = e.axis || "x", r = e.includeInvisible || !1, a = e.intersect ? wi(i, n, o, s, r) : ki(i, n, o, !1, s, r), l = [];
      return a.length ? (i.getSortedVisibleDatasetMetas().forEach((c) => {
        const h = a[0].index, d = c.data[h];
        d && !d.skip && l.push({
          element: d,
          datasetIndex: c.index,
          index: h
        });
      }), l) : [];
    },
    dataset(i, t, e, s) {
      const n = Et(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      let a = e.intersect ? wi(i, n, o, s, r) : ki(i, n, o, !1, s, r);
      if (a.length > 0) {
        const l = a[0].datasetIndex, c = i.getDatasetMeta(l).data;
        a = [];
        for (let h = 0; h < c.length; ++h)
          a.push({
            element: c[h],
            datasetIndex: l,
            index: h
          });
      }
      return a;
    },
    point(i, t, e, s) {
      const n = Et(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      return wi(i, n, o, s, r);
    },
    nearest(i, t, e, s) {
      const n = Et(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      return ki(i, n, o, e.intersect, s, r);
    },
    x(i, t, e, s) {
      const n = Et(t, i);
      return tn(i, n, "x", e.intersect, s);
    },
    y(i, t, e, s) {
      const n = Et(t, i);
      return tn(i, n, "y", e.intersect, s);
    }
  }
};
const Lo = [
  "left",
  "top",
  "right",
  "bottom"
];
function se(i, t) {
  return i.filter((e) => e.pos === t);
}
function en(i, t) {
  return i.filter((e) => Lo.indexOf(e.pos) === -1 && e.box.axis === t);
}
function ne(i, t) {
  return i.sort((e, s) => {
    const n = t ? s : e, o = t ? e : s;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function Gl(i) {
  const t = [];
  let e, s, n, o, r, a;
  for (e = 0, s = (i || []).length; e < s; ++e)
    n = i[e], { position: o, options: { stack: r, stackWeight: a = 1 } } = n, t.push({
      index: e,
      box: n,
      pos: o,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: r && o + r,
      stackWeight: a
    });
  return t;
}
function Zl(i) {
  const t = {};
  for (const e of i) {
    const { stack: s, pos: n, stackWeight: o } = e;
    if (!s || !Lo.includes(n))
      continue;
    const r = t[s] || (t[s] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    r.count++, r.weight += o;
  }
  return t;
}
function Jl(i, t) {
  const e = Zl(i), { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
  let o, r, a;
  for (o = 0, r = i.length; o < r; ++o) {
    a = i[o];
    const { fullSize: l } = a.box, c = e[a.stack], h = c && a.stackWeight / c.weight;
    a.horizontal ? (a.width = h ? h * s : l && t.availableWidth, a.height = n) : (a.width = s, a.height = h ? h * n : l && t.availableHeight);
  }
  return e;
}
function Ql(i) {
  const t = Gl(i), e = ne(t.filter((c) => c.box.fullSize), !0), s = ne(se(t, "left"), !0), n = ne(se(t, "right")), o = ne(se(t, "top"), !0), r = ne(se(t, "bottom")), a = en(t, "x"), l = en(t, "y");
  return {
    fullSize: e,
    leftAndTop: s.concat(o),
    rightAndBottom: n.concat(l).concat(r).concat(a),
    chartArea: se(t, "chartArea"),
    vertical: s.concat(n).concat(l),
    horizontal: o.concat(r).concat(a)
  };
}
function sn(i, t, e, s) {
  return Math.max(i[e], t[e]) + Math.max(i[s], t[s]);
}
function Ro(i, t) {
  i.top = Math.max(i.top, t.top), i.left = Math.max(i.left, t.left), i.bottom = Math.max(i.bottom, t.bottom), i.right = Math.max(i.right, t.right);
}
function tc(i, t, e, s) {
  const { pos: n, box: o } = e, r = i.maxPadding;
  if (!O(n)) {
    e.size && (i[n] -= e.size);
    const d = s[e.stack] || {
      size: 0,
      count: 1
    };
    d.size = Math.max(d.size, e.horizontal ? o.height : o.width), e.size = d.size / d.count, i[n] += e.size;
  }
  o.getPadding && Ro(r, o.getPadding());
  const a = Math.max(0, t.outerWidth - sn(r, i, "left", "right")), l = Math.max(0, t.outerHeight - sn(r, i, "top", "bottom")), c = a !== i.w, h = l !== i.h;
  return i.w = a, i.h = l, e.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function ec(i) {
  const t = i.maxPadding;
  function e(s) {
    const n = Math.max(t[s] - i[s], 0);
    return i[s] += n, n;
  }
  i.y += e("top"), i.x += e("left"), e("right"), e("bottom");
}
function ic(i, t) {
  const e = t.maxPadding;
  function s(n) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return n.forEach((r) => {
      o[r] = Math.max(t[r], e[r]);
    }), o;
  }
  return s(i ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function ce(i, t, e, s) {
  const n = [];
  let o, r, a, l, c, h;
  for (o = 0, r = i.length, c = 0; o < r; ++o) {
    a = i[o], l = a.box, l.update(a.width || t.w, a.height || t.h, ic(a.horizontal, t));
    const { same: d, other: u } = tc(t, e, a, s);
    c |= d && n.length, h = h || u, l.fullSize || n.push(a);
  }
  return c && ce(n, t, e, s) || h;
}
function Fe(i, t, e, s, n) {
  i.top = e, i.left = t, i.right = t + s, i.bottom = e + n, i.width = s, i.height = n;
}
function nn(i, t, e, s) {
  const n = e.padding;
  let { x: o, y: r } = t;
  for (const a of i) {
    const l = a.box, c = s[a.stack] || {
      placed: 0,
      weight: 1
    }, h = a.stackWeight / c.weight || 1;
    if (a.horizontal) {
      const d = t.w * h, u = c.size || l.height;
      ve(c.start) && (r = c.start), l.fullSize ? Fe(l, n.left, r, e.outerWidth - n.right - n.left, u) : Fe(l, t.left + c.placed, r, d, u), c.start = r, c.placed += d, r = l.bottom;
    } else {
      const d = t.h * h, u = c.size || l.width;
      ve(c.start) && (o = c.start), l.fullSize ? Fe(l, o, n.top, u, e.outerHeight - n.bottom - n.top) : Fe(l, o, t.top + c.placed, u, d), c.start = o, c.placed += d, o = l.right;
    }
  }
  t.x = o, t.y = r;
}
var G = {
  addBox(i, t) {
    i.boxes || (i.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(e) {
            t.draw(e);
          }
        }
      ];
    }, i.boxes.push(t);
  },
  removeBox(i, t) {
    const e = i.boxes ? i.boxes.indexOf(t) : -1;
    e !== -1 && i.boxes.splice(e, 1);
  },
  configure(i, t, e) {
    t.fullSize = e.fullSize, t.position = e.position, t.weight = e.weight;
  },
  update(i, t, e, s) {
    if (!i)
      return;
    const n = Z(i.options.layout.padding), o = Math.max(t - n.width, 0), r = Math.max(e - n.height, 0), a = Ql(i.boxes), l = a.vertical, c = a.horizontal;
    L(i.boxes, (p) => {
      typeof p.beforeLayout == "function" && p.beforeLayout();
    });
    const h = l.reduce((p, m) => m.box.options && m.box.options.display === !1 ? p : p + 1, 0) || 1, d = Object.freeze({
      outerWidth: t,
      outerHeight: e,
      padding: n,
      availableWidth: o,
      availableHeight: r,
      vBoxMaxWidth: o / 2 / h,
      hBoxMaxHeight: r / 2
    }), u = Object.assign({}, n);
    Ro(u, Z(s));
    const f = Object.assign({
      maxPadding: u,
      w: o,
      h: r,
      x: n.left,
      y: n.top
    }, n), g = Jl(l.concat(c), d);
    ce(a.fullSize, f, d, g), ce(l, f, d, g), ce(c, f, d, g) && ce(l, f, d, g), ec(f), nn(a.leftAndTop, f, d, g), f.x += f.w, f.y += f.h, nn(a.rightAndBottom, f, d, g), i.chartArea = {
      left: f.left,
      top: f.top,
      right: f.left + f.w,
      bottom: f.top + f.h,
      height: f.h,
      width: f.w
    }, L(a.chartArea, (p) => {
      const m = p.box;
      Object.assign(m, i.chartArea), m.update(f.w, f.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Io {
  acquireContext(t, e) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, e, s) {
  }
  removeEventListener(t, e, s) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, e, s, n) {
    return e = Math.max(0, e || t.width), s = s || t.height, {
      width: e,
      height: Math.max(0, n ? Math.floor(e / n) : s)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class sc extends Io {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Xe = "$chartjs", nc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, on = (i) => i === null || i === "";
function oc(i, t) {
  const e = i.style, s = i.getAttribute("height"), n = i.getAttribute("width");
  if (i[Xe] = {
    initial: {
      height: s,
      width: n,
      style: {
        display: e.display,
        height: e.height,
        width: e.width
      }
    }
  }, e.display = e.display || "block", e.boxSizing = e.boxSizing || "border-box", on(n)) {
    const o = Hs(i, "width");
    o !== void 0 && (i.width = o);
  }
  if (on(s))
    if (i.style.height === "")
      i.height = i.width / (t || 2);
    else {
      const o = Hs(i, "height");
      o !== void 0 && (i.height = o);
    }
  return i;
}
const $o = tl ? {
  passive: !0
} : !1;
function rc(i, t, e) {
  i && i.addEventListener(t, e, $o);
}
function ac(i, t, e) {
  i && i.canvas && i.canvas.removeEventListener(t, e, $o);
}
function lc(i, t) {
  const e = nc[i.type] || i.type, { x: s, y: n } = Et(i, t);
  return {
    type: e,
    chart: t,
    native: i,
    x: s !== void 0 ? s : null,
    y: n !== void 0 ? n : null
  };
}
function ii(i, t) {
  for (const e of i)
    if (e === t || e.contains(t))
      return !0;
}
function cc(i, t, e) {
  const s = i.canvas, n = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || ii(a.addedNodes, s), r = r && !ii(a.removedNodes, s);
    r && e();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function hc(i, t, e) {
  const s = i.canvas, n = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || ii(a.removedNodes, s), r = r && !ii(a.addedNodes, s);
    r && e();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const we = /* @__PURE__ */ new Map();
let rn = 0;
function Fo() {
  const i = window.devicePixelRatio;
  i !== rn && (rn = i, we.forEach((t, e) => {
    e.currentDevicePixelRatio !== i && t();
  }));
}
function dc(i, t) {
  we.size || window.addEventListener("resize", Fo), we.set(i, t);
}
function uc(i) {
  we.delete(i), we.size || window.removeEventListener("resize", Fo);
}
function fc(i, t, e) {
  const s = i.canvas, n = s && cs(s);
  if (!n)
    return;
  const o = ho((a, l) => {
    const c = n.clientWidth;
    e(a, l), c < n.clientWidth && e();
  }, window), r = new ResizeObserver((a) => {
    const l = a[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || o(c, h);
  });
  return r.observe(n), dc(i, o), r;
}
function Pi(i, t, e) {
  e && e.disconnect(), t === "resize" && uc(i);
}
function gc(i, t, e) {
  const s = i.canvas, n = ho((o) => {
    i.ctx !== null && e(lc(o, i));
  }, i);
  return rc(s, t, n), n;
}
class pc extends Io {
  acquireContext(t, e) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (oc(t, e), s) : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[Xe])
      return !1;
    const s = e[Xe].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const r = s[o];
      D(r) ? e.removeAttribute(o) : e.setAttribute(o, r);
    });
    const n = s.style || {};
    return Object.keys(n).forEach((o) => {
      e.style[o] = n[o];
    }), e.width = e.width, delete e[Xe], !0;
  }
  addEventListener(t, e, s) {
    this.removeEventListener(t, e);
    const n = t.$proxies || (t.$proxies = {}), r = {
      attach: cc,
      detach: hc,
      resize: fc
    }[e] || gc;
    n[e] = r(t, e, s);
  }
  removeEventListener(t, e) {
    const s = t.$proxies || (t.$proxies = {}), n = s[e];
    if (!n)
      return;
    ({
      attach: Pi,
      detach: Pi,
      resize: Pi
    }[e] || ac)(t, e, n), s[e] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, s, n) {
    return Qa(t, e, s, n);
  }
  isAttached(t) {
    const e = t && cs(t);
    return !!(e && e.isConnected);
  }
}
function mc(i) {
  return !ls() || typeof OffscreenCanvas < "u" && i instanceof OffscreenCanvas ? sc : pc;
}
class pt {
  static defaults = {};
  static defaultRoutes = void 0;
  x;
  y;
  active = !1;
  options;
  $animations;
  tooltipPosition(t) {
    const { x: e, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: e,
      y: s
    };
  }
  hasValue() {
    return Gt(this.x) && Gt(this.y);
  }
  getProps(t, e) {
    const s = this.$animations;
    if (!e || !s)
      return this;
    const n = {};
    return t.forEach((o) => {
      n[o] = s[o] && s[o].active() ? s[o]._to : this[o];
    }), n;
  }
}
function bc(i, t) {
  const e = i.options.ticks, s = _c(i), n = Math.min(e.maxTicksLimit || s, s), o = e.major.enabled ? yc(t) : [], r = o.length, a = o[0], l = o[r - 1], c = [];
  if (r > n)
    return vc(t, c, o, r / n), c;
  const h = xc(o, t, n);
  if (r > 0) {
    let d, u;
    const f = r > 1 ? Math.round((l - a) / (r - 1)) : null;
    for (ze(t, c, h, D(f) ? 0 : a - f, a), d = 0, u = r - 1; d < u; d++)
      ze(t, c, h, o[d], o[d + 1]);
    return ze(t, c, h, l, D(f) ? t.length : l + f), c;
  }
  return ze(t, c, h), c;
}
function _c(i) {
  const t = i.options.offset, e = i._tickSize(), s = i._length / e + (t ? 0 : 1), n = i._maxLength / e;
  return Math.floor(Math.min(s, n));
}
function xc(i, t, e) {
  const s = Sc(i), n = t.length / e;
  if (!s)
    return Math.max(n, 1);
  const o = ia(s);
  for (let r = 0, a = o.length - 1; r < a; r++) {
    const l = o[r];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function yc(i) {
  const t = [];
  let e, s;
  for (e = 0, s = i.length; e < s; e++)
    i[e].major && t.push(e);
  return t;
}
function vc(i, t, e, s) {
  let n = 0, o = e[0], r;
  for (s = Math.ceil(s), r = 0; r < i.length; r++)
    r === o && (t.push(i[r]), n++, o = e[n * s]);
}
function ze(i, t, e, s, n) {
  const o = P(s, 0), r = Math.min(P(n, i.length), i.length);
  let a = 0, l, c, h;
  for (e = Math.ceil(e), n && (l = n - s, e = l / Math.floor(l / e)), h = o; h < 0; )
    a++, h = Math.round(o + a * e);
  for (c = Math.max(o, 0); c < r; c++)
    c === h && (t.push(i[c]), a++, h = Math.round(o + a * e));
}
function Sc(i) {
  const t = i.length;
  let e, s;
  if (t < 2)
    return !1;
  for (s = i[0], e = 1; e < t; ++e)
    if (i[e] - i[e - 1] !== s)
      return !1;
  return s;
}
const Mc = (i) => i === "left" ? "right" : i === "right" ? "left" : i, an = (i, t, e) => t === "top" || t === "left" ? i[t] + e : i[t] - e, ln = (i, t) => Math.min(t || i, i);
function cn(i, t) {
  const e = [], s = i.length / t, n = i.length;
  let o = 0;
  for (; o < n; o += s)
    e.push(i[Math.floor(o)]);
  return e;
}
function wc(i, t, e) {
  const s = i.ticks.length, n = Math.min(t, s - 1), o = i._startPixel, r = i._endPixel, a = 1e-6;
  let l = i.getPixelForTick(n), c;
  if (!(e && (s === 1 ? c = Math.max(l - o, r - l) : t === 0 ? c = (i.getPixelForTick(1) - l) / 2 : c = (l - i.getPixelForTick(n - 1)) / 2, l += n < t ? c : -c, l < o - a || l > r + a)))
    return l;
}
function kc(i, t) {
  L(i, (e) => {
    const s = e.gc, n = s.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o)
        delete e.data[s[o]];
      s.splice(0, n);
    }
  });
}
function oe(i) {
  return i.drawTicks ? i.tickLength : 0;
}
function hn(i, t) {
  if (!i.display)
    return 0;
  const e = V(i.font, t), s = Z(i.padding);
  return ($(i.text) ? i.text.length : 1) * e.lineHeight + s.height;
}
function Pc(i, t) {
  return Mt(i, {
    scale: t,
    type: "scale"
  });
}
function Ac(i, t, e) {
  return Mt(i, {
    tick: e,
    index: t,
    type: "tick"
  });
}
function Cc(i, t, e) {
  let s = is(i);
  return (e && t !== "right" || !e && t === "right") && (s = Mc(s)), s;
}
function Dc(i, t, e, s) {
  const { top: n, left: o, bottom: r, right: a, chart: l } = i, { chartArea: c, scales: h } = l;
  let d = 0, u, f, g;
  const p = r - n, m = a - o;
  if (i.isHorizontal()) {
    if (f = K(s, o, a), O(e)) {
      const b = Object.keys(e)[0], _ = e[b];
      g = h[b].getPixelForValue(_) + p - t;
    } else e === "center" ? g = (c.bottom + c.top) / 2 + p - t : g = an(i, e, t);
    u = a - o;
  } else {
    if (O(e)) {
      const b = Object.keys(e)[0], _ = e[b];
      f = h[b].getPixelForValue(_) - m + t;
    } else e === "center" ? f = (c.left + c.right) / 2 - m + t : f = an(i, e, t);
    g = K(s, r, n), d = e === "left" ? -W : W;
  }
  return {
    titleX: f,
    titleY: g,
    maxWidth: u,
    rotation: d
  };
}
class Ht extends pt {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, e) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: e, _suggestedMin: s, _suggestedMax: n } = this;
    return t = et(t, Number.POSITIVE_INFINITY), e = et(e, Number.NEGATIVE_INFINITY), s = et(s, Number.POSITIVE_INFINITY), n = et(n, Number.NEGATIVE_INFINITY), {
      min: et(t, s),
      max: et(e, n),
      minDefined: N(t),
      maxDefined: N(e)
    };
  }
  getMinMax(t) {
    let { min: e, max: s, minDefined: n, maxDefined: o } = this.getUserBounds(), r;
    if (n && o)
      return {
        min: e,
        max: s
      };
    const a = this.getMatchingVisibleMetas();
    for (let l = 0, c = a.length; l < c; ++l)
      r = a[l].controller.getMinMax(this, t), n || (e = Math.min(e, r.min)), o || (s = Math.max(s, r.max));
    return e = o && e > s ? s : e, s = n && e > s ? e : s, {
      min: et(e, et(s, e)),
      max: et(s, et(e, s))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    I(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, e, s) {
    const { beginAtZero: n, grace: o, ticks: r } = this.options, a = r.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = s = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Ta(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = a < this.ticks.length;
    this._convertTicksToLabels(l ? cn(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), r.display && (r.autoSkip || r.source === "auto") && (this.ticks = bc(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, e, s;
    this.isHorizontal() ? (e = this.left, s = this.right) : (e = this.top, s = this.bottom, t = !t), this._startPixel = e, this._endPixel = s, this._reversePixels = t, this._length = s - e, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    I(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    I(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    I(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), I(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    I(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let s, n, o;
    for (s = 0, n = t.length; s < n; s++)
      o = t[s], o.label = I(e.callback, [
        o.value,
        s,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    I(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    I(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, e = t.ticks, s = ln(this.ticks.length, t.ticks.maxTicksLimit), n = e.minRotation || 0, o = e.maxRotation;
    let r = n, a, l, c;
    if (!this._isVisible() || !e.display || n >= o || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const h = this._getLabelSizes(), d = h.widest.width, u = h.highest.height, f = U(this.chart.width - d, 0, this.maxWidth);
    a = t.offset ? this.maxWidth / s : f / (s - 1), d + 6 > a && (a = f / (s - (t.offset ? 0.5 : 1)), l = this.maxHeight - oe(t.grid) - e.padding - hn(t.title, this.chart.options.font), c = Math.sqrt(d * d + u * u), r = ts(Math.min(Math.asin(U((h.highest.height + 6) / a, -1, 1)), Math.asin(U(l / c, -1, 1)) - Math.asin(U(u / c, -1, 1)))), r = Math.max(n, Math.min(o, r))), this.labelRotation = r;
  }
  afterCalculateLabelRotation() {
    I(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    I(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: e, options: { ticks: s, title: n, grid: o } } = this, r = this._isVisible(), a = this.isHorizontal();
    if (r) {
      const l = hn(n, e.options.font);
      if (a ? (t.width = this.maxWidth, t.height = oe(o) + l) : (t.height = this.maxHeight, t.width = oe(o) + l), s.display && this.ticks.length) {
        const { first: c, last: h, widest: d, highest: u } = this._getLabelSizes(), f = s.padding * 2, g = nt(this.labelRotation), p = Math.cos(g), m = Math.sin(g);
        if (a) {
          const b = s.mirror ? 0 : m * d.width + p * u.height;
          t.height = Math.min(this.maxHeight, t.height + b + f);
        } else {
          const b = s.mirror ? 0 : p * d.width + m * u.height;
          t.width = Math.min(this.maxWidth, t.width + b + f);
        }
        this._calculatePadding(c, h, m, p);
      }
    }
    this._handleMargins(), a ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, e, s, n) {
    const { ticks: { align: o, padding: r }, position: a } = this.options, l = this.labelRotation !== 0, c = a !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, d = this.right - this.getPixelForTick(this.ticks.length - 1);
      let u = 0, f = 0;
      l ? c ? (u = n * t.width, f = s * e.height) : (u = s * t.height, f = n * e.width) : o === "start" ? f = e.width : o === "end" ? u = t.width : o !== "inner" && (u = t.width / 2, f = e.width / 2), this.paddingLeft = Math.max((u - h + r) * this.width / (this.width - h), 0), this.paddingRight = Math.max((f - d + r) * this.width / (this.width - d), 0);
    } else {
      let h = e.height / 2, d = t.height / 2;
      o === "start" ? (h = 0, d = t.height) : o === "end" && (h = e.height, d = 0), this.paddingTop = h + r, this.paddingBottom = d + r;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    I(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: e } = this.options;
    return e === "top" || e === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let e, s;
    for (e = 0, s = t.length; e < s; e++)
      D(t[e].label) && (t.splice(e, 1), s--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let s = this.ticks;
      e < s.length && (s = cn(s, e)), this._labelSizes = t = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, e, s) {
    const { ctx: n, _longestTextCache: o } = this, r = [], a = [], l = Math.floor(e / ln(e, s));
    let c = 0, h = 0, d, u, f, g, p, m, b, _, v, y, x;
    for (d = 0; d < e; d += l) {
      if (g = t[d].label, p = this._resolveTickFontOptions(d), n.font = m = p.string, b = o[m] = o[m] || {
        data: {},
        gc: []
      }, _ = p.lineHeight, v = y = 0, !D(g) && !$(g))
        v = ti(n, b.data, b.gc, v, g), y = _;
      else if ($(g))
        for (u = 0, f = g.length; u < f; ++u)
          x = g[u], !D(x) && !$(x) && (v = ti(n, b.data, b.gc, v, x), y += _);
      r.push(v), a.push(y), c = Math.max(v, c), h = Math.max(y, h);
    }
    kc(o, e);
    const S = r.indexOf(c), M = a.indexOf(h), w = (k) => ({
      width: r[k] || 0,
      height: a[k] || 0
    });
    return {
      first: w(0),
      last: w(e - 1),
      widest: w(S),
      highest: w(M),
      widths: r,
      heights: a
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, e) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const e = this._startPixel + t * this._length;
    return ra(this._alignToPixels ? Dt(this.chart, e, 0) : e);
  }
  getDecimalForPixel(t) {
    const e = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - e : e;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: e } = this;
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
  }
  getContext(t) {
    const e = this.ticks || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return s.$context || (s.$context = Ac(this.getContext(), t, s));
    }
    return this.$context || (this.$context = Pc(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, e = nt(this.labelRotation), s = Math.abs(Math.cos(e)), n = Math.abs(Math.sin(e)), o = this._getLabelSizes(), r = t.autoSkipPadding || 0, a = o ? o.widest.width + r : 0, l = o ? o.highest.height + r : 0;
    return this.isHorizontal() ? l * s > a * n ? a / s : l / n : l * n < a * s ? l / s : a / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis, s = this.chart, n = this.options, { grid: o, position: r, border: a } = n, l = o.offset, c = this.isHorizontal(), d = this.ticks.length + (l ? 1 : 0), u = oe(o), f = [], g = a.setContext(this.getContext()), p = g.display ? g.width : 0, m = p / 2, b = function(z) {
      return Dt(s, z, p);
    };
    let _, v, y, x, S, M, w, k, A, C, T, Y;
    if (r === "top")
      _ = b(this.bottom), M = this.bottom - u, k = _ - m, C = b(t.top) + m, Y = t.bottom;
    else if (r === "bottom")
      _ = b(this.top), C = t.top, Y = b(t.bottom) - m, M = _ + m, k = this.top + u;
    else if (r === "left")
      _ = b(this.right), S = this.right - u, w = _ - m, A = b(t.left) + m, T = t.right;
    else if (r === "right")
      _ = b(this.left), A = t.left, T = b(t.right) - m, S = _ + m, w = this.left + u;
    else if (e === "x") {
      if (r === "center")
        _ = b((t.top + t.bottom) / 2 + 0.5);
      else if (O(r)) {
        const z = Object.keys(r)[0], H = r[z];
        _ = b(this.chart.scales[z].getPixelForValue(H));
      }
      C = t.top, Y = t.bottom, M = _ + m, k = M + u;
    } else if (e === "y") {
      if (r === "center")
        _ = b((t.left + t.right) / 2);
      else if (O(r)) {
        const z = Object.keys(r)[0], H = r[z];
        _ = b(this.chart.scales[z].getPixelForValue(H));
      }
      S = _ - m, w = S - u, A = t.left, T = t.right;
    }
    const tt = P(n.ticks.maxTicksLimit, d), R = Math.max(1, Math.ceil(d / tt));
    for (v = 0; v < d; v += R) {
      const z = this.getContext(v), H = o.setContext(z), st = a.setContext(z), X = H.lineWidth, Wt = H.color, De = st.dash || [], Vt = st.dashOffset, Qt = H.tickWidth, kt = H.tickColor, te = H.tickBorderDash || [], Pt = H.tickBorderDashOffset;
      y = wc(this, v, l), y !== void 0 && (x = Dt(s, y, X), c ? S = w = A = T = x : M = k = C = Y = x, f.push({
        tx1: S,
        ty1: M,
        tx2: w,
        ty2: k,
        x1: A,
        y1: C,
        x2: T,
        y2: Y,
        width: X,
        color: Wt,
        borderDash: De,
        borderDashOffset: Vt,
        tickWidth: Qt,
        tickColor: kt,
        tickBorderDash: te,
        tickBorderDashOffset: Pt
      }));
    }
    return this._ticksLength = d, this._borderValue = _, f;
  }
  _computeLabelItems(t) {
    const e = this.axis, s = this.options, { position: n, ticks: o } = s, r = this.isHorizontal(), a = this.ticks, { align: l, crossAlign: c, padding: h, mirror: d } = o, u = oe(s.grid), f = u + h, g = d ? -h : f, p = -nt(this.labelRotation), m = [];
    let b, _, v, y, x, S, M, w, k, A, C, T, Y = "middle";
    if (n === "top")
      S = this.bottom - g, M = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      S = this.top + g, M = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const R = this._getYAxisLabelAlignment(u);
      M = R.textAlign, x = R.x;
    } else if (n === "right") {
      const R = this._getYAxisLabelAlignment(u);
      M = R.textAlign, x = R.x;
    } else if (e === "x") {
      if (n === "center")
        S = (t.top + t.bottom) / 2 + f;
      else if (O(n)) {
        const R = Object.keys(n)[0], z = n[R];
        S = this.chart.scales[R].getPixelForValue(z) + f;
      }
      M = this._getXAxisLabelAlignment();
    } else if (e === "y") {
      if (n === "center")
        x = (t.left + t.right) / 2 - f;
      else if (O(n)) {
        const R = Object.keys(n)[0], z = n[R];
        x = this.chart.scales[R].getPixelForValue(z);
      }
      M = this._getYAxisLabelAlignment(u).textAlign;
    }
    e === "y" && (l === "start" ? Y = "top" : l === "end" && (Y = "bottom"));
    const tt = this._getLabelSizes();
    for (b = 0, _ = a.length; b < _; ++b) {
      v = a[b], y = v.label;
      const R = o.setContext(this.getContext(b));
      w = this.getPixelForTick(b) + o.labelOffset, k = this._resolveTickFontOptions(b), A = k.lineHeight, C = $(y) ? y.length : 1;
      const z = C / 2, H = R.color, st = R.textStrokeColor, X = R.textStrokeWidth;
      let Wt = M;
      r ? (x = w, M === "inner" && (b === _ - 1 ? Wt = this.options.reverse ? "left" : "right" : b === 0 ? Wt = this.options.reverse ? "right" : "left" : Wt = "center"), n === "top" ? c === "near" || p !== 0 ? T = -C * A + A / 2 : c === "center" ? T = -tt.highest.height / 2 - z * A + A : T = -tt.highest.height + A / 2 : c === "near" || p !== 0 ? T = A / 2 : c === "center" ? T = tt.highest.height / 2 - z * A : T = tt.highest.height - C * A, d && (T *= -1), p !== 0 && !R.showLabelBackdrop && (x += A / 2 * Math.sin(p))) : (S = w, T = (1 - C) * A / 2);
      let De;
      if (R.showLabelBackdrop) {
        const Vt = Z(R.backdropPadding), Qt = tt.heights[b], kt = tt.widths[b];
        let te = T - Vt.top, Pt = 0 - Vt.left;
        switch (Y) {
          case "middle":
            te -= Qt / 2;
            break;
          case "bottom":
            te -= Qt;
            break;
        }
        switch (M) {
          case "center":
            Pt -= kt / 2;
            break;
          case "right":
            Pt -= kt;
            break;
          case "inner":
            b === _ - 1 ? Pt -= kt : b > 0 && (Pt -= kt / 2);
            break;
        }
        De = {
          left: Pt,
          top: te,
          width: kt + Vt.width,
          height: Qt + Vt.height,
          color: R.backdropColor
        };
      }
      m.push({
        label: y,
        font: k,
        textOffset: T,
        options: {
          rotation: p,
          color: H,
          strokeColor: st,
          strokeWidth: X,
          textAlign: Wt,
          textBaseline: Y,
          translation: [
            x,
            S
          ],
          backdrop: De
        }
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-nt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return e.align === "start" ? n = "left" : e.align === "end" ? n = "right" : e.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: e, ticks: { crossAlign: s, mirror: n, padding: o } } = this.options, r = this._getLabelSizes(), a = t + o, l = r.widest.width;
    let c, h;
    return e === "left" ? n ? (h = this.right + o, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - a, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : e === "right" ? n ? (h = this.left + o, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + a, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", {
      textAlign: c,
      x: h
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, e = this.options.position;
    if (e === "left" || e === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (e === "top" || e === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: e }, left: s, top: n, width: o, height: r } = this;
    e && (t.save(), t.fillStyle = e, t.fillRect(s, n, o, r), t.restore());
  }
  getLineWidthForValue(t) {
    const e = this.options.grid;
    if (!this._isVisible() || !e.display)
      return 0;
    const n = this.ticks.findIndex((o) => o.value === t);
    return n >= 0 ? e.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const e = this.options.grid, s = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, r;
    const a = (l, c, h) => {
      !h.width || !h.color || (s.save(), s.lineWidth = h.width, s.strokeStyle = h.color, s.setLineDash(h.borderDash || []), s.lineDashOffset = h.borderDashOffset, s.beginPath(), s.moveTo(l.x, l.y), s.lineTo(c.x, c.y), s.stroke(), s.restore());
    };
    if (e.display)
      for (o = 0, r = n.length; o < r; ++o) {
        const l = n[o];
        e.drawOnChartArea && a({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), e.drawTicks && a({
          x: l.tx1,
          y: l.ty1
        }, {
          x: l.tx2,
          y: l.ty2
        }, {
          color: l.tickColor,
          width: l.tickWidth,
          borderDash: l.tickBorderDash,
          borderDashOffset: l.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: e, options: { border: s, grid: n } } = this, o = s.setContext(this.getContext()), r = s.display ? o.width : 0;
    if (!r)
      return;
    const a = n.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, h, d, u;
    this.isHorizontal() ? (c = Dt(t, this.left, r) - r / 2, h = Dt(t, this.right, a) + a / 2, d = u = l) : (d = Dt(t, this.top, r) - r / 2, u = Dt(t, this.bottom, a) + a / 2, c = h = l), e.save(), e.lineWidth = o.width, e.strokeStyle = o.color, e.beginPath(), e.moveTo(c, d), e.lineTo(h, u), e.stroke(), e.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, n = this._computeLabelArea();
    n && ci(s, n);
    const o = this.getLabelItems(t);
    for (const r of o) {
      const a = r.options, l = r.font, c = r.label, h = r.textOffset;
      Nt(s, c, 0, h, l, a);
    }
    n && hi(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: e, title: s, reverse: n } } = this;
    if (!s.display)
      return;
    const o = V(s.font), r = Z(s.padding), a = s.align;
    let l = o.lineHeight / 2;
    e === "bottom" || e === "center" || O(e) ? (l += r.bottom, $(s.text) && (l += o.lineHeight * (s.text.length - 1))) : l += r.top;
    const { titleX: c, titleY: h, maxWidth: d, rotation: u } = Dc(this, l, e, a);
    Nt(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: d,
      rotation: u,
      textAlign: Cc(a, e, n),
      textBaseline: "middle",
      translation: [
        c,
        h
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, e = t.ticks && t.ticks.z || 0, s = P(t.grid && t.grid.z, -1), n = P(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Ht.prototype.draw ? [
      {
        z: e,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: s,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: n,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: e,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const e = this.chart.getSortedVisibleDatasetMetas(), s = this.axis + "AxisID", n = [];
    let o, r;
    for (o = 0, r = e.length; o < r; ++o) {
      const a = e[o];
      a[s] === this.id && (!t || a.type === t) && n.push(a);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const e = this.options.ticks.setContext(this.getContext(t));
    return V(e.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Be {
  constructor(t, e, s) {
    this.type = t, this.scope = e, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let s;
    Ec(e) && (s = this.register(e));
    const n = this.items, o = t.id, r = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, Oc(t, r, s), this.override && B.override(t.id, t.overrides)), r;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items, s = t.id, n = this.scope;
    s in e && delete e[s], n && s in B[n] && (delete B[n][s], this.override && delete Bt[s]);
  }
}
function Oc(i, t, e) {
  const s = ye(/* @__PURE__ */ Object.create(null), [
    e ? B.get(e) : {},
    B.get(t),
    i.defaults
  ]);
  B.set(t, s), i.defaultRoutes && Tc(t, i.defaultRoutes), i.descriptors && B.describe(t, i.descriptors);
}
function Tc(i, t) {
  Object.keys(t).forEach((e) => {
    const s = e.split("."), n = s.pop(), o = [
      i
    ].concat(s).join("."), r = t[e].split("."), a = r.pop(), l = r.join(".");
    B.route(o, n, l, a);
  });
}
function Ec(i) {
  return "id" in i && "defaults" in i;
}
class Lc {
  constructor() {
    this.controllers = new Be(wt, "datasets", !0), this.elements = new Be(pt, "elements"), this.plugins = new Be(Object, "plugins"), this.scales = new Be(Ht, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, e, s) {
    [
      ...e
    ].forEach((n) => {
      const o = s || this._getRegistryForType(n);
      s || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : L(n, (r) => {
        const a = s || this._getRegistryForType(r);
        this._exec(t, a, r);
      });
    });
  }
  _exec(t, e, s) {
    const n = Qi(t);
    I(s["before" + n], [], s), e[t](s), I(s["after" + n], [], s);
  }
  _getRegistryForType(t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const s = this._typedRegistries[e];
      if (s.isForType(t))
        return s;
    }
    return this.plugins;
  }
  _get(t, e, s) {
    const n = e.get(t);
    if (n === void 0)
      throw new Error('"' + t + '" is not a registered ' + s + ".");
    return n;
  }
}
var rt = /* @__PURE__ */ new Lc();
class Rc {
  constructor() {
    this._init = [];
  }
  notify(t, e, s, n) {
    e === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
    const o = n ? this._descriptors(t).filter(n) : this._descriptors(t), r = this._notify(o, t, e, s);
    return e === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall")), r;
  }
  _notify(t, e, s, n) {
    n = n || {};
    for (const o of t) {
      const r = o.plugin, a = r[s], l = [
        e,
        n,
        o.options
      ];
      if (I(a, l, r) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    D(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const e = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), e;
  }
  _createDescriptors(t, e) {
    const s = t && t.config, n = P(s.options && s.options.plugins, {}), o = Ic(s);
    return n === !1 && !e ? [] : Fc(t, o, n, e);
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [], s = this._cache, n = (o, r) => o.filter((a) => !r.some((l) => a.plugin.id === l.plugin.id));
    this._notify(n(e, s), t, "stop"), this._notify(n(s, e), t, "start");
  }
}
function Ic(i) {
  const t = {}, e = [], s = Object.keys(rt.plugins.items);
  for (let o = 0; o < s.length; o++)
    e.push(rt.getPlugin(s[o]));
  const n = i.plugins || [];
  for (let o = 0; o < n.length; o++) {
    const r = n[o];
    e.indexOf(r) === -1 && (e.push(r), t[r.id] = !0);
  }
  return {
    plugins: e,
    localIds: t
  };
}
function $c(i, t) {
  return !t && i === !1 ? null : i === !0 ? {} : i;
}
function Fc(i, { plugins: t, localIds: e }, s, n) {
  const o = [], r = i.getContext();
  for (const a of t) {
    const l = a.id, c = $c(s[l], n);
    c !== null && o.push({
      plugin: a,
      options: zc(i.config, {
        plugin: a,
        local: e[l]
      }, c, r)
    });
  }
  return o;
}
function zc(i, { plugin: t, local: e }, s, n) {
  const o = i.pluginScopeKeys(t), r = i.getOptionScopes(s, o);
  return e && t.defaults && r.push(t.defaults), i.createResolver(r, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Fi(i, t) {
  const e = B.datasets[i] || {};
  return ((t.datasets || {})[i] || {}).indexAxis || t.indexAxis || e.indexAxis || "x";
}
function Bc(i, t) {
  let e = i;
  return i === "_index_" ? e = t : i === "_value_" && (e = t === "x" ? "y" : "x"), e;
}
function Nc(i, t) {
  return i === t ? "_index_" : "_value_";
}
function dn(i) {
  if (i === "x" || i === "y" || i === "r")
    return i;
}
function Hc(i) {
  if (i === "top" || i === "bottom")
    return "x";
  if (i === "left" || i === "right")
    return "y";
}
function zi(i, ...t) {
  if (dn(i))
    return i;
  for (const e of t) {
    const s = e.axis || Hc(e.position) || i.length > 1 && dn(i[0].toLowerCase());
    if (s)
      return s;
  }
  throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`);
}
function un(i, t, e) {
  if (e[t + "AxisID"] === i)
    return {
      axis: t
    };
}
function Wc(i, t) {
  if (t.data && t.data.datasets) {
    const e = t.data.datasets.filter((s) => s.xAxisID === i || s.yAxisID === i);
    if (e.length)
      return un(i, "x", e[0]) || un(i, "y", e[0]);
  }
  return {};
}
function Vc(i, t) {
  const e = Bt[i.type] || {
    scales: {}
  }, s = t.scales || {}, n = Fi(i.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((r) => {
    const a = s[r];
    if (!O(a))
      return console.error(`Invalid scale configuration for scale: ${r}`);
    if (a._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${r}`);
    const l = zi(r, a, Wc(r, i), B.scales[a.type]), c = Nc(l, n), h = e.scales || {};
    o[r] = ue(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      a,
      h[l],
      h[c]
    ]);
  }), i.data.datasets.forEach((r) => {
    const a = r.type || i.type, l = r.indexAxis || Fi(a, t), h = (Bt[a] || {}).scales || {};
    Object.keys(h).forEach((d) => {
      const u = Bc(d, l), f = r[u + "AxisID"] || u;
      o[f] = o[f] || /* @__PURE__ */ Object.create(null), ue(o[f], [
        {
          axis: u
        },
        s[f],
        h[d]
      ]);
    });
  }), Object.keys(o).forEach((r) => {
    const a = o[r];
    ue(a, [
      B.scales[a.type],
      B.scale
    ]);
  }), o;
}
function zo(i) {
  const t = i.options || (i.options = {});
  t.plugins = P(t.plugins, {}), t.scales = Vc(i, t);
}
function Bo(i) {
  return i = i || {}, i.datasets = i.datasets || [], i.labels = i.labels || [], i;
}
function jc(i) {
  return i = i || {}, i.data = Bo(i.data), zo(i), i;
}
const fn = /* @__PURE__ */ new Map(), No = /* @__PURE__ */ new Set();
function Ne(i, t) {
  let e = fn.get(i);
  return e || (e = t(), fn.set(i, e), No.add(e)), e;
}
const re = (i, t, e) => {
  const s = vt(t, e);
  s !== void 0 && i.add(s);
};
class Uc {
  constructor(t) {
    this._config = jc(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = Bo(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), zo(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Ne(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, e) {
    return Ne(`${t}.transition.${e}`, () => [
      [
        `datasets.${t}.transitions.${e}`,
        `transitions.${e}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, e) {
    return Ne(`${t}-${e}`, () => [
      [
        `datasets.${t}.elements.${e}`,
        `datasets.${t}`,
        `elements.${e}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const e = t.id, s = this.type;
    return Ne(`${s}-plugin-${e}`, () => [
      [
        `plugins.${e}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, e) {
    const s = this._scopeCache;
    let n = s.get(t);
    return (!n || e) && (n = /* @__PURE__ */ new Map(), s.set(t, n)), n;
  }
  getOptionScopes(t, e, s) {
    const { options: n, type: o } = this, r = this._cachedScopes(t, s), a = r.get(e);
    if (a)
      return a;
    const l = /* @__PURE__ */ new Set();
    e.forEach((h) => {
      t && (l.add(t), h.forEach((d) => re(l, t, d))), h.forEach((d) => re(l, n, d)), h.forEach((d) => re(l, Bt[o] || {}, d)), h.forEach((d) => re(l, B, d)), h.forEach((d) => re(l, Ii, d));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), No.has(e) && r.set(e, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [
      t,
      Bt[e] || {},
      B.datasets[e] || {},
      {
        type: e
      },
      B,
      Ii
    ];
  }
  resolveNamedOptions(t, e, s, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: r, subPrefixes: a } = gn(this._resolverCache, t, n);
    let l = r;
    if (Xc(r, e)) {
      o.$shared = !1, s = St(s) ? s() : s;
      const c = this.createResolver(t, s, a);
      l = Zt(r, s, c);
    }
    for (const c of e)
      o[c] = l[c];
    return o;
  }
  createResolver(t, e, s = [
    ""
  ], n) {
    const { resolver: o } = gn(this._resolverCache, t, s);
    return O(e) ? Zt(o, e, void 0, n) : o;
  }
}
function gn(i, t, e) {
  let s = i.get(t);
  s || (s = /* @__PURE__ */ new Map(), i.set(t, s));
  const n = e.join();
  let o = s.get(n);
  return o || (o = {
    resolver: os(t, e),
    subPrefixes: e.filter((a) => !a.toLowerCase().includes("hover"))
  }, s.set(n, o)), o;
}
const Yc = (i) => O(i) && Object.getOwnPropertyNames(i).some((t) => St(i[t]));
function Xc(i, t) {
  const { isScriptable: e, isIndexable: s } = bo(i);
  for (const n of t) {
    const o = e(n), r = s(n), a = (r || o) && i[n];
    if (o && (St(a) || Yc(a)) || r && $(a))
      return !0;
  }
  return !1;
}
var Kc = "4.5.0";
const qc = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function pn(i, t) {
  return i === "top" || i === "bottom" || qc.indexOf(i) === -1 && t === "x";
}
function mn(i, t) {
  return function(e, s) {
    return e[i] === s[i] ? e[t] - s[t] : e[i] - s[i];
  };
}
function bn(i) {
  const t = i.chart, e = t.options.animation;
  t.notifyPlugins("afterRender"), I(e && e.onComplete, [
    i
  ], t);
}
function Gc(i) {
  const t = i.chart, e = t.options.animation;
  I(e && e.onProgress, [
    i
  ], t);
}
function Ho(i) {
  return ls() && typeof i == "string" ? i = document.getElementById(i) : i && i.length && (i = i[0]), i && i.canvas && (i = i.canvas), i;
}
const Ke = {}, _n = (i) => {
  const t = Ho(i);
  return Object.values(Ke).filter((e) => e.canvas === t).pop();
};
function Zc(i, t, e) {
  const s = Object.keys(i);
  for (const n of s) {
    const o = +n;
    if (o >= t) {
      const r = i[n];
      delete i[n], (e > 0 || o > t) && (i[o + e] = r);
    }
  }
}
function Jc(i, t, e, s) {
  return !e || i.type === "mouseout" ? null : s ? t : i;
}
class Wo {
  static defaults = B;
  static instances = Ke;
  static overrides = Bt;
  static registry = rt;
  static version = Kc;
  static getChart = _n;
  static register(...t) {
    rt.add(...t), xn();
  }
  static unregister(...t) {
    rt.remove(...t), xn();
  }
  constructor(t, e) {
    const s = this.config = new Uc(e), n = Ho(t), o = _n(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const r = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || mc(n))(), this.platform.updateConfig(s);
    const a = this.platform.acquireContext(n, r.aspectRatio), l = a && a.canvas, c = l && l.height, h = l && l.width;
    if (this.id = Xr(), this.ctx = a, this.canvas = l, this.width = h, this.height = c, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Rc(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = ha((d) => this.update(d), r.resizeDelay || 0), this._dataChanges = [], Ke[this.id] = this, !a || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    ct.listen(this, "complete", bn), ct.listen(this, "progress", Gc), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: e }, width: s, height: n, _aspectRatio: o } = this;
    return D(t) ? e && o ? o : n ? s / n : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return rt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Ns(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Fs(this.canvas, this.ctx), this;
  }
  stop() {
    return ct.stop(this), this;
  }
  resize(t, e) {
    ct.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: e
    } : this._resize(t, e);
  }
  _resize(t, e) {
    const s = this.options, n = this.canvas, o = s.maintainAspectRatio && this.aspectRatio, r = this.platform.getMaximumSize(n, t, e, o), a = s.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = r.width, this.height = r.height, this._aspectRatio = this.aspectRatio, Ns(this, a, !0) && (this.notifyPlugins("resize", {
      size: r
    }), I(s.onResize, [
      this,
      r
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const e = this.options.scales || {};
    L(e, (s, n) => {
      s.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, e = t.scales, s = this.scales, n = Object.keys(s).reduce((r, a) => (r[a] = !1, r), {});
    let o = [];
    e && (o = o.concat(Object.keys(e).map((r) => {
      const a = e[r], l = zi(r, a), c = l === "r", h = l === "x";
      return {
        options: a,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), L(o, (r) => {
      const a = r.options, l = a.id, c = zi(l, a), h = P(a.type, r.dtype);
      (a.position === void 0 || pn(a.position, c) !== pn(r.dposition)) && (a.position = r.dposition), n[l] = !0;
      let d = null;
      if (l in s && s[l].type === h)
        d = s[l];
      else {
        const u = rt.getScale(h);
        d = new u({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), s[d.id] = d;
      }
      d.init(a, t);
    }), L(n, (r, a) => {
      r || delete s[a];
    }), L(s, (r) => {
      G.configure(this, r, r.options), G.addBox(this, r);
    });
  }
  _updateMetasets() {
    const t = this._metasets, e = this.data.datasets.length, s = t.length;
    if (t.sort((n, o) => n.index - o.index), s > e) {
      for (let n = e; n < s; ++n)
        this._destroyDatasetMeta(n);
      t.splice(e, s - e);
    }
    this._sortedMetasets = t.slice(0).sort(mn("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: e } } = this;
    t.length > e.length && delete this._stacks, t.forEach((s, n) => {
      e.filter((o) => o === s._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], e = this.data.datasets;
    let s, n;
    for (this._removeUnreferencedMetasets(), s = 0, n = e.length; s < n; s++) {
      const o = e[s];
      let r = this.getDatasetMeta(s);
      const a = o.type || this.config.type;
      if (r.type && r.type !== a && (this._destroyDatasetMeta(s), r = this.getDatasetMeta(s)), r.type = a, r.indexAxis = o.indexAxis || Fi(a, this.options), r.order = o.order || 0, r.index = s, r.label = "" + o.label, r.visible = this.isDatasetVisible(s), r.controller)
        r.controller.updateIndex(s), r.controller.linkScales();
      else {
        const l = rt.getController(a), { datasetElementType: c, dataElementType: h } = B.datasets[a];
        Object.assign(l, {
          dataElementType: rt.getElement(h),
          datasetElementType: c && rt.getElement(c)
        }), r.controller = new l(this, s), t.push(r.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    L(this.data.datasets, (t, e) => {
      this.getDatasetMeta(e).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const e = this.config;
    e.update();
    const s = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()), n = this._animationsDisabled = !s.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let r = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: d } = this.getDatasetMeta(c), u = !n && o.indexOf(d) === -1;
      d.buildOrUpdateElements(u), r = Math.max(+d.getMaxOverflow(), r);
    }
    r = this._minPadding = s.layout.autoPadding ? r : 0, this._updateLayout(r), n || L(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(mn("z", "_idx"));
    const { _active: a, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render();
  }
  _updateScales() {
    L(this.scales, (t) => {
      G.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, e = new Set(Object.keys(this._listeners)), s = new Set(t.events);
    (!Cs(e, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, e = this._getUniformDataChanges() || [];
    for (const { method: s, start: n, count: o } of e) {
      const r = s === "_removeElements" ? -o : o;
      Zc(t, n, r);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const e = this.data.datasets.length, s = (o) => new Set(t.filter((r) => r[0] === o).map((r, a) => a + "," + r.splice(1).join(","))), n = s(0);
    for (let o = 1; o < e; o++)
      if (!Cs(n, s(o)))
        return;
    return Array.from(n).map((o) => o.split(",")).map((o) => ({
      method: o[1],
      start: +o[2],
      count: +o[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    G.update(this, this.width, this.height, t);
    const e = this.chartArea, s = e.width <= 0 || e.height <= 0;
    this._layers = [], L(this.boxes, (n) => {
      s && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, o) => {
      n._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this.getDatasetMeta(e).controller.configure();
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this._updateDataset(e, St(t) ? t({
          datasetIndex: e
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, e) {
    const s = this.getDatasetMeta(t), n = {
      meta: s,
      index: t,
      mode: e,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", n) !== !1 && (s.controller._update(e), n.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", n));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (ct.has(this) ? this.attached && !ct.running(this) && ct.start(this) : (this.draw(), bn({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: s, height: n } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(s, n);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const e = this._layers;
    for (t = 0; t < e.length && e[t].z <= 0; ++t)
      e[t].draw(this.chartArea);
    for (this._drawDatasets(); t < e.length; ++t)
      e[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const e = this._sortedMetasets, s = [];
    let n, o;
    for (n = 0, o = e.length; n < o; ++n) {
      const r = e[n];
      (!t || r.visible) && s.push(r);
    }
    return s;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let e = t.length - 1; e >= 0; --e)
      this._drawDataset(t[e]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const e = this.ctx, s = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, n = Co(this, t);
    this.notifyPlugins("beforeDatasetDraw", s) !== !1 && (n && ci(e, n), t.controller.draw(), n && hi(e), s.cancelable = !1, this.notifyPlugins("afterDatasetDraw", s));
  }
  isPointInArea(t) {
    return gt(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, e, s, n) {
    const o = ql.modes[e];
    return typeof o == "function" ? o(this, t, s, n) : [];
  }
  getDatasetMeta(t) {
    const e = this.data.datasets[t], s = this._metasets;
    let n = s.filter((o) => o && o._dataset === e).pop();
    return n || (n = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: e && e.order || 0,
      index: t,
      _dataset: e,
      _parsed: [],
      _sorted: !1
    }, s.push(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = Mt(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const e = this.data.datasets[t];
    if (!e)
      return !1;
    const s = this.getDatasetMeta(t);
    return typeof s.hidden == "boolean" ? !s.hidden : !e.hidden;
  }
  setDatasetVisibility(t, e) {
    const s = this.getDatasetMeta(t);
    s.hidden = !e;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, e, s) {
    const n = s ? "show" : "hide", o = this.getDatasetMeta(t), r = o.controller._resolveAnimations(void 0, n);
    ve(e) ? (o.data[e].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), r.update(o, {
      visible: s
    }), this.update((a) => a.datasetIndex === t ? n : void 0));
  }
  hide(t, e) {
    this._updateVisibility(t, e, !1);
  }
  show(t, e) {
    this._updateVisibility(t, e, !0);
  }
  _destroyDatasetMeta(t) {
    const e = this._metasets[t];
    e && e.controller && e.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, e;
    for (this.stop(), ct.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: e } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Fs(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), delete Ke[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, e = this.platform, s = (o, r) => {
      e.addEventListener(this, o, r), t[o] = r;
    }, n = (o, r, a) => {
      o.offsetX = r, o.offsetY = a, this._eventHandler(o);
    };
    L(this.options.events, (o) => s(o, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, e = this.platform, s = (l, c) => {
      e.addEventListener(this, l, c), t[l] = c;
    }, n = (l, c) => {
      t[l] && (e.removeEventListener(this, l, c), delete t[l]);
    }, o = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let r;
    const a = () => {
      n("attach", a), this.attached = !0, this.resize(), s("resize", o), s("detach", r);
    };
    r = () => {
      this.attached = !1, n("resize", o), this._stop(), this._resize(0, 0), s("attach", a);
    }, e.isAttached(this.canvas) ? a() : r();
  }
  unbindEvents() {
    L(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._listeners = {}, L(this._responsiveListeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, e, s) {
    const n = s ? "set" : "remove";
    let o, r, a, l;
    for (e === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + n + "DatasetHoverStyle"]()), a = 0, l = t.length; a < l; ++a) {
      r = t[a];
      const c = r && this.getDatasetMeta(r.datasetIndex).controller;
      c && c[n + "HoverStyle"](r.element, r.datasetIndex, r.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const e = this._active || [], s = t.map(({ datasetIndex: o, index: r }) => {
      const a = this.getDatasetMeta(o);
      if (!a)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: a.data[r],
        index: r
      };
    });
    !Ze(s, e) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, e));
  }
  notifyPlugins(t, e, s) {
    return this._plugins.notify(this, t, e, s);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((e) => e.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, e, s) {
    const n = this.options.hover, o = (l, c) => l.filter((h) => !c.some((d) => h.datasetIndex === d.datasetIndex && h.index === d.index)), r = o(e, t), a = s ? t : o(t, e);
    r.length && this.updateHoverStyle(r, n.mode, !1), a.length && n.mode && this.updateHoverStyle(a, n.mode, !0);
  }
  _eventHandler(t, e) {
    const s = {
      event: t,
      replay: e,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, n = (r) => (r.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", s, n) === !1)
      return;
    const o = this._handleEvent(t, e, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, n), (o || s.changed) && this.render(), this;
  }
  _handleEvent(t, e, s) {
    const { _active: n = [], options: o } = this, r = e, a = this._getActiveElements(t, n, s, r), l = Qr(t), c = Jc(t, this._lastEvent, s, l);
    s && (this._lastEvent = null, I(o.onHover, [
      t,
      a,
      this
    ], this), l && I(o.onClick, [
      t,
      a,
      this
    ], this));
    const h = !Ze(a, n);
    return (h || e) && (this._active = a, this._updateHoverStyles(a, n, e)), this._lastEvent = c, h;
  }
  _getActiveElements(t, e, s, n) {
    if (t.type === "mouseout")
      return [];
    if (!s)
      return e;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, n);
  }
}
function xn() {
  return L(Wo.instances, (i) => i._plugins.invalidate());
}
function Qc(i, t, e) {
  const { startAngle: s, x: n, y: o, outerRadius: r, innerRadius: a, options: l } = t, { borderWidth: c, borderJoinStyle: h } = l, d = Math.min(c / r, q(s - e));
  if (i.beginPath(), i.arc(n, o, r - c / 2, s + d / 2, e - d / 2), a > 0) {
    const u = Math.min(c / a, q(s - e));
    i.arc(n, o, a + c / 2, e - u / 2, s + u / 2, !0);
  } else {
    const u = Math.min(c / 2, r * q(s - e));
    if (h === "round")
      i.arc(n, o, u, e - E / 2, s + E / 2, !0);
    else if (h === "bevel") {
      const f = 2 * u * u, g = -f * Math.cos(e + E / 2) + n, p = -f * Math.sin(e + E / 2) + o, m = f * Math.cos(s + E / 2) + n, b = f * Math.sin(s + E / 2) + o;
      i.lineTo(g, p), i.lineTo(m, b);
    }
  }
  i.closePath(), i.moveTo(0, 0), i.rect(0, 0, i.canvas.width, i.canvas.height), i.clip("evenodd");
}
function th(i, t, e) {
  const { startAngle: s, pixelMargin: n, x: o, y: r, outerRadius: a, innerRadius: l } = t;
  let c = n / a;
  i.beginPath(), i.arc(o, r, a, s - c, e + c), l > n ? (c = n / l, i.arc(o, r, l, e + c, s - c, !0)) : i.arc(o, r, n, e + W, s - W), i.closePath(), i.clip();
}
function eh(i) {
  return ns(i, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function ih(i, t, e, s) {
  const n = eh(i.options.borderRadius), o = (e - t) / 2, r = Math.min(o, s * t / 2), a = (l) => {
    const c = (e - Math.min(o, l)) * s / 2;
    return U(l, 0, Math.min(o, c));
  };
  return {
    outerStart: a(n.outerStart),
    outerEnd: a(n.outerEnd),
    innerStart: U(n.innerStart, 0, r),
    innerEnd: U(n.innerEnd, 0, r)
  };
}
function Ut(i, t, e, s) {
  return {
    x: e + i * Math.cos(t),
    y: s + i * Math.sin(t)
  };
}
function si(i, t, e, s, n, o) {
  const { x: r, y: a, startAngle: l, pixelMargin: c, innerRadius: h } = t, d = Math.max(t.outerRadius + s + e - c, 0), u = h > 0 ? h + s + e + c : 0;
  let f = 0;
  const g = n - l;
  if (s) {
    const R = h > 0 ? h - s : 0, z = d > 0 ? d - s : 0, H = (R + z) / 2, st = H !== 0 ? g * H / (H + s) : g;
    f = (g - st) / 2;
  }
  const p = Math.max(1e-3, g * d - e / E) / d, m = (g - p) / 2, b = l + m + f, _ = n - m - f, { outerStart: v, outerEnd: y, innerStart: x, innerEnd: S } = ih(t, u, d, _ - b), M = d - v, w = d - y, k = b + v / M, A = _ - y / w, C = u + x, T = u + S, Y = b + x / C, tt = _ - S / T;
  if (i.beginPath(), o) {
    const R = (k + A) / 2;
    if (i.arc(r, a, d, k, R), i.arc(r, a, d, R, A), y > 0) {
      const X = Ut(w, A, r, a);
      i.arc(X.x, X.y, y, A, _ + W);
    }
    const z = Ut(T, _, r, a);
    if (i.lineTo(z.x, z.y), S > 0) {
      const X = Ut(T, tt, r, a);
      i.arc(X.x, X.y, S, _ + W, tt + Math.PI);
    }
    const H = (_ - S / u + (b + x / u)) / 2;
    if (i.arc(r, a, u, _ - S / u, H, !0), i.arc(r, a, u, H, b + x / u, !0), x > 0) {
      const X = Ut(C, Y, r, a);
      i.arc(X.x, X.y, x, Y + Math.PI, b - W);
    }
    const st = Ut(M, b, r, a);
    if (i.lineTo(st.x, st.y), v > 0) {
      const X = Ut(M, k, r, a);
      i.arc(X.x, X.y, v, b - W, k);
    }
  } else {
    i.moveTo(r, a);
    const R = Math.cos(k) * d + r, z = Math.sin(k) * d + a;
    i.lineTo(R, z);
    const H = Math.cos(A) * d + r, st = Math.sin(A) * d + a;
    i.lineTo(H, st);
  }
  i.closePath();
}
function sh(i, t, e, s, n) {
  const { fullCircles: o, startAngle: r, circumference: a } = t;
  let l = t.endAngle;
  if (o) {
    si(i, t, e, s, l, n);
    for (let c = 0; c < o; ++c)
      i.fill();
    isNaN(a) || (l = r + (a % F || F));
  }
  return si(i, t, e, s, l, n), i.fill(), l;
}
function nh(i, t, e, s, n) {
  const { fullCircles: o, startAngle: r, circumference: a, options: l } = t, { borderWidth: c, borderJoinStyle: h, borderDash: d, borderDashOffset: u, borderRadius: f } = l, g = l.borderAlign === "inner";
  if (!c)
    return;
  i.setLineDash(d || []), i.lineDashOffset = u, g ? (i.lineWidth = c * 2, i.lineJoin = h || "round") : (i.lineWidth = c, i.lineJoin = h || "bevel");
  let p = t.endAngle;
  if (o) {
    si(i, t, e, s, p, n);
    for (let m = 0; m < o; ++m)
      i.stroke();
    isNaN(a) || (p = r + (a % F || F));
  }
  g && th(i, t, p), l.selfJoin && p - r >= E && f === 0 && h !== "miter" && Qc(i, t, p), o || (si(i, t, e, s, p, n), i.stroke());
}
class oh extends pt {
  static id = "arc";
  static defaults = {
    borderAlign: "center",
    borderColor: "#fff",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: void 0,
    borderRadius: 0,
    borderWidth: 2,
    offset: 0,
    spacing: 0,
    angle: void 0,
    circular: !0,
    selfJoin: !1
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor"
  };
  static descriptors = {
    _scriptable: !0,
    _indexable: (t) => t !== "borderDash"
  };
  circumference;
  endAngle;
  fullCircles;
  innerRadius;
  outerRadius;
  pixelMargin;
  startAngle;
  constructor(t) {
    super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, t && Object.assign(this, t);
  }
  inRange(t, e, s) {
    const n = this.getProps([
      "x",
      "y"
    ], s), { angle: o, distance: r } = ro(n, {
      x: t,
      y: e
    }), { startAngle: a, endAngle: l, innerRadius: c, outerRadius: h, circumference: d } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), u = (this.options.spacing + this.options.borderWidth) / 2, f = P(d, l - a), g = Se(o, a, l) && a !== l, p = f >= F || g, m = ut(r, c + u, h + u);
    return p && m;
  }
  getCenterPoint(t) {
    const { x: e, y: s, startAngle: n, endAngle: o, innerRadius: r, outerRadius: a } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: l, spacing: c } = this.options, h = (n + o) / 2, d = (r + a + c + l) / 2;
    return {
      x: e + Math.cos(h) * d,
      y: s + Math.sin(h) * d
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: e, circumference: s } = this, n = (e.offset || 0) / 4, o = (e.spacing || 0) / 2, r = e.circular;
    if (this.pixelMargin = e.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = s > F ? Math.floor(s / F) : 0, s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const a = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(a) * n, Math.sin(a) * n);
    const l = 1 - Math.sin(Math.min(E, s || 0)), c = n * l;
    t.fillStyle = e.backgroundColor, t.strokeStyle = e.borderColor, sh(t, this, c, o, r), nh(t, this, c, o, r), t.restore();
  }
}
function Vo(i, t, e = t) {
  i.lineCap = P(e.borderCapStyle, t.borderCapStyle), i.setLineDash(P(e.borderDash, t.borderDash)), i.lineDashOffset = P(e.borderDashOffset, t.borderDashOffset), i.lineJoin = P(e.borderJoinStyle, t.borderJoinStyle), i.lineWidth = P(e.borderWidth, t.borderWidth), i.strokeStyle = P(e.borderColor, t.borderColor);
}
function rh(i, t, e) {
  i.lineTo(e.x, e.y);
}
function ah(i) {
  return i.stepped ? Sa : i.tension || i.cubicInterpolationMode === "monotone" ? Ma : rh;
}
function jo(i, t, e = {}) {
  const s = i.length, { start: n = 0, end: o = s - 1 } = e, { start: r, end: a } = t, l = Math.max(n, r), c = Math.min(o, a), h = n < r && o < r || n > a && o > a;
  return {
    count: s,
    start: l,
    loop: t.loop,
    ilen: c < l && !h ? s + c - l : c - l
  };
}
function lh(i, t, e, s) {
  const { points: n, options: o } = t, { count: r, start: a, loop: l, ilen: c } = jo(n, e, s), h = ah(o);
  let { move: d = !0, reverse: u } = s || {}, f, g, p;
  for (f = 0; f <= c; ++f)
    g = n[(a + (u ? c - f : f)) % r], !g.skip && (d ? (i.moveTo(g.x, g.y), d = !1) : h(i, p, g, u, o.stepped), p = g);
  return l && (g = n[(a + (u ? c : 0)) % r], h(i, p, g, u, o.stepped)), !!l;
}
function ch(i, t, e, s) {
  const n = t.points, { count: o, start: r, ilen: a } = jo(n, e, s), { move: l = !0, reverse: c } = s || {};
  let h = 0, d = 0, u, f, g, p, m, b;
  const _ = (y) => (r + (c ? a - y : y)) % o, v = () => {
    p !== m && (i.lineTo(h, m), i.lineTo(h, p), i.lineTo(h, b));
  };
  for (l && (f = n[_(0)], i.moveTo(f.x, f.y)), u = 0; u <= a; ++u) {
    if (f = n[_(u)], f.skip)
      continue;
    const y = f.x, x = f.y, S = y | 0;
    S === g ? (x < p ? p = x : x > m && (m = x), h = (d * h + y) / ++d) : (v(), i.lineTo(y, x), g = S, d = 0, p = m = x), b = x;
  }
  v();
}
function Bi(i) {
  const t = i.options, e = t.borderDash && t.borderDash.length;
  return !i._decimated && !i._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !e ? ch : lh;
}
function hh(i) {
  return i.stepped ? el : i.tension || i.cubicInterpolationMode === "monotone" ? il : Lt;
}
function dh(i, t, e, s) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, e, s) && n.closePath()), Vo(i, t.options), i.stroke(n);
}
function uh(i, t, e, s) {
  const { segments: n, options: o } = t, r = Bi(t);
  for (const a of n)
    Vo(i, o, a.style), i.beginPath(), r(i, t, a, {
      start: e,
      end: e + s - 1
    }) && i.closePath(), i.stroke();
}
const fh = typeof Path2D == "function";
function gh(i, t, e, s) {
  fh && !t.options.segment ? dh(i, t, e, s) : uh(i, t, e, s);
}
class fi extends pt {
  static id = "line";
  static defaults = {
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderWidth: 3,
    capBezierPoints: !0,
    cubicInterpolationMode: "default",
    fill: !1,
    spanGaps: !1,
    stepped: !1,
    tension: 0
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  static descriptors = {
    _scriptable: !0,
    _indexable: (t) => t !== "borderDash" && t !== "fill"
  };
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, e) {
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const n = s.spanGaps ? this._loop : this._fullLoop;
      Xa(this._points, s, t, n, e), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = ll(this, this.options.segment));
  }
  first() {
    const t = this.segments, e = this.points;
    return t.length && e[t[0].start];
  }
  last() {
    const t = this.segments, e = this.points, s = t.length;
    return s && e[t[s - 1].end];
  }
  interpolate(t, e) {
    const s = this.options, n = t[e], o = this.points, r = Ao(this, {
      property: e,
      start: n,
      end: n
    });
    if (!r.length)
      return;
    const a = [], l = hh(s);
    let c, h;
    for (c = 0, h = r.length; c < h; ++c) {
      const { start: d, end: u } = r[c], f = o[d], g = o[u];
      if (f === g) {
        a.push(f);
        continue;
      }
      const p = Math.abs((n - f[e]) / (g[e] - f[e])), m = l(f, g, p, s.stepped);
      m[e] = t[e], a.push(m);
    }
    return a.length === 1 ? a[0] : a;
  }
  pathSegment(t, e, s) {
    return Bi(this)(t, this, e, s);
  }
  path(t, e, s) {
    const n = this.segments, o = Bi(this);
    let r = this._loop;
    e = e || 0, s = s || this.points.length - e;
    for (const a of n)
      r &= o(t, this, a, {
        start: e,
        end: e + s - 1
      });
    return !!r;
  }
  draw(t, e, s, n) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), gh(t, this, s, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function yn(i, t, e, s) {
  const n = i.options, { [e]: o } = i.getProps([
    e
  ], s);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class ph extends pt {
  static id = "point";
  parsed;
  skip;
  stop;
  /**
  * @type {any}
  */
  static defaults = {
    borderWidth: 1,
    hitRadius: 1,
    hoverBorderWidth: 1,
    hoverRadius: 4,
    pointStyle: "circle",
    radius: 3,
    rotation: 0
  };
  /**
  * @type {any}
  */
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  constructor(t) {
    super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t && Object.assign(this, t);
  }
  inRange(t, e, s) {
    const n = this.options, { x: o, y: r } = this.getProps([
      "x",
      "y"
    ], s);
    return Math.pow(t - o, 2) + Math.pow(e - r, 2) < Math.pow(n.hitRadius + n.radius, 2);
  }
  inXRange(t, e) {
    return yn(this, t, "x", e);
  }
  inYRange(t, e) {
    return yn(this, t, "y", e);
  }
  getCenterPoint(t) {
    const { x: e, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: e,
      y: s
    };
  }
  size(t) {
    t = t || this.options || {};
    let e = t.radius || 0;
    e = Math.max(e, e && t.hoverRadius || 0);
    const s = e && t.borderWidth || 0;
    return (e + s) * 2;
  }
  draw(t, e) {
    const s = this.options;
    this.skip || s.radius < 0.1 || !gt(this, e, this.size(s) / 2) || (t.strokeStyle = s.borderColor, t.lineWidth = s.borderWidth, t.fillStyle = s.backgroundColor, $i(t, s, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Uo(i, t) {
  const { x: e, y: s, base: n, width: o, height: r } = i.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let a, l, c, h, d;
  return i.horizontal ? (d = r / 2, a = Math.min(e, n), l = Math.max(e, n), c = s - d, h = s + d) : (d = o / 2, a = e - d, l = e + d, c = Math.min(s, n), h = Math.max(s, n)), {
    left: a,
    top: c,
    right: l,
    bottom: h
  };
}
function xt(i, t, e, s) {
  return i ? 0 : U(t, e, s);
}
function mh(i, t, e) {
  const s = i.options.borderWidth, n = i.borderSkipped, o = mo(s);
  return {
    t: xt(n.top, o.top, 0, e),
    r: xt(n.right, o.right, 0, t),
    b: xt(n.bottom, o.bottom, 0, e),
    l: xt(n.left, o.left, 0, t)
  };
}
function bh(i, t, e) {
  const { enableBorderRadius: s } = i.getProps([
    "enableBorderRadius"
  ]), n = i.options.borderRadius, o = It(n), r = Math.min(t, e), a = i.borderSkipped, l = s || O(n);
  return {
    topLeft: xt(!l || a.top || a.left, o.topLeft, 0, r),
    topRight: xt(!l || a.top || a.right, o.topRight, 0, r),
    bottomLeft: xt(!l || a.bottom || a.left, o.bottomLeft, 0, r),
    bottomRight: xt(!l || a.bottom || a.right, o.bottomRight, 0, r)
  };
}
function _h(i) {
  const t = Uo(i), e = t.right - t.left, s = t.bottom - t.top, n = mh(i, e / 2, s / 2), o = bh(i, e / 2, s / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: e,
      h: s,
      radius: o
    },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: e - n.l - n.r,
      h: s - n.t - n.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r))
      }
    }
  };
}
function Ai(i, t, e, s) {
  const n = t === null, o = e === null, a = i && !(n && o) && Uo(i, s);
  return a && (n || ut(t, a.left, a.right)) && (o || ut(e, a.top, a.bottom));
}
function xh(i) {
  return i.topLeft || i.topRight || i.bottomLeft || i.bottomRight;
}
function yh(i, t) {
  i.rect(t.x, t.y, t.w, t.h);
}
function Ci(i, t, e = {}) {
  const s = i.x !== e.x ? -t : 0, n = i.y !== e.y ? -t : 0, o = (i.x + i.w !== e.x + e.w ? t : 0) - s, r = (i.y + i.h !== e.y + e.h ? t : 0) - n;
  return {
    x: i.x + s,
    y: i.y + n,
    w: i.w + o,
    h: i.h + r,
    radius: i.radius
  };
}
class vh extends pt {
  static id = "bar";
  static defaults = {
    borderSkipped: "start",
    borderWidth: 0,
    borderRadius: 0,
    inflateAmount: "auto",
    pointStyle: void 0
  };
  static defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor"
  };
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: e, options: { borderColor: s, backgroundColor: n } } = this, { inner: o, outer: r } = _h(this), a = xh(r.radius) ? Me : yh;
    t.save(), (r.w !== o.w || r.h !== o.h) && (t.beginPath(), a(t, Ci(r, e, o)), t.clip(), a(t, Ci(o, -e, r)), t.fillStyle = s, t.fill("evenodd")), t.beginPath(), a(t, Ci(o, e)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, e, s) {
    return Ai(this, t, e, s);
  }
  inXRange(t, e) {
    return Ai(this, t, null, e);
  }
  inYRange(t, e) {
    return Ai(this, null, t, e);
  }
  getCenterPoint(t) {
    const { x: e, y: s, base: n, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (e + n) / 2 : e,
      y: o ? s : (s + n) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
var Sh = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: oh,
  BarElement: vh,
  LineElement: fi,
  PointElement: ph
});
const Ni = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], vn = /* @__PURE__ */ Ni.map((i) => i.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function Yo(i) {
  return Ni[i % Ni.length];
}
function Xo(i) {
  return vn[i % vn.length];
}
function Mh(i, t) {
  return i.borderColor = Yo(t), i.backgroundColor = Xo(t), ++t;
}
function wh(i, t) {
  return i.backgroundColor = i.data.map(() => Yo(t++)), t;
}
function kh(i, t) {
  return i.backgroundColor = i.data.map(() => Xo(t++)), t;
}
function Ph(i) {
  let t = 0;
  return (e, s) => {
    const n = i.getDatasetMeta(s).controller;
    n instanceof hs ? t = wh(e, t) : n instanceof Eo ? t = kh(e, t) : n && (t = Mh(e, t));
  };
}
function Sn(i) {
  let t;
  for (t in i)
    if (i[t].borderColor || i[t].backgroundColor)
      return !0;
  return !1;
}
function Ah(i) {
  return i && (i.borderColor || i.backgroundColor);
}
function Ch() {
  return B.borderColor !== "rgba(0,0,0,0.1)" || B.backgroundColor !== "rgba(0,0,0,0.1)";
}
var Dh = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(i, t, e) {
    if (!e.enabled)
      return;
    const { data: { datasets: s }, options: n } = i.config, { elements: o } = n, r = Sn(s) || Ah(n) || o && Sn(o) || Ch();
    if (!e.forceOverride && r)
      return;
    const a = Ph(i);
    s.forEach(a);
  }
};
function Oh(i, t, e, s, n) {
  const o = n.samples || s;
  if (o >= e)
    return i.slice(t, t + e);
  const r = [], a = (e - 2) / (o - 2);
  let l = 0;
  const c = t + e - 1;
  let h = t, d, u, f, g, p;
  for (r[l++] = i[h], d = 0; d < o - 2; d++) {
    let m = 0, b = 0, _;
    const v = Math.floor((d + 1) * a) + 1 + t, y = Math.min(Math.floor((d + 2) * a) + 1, e) + t, x = y - v;
    for (_ = v; _ < y; _++)
      m += i[_].x, b += i[_].y;
    m /= x, b /= x;
    const S = Math.floor(d * a) + 1 + t, M = Math.min(Math.floor((d + 1) * a) + 1, e) + t, { x: w, y: k } = i[h];
    for (f = g = -1, _ = S; _ < M; _++)
      g = 0.5 * Math.abs((w - m) * (i[_].y - k) - (w - i[_].x) * (b - k)), g > f && (f = g, u = i[_], p = _);
    r[l++] = u, h = p;
  }
  return r[l++] = i[c], r;
}
function Th(i, t, e, s) {
  let n = 0, o = 0, r, a, l, c, h, d, u, f, g, p;
  const m = [], b = t + e - 1, _ = i[t].x, y = i[b].x - _;
  for (r = t; r < t + e; ++r) {
    a = i[r], l = (a.x - _) / y * s, c = a.y;
    const x = l | 0;
    if (x === h)
      c < g ? (g = c, d = r) : c > p && (p = c, u = r), n = (o * n + a.x) / ++o;
    else {
      const S = r - 1;
      if (!D(d) && !D(u)) {
        const M = Math.min(d, u), w = Math.max(d, u);
        M !== f && M !== S && m.push({
          ...i[M],
          x: n
        }), w !== f && w !== S && m.push({
          ...i[w],
          x: n
        });
      }
      r > 0 && S !== f && m.push(i[S]), m.push(a), h = x, o = 0, g = p = c, d = u = f = r;
    }
  }
  return m;
}
function Ko(i) {
  if (i._decimated) {
    const t = i._data;
    delete i._decimated, delete i._data, Object.defineProperty(i, "data", {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: t
    });
  }
}
function Mn(i) {
  i.data.datasets.forEach((t) => {
    Ko(t);
  });
}
function Eh(i, t) {
  const e = t.length;
  let s = 0, n;
  const { iScale: o } = i, { min: r, max: a, minDefined: l, maxDefined: c } = o.getUserBounds();
  return l && (s = U(ft(t, o.axis, r).lo, 0, e - 1)), c ? n = U(ft(t, o.axis, a).hi + 1, s, e) - s : n = e - s, {
    start: s,
    count: n
  };
}
var Lh = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (i, t, e) => {
    if (!e.enabled) {
      Mn(i);
      return;
    }
    const s = i.width;
    i.data.datasets.forEach((n, o) => {
      const { _data: r, indexAxis: a } = n, l = i.getDatasetMeta(o), c = r || n.data;
      if (le([
        a,
        i.options.indexAxis
      ]) === "y" || !l.controller.supportsDecimation)
        return;
      const h = i.scales[l.xAxisID];
      if (h.type !== "linear" && h.type !== "time" || i.options.parsing)
        return;
      let { start: d, count: u } = Eh(l, c);
      const f = e.threshold || 4 * s;
      if (u <= f) {
        Ko(n);
        return;
      }
      D(r) && (n._data = c, delete n.data, Object.defineProperty(n, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(p) {
          this._data = p;
        }
      }));
      let g;
      switch (e.algorithm) {
        case "lttb":
          g = Oh(c, d, u, s, e);
          break;
        case "min-max":
          g = Th(c, d, u, s);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`);
      }
      n._decimated = g;
    });
  },
  destroy(i) {
    Mn(i);
  }
};
function Rh(i, t, e) {
  const s = i.segments, n = i.points, o = t.points, r = [];
  for (const a of s) {
    let { start: l, end: c } = a;
    c = gi(l, c, n);
    const h = Hi(e, n[l], n[c], a.loop);
    if (!t.segments) {
      r.push({
        source: a,
        target: h,
        start: n[l],
        end: n[c]
      });
      continue;
    }
    const d = Ao(t, h);
    for (const u of d) {
      const f = Hi(e, o[u.start], o[u.end], u.loop), g = Po(a, n, f);
      for (const p of g)
        r.push({
          source: p,
          target: u,
          start: {
            [e]: wn(h, f, "start", Math.max)
          },
          end: {
            [e]: wn(h, f, "end", Math.min)
          }
        });
    }
  }
  return r;
}
function Hi(i, t, e, s) {
  if (s)
    return;
  let n = t[i], o = e[i];
  return i === "angle" && (n = q(n), o = q(o)), {
    property: i,
    start: n,
    end: o
  };
}
function Ih(i, t) {
  const { x: e = null, y: s = null } = i || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: r, end: a }) => {
    a = gi(r, a, n);
    const l = n[r], c = n[a];
    s !== null ? (o.push({
      x: l.x,
      y: s
    }), o.push({
      x: c.x,
      y: s
    })) : e !== null && (o.push({
      x: e,
      y: l.y
    }), o.push({
      x: e,
      y: c.y
    }));
  }), o;
}
function gi(i, t, e) {
  for (; t > i; t--) {
    const s = e[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function wn(i, t, e, s) {
  return i && t ? s(i[e], t[e]) : i ? i[e] : t ? t[e] : 0;
}
function qo(i, t) {
  let e = [], s = !1;
  return $(i) ? (s = !0, e = i) : e = Ih(i, t), e.length ? new fi({
    points: e,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function kn(i) {
  return i && i.fill !== !1;
}
function $h(i, t, e) {
  let n = i[t].fill;
  const o = [
    t
  ];
  let r;
  if (!e)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!N(n))
      return n;
    if (r = i[n], !r)
      return !1;
    if (r.visible)
      return n;
    o.push(n), n = r.fill;
  }
  return !1;
}
function Fh(i, t, e) {
  const s = Hh(i);
  if (O(s))
    return isNaN(s.value) ? !1 : s;
  let n = parseFloat(s);
  return N(n) && Math.floor(n) === n ? zh(s[0], t, n, e) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function zh(i, t, e, s) {
  return (i === "-" || i === "+") && (e = t + e), e === t || e < 0 || e >= s ? !1 : e;
}
function Bh(i, t) {
  let e = null;
  return i === "start" ? e = t.bottom : i === "end" ? e = t.top : O(i) ? e = t.getPixelForValue(i.value) : t.getBasePixel && (e = t.getBasePixel()), e;
}
function Nh(i, t, e) {
  let s;
  return i === "start" ? s = e : i === "end" ? s = t.options.reverse ? t.min : t.max : O(i) ? s = i.value : s = t.getBaseValue(), s;
}
function Hh(i) {
  const t = i.options, e = t.fill;
  let s = P(e && e.target, e);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function Wh(i) {
  const { scale: t, index: e, line: s } = i, n = [], o = s.segments, r = s.points, a = Vh(t, e);
  a.push(qo({
    x: null,
    y: t.bottom
  }, s));
  for (let l = 0; l < o.length; l++) {
    const c = o[l];
    for (let h = c.start; h <= c.end; h++)
      jh(n, r[h], a);
  }
  return new fi({
    points: n,
    options: {}
  });
}
function Vh(i, t) {
  const e = [], s = i.getMatchingVisibleMetas("line");
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    if (o.index === t)
      break;
    o.hidden || e.unshift(o.dataset);
  }
  return e;
}
function jh(i, t, e) {
  const s = [];
  for (let n = 0; n < e.length; n++) {
    const o = e[n], { first: r, last: a, point: l } = Uh(o, t, "x");
    if (!(!l || r && a)) {
      if (r)
        s.unshift(l);
      else if (i.push(l), !a)
        break;
    }
  }
  i.push(...s);
}
function Uh(i, t, e) {
  const s = i.interpolate(t, e);
  if (!s)
    return {};
  const n = s[e], o = i.segments, r = i.points;
  let a = !1, l = !1;
  for (let c = 0; c < o.length; c++) {
    const h = o[c], d = r[h.start][e], u = r[h.end][e];
    if (ut(n, d, u)) {
      a = n === d, l = n === u;
      break;
    }
  }
  return {
    first: a,
    last: l,
    point: s
  };
}
class Go {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, e, s) {
    const { x: n, y: o, radius: r } = this;
    return e = e || {
      start: 0,
      end: F
    }, t.arc(n, o, r, e.end, e.start, !0), !s.bounds;
  }
  interpolate(t) {
    const { x: e, y: s, radius: n } = this, o = t.angle;
    return {
      x: e + Math.cos(o) * n,
      y: s + Math.sin(o) * n,
      angle: o
    };
  }
}
function Yh(i) {
  const { chart: t, fill: e, line: s } = i;
  if (N(e))
    return Xh(t, e);
  if (e === "stack")
    return Wh(i);
  if (e === "shape")
    return !0;
  const n = Kh(i);
  return n instanceof Go ? n : qo(n, s);
}
function Xh(i, t) {
  const e = i.getDatasetMeta(t);
  return e && i.isDatasetVisible(t) ? e.dataset : null;
}
function Kh(i) {
  return (i.scale || {}).getPointPositionForValue ? Gh(i) : qh(i);
}
function qh(i) {
  const { scale: t = {}, fill: e } = i, s = Bh(e, t);
  if (N(s)) {
    const n = t.isHorizontal();
    return {
      x: n ? s : null,
      y: n ? null : s
    };
  }
  return null;
}
function Gh(i) {
  const { scale: t, fill: e } = i, s = t.options, n = t.getLabels().length, o = s.reverse ? t.max : t.min, r = Nh(e, t, o), a = [];
  if (s.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new Go({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(r)
    });
  }
  for (let l = 0; l < n; ++l)
    a.push(t.getPointPositionForValue(l, r));
  return a;
}
function Di(i, t, e) {
  const s = Yh(t), { chart: n, index: o, line: r, scale: a, axis: l } = t, c = r.options, h = c.fill, d = c.backgroundColor, { above: u = d, below: f = d } = h || {}, g = n.getDatasetMeta(o), p = Co(n, g);
  s && r.points.length && (ci(i, e), Zh(i, {
    line: r,
    target: s,
    above: u,
    below: f,
    area: e,
    scale: a,
    axis: l,
    clip: p
  }), hi(i));
}
function Zh(i, t) {
  const { line: e, target: s, above: n, below: o, area: r, scale: a, clip: l } = t, c = e._loop ? "angle" : t.axis;
  i.save();
  let h = o;
  o !== n && (c === "x" ? (Pn(i, s, r.top), Oi(i, {
    line: e,
    target: s,
    color: n,
    scale: a,
    property: c,
    clip: l
  }), i.restore(), i.save(), Pn(i, s, r.bottom)) : c === "y" && (An(i, s, r.left), Oi(i, {
    line: e,
    target: s,
    color: o,
    scale: a,
    property: c,
    clip: l
  }), i.restore(), i.save(), An(i, s, r.right), h = n)), Oi(i, {
    line: e,
    target: s,
    color: h,
    scale: a,
    property: c,
    clip: l
  }), i.restore();
}
function Pn(i, t, e) {
  const { segments: s, points: n } = t;
  let o = !0, r = !1;
  i.beginPath();
  for (const a of s) {
    const { start: l, end: c } = a, h = n[l], d = n[gi(l, c, n)];
    o ? (i.moveTo(h.x, h.y), o = !1) : (i.lineTo(h.x, e), i.lineTo(h.x, h.y)), r = !!t.pathSegment(i, a, {
      move: r
    }), r ? i.closePath() : i.lineTo(d.x, e);
  }
  i.lineTo(t.first().x, e), i.closePath(), i.clip();
}
function An(i, t, e) {
  const { segments: s, points: n } = t;
  let o = !0, r = !1;
  i.beginPath();
  for (const a of s) {
    const { start: l, end: c } = a, h = n[l], d = n[gi(l, c, n)];
    o ? (i.moveTo(h.x, h.y), o = !1) : (i.lineTo(e, h.y), i.lineTo(h.x, h.y)), r = !!t.pathSegment(i, a, {
      move: r
    }), r ? i.closePath() : i.lineTo(e, d.y);
  }
  i.lineTo(e, t.first().y), i.closePath(), i.clip();
}
function Oi(i, t) {
  const { line: e, target: s, property: n, color: o, scale: r, clip: a } = t, l = Rh(e, s, n);
  for (const { source: c, target: h, start: d, end: u } of l) {
    const { style: { backgroundColor: f = o } = {} } = c, g = s !== !0;
    i.save(), i.fillStyle = f, Jh(i, r, a, g && Hi(n, d, u)), i.beginPath();
    const p = !!e.pathSegment(i, c);
    let m;
    if (g) {
      p ? i.closePath() : Cn(i, s, u, n);
      const b = !!s.pathSegment(i, h, {
        move: p,
        reverse: !0
      });
      m = p && b, m || Cn(i, s, d, n);
    }
    i.closePath(), i.fill(m ? "evenodd" : "nonzero"), i.restore();
  }
}
function Jh(i, t, e, s) {
  const n = t.chart.chartArea, { property: o, start: r, end: a } = s || {};
  if (o === "x" || o === "y") {
    let l, c, h, d;
    o === "x" ? (l = r, c = n.top, h = a, d = n.bottom) : (l = n.left, c = r, h = n.right, d = a), i.beginPath(), e && (l = Math.max(l, e.left), h = Math.min(h, e.right), c = Math.max(c, e.top), d = Math.min(d, e.bottom)), i.rect(l, c, h - l, d - c), i.clip();
  }
}
function Cn(i, t, e, s) {
  const n = t.interpolate(e, s);
  n && i.lineTo(n.x, n.y);
}
var Qh = {
  id: "filler",
  afterDatasetsUpdate(i, t, e) {
    const s = (i.data.datasets || []).length, n = [];
    let o, r, a, l;
    for (r = 0; r < s; ++r)
      o = i.getDatasetMeta(r), a = o.dataset, l = null, a && a.options && a instanceof fi && (l = {
        visible: i.isDatasetVisible(r),
        index: r,
        fill: Fh(a, r, s),
        chart: i,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: a
      }), o.$filler = l, n.push(l);
    for (r = 0; r < s; ++r)
      l = n[r], !(!l || l.fill === !1) && (l.fill = $h(n, r, e.propagate));
  },
  beforeDraw(i, t, e) {
    const s = e.drawTime === "beforeDraw", n = i.getSortedVisibleDatasetMetas(), o = i.chartArea;
    for (let r = n.length - 1; r >= 0; --r) {
      const a = n[r].$filler;
      a && (a.line.updateControlPoints(o, a.axis), s && a.fill && Di(i.ctx, a, o));
    }
  },
  beforeDatasetsDraw(i, t, e) {
    if (e.drawTime !== "beforeDatasetsDraw")
      return;
    const s = i.getSortedVisibleDatasetMetas();
    for (let n = s.length - 1; n >= 0; --n) {
      const o = s[n].$filler;
      kn(o) && Di(i.ctx, o, i.chartArea);
    }
  },
  beforeDatasetDraw(i, t, e) {
    const s = t.meta.$filler;
    !kn(s) || e.drawTime !== "beforeDatasetDraw" || Di(i.ctx, s, i.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Dn = (i, t) => {
  let { boxHeight: e = t, boxWidth: s = t } = i;
  return i.usePointStyle && (e = Math.min(e, t), s = i.pointStyleWidth || Math.min(s, t)), {
    boxWidth: s,
    boxHeight: e,
    itemHeight: Math.max(t, e)
  };
}, td = (i, t) => i !== null && t !== null && i.datasetIndex === t.datasetIndex && i.index === t.index;
class On extends pt {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e, s) {
    this.maxWidth = t, this.maxHeight = e, this._margins = s, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let e = I(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (e = e.filter((s) => t.filter(s, this.chart.data))), t.sort && (e = e.sort((s, n) => t.sort(s, n, this.chart.data))), this.options.reverse && e.reverse(), this.legendItems = e;
  }
  fit() {
    const { options: t, ctx: e } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const s = t.labels, n = V(s.font), o = n.size, r = this._computeTitleHeight(), { boxWidth: a, itemHeight: l } = Dn(s, o);
    let c, h;
    e.font = n.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(r, o, a, l) + 10) : (h = this.maxHeight, c = this._fitCols(r, n, a, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, e, s, n) {
    const { ctx: o, maxWidth: r, options: { labels: { padding: a } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], h = n + a;
    let d = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let u = -1, f = -h;
    return this.legendItems.forEach((g, p) => {
      const m = s + e / 2 + o.measureText(g.text).width;
      (p === 0 || c[c.length - 1] + m + 2 * a > r) && (d += h, c[c.length - (p > 0 ? 0 : 1)] = 0, f += h, u++), l[p] = {
        left: 0,
        top: f,
        row: u,
        width: m,
        height: n
      }, c[c.length - 1] += m + a;
    }), d;
  }
  _fitCols(t, e, s, n) {
    const { ctx: o, maxHeight: r, options: { labels: { padding: a } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = r - t;
    let d = a, u = 0, f = 0, g = 0, p = 0;
    return this.legendItems.forEach((m, b) => {
      const { itemWidth: _, itemHeight: v } = ed(s, e, o, m, n);
      b > 0 && f + v + 2 * a > h && (d += u + a, c.push({
        width: u,
        height: f
      }), g += u + a, p++, u = f = 0), l[b] = {
        left: g,
        top: f,
        col: p,
        width: _,
        height: v
      }, u = Math.max(u, _), f += v + a;
    }), d += u, c.push({
      width: u,
      height: f
    }), d;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: e, options: { align: s, labels: { padding: n }, rtl: o } } = this, r = Xt(o, this.left, this.width);
    if (this.isHorizontal()) {
      let a = 0, l = K(s, this.left + n, this.right - this.lineWidths[a]);
      for (const c of e)
        a !== c.row && (a = c.row, l = K(s, this.left + n, this.right - this.lineWidths[a])), c.top += this.top + t + n, c.left = r.leftForLtr(r.x(l), c.width), l += c.width + n;
    } else {
      let a = 0, l = K(s, this.top + t + n, this.bottom - this.columnSizes[a].height);
      for (const c of e)
        c.col !== a && (a = c.col, l = K(s, this.top + t + n, this.bottom - this.columnSizes[a].height)), c.top = l, c.left += this.left + n, c.left = r.leftForLtr(r.x(c.left), c.width), l += c.height + n;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      ci(t, this), this._draw(), hi(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: e, lineWidths: s, ctx: n } = this, { align: o, labels: r } = t, a = B.color, l = Xt(t.rtl, this.left, this.width), c = V(r.font), { padding: h } = r, d = c.size, u = d / 2;
    let f;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = c.string;
    const { boxWidth: g, boxHeight: p, itemHeight: m } = Dn(r, d), b = function(S, M, w) {
      if (isNaN(g) || g <= 0 || isNaN(p) || p < 0)
        return;
      n.save();
      const k = P(w.lineWidth, 1);
      if (n.fillStyle = P(w.fillStyle, a), n.lineCap = P(w.lineCap, "butt"), n.lineDashOffset = P(w.lineDashOffset, 0), n.lineJoin = P(w.lineJoin, "miter"), n.lineWidth = k, n.strokeStyle = P(w.strokeStyle, a), n.setLineDash(P(w.lineDash, [])), r.usePointStyle) {
        const A = {
          radius: p * Math.SQRT2 / 2,
          pointStyle: w.pointStyle,
          rotation: w.rotation,
          borderWidth: k
        }, C = l.xPlus(S, g / 2), T = M + u;
        po(n, A, C, T, r.pointStyleWidth && g);
      } else {
        const A = M + Math.max((d - p) / 2, 0), C = l.leftForLtr(S, g), T = It(w.borderRadius);
        n.beginPath(), Object.values(T).some((Y) => Y !== 0) ? Me(n, {
          x: C,
          y: A,
          w: g,
          h: p,
          radius: T
        }) : n.rect(C, A, g, p), n.fill(), k !== 0 && n.stroke();
      }
      n.restore();
    }, _ = function(S, M, w) {
      Nt(n, w.text, S, M + m / 2, c, {
        strikethrough: w.hidden,
        textAlign: l.textAlign(w.textAlign)
      });
    }, v = this.isHorizontal(), y = this._computeTitleHeight();
    v ? f = {
      x: K(o, this.left + h, this.right - s[0]),
      y: this.top + h + y,
      line: 0
    } : f = {
      x: this.left + h,
      y: K(o, this.top + y + h, this.bottom - e[0].height),
      line: 0
    }, Mo(this.ctx, t.textDirection);
    const x = m + h;
    this.legendItems.forEach((S, M) => {
      n.strokeStyle = S.fontColor, n.fillStyle = S.fontColor;
      const w = n.measureText(S.text).width, k = l.textAlign(S.textAlign || (S.textAlign = r.textAlign)), A = g + u + w;
      let C = f.x, T = f.y;
      l.setWidth(this.width), v ? M > 0 && C + A + h > this.right && (T = f.y += x, f.line++, C = f.x = K(o, this.left + h, this.right - s[f.line])) : M > 0 && T + x > this.bottom && (C = f.x = C + e[f.line].width + h, f.line++, T = f.y = K(o, this.top + y + h, this.bottom - e[f.line].height));
      const Y = l.x(C);
      if (b(Y, T, S), C = da(k, C + g + u, v ? C + A : this.right, t.rtl), _(l.x(C), T, S), v)
        f.x += A + h;
      else if (typeof S.text != "string") {
        const tt = c.lineHeight;
        f.y += Zo(S, tt) + h;
      } else
        f.y += x;
    }), wo(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, e = t.title, s = V(e.font), n = Z(e.padding);
    if (!e.display)
      return;
    const o = Xt(t.rtl, this.left, this.width), r = this.ctx, a = e.position, l = s.size / 2, c = n.top + l;
    let h, d = this.left, u = this.width;
    if (this.isHorizontal())
      u = Math.max(...this.lineWidths), h = this.top + c, d = K(t.align, d, this.right - u);
    else {
      const g = this.columnSizes.reduce((p, m) => Math.max(p, m.height), 0);
      h = c + K(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const f = K(a, d, d + u);
    r.textAlign = o.textAlign(is(a)), r.textBaseline = "middle", r.strokeStyle = e.color, r.fillStyle = e.color, r.font = s.string, Nt(r, e.text, f, h, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, e = V(t.font), s = Z(t.padding);
    return t.display ? e.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, e) {
    let s, n, o;
    if (ut(t, this.left, this.right) && ut(e, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (n = o[s], ut(t, n.left, n.left + n.width) && ut(e, n.top, n.top + n.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const e = this.options;
    if (!nd(t.type, e))
      return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, o = td(n, s);
      n && !o && I(e.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = s, s && !o && I(e.onHover, [
        t,
        s,
        this
      ], this);
    } else s && I(e.onClick, [
      t,
      s,
      this
    ], this);
  }
}
function ed(i, t, e, s, n) {
  const o = id(s, i, t, e), r = sd(n, s, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: r
  };
}
function id(i, t, e, s) {
  let n = i.text;
  return n && typeof n != "string" && (n = n.reduce((o, r) => o.length > r.length ? o : r)), t + e.size / 2 + s.measureText(n).width;
}
function sd(i, t, e) {
  let s = i;
  return typeof t.text != "string" && (s = Zo(t, e)), s;
}
function Zo(i, t) {
  const e = i.text ? i.text.length : 0;
  return t * e;
}
function nd(i, t) {
  return !!((i === "mousemove" || i === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (i === "click" || i === "mouseup"));
}
var od = {
  id: "legend",
  _element: On,
  start(i, t, e) {
    const s = i.legend = new On({
      ctx: i.ctx,
      options: e,
      chart: i
    });
    G.configure(i, s, e), G.addBox(i, s);
  },
  stop(i) {
    G.removeBox(i, i.legend), delete i.legend;
  },
  beforeUpdate(i, t, e) {
    const s = i.legend;
    G.configure(i, s, e), s.options = e;
  },
  afterUpdate(i) {
    const t = i.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(i, t) {
    t.replay || i.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(i, t, e) {
      const s = t.datasetIndex, n = e.chart;
      n.isDatasetVisible(s) ? (n.hide(s), t.hidden = !0) : (n.show(s), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (i) => i.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(i) {
        const t = i.data.datasets, { labels: { usePointStyle: e, pointStyle: s, textAlign: n, color: o, useBorderRadius: r, borderRadius: a } } = i.legend.options;
        return i._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(e ? 0 : void 0), h = Z(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (h.width + h.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: s || c.pointStyle,
            rotation: c.rotation,
            textAlign: n || c.textAlign,
            borderRadius: r && (a || c.borderRadius),
            datasetIndex: l.index
          };
        }, this);
      }
    },
    title: {
      color: (i) => i.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (i) => !i.startsWith("on"),
    labels: {
      _scriptable: (i) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(i)
    }
  }
};
class us extends pt {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e) {
    const s = this.options;
    if (this.left = 0, this.top = 0, !s.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = e;
    const n = $(s.text) ? s.text.length : 1;
    this._padding = Z(s.padding);
    const o = n * V(s.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: e, left: s, bottom: n, right: o, options: r } = this, a = r.align;
    let l = 0, c, h, d;
    return this.isHorizontal() ? (h = K(a, s, o), d = e + t, c = o - s) : (r.position === "left" ? (h = s + t, d = K(a, n, e), l = E * -0.5) : (h = o - t, d = K(a, e, n), l = E * 0.5), c = n - e), {
      titleX: h,
      titleY: d,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, e = this.options;
    if (!e.display)
      return;
    const s = V(e.font), o = s.lineHeight / 2 + this._padding.top, { titleX: r, titleY: a, maxWidth: l, rotation: c } = this._drawArgs(o);
    Nt(t, e.text, 0, 0, s, {
      color: e.color,
      maxWidth: l,
      rotation: c,
      textAlign: is(e.align),
      textBaseline: "middle",
      translation: [
        r,
        a
      ]
    });
  }
}
function rd(i, t) {
  const e = new us({
    ctx: i.ctx,
    options: t,
    chart: i
  });
  G.configure(i, e, t), G.addBox(i, e), i.titleBlock = e;
}
var ad = {
  id: "title",
  _element: us,
  start(i, t, e) {
    rd(i, e);
  },
  stop(i) {
    const t = i.titleBlock;
    G.removeBox(i, t), delete i.titleBlock;
  },
  beforeUpdate(i, t, e) {
    const s = i.titleBlock;
    G.configure(i, s, e), s.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const He = /* @__PURE__ */ new WeakMap();
var ld = {
  id: "subtitle",
  start(i, t, e) {
    const s = new us({
      ctx: i.ctx,
      options: e,
      chart: i
    });
    G.configure(i, s, e), G.addBox(i, s), He.set(i, s);
  },
  stop(i) {
    G.removeBox(i, He.get(i)), He.delete(i);
  },
  beforeUpdate(i, t, e) {
    const s = He.get(i);
    G.configure(i, s, e), s.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "normal"
    },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const he = {
  average(i) {
    if (!i.length)
      return !1;
    let t, e, s = /* @__PURE__ */ new Set(), n = 0, o = 0;
    for (t = 0, e = i.length; t < e; ++t) {
      const a = i[t].element;
      if (a && a.hasValue()) {
        const l = a.tooltipPosition();
        s.add(l.x), n += l.y, ++o;
      }
    }
    return o === 0 || s.size === 0 ? !1 : {
      x: [
        ...s
      ].reduce((a, l) => a + l) / s.size,
      y: n / o
    };
  },
  nearest(i, t) {
    if (!i.length)
      return !1;
    let e = t.x, s = t.y, n = Number.POSITIVE_INFINITY, o, r, a;
    for (o = 0, r = i.length; o < r; ++o) {
      const l = i[o].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), h = Ri(t, c);
        h < n && (n = h, a = l);
      }
    }
    if (a) {
      const l = a.tooltipPosition();
      e = l.x, s = l.y;
    }
    return {
      x: e,
      y: s
    };
  }
};
function ot(i, t) {
  return t && ($(t) ? Array.prototype.push.apply(i, t) : i.push(t)), i;
}
function ht(i) {
  return (typeof i == "string" || i instanceof String) && i.indexOf(`
`) > -1 ? i.split(`
`) : i;
}
function cd(i, t) {
  const { element: e, datasetIndex: s, index: n } = t, o = i.getDatasetMeta(s).controller, { label: r, value: a } = o.getLabelAndValue(n);
  return {
    chart: i,
    label: r,
    parsed: o.getParsed(n),
    raw: i.data.datasets[s].data[n],
    formattedValue: a,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: s,
    element: e
  };
}
function Tn(i, t) {
  const e = i.chart.ctx, { body: s, footer: n, title: o } = i, { boxWidth: r, boxHeight: a } = t, l = V(t.bodyFont), c = V(t.titleFont), h = V(t.footerFont), d = o.length, u = n.length, f = s.length, g = Z(t.padding);
  let p = g.height, m = 0, b = s.reduce((y, x) => y + x.before.length + x.lines.length + x.after.length, 0);
  if (b += i.beforeBody.length + i.afterBody.length, d && (p += d * c.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom), b) {
    const y = t.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight;
    p += f * y + (b - f) * l.lineHeight + (b - 1) * t.bodySpacing;
  }
  u && (p += t.footerMarginTop + u * h.lineHeight + (u - 1) * t.footerSpacing);
  let _ = 0;
  const v = function(y) {
    m = Math.max(m, e.measureText(y).width + _);
  };
  return e.save(), e.font = c.string, L(i.title, v), e.font = l.string, L(i.beforeBody.concat(i.afterBody), v), _ = t.displayColors ? r + 2 + t.boxPadding : 0, L(s, (y) => {
    L(y.before, v), L(y.lines, v), L(y.after, v);
  }), _ = 0, e.font = h.string, L(i.footer, v), e.restore(), m += g.width, {
    width: m,
    height: p
  };
}
function hd(i, t) {
  const { y: e, height: s } = t;
  return e < s / 2 ? "top" : e > i.height - s / 2 ? "bottom" : "center";
}
function dd(i, t, e, s) {
  const { x: n, width: o } = s, r = e.caretSize + e.caretPadding;
  if (i === "left" && n + o + r > t.width || i === "right" && n - o - r < 0)
    return !0;
}
function ud(i, t, e, s) {
  const { x: n, width: o } = e, { width: r, chartArea: { left: a, right: l } } = i;
  let c = "center";
  return s === "center" ? c = n <= (a + l) / 2 ? "left" : "right" : n <= o / 2 ? c = "left" : n >= r - o / 2 && (c = "right"), dd(c, i, t, e) && (c = "center"), c;
}
function En(i, t, e) {
  const s = e.yAlign || t.yAlign || hd(i, e);
  return {
    xAlign: e.xAlign || t.xAlign || ud(i, t, e, s),
    yAlign: s
  };
}
function fd(i, t) {
  let { x: e, width: s } = i;
  return t === "right" ? e -= s : t === "center" && (e -= s / 2), e;
}
function gd(i, t, e) {
  let { y: s, height: n } = i;
  return t === "top" ? s += e : t === "bottom" ? s -= n + e : s -= n / 2, s;
}
function Ln(i, t, e, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: r } = i, { xAlign: a, yAlign: l } = e, c = n + o, { topLeft: h, topRight: d, bottomLeft: u, bottomRight: f } = It(r);
  let g = fd(t, a);
  const p = gd(t, l, c);
  return l === "center" ? a === "left" ? g += c : a === "right" && (g -= c) : a === "left" ? g -= Math.max(h, u) + n : a === "right" && (g += Math.max(d, f) + n), {
    x: U(g, 0, s.width - t.width),
    y: U(p, 0, s.height - t.height)
  };
}
function We(i, t, e) {
  const s = Z(e.padding);
  return t === "center" ? i.x + i.width / 2 : t === "right" ? i.x + i.width - s.right : i.x + s.left;
}
function Rn(i) {
  return ot([], ht(i));
}
function pd(i, t, e) {
  return Mt(i, {
    tooltip: t,
    tooltipItems: e,
    type: "tooltip"
  });
}
function In(i, t) {
  const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return e ? i.override(e) : i;
}
const Jo = {
  beforeTitle: lt,
  title(i) {
    if (i.length > 0) {
      const t = i[0], e = t.chart.data.labels, s = e ? e.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (s > 0 && t.dataIndex < s)
        return e[t.dataIndex];
    }
    return "";
  },
  afterTitle: lt,
  beforeBody: lt,
  beforeLabel: lt,
  label(i) {
    if (this && this.options && this.options.mode === "dataset")
      return i.label + ": " + i.formattedValue || i.formattedValue;
    let t = i.dataset.label || "";
    t && (t += ": ");
    const e = i.formattedValue;
    return D(e) || (t += e), t;
  },
  labelColor(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      borderColor: e.borderColor,
      backgroundColor: e.backgroundColor,
      borderWidth: e.borderWidth,
      borderDash: e.borderDash,
      borderDashOffset: e.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      pointStyle: e.pointStyle,
      rotation: e.rotation
    };
  },
  afterLabel: lt,
  afterBody: lt,
  beforeFooter: lt,
  footer: lt,
  afterFooter: lt
};
function J(i, t, e, s) {
  const n = i[t].call(e, s);
  return typeof n > "u" ? Jo[t].call(e, s) : n;
}
class $n extends pt {
  static positioners = he;
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const e = this.chart, s = this.options.setContext(this.getContext()), n = s.enabled && e.options.animation && s.animations, o = new Do(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = pd(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, e) {
    const { callbacks: s } = e, n = J(s, "beforeTitle", this, t), o = J(s, "title", this, t), r = J(s, "afterTitle", this, t);
    let a = [];
    return a = ot(a, ht(n)), a = ot(a, ht(o)), a = ot(a, ht(r)), a;
  }
  getBeforeBody(t, e) {
    return Rn(J(e.callbacks, "beforeBody", this, t));
  }
  getBody(t, e) {
    const { callbacks: s } = e, n = [];
    return L(t, (o) => {
      const r = {
        before: [],
        lines: [],
        after: []
      }, a = In(s, o);
      ot(r.before, ht(J(a, "beforeLabel", this, o))), ot(r.lines, J(a, "label", this, o)), ot(r.after, ht(J(a, "afterLabel", this, o))), n.push(r);
    }), n;
  }
  getAfterBody(t, e) {
    return Rn(J(e.callbacks, "afterBody", this, t));
  }
  getFooter(t, e) {
    const { callbacks: s } = e, n = J(s, "beforeFooter", this, t), o = J(s, "footer", this, t), r = J(s, "afterFooter", this, t);
    let a = [];
    return a = ot(a, ht(n)), a = ot(a, ht(o)), a = ot(a, ht(r)), a;
  }
  _createItems(t) {
    const e = this._active, s = this.chart.data, n = [], o = [], r = [];
    let a = [], l, c;
    for (l = 0, c = e.length; l < c; ++l)
      a.push(cd(this.chart, e[l]));
    return t.filter && (a = a.filter((h, d, u) => t.filter(h, d, u, s))), t.itemSort && (a = a.sort((h, d) => t.itemSort(h, d, s))), L(a, (h) => {
      const d = In(t.callbacks, h);
      n.push(J(d, "labelColor", this, h)), o.push(J(d, "labelPointStyle", this, h)), r.push(J(d, "labelTextColor", this, h));
    }), this.labelColors = n, this.labelPointStyles = o, this.labelTextColors = r, this.dataPoints = a, a;
  }
  update(t, e) {
    const s = this.options.setContext(this.getContext()), n = this._active;
    let o, r = [];
    if (!n.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const a = he[s.position].call(this, n, this._eventPosition);
      r = this._createItems(s), this.title = this.getTitle(r, s), this.beforeBody = this.getBeforeBody(r, s), this.body = this.getBody(r, s), this.afterBody = this.getAfterBody(r, s), this.footer = this.getFooter(r, s);
      const l = this._size = Tn(this, s), c = Object.assign({}, a, l), h = En(this.chart, s, c), d = Ln(s, c, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, o = {
        opacity: 1,
        x: d.x,
        y: d.y,
        width: l.width,
        height: l.height,
        caretX: a.x,
        caretY: a.y
      };
    }
    this._tooltipItems = r, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && s.external && s.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: e
    });
  }
  drawCaret(t, e, s, n) {
    const o = this.getCaretPosition(t, s, n);
    e.lineTo(o.x1, o.y1), e.lineTo(o.x2, o.y2), e.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, e, s) {
    const { xAlign: n, yAlign: o } = this, { caretSize: r, cornerRadius: a } = s, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: d } = It(a), { x: u, y: f } = t, { width: g, height: p } = e;
    let m, b, _, v, y, x;
    return o === "center" ? (y = f + p / 2, n === "left" ? (m = u, b = m - r, v = y + r, x = y - r) : (m = u + g, b = m + r, v = y - r, x = y + r), _ = m) : (n === "left" ? b = u + Math.max(l, h) + r : n === "right" ? b = u + g - Math.max(c, d) - r : b = this.caretX, o === "top" ? (v = f, y = v - r, m = b - r, _ = b + r) : (v = f + p, y = v + r, m = b + r, _ = b - r), x = v), {
      x1: m,
      x2: b,
      x3: _,
      y1: v,
      y2: y,
      y3: x
    };
  }
  drawTitle(t, e, s) {
    const n = this.title, o = n.length;
    let r, a, l;
    if (o) {
      const c = Xt(s.rtl, this.x, this.width);
      for (t.x = We(this, s.titleAlign, s), e.textAlign = c.textAlign(s.titleAlign), e.textBaseline = "middle", r = V(s.titleFont), a = s.titleSpacing, e.fillStyle = s.titleColor, e.font = r.string, l = 0; l < o; ++l)
        e.fillText(n[l], c.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + a, l + 1 === o && (t.y += s.titleMarginBottom - a);
    }
  }
  _drawColorBox(t, e, s, n, o) {
    const r = this.labelColors[s], a = this.labelPointStyles[s], { boxHeight: l, boxWidth: c } = o, h = V(o.bodyFont), d = We(this, "left", o), u = n.x(d), f = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, g = e.y + f;
    if (o.usePointStyle) {
      const p = {
        radius: Math.min(c, l) / 2,
        pointStyle: a.pointStyle,
        rotation: a.rotation,
        borderWidth: 1
      }, m = n.leftForLtr(u, c) + c / 2, b = g + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, $i(t, p, m, b), t.strokeStyle = r.borderColor, t.fillStyle = r.backgroundColor, $i(t, p, m, b);
    } else {
      t.lineWidth = O(r.borderWidth) ? Math.max(...Object.values(r.borderWidth)) : r.borderWidth || 1, t.strokeStyle = r.borderColor, t.setLineDash(r.borderDash || []), t.lineDashOffset = r.borderDashOffset || 0;
      const p = n.leftForLtr(u, c), m = n.leftForLtr(n.xPlus(u, 1), c - 2), b = It(r.borderRadius);
      Object.values(b).some((_) => _ !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Me(t, {
        x: p,
        y: g,
        w: c,
        h: l,
        radius: b
      }), t.fill(), t.stroke(), t.fillStyle = r.backgroundColor, t.beginPath(), Me(t, {
        x: m,
        y: g + 1,
        w: c - 2,
        h: l - 2,
        radius: b
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(p, g, c, l), t.strokeRect(p, g, c, l), t.fillStyle = r.backgroundColor, t.fillRect(m, g + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, e, s) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: r, displayColors: a, boxHeight: l, boxWidth: c, boxPadding: h } = s, d = V(s.bodyFont);
    let u = d.lineHeight, f = 0;
    const g = Xt(s.rtl, this.x, this.width), p = function(w) {
      e.fillText(w, g.x(t.x + f), t.y + u / 2), t.y += u + o;
    }, m = g.textAlign(r);
    let b, _, v, y, x, S, M;
    for (e.textAlign = r, e.textBaseline = "middle", e.font = d.string, t.x = We(this, m, s), e.fillStyle = s.bodyColor, L(this.beforeBody, p), f = a && m !== "right" ? r === "center" ? c / 2 + h : c + 2 + h : 0, y = 0, S = n.length; y < S; ++y) {
      for (b = n[y], _ = this.labelTextColors[y], e.fillStyle = _, L(b.before, p), v = b.lines, a && v.length && (this._drawColorBox(e, t, y, g, s), u = Math.max(d.lineHeight, l)), x = 0, M = v.length; x < M; ++x)
        p(v[x]), u = d.lineHeight;
      L(b.after, p);
    }
    f = 0, u = d.lineHeight, L(this.afterBody, p), t.y -= o;
  }
  drawFooter(t, e, s) {
    const n = this.footer, o = n.length;
    let r, a;
    if (o) {
      const l = Xt(s.rtl, this.x, this.width);
      for (t.x = We(this, s.footerAlign, s), t.y += s.footerMarginTop, e.textAlign = l.textAlign(s.footerAlign), e.textBaseline = "middle", r = V(s.footerFont), e.fillStyle = s.footerColor, e.font = r.string, a = 0; a < o; ++a)
        e.fillText(n[a], l.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, e, s, n) {
    const { xAlign: o, yAlign: r } = this, { x: a, y: l } = t, { width: c, height: h } = s, { topLeft: d, topRight: u, bottomLeft: f, bottomRight: g } = It(n.cornerRadius);
    e.fillStyle = n.backgroundColor, e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.beginPath(), e.moveTo(a + d, l), r === "top" && this.drawCaret(t, e, s, n), e.lineTo(a + c - u, l), e.quadraticCurveTo(a + c, l, a + c, l + u), r === "center" && o === "right" && this.drawCaret(t, e, s, n), e.lineTo(a + c, l + h - g), e.quadraticCurveTo(a + c, l + h, a + c - g, l + h), r === "bottom" && this.drawCaret(t, e, s, n), e.lineTo(a + f, l + h), e.quadraticCurveTo(a, l + h, a, l + h - f), r === "center" && o === "left" && this.drawCaret(t, e, s, n), e.lineTo(a, l + d), e.quadraticCurveTo(a, l, a + d, l), e.closePath(), e.fill(), n.borderWidth > 0 && e.stroke();
  }
  _updateAnimationTarget(t) {
    const e = this.chart, s = this.$animations, n = s && s.x, o = s && s.y;
    if (n || o) {
      const r = he[t.position].call(this, this._active, this._eventPosition);
      if (!r)
        return;
      const a = this._size = Tn(this, t), l = Object.assign({}, r, this._size), c = En(e, t, l), h = Ln(t, l, c, e);
      (n._to !== h.x || o._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = a.width, this.height = a.height, this.caretX = r.x, this.caretY = r.y, this._resolveAnimations().update(this, h));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const e = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s)
      return;
    this._updateAnimationTarget(e);
    const n = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    s = Math.abs(s) < 1e-3 ? 0 : s;
    const r = Z(e.padding), a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    e.enabled && a && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, n, e), Mo(t, e.textDirection), o.y += r.top, this.drawTitle(o, t, e), this.drawBody(o, t, e), this.drawFooter(o, t, e), wo(t, e.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, e) {
    const s = this._active, n = t.map(({ datasetIndex: a, index: l }) => {
      const c = this.chart.getDatasetMeta(a);
      if (!c)
        throw new Error("Cannot find a dataset at index " + a);
      return {
        datasetIndex: a,
        element: c.data[l],
        index: l
      };
    }), o = !Ze(s, n), r = this._positionChanged(n, e);
    (o || r) && (this._active = n, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, e, s = !0) {
    if (e && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], r = this._getActiveElements(t, o, e, s), a = this._positionChanged(r, t), l = e || !Ze(r, o) || a;
    return l && (this._active = r, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, e))), l;
  }
  _getActiveElements(t, e, s, n) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return e.filter((a) => this.chart.data.datasets[a.datasetIndex] && this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index) !== void 0);
    const r = this.chart.getElementsAtEventForMode(t, o.mode, o, s);
    return o.reverse && r.reverse(), r;
  }
  _positionChanged(t, e) {
    const { caretX: s, caretY: n, options: o } = this, r = he[o.position].call(this, t, e);
    return r !== !1 && (s !== r.x || n !== r.y);
  }
}
var md = {
  id: "tooltip",
  _element: $n,
  positioners: he,
  afterInit(i, t, e) {
    e && (i.tooltip = new $n({
      chart: i,
      options: e
    }));
  },
  beforeUpdate(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  reset(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  afterDraw(i) {
    const t = i.tooltip;
    if (t && t._willRender()) {
      const e = {
        tooltip: t
      };
      if (i.notifyPlugins("beforeTooltipDraw", {
        ...e,
        cancelable: !0
      }) === !1)
        return;
      t.draw(i.ctx), i.notifyPlugins("afterTooltipDraw", e);
    }
  },
  afterEvent(i, t) {
    if (i.tooltip) {
      const e = t.replay;
      i.tooltip.handleEvent(t.event, e, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (i, t) => t.bodyFont.size,
    boxWidth: (i, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: Jo
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (i) => i !== "filter" && i !== "itemSort" && i !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
}, bd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: Dh,
  Decimation: Lh,
  Filler: Qh,
  Legend: od,
  SubTitle: ld,
  Title: ad,
  Tooltip: md
});
const _d = (i, t, e, s) => (typeof t == "string" ? (e = i.push(t) - 1, s.unshift({
  index: e,
  label: t
})) : isNaN(t) && (e = null), e);
function xd(i, t, e, s) {
  const n = i.indexOf(t);
  if (n === -1)
    return _d(i, t, e, s);
  const o = i.lastIndexOf(t);
  return n !== o ? e : n;
}
const yd = (i, t) => i === null ? null : U(Math.round(i), 0, t);
function Fn(i) {
  const t = this.getLabels();
  return i >= 0 && i < t.length ? t[i] : i;
}
class vd extends Ht {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Fn
    }
  };
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const e = this._addedLabels;
    if (e.length) {
      const s = this.getLabels();
      for (const { index: n, label: o } of e)
        s[n] === o && s.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, e) {
    if (D(t))
      return null;
    const s = this.getLabels();
    return e = isFinite(e) && s[e] === t ? e : xd(s, t, P(e, t), this._addedLabels), yd(e, s.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let { min: s, max: n } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (s = 0), e || (n = this.getLabels().length - 1)), this.min = s, this.max = n;
  }
  buildTicks() {
    const t = this.min, e = this.max, s = this.options.offset, n = [];
    let o = this.getLabels();
    o = t === 0 && e === o.length - 1 ? o : o.slice(t, e + 1), this._valueRange = Math.max(o.length - (s ? 0 : 1), 1), this._startValue = this.min - (s ? 0.5 : 0);
    for (let r = t; r <= e; r++)
      n.push({
        value: r
      });
    return n;
  }
  getLabelForValue(t) {
    return Fn.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
function Sd(i, t) {
  const e = [], { bounds: n, step: o, min: r, max: a, precision: l, count: c, maxTicks: h, maxDigits: d, includeBounds: u } = i, f = o || 1, g = h - 1, { min: p, max: m } = t, b = !D(r), _ = !D(a), v = !D(c), y = (m - p) / (d + 1);
  let x = Os((m - p) / g / f) * f, S, M, w, k;
  if (x < 1e-14 && !b && !_)
    return [
      {
        value: p
      },
      {
        value: m
      }
    ];
  k = Math.ceil(m / x) - Math.floor(p / x), k > g && (x = Os(k * x / g / f) * f), D(l) || (S = Math.pow(10, l), x = Math.ceil(x * S) / S), n === "ticks" ? (M = Math.floor(p / x) * x, w = Math.ceil(m / x) * x) : (M = p, w = m), b && _ && o && na((a - r) / o, x / 1e3) ? (k = Math.round(Math.min((a - r) / x, h)), x = (a - r) / k, M = r, w = a) : v ? (M = b ? r : M, w = _ ? a : w, k = c - 1, x = (w - M) / k) : (k = (w - M) / x, fe(k, Math.round(k), x / 1e3) ? k = Math.round(k) : k = Math.ceil(k));
  const A = Math.max(Ts(x), Ts(M));
  S = Math.pow(10, D(l) ? A : l), M = Math.round(M * S) / S, w = Math.round(w * S) / S;
  let C = 0;
  for (b && (u && M !== r ? (e.push({
    value: r
  }), M < r && C++, fe(Math.round((M + C * x) * S) / S, r, zn(r, y, i)) && C++) : M < r && C++); C < k; ++C) {
    const T = Math.round((M + C * x) * S) / S;
    if (_ && T > a)
      break;
    e.push({
      value: T
    });
  }
  return _ && u && w !== a ? e.length && fe(e[e.length - 1].value, a, zn(a, y, i)) ? e[e.length - 1].value = a : e.push({
    value: a
  }) : (!_ || w === a) && e.push({
    value: w
  }), e;
}
function zn(i, t, { horizontal: e, minRotation: s }) {
  const n = nt(s), o = (e ? Math.sin(n) : Math.cos(n)) || 1e-3, r = 0.75 * t * ("" + i).length;
  return Math.min(t / o, r);
}
class ni extends Ht {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    return D(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: e, maxDefined: s } = this.getUserBounds();
    let { min: n, max: o } = this;
    const r = (l) => n = e ? n : l, a = (l) => o = s ? o : l;
    if (t) {
      const l = at(n), c = at(o);
      l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && r(0);
    }
    if (n === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      a(o + l), t || r(n - l);
    }
    this.min = n, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: e, stepSize: s } = t, n;
    return s ? (n = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), e = e || 11), e && (n = Math.min(e, n)), n;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, e = t.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const n = {
      maxTicks: s,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: e.precision,
      step: e.stepSize,
      count: e.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: e.minRotation || 0,
      includeBounds: e.includeBounds !== !1
    }, o = this._range || this, r = Sd(n, o);
    return t.bounds === "ticks" && oo(r, this, "value"), t.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r;
  }
  configure() {
    const t = this.ticks;
    let e = this.min, s = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const n = (s - e) / Math.max(t.length - 1, 1) / 2;
      e -= n, s += n;
    }
    this._startValue = e, this._endValue = s, this._valueRange = s - e;
  }
  getLabelForValue(t) {
    return Ce(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Md extends ni {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: li.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = N(t) ? t : 0, this.max = N(e) ? e : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), e = t ? this.width : this.height, s = nt(this.options.ticks.minRotation), n = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, o.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const ke = (i) => Math.floor(_t(i)), Tt = (i, t) => Math.pow(10, ke(i) + t);
function Bn(i) {
  return i / Math.pow(10, ke(i)) === 1;
}
function Nn(i, t, e) {
  const s = Math.pow(10, e), n = Math.floor(i / s);
  return Math.ceil(t / s) - n;
}
function wd(i, t) {
  const e = t - i;
  let s = ke(e);
  for (; Nn(i, t, s) > 10; )
    s++;
  for (; Nn(i, t, s) < 10; )
    s--;
  return Math.min(s, ke(i));
}
function kd(i, { min: t, max: e }) {
  t = et(i.min, t);
  const s = [], n = ke(t);
  let o = wd(t, e), r = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
  const a = Math.pow(10, o), l = n > o ? Math.pow(10, n) : 0, c = Math.round((t - l) * r) / r, h = Math.floor((t - l) / a / 10) * a * 10;
  let d = Math.floor((c - h) / Math.pow(10, o)), u = et(i.min, Math.round((l + h + d * Math.pow(10, o)) * r) / r);
  for (; u < e; )
    s.push({
      value: u,
      major: Bn(u),
      significand: d
    }), d >= 10 ? d = d < 15 ? 15 : 20 : d++, d >= 20 && (o++, d = 2, r = o >= 0 ? 1 : r), u = Math.round((l + h + d * Math.pow(10, o)) * r) / r;
  const f = et(i.max, u);
  return s.push({
    value: f,
    major: Bn(f),
    significand: d
  }), s;
}
class Pd extends Ht {
  static id = "logarithmic";
  static defaults = {
    ticks: {
      callback: li.formatters.logarithmic,
      major: {
        enabled: !0
      }
    }
  };
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    const s = ni.prototype.parse.apply(this, [
      t,
      e
    ]);
    if (s === 0) {
      this._zero = !0;
      return;
    }
    return N(s) && s > 0 ? s : null;
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = N(t) ? Math.max(0, t) : null, this.max = N(e) ? Math.max(0, e) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !N(this._userMin) && (this.min = t === Tt(this.min, 0) ? Tt(this.min, -1) : Tt(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let s = this.min, n = this.max;
    const o = (a) => s = t ? s : a, r = (a) => n = e ? n : a;
    s === n && (s <= 0 ? (o(1), r(10)) : (o(Tt(s, -1)), r(Tt(n, 1)))), s <= 0 && o(Tt(n, -1)), n <= 0 && r(Tt(s, 1)), this.min = s, this.max = n;
  }
  buildTicks() {
    const t = this.options, e = {
      min: this._userMin,
      max: this._userMax
    }, s = kd(e, this);
    return t.bounds === "ticks" && oo(s, this, "value"), t.reverse ? (s.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), s;
  }
  getLabelForValue(t) {
    return t === void 0 ? "0" : Ce(t, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const t = this.min;
    super.configure(), this._startValue = _t(t), this._valueRange = _t(this.max) - _t(t);
  }
  getPixelForValue(t) {
    return (t === void 0 || t === 0) && (t = this.min), t === null || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (_t(t) - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    const e = this.getDecimalForPixel(t);
    return Math.pow(10, this._startValue + e * this._valueRange);
  }
}
function Wi(i) {
  const t = i.ticks;
  if (t.display && i.display) {
    const e = Z(t.backdropPadding);
    return P(t.font && t.font.size, B.font.size) + e.height;
  }
  return 0;
}
function Ad(i, t, e) {
  return e = $(e) ? e : [
    e
  ], {
    w: va(i, t.string, e),
    h: e.length * t.lineHeight
  };
}
function Hn(i, t, e, s, n) {
  return i === s || i === n ? {
    start: t - e / 2,
    end: t + e / 2
  } : i < s || i > n ? {
    start: t - e,
    end: t
  } : {
    start: t,
    end: t + e
  };
}
function Cd(i) {
  const t = {
    l: i.left + i._padding.left,
    r: i.right - i._padding.right,
    t: i.top + i._padding.top,
    b: i.bottom - i._padding.bottom
  }, e = Object.assign({}, t), s = [], n = [], o = i._pointLabels.length, r = i.options.pointLabels, a = r.centerPointLabels ? E / o : 0;
  for (let l = 0; l < o; l++) {
    const c = r.setContext(i.getPointLabelContext(l));
    n[l] = c.padding;
    const h = i.getPointPosition(l, i.drawingArea + n[l], a), d = V(c.font), u = Ad(i.ctx, d, i._pointLabels[l]);
    s[l] = u;
    const f = q(i.getIndexAngle(l) + a), g = Math.round(ts(f)), p = Hn(g, h.x, u.w, 0, 180), m = Hn(g, h.y, u.h, 90, 270);
    Dd(e, t, f, p, m);
  }
  i.setCenterPoint(t.l - e.l, e.r - t.r, t.t - e.t, e.b - t.b), i._pointLabelItems = Ed(i, s, n);
}
function Dd(i, t, e, s, n) {
  const o = Math.abs(Math.sin(e)), r = Math.abs(Math.cos(e));
  let a = 0, l = 0;
  s.start < t.l ? (a = (t.l - s.start) / o, i.l = Math.min(i.l, t.l - a)) : s.end > t.r && (a = (s.end - t.r) / o, i.r = Math.max(i.r, t.r + a)), n.start < t.t ? (l = (t.t - n.start) / r, i.t = Math.min(i.t, t.t - l)) : n.end > t.b && (l = (n.end - t.b) / r, i.b = Math.max(i.b, t.b + l));
}
function Od(i, t, e) {
  const s = i.drawingArea, { extra: n, additionalAngle: o, padding: r, size: a } = e, l = i.getPointPosition(t, s + n + r, o), c = Math.round(ts(q(l.angle + W))), h = Id(l.y, a.h, c), d = Ld(c), u = Rd(l.x, a.w, d);
  return {
    visible: !0,
    x: l.x,
    y: h,
    textAlign: d,
    left: u,
    top: h,
    right: u + a.w,
    bottom: h + a.h
  };
}
function Td(i, t) {
  if (!t)
    return !0;
  const { left: e, top: s, right: n, bottom: o } = i;
  return !(gt({
    x: e,
    y: s
  }, t) || gt({
    x: e,
    y: o
  }, t) || gt({
    x: n,
    y: s
  }, t) || gt({
    x: n,
    y: o
  }, t));
}
function Ed(i, t, e) {
  const s = [], n = i._pointLabels.length, o = i.options, { centerPointLabels: r, display: a } = o.pointLabels, l = {
    extra: Wi(o) / 2,
    additionalAngle: r ? E / n : 0
  };
  let c;
  for (let h = 0; h < n; h++) {
    l.padding = e[h], l.size = t[h];
    const d = Od(i, h, l);
    s.push(d), a === "auto" && (d.visible = Td(d, c), d.visible && (c = d));
  }
  return s;
}
function Ld(i) {
  return i === 0 || i === 180 ? "center" : i < 180 ? "left" : "right";
}
function Rd(i, t, e) {
  return e === "right" ? i -= t : e === "center" && (i -= t / 2), i;
}
function Id(i, t, e) {
  return e === 90 || e === 270 ? i -= t / 2 : (e > 270 || e < 90) && (i -= t), i;
}
function $d(i, t, e) {
  const { left: s, top: n, right: o, bottom: r } = e, { backdropColor: a } = t;
  if (!D(a)) {
    const l = It(t.borderRadius), c = Z(t.backdropPadding);
    i.fillStyle = a;
    const h = s - c.left, d = n - c.top, u = o - s + c.width, f = r - n + c.height;
    Object.values(l).some((g) => g !== 0) ? (i.beginPath(), Me(i, {
      x: h,
      y: d,
      w: u,
      h: f,
      radius: l
    }), i.fill()) : i.fillRect(h, d, u, f);
  }
}
function Fd(i, t) {
  const { ctx: e, options: { pointLabels: s } } = i;
  for (let n = t - 1; n >= 0; n--) {
    const o = i._pointLabelItems[n];
    if (!o.visible)
      continue;
    const r = s.setContext(i.getPointLabelContext(n));
    $d(e, r, o);
    const a = V(r.font), { x: l, y: c, textAlign: h } = o;
    Nt(e, i._pointLabels[n], l, c + a.lineHeight / 2, a, {
      color: r.color,
      textAlign: h,
      textBaseline: "middle"
    });
  }
}
function Qo(i, t, e, s) {
  const { ctx: n } = i;
  if (e)
    n.arc(i.xCenter, i.yCenter, t, 0, F);
  else {
    let o = i.getPointPosition(0, t);
    n.moveTo(o.x, o.y);
    for (let r = 1; r < s; r++)
      o = i.getPointPosition(r, t), n.lineTo(o.x, o.y);
  }
}
function zd(i, t, e, s, n) {
  const o = i.ctx, r = t.circular, { color: a, lineWidth: l } = t;
  !r && !s || !a || !l || e < 0 || (o.save(), o.strokeStyle = a, o.lineWidth = l, o.setLineDash(n.dash || []), o.lineDashOffset = n.dashOffset, o.beginPath(), Qo(i, e, r, s), o.closePath(), o.stroke(), o.restore());
}
function Bd(i, t, e) {
  return Mt(i, {
    label: e,
    index: t,
    type: "pointLabel"
  });
}
class Nd extends ni {
  static id = "radialLinear";
  static defaults = {
    display: !0,
    animate: !0,
    position: "chartArea",
    angleLines: {
      display: !0,
      lineWidth: 1,
      borderDash: [],
      borderDashOffset: 0
    },
    grid: {
      circular: !1
    },
    startAngle: 0,
    ticks: {
      showLabelBackdrop: !0,
      callback: li.formatters.numeric
    },
    pointLabels: {
      backdropColor: void 0,
      backdropPadding: 2,
      display: !0,
      font: {
        size: 10
      },
      callback(t) {
        return t;
      },
      padding: 5,
      centerPointLabels: !1
    }
  };
  static defaultRoutes = {
    "angleLines.color": "borderColor",
    "pointLabels.color": "color",
    "ticks.color": "color"
  };
  static descriptors = {
    angleLines: {
      _fallback: "grid"
    }
  };
  constructor(t) {
    super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const t = this._padding = Z(Wi(this.options) / 2), e = this.width = this.maxWidth - t.width, s = this.height = this.maxHeight - t.height;
    this.xCenter = Math.floor(this.left + e / 2 + t.left), this.yCenter = Math.floor(this.top + s / 2 + t.top), this.drawingArea = Math.floor(Math.min(e, s) / 2);
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!1);
    this.min = N(t) && !isNaN(t) ? t : 0, this.max = N(e) && !isNaN(e) ? e : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / Wi(this.options));
  }
  generateTickLabels(t) {
    ni.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((e, s) => {
      const n = I(this.options.pointLabels.callback, [
        e,
        s
      ], this);
      return n || n === 0 ? n : "";
    }).filter((e, s) => this.chart.getDataVisibility(s));
  }
  fit() {
    const t = this.options;
    t.display && t.pointLabels.display ? Cd(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(t, e, s, n) {
    this.xCenter += Math.floor((t - e) / 2), this.yCenter += Math.floor((s - n) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, e, s, n));
  }
  getIndexAngle(t) {
    const e = F / (this._pointLabels.length || 1), s = this.options.startAngle || 0;
    return q(t * e + nt(s));
  }
  getDistanceFromCenterForValue(t) {
    if (D(t))
      return NaN;
    const e = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
  }
  getValueForDistanceFromCenter(t) {
    if (D(t))
      return NaN;
    const e = t / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - e : this.min + e;
  }
  getPointLabelContext(t) {
    const e = this._pointLabels || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return Bd(this.getContext(), t, s);
    }
  }
  getPointPosition(t, e, s = 0) {
    const n = this.getIndexAngle(t) - W + s;
    return {
      x: Math.cos(n) * e + this.xCenter,
      y: Math.sin(n) * e + this.yCenter,
      angle: n
    };
  }
  getPointPositionForValue(t, e) {
    return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
  }
  getBasePosition(t) {
    return this.getPointPositionForValue(t || 0, this.getBaseValue());
  }
  getPointLabelPosition(t) {
    const { left: e, top: s, right: n, bottom: o } = this._pointLabelItems[t];
    return {
      left: e,
      top: s,
      right: n,
      bottom: o
    };
  }
  drawBackground() {
    const { backgroundColor: t, grid: { circular: e } } = this.options;
    if (t) {
      const s = this.ctx;
      s.save(), s.beginPath(), Qo(this, this.getDistanceFromCenterForValue(this._endValue), e, this._pointLabels.length), s.closePath(), s.fillStyle = t, s.fill(), s.restore();
    }
  }
  drawGrid() {
    const t = this.ctx, e = this.options, { angleLines: s, grid: n, border: o } = e, r = this._pointLabels.length;
    let a, l, c;
    if (e.pointLabels.display && Fd(this, r), n.display && this.ticks.forEach((h, d) => {
      if (d !== 0 || d === 0 && this.min < 0) {
        l = this.getDistanceFromCenterForValue(h.value);
        const u = this.getContext(d), f = n.setContext(u), g = o.setContext(u);
        zd(this, f, l, r, g);
      }
    }), s.display) {
      for (t.save(), a = r - 1; a >= 0; a--) {
        const h = s.setContext(this.getPointLabelContext(a)), { color: d, lineWidth: u } = h;
        !u || !d || (t.lineWidth = u, t.strokeStyle = d, t.setLineDash(h.borderDash), t.lineDashOffset = h.borderDashOffset, l = this.getDistanceFromCenterForValue(e.reverse ? this.min : this.max), c = this.getPointPosition(a, l), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(c.x, c.y), t.stroke());
      }
      t.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const t = this.ctx, e = this.options, s = e.ticks;
    if (!s.display)
      return;
    const n = this.getIndexAngle(0);
    let o, r;
    t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(n), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((a, l) => {
      if (l === 0 && this.min >= 0 && !e.reverse)
        return;
      const c = s.setContext(this.getContext(l)), h = V(c.font);
      if (o = this.getDistanceFromCenterForValue(this.ticks[l].value), c.showLabelBackdrop) {
        t.font = h.string, r = t.measureText(a.label).width, t.fillStyle = c.backdropColor;
        const d = Z(c.backdropPadding);
        t.fillRect(-r / 2 - d.left, -o - h.size / 2 - d.top, r + d.width, h.size + d.height);
      }
      Nt(t, a.label, 0, -o, h, {
        color: c.color,
        strokeColor: c.textStrokeColor,
        strokeWidth: c.textStrokeWidth
      });
    }), t.restore();
  }
  drawTitle() {
  }
}
const pi = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, Q = /* @__PURE__ */ Object.keys(pi);
function Wn(i, t) {
  return i - t;
}
function Vn(i, t) {
  if (D(t))
    return null;
  const e = i._adapter, { parser: s, round: n, isoWeekday: o } = i._parseOpts;
  let r = t;
  return typeof s == "function" && (r = s(r)), N(r) || (r = typeof s == "string" ? e.parse(r, s) : e.parse(r)), r === null ? null : (n && (r = n === "week" && (Gt(o) || o === !0) ? e.startOf(r, "isoWeek", o) : e.startOf(r, n)), +r);
}
function jn(i, t, e, s) {
  const n = Q.length;
  for (let o = Q.indexOf(i); o < n - 1; ++o) {
    const r = pi[Q[o]], a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
    if (r.common && Math.ceil((e - t) / (a * r.size)) <= s)
      return Q[o];
  }
  return Q[n - 1];
}
function Hd(i, t, e, s, n) {
  for (let o = Q.length - 1; o >= Q.indexOf(e); o--) {
    const r = Q[o];
    if (pi[r].common && i._adapter.diff(n, s, r) >= t - 1)
      return r;
  }
  return Q[e ? Q.indexOf(e) : 0];
}
function Wd(i) {
  for (let t = Q.indexOf(i) + 1, e = Q.length; t < e; ++t)
    if (pi[Q[t]].common)
      return Q[t];
}
function Un(i, t, e) {
  if (!e)
    i[t] = !0;
  else if (e.length) {
    const { lo: s, hi: n } = es(e, t), o = e[s] >= t ? e[s] : e[n];
    i[o] = !0;
  }
}
function Vd(i, t, e, s) {
  const n = i._adapter, o = +n.startOf(t[0].value, s), r = t[t.length - 1].value;
  let a, l;
  for (a = o; a <= r; a = +n.add(a, 1, s))
    l = e[a], l >= 0 && (t[l].major = !0);
  return t;
}
function Yn(i, t, e) {
  const s = [], n = {}, o = t.length;
  let r, a;
  for (r = 0; r < o; ++r)
    a = t[r], n[a] = r, s.push({
      value: a,
      major: !1
    });
  return o === 0 || !e ? s : Vd(i, s, n, e);
}
class Vi extends Ht {
  static id = "time";
  static defaults = {
    bounds: "data",
    adapters: {},
    time: {
      parser: !1,
      unit: !1,
      round: !1,
      isoWeekday: !1,
      minUnit: "millisecond",
      displayFormats: {}
    },
    ticks: {
      source: "auto",
      callback: !1,
      major: {
        enabled: !1
      }
    }
  };
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, e = {}) {
    const s = t.time || (t.time = {}), n = this._adapter = new jl._date(t.adapters.date);
    n.init(e), ue(s.displayFormats, n.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(t), this._normalized = e.normalized;
  }
  parse(t, e) {
    return t === void 0 ? null : Vn(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, e = this._adapter, s = t.time.unit || "day";
    let { min: n, max: o, minDefined: r, maxDefined: a } = this.getUserBounds();
    function l(c) {
      !r && !isNaN(c.min) && (n = Math.min(n, c.min)), !a && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!r || !a) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = N(n) && !isNaN(n) ? n : +e.startOf(Date.now(), s), o = N(o) && !isNaN(o) ? o : +e.endOf(Date.now(), s) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let e = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return t.length && (e = t[0], s = t[t.length - 1]), {
      min: e,
      max: s
    };
  }
  buildTicks() {
    const t = this.options, e = t.time, s = t.ticks, n = s.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && n.length && (this.min = this._userMin || n[0], this.max = this._userMax || n[n.length - 1]);
    const o = this.min, r = this.max, a = la(n, o, r);
    return this._unit = e.unit || (s.autoSkip ? jn(e.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Hd(this, a.length, e.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : Wd(this._unit), this.initOffsets(n), t.reverse && a.reverse(), Yn(this, a, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let e = 0, s = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - n : e = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? s = o : s = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const r = t.length < 3 ? 0.5 : 0.25;
    e = U(e, 0, r), s = U(s, 0, r), this._offsets = {
      start: e,
      end: s,
      factor: 1 / (e + 1 + s)
    };
  }
  _generate() {
    const t = this._adapter, e = this.min, s = this.max, n = this.options, o = n.time, r = o.unit || jn(o.minUnit, e, s, this._getLabelCapacity(e)), a = P(n.ticks.stepSize, 1), l = r === "week" ? o.isoWeekday : !1, c = Gt(l) || l === !0, h = {};
    let d = e, u, f;
    if (c && (d = +t.startOf(d, "isoWeek", l)), d = +t.startOf(d, c ? "day" : r), t.diff(s, e, r) > 1e5 * a)
      throw new Error(e + " and " + s + " are too far apart with stepSize of " + a + " " + r);
    const g = n.ticks.source === "data" && this.getDataTimestamps();
    for (u = d, f = 0; u < s; u = +t.add(u, a, r), f++)
      Un(h, u, g);
    return (u === s || n.bounds === "ticks" || f === 1) && Un(h, u, g), Object.keys(h).sort(Wn).map((p) => +p);
  }
  getLabelForValue(t) {
    const e = this._adapter, s = this.options.time;
    return s.tooltipFormat ? e.format(t, s.tooltipFormat) : e.format(t, s.displayFormats.datetime);
  }
  format(t, e) {
    const n = this.options.time.displayFormats, o = this._unit, r = e || n[o];
    return this._adapter.format(t, r);
  }
  _tickFormatFunction(t, e, s, n) {
    const o = this.options, r = o.ticks.callback;
    if (r)
      return I(r, [
        t,
        e,
        s
      ], this);
    const a = o.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && a[l], d = c && a[c], u = s[e], f = c && d && u && u.major;
    return this._adapter.format(t, n || (f ? d : h));
  }
  generateTickLabels(t) {
    let e, s, n;
    for (e = 0, s = t.length; e < s; ++e)
      n = t[e], n.label = this._tickFormatFunction(n.value, e, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const e = this._offsets, s = this.getDecimalForValue(t);
    return this.getPixelForDecimal((e.start + s) * e.factor);
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return this.min + s * (this.max - this.min);
  }
  _getLabelSize(t) {
    const e = this.options.ticks, s = this.ctx.measureText(t).width, n = nt(this.isHorizontal() ? e.maxRotation : e.minRotation), o = Math.cos(n), r = Math.sin(n), a = this._resolveTickFontOptions(0).size;
    return {
      w: s * o + a * r,
      h: s * r + a * o
    };
  }
  _getLabelCapacity(t) {
    const e = this.options.time, s = e.displayFormats, n = s[e.unit] || s.millisecond, o = this._tickFormatFunction(t, 0, Yn(this, [
      t
    ], this._majorUnit), n), r = this._getLabelSize(o), a = Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) - 1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], e, s;
    if (t.length)
      return t;
    const n = this.getMatchingVisibleMetas();
    if (this._normalized && n.length)
      return this._cache.data = n[0].controller.getAllParsedValues(this);
    for (e = 0, s = n.length; e < s; ++e)
      t = t.concat(n[e].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let e, s;
    if (t.length)
      return t;
    const n = this.getLabels();
    for (e = 0, s = n.length; e < s; ++e)
      t.push(Vn(this, n[e]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return lo(t.sort(Wn));
  }
}
function Ve(i, t, e) {
  let s = 0, n = i.length - 1, o, r, a, l;
  e ? (t >= i[s].pos && t <= i[n].pos && ({ lo: s, hi: n } = ft(i, "pos", t)), { pos: o, time: a } = i[s], { pos: r, time: l } = i[n]) : (t >= i[s].time && t <= i[n].time && ({ lo: s, hi: n } = ft(i, "time", t)), { time: o, pos: a } = i[s], { time: r, pos: l } = i[n]);
  const c = r - o;
  return c ? a + (l - a) * (t - o) / c : a;
}
class jd extends Vi {
  static id = "timeseries";
  static defaults = Vi.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
    this._minPos = Ve(e, this.min), this._tableRange = Ve(e, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: e, max: s } = this, n = [], o = [];
    let r, a, l, c, h;
    for (r = 0, a = t.length; r < a; ++r)
      c = t[r], c >= e && c <= s && n.push(c);
    if (n.length < 2)
      return [
        {
          time: e,
          pos: 0
        },
        {
          time: s,
          pos: 1
        }
      ];
    for (r = 0, a = n.length; r < a; ++r)
      h = n[r + 1], l = n[r - 1], c = n[r], Math.round((h + l) / 2) !== c && o.push({
        time: c,
        pos: r / (a - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, e = this.max;
    let s = super.getDataTimestamps();
    return (!s.includes(t) || !s.length) && s.splice(0, 0, t), (!s.includes(e) || s.length === 1) && s.push(e), s.sort((n, o) => n - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const e = this.getDataTimestamps(), s = this.getLabelTimestamps();
    return e.length && s.length ? t = this.normalize(e.concat(s)) : t = e.length ? e : s, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (Ve(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return Ve(this._table, s * this._tableRange + this._minPos, !0);
  }
}
var Ud = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: vd,
  LinearScale: Md,
  LogarithmicScale: Pd,
  RadialLinearScale: Nd,
  TimeScale: Vi,
  TimeSeriesScale: jd
});
const ou = [
  Vl,
  Sh,
  bd,
  Ud
], ru = (i) => (i?.client ?? Xn).get({
  security: [
    {
      scheme: "bearer",
      type: "http"
    }
  ],
  url: "/umbraco/management/api/v1/content-insights/get-all-documents-with-authors",
  ...i
}), au = (i) => (i?.client ?? Xn).get({
  security: [
    {
      scheme: "bearer",
      type: "http"
    }
  ],
  url: "/umbraco/management/api/v1/content-insights/get-document-types",
  ...i
}), je = [
  "rgba(54, 162, 235, 0.7)",
  "rgba(153, 102, 255, 0.7)",
  "rgba(255, 159, 64, 0.7)",
  "rgba(0, 128, 0, 0.7)",
  "rgba(0, 255, 255, 0.7)",
  "rgba(255, 0, 255, 0.7)"
], Ft = {
  Public: 0,
  Draft: 1,
  Trashed: 2
}, Yd = [
  "Public",
  "Draft",
  "Trashed"
];
function lu(i, t, e, s, n = !0) {
  const o = new Wo(i, {
    type: "bar",
    data: {
      labels: t,
      datasets: [
        {
          label: "Number of Items",
          data: e,
          backgroundColor: e.map((a, l) => je[l % je.length]),
          borderColor: e.map((a, l) => je[l % je.length]),
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: !0,
      plugins: {
        legend: {
          display: !0,
          position: "top",
          labels: { color: "white", boxWidth: 0 },
          onClick: () => {
          }
        },
        title: { display: !1 }
      },
      onClick: (a) => {
        if (!a.native || !n) return;
        const l = a.native, c = o.canvas.getBoundingClientRect(), h = l.clientX - c.left;
        let d = 0, u = 1 / 0;
        const f = o.scales.x;
        if (!f) return;
        o.data.datasets[0].data.forEach((p, m) => {
          const b = f.getPixelForValue(m), _ = Math.abs(h - b);
          _ < u && (u = _, d = m);
        }), o.data.datasets[0].data.splice(d, 1);
        const g = o.data.labels;
        g && g.splice(d, 1), s && s(o, d), o.update();
      },
      scales: {
        y: {
          beginAtZero: !0,
          ticks: { color: "white", precision: 0, stepSize: 1 },
          grid: { color: "rgba(255, 255, 255, 0.1)" }
        },
        x: {
          ticks: { color: "white" },
          grid: { color: "rgba(255, 255, 255, 0.1)" }
        }
      }
    }
  });
  return {
    chart: o,
    originalData: [...e],
    originalLabels: [...t]
  };
}
function cu(i) {
  i.chart.data.labels = [...i.originalLabels], i.chart.data.datasets[0].data = [...i.originalData], i.chart.update();
}
const Xd = (i) => {
  switch (i) {
    case Ft.Public:
      return "positive";
    case Ft.Draft:
      return "warning";
    case Ft.Trashed:
      return "danger";
    default:
      return "warning";
  }
}, oi = (i, t) => t.find((e) => e.link === i)?.name ?? "";
function Kd(i) {
  return `/umbraco/section/user-management/workspace/user/edit/${i}`;
}
function hu(i, t = null) {
  return i.authors.map((e) => i.documents.filter(
    (n) => n.authorKey === e.link && (t === null || n.type === t)
  ).length);
}
const qd = (i) => Math.floor((Date.now() - new Date(i.updateDate).getTime()) / (1e3 * 60 * 60 * 24));
function du(i) {
  return {
    public: i.filter((t) => t.status === Ft.Public),
    draft: i.filter((t) => t.status === Ft.Draft),
    trashed: i.filter((t) => t.status === Ft.Trashed)
  };
}
function uu(i) {
  return [
    { name: "All Document Types", value: "all", selected: !0 },
    ...i.slice().sort((t, e) => t.name.localeCompare(e.name)).map((t) => ({ name: t.name, value: t.type }))
  ];
}
const fu = (i, t) => ({
  ...i,
  itemsPerPage: Number(t.target.value)
});
let Ti = null;
function gu(i, t, e = !1, s) {
  if (!Ti)
    if (t.documentsWithAuthors.documents)
      Ti = [...t.documentsWithAuthors.documents];
    else
      return;
  let n = [...Ti];
  i !== "all" && (n = n.filter((o) => o.type === i)), e && (n = n.filter((o) => o.status === Ft.Draft)), s && (n = n.filter((o) => qd(o) >= s)), t.documentsWithAuthors.documents = [...n], t.filteredDocumentCount = n.length;
}
function Gd(i) {
  return Math.ceil(i.documentsWithAuthors.documents.length / i.itemsPerPage);
}
function pu(i, t) {
  return {
    ...i,
    currentPage: t.target.current
  };
}
function mu(i, t) {
  return i.sortColumn === t ? { ...i, sortDescending: !i.sortDescending } : { ...i, sortColumn: t, sortDescending: !1 };
}
function Zd(i) {
  let t = [...i.documentsWithAuthors.documents];
  if (!i.sortColumn) return t;
  let e = null;
  return t.sort((s, n) => {
    let o = "", r = "";
    switch (i.sortColumn) {
      case "status":
        o = String(s.status), r = String(n.status);
        break;
      case "name":
        o = s.name, r = n.name;
        break;
      case "type":
        o = s.typeName, r = n.typeName;
        break;
      case "author":
        o = oi(s.authorKey, i.documentsWithAuthors.authors), r = oi(n.authorKey, i.documentsWithAuthors.authors);
        break;
      case "date":
        e = new Date(s.updateDate).getTime() - new Date(n.updateDate).getTime();
        break;
    }
    return e || (e = o.localeCompare(r, void 0, { numeric: !0 })), i.sortDescending ? -e : e;
  }), t;
}
function Jd(i) {
  const t = Zd(i), e = (i.currentPage - 1) * i.itemsPerPage;
  return t.slice(e, e + i.itemsPerPage);
}
function bu(i, t, e, s) {
  const n = [
    { name: "10", value: "10", selected: i.itemsPerPage === 10 },
    { name: "25", value: "25", selected: i.itemsPerPage === 25 },
    { name: "50", value: "50", selected: i.itemsPerPage === 50 },
    { name: "100", value: "100", selected: i.itemsPerPage === 100 }
  ];
  return Ei`
    <div class="dashboard-section">
      <div class="section-header">
        <uui-icon name="icon-bulleted-list" class="uii-icon"></uui-icon>
        <h2>Documents</h2>
      </div>
      <div class="select-container">
        <p class="items-per-page">Items per page:</p>
        <uui-select id="itemPerPageSelect" label="itemPerPageSelect" .options=${n} @change=${s}></uui-select>
      </div>
      <div class="document-table">
        <table>
          <thead>
            <tr class="document-table-header">
              <th @click=${() => t("status")}>
                <uui-button type="button" look="outline" color="default" label="Status"></uui-button>
                <uui-symbol-sort
                  .active=${i.sortColumn === "status"}
                  .descending=${i.sortDescending && i.sortColumn === "status"}>
                </uui-symbol-sort>
              </th>
              <th @click=${() => t("name")}>
                <uui-button type="button" look="outline" color="default" label="Name"></uui-button>
                <uui-symbol-sort
                  .active=${i.sortColumn === "name"}
                  .descending=${i.sortDescending && i.sortColumn === "name"}>
                </uui-symbol-sort>
              </th>
              <th @click=${() => t("type")}>
                <uui-button type="button" look="outline" color="default" label="Type"></uui-button>
                <uui-symbol-sort
                  .active=${i.sortColumn === "type"}
                  .descending=${i.sortDescending && i.sortColumn === "type"}>
                </uui-symbol-sort>
              </th>
              <th @click=${() => t("author")}>
                <uui-button type="button" look="outline" color="default" label="Author"></uui-button>
                <uui-symbol-sort
                  .active=${i.sortColumn === "author"}
                  .descending=${i.sortDescending && i.sortColumn === "author"}>
                </uui-symbol-sort>
              </th>
              <th @click=${() => t("date")}>
                <uui-button type="button" look="outline" color="default" label="Date"></uui-button>
                <uui-symbol-sort
                  .active=${i.sortColumn === "date"}
                  .descending=${i.sortDescending && i.sortColumn === "date"}>
                </uui-symbol-sort>
              </th>
            </tr>
          </thead>
          <tbody>
            ${Jd(i).map(
    (o) => Ei`
                <tr>
                  <td>
                  <uui-tag color="${Xd(o.status)}">${Yd[o.status]}</uui-tag>
                  </td>
                  <td>
                    <uui-button look="default" type="button" href="${o.link}" target="_blank" label="${o.name}">${o.name}<uui-icon name="icon-link"></uui-icon></uui-button>
                  </td>
                  <td>${o.typeName}</td>
                  <td>
                    <uui-button look="default" type="button" href="${Kd(o.authorKey)}" target="_blank" label="${oi(o.authorKey, i.documentsWithAuthors.authors)}">${oi(o.authorKey, i.documentsWithAuthors.authors)} <uui-icon name="icon-link"></uui-icon> </uui-button>
                  </td>
                  <td>${new Date(o.updateDate).toLocaleDateString()}</td>
                </tr>
              `
  )}
          </tbody>
        </table>
        <uui-pagination
          firstlabel="&lt;&lt;"
          previouslabel="&lt;"
          nextlabel="&gt;"
          lastlabel="&gt;&gt;"
          class="document-table-pagination"
          .current=${i.currentPage}
          .total=${Gd(i)}
          @change=${e}>
        </uui-pagination>
      </div>
    </div>
  `;
}
function _u(i = "No documents were found. Try creating documents, then reload the page.") {
  return Ei`
    <uui-box class="dashboard">
      <div class="error-message">
        <uui-icon name="icon-application-error" class="uii-icon"></uui-icon>
        <h2>${i}</h2>
      </div>
    </uui-box>
  `;
}
const Qd = qn`
 .items-per-page {
    margin-left: auto;
    padding-right: 10px;
  }

  .document-table > table {
    width: 100%;
    padding-bottom: 40px;
  }

  .document-table-header {
    text-align: left;
  }

  .document-table-header > th {
    padding-bottom: 10px;
    white-space: nowrap;
  }

  .document-table-header > th:nth-child(1),
  .document-table-header > th:nth-child(4) {
    width: 13%;
  }

  .document-table-header > th:nth-child(2) {
    width: 40%;
  }

  .document-table-header > th:nth-child(3) {
    width: 34%;
  }

  .document-table-pagination {
    display: block;
    margin: auto;
    width: 50%;
  }
`, xu = [
  Qd,
  qn`
    :host {
      display: block;
      margin: 0 auto;
    }

    .dashboard {
      width: 85vw;
      max-width: 1300px;
      margin: 40px auto 0;
      padding: 24px;
      border-radius: 6px;
    }

    .dashboard-flex {
      display: block;
    }

    .dashboard-section-flex {
      max-width: 100%;
      margin-bottom: 32px;
    }

    @media (min-width: 768px) {
      .dashboard-flex {
        display: flex;
        justify-content: space-between;
      }

      .dashboard-section-flex {
        max-width: 50%;
        margin: 0 2%;
      }
    }

    .drafts-requiring-attention-container {
      display: block;
    }

    @media (min-width: 768px) {
      .drafts-requiring-attention-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }

    #draftsOlderThanSlider {
      width: 33%;
      margin: 25px 20px 0;
    }

    .drafts-older-than-days-days {
      width: 240px;
    }

    .drafts-older-than-days-count {
      width: 30px;
    }

    .dashboard-section {
      margin-bottom: 32px;
    }

    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .section-header > * {
      padding-right: 10px;
    }

    .section-header h2 {
      font-size: 20px;
      font-weight: 600;
    }

    .chart-box {
      padding: 16px;
      border-radius: 6px;
      background-color: #2c2c30;
    }

    canvas {
      max-width: 100%;
    }

    .pie-chart {
      width: 90%;
      margin: auto;
    }

    .reset-button {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
    }

    .select-container {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .items-per-page {
      margin-left: auto;
      padding-right: 10px;
    }

    .document-type-select {
      margin-left: auto;
    }

    .error-message {
      display: flex;
      align-items: center;
      padding: 1rem;
      font-weight: bold;
      color: red;
    }

    .error-message > * {
      padding-right: 10px;
    }

    .uii-icon {
      font-size: 30px;
    }

    .uii-icon-warning {
      font-size: 30px;
      color: #f59e0b;
    }

    .warning {
      color: #f59e0b;
    }

    .warning-message {
      display: flex;
      justify-content: flex-end;
      visibility: hidden;
      color: #f59e0b;
    }

    .document-count {
      padding-right: 10px;
    }
  `
];
export {
  oh as A,
  vh as B,
  Wo as C,
  xu as D,
  nu as E,
  su as F,
  hu as G,
  qd as H,
  ph as P,
  O as a,
  I as b,
  lu as c,
  le as d,
  L as e,
  B as f,
  Z as g,
  Yd as h,
  D as i,
  Ft as j,
  gu as k,
  _u as l,
  ye as m,
  bu as n,
  au as o,
  uu as p,
  ru as q,
  cu as r,
  du as s,
  V as t,
  ou as u,
  P as v,
  fu as w,
  Ei as x,
  pu as y,
  mu as z
};
//# sourceMappingURL=general.styles-CoNEUuD3.js.map
