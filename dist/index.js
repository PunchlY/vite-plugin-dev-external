import o from "magic-string";
import { walk as c } from "estree-walker";
const p = "/@id/", u = "external:", s = `${p}${u}`;
function m(r) {
  return Array.isArray(r) ? r.filter(Boolean) : r ? [r] : [];
}
function d(r) {
  if (!r)
    return () => !1;
  if (r === !0)
    return () => !0;
  if (typeof r == "function")
    return function(e) {
      return !e.startsWith("\0") && Reflect.apply(r, void 0, arguments);
    };
  const n = /* @__PURE__ */ new Set(), t = [];
  for (const e of m(r))
    e instanceof RegExp ? t.push(e) : n.add(e);
  return (e) => n.has(e) || t.some((a) => a.test(e));
}
const x = {
  name: "module-prefix-transform",
  transform(r, n) {
    if (!r.includes(s))
      return;
    const t = this.parse(r);
    let e;
    if (c(t, {
      enter(a) {
        if (!("source" in a))
          return;
        const { source: i } = a;
        if (!i || i.type !== "Literal")
          return;
        const { value: f } = i;
        if (typeof f != "string" || !f.startsWith(s))
          return;
        const l = i.start + 1;
        e ?? (e = new o(r)), e.overwrite(l, l + s.length, "");
      }
    }), !!e)
      return {
        code: e.toString(),
        map: e.generateMap({
          file: n,
          includeContent: !0,
          hires: !0
        })
      };
  }
};
function y(r) {
  let n;
  return {
    name: "vite-plugin-externalize",
    apply: "serve",
    configResolved({ plugins: t, build: { rollupOptions: e } }) {
      n = d((r == null ? void 0 : r.external) ?? e.external), Array.prototype.push.call(t, x);
    },
    resolveId(t, e) {
      if (n(t, e, !1))
        return `${u}${t}`;
    },
    load(t) {
      if (t.startsWith(u))
        return "export{}";
    }
  };
}
export {
  y as default
};
//# sourceMappingURL=index.js.map
