import { c as ae, r as ie, m as T, i as w, a as ne, e as oe, b as H, d as h, v as se, t as le, f as ue, g as de, A as ce, P as he, B as fe, C as X, h as W, j as z, k as ve, l as ye, n as be, x as pe, o as me, p as xe, q as _e, s as ge, u as we, w as Ce, y as Se, z as Te, D as ke, E as R, F as Me } from "./general.styles-CoNEUuD3.js";
import { UmbLitElement as De } from "@umbraco-cms/backoffice/lit-element";
let I = null;
function Pe(e, a) {
  const t = a.map((i) => i.name), r = a.map((i) => i.count);
  return I = ae(e, t, r), { barChart: I.chart };
}
function Ee() {
  I && ie(I);
}
/*!
 * chartjs-plugin-datalabels v2.2.0
 * https://chartjs-plugin-datalabels.netlify.app
 * (c) 2017-2022 chartjs-plugin-datalabels contributors
 * Released under the MIT license
 */
var L = function() {
  if (typeof window < "u") {
    if (window.devicePixelRatio)
      return window.devicePixelRatio;
    var e = window.screen;
    if (e)
      return (e.deviceXDPI || 1) / (e.logicalXDPI || 1);
  }
  return 1;
}(), C = {
  // @todo move this in Chart.helpers.toTextLines
  toTextLines: function(e) {
    var a = [], t;
    for (e = [].concat(e); e.length; )
      t = e.pop(), typeof t == "string" ? a.unshift.apply(a, t.split(`
`)) : Array.isArray(t) ? e.push.apply(e, t) : w(e) || a.unshift("" + t);
    return a;
  },
  // @todo move this in Chart.helpers.canvas.textSize
  // @todo cache calls of measureText if font doesn't change?!
  textSize: function(e, a, t) {
    var r = [].concat(a), i = r.length, n = e.font, o = 0, s;
    for (e.font = t.string, s = 0; s < i; ++s)
      o = Math.max(e.measureText(r[s]).width, o);
    return e.font = n, {
      height: i * t.lineHeight,
      width: o
    };
  },
  /**
   * Returns value bounded by min and max. This is equivalent to max(min, min(value, max)).
   * @todo move this method in Chart.helpers.bound
   * https://doc.qt.io/qt-5/qtglobal.html#qBound
   */
  bound: function(e, a, t) {
    return Math.max(e, Math.min(a, t));
  },
  /**
   * Returns an array of pair [value, state] where state is:
   * * -1: value is only in a0 (removed)
   * *  1: value is only in a1 (added)
   */
  arrayDiff: function(e, a) {
    var t = e.slice(), r = [], i, n, o, s;
    for (i = 0, o = a.length; i < o; ++i)
      s = a[i], n = t.indexOf(s), n === -1 ? r.push([s, 1]) : t.splice(n, 1);
    for (i = 0, o = t.length; i < o; ++i)
      r.push([t[i], -1]);
    return r;
  },
  /**
   * https://github.com/chartjs/chartjs-plugin-datalabels/issues/70
   */
  rasterize: function(e) {
    return Math.round(e * L) / L;
  }
};
function j(e, a) {
  var t = a.x, r = a.y;
  if (t === null)
    return { x: 0, y: -1 };
  if (r === null)
    return { x: 1, y: 0 };
  var i = e.x - t, n = e.y - r, o = Math.sqrt(i * i + n * n);
  return {
    x: o ? i / o : 0,
    y: o ? n / o : -1
  };
}
function Ae(e, a, t, r, i) {
  switch (i) {
    case "center":
      t = r = 0;
      break;
    case "bottom":
      t = 0, r = 1;
      break;
    case "right":
      t = 1, r = 0;
      break;
    case "left":
      t = -1, r = 0;
      break;
    case "top":
      t = 0, r = -1;
      break;
    case "start":
      t = -t, r = -r;
      break;
    case "end":
      break;
    default:
      i *= Math.PI / 180, t = Math.cos(i), r = Math.sin(i);
      break;
  }
  return {
    x: e,
    y: a,
    vx: t,
    vy: r
  };
}
var Ie = 0, J = 1, K = 2, V = 4, Y = 8;
function D(e, a, t) {
  var r = Ie;
  return e < t.left ? r |= J : e > t.right && (r |= K), a < t.top ? r |= Y : a > t.bottom && (r |= V), r;
}
function $e(e, a) {
  for (var t = e.x0, r = e.y0, i = e.x1, n = e.y1, o = D(t, r, a), s = D(i, n, a), l, u, d; !(!(o | s) || o & s); )
    l = o || s, l & Y ? (u = t + (i - t) * (a.top - r) / (n - r), d = a.top) : l & V ? (u = t + (i - t) * (a.bottom - r) / (n - r), d = a.bottom) : l & K ? (d = r + (n - r) * (a.right - t) / (i - t), u = a.right) : l & J && (d = r + (n - r) * (a.left - t) / (i - t), u = a.left), l === o ? (t = u, r = d, o = D(t, r, a)) : (i = u, n = d, s = D(i, n, a));
  return {
    x0: t,
    x1: i,
    y0: r,
    y1: n
  };
}
function P(e, a) {
  var t = a.anchor, r = e, i, n;
  return a.clamp && (r = $e(r, a.area)), t === "start" ? (i = r.x0, n = r.y0) : t === "end" ? (i = r.x1, n = r.y1) : (i = (r.x0 + r.x1) / 2, n = (r.y0 + r.y1) / 2), Ae(i, n, e.vx, e.vy, a.align);
}
var E = {
  arc: function(e, a) {
    var t = (e.startAngle + e.endAngle) / 2, r = Math.cos(t), i = Math.sin(t), n = e.innerRadius, o = e.outerRadius;
    return P({
      x0: e.x + r * n,
      y0: e.y + i * n,
      x1: e.x + r * o,
      y1: e.y + i * o,
      vx: r,
      vy: i
    }, a);
  },
  point: function(e, a) {
    var t = j(e, a.origin), r = t.x * e.options.radius, i = t.y * e.options.radius;
    return P({
      x0: e.x - r,
      y0: e.y - i,
      x1: e.x + r,
      y1: e.y + i,
      vx: t.x,
      vy: t.y
    }, a);
  },
  bar: function(e, a) {
    var t = j(e, a.origin), r = e.x, i = e.y, n = 0, o = 0;
    return e.horizontal ? (r = Math.min(e.x, e.base), n = Math.abs(e.base - e.x)) : (i = Math.min(e.y, e.base), o = Math.abs(e.base - e.y)), P({
      x0: r,
      y0: i + o,
      x1: r + n,
      y1: i,
      vx: t.x,
      vy: t.y
    }, a);
  },
  fallback: function(e, a) {
    var t = j(e, a.origin);
    return P({
      x0: e.x,
      y0: e.y,
      x1: e.x + (e.width || 0),
      y1: e.y + (e.height || 0),
      vx: t.x,
      vy: t.y
    }, a);
  }
}, y = C.rasterize;
function Re(e) {
  var a = e.borderWidth || 0, t = e.padding, r = e.size.height, i = e.size.width, n = -i / 2, o = -r / 2;
  return {
    frame: {
      x: n - t.left - a,
      y: o - t.top - a,
      w: i + t.width + a * 2,
      h: r + t.height + a * 2
    },
    text: {
      x: n,
      y: o,
      w: i,
      h: r
    }
  };
}
function Be(e, a) {
  var t = a.chart.getDatasetMeta(a.datasetIndex).vScale;
  if (!t)
    return null;
  if (t.xCenter !== void 0 && t.yCenter !== void 0)
    return { x: t.xCenter, y: t.yCenter };
  var r = t.getBasePixel();
  return e.horizontal ? { x: r, y: null } : { x: null, y: r };
}
function Oe(e) {
  return e instanceof ce ? E.arc : e instanceof he ? E.point : e instanceof fe ? E.bar : E.fallback;
}
function We(e, a, t, r, i, n) {
  var o = Math.PI / 2;
  if (n) {
    var s = Math.min(n, i / 2, r / 2), l = a + s, u = t + s, d = a + r - s, c = t + i - s;
    e.moveTo(a, u), l < d && u < c ? (e.arc(l, u, s, -Math.PI, -o), e.arc(d, u, s, -o, 0), e.arc(d, c, s, 0, o), e.arc(l, c, s, o, Math.PI)) : l < d ? (e.moveTo(l, t), e.arc(d, u, s, -o, o), e.arc(l, u, s, o, Math.PI + o)) : u < c ? (e.arc(l, u, s, -Math.PI, 0), e.arc(l, c, s, 0, Math.PI)) : e.arc(l, u, s, -Math.PI, Math.PI), e.closePath(), e.moveTo(a, t);
  } else
    e.rect(a, t, r, i);
}
function ze(e, a, t) {
  var r = t.backgroundColor, i = t.borderColor, n = t.borderWidth;
  !r && (!i || !n) || (e.beginPath(), We(
    e,
    y(a.x) + n / 2,
    y(a.y) + n / 2,
    y(a.w) - n,
    y(a.h) - n,
    t.borderRadius
  ), e.closePath(), r && (e.fillStyle = r, e.fill()), i && n && (e.strokeStyle = i, e.lineWidth = n, e.lineJoin = "miter", e.stroke()));
}
function je(e, a, t) {
  var r = t.lineHeight, i = e.w, n = e.x, o = e.y + r / 2;
  return a === "center" ? n += i / 2 : (a === "end" || a === "right") && (n += i), {
    h: r,
    w: i,
    x: n,
    y: o
  };
}
function Ne(e, a, t) {
  var r = e.shadowBlur, i = t.stroked, n = y(t.x), o = y(t.y), s = y(t.w);
  i && e.strokeText(a, n, o, s), t.filled && (r && i && (e.shadowBlur = 0), e.fillText(a, n, o, s), r && i && (e.shadowBlur = r));
}
function Ge(e, a, t, r) {
  var i = r.textAlign, n = r.color, o = !!n, s = r.font, l = a.length, u = r.textStrokeColor, d = r.textStrokeWidth, c = u && d, v;
  if (!(!l || !o && !c))
    for (t = je(t, i, s), e.font = s.string, e.textAlign = i, e.textBaseline = "middle", e.shadowBlur = r.textShadowBlur, e.shadowColor = r.textShadowColor, o && (e.fillStyle = n), c && (e.lineJoin = "round", e.lineWidth = d, e.strokeStyle = u), v = 0, l = a.length; v < l; ++v)
      Ne(e, a[v], {
        stroked: c,
        filled: o,
        w: t.w,
        x: t.x,
        y: t.y + t.h * v
      });
}
var Q = function(e, a, t, r) {
  var i = this;
  i._config = e, i._index = r, i._model = null, i._rects = null, i._ctx = a, i._el = t;
};
T(Q.prototype, {
  /**
   * @private
   */
  _modelize: function(e, a, t, r) {
    var i = this, n = i._index, o = le(h([t.font, {}], r, n)), s = h([t.color, ue.color], r, n);
    return {
      align: h([t.align, "center"], r, n),
      anchor: h([t.anchor, "center"], r, n),
      area: r.chart.chartArea,
      backgroundColor: h([t.backgroundColor, null], r, n),
      borderColor: h([t.borderColor, null], r, n),
      borderRadius: h([t.borderRadius, 0], r, n),
      borderWidth: h([t.borderWidth, 0], r, n),
      clamp: h([t.clamp, !1], r, n),
      clip: h([t.clip, !1], r, n),
      color: s,
      display: e,
      font: o,
      lines: a,
      offset: h([t.offset, 4], r, n),
      opacity: h([t.opacity, 1], r, n),
      origin: Be(i._el, r),
      padding: de(h([t.padding, 4], r, n)),
      positioner: Oe(i._el),
      rotation: h([t.rotation, 0], r, n) * (Math.PI / 180),
      size: C.textSize(i._ctx, a, o),
      textAlign: h([t.textAlign, "start"], r, n),
      textShadowBlur: h([t.textShadowBlur, 0], r, n),
      textShadowColor: h([t.textShadowColor, s], r, n),
      textStrokeColor: h([t.textStrokeColor, s], r, n),
      textStrokeWidth: h([t.textStrokeWidth, 0], r, n)
    };
  },
  update: function(e) {
    var a = this, t = null, r = null, i = a._index, n = a._config, o, s, l, u = h([n.display, !0], e, i);
    u && (o = e.dataset.data[i], s = se(H(n.formatter, [o, e]), o), l = w(s) ? [] : C.toTextLines(s), l.length && (t = a._modelize(u, l, n, e), r = Re(t))), a._model = t, a._rects = r;
  },
  geometry: function() {
    return this._rects ? this._rects.frame : {};
  },
  rotation: function() {
    return this._model ? this._model.rotation : 0;
  },
  visible: function() {
    return this._model && this._model.opacity;
  },
  model: function() {
    return this._model;
  },
  draw: function(e, a) {
    var t = this, r = e.ctx, i = t._model, n = t._rects, o;
    this.visible() && (r.save(), i.clip && (o = i.area, r.beginPath(), r.rect(
      o.left,
      o.top,
      o.right - o.left,
      o.bottom - o.top
    ), r.clip()), r.globalAlpha = C.bound(0, i.opacity, 1), r.translate(y(a.x), y(a.y)), r.rotate(i.rotation), ze(r, n.frame, i), Ge(r, i.lines, n.text, i), r.restore());
  }
});
var Ue = Number.MIN_SAFE_INTEGER || -9007199254740991, Fe = Number.MAX_SAFE_INTEGER || 9007199254740991;
function x(e, a, t) {
  var r = Math.cos(t), i = Math.sin(t), n = a.x, o = a.y;
  return {
    x: n + r * (e.x - n) - i * (e.y - o),
    y: o + i * (e.x - n) + r * (e.y - o)
  };
}
function q(e, a) {
  var t = Fe, r = Ue, i = a.origin, n, o, s, l, u;
  for (n = 0; n < e.length; ++n)
    o = e[n], s = o.x - i.x, l = o.y - i.y, u = a.vx * s + a.vy * l, t = Math.min(t, u), r = Math.max(r, u);
  return {
    min: t,
    max: r
  };
}
function A(e, a) {
  var t = a.x - e.x, r = a.y - e.y, i = Math.sqrt(t * t + r * r);
  return {
    vx: (a.x - e.x) / i,
    vy: (a.y - e.y) / i,
    origin: e,
    ln: i
  };
}
var Z = function() {
  this._rotation = 0, this._rect = {
    x: 0,
    y: 0,
    w: 0,
    h: 0
  };
};
T(Z.prototype, {
  center: function() {
    var e = this._rect;
    return {
      x: e.x + e.w / 2,
      y: e.y + e.h / 2
    };
  },
  update: function(e, a, t) {
    this._rotation = t, this._rect = {
      x: a.x + e.x,
      y: a.y + e.y,
      w: a.w,
      h: a.h
    };
  },
  contains: function(e) {
    var a = this, t = 1, r = a._rect;
    return e = x(e, a.center(), -a._rotation), !(e.x < r.x - t || e.y < r.y - t || e.x > r.x + r.w + t * 2 || e.y > r.y + r.h + t * 2);
  },
  // Separating Axis Theorem
  // https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
  intersects: function(e) {
    var a = this._points(), t = e._points(), r = [
      A(a[0], a[1]),
      A(a[0], a[3])
    ], i, n, o;
    for (this._rotation !== e._rotation && r.push(
      A(t[0], t[1]),
      A(t[0], t[3])
    ), i = 0; i < r.length; ++i)
      if (n = q(a, r[i]), o = q(t, r[i]), n.max < o.min || o.max < n.min)
        return !1;
    return !0;
  },
  /**
   * @private
   */
  _points: function() {
    var e = this, a = e._rect, t = e._rotation, r = e.center();
    return [
      x({ x: a.x, y: a.y }, r, t),
      x({ x: a.x + a.w, y: a.y }, r, t),
      x({ x: a.x + a.w, y: a.y + a.h }, r, t),
      x({ x: a.x, y: a.y + a.h }, r, t)
    ];
  }
});
function ee(e, a, t) {
  var r = a.positioner(e, a), i = r.vx, n = r.vy;
  if (!i && !n)
    return { x: r.x, y: r.y };
  var o = t.w, s = t.h, l = a.rotation, u = Math.abs(o / 2 * Math.cos(l)) + Math.abs(s / 2 * Math.sin(l)), d = Math.abs(o / 2 * Math.sin(l)) + Math.abs(s / 2 * Math.cos(l)), c = 1 / Math.max(Math.abs(i), Math.abs(n));
  return u *= i * c, d *= n * c, u += a.offset * i, d += a.offset * n, {
    x: r.x + u,
    y: r.y + d
  };
}
function Le(e, a) {
  var t, r, i, n;
  for (t = e.length - 1; t >= 0; --t)
    for (i = e[t].$layout, r = t - 1; r >= 0 && i._visible; --r)
      n = e[r].$layout, n._visible && i._box.intersects(n._box) && a(i, n);
  return e;
}
function qe(e) {
  var a, t, r, i, n, o, s;
  for (a = 0, t = e.length; a < t; ++a)
    r = e[a], i = r.$layout, i._visible && (s = new Proxy(r._el, { get: (l, u) => l.getProps([u], !0)[u] }), n = r.geometry(), o = ee(s, r.model(), n), i._box.update(o, n, r.rotation()));
  return Le(e, function(l, u) {
    var d = l._hidable, c = u._hidable;
    d && c || c ? u._visible = !1 : d && (l._visible = !1);
  });
}
var S = {
  prepare: function(e) {
    var a = [], t, r, i, n, o;
    for (t = 0, i = e.length; t < i; ++t)
      for (r = 0, n = e[t].length; r < n; ++r)
        o = e[t][r], a.push(o), o.$layout = {
          _box: new Z(),
          _hidable: !1,
          _visible: !0,
          _set: t,
          _idx: o._index
        };
    return a.sort(function(s, l) {
      var u = s.$layout, d = l.$layout;
      return u._idx === d._idx ? d._set - u._set : d._idx - u._idx;
    }), this.update(a), a;
  },
  update: function(e) {
    var a = !1, t, r, i, n, o;
    for (t = 0, r = e.length; t < r; ++t)
      i = e[t], n = i.model(), o = i.$layout, o._hidable = n && n.display === "auto", o._visible = i.visible(), a |= o._hidable;
    a && qe(e);
  },
  lookup: function(e, a) {
    var t, r;
    for (t = e.length - 1; t >= 0; --t)
      if (r = e[t].$layout, r && r._visible && r._box.contains(a))
        return e[t];
    return null;
  },
  draw: function(e, a) {
    var t, r, i, n, o, s;
    for (t = 0, r = a.length; t < r; ++t)
      i = a[t], n = i.$layout, n._visible && (o = i.geometry(), s = ee(i._el, i.model(), o), n._box.update(s, o, i.rotation()), i.draw(e, s));
  }
}, He = function(e) {
  if (w(e))
    return null;
  var a = e, t, r, i;
  if (ne(e))
    if (!w(e.label))
      a = e.label;
    else if (!w(e.r))
      a = e.r;
    else
      for (a = "", t = Object.keys(e), i = 0, r = t.length; i < r; ++i)
        a += (i !== 0 ? ", " : "") + t[i] + ": " + e[t[i]];
  return "" + a;
}, Xe = {
  align: "center",
  anchor: "center",
  backgroundColor: null,
  borderColor: null,
  borderRadius: 0,
  borderWidth: 0,
  clamp: !1,
  clip: !1,
  color: void 0,
  display: !0,
  font: {
    family: void 0,
    lineHeight: 1.2,
    size: void 0,
    style: void 0,
    weight: null
  },
  formatter: He,
  labels: void 0,
  listeners: {},
  offset: 4,
  opacity: 1,
  padding: {
    top: 4,
    right: 4,
    bottom: 4,
    left: 4
  },
  rotation: 0,
  textAlign: "start",
  textStrokeColor: void 0,
  textStrokeWidth: 0,
  textShadowBlur: 0,
  textShadowColor: void 0
}, f = "$datalabels", te = "$default";
function Je(e, a) {
  var t = e.datalabels, r = {}, i = [], n, o;
  return t === !1 ? null : (t === !0 && (t = {}), a = T({}, [a, t]), n = a.labels || {}, o = Object.keys(n), delete a.labels, o.length ? o.forEach(function(s) {
    n[s] && i.push(T({}, [
      a,
      n[s],
      { _key: s }
    ]));
  }) : i.push(a), r = i.reduce(function(s, l) {
    return oe(l.listeners || {}, function(u, d) {
      s[d] = s[d] || {}, s[d][l._key || te] = u;
    }), delete l.listeners, s;
  }, {}), {
    labels: i,
    listeners: r
  });
}
function N(e, a, t, r) {
  if (a) {
    var i = t.$context, n = t.$groups, o;
    a[n._set] && (o = a[n._set][n._key], o && H(o, [i, r]) === !0 && (e[f]._dirty = !0, t.update(i)));
  }
}
function Ke(e, a, t, r, i) {
  var n, o;
  !t && !r || (t ? r ? t !== r && (o = n = !0) : o = !0 : n = !0, o && N(e, a.leave, t, i), n && N(e, a.enter, r, i));
}
function Ve(e, a) {
  var t = e[f], r = t._listeners, i, n;
  if (!(!r.enter && !r.leave)) {
    if (a.type === "mousemove")
      n = S.lookup(t._labels, a);
    else if (a.type !== "mouseout")
      return;
    i = t._hovered, t._hovered = n, Ke(e, r, i, n, a);
  }
}
function Ye(e, a) {
  var t = e[f], r = t._listeners.click, i = r && S.lookup(t._labels, a);
  i && N(e, r, i, a);
}
var Qe = {
  id: "datalabels",
  defaults: Xe,
  beforeInit: function(e) {
    e[f] = {
      _actives: []
    };
  },
  beforeUpdate: function(e) {
    var a = e[f];
    a._listened = !1, a._listeners = {}, a._datasets = [], a._labels = [];
  },
  afterDatasetUpdate: function(e, a, t) {
    var r = a.index, i = e[f], n = i._datasets[r] = [], o = e.isDatasetVisible(r), s = e.data.datasets[r], l = Je(s, t), u = a.meta.data || [], d = e.ctx, c, v, G, U, B, F, m, b;
    for (d.save(), c = 0, G = u.length; c < G; ++c)
      if (m = u[c], m[f] = [], o && m && e.getDataVisibility(c) && !m.skip)
        for (v = 0, U = l.labels.length; v < U; ++v)
          B = l.labels[v], F = B._key, b = new Q(B, d, m, c), b.$groups = {
            _set: r,
            _key: F || te
          }, b.$context = {
            active: !1,
            chart: e,
            dataIndex: c,
            dataset: s,
            datasetIndex: r
          }, b.update(b.$context), m[f].push(b), n.push(b);
    d.restore(), T(i._listeners, l.listeners, {
      merger: function(M, O, re) {
        O[M] = O[M] || {}, O[M][a.index] = re[M], i._listened = !0;
      }
    });
  },
  afterUpdate: function(e) {
    e[f]._labels = S.prepare(e[f]._datasets);
  },
  // Draw labels on top of all dataset elements
  // https://github.com/chartjs/chartjs-plugin-datalabels/issues/29
  // https://github.com/chartjs/chartjs-plugin-datalabels/issues/32
  afterDatasetsDraw: function(e) {
    S.draw(e, e[f]._labels);
  },
  beforeEvent: function(e, a) {
    if (e[f]._listened) {
      var t = a.event;
      switch (t.type) {
        case "mousemove":
        case "mouseout":
          Ve(e, t);
          break;
        case "click":
          Ye(e, t);
          break;
      }
    }
  },
  afterEvent: function(e) {
    var a = e[f], t = a._actives, r = a._actives = e.getActiveElements(), i = C.arrayDiff(t, r), n, o, s, l, u, d, c;
    for (n = 0, o = i.length; n < o; ++n)
      if (u = i[n], u[1])
        for (c = u[0].element[f] || [], s = 0, l = c.length; s < l; ++s)
          d = c[s], d.$context.active = u[1] === 1, d.update(d.$context);
    (a._dirty || i.length) && (S.update(a._labels), e.render()), delete a._dirty;
  }
};
let _ = null, $ = null, g = null;
function Ze(e, a) {
  const t = new X(e, {
    type: "pie",
    data: {
      labels: [
        W[z.Public],
        W[z.Draft],
        W[z.Trashed]
      ],
      datasets: [
        {
          data: [
            a.public.length,
            a.draft.length,
            a.trashed.length
          ],
          backgroundColor: [
            "rgba(75, 192, 192, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(255, 99, 132, 0.7)"
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(255, 99, 132, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    plugins: [Qe],
    options: {
      responsive: !0,
      plugins: {
        legend: {
          position: "top",
          labels: { color: "white" }
        },
        datalabels: {
          formatter: (r, i) => {
            const o = i.chart.data.datasets[0].data.reduce((l, u) => l + u, 0);
            return `${(r / o * 100).toFixed(1)}%`;
          },
          color: "black",
          font: { size: 40, weight: "bold" }
        },
        title: {
          display: !0,
          text: "Content Status Distribution",
          color: "white",
          font: { size: 16 }
        }
      }
    }
  });
  $ || ($ = [...t.data.datasets[0].data]), _ = t, g = a;
}
function et(e) {
  if (!(!_ || !$ || !g)) {
    if (e === "all")
      _.data.datasets[0].data = [...$];
    else {
      const a = g.public.filter((i) => i.type === e).length, t = g.draft.filter((i) => i.type === e).length, r = g.trashed.filter((i) => i.type === e).length;
      _.data.datasets[0].data = [
        a,
        t,
        r
      ];
    }
    _.update();
  }
}
var tt = Object.defineProperty, rt = Object.getOwnPropertyDescriptor, k = (e, a, t, r) => {
  for (var i = r > 1 ? void 0 : r ? rt(a, t) : a, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (i = (r ? o(a, t, i) : o(i)) || i);
  return r && i && tt(a, t, i), i;
};
X.register(...we);
let p = class extends De {
  constructor() {
    super(...arguments), this.documentsTableState = {
      documentsWithAuthors: { documents: [], authors: [] },
      filteredDocumentCount: 0,
      currentPage: 1,
      itemsPerPage: 10,
      sortColumn: null,
      sortDescending: !1
    }, this.documentTypeSelectOptions = [], this.hasError = !1, this.documentCount = 0;
  }
  handleDocumentTypeSelectChange(e) {
    const t = e.target.value;
    et(t), ve(t, this.documentsTableState), this.documentsTableState.currentPage = 1, this.documentCount = this.documentsTableState.filteredDocumentCount, this.requestUpdate();
  }
  render() {
    return this.hasError ? ye() : pe`
    <uui-box class="dashboard">
        <div class="dashboard-flex">
            <div class="dashboard-section-flex">
                <div class="section-header">
                    <uui-icon name="icon-bar-chart" class="uii-icon"></uui-icon>
                    <h2>Document count by Document Types</h2>
                </div>
                <div class="reset-button">
                    <p>Click on the bars to remove them, click on reset to reset the chart.</p>
                    <uui-button type="button" look="primary" color="danger" label="Reset" @click=${Ee}></uui-button>
                </div>
                <uui-box class="chart-box bar-chart">
                    <canvas id="documentsByDocumentTypeChart"></canvas>
                </uui-box>
            </div>
            <div class="dashboard-section-flex">
                <div class="section-header">
                    <uui-icon name="icon-pie-chart" class="uii-icon"></uui-icon>
                    <h2>Document count by Document Status</h2>
                </div>
                <div class="select-container">
                     <uui-icon name="icon-calculator" class="uii-icon"></uui-icon>
                     <h3 class="document-count">Document count: </h3>
                     <uui-tag class="uii-icon">${this.documentCount}</uui-tag>
                    <uui-select class="document-type-select" id="documentTypeSelect" label="documentTypeSelect" .options=${this.documentTypeSelectOptions} @change=${this.handleDocumentTypeSelectChange}></uui-select>
                </div>
                <uui-box class="chart-box pie-chart">
                    <canvas id="documentsByDocumentStatusChart"></canvas>
                </uui-box>
            </div>
        </div>
      ${be(
      this.documentsTableState,
      (e) => this.documentsTableState = Te(this.documentsTableState, e),
      (e) => this.documentsTableState = Se(this.documentsTableState, e),
      (e) => this.documentsTableState = Ce(this.documentsTableState, e)
    )}
    </uui-box>
    `;
  }
  async firstUpdated() {
    const { data: e, error: a } = await me();
    if (a || !e) {
      this.hasError = !0, console.error(a);
      return;
    }
    this.documentTypeSelectOptions = xe(e);
    const t = this.renderRoot.querySelector("#documentsByDocumentTypeChart");
    Pe(t, e);
    const { data: r, error: i } = await _e();
    if (i || !r?.documents || !r?.authors) {
      this.hasError = !0, console.error(i);
      return;
    }
    this.documentsTableState = {
      ...this.documentsTableState,
      documentsWithAuthors: r
    }, this.documentCount = r.documents.length;
    const n = ge(r.documents), o = this.renderRoot.querySelector("#documentsByDocumentStatusChart");
    Ze(o, n);
  }
};
p.styles = ke;
k([
  R()
], p.prototype, "documentsTableState", 2);
k([
  R()
], p.prototype, "documentTypeSelectOptions", 2);
k([
  R()
], p.prototype, "hasError", 2);
k([
  R()
], p.prototype, "documentCount", 2);
p = k([
  Me("content-overview")
], p);
export {
  p as ContentOverview
};
//# sourceMappingURL=content-overview-Dqnof2fu.js.map
