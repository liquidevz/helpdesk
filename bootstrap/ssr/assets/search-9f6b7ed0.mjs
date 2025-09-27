import { createContext, useRef, useEffect, memo, Fragment, useMemo, useCallback, useContext, cloneElement } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { aX as prettyBytes, b5 as useMediaQuery, ah as getFromLocalStorage, au as setInLocalStorage, bu as Underlay, V as createSvgIcon, N as Navbar, I as IconButton } from "../server-entry.mjs";
import { AnimatePresence, m } from "framer-motion";
import { useControlledState } from "@react-stately/utils";
import clsx from "clsx";
import { isMac } from "@react-aria/utils";
const DashboardLayoutContext = createContext(
  null
);
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
const FormattedBytes = memo(({ bytes }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: prettyBytes(bytes) });
});
function useBlockBodyOverflow(disable = false) {
  useEffect(() => {
    if (disable) {
      document.documentElement.classList.remove("no-page-overflow");
    } else {
      document.documentElement.classList.add("no-page-overflow");
    }
    return () => {
      document.documentElement.classList.remove("no-page-overflow");
    };
  }, [disable]);
}
function DashboardLayout({
  children,
  leftSidenavStatus: leftSidenav,
  onLeftSidenavChange,
  rightSidenavStatus: rightSidenav,
  initialRightSidenavStatus,
  onRightSidenavChange,
  name,
  leftSidenavCanBeCompact,
  height = "h-screen",
  className,
  gridClassName = "dashboard-grid",
  blockBodyOverflow = true,
  ...domProps
}) {
  useBlockBodyOverflow(!blockBodyOverflow);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isCompactModeInitially = useMemo(() => {
    return !name ? false : getFromLocalStorage(`${name}.sidenav.compact`);
  }, [name]);
  const defaultLeftSidenavStatus = isCompactModeInitially ? "compact" : "open";
  const [leftSidenavStatus, setLeftSidenavStatus] = useControlledState(
    leftSidenav,
    isMobile ? "closed" : defaultLeftSidenavStatus,
    onLeftSidenavChange
  );
  const rightSidenavStatusDefault = useMemo(() => {
    if (isMobile) {
      return "closed";
    }
    if (initialRightSidenavStatus != null) {
      return initialRightSidenavStatus;
    }
    const userSelected = getFromLocalStorage(
      `${name}.sidenav.right.position`,
      "open"
    );
    if (userSelected != null) {
      return userSelected;
    }
    return initialRightSidenavStatus || "closed";
  }, [isMobile, name, initialRightSidenavStatus]);
  const [rightSidenavStatus, _setRightSidenavStatus] = useControlledState(
    rightSidenav,
    rightSidenavStatusDefault,
    onRightSidenavChange
  );
  const setRightSidenavStatus = useCallback(
    (status) => {
      _setRightSidenavStatus(status);
      setInLocalStorage(`${name}.sidenav.right.position`, status);
    },
    [_setRightSidenavStatus, name]
  );
  const shouldShowUnderlay = isMobile && (leftSidenavStatus === "open" || rightSidenavStatus === "open");
  return /* @__PURE__ */ jsx(
    DashboardLayoutContext.Provider,
    {
      value: {
        leftSidenavStatus,
        setLeftSidenavStatus,
        rightSidenavStatus,
        setRightSidenavStatus,
        leftSidenavCanBeCompact,
        name,
        isMobileMode: isMobile
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ...domProps,
          className: clsx("relative isolate", gridClassName, className, height),
          children: [
            children,
            /* @__PURE__ */ jsx(AnimatePresence, { children: shouldShowUnderlay && /* @__PURE__ */ jsx(
              Underlay,
              {
                position: "fixed",
                onClick: () => {
                  setLeftSidenavStatus("closed");
                  setRightSidenavStatus("closed");
                }
              },
              "dashboard-underlay"
            ) })
          ]
        }
      )
    }
  );
}
const MenuOpenIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z" }),
  "MenuOpenOutlined"
);
function DashboardNavbar({
  children,
  className,
  hideToggleButton,
  ...props
}) {
  const {
    isMobileMode,
    leftSidenavStatus,
    setLeftSidenavStatus,
    name,
    leftSidenavCanBeCompact
  } = useContext(DashboardLayoutContext);
  const shouldToggleCompactMode = leftSidenavCanBeCompact && !isMobileMode;
  const shouldShowToggle = !hideToggleButton && (isMobileMode || leftSidenavCanBeCompact);
  const handleToggle = () => {
    setLeftSidenavStatus(leftSidenavStatus === "open" ? "closed" : "open");
  };
  const handleCompactModeToggle = () => {
    const newStatus = leftSidenavStatus === "compact" ? "open" : "compact";
    setInLocalStorage(`${name}.sidenav.compact`, newStatus === "compact");
    setLeftSidenavStatus(newStatus);
  };
  return /* @__PURE__ */ jsx(
    Navbar,
    {
      className: clsx("dashboard-grid-navbar", className),
      border: "border-b",
      size: "sm",
      toggleButton: shouldShowToggle ? /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "md",
          onClick: () => {
            if (shouldToggleCompactMode) {
              handleCompactModeToggle();
            } else {
              handleToggle();
            }
          },
          children: /* @__PURE__ */ jsx(MenuOpenIcon, {})
        }
      ) : void 0,
      ...props,
      children
    }
  );
}
function DashboardContent({
  children,
  isScrollable = true
}) {
  return cloneElement(children, {
    className: clsx(
      children.props.className,
      isScrollable && "overflow-y-auto stable-scrollbar",
      "dashboard-grid-content"
    )
  });
}
function DashboardSidenav({
  className,
  position,
  children,
  size = "md",
  mode,
  overlayPosition = "fixed",
  display = "flex",
  overflow = "overflow-hidden",
  forceClosed = false
}) {
  const {
    isMobileMode,
    leftSidenavStatus,
    setLeftSidenavStatus,
    rightSidenavStatus,
    setRightSidenavStatus
  } = useContext(DashboardLayoutContext);
  const status = position === "left" ? leftSidenavStatus : rightSidenavStatus;
  const isOverlayMode = isMobileMode || mode === "overlay";
  const variants = {
    open: { display, width: null },
    compact: {
      display,
      width: null
    },
    closed: {
      width: 0,
      transitionEnd: {
        display: "none"
      }
    }
  };
  const sizeClassName = getSize(status === "compact" ? "compact" : size);
  return /* @__PURE__ */ jsx(
    m.div,
    {
      variants,
      initial: false,
      animate: forceClosed ? "closed" : status,
      transition: { type: "tween", duration: 0.15 },
      onClick: (e) => {
        const target = e.target;
        if (isMobileMode && (target.closest("button") || target.closest("a"))) {
          setLeftSidenavStatus("closed");
          setRightSidenavStatus("closed");
        }
      },
      className: clsx(
        className,
        position === "left" ? "dashboard-grid-sidenav-left" : "dashboard-grid-sidenav-right",
        "will-change-[width]",
        overflow,
        sizeClassName,
        isOverlayMode && `${overlayPosition} bottom-0 top-0 z-20 shadow-2xl`,
        isOverlayMode && position === "left" && "left-0",
        isOverlayMode && position === "right" && "right-0"
      ),
      children: cloneElement(children, {
        className: clsx(
          children.props.className,
          "w-full h-full",
          status === "compact" && "compact-scrollbar"
        ),
        isCompactMode: status === "compact"
      })
    }
  );
}
function getSize(size) {
  switch (size) {
    case "compact":
      return "w-80";
    case "sm":
      return "w-224";
    case "md":
      return "w-240";
    case "lg":
      return "w-288";
    default:
      return size || "";
  }
}
function isCtrlKeyPressed(e) {
  if (isMac()) {
    return e.metaKey;
  }
  return e.ctrlKey;
}
const searchImage = "/assets/search-23f1a0a1.svg";
export {
  DashboardLayoutContext as D,
  FormattedBytes as F,
  MenuOpenIcon as M,
  DashboardLayout as a,
  DashboardNavbar as b,
  DashboardSidenav as c,
  DashboardContent as d,
  isCtrlKeyPressed as i,
  searchImage as s,
  usePrevious as u
};
//# sourceMappingURL=search-9f6b7ed0.mjs.map
