import { jsxs, jsx } from "react/jsx-runtime";
import SwaggerUI from "swagger-ui-react";
import { useMemo } from "react";
import { a as useSettings, N as Navbar, bv as Footer } from "../server-entry.mjs";
import "react-dom/server";
import "process";
import "http";
import "@tanstack/react-query";
import "axios";
import "react-router-dom/server.mjs";
import "framer-motion";
import "react-hook-form";
import "@react-aria/utils";
import "clsx";
import "nano-memoize";
import "@internationalized/number";
import "@internationalized/date";
import "zustand";
import "zustand/middleware/immer";
import "nanoid";
import "@react-aria/focus";
import "@floating-ui/react-dom";
import "react-merge-refs";
import "react-dom";
import "immer";
import "react-router-dom";
import "@react-stately/utils";
import "@react-aria/ssr";
import "deepmerge";
import "axios-retry";
import "tus-js-client";
import "mime-match";
import "react-use-clipboard";
import "slugify";
const swaggerUi = "";
function SwaggerApiDocsPage() {
  const settings = useSettings();
  const plugins = useMemo(() => {
    return getPluginsConfig(settings);
  }, [settings]);
  return /* @__PURE__ */ jsxs("div", { className: "h-full overflow-y-auto bg-alt", children: [
    /* @__PURE__ */ jsx(Navbar, { size: "sm" }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsx(
        SwaggerUI,
        {
          url: `${settings.base_url}/swagger.yaml`,
          plugins,
          onComplete: (system) => {
            var _a;
            const hash = location.hash.slice(1);
            if (hash) {
              const el = document.querySelector(
                `#operations-${hash.replace(/\//g, "-")}`
              );
              if (el) {
                el.scrollIntoView();
                (_a = el.querySelector("button")) == null ? void 0 : _a.click();
              }
            }
          }
        }
      ),
      /* @__PURE__ */ jsx(Footer, { className: "px-20" })
    ] })
  ] });
}
function getPluginsConfig(settings) {
  return [
    {
      statePlugins: {
        spec: {
          wrapActions: {
            updateSpec: (oriAction) => {
              return (spec) => {
                spec = spec.replaceAll(
                  "SITE_NAME",
                  settings.branding.site_name.replace(":", "")
                );
                spec = spec.replaceAll("SITE_URL", settings.base_url);
                return oriAction(spec);
              };
            },
            // Add current server url to docs
            updateJsonSpec: (oriAction) => {
              return (spec) => {
                spec.servers = [{ url: `${settings.base_url}/api/v1` }];
                return oriAction(spec);
              };
            }
          }
        }
      }
    }
  ];
}
export {
  SwaggerApiDocsPage as default
};
//# sourceMappingURL=swagger-api-docs-page-710e19de.mjs.map
