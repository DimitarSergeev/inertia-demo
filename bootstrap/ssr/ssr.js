import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { shouldIntercept, router, mergeDataIntoQueryString, setupProgress, createHeadManager } from "@inertiajs/core";
import N, { createContext, forwardRef, useCallback, createElement, useState, useMemo, useEffect, useRef, useContext } from "react";
import ge from "lodash.isequal";
import { toast } from "react-toastify";
import createServer from "@inertiajs/core/server";
import ReactDOMServer from "react-dom/server";
var B = createContext(void 0);
B.displayName = "InertiaHeadContext";
var A = B;
var X = function({ children: d, title: c }) {
  let s = useContext(A), p = useMemo(() => s.createProvider(), [s]);
  useEffect(() => () => {
    p.disconnect();
  }, [p]);
  function a(e) {
    return ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"].indexOf(e.type) > -1;
  }
  function S(e) {
    let i = Object.keys(e.props).reduce((o, y) => {
      if (["head-key", "children", "dangerouslySetInnerHTML"].includes(y)) return o;
      let T = e.props[y];
      return T === "" ? o + ` ${y}` : o + ` ${y}="${T}"`;
    }, "");
    return `<${e.type}${i}>`;
  }
  function f(e) {
    return typeof e.props.children == "string" ? e.props.children : e.props.children.reduce((i, o) => i + P(o), "");
  }
  function P(e) {
    let i = S(e);
    return e.props.children && (i += f(e)), e.props.dangerouslySetInnerHTML && (i += e.props.dangerouslySetInnerHTML.__html), a(e) || (i += `</${e.type}>`), i;
  }
  function u(e) {
    return N.cloneElement(e, { inertia: e.props["head-key"] !== void 0 ? e.props["head-key"] : "" });
  }
  function g(e) {
    return P(u(e));
  }
  function l(e) {
    let i = N.Children.toArray(e).filter((o) => o).map((o) => g(o));
    return c && !i.find((o) => o.startsWith("<title")) && i.push(`<title inertia>${c}</title>`), i;
  }
  return p.update(l(d)), null;
}, Y = X;
var F = () => {
}, $ = forwardRef(({ children: d, as: c = "a", data: s = {}, href: p, method: a = "get", preserveScroll: S = false, preserveState: f = null, replace: P = false, only: u = [], except: g = [], headers: l = {}, queryStringArrayFormat: e = "brackets", onClick: i = F, onCancelToken: o = F, onBefore: y = F, onStart: T = F, onProgress: H = F, onFinish: h = F, onCancel: M = F, onSuccess: x = F, onError: w = F, ...R }, I) => {
  let v = useCallback((r) => {
    i(r), shouldIntercept(r) && (r.preventDefault(), router.visit(p, { data: s, method: a, preserveScroll: S, preserveState: f ?? a !== "get", replace: P, only: u, except: g, headers: l, onCancelToken: o, onBefore: y, onStart: T, onProgress: H, onFinish: h, onCancel: M, onSuccess: x, onError: w }));
  }, [s, p, a, S, f, P, u, g, l, i, o, y, T, H, h, M, x, w]);
  c = c.toLowerCase(), a = a.toLowerCase();
  let [t, n] = mergeDataIntoQueryString(a, p || "", s, e);
  return p = t, s = n, c === "a" && a !== "get" && console.warn(`Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues.

Please specify a more appropriate element using the "as" attribute. For example:

<Link href="${p}" method="${a}" as="button">...</Link>`), createElement(c, { ...R, ...c === "a" ? { href: p } : {}, ref: I, onClick: v }, d);
});
$.displayName = "InertiaLink";
var ae = $;
var j = createContext(void 0);
j.displayName = "InertiaPageContext";
var E = j;
function O({ children: d, initialPage: c, initialComponent: s, resolveComponent: p, titleCallback: a, onHeadUpdate: S }) {
  let [f, P] = useState({ component: s || null, page: c, key: null }), u = useMemo(() => createHeadManager(typeof window > "u", a || ((l) => l), S || (() => {
  })), []);
  if (useEffect(() => {
    router.init({ initialPage: c, resolveComponent: p, swapComponent: async ({ component: l, page: e, preserveState: i }) => {
      P((o) => ({ component: l, page: e, key: i ? o.key : Date.now() }));
    } }), router.on("navigate", () => u.forceUpdate());
  }, []), !f.component) return createElement(A.Provider, { value: u }, createElement(E.Provider, { value: f.page }, null));
  let g = d || (({ Component: l, props: e, key: i }) => {
    let o = createElement(l, { key: i, ...e });
    return typeof l.layout == "function" ? l.layout(o) : Array.isArray(l.layout) ? l.layout.concat(o).reverse().reduce((y, T) => createElement(T, { children: y, ...e })) : o;
  });
  return createElement(A.Provider, { value: u }, createElement(E.Provider, { value: f.page }, g({ Component: f.component, key: f.key, props: f.page.props })));
}
O.displayName = "Inertia";
async function V({ id: d = "app", resolve: c, setup: s, title: p, progress: a = {}, page: S, render: f }) {
  let P = typeof window > "u", u = P ? null : document.getElementById(d), g = S || JSON.parse(u.dataset.page), l = (o) => Promise.resolve(c(o)).then((y) => y.default || y), e = [], i = await l(g.component).then((o) => s({ el: u, App: O, props: { initialPage: g, initialComponent: o, resolveComponent: l, titleCallback: p, onHeadUpdate: P ? (y) => e = y : null } }));
  if (!P && a && setupProgress(a), P) {
    let o = await f(createElement("div", { id: d, "data-page": JSON.stringify(g) }, i));
    return { head: e, body: o };
  }
}
function D(d, c) {
  let [s, p] = useState(() => {
    let a = router.restore(c);
    return a !== void 0 ? a : d;
  });
  return useEffect(() => {
    router.remember(s, c);
  }, [s, c]), [s, p];
}
function W(d, c) {
  let s = useRef(null), p = typeof d == "string" ? d : null, [a, S] = useState((typeof d == "string" ? c : d) || {}), f = useRef(null), P = useRef(null), [u, g] = p ? D(a, `${p}:data`) : useState(a), [l, e] = p ? D({}, `${p}:errors`) : useState({}), [i, o] = useState(false), [y, T] = useState(false), [H, h] = useState(null), [M, x] = useState(false), [w, R] = useState(false), I = (t) => t;
  useEffect(() => (s.current = true, () => {
    s.current = false;
  }), []);
  let v = useCallback((t, n, r = {}) => {
    let k = { ...r, onCancelToken: (m) => {
      if (f.current = m, r.onCancelToken) return r.onCancelToken(m);
    }, onBefore: (m) => {
      if (x(false), R(false), clearTimeout(P.current), r.onBefore) return r.onBefore(m);
    }, onStart: (m) => {
      if (T(true), r.onStart) return r.onStart(m);
    }, onProgress: (m) => {
      if (h(m), r.onProgress) return r.onProgress(m);
    }, onSuccess: (m) => {
      if (s.current && (T(false), h(null), e({}), o(false), x(true), R(true), P.current = setTimeout(() => {
        s.current && R(false);
      }, 2e3)), r.onSuccess) return r.onSuccess(m);
    }, onError: (m) => {
      if (s.current && (T(false), h(null), e(m), o(true)), r.onError) return r.onError(m);
    }, onCancel: () => {
      if (s.current && (T(false), h(null)), r.onCancel) return r.onCancel();
    }, onFinish: () => {
      if (s.current && (T(false), h(null)), f.current = null, r.onFinish) return r.onFinish();
    } };
    t === "delete" ? router.delete(n, { ...k, data: I(u) }) : router[t](n, I(u), k);
  }, [u, e]);
  return { data: u, setData(t, n) {
    g(typeof t == "string" ? { ...u, [t]: n } : typeof t == "function" ? (r) => t(r) : t);
  }, isDirty: !ge(u, a), errors: l, hasErrors: i, processing: y, progress: H, wasSuccessful: M, recentlySuccessful: w, transform(t) {
    I = t;
  }, setDefaults(t, n) {
    S(typeof t > "u" ? () => u : (r) => ({ ...r, ...typeof t == "string" ? { [t]: n } : t }));
  }, reset(...t) {
    t.length === 0 ? g(a) : g(Object.keys(a).filter((n) => t.includes(n)).reduce((n, r) => (n[r] = a[r], n), { ...u }));
  }, setError(t, n) {
    e((r) => {
      let k = { ...r, ...typeof t == "string" ? { [t]: n } : t };
      return o(Object.keys(k).length > 0), k;
    });
  }, clearErrors(...t) {
    e((n) => {
      let r = Object.keys(n).reduce((k, m) => ({ ...k, ...t.length > 0 && !t.includes(m) ? { [m]: n[m] } : {} }), {});
      return o(Object.keys(r).length > 0), r;
    });
  }, submit: v, get(t, n) {
    v("get", t, n);
  }, post(t, n) {
    v("post", t, n);
  }, put(t, n) {
    v("put", t, n);
  }, patch(t, n) {
    v("patch", t, n);
  }, delete(t, n) {
    v("delete", t, n);
  }, cancel() {
    f.current && f.current.cancel();
  } };
}
function q() {
  let d = useContext(E);
  if (!d) throw new Error("usePage must be used within the Inertia component");
  return d;
}
function CreatePost() {
  const { data, setData, post, processing, errors } = W({
    title: "",
    content: ""
  });
  console.log(data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/create/post");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Y, { children: [
      /* @__PURE__ */ jsx("title", { children: "Create Posts" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "description",
          name: "description",
          content: "my awesome site is with ssr"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: "Create Post" }),
      /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "title", children: "Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: data.title,
              type: "text",
              onChange: handleChange,
              name: "title",
              className: "form-control",
              id: "title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "content", children: "Content" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "form-control",
              id: "content",
              name: "content",
              onChange: handleChange,
              value: data.content
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { disabled: processing, type: "submit", className: "btn btn-primary mt-4", children: "Submit" })
      ] }) }) })
    ] })
  ] });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreatePost
}, Symbol.toStringTag, { value: "Module" }));
function EditPost({ postData }) {
  const { data, setData, post, processing, errors } = W({
    title: postData.title,
    content: postData.content
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/post/edit/${postData.id}`);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Y, { children: [
      /* @__PURE__ */ jsx("title", { children: "Edit Posts" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "description",
          name: "description",
          content: "my awesome site is with ssr"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: "Create Post" }),
      /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "title", children: "Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: data.title,
              type: "text",
              onChange: handleChange,
              name: "title",
              className: "form-control",
              id: "title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "content", children: "Content" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "form-control",
              id: "content",
              name: "content",
              onChange: handleChange,
              value: data.content
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: processing,
            type: "submit",
            className: "btn btn-primary mt-4",
            children: "Submit"
          }
        )
      ] }) }) })
    ] })
  ] });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditPost
}, Symbol.toStringTag, { value: "Module" }));
function Home({ posts }) {
  const pageData = q();
  console.log(q());
  useEffect(() => {
    if (pageData.props.flash.message) {
      toast.success(pageData.props.flash.message);
    }
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Y, { children: [
      /* @__PURE__ */ jsx("title", { children: "Posts" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          "head-key": "description",
          name: "description",
          content: "my awesome site is with ssr"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: "Posts" }),
      /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
        posts.data.map((post) => /* @__PURE__ */ jsx("div", { className: "col-md-4", children: /* @__PURE__ */ jsxs("div", { className: "card mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "card-header", children: post.title }),
          /* @__PURE__ */ jsx("div", { className: "card-body", children: post.content }),
          /* @__PURE__ */ jsx(
            ae,
            {
              href: `/post/edit/${post.id}`,
              className: "btn btn-primary",
              children: "Edit"
            }
          )
        ] }) }, post.id)),
        /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsx("nav", { "aria-label": "Page navigation example", children: /* @__PURE__ */ jsxs("ul", { className: "pagination", children: [
          /* @__PURE__ */ jsx("li", { className: "page-item", children: /* @__PURE__ */ jsx(
            ae,
            {
              className: "page-link",
              href: posts.prev_page_url,
              "aria-label": "Previous",
              children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "«" })
            }
          ) }),
          posts.links.map((link) => {
            if (Number(link.label)) {
              return /* @__PURE__ */ jsx(
                "li",
                {
                  className: `page-item ${link.active ? "active" : ""}`,
                  children: /* @__PURE__ */ jsx(
                    ae,
                    {
                      className: "page-link",
                      href: link.url,
                      children: link.label
                    }
                  )
                },
                link.url
              );
            }
          }),
          /* @__PURE__ */ jsx("li", { className: "page-item", children: /* @__PURE__ */ jsx(
            ae,
            {
              className: "page-link",
              href: posts.next_page_url,
              "aria-label": "Next",
              children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "»" })
            }
          ) })
        ] }) }) })
      ] }) })
    ] })
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => V({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/CreatePost.jsx": __vite_glob_0_0, "./Pages/EditPost.jsx": __vite_glob_0_1, "./Pages/Home.jsx": __vite_glob_0_2 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => {
      return N.createElement(App, props);
    }
  })
);
