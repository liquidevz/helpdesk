import { jsxs, jsx } from "react/jsx-runtime";
import React, { useRef, useCallback, cloneElement } from "react";
import { useValueEffect, useResizeObserver, useLayoutEffect } from "@react-aria/utils";
import clsx from "clsx";
import { e as useTrans, W as MenuTrigger, I as IconButton, Y as Menu, i as Item } from "../server-entry.mjs";
import { C as ChevronRightIcon, M as MoreHorizIcon } from "./Edit-7ad4ec30.mjs";
function BreadcrumbItem(props) {
  const {
    isCurrent,
    sizeStyle: sizeStyle2,
    isMenuTrigger,
    isClickable,
    isDisabled,
    onSelected,
    className,
    isMenuItem,
    isLink
  } = props;
  const children = typeof props.children === "function" ? props.children({ isMenuItem }) : props.children;
  if (isMenuItem) {
    return children;
  }
  const domProps = isMenuTrigger ? {} : {
    tabIndex: isLink && !isDisabled ? 0 : void 0,
    role: isLink ? "link" : void 0,
    "aria-disabled": isLink ? isDisabled : void 0,
    "aria-current": isCurrent && isLink ? "page" : void 0,
    onClick: () => onSelected == null ? void 0 : onSelected()
  };
  return /* @__PURE__ */ jsxs(
    "li",
    {
      className: clsx(
        `relative inline-flex min-w-0 flex-shrink-0 items-center justify-start ${sizeStyle2 == null ? void 0 : sizeStyle2.font}`,
        (!isClickable || isDisabled) && "pointer-events-none",
        !isCurrent && isDisabled && "text-disabled"
      ),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ...domProps,
            className: clsx(
              className,
              "cursor-pointer overflow-hidden whitespace-nowrap rounded px-8",
              !isMenuTrigger && "py-4 hover:bg-hover",
              !isMenuTrigger && isLink && "outline-none focus-visible:ring"
            ),
            children
          }
        ),
        isCurrent === false && /* @__PURE__ */ jsx(
          ChevronRightIcon,
          {
            size: sizeStyle2 == null ? void 0 : sizeStyle2.icon,
            className: clsx(isDisabled ? "text-disabled" : "text-muted")
          }
        )
      ]
    }
  );
}
const MIN_VISIBLE_ITEMS = 1;
const MAX_VISIBLE_ITEMS = 10;
function Breadcrumb(props) {
  const {
    size = "md",
    children,
    isDisabled,
    className,
    currentIsClickable,
    isNavigation
  } = props;
  const { trans } = useTrans();
  const style = sizeStyle(size);
  const childArray = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      childArray.push(child);
    }
  });
  const domRef = useRef(null);
  const listRef = useRef(null);
  const [visibleItems, setVisibleItems] = useValueEffect(childArray.length);
  const updateOverflow = useCallback(() => {
    const computeVisibleItems = (itemCount) => {
      var _a;
      const currListRef = listRef.current;
      if (!currListRef) {
        return;
      }
      const listItems = Array.from(currListRef.children);
      if (!listItems.length)
        return;
      const containerWidth = currListRef.offsetWidth;
      const isShowingMenu = childArray.length > itemCount;
      let calculatedWidth = 0;
      let newVisibleItems = 0;
      let maxVisibleItems = MAX_VISIBLE_ITEMS;
      calculatedWidth += listItems.shift().offsetWidth;
      newVisibleItems++;
      if (isShowingMenu) {
        calculatedWidth += ((_a = listItems.shift()) == null ? void 0 : _a.offsetWidth) ?? 0;
        maxVisibleItems--;
      }
      if (calculatedWidth >= containerWidth) {
        newVisibleItems--;
      }
      if (listItems.length > 0) {
        const last = listItems.pop();
        last.style.overflow = "visible";
        calculatedWidth += last.offsetWidth;
        if (calculatedWidth < containerWidth) {
          newVisibleItems++;
        }
        last.style.overflow = "";
      }
      for (const breadcrumb of listItems.reverse()) {
        calculatedWidth += breadcrumb.offsetWidth;
        if (calculatedWidth < containerWidth) {
          newVisibleItems++;
        }
      }
      return Math.max(
        MIN_VISIBLE_ITEMS,
        Math.min(maxVisibleItems, newVisibleItems)
      );
    };
    setVisibleItems(function* () {
      yield childArray.length;
      const newVisibleItems = computeVisibleItems(childArray.length);
      yield newVisibleItems;
      if (newVisibleItems < childArray.length && newVisibleItems > 1) {
        yield computeVisibleItems(newVisibleItems);
      }
    });
  }, [listRef, children, setVisibleItems]);
  useResizeObserver({ ref: domRef, onResize: updateOverflow });
  useLayoutEffect(updateOverflow, [children]);
  let contents = childArray;
  if (childArray.length > visibleItems) {
    const selectedKey = childArray.length - 1;
    const menuItem = /* @__PURE__ */ jsx(BreadcrumbItem, { sizeStyle: style, isMenuTrigger: true, children: /* @__PURE__ */ jsxs(MenuTrigger, { selectionMode: "single", selectedValue: selectedKey, children: [
      /* @__PURE__ */ jsx(IconButton, { "aria-label": "…", disabled: isDisabled, size: style.btn, children: /* @__PURE__ */ jsx(MoreHorizIcon, {}) }),
      /* @__PURE__ */ jsx(Menu, { children: childArray.map((child, index) => {
        const isLast = selectedKey === index;
        return /* @__PURE__ */ jsx(
          Item,
          {
            value: index,
            onSelected: () => {
              var _a, _b;
              if (!isLast) {
                (_b = (_a = child.props).onSelected) == null ? void 0 : _b.call(_a);
              }
            },
            children: cloneElement(child, { isMenuItem: true })
          },
          index
        );
      }) })
    ] }) }, "menu");
    contents = [menuItem];
    const breadcrumbs = [...childArray];
    let endItems = visibleItems;
    if (visibleItems > 1) {
      contents.unshift(breadcrumbs.shift());
      endItems--;
    }
    contents.push(...breadcrumbs.slice(-endItems));
  }
  const lastIndex = contents.length - 1;
  const breadcrumbItems = contents.map((child, index) => {
    const isCurrent = index === lastIndex;
    const isClickable = !isCurrent || currentIsClickable;
    return cloneElement(child, {
      key: child.key || index,
      isCurrent,
      sizeStyle: style,
      isClickable,
      isDisabled,
      isLink: isNavigation && child.key !== "menu"
    });
  });
  const Element = isNavigation ? "nav" : "div";
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: clsx(className, "w-full min-w-0"),
      "aria-label": trans({ message: "Breadcrumbs" }),
      ref: domRef,
      children: /* @__PURE__ */ jsx(
        "ol",
        {
          ref: listRef,
          className: clsx("flex flex-nowrap justify-start", style.minHeight),
          children: breadcrumbItems
        }
      )
    }
  );
}
function sizeStyle(size) {
  switch (size) {
    case "sm":
      return { font: "text-sm", icon: "sm", btn: "sm", minHeight: "min-h-36" };
    case "lg":
      return { font: "text-lg", icon: "md", btn: "md", minHeight: "min-h-42" };
    case "xl":
      return { font: "text-xl", icon: "md", btn: "md", minHeight: "min-h-42" };
    default:
      return { font: "text-base", icon: "md", btn: "md", minHeight: "min-h-42" };
  }
}
export {
  Breadcrumb as B,
  BreadcrumbItem as a
};
//# sourceMappingURL=breadcrumb-093d993c.mjs.map
