import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { y as getBootstrapData, n as apiClient } from "../server-entry.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
import { Children, Fragment } from "react";
import clsx from "clsx";
function useArticle(loader) {
  const { categoryId, sectionId, articleId } = useParams();
  return useQuery({
    queryKey: ["hc", "articles", articleId, categoryId, sectionId, loader],
    queryFn: () => fetchArticle(articleId, loader, categoryId, sectionId),
    initialData: () => {
      var _a, _b, _c;
      const data = (_a = getBootstrapData().loaders) == null ? void 0 : _a[loader];
      const [category, section] = ((_b = data == null ? void 0 : data.article) == null ? void 0 : _b.path) || [];
      if (((_c = data == null ? void 0 : data.article) == null ? void 0 : _c.id) == articleId && (category == null ? void 0 : category.id) == categoryId && (section == null ? void 0 : section.id) == sectionId) {
        return data;
      }
    }
  });
}
function fetchArticle(articleId, loader, categoryId, sectionId) {
  const url = categoryId && sectionId ? `hc/articles/${categoryId}/${sectionId}/${articleId}` : `hc/articles/${articleId}`;
  return apiClient.get(url, { params: { loader } }).then((response) => response.data);
}
function BulletSeparatedItems({
  children,
  className
}) {
  const items = Children.toArray(children);
  return /* @__PURE__ */ jsx("div", { className: clsx("flex items-center gap-4 overflow-hidden", className), children: items.map((child, index) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { children: child }),
    index < items.length - 1 ? /* @__PURE__ */ jsx("div", { children: "•" }) : null
  ] }, index)) });
}
export {
  BulletSeparatedItems as B,
  useArticle as u
};
//# sourceMappingURL=bullet-seprated-items-77fb8967.mjs.map
