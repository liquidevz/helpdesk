import { jsx, jsxs } from "react/jsx-runtime";
import { useParams, useLocation, Link, useRoutes } from "react-router-dom";
import { B as BulletSeparatedItems, u as useArticle } from "./bullet-seprated-items-77fb8967.mjs";
import React, { useContext, Fragment, useCallback, useState, useEffect, useRef } from "react";
import { u as useIsDarkMode, L as Logo, I as IconButton, C as CloseIcon, T as Trans, A as ArticleLink, a as useSettings, D as DialogTrigger, b as Dialog, c as DialogBody, m as message, d as useDialogContext, e as useTrans, f as useSearchArticles, g as useNavigate, h as ComboBoxForwardRef, S as SearchIcon, i as Item, j as getArticleLink, k as ArticlePath, l as getCategoryLink, s as showHttpErrorToast, n as apiClient, B as Button, o as CheckIcon, p as useAuth, P as PageMetaTags, q as opacityAnimation, r as getEditArticleLink, t as LinkStyle, v as PageStatus, w as Skeleton, x as highlightAllCode, y as getBootstrapData, z as ArticleIcon, N as Navbar, E as IllustratedMessage, F as SvgImage, G as LandingPage, H as AuthRoute, J as FullPageLoader, K as NotFoundPage } from "../server-entry.mjs";
import clsx from "clsx";
import { D as DashboardLayoutContext, u as usePrevious, F as FormattedBytes, a as DashboardLayout, b as DashboardNavbar, c as DashboardSidenav, d as DashboardContent, s as searchImage } from "./search-9f6b7ed0.mjs";
import { A as AttachFileIcon } from "./AttachFile-58bf2900.mjs";
import { S as SearchTriggerButton } from "./search-trigger-button-2521a5b9.mjs";
import { AnimatePresence, m } from "framer-motion";
import { B as Breadcrumb, a as BreadcrumbItem } from "./breadcrumb-093d993c.mjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { E as EditIcon } from "./Edit-7ad4ec30.mjs";
function HcSidenav({ sections: currentSections }) {
  const { articleId } = useParams();
  const isDarkMode = useIsDarkMode();
  const { setLeftSidenavStatus } = useContext(DashboardLayoutContext);
  const prevSections = usePrevious(currentSections);
  const sections = currentSections ?? prevSections;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "stable-scrollbar sticky w-350 overflow-y-auto overflow-x-hidden py-24 pl-24 pr-32 md:h-[calc(100dvh-64px)] lg:top-64 lg:py-64 lg:pl-32 xl:pl-48 xl:pr-64", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-34 flex items-center justify-between gap-8 lg:hidden", children: [
      /* @__PURE__ */ jsx(Logo, { isDarkMode, logoColor: "dark" }),
      /* @__PURE__ */ jsx(IconButton, { onClick: () => setLeftSidenavStatus("closed"), children: /* @__PURE__ */ jsx(CloseIcon, {}) })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "text-base lg:text-sm", children: /* @__PURE__ */ jsx("ul", { role: "list", className: "space-y-36", children: sections == null ? void 0 : sections.map((section) => {
      var _a;
      return /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: section.name }) }),
        /* @__PURE__ */ jsx(
          "ul",
          {
            role: "list",
            className: "mt-8 space-y-8 border-l lg:mt-16 lg:space-y-16",
            children: (_a = section.articles) == null ? void 0 : _a.map((article) => {
              const isActive = `${article.id}` === articleId;
              return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                ArticleLink,
                {
                  className: clsx(
                    "-ml-1 block w-full pl-16 text-muted",
                    isActive && "border-l border-current font-semibold text-primary"
                  ),
                  article,
                  section
                }
              ) }, article.id);
            })
          }
        )
      ] }, section.id);
    }) }) })
  ] }) });
}
function ArticleAttachments({ article }) {
  var _a;
  const { base_url } = useSettings();
  return /* @__PURE__ */ jsx("div", { className: "space-y-12", children: (_a = article.attachments) == null ? void 0 : _a.map((attachment) => {
    const downloadLink = `${base_url}/file-entries/download/${attachment.hash}`;
    return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsx(AttachFileIcon, { className: "mt-6", size: "sm" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: downloadLink,
            download: true,
            className: "text-sm text-primary hover:underline",
            children: attachment.name
          }
        ),
        /* @__PURE__ */ jsxs(BulletSeparatedItems, { className: "mt-4 text-xs text-muted", children: [
          /* @__PURE__ */ jsx(FormattedBytes, { bytes: attachment.file_size }),
          /* @__PURE__ */ jsx("a", { href: downloadLink, download: true, className: "hover:underline", children: /* @__PURE__ */ jsx(Trans, { message: "Download" }) })
        ] })
      ] })
    ] }, attachment.id);
  }) });
}
let searchSession = [];
function useSearchTermLogger() {
  const log = useCallback(({ term, results, categoryId }) => {
    term = term == null ? void 0 : term.trim();
    if (!term || term.length < 4) {
      return;
    }
    searchSession.push({
      term,
      results: results.map((r) => r.id),
      clickedArticle: false,
      createdTicket: false,
      categoryId
    });
  }, []);
  const updateLastSearch = useCallback((data) => {
    const lastItem = searchSession.at(-1);
    if (lastItem) {
      searchSession.push({ ...lastItem, ...data });
    }
  }, []);
  return {
    log,
    updateLastSearch
  };
}
function HcSearchBar({
  placeholder = message("Search documentation"),
  size = "sm",
  width = "w-320",
  categoryId,
  ...buttonProps
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      isOpen,
      onOpenChange: setIsOpen,
      placement: "top",
      children: [
        /* @__PURE__ */ jsx(
          SearchTriggerButton,
          {
            ...buttonProps,
            onTrigger: handleOpen,
            size,
            width,
            children: /* @__PURE__ */ jsx(Trans, { ...placeholder })
          }
        ),
        /* @__PURE__ */ jsx(Dialog, { size: "lg", children: /* @__PURE__ */ jsx(DialogBody, { padding: "p-0", children: /* @__PURE__ */ jsx(DialogContent, { placeholder, categoryId }) }) })
      ]
    }
  );
}
function DialogContent({ placeholder, categoryId }) {
  const { close } = useDialogContext();
  const { trans } = useTrans();
  const [query, setQuery] = useState("");
  const searchLogger = useSearchTermLogger();
  const { data, isFetching } = useSearchArticles(
    query,
    { categoryIds: categoryId ? [categoryId] : void 0 },
    {
      onSearch: (r) => {
        var _a;
        searchLogger.log({
          term: r.query,
          results: r.pagination.data,
          categoryId: (_a = r.categoryIds) == null ? void 0 : _a[0]
        });
      }
    }
  );
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx(
    ComboBoxForwardRef,
    {
      inputValue: query,
      onInputValueChange: setQuery,
      isAsync: true,
      isLoading: isFetching,
      items: data == null ? void 0 : data.pagination.data,
      clearInputOnItemSelection: true,
      endAdornmentIcon: /* @__PURE__ */ jsx(CloseIcon, {}),
      placeholder: trans(placeholder),
      startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
      prependListbox: true,
      listboxClassName: "py-12 px-8",
      inputRadius: "rounded-none",
      inputBorder: "border-b",
      inputRing: "ring-0",
      size: "lg",
      inputFontSize: "text-md",
      inputShadow: "shadow-none",
      onEndAdornmentClick: close,
      selectionMode: "none",
      showEmptyMessage: true,
      children: (result) => /* @__PURE__ */ jsx(
        Item,
        {
          padding: "py-8 px-12",
          radius: "rounded",
          value: result.id,
          onSelected: () => {
            close();
            searchLogger.updateLastSearch({ clickedArticle: true });
            navigate(getArticleLink(result));
          },
          description: /* @__PURE__ */ jsx(ArticlePath, { article: result }),
          textLabel: result.title,
          children: result.title
        },
        result.id
      )
    }
  );
}
function ArticlePageLayout({
  children,
  leftSidenav,
  rightSidenav,
  categoryId
}) {
  return /* @__PURE__ */ jsxs(
    DashboardLayout,
    {
      height: "h-auto",
      gridClassName: "hc-grid",
      name: "hc-article",
      blockBodyOverflow: false,
      children: [
        /* @__PURE__ */ jsx(
          DashboardNavbar,
          {
            menuPosition: "header",
            className: "sticky top-0 z-10 flex-shrink-0",
            size: "md",
            children: /* @__PURE__ */ jsx(HcSearchBar, { categoryId })
          }
        ),
        /* @__PURE__ */ jsx(
          DashboardSidenav,
          {
            position: "left",
            size: "w-auto",
            overflow: "overflow-initial",
            className: "justify-end bg-alt",
            children: leftSidenav
          }
        ),
        /* @__PURE__ */ jsx(DashboardContent, { isScrollable: false, children: /* @__PURE__ */ jsx("div", { className: "min-w-0 max-w-672 px-16 py-16 md:py-64 lg:max-w-none lg:px-32 xl:px-64", children }) }),
        rightSidenav
      ]
    }
  );
}
function ArticlePageBreadcrumb({ data: { article }, className }) {
  var _a;
  const navigate = useNavigate();
  if (!((_a = article.path) == null ? void 0 : _a.length)) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Breadcrumb, { size: "sm", className, children: [
    /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc`), children: /* @__PURE__ */ jsx(Trans, { message: "Help center" }) }),
    article.path.map((category) => /* @__PURE__ */ jsx(
      BreadcrumbItem,
      {
        onSelected: () => navigate(getCategoryLink(category)),
        children: /* @__PURE__ */ jsx(Trans, { message: category.name })
      },
      `${category.parent_id}-${category.id}`
    )),
    /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(Trans, { message: "Article" }) })
  ] });
}
function useSubmitArticleFeedback() {
  const { articleId } = useParams();
  return useMutation({
    mutationFn: (payload) => submitFeedback(articleId, payload),
    onSuccess: () => {
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function submitFeedback(articleId, payload) {
  return apiClient.post(`hc/articles/${articleId}/feedback`, payload).then((r) => r.data);
}
function ArticlePageFeedback() {
  const submitFeedback2 = useSubmitArticleFeedback();
  if (submitFeedback2.isSuccess) {
    return /* @__PURE__ */ jsx(Trans, { message: "Thank you! Your feedback will help us improve the support experience. If you need more help, try searching for what you need at the top of the page." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "mr-10", children: /* @__PURE__ */ jsx(Trans, { message: "Was this article helpful?" }) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        radius: "rounded-full",
        startIcon: /* @__PURE__ */ jsx(CheckIcon, {}),
        color: "positive",
        disabled: submitFeedback2.isPending,
        onClick: () => submitFeedback2.mutate({ wasHelpful: true }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Yes" })
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        radius: "rounded-full",
        startIcon: /* @__PURE__ */ jsx(CloseIcon, {}),
        color: "danger",
        disabled: submitFeedback2.isPending,
        onClick: () => submitFeedback2.mutate({ wasHelpful: false }),
        children: /* @__PURE__ */ jsx(Trans, { message: "No" })
      }
    )
  ] });
}
function ArticlePage() {
  var _a, _b, _c, _d;
  const query = useArticle("articlePage");
  const { hash } = useLocation();
  useEffect(() => {
    var _a2;
    if (hash && ((_a2 = query.data) == null ? void 0 : _a2.article)) {
      setTimeout(() => {
        if (document.documentElement.scrollTop === 0) {
          const el = document.getElementById(hash.slice(1));
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    }
  }, [query.data, hash]);
  return /* @__PURE__ */ jsx(
    ArticlePageLayout,
    {
      leftSidenav: /* @__PURE__ */ jsx(HcSidenav, { sections: (_a = query.data) == null ? void 0 : _a.categoryNav }),
      rightSidenav: /* @__PURE__ */ jsx(RightSidenav, { nav: (_b = query.data) == null ? void 0 : _b.pageNav }),
      categoryId: (_d = (_c = query.data) == null ? void 0 : _c.article.path) == null ? void 0 : _d[0].id,
      children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "sync", children: /* @__PURE__ */ jsx(PageContent$2, { query }) })
    }
  );
}
function RightSidenav({ nav }) {
  const [activeItem, setActiveItem] = useState(null);
  useEffect(() => {
    if (!nav)
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = document.getElementById(`to-${entry.target.id}`);
          if (el && entry.isIntersecting) {
            setActiveItem(el.id.replace(/^to-/, ""));
          }
        }
      },
      {
        rootMargin: "0px 0px -50% 0px"
      }
    );
    const headings = nav.map((item) => document.getElementById(item.slug)).filter(Boolean);
    headings.forEach((heading) => {
      observer.observe(heading);
    });
    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [nav]);
  return /* @__PURE__ */ jsx("div", { className: "dashboard-grid-sidenav-right compact-scrollbar hidden w-224 xl:flex xl:w-288", children: /* @__PURE__ */ jsxs("nav", { className: "sticky top-64 h-[calc(100dvh-64px)] w-full py-64 pr-32 xl:pr-64", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-display text-sm font-medium", children: /* @__PURE__ */ jsx(Trans, { message: "On this page" }) }),
    /* @__PURE__ */ jsx("ol", { role: "list", className: "mt-16 space-y-12 text-sm text-muted", children: nav == null ? void 0 : nav.map((item) => {
      const isActive = item.slug === activeItem;
      return /* @__PURE__ */ jsx("li", { className: item.indent ? "pl-20" : "mt-8", children: /* @__PURE__ */ jsx(
        Link,
        {
          className: clsx(
            "cursor-pointer",
            isActive ? "text-primary" : "hover:text-main"
          ),
          to: `#${item.slug}`,
          id: `to-${item.slug}`,
          onClick: (e) => {
            const el = document.getElementById(item.slug);
            if (el) {
              setActiveItem(item.slug);
              el.scrollIntoView({ behavior: "smooth" });
            }
          },
          children: item.display_name
        }
      ) }, item.slug);
    }) })
  ] }) });
}
function PageContent$2({ query }) {
  var _a;
  const settings = useSettings();
  const { hasPermission, hasRole } = useAuth();
  if (query.data && !query.isPlaceholderData) {
    const canEdit = hasPermission("articles.update") || query.data.article.managed_by_role && hasRole(query.data.article.managed_by_role);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(PageMetaTags, { query }),
      /* @__PURE__ */ jsxs(m.article, { ...opacityAnimation, children: [
        /* @__PURE__ */ jsxs("header", { className: "mb-36", children: [
          /* @__PURE__ */ jsx(ArticlePageBreadcrumb, { data: query.data, className: "-ml-6" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("h1", { className: "font-display text-slate-900 text-3xl tracking-tight", children: query.data.article.title }),
            canEdit && /* @__PURE__ */ jsx(
              IconButton,
              {
                className: "text-muted",
                elementType: Link,
                to: getEditArticleLink(query.data.article),
                children: /* @__PURE__ */ jsx(EditIcon, {})
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(ArticleBody, { body: query.data.article.body }),
        /* @__PURE__ */ jsx(ArticleAttachments, { article: query.data.article })
      ] }, "article"),
      !((_a = settings.article) == null ? void 0 : _a.hide_new_ticket_link) && /* @__PURE__ */ jsx("div", { className: "my-50 border-y py-50", children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Have more questions? <a>Submit a request</a>",
          values: {
            a: (label) => /* @__PURE__ */ jsx(Link, { className: LinkStyle, to: "/hc/tickets/new", children: label })
          }
        }
      ) }),
      /* @__PURE__ */ jsx(ArticlePageFeedback, {})
    ] });
  }
  return /* @__PURE__ */ jsx(
    PageStatus,
    {
      query,
      show404: false,
      delayedSpinner: false,
      loader: /* @__PURE__ */ jsxs(m.div, { ...opacityAnimation, children: [
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", className: "h-20 max-w-580" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", className: "mb-30 mt-10 h-34 max-w-440" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "max-w-[95%]" }),
        /* @__PURE__ */ jsx(Skeleton, {}),
        /* @__PURE__ */ jsx(Skeleton, { className: "mb-30 max-w-[70%]" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "max-w-[90%]" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "max-w-[80%]" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "max-w-[30%]" })
      ] }, "skeletons")
    }
  );
}
function ArticleBody({ body }) {
  const bodyRef = useRef(null);
  useEffect(() => {
    if (bodyRef.current) {
      highlightAllCode(bodyRef.current);
    }
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "prose-headings:font-display prose-pre:bg-slate-900 prose max-w-none dark:prose-invert prose-headings:scroll-mt-112 prose-headings:font-normal prose-a:font-normal prose-a:text-primary prose-pre:rounded-xl prose-pre:shadow-lg dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-divider lg:prose-headings:scroll-mt-136", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref: bodyRef,
      className: "article-body whitespace-pre-wrap break-words",
      dangerouslySetInnerHTML: { __html: body }
    }
  ) });
}
function useCategory(loader) {
  const { categoryId, sectionId } = useParams();
  const id = sectionId || categoryId;
  return useQuery({
    queryKey: ["hc", "categories", id, loader],
    queryFn: () => fetchCategory(id, loader),
    initialData: () => {
      var _a, _b;
      const data = (_a = getBootstrapData().loaders) == null ? void 0 : _a[loader];
      if (((_b = data == null ? void 0 : data.category) == null ? void 0 : _b.id) == id) {
        return data;
      }
    }
  });
}
function fetchCategory(categoryId, loader) {
  return apiClient.get(`hc/categories/${categoryId}`, { params: { loader } }).then((response) => response.data);
}
function CategoryPage() {
  var _a, _b;
  const query = useCategory("categoryPage");
  const category = (_a = query.data) == null ? void 0 : _a.category;
  return /* @__PURE__ */ jsx(
    ArticlePageLayout,
    {
      leftSidenav: /* @__PURE__ */ jsx(HcSidenav, { sections: (_b = query.data) == null ? void 0 : _b.categoryNav }),
      categoryId: (category == null ? void 0 : category.is_section) ? category.parent_id : category == null ? void 0 : category.id,
      children: query.data ? /* @__PURE__ */ jsx(PageContent$1, { data: query.data }) : /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" }) })
    }
  );
}
function PageContent$1({ data }) {
  var _a;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-36", children: [
      /* @__PURE__ */ jsx(PageBreadcrumb, { category: data.category }),
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl tracking-tight", children: data.category.name })
    ] }),
    (_a = data.articles) == null ? void 0 : _a.map((article) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "mb-16 flex items-start gap-10 border-b pb-16",
        children: [
          /* @__PURE__ */ jsx(ArticleIcon, { size: "md", className: "mt-2 text-muted" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display mb-2 text-xl", children: /* @__PURE__ */ jsx(ArticleLink, { article }) }),
            /* @__PURE__ */ jsx(ArticlePath, { article, className: "text-sm text-muted" })
          ] })
        ]
      },
      article.id
    ))
  ] });
}
function PageBreadcrumb({ category }) {
  const navigate = useNavigate();
  const categories = [category];
  if (category.is_section && category.parent) {
    categories.unshift(category.parent);
  }
  return /* @__PURE__ */ jsxs(Breadcrumb, { size: "sm", className: "-ml-6", children: [
    /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc`), children: /* @__PURE__ */ jsx(Trans, { message: "Help center" }) }),
    categories.map((category2) => /* @__PURE__ */ jsx(
      BreadcrumbItem,
      {
        onSelected: () => navigate(getCategoryLink(category2)),
        children: /* @__PURE__ */ jsx(Trans, { message: category2.name })
      },
      category2.id
    ))
  ] });
}
function HcSearchPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Navbar, { menuPosition: "header", children: /* @__PURE__ */ jsx(HcSearchBar, {}) }),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-24 pb-48", children: [
      /* @__PURE__ */ jsxs(Breadcrumb, { size: "sm", className: "mb-48 mt-34", children: [
        /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc`), children: /* @__PURE__ */ jsx(Trans, { message: "Help center" }) }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(Trans, { message: "Search" }) })
      ] }),
      /* @__PURE__ */ jsx(PageContent, {})
    ] })
  ] });
}
function PageContent() {
  var _a;
  const searchLogger = useSearchTermLogger();
  const { query: searchTerm } = useParams();
  const query = useSearchArticles(searchTerm, { perPage: 30 });
  if (query.data) {
    if (query.data.pagination.data.length === 0) {
      return /* @__PURE__ */ jsx(
        IllustratedMessage,
        {
          className: "mt-48",
          image: /* @__PURE__ */ jsx(SvgImage, { src: searchImage }),
          title: /* @__PURE__ */ jsx(Trans, { message: "No articles match your search query" })
        }
      );
    }
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-34 text-3xl font-semibold", children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: `Showing :count results for ":query"`,
          values: {
            count: query.data.pagination.data.length,
            query: query.data.query
          }
        }
      ) }),
      (_a = query.data) == null ? void 0 : _a.pagination.data.map((article) => /* @__PURE__ */ jsxs("div", { className: "mb-14 flex items-start gap-12", children: [
        /* @__PURE__ */ jsx(ArticleIcon, { className: "mt-4 flex-shrink-0 text-muted" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-4 text-xl", children: /* @__PURE__ */ jsx(
            ArticleLink,
            {
              article,
              onClick: () => {
                searchLogger.updateLastSearch({ clickedArticle: true });
              }
            }
          ) }),
          /* @__PURE__ */ jsx(ArticlePath, { article, className: "text-sm text-muted" })
        ] })
      ] }, article.id))
    ] });
  }
  return /* @__PURE__ */ jsx(PageStatus, { query, show404: false, loaderIsScreen: false });
}
const TicketRoutes = React.lazy(
  () => import("./hc-ticket-routes-ccf774d3.mjs")
);
const RouteConfig = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(LandingPage, {})
  },
  {
    path: "/articles/:articleId/:articleSlug",
    element: /* @__PURE__ */ jsx(ArticlePage, {})
  },
  {
    path: "/articles/:categoryId/:sectionId/:articleId/:articleSlug",
    element: /* @__PURE__ */ jsx(ArticlePage, {})
  },
  {
    path: "/categories/:categoryId/:sectionId/:slug",
    element: /* @__PURE__ */ jsx(CategoryPage, {})
  },
  {
    path: "/categories/:categoryId/:slug",
    element: /* @__PURE__ */ jsx(CategoryPage, {})
  },
  {
    path: "/search/:query",
    element: /* @__PURE__ */ jsx(HcSearchPage, {})
  },
  {
    path: "tickets/*",
    element: /* @__PURE__ */ jsx(AuthRoute, { children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(TicketRoutes, {}) }) })
  },
  {
    path: "*",
    element: /* @__PURE__ */ jsx(NotFoundPage, {})
  }
];
function HcRoutes() {
  return useRoutes(RouteConfig);
}
const hcRoutes = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HcRoutes
}, Symbol.toStringTag, { value: "Module" }));
export {
  HcSearchBar as H,
  hcRoutes as h,
  useSearchTermLogger as u
};
//# sourceMappingURL=hc-routes-75b349d5.mjs.map
