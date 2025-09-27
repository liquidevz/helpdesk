import { jsxs, jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { I as IconButton, C as CloseIcon } from "../server-entry.mjs";
function SectionHelper({
  title,
  description,
  actions,
  color = "primary",
  className,
  size = "md",
  leadingIcon,
  onClose
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "rounded-panel px-10 pb-10",
        leadingIcon || onClose ? "py-4" : "py-10",
        size === "sm" ? "text-xs" : "text-sm",
        color === "positive" && "bg-positive/focus",
        color === "warning" && "bg-warning/focus",
        color === "danger" && "bg-danger/focus",
        color === "primary" && "bg-primary/focus",
        color === "neutral" && "border bg",
        color === "bgAlt" && "border bg-alt"
      ),
      children: [
        title && /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-6", children: [
          leadingIcon,
          /* @__PURE__ */ jsx("div", { className: "font-medium", children: title }),
          onClose ? /* @__PURE__ */ jsx(IconButton, { size: "xs", className: "ml-auto", onClick: () => onClose(), children: /* @__PURE__ */ jsx(CloseIcon, {}) }) : null
        ] }),
        description && /* @__PURE__ */ jsx("div", { children: description }),
        actions && /* @__PURE__ */ jsx("div", { className: "mt-14", children: actions })
      ]
    }
  );
}
export {
  SectionHelper as S
};
//# sourceMappingURL=section-helper-914c12d5.mjs.map
