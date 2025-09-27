import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect, forwardRef } from "react";
import clsx from "clsx";
import { as as useCallbackRef, ae as ButtonBase, S as SearchIcon } from "../server-entry.mjs";
import { useGlobalListeners } from "@react-aria/utils";
import { i as isCtrlKeyPressed } from "./search-9f6b7ed0.mjs";
function isAnyInputFocused(doc) {
  if (!doc) {
    doc = document;
  }
  return doc.activeElement ? ["INPUT", "TEXTAREA"].includes(doc.activeElement.tagName) || doc.activeElement.isContentEditable : false;
}
function useKeybind(el, shortcut, userCallback, { allowedInputSelector } = {}) {
  const { addGlobalListener, removeAllGlobalListeners } = useGlobalListeners();
  const callback = useCallbackRef(userCallback);
  useEffect(() => {
    const target = el === "window" ? window : el;
    addGlobalListener(target, "keydown", (e) => {
      if (!shouldIgnoreActiveEl(allowedInputSelector) && isAnyInputFocused()) {
        return;
      }
      const matches = shortcut.split("+").every((key) => {
        if (key === "ctrl") {
          return isCtrlKeyPressed(e);
        } else {
          return e.key === key;
        }
      });
      if (matches) {
        e.preventDefault();
        e.stopPropagation();
        callback(e);
      }
    });
    return removeAllGlobalListeners;
  }, [
    addGlobalListener,
    shortcut,
    removeAllGlobalListeners,
    callback,
    el,
    allowedInputSelector
  ]);
}
function shouldIgnoreActiveEl(selector) {
  if (!selector || !document.activeElement) {
    return false;
  }
  return document.activeElement.closest(selector);
}
const ignoredElements = ["INPUT", "TEXTAREA", "SELECT", "BUTTON"];
const SearchTriggerButton = forwardRef(
  ({
    onTrigger,
    size,
    children,
    bg,
    width,
    radius = "rounded-input",
    className,
    onClick,
    ...buttonProps
  }, ref) => {
    useKeybind("window", "ctrl+k", (e) => {
      if (!ignoredElements.includes((e == null ? void 0 : e.target).tagName)) {
        onTrigger();
      }
    });
    return /* @__PURE__ */ jsxs(
      ButtonBase,
      {
        ref,
        ...buttonProps,
        display: "block",
        onClick: (e) => onTrigger(),
        justify: "justify-none",
        className: "flex-shrink-0",
        children: [
          /* @__PURE__ */ jsxs(
            "span",
            {
              className: clsx(
                "hidden items-center border bg-background text-muted shadow-sm transition-shadow focus:border-primary/60 focus:outline-none focus:ring focus:ring-primary/focus md:flex",
                size === "sm" && "h-36 gap-6 px-12 text-sm",
                size === "lg" && "text-md h-60 gap-12 px-24",
                bg,
                width,
                radius,
                className
              ),
              children: [
                /* @__PURE__ */ jsx(
                  SearchIcon,
                  {
                    className: "text-muted",
                    size: size === "sm" ? "sm" : "md"
                  }
                ),
                /* @__PURE__ */ jsx("span", { children }),
                /* @__PURE__ */ jsxs("kbd", { className: "ml-auto hidden font-medium md:block", children: [
                  /* @__PURE__ */ jsx("kbd", { className: "font-sans", children: "⌘" }),
                  /* @__PURE__ */ jsx("kbd", { className: "font-sans", children: "K" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "focus:border-primary/60 focus:outline-none focus:ring focus:ring-primary/focus md:hidden", children: /* @__PURE__ */ jsx(SearchIcon, {}) })
        ]
      }
    );
  }
);
export {
  SearchTriggerButton as S,
  useKeybind as u
};
//# sourceMappingURL=search-trigger-button-2521a5b9.mjs.map
