import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { u as useAdminReport, R as ReportDateSelector, A as AdminHeaderReport, V as VisitorsReportCharts } from "./admin-routes-31100799.mjs";
import { aC as StaticPageTitle, T as Trans } from "../server-entry.mjs";
import { R as DateRangePresets } from "./search-report-table-9acf0fea.mjs";
import "react-router-dom";
import "clsx";
import "./search-9f6b7ed0.mjs";
import "framer-motion";
import "@react-stately/utils";
import "@react-aria/utils";
import "@tanstack/react-query";
import "./section-helper-914c12d5.mjs";
import "./reply-editor-0dd9f156.mjs";
import "@react-aria/focus";
import "@react-aria/interactions";
import "@internationalized/date";
import "just-debounce-it";
import "./Edit-7ad4ec30.mjs";
import "react-hook-form";
import "zustand";
import "zustand/middleware";
import "zustand/middleware/immer";
import "deepmerge";
import "nanoid";
import "immer";
import "deep-object-diff";
import "dot-object";
import "@react-stately/color";
import "react-colorful";
import "nano-memoize";
import "./breadcrumb-093d993c.mjs";
import "@tanstack/react-virtual";
import "./OpenInNew-0b085879.mjs";
import "./bullet-seprated-items-77fb8967.mjs";
import "react-dom";
import "react-dom/server";
import "process";
import "http";
import "axios";
import "react-router-dom/server.mjs";
import "@internationalized/number";
import "@floating-ui/react-dom";
import "react-merge-refs";
import "@react-aria/ssr";
import "axios-retry";
import "tus-js-client";
import "mime-match";
import "react-use-clipboard";
import "slugify";
function AdminReportPage() {
  const [dateRange, setDateRange] = useState(() => {
    return DateRangePresets[2].getRangeValue();
  });
  const { isLoading, data } = useAdminReport({ dateRange });
  const title = /* @__PURE__ */ jsx(Trans, { message: "Visitors report" });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-full gap-12 overflow-x-hidden p-12 md:gap-24 md:p-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-24 items-center justify-between gap-24 md:flex", children: [
      /* @__PURE__ */ jsx(StaticPageTitle, { children: title }),
      /* @__PURE__ */ jsx("h1", { className: "mb-24 text-3xl font-light md:mb-0", children: title }),
      /* @__PURE__ */ jsx(ReportDateSelector, { value: dateRange, onChange: setDateRange })
    ] }),
    /* @__PURE__ */ jsx(AdminHeaderReport, { report: data == null ? void 0 : data.headerReport }),
    /* @__PURE__ */ jsx(
      VisitorsReportCharts,
      {
        report: data == null ? void 0 : data.visitorsReport,
        isLoading
      }
    )
  ] });
}
export {
  AdminReportPage as default
};
//# sourceMappingURL=admin-report-page-0a4d73eb.mjs.map
