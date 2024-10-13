import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, usePage, Link, createInertiaApp } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
function CreatePost() {
  const { data, setData, post, processing, errors } = useForm({
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
    /* @__PURE__ */ jsxs(Head, { children: [
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
  const { data, setData, post, processing, errors } = useForm({
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
    /* @__PURE__ */ jsxs(Head, { children: [
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
  const pageData = usePage();
  console.log(usePage());
  useEffect(() => {
    if (pageData.props.flash.message) {
      toast.success(pageData.props.flash.message);
    }
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
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
            Link,
            {
              href: `/post/edit/${post.id}`,
              className: "btn btn-primary",
              children: "Edit"
            }
          )
        ] }) }, post.id)),
        /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsx("nav", { "aria-label": "Page navigation example", children: /* @__PURE__ */ jsxs("ul", { className: "pagination", children: [
          /* @__PURE__ */ jsx("li", { className: "page-item", children: /* @__PURE__ */ jsx(
            Link,
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
                    Link,
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
            Link,
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
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/CreatePost.jsx": __vite_glob_0_0, "./Pages/EditPost.jsx": __vite_glob_0_1, "./Pages/Home.jsx": __vite_glob_0_2 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => {
      return React.createElement(App, props);
    }
  })
);
