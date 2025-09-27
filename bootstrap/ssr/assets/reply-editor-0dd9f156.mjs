import { jsx, jsxs } from "react/jsx-runtime";
import { aN as useIsMobileMediaQuery, bs as useNumberFormatter, aO as SelectForwardRef, T as Trans, i as Item, I as IconButton, aA as KeyboardArrowLeftIcon, az as KeyboardArrowRightIcon, b7 as createEventHandler, u as useIsDarkMode, w as Skeleton, bb as Checkbox, e as useTrans, V as createSvgIcon, bC as AvatarPlaceholderIcon, U as Tooltip, bn as useUserTimezone, E as IllustratedMessage, F as SvgImage, bD as UploadedFile, q as opacityAnimation, as as useCallbackRef, bc as useFileUploadStore, R as toast, a as useSettings, bE as isAbsoluteUrl, B as Button, aE as ProgressCircle, n as apiClient, b5 as useMediaQuery, C as CloseIcon, b as Dialog, d as useDialogContext, aP as ProgressBar, D as DialogTrigger, Z as DialogHeader, c as DialogBody, ad as Form, al as FormTextField, am as FormSelect, _ as DialogFooter, bF as useActiveUpload, b1 as UploadInputType, bG as Disk, W as MenuTrigger, Y as Menu, aR as openUploadWindow } from "../server-entry.mjs";
import clsx from "clsx";
import React, { createContext, useContext, useMemo, useRef, useState, useCallback, cloneElement, Fragment, Children, isValidElement, forwardRef, useLayoutEffect, useEffect, Suspense } from "react";
import { useControlledState } from "@react-stately/utils";
import { getFocusableTreeWalker } from "@react-aria/focus";
import { focusWithoutScrolling, useGlobalListeners, useObjectRef, mergeProps } from "@react-aria/utils";
import { i as isCtrlKeyPressed, F as FormattedBytes } from "./search-9f6b7ed0.mjs";
import { useInteractOutside } from "@react-aria/interactions";
import { AnimatePresence, m } from "framer-motion";
import { Link } from "react-router-dom";
import { now } from "@internationalized/date";
import debounce from "just-debounce-it";
import { C as ChevronRightIcon } from "./Edit-7ad4ec30.mjs";
import { useForm } from "react-hook-form";
function hasNextPage(pagination) {
  if ("next_cursor" in pagination) {
    return pagination.next_cursor != null;
  }
  if ("last_page" in pagination) {
    return pagination.current_page < pagination.last_page;
  }
  return pagination.data.length > 0 && pagination.data.length >= pagination.per_page;
}
const defaultPerPage = 15;
const perPageOptions = [{ key: 10 }, { key: 15 }, { key: 20 }, { key: 50 }, { key: 100 }];
function DataTablePaginationFooter({
  query,
  onPerPageChange,
  onPageChange,
  className
}) {
  var _a;
  const isMobile = useIsMobileMediaQuery();
  const numberFormatter = useNumberFormatter();
  const pagination = (_a = query.data) == null ? void 0 : _a.pagination;
  if (!pagination)
    return null;
  const perPageSelect = onPerPageChange ? /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      minWidth: "min-w-auto",
      selectionMode: "single",
      disabled: query.isLoading,
      labelPosition: "side",
      size: "xs",
      label: /* @__PURE__ */ jsx(Trans, { message: "Items per page" }),
      selectedValue: pagination.per_page || defaultPerPage,
      onSelectionChange: (value) => onPerPageChange(value),
      children: perPageOptions.map((option) => /* @__PURE__ */ jsx(Item, { value: option.key, children: option.key }, option.key))
    }
  ) : null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex h-54 select-none items-center justify-end gap-20 px-20",
        className
      ),
      children: [
        !isMobile && perPageSelect,
        pagination.from && pagination.to && "total" in pagination ? /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: ":from - :to of :total",
            values: {
              from: pagination.from,
              to: pagination.to,
              total: numberFormatter.format(pagination.total)
            }
          }
        ) }) : null,
        /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              disabled: query.isFetching || pagination.current_page < 2,
              onClick: () => {
                onPageChange == null ? void 0 : onPageChange((pagination == null ? void 0 : pagination.current_page) - 1);
              },
              children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              disabled: query.isFetching || !hasNextPage(pagination),
              onClick: () => {
                onPageChange == null ? void 0 : onPageChange((pagination == null ? void 0 : pagination.current_page) + 1);
              },
              children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
            }
          )
        ] })
      ]
    }
  );
}
function useGridNavigation(props) {
  const { cellCount, rowCount } = props;
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        focusSiblingCell(e, { cell: { op: "decrement" } }, props);
        break;
      case "ArrowRight":
        focusSiblingCell(e, { cell: { op: "increment" } }, props);
        break;
      case "ArrowUp":
        focusSiblingCell(e, { row: { op: "decrement" } }, props);
        break;
      case "ArrowDown":
        focusSiblingCell(e, { row: { op: "increment" } }, props);
        break;
      case "PageUp":
        focusSiblingCell(e, { row: { op: "decrement", count: 5 } }, props);
        break;
      case "PageDown":
        focusSiblingCell(e, { row: { op: "increment", count: 5 } }, props);
        break;
      case "Tab":
        focusFirstElementAfterGrid(e);
        break;
      case "Home":
        if (isCtrlKeyPressed(e)) {
          focusSiblingCell(
            e,
            {
              row: { op: "decrement", count: rowCount },
              cell: { op: "decrement", count: cellCount }
            },
            props
          );
        } else {
          focusSiblingCell(
            e,
            { cell: { op: "decrement", count: cellCount } },
            props
          );
        }
        break;
      case "End":
        if (isCtrlKeyPressed(e)) {
          focusSiblingCell(
            e,
            {
              row: { op: "increment", count: rowCount },
              cell: { op: "increment", count: cellCount }
            },
            props
          );
        } else {
          focusSiblingCell(
            e,
            { cell: { op: "increment", count: cellCount } },
            props
          );
        }
        break;
    }
  };
  return { onKeyDown };
}
function focusSiblingCell(e, operations, { cellCount, rowCount }) {
  var _a, _b, _c, _d, _e, _f, _g;
  if (((_a = document.activeElement) == null ? void 0 : _a.tagName) === "input")
    return;
  e.preventDefault();
  const grid = e.currentTarget;
  const currentCell = e.target.closest("[aria-colindex]");
  if (!currentCell || !grid)
    return;
  const row = currentCell.closest("[aria-rowindex]");
  if (!row)
    return;
  let rowIndex = parseInt(row.getAttribute("aria-rowindex"));
  let cellIndex = parseInt(currentCell.getAttribute("aria-colindex"));
  if (Number.isNaN(rowIndex) || Number.isNaN(cellIndex))
    return;
  const rowOpCount = ((_b = operations.row) == null ? void 0 : _b.count) ?? 1;
  if (((_c = operations.row) == null ? void 0 : _c.op) === "increment") {
    rowIndex = Math.min(rowCount, rowIndex + rowOpCount);
  } else if (((_d = operations.row) == null ? void 0 : _d.op) === "decrement") {
    rowIndex = Math.max(1, rowIndex - rowOpCount);
  }
  const cellOpCount = ((_e = operations.cell) == null ? void 0 : _e.count) ?? 1;
  if (((_f = operations.cell) == null ? void 0 : _f.op) === "increment") {
    cellIndex = Math.min(cellCount, cellIndex + cellOpCount);
  } else if (((_g = operations.cell) == null ? void 0 : _g.op) === "decrement") {
    cellIndex = Math.max(1, cellIndex - cellOpCount);
  }
  const nextCell = grid.querySelector(
    `[aria-rowindex="${rowIndex}"] [aria-colindex="${cellIndex}"]`
  );
  if (!nextCell)
    return;
  const walker = getFocusableTreeWalker(nextCell);
  const nextFocusableElement = walker.nextNode() || nextCell;
  currentCell.setAttribute("tabindex", "-1");
  nextFocusableElement.setAttribute("tabindex", "0");
  nextFocusableElement.focus();
}
function focusFirstElementAfterGrid(e) {
  const grid = e.currentTarget;
  if (e.shiftKey) {
    grid.focus();
  } else {
    const walker = getFocusableTreeWalker(grid, { tabbable: true });
    let next;
    let last;
    do {
      last = walker.lastChild();
      if (last) {
        next = last;
      }
    } while (last);
    if (next && !next.contains(document.activeElement)) {
      focusWithoutScrolling(next);
    }
  }
}
const TableContext = createContext(null);
function useTableCellStyle({ index, isHeader }) {
  const {
    columns,
    cellHeight = "h-46",
    headerCellHeight = "h-46"
  } = useContext(TableContext);
  const column = columns[index];
  const userPadding = column == null ? void 0 : column.padding;
  let justify = "justify-start";
  if ((column == null ? void 0 : column.align) === "center") {
    justify = "justify-center";
  } else if ((column == null ? void 0 : column.align) === "end") {
    justify = "justify-end";
  }
  return clsx(
    "flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis outline-none focus-visible:outline focus-visible:outline-offset-2",
    isHeader ? headerCellHeight : cellHeight,
    (column == null ? void 0 : column.width) ?? "flex-1",
    column == null ? void 0 : column.maxWidth,
    column == null ? void 0 : column.minWidth,
    justify,
    userPadding,
    column == null ? void 0 : column.className
  );
}
function TableCell({
  rowIndex,
  rowIsHovered,
  index,
  item,
  id
}) {
  const { columns } = useContext(TableContext);
  const column = columns[index];
  const rowContext = useMemo(() => {
    return {
      index: rowIndex,
      isHovered: rowIsHovered,
      isPlaceholder: item.isPlaceholder
    };
  }, [rowIndex, rowIsHovered, item.isPlaceholder]);
  const style = useTableCellStyle({
    index,
    isHeader: false
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      tabIndex: -1,
      role: "gridcell",
      "aria-colindex": index + 1,
      id,
      className: style,
      children: /* @__PURE__ */ jsx("div", { className: "overflow-x-hidden overflow-ellipsis min-w-0 w-full", children: column.body(item, rowContext) })
    }
  );
}
function usePointerEvents({
  onMoveStart,
  onMove,
  onMoveEnd,
  minimumMovement = 0,
  preventDefault,
  stopPropagation = true,
  onPress,
  onLongPress,
  ...props
}) {
  const stateRef = useRef({
    lastPosition: { x: 0, y: 0 },
    started: false,
    longPressTriggered: false
  });
  const state = stateRef.current;
  const { addGlobalListener, removeGlobalListener } = useGlobalListeners();
  const start = (e) => {
    if (!state.el)
      return;
    const result = onMoveStart == null ? void 0 : onMoveStart(e, state.el);
    if (result === false)
      return;
    state.originalTouchAction = state.el.style.touchAction;
    state.el.style.touchAction = "none";
    state.originalUserSelect = document.documentElement.style.userSelect;
    document.documentElement.style.userSelect = "none";
    state.started = true;
  };
  const onPointerDown = (e) => {
    var _a;
    if (e.button === 0 && state.id == null) {
      state.started = false;
      const result = (_a = props.onPointerDown) == null ? void 0 : _a.call(props, e);
      if (result === false)
        return;
      if (stopPropagation) {
        e.stopPropagation();
      }
      if (preventDefault) {
        e.preventDefault();
      }
      state.id = e.pointerId;
      state.el = e.currentTarget;
      state.lastPosition = { x: e.clientX, y: e.clientY };
      if (onLongPress) {
        state.longPressTimer = setTimeout(() => {
          onLongPress(e, state.el);
          state.longPressTriggered = true;
        }, 400);
      }
      if (onMoveStart || onMove) {
        addGlobalListener(window, "pointermove", onPointerMove, false);
      }
      addGlobalListener(window, "pointerup", onPointerUp, false);
      addGlobalListener(window, "pointercancel", onPointerUp, false);
    }
  };
  const onPointerMove = (e) => {
    if (e.pointerId === state.id) {
      const deltaX = e.clientX - state.lastPosition.x;
      const deltaY = e.clientY - state.lastPosition.y;
      if ((Math.abs(deltaX) >= minimumMovement || Math.abs(deltaY) >= minimumMovement) && !state.started) {
        start(e);
      }
      if (state.started) {
        onMove == null ? void 0 : onMove(e, deltaX, deltaY);
        state.lastPosition = { x: e.clientX, y: e.clientY };
      }
    }
  };
  const onPointerUp = (e) => {
    var _a;
    if (e.pointerId === state.id) {
      if (state.longPressTimer) {
        clearTimeout(state.longPressTimer);
      }
      const longPressTriggered = state.longPressTriggered;
      state.longPressTriggered = false;
      if (state.started) {
        onMoveEnd == null ? void 0 : onMoveEnd(e);
      }
      if (state.el) {
        if (e.type !== "pointercancel") {
          (_a = props.onPointerUp) == null ? void 0 : _a.call(props, e, state.el);
          if (e.target && state.el.contains(e.target)) {
            if (longPressTriggered) {
              onLongPress == null ? void 0 : onLongPress(e, state.el);
            } else {
              onPress == null ? void 0 : onPress(e, state.el);
            }
          }
        }
        document.documentElement.style.userSelect = state.originalUserSelect || "";
        state.el.style.touchAction = state.originalTouchAction || "";
      }
      state.id = void 0;
      state.started = false;
      removeGlobalListener(window, "pointermove", onPointerMove, false);
      removeGlobalListener(window, "pointerup", onPointerUp, false);
      removeGlobalListener(window, "pointercancel", onPointerUp, false);
    }
  };
  return {
    domProps: {
      onPointerDown: createEventHandler(onPointerDown)
    }
  };
}
function isCtrlOrShiftPressed(e) {
  return e.shiftKey || isCtrlKeyPressed(e);
}
function useTableRowStyle({ index, isSelected, isHeader }) {
  const isDarkMode = useIsDarkMode();
  const isMobile = useIsMobileMediaQuery();
  const { hideBorder, enableSelection, collapseOnMobile, onAction } = useContext(TableContext);
  const isFirst = index === 0;
  return clsx(
    "flex gap-x-16 break-inside-avoid outline-none border border-transparent",
    onAction && "cursor-pointer",
    isMobile && collapseOnMobile && hideBorder ? "mb-8 pl-8 pr-0 rounded" : "px-16",
    !hideBorder && "border-b-divider",
    !hideBorder && isFirst && "border-t-divider",
    isSelected && !isDarkMode && "bg-primary/selected hover:bg-primary/focus focus-visible:bg-primary/focus",
    isSelected && isDarkMode && "bg-selected hover:bg-focus focus-visible:bg-focus",
    !isSelected && !isHeader && (enableSelection || onAction) && "focus-visible:bg-focus hover:bg-hover"
  );
}
const interactableElements = ["button", "a", "input", "select", "textarea"];
function TableRow({
  item,
  index,
  renderAs,
  className,
  style
}) {
  const {
    selectedRows,
    columns,
    toggleRow,
    selectRow,
    onAction,
    selectRowOnContextMenu,
    enableSelection,
    selectionStyle,
    hideHeaderRow
  } = useContext(TableContext);
  const isTouchDevice = useRef(false);
  const isSelected = selectedRows.includes(item.id);
  const [isHovered, setIsHovered] = useState(false);
  const clickedOnInteractable = (e) => {
    return e.target.closest(interactableElements.join(","));
  };
  const doubleClickHandler = (e) => {
    if (selectionStyle === "highlight" && onAction && !isTouchDevice.current && !clickedOnInteractable(e)) {
      e.preventDefault();
      e.stopPropagation();
      onAction(item, index);
    }
  };
  const anyRowsSelected = !!selectedRows.length;
  const handleRowTap = (e) => {
    if (clickedOnInteractable(e))
      return;
    if (selectionStyle === "checkbox") {
      if (enableSelection && (anyRowsSelected || !onAction)) {
        toggleRow(item);
      } else if (onAction) {
        onAction(item, index);
      }
    } else if (selectionStyle === "highlight") {
      if (isTouchDevice.current) {
        if (enableSelection && anyRowsSelected) {
          toggleRow(item);
        } else {
          onAction == null ? void 0 : onAction(item, index);
        }
      } else if (enableSelection) {
        selectRow(item, isCtrlOrShiftPressed(e));
      }
    }
  };
  const { domProps } = usePointerEvents({
    onPointerDown: (e) => {
      isTouchDevice.current = e.pointerType === "touch";
    },
    onPress: handleRowTap,
    onLongPress: enableSelection ? () => {
      if (isTouchDevice.current) {
        toggleRow(item);
      }
    } : void 0
  });
  const keyboardHandler = (e) => {
    if (enableSelection && e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      if (selectionStyle === "checkbox") {
        toggleRow(item);
      } else {
        selectRow(item);
      }
    } else if (e.key === "Enter" && !selectedRows.length && onAction) {
      e.preventDefault();
      e.stopPropagation();
      onAction(item, index);
    }
  };
  const contextMenuHandler = (e) => {
    if (selectRowOnContextMenu && enableSelection) {
      if (!selectedRows.includes(item.id)) {
        selectRow(item);
      }
    }
    if (isTouchDevice.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const styleClassName = useTableRowStyle({ index, isSelected });
  const RowElement = renderAs || "div";
  return /* @__PURE__ */ jsx(
    RowElement,
    {
      role: "row",
      "aria-rowindex": index + 1 + (hideHeaderRow ? 0 : 1),
      "aria-selected": isSelected,
      tabIndex: -1,
      className: clsx(className, styleClassName),
      item: RowElement === "div" ? void 0 : item,
      onDoubleClick: createEventHandler(doubleClickHandler),
      onKeyDown: createEventHandler(keyboardHandler),
      onContextMenu: createEventHandler(contextMenuHandler),
      onPointerEnter: createEventHandler(() => setIsHovered(true)),
      onPointerLeave: createEventHandler(() => setIsHovered(false)),
      style,
      ...domProps,
      children: columns.map((column, cellIndex) => /* @__PURE__ */ jsx(
        TableCell,
        {
          rowIndex: index,
          rowIsHovered: isHovered,
          index: cellIndex,
          item
        },
        `${item.id}-${column.key}`
      ))
    }
  );
}
const CheckboxColumnConfig = {
  key: "checkbox",
  header: () => /* @__PURE__ */ jsx(SelectAllCheckbox, {}),
  align: "center",
  width: "w-24 flex-shrink-0",
  body: (item, row) => {
    if (row.isPlaceholder) {
      return /* @__PURE__ */ jsx(Skeleton, { size: "w-24 h-24", variant: "rect" });
    }
    return /* @__PURE__ */ jsx(SelectRowCheckbox, { item });
  }
};
function SelectRowCheckbox({ item }) {
  const { selectedRows, toggleRow } = useContext(TableContext);
  return /* @__PURE__ */ jsx(
    Checkbox,
    {
      checked: selectedRows.includes(item.id),
      onChange: () => toggleRow(item)
    }
  );
}
function SelectAllCheckbox() {
  const { trans } = useTrans();
  const { data, selectedRows, onSelectionChange } = useContext(TableContext);
  const allRowsSelected = !!data.length && data.length === selectedRows.length;
  const someRowsSelected = !allRowsSelected && !!selectedRows.length;
  return /* @__PURE__ */ jsx(
    Checkbox,
    {
      "aria-label": trans({ message: "Select all" }),
      isIndeterminate: someRowsSelected,
      checked: allRowsSelected,
      onChange: () => {
        if (allRowsSelected) {
          onSelectionChange([]);
        } else {
          onSelectionChange(data.map((d) => d.id));
        }
      }
    }
  );
}
const ArrowDownwardIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" }),
  "ArrowDownwardOutlined"
);
function HeaderCell({ index }) {
  const { columns, sortDescriptor, onSortChange, enableSorting } = useContext(TableContext);
  const column = columns[index];
  const style = useTableCellStyle({
    index,
    isHeader: true
  });
  const [isHovered, setIsHovered] = useState(false);
  const sortingKey = column.sortingKey || column.key;
  const allowSorting = column.allowsSorting && enableSorting;
  const { orderBy, orderDir } = sortDescriptor || {};
  const sortActive = allowSorting && orderBy === sortingKey;
  let ariaSort;
  if (sortActive && orderDir === "asc") {
    ariaSort = "ascending";
  } else if (sortActive && orderDir === "desc") {
    ariaSort = "descending";
  } else if (allowSorting) {
    ariaSort = "none";
  }
  const toggleSorting = () => {
    if (!allowSorting)
      return;
    let newSort;
    if (sortActive && orderDir === "desc") {
      newSort = { orderDir: "asc", orderBy: sortingKey };
    } else if (sortActive && orderDir === "asc") {
      newSort = { orderBy: void 0, orderDir: void 0 };
    } else {
      newSort = { orderDir: "desc", orderBy: sortingKey };
    }
    onSortChange == null ? void 0 : onSortChange(newSort);
  };
  const sortVisible = sortActive || isHovered;
  const sortVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-25%" }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "columnheader",
      tabIndex: -1,
      "aria-colindex": index + 1,
      "aria-sort": ariaSort,
      className: clsx(
        style,
        "text-muted font-medium text-xs",
        allowSorting && "cursor-pointer"
      ),
      onMouseEnter: () => {
        setIsHovered(true);
      },
      onMouseLeave: () => {
        setIsHovered(false);
      },
      onKeyDown: (e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggleSorting();
        }
      },
      onClick: toggleSorting,
      children: [
        column.hideHeader ? /* @__PURE__ */ jsx("div", { className: "sr-only", children: column.header() }) : column.header(),
        /* @__PURE__ */ jsx(AnimatePresence, { children: allowSorting && /* @__PURE__ */ jsx(
          m.span,
          {
            variants: sortVariants,
            animate: sortVisible ? "visible" : "hidden",
            initial: false,
            transition: { type: "tween" },
            className: "inline-block ml-6 -mt-2",
            "data-testid": "table-sort-button",
            "aria-hidden": !sortVisible,
            children: /* @__PURE__ */ jsx(
              ArrowDownwardIcon,
              {
                size: "xs",
                className: clsx(
                  "text-muted",
                  orderDir === "asc" && orderBy === sortingKey && "rotate-180 transition-transform"
                )
              }
            )
          },
          "sort-icon"
        ) })
      ]
    }
  );
}
function TableHeaderRow() {
  const { columns } = useContext(TableContext);
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "row",
      "aria-rowindex": 1,
      tabIndex: -1,
      className: "flex gap-x-16 px-16",
      children: columns.map((column, columnIndex) => /* @__PURE__ */ jsx(HeaderCell, { index: columnIndex }, column.key))
    }
  );
}
function Table({
  className,
  columns: userColumns,
  collapseOnMobile = true,
  hideHeaderRow = false,
  hideBorder = false,
  data,
  selectedRows: propsSelectedRows,
  defaultSelectedRows: propsDefaultSelectedRows,
  onSelectionChange: propsOnSelectionChange,
  sortDescriptor: propsSortDescriptor,
  onSortChange: propsOnSortChange,
  enableSorting = true,
  onDelete,
  enableSelection = true,
  selectionStyle = "checkbox",
  ariaLabelledBy,
  selectRowOnContextMenu,
  onAction,
  renderRowAs,
  tableBody,
  meta,
  tableRef: propsTableRef,
  closeOnInteractOutside = false,
  cellHeight,
  headerCellHeight,
  ...domProps
}) {
  const isMobile = useIsMobileMediaQuery();
  const isCollapsedMode = !!isMobile && collapseOnMobile;
  if (isCollapsedMode) {
    hideHeaderRow = true;
    hideBorder = true;
  }
  const [selectedRows, onSelectionChange] = useControlledState(
    propsSelectedRows,
    propsDefaultSelectedRows || [],
    propsOnSelectionChange
  );
  const [sortDescriptor, onSortChange] = useControlledState(
    propsSortDescriptor,
    void 0,
    propsOnSortChange
  );
  const toggleRow = useCallback(
    (item) => {
      const newValues = [...selectedRows];
      if (!newValues.includes(item.id)) {
        newValues.push(item.id);
      } else {
        const index = newValues.indexOf(item.id);
        newValues.splice(index, 1);
      }
      onSelectionChange(newValues);
    },
    [selectedRows, onSelectionChange]
  );
  const selectRow = useCallback(
    // allow deselecting all rows by passing in null
    (item, merge) => {
      let newValues = [];
      if (item) {
        newValues = merge ? [...selectedRows == null ? void 0 : selectedRows.filter((id) => id !== item.id), item.id] : [item.id];
      }
      onSelectionChange(newValues);
    },
    [selectedRows, onSelectionChange]
  );
  const columns = useMemo(() => {
    const filteredColumns = userColumns.filter((c) => {
      const visibleInMode = c.visibleInMode || "regular";
      if (visibleInMode === "all") {
        return true;
      }
      if (visibleInMode === "compact" && isCollapsedMode) {
        return true;
      }
      if (visibleInMode === "regular" && !isCollapsedMode) {
        return true;
      }
    });
    const showCheckboxCell = enableSelection && selectionStyle !== "highlight" && !isMobile;
    if (showCheckboxCell) {
      filteredColumns.unshift(CheckboxColumnConfig);
    }
    return filteredColumns;
  }, [isMobile, userColumns, enableSelection, selectionStyle, isCollapsedMode]);
  const contextValue = {
    isCollapsedMode,
    cellHeight,
    headerCellHeight,
    hideBorder,
    hideHeaderRow,
    selectedRows,
    onSelectionChange,
    enableSorting,
    enableSelection,
    selectionStyle,
    data,
    columns,
    sortDescriptor,
    onSortChange,
    toggleRow,
    selectRow,
    onAction,
    selectRowOnContextMenu,
    meta,
    collapseOnMobile
  };
  const navProps = useGridNavigation({
    cellCount: enableSelection ? columns.length + 1 : columns.length,
    rowCount: data.length + 1
  });
  const tableBodyProps = {
    renderRowAs
  };
  if (!tableBody) {
    tableBody = /* @__PURE__ */ jsx(BasicTableBody, { ...tableBodyProps });
  } else {
    tableBody = cloneElement(tableBody, tableBodyProps);
  }
  const tableRef = useObjectRef(propsTableRef);
  useInteractOutside({
    ref: tableRef,
    onInteractOutside: (e) => {
      if (closeOnInteractOutside && enableSelection && (selectedRows == null ? void 0 : selectedRows.length) && // don't deselect if clicking on a dialog (for example is table row has a context menu)
      !e.target.closest('[role="dialog"]')) {
        onSelectionChange([]);
      }
    }
  });
  return /* @__PURE__ */ jsx(TableContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ...mergeProps(domProps, navProps, {
        onKeyDown: (e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            if (selectedRows == null ? void 0 : selectedRows.length) {
              onSelectionChange([]);
            }
          } else if (e.key === "Delete") {
            e.preventDefault();
            e.stopPropagation();
            if (selectedRows == null ? void 0 : selectedRows.length) {
              onDelete == null ? void 0 : onDelete(
                data.filter((item) => selectedRows == null ? void 0 : selectedRows.includes(item.id))
              );
            }
          } else if (isCtrlKeyPressed(e) && e.key === "a") {
            e.preventDefault();
            e.stopPropagation();
            if (enableSelection) {
              onSelectionChange(data.map((item) => item.id));
            }
          }
        }
      }),
      role: "grid",
      tabIndex: 0,
      "aria-rowcount": data.length + 1,
      "aria-colcount": columns.length + 1,
      ref: tableRef,
      "aria-multiselectable": enableSelection ? true : void 0,
      "aria-labelledby": ariaLabelledBy,
      className: clsx(
        className,
        "isolate select-none text-sm outline-none focus-visible:ring-2"
      ),
      children: [
        !hideHeaderRow && /* @__PURE__ */ jsx(TableHeaderRow, {}),
        tableBody
      ]
    }
  ) });
}
function BasicTableBody({ renderRowAs }) {
  const { data } = useContext(TableContext);
  return /* @__PURE__ */ jsx(Fragment, { children: data.map((item, rowIndex) => /* @__PURE__ */ jsx(
    TableRow,
    {
      item,
      index: rowIndex,
      renderAs: renderRowAs
    },
    item.id
  )) });
}
function ChipList({
  className,
  children,
  size,
  color,
  radius,
  selectable,
  wrap = true
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "flex items-center gap-8",
        wrap && "flex-wrap",
        className
      ),
      children: Children.map(children, (chip) => {
        if (isValidElement(chip)) {
          return cloneElement(chip, {
            size,
            color,
            selectable,
            radius
          });
        }
      })
    }
  );
}
const Avatar = forwardRef(
  ({
    className,
    circle,
    size = "md",
    src,
    link,
    label,
    fallback = "generic",
    lazy = true,
    ...domProps
  }, ref) => {
    let renderedAvatar = src ? /* @__PURE__ */ jsx(
      "img",
      {
        ref,
        src,
        alt: label,
        loading: lazy ? "lazy" : void 0,
        className: "block h-full w-full object-cover"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-alt dark:bg-chip", children: /* @__PURE__ */ jsx(
      AvatarPlaceholderIcon,
      {
        viewBox: "0 0 48 48",
        className: "h-full w-full text-muted"
      }
    ) });
    if (label) {
      renderedAvatar = /* @__PURE__ */ jsx(Tooltip, { label, children: renderedAvatar });
    }
    const wrapperProps = {
      ...domProps,
      className: clsx(
        className,
        "relative block overflow-hidden select-none flex-shrink-0",
        getSizeClassName(size),
        circle ? "rounded-full" : "rounded"
      )
    };
    return link ? /* @__PURE__ */ jsx(Link, { ...wrapperProps, to: link, children: renderedAvatar }) : /* @__PURE__ */ jsx("div", { ...wrapperProps, children: renderedAvatar });
  }
);
function getSizeClassName(size) {
  switch (size) {
    case "xs":
      return "w-18 h-18";
    case "sm":
      return "w-24 h-24";
    case "md":
      return "w-32 h-32";
    case "lg":
      return "w-40 h-40";
    case "xl":
      return "w-60 h-60";
    default:
      return size;
  }
}
function useCurrentDateTime() {
  const timezone = useUserTimezone();
  return useMemo(() => {
    return now(timezone);
  }, [timezone]);
}
const AccordionAnimation = {
  variants: {
    open: {
      height: "auto",
      visibility: "visible",
      transitionEnd: {
        overflow: "auto"
      }
    },
    closed: {
      height: 0,
      overflow: "hidden",
      transitionEnd: {
        visibility: "hidden"
      }
    }
  },
  transition: { type: "tween", duration: 0.2 }
};
function DataTableEmptyStateMessage({
  isFiltering,
  title,
  filteringTitle,
  image,
  size,
  className
}) {
  const isMobile = useIsMobileMediaQuery();
  if (!size) {
    size = isMobile ? "sm" : "md";
  }
  return /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      className,
      size,
      image: /* @__PURE__ */ jsx(SvgImage, { src: image }),
      title: isFiltering && filteringTitle ? filteringTitle : title,
      description: isFiltering && filteringTitle ? /* @__PURE__ */ jsx(Trans, { message: "Try another search query or different filters" }) : void 0
    }
  );
}
const draggables = /* @__PURE__ */ new Map();
const droppables = /* @__PURE__ */ new Map();
const dragMonitors = /* @__PURE__ */ new Map();
const dragSession = {
  status: "inactive"
};
async function* readFilesFromDataTransfer(dataTransfer) {
  const entries = [];
  for (const item of dataTransfer.items) {
    if (item.kind === "file") {
      const entry = item.webkitGetAsEntry();
      if (entry) {
        entries.push(entry);
      }
    }
  }
  for (const entry of entries) {
    if (entry.isFile) {
      if (entry.name === ".DS_Store")
        continue;
      const file = await getEntryFile(entry);
      yield new UploadedFile(file, entry.fullPath);
    } else if (entry.isDirectory) {
      yield* getEntriesFromDirectory(entry);
    }
  }
}
async function* getEntriesFromDirectory(item) {
  const reader = item.createReader();
  let entries;
  do {
    entries = await new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject);
    });
    for (const entry of entries) {
      if (entry.isFile) {
        if (entry.name === ".DS_Store")
          continue;
        const file = await getEntryFile(entry);
        yield new UploadedFile(file, entry.fullPath);
      } else if (entry.isDirectory) {
        yield* getEntriesFromDirectory(entry);
      }
    }
  } while (entries.length > 0);
}
function getEntryFile(entry) {
  return new Promise((resolve, reject) => entry.file(resolve, reject));
}
async function asyncIterableToArray(iterator) {
  const items = [];
  for await (const item of iterator) {
    items.push(item);
  }
  return items;
}
const DROP_ACTIVATE_TIMEOUT = 400;
function useDroppable({
  id,
  disabled,
  ref,
  ...options
}) {
  const state = useRef({
    dragOverElements: /* @__PURE__ */ new Set(),
    dropActivateTimer: void 0
  }).current;
  const optionsRef = useRef(options);
  optionsRef.current = options;
  useLayoutEffect(() => {
    droppables.set(id, {
      ...droppables.get(id),
      disabled,
      id,
      ref
    });
    return () => {
      droppables.delete(id);
    };
  }, [id, optionsRef, disabled, ref]);
  const canDrop = (draggable) => {
    var _a;
    const options2 = optionsRef.current;
    const allowEventsOnSelf = options2.allowDragEventsFromItself || ref.current !== ((_a = draggable.ref) == null ? void 0 : _a.current);
    return !!((draggable == null ? void 0 : draggable.type) && allowEventsOnSelf && options2.types.includes(draggable.type) && (!options2.acceptsDrop || options2.acceptsDrop(draggable)));
  };
  const fireDragLeave = (e) => {
    var _a, _b;
    const draggable = getDraggable(e);
    if (draggable) {
      (_b = (_a = optionsRef.current).onDragLeave) == null ? void 0 : _b.call(_a, draggable);
    }
  };
  const onDragEnter = (e) => {
    var _a, _b;
    e.stopPropagation();
    state.dragOverElements.add(e.target);
    if (state.dragOverElements.size > 1) {
      return;
    }
    const draggable = getDraggable(e);
    if (draggable && canDrop(draggable)) {
      (_b = (_a = optionsRef.current).onDragEnter) == null ? void 0 : _b.call(_a, draggable);
      clearTimeout(state.dropActivateTimer);
      if (typeof optionsRef.current.onDropActivate === "function") {
        state.dropActivateTimer = setTimeout(() => {
          var _a2, _b2;
          if (draggable) {
            (_b2 = (_a2 = optionsRef.current).onDropActivate) == null ? void 0 : _b2.call(_a2, draggable);
          }
        }, DROP_ACTIVATE_TIMEOUT);
      }
    }
  };
  const onDragLeave = (e) => {
    e.stopPropagation();
    state.dragOverElements.delete(e.target);
    for (const element of state.dragOverElements) {
      if (!e.currentTarget.contains(element)) {
        state.dragOverElements.delete(element);
      }
    }
    if (state.dragOverElements.size > 0) {
      return;
    }
    const draggable = getDraggable(e);
    if (draggable && canDrop(draggable)) {
      fireDragLeave(e);
      clearTimeout(state.dropActivateTimer);
    }
  };
  const onDrop = async (e) => {
    var _a, _b, _c, _d;
    e.preventDefault();
    e.stopPropagation();
    state.dragOverElements.clear();
    fireDragLeave(e);
    clearTimeout(state.dropActivateTimer);
    const draggable = getDraggable(e);
    if (draggable) {
      (_b = (_a = optionsRef.current).onDragLeave) == null ? void 0 : _b.call(_a, draggable);
      if (!canDrop(draggable)) {
        if (dragSession.status !== "inactive") {
          dragSession.status = "dropFail";
        }
      } else {
        const dropResult = (_d = (_c = optionsRef.current).onDrop) == null ? void 0 : _d.call(_c, draggable);
        if (dragSession.status !== "inactive") {
          dragSession.status = dropResult === false ? "dropFail" : "dropSuccess";
        }
      }
    }
  };
  const droppableProps = {
    onDragOver: (e) => {
      var _a, _b;
      e.preventDefault();
      e.stopPropagation();
      const draggable = getDraggable(e);
      if (draggable && canDrop(draggable)) {
        (_b = (_a = optionsRef.current).onDragOver) == null ? void 0 : _b.call(_a, draggable, e);
      }
    },
    onDragEnter,
    onDragLeave,
    onDrop
  };
  return {
    droppableProps: disabled ? {} : droppableProps
  };
}
function getDraggable(e) {
  if (dragSession.dragTargetId != null) {
    return draggables.get(dragSession.dragTargetId);
  } else if (e.dataTransfer.types.includes("Files")) {
    return {
      type: "nativeFile",
      el: null,
      ref: null,
      getData: () => {
        return asyncIterableToArray(readFilesFromDataTransfer(e.dataTransfer));
      }
    };
  }
}
function ReplyEditorDropTargetMask({ isVisible }) {
  const mask = /* @__PURE__ */ jsx(
    m.div,
    {
      ...opacityAnimation,
      transition: { duration: 0.3 },
      className: "pointer-events-none absolute inset-0 min-h-full w-full border-2 border-dashed border-primary bg-primary-light/30",
      children: /* @__PURE__ */ jsx(
        m.div,
        {
          initial: { y: "100%", opacity: 0 },
          animate: { y: "-10px", opacity: 1 },
          exit: { y: "100%", opacity: 0 },
          className: "fixed bottom-0 left-0 right-0 mx-auto max-w-max rounded bg-primary p-10 text-on-primary",
          children: /* @__PURE__ */ jsx(Trans, { message: "Drop files to attach them to this reply." })
        }
      )
    },
    "dragTargetMask"
  );
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isVisible ? mask : null });
}
const TwentyMB = 20 * 1024 * 1024;
function useUploadReplyAttachments(props) {
  const onSuccess = useCallbackRef(props.onSuccess);
  const uploadMultiple = useFileUploadStore((s) => s.uploadMultiple);
  return useCallback(
    (files) => {
      uploadMultiple(files, {
        restrictions: {
          maxFileSize: TwentyMB
        },
        onSuccess: (entry) => onSuccess(entry),
        onError: (message) => {
          if (message) {
            toast.danger(message);
          }
        }
      });
    },
    [uploadMultiple, onSuccess]
  );
}
const DefaultFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 23.65625 4 C 22.320313 4 21.066406 4.519531 20.121094 5.464844 L 11.464844 14.121094 C 10.519531 15.066406 10 16.320313 10 17.65625 L 10 57 C 10 58.652344 11.347656 60 13 60 L 53 60 C 54.652344 60 56 58.652344 56 57 L 56 7 C 56 5.347656 54.652344 4 53 4 Z M 24 6 L 53 6 C 53.550781 6 54 6.449219 54 7 L 54 57 C 54 57.550781 53.550781 58 53 58 L 13 58 C 12.449219 58 12 57.550781 12 57 L 12 18 L 21 18 C 22.652344 18 24 16.652344 24 15 Z M 22 6.5 L 22 15 C 22 15.550781 21.550781 16 21 16 L 12.5 16 C 12.605469 15.835938 12.734375 15.679688 12.878906 15.535156 L 21.535156 6.878906 C 21.679688 6.738281 21.835938 6.613281 22 6.5 Z M 21 22 C 20.449219 22 20 22.449219 20 23 C 20 23.550781 20.449219 24 21 24 L 37 24 C 37.550781 24 38 23.550781 38 23 C 38 22.449219 37.550781 22 37 22 Z M 41 22 C 40.449219 22 40 22.449219 40 23 C 40 23.550781 40.449219 24 41 24 L 45 24 C 45.550781 24 46 23.550781 46 23 C 46 22.449219 45.550781 22 45 22 Z M 21 26 C 20.449219 26 20 26.449219 20 27 C 20 27.550781 20.449219 28 21 28 L 41 28 C 41.550781 28 42 27.550781 42 27 C 42 26.449219 41.550781 26 41 26 Z M 21 32 C 20.449219 32 20 32.449219 20 33 C 20 33.550781 20.449219 34 21 34 L 43 34 C 43.550781 34 44 33.550781 44 33 C 44 32.449219 43.550781 32 43 32 Z M 21 36 C 20.449219 36 20 36.449219 20 37 C 20 37.550781 20.449219 38 21 38 L 33 38 C 33.550781 38 34 37.550781 34 37 C 34 36.449219 33.550781 36 33 36 Z M 15 50 C 14.449219 50 14 50.449219 14 51 L 14 53 C 14 53.550781 14.449219 54 15 54 C 15.550781 54 16 53.550781 16 53 L 16 51 C 16 50.449219 15.550781 50 15 50 Z M 20 50 C 19.449219 50 19 50.449219 19 51 L 19 53 C 19 53.550781 19.449219 54 20 54 C 20.550781 54 21 53.550781 21 53 L 21 51 C 21 50.449219 20.550781 50 20 50 Z M 25 50 C 24.449219 50 24 50.449219 24 51 L 24 53 C 24 53.550781 24.449219 54 25 54 C 25.550781 54 26 53.550781 26 53 L 26 51 C 26 50.449219 25.550781 50 25 50 Z M 30 50 C 29.449219 50 29 50.449219 29 51 L 29 53 C 29 53.550781 29.449219 54 30 54 C 30.550781 54 31 53.550781 31 53 L 31 51 C 31 50.449219 30.550781 50 30 50 Z M 35 50 C 34.449219 50 34 50.449219 34 51 L 34 53 C 34 53.550781 34.449219 54 35 54 C 35.550781 54 36 53.550781 36 53 L 36 51 C 36 50.449219 35.550781 50 35 50 Z M 40 50 C 39.449219 50 39 50.449219 39 51 L 39 53 C 39 53.550781 39.449219 54 40 54 C 40.550781 54 41 53.550781 41 53 L 41 51 C 41 50.449219 40.550781 50 40 50 Z M 45 50 C 44.449219 50 44 50.449219 44 51 L 44 53 C 44 53.550781 44.449219 54 45 54 C 45.550781 54 46 53.550781 46 53 L 46 51 C 46 50.449219 45.550781 50 45 50 Z M 50 50 C 49.449219 50 49 50.449219 49 51 L 49 53 C 49 53.550781 49.449219 54 50 54 C 50.550781 54 51 53.550781 51 53 L 51 51 C 51 50.449219 50.550781 50 50 50 Z " }) })
);
const AudioFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 21.65625 4 C 20.320313 4 19.0625 4.519531 18.121094 5.464844 L 9.464844 14.121094 C 8.519531 15.066406 8 16.320313 8 17.65625 L 8 57 C 8 58.652344 9.347656 60 11 60 L 51 60 C 52.652344 60 54 58.652344 54 57 L 54 7 C 54 5.347656 52.652344 4 51 4 Z M 22 6 L 51 6 C 51.550781 6 52 6.449219 52 7 L 52 57 C 52 57.550781 51.550781 58 51 58 L 11 58 C 10.449219 58 10 57.550781 10 57 L 10 18 L 19 18 C 20.652344 18 22 16.652344 22 15 Z M 20 6.5 L 20 15 C 20 15.550781 19.550781 16 19 16 L 10.5 16 C 10.609375 15.835938 10.734375 15.679688 10.878906 15.535156 L 19.535156 6.878906 C 19.679688 6.734375 19.835938 6.609375 20 6.5 Z M 42.78125 18.023438 L 24.78125 22.023438 C 24.328125 22.125 24 22.53125 24 23 L 24 37 C 20.691406 37 18 39.242188 18 42 C 18 44.757813 20.691406 47 24 47 C 27.308594 47 30 44.757813 30 42 L 30 29.910156 L 38 28.136719 L 38 33 C 34.691406 33 32 35.242188 32 38 C 32 40.757813 34.691406 43 38 43 C 41.308594 43 44 40.757813 44 38 L 44 19 C 44 18.695313 43.863281 18.410156 43.625 18.21875 C 43.390625 18.03125 43.082031 17.960938 42.78125 18.023438 Z M 42 20.246094 L 42 38 C 42 39.652344 40.207031 41 38 41 C 35.792969 41 34 39.652344 34 38 C 34 36.347656 35.792969 35 38 35 C 38.28125 35 38.5625 35.023438 38.839844 35.066406 C 39.128906 35.117188 39.421875 35.03125 39.648438 34.84375 C 39.871094 34.652344 40 34.375 40 34.078125 L 40 26.890625 C 40 26.585938 39.863281 26.300781 39.625 26.109375 C 39.390625 25.921875 39.078125 25.847656 38.78125 25.910156 L 28.78125 28.136719 C 28.328125 28.238281 28 28.644531 28 29.109375 L 28 42 C 28 43.652344 26.207031 45 24 45 C 21.792969 45 20 43.652344 20 42 C 20 40.347656 21.792969 39 24 39 C 24.28125 39 24.5625 39.023438 24.839844 39.066406 C 25.128906 39.117188 25.425781 39.03125 25.648438 38.84375 C 25.871094 38.652344 26 38.375 26 38.078125 L 26 23.800781 Z M 13 52 C 12.449219 52 12 52.445313 12 53 L 12 55 C 12 55.554688 12.449219 56 13 56 C 13.550781 56 14 55.554688 14 55 L 14 53 C 14 52.445313 13.550781 52 13 52 Z M 18 52 C 17.449219 52 17 52.445313 17 53 L 17 55 C 17 55.554688 17.449219 56 18 56 C 18.550781 56 19 55.554688 19 55 L 19 53 C 19 52.445313 18.550781 52 18 52 Z M 23 52 C 22.449219 52 22 52.445313 22 53 L 22 55 C 22 55.554688 22.449219 56 23 56 C 23.550781 56 24 55.554688 24 55 L 24 53 C 24 52.445313 23.550781 52 23 52 Z M 28 52 C 27.449219 52 27 52.445313 27 53 L 27 55 C 27 55.554688 27.449219 56 28 56 C 28.550781 56 29 55.554688 29 55 L 29 53 C 29 52.445313 28.550781 52 28 52 Z M 33 52 C 32.449219 52 32 52.445313 32 53 L 32 55 C 32 55.554688 32.449219 56 33 56 C 33.550781 56 34 55.554688 34 55 L 34 53 C 34 52.445313 33.550781 52 33 52 Z M 38 52 C 37.449219 52 37 52.445313 37 53 L 37 55 C 37 55.554688 37.449219 56 38 56 C 38.550781 56 39 55.554688 39 55 L 39 53 C 39 52.445313 38.550781 52 38 52 Z M 43 52 C 42.449219 52 42 52.445313 42 53 L 42 55 C 42 55.554688 42.449219 56 43 56 C 43.550781 56 44 55.554688 44 55 L 44 53 C 44 52.445313 43.550781 52 43 52 Z M 48 52 C 47.449219 52 47 52.445313 47 53 L 47 55 C 47 55.554688 47.449219 56 48 56 C 48.550781 56 49 55.554688 49 55 L 49 53 C 49 52.445313 48.550781 52 48 52 Z " }) })
);
const VideoFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 23.65625 4 C 22.320313 4 21.0625 4.519531 20.121094 5.464844 L 11.464844 14.121094 C 10.519531 15.066406 10 16.320313 10 17.65625 L 10 57 C 10 58.652344 11.347656 60 13 60 L 53 60 C 54.652344 60 56 58.652344 56 57 L 56 7 C 56 5.347656 54.652344 4 53 4 Z M 24 6 L 53 6 C 53.550781 6 54 6.449219 54 7 L 54 57 C 54 57.550781 53.550781 58 53 58 L 13 58 C 12.449219 58 12 57.550781 12 57 L 12 18 L 21 18 C 22.652344 18 24 16.652344 24 15 Z M 22 6.5 L 22 15 C 22 15.550781 21.550781 16 21 16 L 12.5 16 C 12.613281 15.835938 12.738281 15.675781 12.878906 15.535156 L 21.535156 6.878906 C 21.679688 6.734375 21.835938 6.609375 22 6.5 Z M 28.023438 21.816406 C 27.671875 21.808594 27.316406 21.890625 26.996094 22.0625 C 26.355469 22.417969 25.964844 23.085938 25.964844 23.816406 L 25.964844 42.183594 C 25.964844 42.910156 26.355469 43.582031 26.996094 43.933594 C 27.296875 44.097656 27.632813 44.183594 27.964844 44.183594 C 28.335938 44.183594 28.707031 44.078125 29.03125 43.871094 L 43.53125 34.6875 C 44.113281 34.320313 44.464844 33.6875 44.464844 33 C 44.464844 32.308594 44.113281 31.679688 43.53125 31.3125 L 29.03125 22.125 C 28.722656 21.933594 28.375 21.828125 28.023438 21.816406 Z M 27.964844 23.816406 L 42.464844 33 L 27.964844 42.1875 Z M 15 52 C 14.449219 52 14 52.449219 14 53 L 14 55 C 14 55.550781 14.449219 56 15 56 C 15.550781 56 16 55.550781 16 55 L 16 53 C 16 52.449219 15.550781 52 15 52 Z M 20 52 C 19.449219 52 19 52.449219 19 53 L 19 55 C 19 55.550781 19.449219 56 20 56 C 20.550781 56 21 55.550781 21 55 L 21 53 C 21 52.449219 20.550781 52 20 52 Z M 25 52 C 24.449219 52 24 52.449219 24 53 L 24 55 C 24 55.550781 24.449219 56 25 56 C 25.550781 56 26 55.550781 26 55 L 26 53 C 26 52.449219 25.550781 52 25 52 Z M 30 52 C 29.449219 52 29 52.449219 29 53 L 29 55 C 29 55.550781 29.449219 56 30 56 C 30.550781 56 31 55.550781 31 55 L 31 53 C 31 52.449219 30.550781 52 30 52 Z M 35 52 C 34.449219 52 34 52.449219 34 53 L 34 55 C 34 55.550781 34.449219 56 35 56 C 35.550781 56 36 55.550781 36 55 L 36 53 C 36 52.449219 35.550781 52 35 52 Z M 40 52 C 39.449219 52 39 52.449219 39 53 L 39 55 C 39 55.550781 39.449219 56 40 56 C 40.550781 56 41 55.550781 41 55 L 41 53 C 41 52.449219 40.550781 52 40 52 Z M 45 52 C 44.449219 52 44 52.449219 44 53 L 44 55 C 44 55.550781 44.449219 56 45 56 C 45.550781 56 46 55.550781 46 55 L 46 53 C 46 52.449219 45.550781 52 45 52 Z M 50 52 C 49.449219 52 49 52.449219 49 53 L 49 55 C 49 55.550781 49.449219 56 50 56 C 50.550781 56 51 55.550781 51 55 L 51 53 C 51 52.449219 50.550781 52 50 52 Z " }) })
);
const TextFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 17.660156 4 C 16.320313 4 15.058594 4.519531 14.121094 5.460938 L 5.460938 14.121094 C 4.519531 15.070313 4 16.320313 4 17.660156 L 4 57 C 4 58.648438 5.351563 60 7 60 L 47 60 C 48.648438 60 50 58.648438 50 57 L 50 46 L 58 46 C 59.101563 46 60 45.101563 60 44 L 60 24 C 60 22.898438 59.101563 22 58 22 L 50 22 L 50 7 C 50 5.351563 48.648438 4 47 4 Z M 18 6 L 47 6 C 47.550781 6 48 6.449219 48 7 L 48 22 L 16 22 C 14.898438 22 14 22.898438 14 24 L 14 44 C 14 45.101563 14.898438 46 16 46 L 48 46 L 48 57 C 48 57.550781 47.550781 58 47 58 L 7 58 C 6.449219 58 6 57.550781 6 57 L 6 18 L 15 18 C 16.652344 18 18 16.652344 18 15 Z M 16 6.5 L 16 15 C 16 15.550781 15.550781 16 15 16 L 6.5 16 C 6.613281 15.835938 6.738281 15.679688 6.882813 15.539063 L 15.539063 6.882813 C 15.679688 6.738281 15.835938 6.609375 16 6.5 Z M 16 24 L 58 24 L 58 44 L 16 44 Z M 24 28 C 23.449219 28 23 28.445313 23 29 C 23 29.554688 23.449219 30 24 30 L 26 30 L 26 39 C 26 39.554688 26.449219 40 27 40 C 27.550781 40 28 39.554688 28 39 L 28 30 L 30 30 C 30.550781 30 31 29.554688 31 29 C 31 28.445313 30.550781 28 30 28 Z M 44 28 C 43.449219 28 43 28.445313 43 29 C 43 29.554688 43.449219 30 44 30 L 46 30 L 46 39 C 46 39.554688 46.449219 40 47 40 C 47.550781 40 48 39.554688 48 39 L 48 30 L 50 30 C 50.550781 30 51 29.554688 51 29 C 51 28.445313 50.550781 28 50 28 Z M 33.859375 28.011719 C 33.730469 28.027344 33.601563 28.070313 33.484375 28.140625 C 33.011719 28.425781 32.859375 29.039063 33.140625 29.515625 L 35.832031 34 L 33.140625 38.484375 C 32.859375 38.957031 33.011719 39.574219 33.484375 39.859375 C 33.644531 39.953125 33.824219 40 34 40 C 34.339844 40 34.671875 39.828125 34.859375 39.515625 L 37 35.941406 L 39.140625 39.515625 C 39.328125 39.828125 39.660156 40 40 40 C 40.175781 40 40.355469 39.953125 40.515625 39.859375 C 40.988281 39.574219 41.140625 38.957031 40.859375 38.484375 L 38.167969 34 L 40.859375 29.515625 C 41.140625 29.042969 40.988281 28.425781 40.515625 28.140625 C 40.042969 27.859375 39.425781 28.011719 39.140625 28.484375 L 37 32.058594 L 34.859375 28.484375 C 34.644531 28.128906 34.246094 27.957031 33.859375 28.011719 Z M 9 52 C 8.449219 52 8 52.445313 8 53 L 8 55 C 8 55.554688 8.449219 56 9 56 C 9.550781 56 10 55.554688 10 55 L 10 53 C 10 52.445313 9.550781 52 9 52 Z M 14 52 C 13.449219 52 13 52.445313 13 53 L 13 55 C 13 55.554688 13.449219 56 14 56 C 14.550781 56 15 55.554688 15 55 L 15 53 C 15 52.445313 14.550781 52 14 52 Z M 19 52 C 18.449219 52 18 52.445313 18 53 L 18 55 C 18 55.554688 18.449219 56 19 56 C 19.550781 56 20 55.554688 20 55 L 20 53 C 20 52.445313 19.550781 52 19 52 Z M 24 52 C 23.449219 52 23 52.445313 23 53 L 23 55 C 23 55.554688 23.449219 56 24 56 C 24.550781 56 25 55.554688 25 55 L 25 53 C 25 52.445313 24.550781 52 24 52 Z M 29 52 C 28.449219 52 28 52.445313 28 53 L 28 55 C 28 55.554688 28.449219 56 29 56 C 29.550781 56 30 55.554688 30 55 L 30 53 C 30 52.445313 29.550781 52 29 52 Z M 34 52 C 33.449219 52 33 52.445313 33 53 L 33 55 C 33 55.554688 33.449219 56 34 56 C 34.550781 56 35 55.554688 35 55 L 35 53 C 35 52.445313 34.550781 52 34 52 Z M 39 52 C 38.449219 52 38 52.445313 38 53 L 38 55 C 38 55.554688 38.449219 56 39 56 C 39.550781 56 40 55.554688 40 55 L 40 53 C 40 52.445313 39.550781 52 39 52 Z M 44 52 C 43.449219 52 43 52.445313 43 53 L 43 55 C 43 55.554688 43.449219 56 44 56 C 44.550781 56 45 55.554688 45 55 L 45 53 C 45 52.445313 44.550781 52 44 52 Z " }) })
);
const PdfFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 17.65625 4 C 16.320313 4 15.066406 4.519531 14.121094 5.464844 L 5.464844 14.121094 C 4.519531 15.066406 4 16.320313 4 17.65625 L 4 57 C 4 58.652344 5.347656 60 7 60 L 47 60 C 48.652344 60 50 58.652344 50 57 L 50 46 L 58 46 C 59.101563 46 60 45.101563 60 44 L 60 24 C 60 22.898438 59.101563 22 58 22 L 50 22 L 50 7 C 50 5.347656 48.652344 4 47 4 Z M 18 6 L 47 6 C 47.550781 6 48 6.449219 48 7 L 48 22 L 16 22 C 14.898438 22 14 22.898438 14 24 L 14 44 C 14 45.101563 14.898438 46 16 46 L 48 46 L 48 57 C 48 57.550781 47.550781 58 47 58 L 7 58 C 6.449219 58 6 57.550781 6 57 L 6 18 L 15 18 C 16.652344 18 18 16.652344 18 15 Z M 16 6.5 L 16 15 C 16 15.550781 15.550781 16 15 16 L 6.5 16 C 6.609375 15.835938 6.734375 15.679688 6.878906 15.535156 L 15.535156 6.878906 C 15.679688 6.734375 15.835938 6.609375 16 6.5 Z M 16 24 L 58 24 L 58 44 L 16 44 Z M 25 28 C 24.445313 28 24 28.449219 24 29 L 24 39 C 24 39.550781 24.445313 40 25 40 C 25.554688 40 26 39.550781 26 39 L 26 36 L 29 36 C 30.652344 36 32 34.652344 32 33 L 32 31 C 32 29.347656 30.652344 28 29 28 Z M 35 28 C 34.445313 28 34 28.449219 34 29 L 34 39 C 34 39.550781 34.445313 40 35 40 L 38 40 C 40.207031 40 42 38.207031 42 36 L 42 32 C 42 29.792969 40.207031 28 38 28 Z M 45 28 C 44.445313 28 44 28.449219 44 29 L 44 39 C 44 39.550781 44.445313 40 45 40 C 45.554688 40 46 39.550781 46 39 L 46 36 L 49 36 C 49.554688 36 50 35.550781 50 35 C 50 34.449219 49.554688 34 49 34 L 46 34 L 46 30 L 50 30 C 50.554688 30 51 29.550781 51 29 C 51 28.449219 50.554688 28 50 28 Z M 26 30 L 29 30 C 29.550781 30 30 30.449219 30 31 L 30 33 C 30 33.550781 29.550781 34 29 34 L 26 34 Z M 36 30 L 38 30 C 39.101563 30 40 30.898438 40 32 L 40 36 C 40 37.101563 39.101563 38 38 38 L 36 38 Z M 9 52 C 8.445313 52 8 52.449219 8 53 L 8 55 C 8 55.550781 8.445313 56 9 56 C 9.554688 56 10 55.550781 10 55 L 10 53 C 10 52.449219 9.554688 52 9 52 Z M 14 52 C 13.445313 52 13 52.449219 13 53 L 13 55 C 13 55.550781 13.445313 56 14 56 C 14.554688 56 15 55.550781 15 55 L 15 53 C 15 52.449219 14.554688 52 14 52 Z M 19 52 C 18.445313 52 18 52.449219 18 53 L 18 55 C 18 55.550781 18.445313 56 19 56 C 19.554688 56 20 55.550781 20 55 L 20 53 C 20 52.449219 19.554688 52 19 52 Z M 24 52 C 23.445313 52 23 52.449219 23 53 L 23 55 C 23 55.550781 23.445313 56 24 56 C 24.554688 56 25 55.550781 25 55 L 25 53 C 25 52.449219 24.554688 52 24 52 Z M 29 52 C 28.445313 52 28 52.449219 28 53 L 28 55 C 28 55.550781 28.445313 56 29 56 C 29.554688 56 30 55.550781 30 55 L 30 53 C 30 52.449219 29.554688 52 29 52 Z M 34 52 C 33.445313 52 33 52.449219 33 53 L 33 55 C 33 55.550781 33.445313 56 34 56 C 34.554688 56 35 55.550781 35 55 L 35 53 C 35 52.449219 34.554688 52 34 52 Z M 39 52 C 38.445313 52 38 52.449219 38 53 L 38 55 C 38 55.550781 38.445313 56 39 56 C 39.554688 56 40 55.550781 40 55 L 40 53 C 40 52.449219 39.554688 52 39 52 Z M 44 52 C 43.445313 52 43 52.449219 43 53 L 43 55 C 43 55.550781 43.445313 56 44 56 C 44.554688 56 45 55.550781 45 55 L 45 53 C 45 52.449219 44.554688 52 44 52 Z " }) })
);
const ArchiveFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 21.65625 4 C 20.320313 4 19.066406 4.519531 18.121094 5.464844 L 9.464844 14.121094 C 8.519531 15.066406 8 16.320313 8 17.65625 L 8 57 C 8 58.652344 9.347656 60 11 60 L 51 60 C 52.652344 60 54 58.652344 54 57 L 54 7 C 54 5.347656 52.652344 4 51 4 Z M 22 6 L 36 6 L 36 27.59375 C 35.144531 27.222656 34.210938 27 33.226563 27 L 32.773438 27 C 31.789063 27 30.859375 27.222656 30 27.59375 L 30 9 C 30 8.449219 29.554688 8 29 8 C 28.449219 8 28 8.449219 28 9 L 28 28.902344 C 27.015625 29.824219 26.277344 31.023438 25.953125 32.425781 L 24.875 37.097656 C 24.597656 38.292969 24.878906 39.53125 25.640625 40.488281 C 26.40625 41.449219 27.546875 42 28.769531 42 L 37.230469 42 C 38.457031 42 39.59375 41.449219 40.359375 40.488281 C 41.121094 39.53125 41.402344 38.292969 41.125 37.097656 L 40.046875 32.425781 C 39.726563 31.023438 38.984375 29.824219 38 28.902344 L 38 6 L 51 6 C 51.550781 6 52 6.449219 52 7 L 52 57 C 52 57.550781 51.550781 58 51 58 L 11 58 C 10.449219 58 10 57.550781 10 57 L 10 18 L 19 18 C 20.652344 18 22 16.652344 22 15 Z M 20 6.5 L 20 15 C 20 15.550781 19.550781 16 19 16 L 10.5 16 C 10.609375 15.835938 10.734375 15.679688 10.878906 15.535156 L 19.535156 6.878906 C 19.679688 6.738281 19.835938 6.609375 20 6.5 Z M 32 8 C 31.449219 8 31 8.445313 31 9 C 31 9.554688 31.449219 10 32 10 L 34 10 C 34.550781 10 35 9.554688 35 9 C 35 8.445313 34.550781 8 34 8 Z M 32 13 C 31.449219 13 31 13.445313 31 14 C 31 14.554688 31.449219 15 32 15 L 34 15 C 34.550781 15 35 14.554688 35 14 C 35 13.445313 34.550781 13 34 13 Z M 32 18 C 31.449219 18 31 18.445313 31 19 C 31 19.554688 31.449219 20 32 20 L 34 20 C 34.550781 20 35 19.554688 35 19 C 35 18.445313 34.550781 18 34 18 Z M 32 23 C 31.449219 23 31 23.445313 31 24 C 31 24.554688 31.449219 25 32 25 L 34 25 C 34.550781 25 35 24.554688 35 24 C 35 23.445313 34.550781 23 34 23 Z M 32.773438 29 L 33.226563 29 C 35.570313 29 37.574219 30.59375 38.097656 32.875 L 39.175781 37.550781 C 39.316406 38.148438 39.175781 38.765625 38.796875 39.246094 C 38.414063 39.722656 37.839844 40 37.230469 40 L 28.769531 40 C 28.160156 40 27.589844 39.722656 27.207031 39.246094 C 26.824219 38.765625 26.683594 38.148438 26.824219 37.550781 L 27.902344 32.875 C 28.429688 30.59375 30.429688 29 32.773438 29 Z M 31 34 C 30.449219 34 30 34.445313 30 35 C 30 35.554688 30.449219 36 31 36 L 35 36 C 35.550781 36 36 35.554688 36 35 C 36 34.445313 35.550781 34 35 34 Z M 13 52 C 12.449219 52 12 52.445313 12 53 C 12 53.554688 12.449219 54 13 54 L 17 54 C 17.550781 54 18 53.554688 18 53 C 18 52.445313 17.550781 52 17 52 Z M 21 52 C 20.449219 52 20 52.445313 20 53 C 20 53.554688 20.449219 54 21 54 L 49 54 C 49.550781 54 50 53.554688 50 53 C 50 52.445313 49.550781 52 49 52 Z " }) })
);
const FolderFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 5 10 C 3.300781 10 2 11.300781 2 13 L 2 52 C 2 54.199219 3.800781 56 6 56 L 60 56 C 62.199219 56 64 54.199219 64 52 L 64 23 C 64 21.300781 62.699219 20 61 20 L 58 20 L 58 19 C 58 17.300781 56.699219 16 55 16 L 29.699219 16 C 28.898438 16 28.199219 15.699219 27.597656 15.097656 L 23.902344 11.402344 C 23 10.5 21.699219 10 20.402344 10 Z M 5 12 L 20.402344 12 C 21.199219 12 21.898438 12.300781 22.5 12.902344 L 26.199219 16.597656 C 27.097656 17.5 28.398438 18 29.699219 18 L 55 18 C 55.601563 18 56 18.398438 56 19 L 56 52 C 56 52.601563 56.199219 53.300781 56.597656 54 L 6 54 C 4.898438 54 4 53.101563 4 52 L 4 46 L 45 46 C 45.601563 46 46 45.601563 46 45 C 46 44.398438 45.601563 44 45 44 L 4 44 L 4 13 C 4 12.398438 4.398438 12 5 12 Z M 58 22 L 61 22 C 61.601563 22 62 22.398438 62 23 L 62 52 C 62 53.101563 61.101563 54 60 54 C 58.800781 54 58 52.601563 58 52 Z M 11 24 C 10.398438 24 10 24.398438 10 25 C 10 25.601563 10.398438 26 11 26 L 21 26 C 21.601563 26 22 25.601563 22 25 C 22 24.398438 21.601563 24 21 24 Z M 25 24 C 24.398438 24 24 24.398438 24 25 C 24 25.601563 24.398438 26 25 26 L 31 26 C 31.601563 26 32 25.601563 32 25 C 32 24.398438 31.601563 24 31 24 Z M 11 28 C 10.398438 28 10 28.398438 10 29 C 10 29.601563 10.398438 30 11 30 L 15 30 C 15.601563 30 16 29.601563 16 29 C 16 28.398438 15.601563 28 15 28 Z M 19 28 C 18.398438 28 18 28.398438 18 29 C 18 29.601563 18.398438 30 19 30 L 26 30 C 26.601563 30 27 29.601563 27 29 C 27 28.398438 26.601563 28 26 28 Z M 49 44 C 48.398438 44 48 44.398438 48 45 C 48 45.601563 48.398438 46 49 46 L 53 46 C 53.601563 46 54 45.601563 54 45 C 54 44.398438 53.601563 44 53 44 Z M 7 48 C 6.398438 48 6 48.398438 6 49 L 6 51 C 6 51.601563 6.398438 52 7 52 C 7.601563 52 8 51.601563 8 51 L 8 49 C 8 48.398438 7.601563 48 7 48 Z M 12 48 C 11.398438 48 11 48.398438 11 49 L 11 51 C 11 51.601563 11.398438 52 12 52 C 12.601563 52 13 51.601563 13 51 L 13 49 C 13 48.398438 12.601563 48 12 48 Z M 17 48 C 16.398438 48 16 48.398438 16 49 L 16 51 C 16 51.601563 16.398438 52 17 52 C 17.601563 52 18 51.601563 18 51 L 18 49 C 18 48.398438 17.601563 48 17 48 Z M 22 48 C 21.398438 48 21 48.398438 21 49 L 21 51 C 21 51.601563 21.398438 52 22 52 C 22.601563 52 23 51.601563 23 51 L 23 49 C 23 48.398438 22.601563 48 22 48 Z M 27 48 C 26.398438 48 26 48.398438 26 49 L 26 51 C 26 51.601563 26.398438 52 27 52 C 27.601563 52 28 51.601563 28 51 L 28 49 C 28 48.398438 27.601563 48 27 48 Z M 32 48 C 31.398438 48 31 48.398438 31 49 L 31 51 C 31 51.601563 31.398438 52 32 52 C 32.601563 52 33 51.601563 33 51 L 33 49 C 33 48.398438 32.601563 48 32 48 Z M 37 48 C 36.398438 48 36 48.398438 36 49 L 36 51 C 36 51.601563 36.398438 52 37 52 C 37.601563 52 38 51.601563 38 51 L 38 49 C 38 48.398438 37.601563 48 37 48 Z M 42 48 C 41.398438 48 41 48.398438 41 49 L 41 51 C 41 51.601563 41.398438 52 42 52 C 42.601563 52 43 51.601563 43 51 L 43 49 C 43 48.398438 42.601563 48 42 48 Z M 47 48 C 46.398438 48 46 48.398438 46 49 L 46 51 C 46 51.601563 46.398438 52 47 52 C 47.601563 52 48 51.601563 48 51 L 48 49 C 48 48.398438 47.601563 48 47 48 Z M 52 48 C 51.398438 48 51 48.398438 51 49 L 51 51 C 51 51.601563 51.398438 52 52 52 C 52.601563 52 53 51.601563 53 51 L 53 49 C 53 48.398438 52.601563 48 52 48 Z " }) })
);
const ImageFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 21.65625 4 C 20.320313 4 19.066406 4.519531 18.121094 5.464844 L 9.464844 14.121094 C 8.519531 15.066406 8 16.320313 8 17.65625 L 8 57 C 8 58.652344 9.347656 60 11 60 L 51 60 C 52.652344 60 54 58.652344 54 57 L 54 7 C 54 5.347656 52.652344 4 51 4 Z M 22 6 L 51 6 C 51.550781 6 52 6.449219 52 7 L 52 57 C 52 57.550781 51.550781 58 51 58 L 11 58 C 10.449219 58 10 57.550781 10 57 L 10 18 L 19 18 C 20.652344 18 22 16.652344 22 15 Z M 20 6.5 L 20 15 C 20 15.550781 19.550781 16 19 16 L 10.5 16 C 10.605469 15.835938 10.734375 15.679688 10.878906 15.535156 L 19.535156 6.878906 C 19.679688 6.738281 19.835938 6.613281 20 6.5 Z M 20 24 C 17.792969 24 16 25.792969 16 28 C 16 30.207031 17.792969 32 20 32 C 22.207031 32 24 30.207031 24 28 C 24 25.792969 22.207031 24 20 24 Z M 20 25.75 C 21.242188 25.75 22.25 26.757813 22.25 28 C 22.25 29.242188 21.242188 30.25 20 30.25 C 18.757813 30.25 17.75 29.242188 17.75 28 C 17.75 26.757813 18.757813 25.75 20 25.75 Z M 37 30.414063 C 36.488281 30.414063 35.976563 30.609375 35.585938 31 L 29 37.585938 L 26.414063 35 C 25.632813 34.21875 24.363281 34.21875 23.585938 35 L 14.585938 44 L 13.042969 44 C 12.417969 44 12 44.398438 12 45 C 12 45.601563 12.523438 46 13.042969 46 L 48.980469 46 C 49.5 46 50.023438 45.601563 50.023438 45 C 50.023438 44.398438 49.5 44 48.980469 44 L 25.414063 44 L 37 32.414063 L 45.292969 40.707031 C 45.683594 41.097656 46.316406 41.097656 46.707031 40.707031 C 47.097656 40.316406 47.097656 39.683594 46.707031 39.292969 L 38.414063 31 C 38.023438 30.609375 37.511719 30.414063 37 30.414063 Z M 25 36.414063 L 27.585938 39 L 22.585938 44 L 17.414063 44 Z M 13 52 C 12.449219 52 12 52.449219 12 53 L 12 55 C 12 55.550781 12.449219 56 13 56 C 13.550781 56 14 55.550781 14 55 L 14 53 C 14 52.449219 13.550781 52 13 52 Z M 18 52 C 17.449219 52 17 52.449219 17 53 L 17 55 C 17 55.550781 17.449219 56 18 56 C 18.550781 56 19 55.550781 19 55 L 19 53 C 19 52.449219 18.550781 52 18 52 Z M 23 52 C 22.449219 52 22 52.449219 22 53 L 22 55 C 22 55.550781 22.449219 56 23 56 C 23.550781 56 24 55.550781 24 55 L 24 53 C 24 52.449219 23.550781 52 23 52 Z M 28 52 C 27.449219 52 27 52.449219 27 53 L 27 55 C 27 55.550781 27.449219 56 28 56 C 28.550781 56 29 55.550781 29 55 L 29 53 C 29 52.449219 28.550781 52 28 52 Z M 33 52 C 32.449219 52 32 52.449219 32 53 L 32 55 C 32 55.550781 32.449219 56 33 56 C 33.550781 56 34 55.550781 34 55 L 34 53 C 34 52.449219 33.550781 52 33 52 Z M 38 52 C 37.449219 52 37 52.449219 37 53 L 37 55 C 37 55.550781 37.449219 56 38 56 C 38.550781 56 39 55.550781 39 55 L 39 53 C 39 52.449219 38.550781 52 38 52 Z M 43 52 C 42.449219 52 42 52.449219 42 53 L 42 55 C 42 55.550781 42.449219 56 43 56 C 43.550781 56 44 55.550781 44 55 L 44 53 C 44 52.449219 43.550781 52 43 52 Z M 48 52 C 47.449219 52 47 52.449219 47 53 L 47 55 C 47 55.550781 47.449219 56 48 56 C 48.550781 56 49 55.550781 49 55 L 49 53 C 49 52.449219 48.550781 52 48 52 Z " }) })
);
const PowerPointFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 35.136719 2.386719 C 34.917969 2.378906 34.699219 2.390625 34.480469 2.429688 L 5.304688 7.578125 C 3.390625 7.917969 2 9.574219 2 11.515625 L 2 50.484375 C 2 52.429688 3.390625 54.085938 5.304688 54.421875 L 34.480469 59.570313 C 34.652344 59.601563 34.828125 59.613281 35 59.613281 C 35.703125 59.613281 36.382813 59.371094 36.925781 58.914063 C 37.609375 58.34375 38 57.503906 38 56.613281 L 38 52 L 57 52 C 58.652344 52 60 50.652344 60 49 L 60 13 C 60 11.347656 58.652344 10 57 10 L 38 10 L 38 5.382813 C 38 4.496094 37.609375 3.65625 36.925781 3.085938 C 36.417969 2.65625 35.789063 2.414063 35.136719 2.386719 Z M 35.105469 4.390625 C 35.359375 4.414063 35.542969 4.535156 35.640625 4.617188 C 35.777344 4.730469 36 4.980469 36 5.382813 L 36 56.613281 C 36 57.019531 35.777344 57.269531 35.640625 57.382813 C 35.507813 57.496094 35.226563 57.667969 34.828125 57.601563 L 5.652344 52.453125 C 4.695313 52.285156 4 51.457031 4 50.484375 L 4 11.515625 C 4 10.542969 4.695313 9.714844 5.652344 9.546875 L 34.824219 4.398438 C 34.925781 4.382813 35.019531 4.378906 35.105469 4.390625 Z M 38 12 L 57 12 C 57.550781 12 58 12.449219 58 13 L 58 49 C 58 49.550781 57.550781 50 57 50 L 38 50 L 38 45.949219 L 52.949219 45.949219 C 53.5 45.949219 53.949219 45.554688 53.949219 45 C 53.949219 44.445313 53.5 44 52.949219 44 L 50 44 L 50 41 C 50 40.445313 49.550781 40 49 40 L 46 40 L 46 37 C 46 36.445313 45.550781 36 45 36 L 41 36 C 40.449219 36 40 36.445313 40 37 L 40 39 L 38 39 L 38 32.46875 C 39.46875 33.449219 41.203125 34 43 34 C 47.960938 34 52 29.964844 52 25 C 52 20.035156 47.960938 16 43 16 C 41.1875 16 39.464844 16.535156 38 17.519531 Z M 42 18.078125 L 42 24.832031 C 42 25.027344 42.070313 25.203125 42.171875 25.359375 C 42.21875 25.492188 42.289063 25.617188 42.394531 25.726563 L 47.234375 30.5625 C 46.054688 31.460938 44.589844 32 43 32 C 41.113281 32 39.316406 31.230469 38 29.886719 L 38 20.105469 C 39.089844 18.992188 40.484375 18.292969 42 18.078125 Z M 44 18.078125 C 47.386719 18.566406 50 21.480469 50 25 C 50 26.546875 49.488281 27.976563 48.636719 29.136719 L 44 24.5 Z M 15 20 C 14.449219 20 14 20.445313 14 21 L 14 41 C 14 41.554688 14.449219 42 15 42 C 15.550781 42 16 41.554688 16 41 L 16 34 L 21 34 C 23.757813 34 26 31.757813 26 29 L 26 25 C 26 22.242188 23.757813 20 21 20 Z M 16 22 L 21 22 C 22.652344 22 24 23.347656 24 25 L 24 29 C 24 30.652344 22.652344 32 21 32 L 16 32 Z M 42 38 L 44 38 L 44 44 L 42 44 Z M 38 41 L 40 41 L 40 44 L 38 44 Z M 46 42 L 48 42 L 48 44 L 46 44 Z " }) })
);
const WordFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 21.65625 4 C 20.320313 4 19.0625 4.519531 18.121094 5.464844 L 9.464844 14.121094 C 8.519531 15.066406 8 16.320313 8 17.65625 L 8 57 C 8 58.652344 9.347656 60 11 60 L 51 60 C 52.652344 60 54 58.652344 54 57 L 54 7 C 54 5.347656 52.652344 4 51 4 Z M 22 6 L 51 6 C 51.550781 6 52 6.449219 52 7 L 52 57 C 52 57.550781 51.550781 58 51 58 L 11 58 C 10.449219 58 10 57.550781 10 57 L 10 18 L 19 18 C 20.652344 18 22 16.652344 22 15 Z M 20 6.5 L 20 15 C 20 15.550781 19.550781 16 19 16 L 10.5 16 C 10.613281 15.832031 10.738281 15.675781 10.878906 15.535156 L 19.535156 6.878906 C 19.679688 6.734375 19.835938 6.609375 20 6.5 Z M 21.140625 23.011719 C 21.015625 22.992188 20.878906 22.996094 20.746094 23.03125 C 20.210938 23.175781 19.894531 23.722656 20.03125 24.253906 L 25.03125 43.253906 C 25.148438 43.691406 25.539063 43.996094 25.984375 44 L 26 44 C 26.441406 44 26.832031 43.710938 26.957031 43.28125 L 31 29.546875 L 35.042969 43.28125 C 35.167969 43.707031 35.558594 44 36 44 L 36.015625 44 C 36.460938 43.992188 36.851563 43.6875 36.96875 43.253906 L 41.96875 24.253906 C 42.105469 23.722656 41.789063 23.175781 41.253906 23.03125 C 40.71875 22.890625 40.171875 23.210938 40.03125 23.746094 L 35.945313 39.273438 L 31.957031 25.71875 C 31.832031 25.292969 31.445313 25 31 25 C 30.554688 25 30.167969 25.292969 30.042969 25.71875 L 26.054688 39.277344 L 21.96875 23.746094 C 21.863281 23.347656 21.527344 23.066406 21.140625 23.011719 Z M 13 52 C 12.449219 52 12 52.445313 12 53 L 12 55 C 12 55.554688 12.449219 56 13 56 C 13.550781 56 14 55.554688 14 55 L 14 53 C 14 52.445313 13.550781 52 13 52 Z M 18 52 C 17.449219 52 17 52.445313 17 53 L 17 55 C 17 55.554688 17.449219 56 18 56 C 18.550781 56 19 55.554688 19 55 L 19 53 C 19 52.445313 18.550781 52 18 52 Z M 23 52 C 22.449219 52 22 52.445313 22 53 L 22 55 C 22 55.554688 22.449219 56 23 56 C 23.550781 56 24 55.554688 24 55 L 24 53 C 24 52.445313 23.550781 52 23 52 Z M 28 52 C 27.449219 52 27 52.445313 27 53 L 27 55 C 27 55.554688 27.449219 56 28 56 C 28.550781 56 29 55.554688 29 55 L 29 53 C 29 52.445313 28.550781 52 28 52 Z M 33 52 C 32.449219 52 32 52.445313 32 53 L 32 55 C 32 55.554688 32.449219 56 33 56 C 33.550781 56 34 55.554688 34 55 L 34 53 C 34 52.445313 33.550781 52 33 52 Z M 38 52 C 37.449219 52 37 52.445313 37 53 L 37 55 C 37 55.554688 37.449219 56 38 56 C 38.550781 56 39 55.554688 39 55 L 39 53 C 39 52.445313 38.550781 52 38 52 Z M 43 52 C 42.449219 52 42 52.445313 42 53 L 42 55 C 42 55.554688 42.449219 56 43 56 C 43.550781 56 44 55.554688 44 55 L 44 53 C 44 52.445313 43.550781 52 43 52 Z M 48 52 C 47.449219 52 47 52.445313 47 53 L 47 55 C 47 55.554688 47.449219 56 48 56 C 48.550781 56 49 55.554688 49 55 L 49 53 C 49 52.445313 48.550781 52 48 52 Z " }) })
);
const SpreadsheetFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 35.136719 2.386719 C 34.917969 2.378906 34.699219 2.390625 34.480469 2.429688 L 5.304688 7.578125 C 3.390625 7.917969 2 9.574219 2 11.515625 L 2 50.484375 C 2 52.429688 3.390625 54.085938 5.304688 54.421875 L 34.480469 59.570313 C 34.652344 59.601563 34.828125 59.613281 35 59.613281 C 35.703125 59.613281 36.382813 59.371094 36.925781 58.914063 C 37.609375 58.34375 38 57.503906 38 56.613281 L 38 52 L 57 52 C 58.652344 52 60 50.652344 60 49 L 60 13 C 60 11.347656 58.652344 10 57 10 L 38 10 L 38 5.382813 C 38 4.496094 37.609375 3.65625 36.925781 3.085938 C 36.417969 2.65625 35.789063 2.414063 35.136719 2.386719 Z M 35.105469 4.390625 C 35.359375 4.414063 35.542969 4.535156 35.640625 4.617188 C 35.777344 4.730469 36 4.980469 36 5.382813 L 36 56.613281 C 36 57.019531 35.777344 57.269531 35.640625 57.382813 C 35.507813 57.496094 35.226563 57.671875 34.828125 57.601563 L 5.652344 52.453125 C 4.695313 52.285156 4 51.457031 4 50.484375 L 4 11.515625 C 4 10.542969 4.695313 9.714844 5.652344 9.546875 L 34.824219 4.398438 C 34.925781 4.382813 35.019531 4.378906 35.105469 4.390625 Z M 38 12 L 57 12 C 57.550781 12 58 12.449219 58 13 L 58 49 C 58 49.550781 57.550781 50 57 50 L 38 50 L 38 44 L 41 44 C 41.550781 44 42 43.554688 42 43 C 42 42.445313 41.550781 42 41 42 L 38 42 L 38 38 L 41 38 C 41.550781 38 42 37.554688 42 37 C 42 36.445313 41.550781 36 41 36 L 38 36 L 38 32 L 41 32 C 41.550781 32 42 31.554688 42 31 C 42 30.445313 41.550781 30 41 30 L 38 30 L 38 26 L 41 26 C 41.550781 26 42 25.554688 42 25 C 42 24.445313 41.550781 24 41 24 L 38 24 L 38 20 L 41 20 C 41.550781 20 42 19.554688 42 19 C 42 18.445313 41.550781 18 41 18 L 38 18 Z M 45 18 C 44.449219 18 44 18.445313 44 19 C 44 19.554688 44.449219 20 45 20 L 51 20 C 51.550781 20 52 19.554688 52 19 C 52 18.445313 51.550781 18 51 18 Z M 12.824219 20.015625 C 12.695313 20.039063 12.570313 20.085938 12.453125 20.160156 C 11.992188 20.460938 11.859375 21.082031 12.160156 21.546875 L 18.308594 31 L 12.160156 40.453125 C 11.859375 40.917969 11.992188 41.539063 12.453125 41.839844 C 12.625 41.949219 12.8125 42 13 42 C 13.324219 42 13.648438 41.839844 13.839844 41.546875 L 19.5 32.835938 L 25.160156 41.546875 C 25.351563 41.839844 25.675781 42 26 42 C 26.1875 42 26.375 41.949219 26.546875 41.839844 C 27.007813 41.539063 27.140625 40.917969 26.839844 40.453125 L 20.691406 31 L 26.839844 21.546875 C 27.140625 21.082031 27.007813 20.460938 26.546875 20.160156 C 26.082031 19.859375 25.460938 19.992188 25.160156 20.453125 L 19.5 29.164063 L 13.839844 20.453125 C 13.613281 20.105469 13.207031 19.945313 12.824219 20.015625 Z M 45 24 C 44.449219 24 44 24.445313 44 25 C 44 25.554688 44.449219 26 45 26 L 51 26 C 51.550781 26 52 25.554688 52 25 C 52 24.445313 51.550781 24 51 24 Z M 45 30 C 44.449219 30 44 30.445313 44 31 C 44 31.554688 44.449219 32 45 32 L 51 32 C 51.550781 32 52 31.554688 52 31 C 52 30.445313 51.550781 30 51 30 Z M 45 36 C 44.449219 36 44 36.445313 44 37 C 44 37.554688 44.449219 38 45 38 L 51 38 C 51.550781 38 52 37.554688 52 37 C 52 36.445313 51.550781 36 51 36 Z M 45 42 C 44.449219 42 44 42.445313 44 43 C 44 43.554688 44.449219 44 45 44 L 51 44 C 51.550781 44 52 43.554688 52 43 C 52 42.445313 51.550781 42 51 42 Z " }) })
);
const SharedFolderFileIcon = createSvgIcon(
  /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M 3 8 C 1.347656 8 0 9.347656 0 11 L 0 52 C 0 54.207031 1.792969 56 4 56 L 58 56 C 60.207031 56 62 54.207031 62 52 L 62 21 C 62 19.347656 60.652344 18 59 18 L 56 18 L 56 17 C 56 15.347656 54.652344 14 53 14 L 27.707031 14 C 26.910156 14 26.164063 13.691406 25.597656 13.132813 L 21.875 9.445313 C 20.929688 8.515625 19.679688 8 18.355469 8 Z M 3 10 L 18.355469 10 C 19.152344 10 19.898438 10.308594 20.464844 10.867188 L 24.1875 14.554688 C 25.132813 15.484375 26.382813 16 27.707031 16 L 53 16 C 53.550781 16 54 16.449219 54 17 L 54 52 C 54 52.617188 54.222656 53.339844 54.632813 54 L 4 54 C 2.898438 54 2 53.101563 2 52 L 2 46 L 43 46 C 43.550781 46 44 45.550781 44 45 C 44 44.449219 43.550781 44 43 44 L 2 44 L 2 11 C 2 10.449219 2.449219 10 3 10 Z M 56 20 L 59 20 C 59.550781 20 60 20.449219 60 21 L 60 52 C 60 53.101563 59.101563 54 58 54 C 56.753906 54 56 52.609375 56 52 Z M 27 22 C 24.242188 22 22 24.242188 22 27 L 22 29 C 22 29.992188 22.300781 30.914063 22.800781 31.691406 C 20.058594 32.886719 17.882813 35.527344 17.28125 38.765625 C 17.179688 39.3125 17.539063 39.832031 18.082031 39.933594 C 18.625 40.035156 19.148438 39.675781 19.25 39.132813 C 19.785156 36.242188 21.863281 33.949219 24.371094 33.234375 C 25.136719 33.710938 26.03125 34 27 34 C 27.96875 34 28.863281 33.710938 29.628906 33.234375 C 32.136719 33.949219 34.214844 36.246094 34.75 39.136719 C 34.839844 39.617188 35.261719 39.953125 35.734375 39.953125 C 35.796875 39.953125 35.855469 39.949219 35.917969 39.9375 C 36.460938 39.835938 36.820313 39.3125 36.71875 38.769531 C 36.117188 35.53125 33.941406 32.886719 31.199219 31.691406 C 31.699219 30.914063 32 29.992188 32 29 L 32 27 C 32 24.242188 29.757813 22 27 22 Z M 27 24 C 28.652344 24 30 25.347656 30 27 L 30 29 C 30 30.652344 28.652344 32 27 32 C 25.347656 32 24 30.652344 24 29 L 24 27 C 24 25.347656 25.347656 24 27 24 Z M 47 44 C 46.449219 44 46 44.449219 46 45 C 46 45.550781 46.449219 46 47 46 L 51 46 C 51.550781 46 52 45.550781 52 45 C 52 44.449219 51.550781 44 51 44 Z M 5 48 C 4.449219 48 4 48.449219 4 49 L 4 51 C 4 51.550781 4.449219 52 5 52 C 5.550781 52 6 51.550781 6 51 L 6 49 C 6 48.449219 5.550781 48 5 48 Z M 10 48 C 9.449219 48 9 48.449219 9 49 L 9 51 C 9 51.550781 9.449219 52 10 52 C 10.550781 52 11 51.550781 11 51 L 11 49 C 11 48.449219 10.550781 48 10 48 Z M 15 48 C 14.449219 48 14 48.449219 14 49 L 14 51 C 14 51.550781 14.449219 52 15 52 C 15.550781 52 16 51.550781 16 51 L 16 49 C 16 48.449219 15.550781 48 15 48 Z M 20 48 C 19.449219 48 19 48.449219 19 49 L 19 51 C 19 51.550781 19.449219 52 20 52 C 20.550781 52 21 51.550781 21 51 L 21 49 C 21 48.449219 20.550781 48 20 48 Z M 25 48 C 24.449219 48 24 48.449219 24 49 L 24 51 C 24 51.550781 24.449219 52 25 52 C 25.550781 52 26 51.550781 26 51 L 26 49 C 26 48.449219 25.550781 48 25 48 Z M 30 48 C 29.449219 48 29 48.449219 29 49 L 29 51 C 29 51.550781 29.449219 52 30 52 C 30.550781 52 31 51.550781 31 51 L 31 49 C 31 48.449219 30.550781 48 30 48 Z M 35 48 C 34.449219 48 34 48.449219 34 49 L 34 51 C 34 51.550781 34.449219 52 35 52 C 35.550781 52 36 51.550781 36 51 L 36 49 C 36 48.449219 35.550781 48 35 48 Z M 40 48 C 39.449219 48 39 48.449219 39 49 L 39 51 C 39 51.550781 39.449219 52 40 52 C 40.550781 52 41 51.550781 41 51 L 41 49 C 41 48.449219 40.550781 48 40 48 Z M 45 48 C 44.449219 48 44 48.449219 44 49 L 44 51 C 44 51.550781 44.449219 52 45 52 C 45.550781 52 46 51.550781 46 51 L 46 49 C 46 48.449219 45.550781 48 45 48 Z M 50 48 C 49.449219 48 49 48.449219 49 49 L 49 51 C 49 51.550781 49.449219 52 50 52 C 50.550781 52 51 51.550781 51 51 L 51 49 C 51 48.449219 50.550781 48 50 48 Z " }) })
);
function FileTypeIcon({ type, mime, className, size }) {
  if (!type && mime) {
    type = mime.split("/")[0];
  }
  const Icon = FileTypeIcons[type] || FileTypeIcons.default;
  return /* @__PURE__ */ jsx(
    Icon,
    {
      size,
      className: clsx(className, `${type}-file-color`),
      viewBox: "0 0 64 64"
    }
  );
}
const FileTypeIcons = {
  default: DefaultFileIcon,
  audio: AudioFileIcon,
  video: VideoFileIcon,
  text: TextFileIcon,
  pdf: PdfFileIcon,
  archive: ArchiveFileIcon,
  folder: FolderFileIcon,
  sharedFolder: SharedFolderFileIcon,
  image: ImageFileIcon,
  powerPoint: PowerPointFileIcon,
  word: WordFileIcon,
  spreadsheet: SpreadsheetFileIcon
};
const FileEntryUrlsContext = React.createContext(null);
function useFileEntryUrls(entry, options) {
  const { base_url } = useSettings();
  const urlSearchParams = useContext(FileEntryUrlsContext);
  return useMemo(() => {
    if (!entry) {
      return {};
    }
    let previewUrl;
    if (entry.url) {
      previewUrl = isAbsoluteUrl(entry.url) ? entry.url : `${base_url}/${entry.url}`;
    }
    const urls = {
      previewUrl,
      downloadUrl: `${base_url}/api/v1/file-entries/download/${(options == null ? void 0 : options.downloadHashes) || entry.hash}`
    };
    if (urlSearchParams) {
      if (urls.previewUrl) {
        urls.previewUrl = addParams(
          urls.previewUrl,
          { ...urlSearchParams, thumbnail: (options == null ? void 0 : options.thumbnail) ? "true" : "" },
          base_url
        );
      }
      urls.downloadUrl = addParams(urls.downloadUrl, urlSearchParams, base_url);
    }
    return urls;
  }, [
    base_url,
    entry,
    options == null ? void 0 : options.downloadHashes,
    options == null ? void 0 : options.thumbnail,
    urlSearchParams
  ]);
}
function addParams(urlString, params, baseUrl) {
  const url = new URL(urlString, baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}
function downloadFileFromUrl(url, name) {
  const link = document.createElement("a");
  link.href = url;
  if (name)
    link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
const FilePreviewContext = React.createContext(
  null
);
function DefaultFilePreview({ message, className, allowDownload }) {
  const { entries, activeIndex } = useContext(FilePreviewContext);
  const activeEntry = entries[activeIndex];
  const content = message || /* @__PURE__ */ jsx(Trans, { message: "No file preview available" });
  const { downloadUrl } = useFileEntryUrls(activeEntry);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "shadow bg-paper max-w-400 w-[calc(100%-40px)] text-center p-40 rounded"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "text-lg", children: content }),
        allowDownload && /* @__PURE__ */ jsx("div", { className: "block mt-20 text-center", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            onClick: () => {
              if (downloadUrl) {
                downloadFileFromUrl(downloadUrl);
              }
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Download" })
          }
        ) })
      ]
    }
  );
}
function ImageFilePreview(props) {
  const { entry, className } = props;
  const { trans } = useTrans();
  const { previewUrl } = useFileEntryUrls(entry);
  if (!previewUrl) {
    return /* @__PURE__ */ jsx(DefaultFilePreview, { ...props });
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      className: clsx(className, "shadow"),
      src: previewUrl,
      alt: trans({
        message: "Preview for :name",
        values: { name: entry.name }
      })
    }
  );
}
const FIVE_MB = 5242880;
function TextFilePreview(props) {
  const { entry, className } = props;
  const { trans } = useTrans();
  const [tooLarge, setTooLarge] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [contents, setContents] = useState(null);
  const { previewUrl } = useFileEntryUrls(entry);
  useEffect(() => {
    if (!entry)
      return;
    if (!previewUrl) {
      setIsFailed(true);
    } else if (entry.file_size >= FIVE_MB) {
      setTooLarge(true);
      setIsLoading(false);
    } else {
      getFileContents(previewUrl).then((response) => {
        setContents(response.data);
      }).catch(() => {
        setIsFailed(true);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [entry, previewUrl]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(
      ProgressCircle,
      {
        isIndeterminate: true,
        "aria-label": trans({ message: "Loading file contents" })
      }
    );
  }
  if (tooLarge) {
    return /* @__PURE__ */ jsx(
      DefaultFilePreview,
      {
        ...props,
        message: /* @__PURE__ */ jsx(Trans, { message: "This file is too large to preview." })
      }
    );
  }
  if (isFailed) {
    return /* @__PURE__ */ jsx(
      DefaultFilePreview,
      {
        ...props,
        message: /* @__PURE__ */ jsx(Trans, { message: "There was an issue previewing this file" })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "pre",
    {
      className: clsx(
        "rounded bg-paper p-20 text-sm whitespace-pre-wrap break-words h-full overflow-y-auto w-full",
        className
      ),
      children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: `${contents}` })
    }
  );
}
function getFileContents(src) {
  return apiClient.get(src, {
    responseType: "text",
    // required for s3 presigned url to work
    withCredentials: false,
    headers: {
      Accept: "text/plain"
    }
  });
}
function VideoFilePreview(props) {
  const { entry, className } = props;
  const { previewUrl } = useFileEntryUrls(entry);
  const ref = useRef(null);
  const [mediaInvalid, setMediaInvalid] = useState(false);
  useEffect(() => {
    var _a;
    setMediaInvalid(!((_a = ref.current) == null ? void 0 : _a.canPlayType(entry.mime)));
  }, [entry]);
  if (mediaInvalid || !previewUrl) {
    return /* @__PURE__ */ jsx(DefaultFilePreview, { ...props });
  }
  return /* @__PURE__ */ jsx(
    "video",
    {
      className,
      ref,
      controls: true,
      controlsList: "nodownload noremoteplayback",
      playsInline: true,
      autoPlay: true,
      children: /* @__PURE__ */ jsx(
        "source",
        {
          src: previewUrl,
          type: entry.mime,
          onError: () => {
            setMediaInvalid(true);
          }
        }
      )
    }
  );
}
function AudioFilePreview(props) {
  const { entry, className } = props;
  const { previewUrl } = useFileEntryUrls(entry);
  const ref = useRef(null);
  const [mediaInvalid, setMediaInvalid] = useState(false);
  useEffect(() => {
    var _a;
    setMediaInvalid(!((_a = ref.current) == null ? void 0 : _a.canPlayType(entry.mime)));
  }, [entry]);
  if (mediaInvalid || !previewUrl) {
    return /* @__PURE__ */ jsx(DefaultFilePreview, { ...props });
  }
  return /* @__PURE__ */ jsx(
    "audio",
    {
      className,
      ref,
      controls: true,
      controlsList: "nodownload noremoteplayback",
      autoPlay: true,
      children: /* @__PURE__ */ jsx(
        "source",
        {
          src: previewUrl,
          type: entry.mime,
          onError: () => {
            setMediaInvalid(true);
          }
        }
      )
    }
  );
}
function PdfFilePreview(props) {
  const { entry, className } = props;
  const { trans } = useTrans();
  const { previewUrl } = useFileEntryUrls(entry);
  if (!previewUrl) {
    return /* @__PURE__ */ jsx(DefaultFilePreview, { ...props });
  }
  return /* @__PURE__ */ jsx(
    "iframe",
    {
      title: trans({
        message: "Preview for :name",
        values: { name: entry.name }
      }),
      className: clsx(className, "w-full h-full"),
      src: `${previewUrl}#toolbar=0`
    }
  );
}
function WordDocumentFilePreview(props) {
  const { entry, className } = props;
  const { trans } = useTrans();
  const ref = useRef(null);
  const [showDefault, setShowDefault] = useState(false);
  const timeoutId = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { previewUrl } = useFileEntryUrls(entry);
  useEffect(() => {
    if (!previewUrl) {
      setShowDefault(true);
    } else if (entry.file_size && entry.file_size > 25e6) {
      setShowDefault(true);
    } else if (ref.current) {
      ref.current.onload = () => {
        clearTimeout(timeoutId.current);
        setIsLoading(false);
      };
      buildPreviewUrl(previewUrl, entry).then((url) => {
        if (ref.current) {
          ref.current.src = url;
        }
      });
      timeoutId.current = setTimeout(() => {
        setShowDefault(true);
      }, 5e3);
    }
  }, [entry, previewUrl]);
  if (showDefault) {
    return /* @__PURE__ */ jsx(DefaultFilePreview, { ...props });
  }
  return /* @__PURE__ */ jsxs("div", { className: clsx(className, "w-full h-full"), children: [
    isLoading && /* @__PURE__ */ jsx(ProgressCircle, {}),
    /* @__PURE__ */ jsx(
      "iframe",
      {
        ref,
        title: trans({
          message: "Preview for :name",
          values: { name: entry.name }
        }),
        className: clsx("w-full h-full", isLoading && "hidden")
      }
    )
  ] });
}
async function buildPreviewUrl(urlString, entry) {
  const url = new URL(urlString);
  if (!url.searchParams.has("shareable_link")) {
    const { data } = await apiClient.post(
      `file-entries/${entry.id}/add-preview-token`
    );
    url.searchParams.append("preview_token", data.preview_token);
  }
  return buildOfficeLivePreviewUrl(url);
}
function buildOfficeLivePreviewUrl(url) {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    url.toString()
  )}`;
}
const AvailablePreviews = {
  text: TextFilePreview,
  video: VideoFilePreview,
  audio: AudioFilePreview,
  image: ImageFilePreview,
  pdf: PdfFilePreview,
  spreadsheet: WordDocumentFilePreview,
  powerPoint: WordDocumentFilePreview,
  word: WordDocumentFilePreview,
  "text/rtf": DefaultFilePreview
};
function getPreviewForEntry(entry) {
  const mime = entry == null ? void 0 : entry.mime;
  const type = entry == null ? void 0 : entry.type;
  return AvailablePreviews[mime] || AvailablePreviews[type] || DefaultFilePreview;
}
const ChevronLeftIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" }),
  "ChevronLeftOutlined"
);
const FileDownloadIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z" }),
  "FileDownloadOutlined"
);
const TwoMB$1 = 2 * 1024 * 1024;
function FileThumbnail({
  file,
  className,
  iconClassName,
  showImage = true
}) {
  const { trans } = useTrans();
  const { previewUrl } = useFileEntryUrls(file, { thumbnail: true });
  if (file.file_size && file.file_size > TwoMB$1 && !file.thumbnail) {
    showImage = false;
  }
  if (showImage && file.type === "image" && previewUrl) {
    const alt = trans({
      message: ":fileName thumbnail",
      values: { fileName: file.name }
    });
    return /* @__PURE__ */ jsx(
      "img",
      {
        className: clsx(className, "object-cover"),
        src: previewUrl,
        alt,
        draggable: false
      }
    );
  }
  return /* @__PURE__ */ jsx(FileTypeIcon, { className: iconClassName, type: file.type });
}
function FilePreviewContainer({
  entries,
  onClose,
  showHeader = true,
  className,
  headerActionsLeft,
  allowDownload = true,
  ...props
}) {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [activeIndex, setActiveIndex] = useControlledState(
    props.activeIndex,
    props.defaultActiveIndex || 0,
    props.onActiveIndexChange
  );
  const activeEntry = entries[activeIndex];
  const contextValue = useMemo(() => {
    return { entries, activeIndex };
  }, [entries, activeIndex]);
  const Preview = getPreviewForEntry(activeEntry);
  if (!activeEntry) {
    onClose == null ? void 0 : onClose();
    return null;
  }
  const canOpenNext = entries.length - 1 > activeIndex;
  const openNext = () => {
    setActiveIndex(activeIndex + 1);
  };
  const canOpenPrevious = activeIndex > 0;
  const openPrevious = () => {
    setActiveIndex(activeIndex - 1);
  };
  return /* @__PURE__ */ jsxs(FilePreviewContext.Provider, { value: contextValue, children: [
    showHeader && /* @__PURE__ */ jsx(
      Header,
      {
        actionsLeft: headerActionsLeft,
        isMobile,
        onClose,
        onNext: canOpenNext ? openNext : void 0,
        onPrevious: canOpenPrevious ? openPrevious : void 0,
        allowDownload
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: clsx("overflow-hidden relative flex-auto", className), children: [
      isMobile && /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "lg",
          className: "text-muted absolute left-0 top-1/2 transform -translate-y-1/2 z-10",
          disabled: !canOpenPrevious,
          onClick: openPrevious,
          children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsx(
        m.div,
        {
          className: "absolute inset-0 flex items-center justify-center",
          ...opacityAnimation,
          children: /* @__PURE__ */ jsx(
            Preview,
            {
              className: "max-h-[calc(100%-30px)]",
              entry: activeEntry,
              allowDownload
            }
          )
        },
        activeEntry.id
      ) }),
      isMobile && /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "lg",
          className: "text-muted absolute right-0 top-1/2 transform -translate-y-1/2 z-10",
          disabled: !canOpenNext,
          onClick: openNext,
          children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
        }
      )
    ] })
  ] });
}
function Header({
  onNext,
  onPrevious,
  onClose,
  isMobile,
  actionsLeft,
  allowDownload
}) {
  const { entries, activeIndex } = useContext(FilePreviewContext);
  const activeEntry = entries[activeIndex];
  const { downloadUrl } = useFileEntryUrls(activeEntry);
  const desktopDownloadButton = /* @__PURE__ */ jsx(
    Button,
    {
      startIcon: /* @__PURE__ */ jsx(FileDownloadIcon, {}),
      variant: "text",
      onClick: () => {
        if (downloadUrl) {
          downloadFileFromUrl(downloadUrl);
        }
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Download" })
    }
  );
  const mobileDownloadButton = /* @__PURE__ */ jsx(
    IconButton,
    {
      onClick: () => {
        if (downloadUrl) {
          downloadFileFromUrl(downloadUrl);
        }
      },
      children: /* @__PURE__ */ jsx(FileDownloadIcon, {})
    }
  );
  const downloadButton = isMobile ? mobileDownloadButton : desktopDownloadButton;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-20 bg-paper border-b flex-shrink-0 text-sm min-h-50 px-10 text-muted", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 w-1/3 justify-start", children: [
      actionsLeft,
      allowDownload ? downloadButton : void 0
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10 w-1/3 justify-center flex-nowrap text-main", children: [
      /* @__PURE__ */ jsx(
        FileThumbnail,
        {
          file: activeEntry,
          iconClassName: "w-16 h-16",
          showImage: false
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "whitespace-nowrap overflow-hidden overflow-ellipsis", children: activeEntry.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-1/3 flex items-center gap-10 justify-end whitespace-nowrap", children: [
      !isMobile && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(IconButton, { disabled: !onPrevious, onClick: onPrevious, children: /* @__PURE__ */ jsx(ChevronLeftIcon, {}) }),
        /* @__PURE__ */ jsx("div", { children: activeIndex + 1 }),
        /* @__PURE__ */ jsx("div", { children: "/" }),
        /* @__PURE__ */ jsx("div", { children: entries.length }),
        /* @__PURE__ */ jsx(IconButton, { disabled: !onNext, onClick: onNext, children: /* @__PURE__ */ jsx(ChevronRightIcon, {}) }),
        /* @__PURE__ */ jsx("div", { className: "bg-divider w-1 h-24 mx-20" })
      ] }),
      /* @__PURE__ */ jsx(IconButton, { radius: "rounded-none", onClick: onClose, children: /* @__PURE__ */ jsx(CloseIcon, {}) })
    ] })
  ] });
}
function FilePreviewDialog(props) {
  return /* @__PURE__ */ jsx(
    Dialog,
    {
      size: "fullscreenTakeover",
      background: "bg-alt",
      className: "flex flex-col",
      children: /* @__PURE__ */ jsx(Content, { ...props })
    }
  );
}
function Content(props) {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(FilePreviewContainer, { onClose: close, ...props });
}
const previewSearchParams = {
  ticketEntry: "true"
};
function AttachmentListLayout({ children, className }) {
  return /* @__PURE__ */ jsx(FileEntryUrlsContext.Provider, { value: previewSearchParams, children: /* @__PURE__ */ jsx("div", { className: clsx("flex items-center gap-8", className), children }) });
}
const AttachmentLayout = forwardRef(({ name, mime, size, onRemove, progress, ...htmlProps }, ref) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: clsx(
        "relative flex min-h-30 w-max flex-shrink-0 items-center gap-6 rounded-lg border pl-8 transition-opacity",
        ref && "cursor-pointer hover:bg-hover",
        !onRemove && "pr-8"
      ),
      ...htmlProps,
      children: [
        /* @__PURE__ */ jsx(FileTypeIcon, { mime, size: "xs" }),
        /* @__PURE__ */ jsx("div", { className: "max-w-140 overflow-hidden overflow-ellipsis whitespace-nowrap text-xs font-bold text-muted", children: name }),
        size ? /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted", children: [
          "(",
          /* @__PURE__ */ jsx(FormattedBytes, { bytes: size }),
          ")"
        ] }) : null,
        onRemove ? /* @__PURE__ */ jsx(
          IconButton,
          {
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            },
            size: "xs",
            className: "text-muted",
            children: /* @__PURE__ */ jsx(CloseIcon, {})
          }
        ) : null,
        progress ? /* @__PURE__ */ jsx(
          ProgressBar,
          {
            value: progress,
            className: "absolute bottom-0 left-0 w-full",
            size: "xs"
          }
        ) : null
      ]
    }
  );
});
function FileEntryAttachmentLayout({
  attachments,
  index,
  onRemove
}) {
  const attachment = attachments[index];
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(
      AttachmentLayout,
      {
        name: attachment.name,
        mime: attachment.mime,
        size: attachment.file_size,
        onRemove
      }
    ),
    /* @__PURE__ */ jsx(FilePreviewDialog, { entries: attachments, defaultActiveIndex: index })
  ] });
}
function ReplyEditorAttachments({ attachments, onRemove }) {
  const uploads = useFileUploadStore((s) => s.fileUploads);
  const abortUpload = useFileUploadStore((s) => s.abortUpload);
  return /* @__PURE__ */ jsxs(AttachmentListLayout, { className: "mb-8", children: [
    attachments.map((attachment, index) => /* @__PURE__ */ jsx(
      FileEntryAttachmentLayout,
      {
        attachments,
        index,
        onRemove: () => onRemove(attachment)
      },
      attachment.id
    )),
    [...uploads.entries()].filter(([_, upload]) => upload.status === "inProgress").map(([id, upload]) => /* @__PURE__ */ jsx(
      AttachmentLayout,
      {
        size: upload.file.size,
        name: upload.file.name,
        mime: upload.file.mime,
        progress: upload.percentage,
        onRemove: () => abortUpload(id)
      },
      id
    ))
  ] });
}
function Divider() {
  return /* @__PURE__ */ jsx("div", { className: "self-stretch mx-4 w-1 bg-divider flex-shrink-0" });
}
const FormatBoldIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" }),
  "FormatBoldOutlined"
);
const FormatItalicIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" }),
  "FormatItalicOutlined"
);
const FormatUnderlinedIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" }),
  "FormatUnderlinedOutlined"
);
function FontStyleButtons({ editor, size }) {
  return /* @__PURE__ */ jsxs("span", { className: clsx("flex-shrink-0 whitespace-nowrap"), children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Bold" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        color: editor.isActive("bold") ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleBold();
        },
        children: /* @__PURE__ */ jsx(FormatBoldIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Italic" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        color: editor.isActive("italic") ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleItalic();
        },
        children: /* @__PURE__ */ jsx(FormatItalicIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Underline" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        color: editor.isActive("underline") ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleUnderline();
        },
        children: /* @__PURE__ */ jsx(FormatUnderlinedIcon, {})
      }
    ) })
  ] });
}
const FormatListBulletedIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" }),
  "FormatListBulletedOutlined"
);
const FormatListNumberedIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" }),
  "FormatListNumberedOutlined"
);
function ListButtons({ editor, size }) {
  const bulletActive = editor.isActive("bulletList");
  const orderedActive = editor.isActive("orderedList");
  return /* @__PURE__ */ jsxs("span", { className: clsx("flex-shrink-0", "whitespace-nowrap"), children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Bulleted list" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        color: bulletActive ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleBulletList();
        },
        children: /* @__PURE__ */ jsx(FormatListBulletedIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Numbered list" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        color: orderedActive ? "primary" : null,
        onClick: () => {
          editor.commands.focus();
          editor.commands.toggleOrderedList();
        },
        children: /* @__PURE__ */ jsx(FormatListNumberedIcon, {})
      }
    ) })
  ] });
}
const LinkIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" }),
  "LinkOutlined"
);
function insertLinkIntoTextEditor(editor, { text, target, href }) {
  if (editor.state.selection.empty && text) {
    editor.commands.insertContent(
      `<a href="${href}" target="${target}">${text}</a>`
    );
  } else if (!editor.state.selection.empty) {
    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href, target }).run();
    }
  }
}
function LinkButton({ editor, size }) {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Insert link" }), children: /* @__PURE__ */ jsx(IconButton, { size, className: clsx("flex-shrink-0"), children: /* @__PURE__ */ jsx(LinkIcon, {}) }) }),
    /* @__PURE__ */ jsx(LinkDialog, { editor })
  ] });
}
function LinkDialog({ editor }) {
  const previousUrl = editor.getAttributes("link").href;
  const previousText = editor.state.doc.textBetween(
    editor.state.selection.from,
    editor.state.selection.to,
    ""
  );
  const form = useForm({
    defaultValues: { href: previousUrl, text: previousText, target: "_blank" }
  });
  const { formId, close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Insert link" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        id: formId,
        onSubmit: (value) => {
          insertLinkIntoTextEditor(editor, value);
          close();
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "href",
              label: /* @__PURE__ */ jsx(Trans, { message: "URL" }),
              autoFocus: true,
              type: "url",
              className: "mb-20"
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "text",
              label: /* @__PURE__ */ jsx(Trans, { message: "Text to display" }),
              className: "mb-20"
            }
          ),
          /* @__PURE__ */ jsxs(
            FormSelect,
            {
              selectionMode: "single",
              name: "target",
              label: /* @__PURE__ */ jsx(Trans, { message: "Open link in..." }),
              children: [
                /* @__PURE__ */ jsx(Item, { value: "_self", children: /* @__PURE__ */ jsx(Trans, { message: "Current window" }) }),
                /* @__PURE__ */ jsx(Item, { value: "_blank", children: /* @__PURE__ */ jsx(Trans, { message: "New window" }) })
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: close, variant: "text", children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", form: formId, variant: "flat", color: "primary", children: /* @__PURE__ */ jsx(Trans, { message: "Save" }) })
    ] })
  ] });
}
const ImageIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86-3 3.87L9 13.14 6 17h12l-3.86-5.14z" }),
  "ImageOutlined"
);
const TwoMB = 2097152;
function ImageButton({ editor, size, diskPrefix = "page_media" }) {
  const { selectAndUploadFile } = useActiveUpload();
  const handleUpload = () => {
    selectAndUploadFile({
      showToastOnRestrictionFail: true,
      restrictions: {
        allowedFileTypes: [UploadInputType.image],
        maxFileSize: TwoMB
      },
      metadata: {
        diskPrefix,
        disk: Disk.public
      },
      onSuccess: (entry) => {
        editor.commands.focus();
        editor.commands.setImage({
          src: entry.url
        });
      }
    });
  };
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Insert image" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      size,
      onClick: handleUpload,
      className: clsx("flex-shrink-0"),
      children: /* @__PURE__ */ jsx(ImageIcon, {})
    }
  ) });
}
const FormatClearIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 8V5H6.39l3 3h1.83l-.55 1.28 2.09 2.1L14.21 8zM3.41 4.86 2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21l1.41-1.41z" }),
  "FormatClearOutlined"
);
function ClearFormatButton({ editor, size }) {
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Clear formatting" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      className: clsx("flex-shrink-0"),
      size,
      onClick: () => {
        editor.chain().focus().clearNodes().unsetAllMarks().run();
      },
      children: /* @__PURE__ */ jsx(FormatClearIcon, {})
    }
  ) });
}
const FormatIndentDecreaseIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 17h10v-2H11v2zm-8-5 4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z" }),
  "FormatIndentDecreaseOutlined"
);
const FormatIndentIncreaseIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z" }),
  "FormatIndentIncreaseOutlined"
);
function IndentButtons({ editor, size }) {
  return /* @__PURE__ */ jsxs("span", { className: clsx("flex-shrink-0", "whitespace-nowrap"), children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Decrease indent" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        onClick: () => {
          editor.commands.focus();
          editor.commands.outdent();
        },
        children: /* @__PURE__ */ jsx(FormatIndentDecreaseIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Increase indent" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size,
        onClick: () => {
          editor.commands.focus();
          editor.commands.indent();
        },
        children: /* @__PURE__ */ jsx(FormatIndentIncreaseIcon, {})
      }
    ) })
  ] });
}
const CodeIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" }),
  "CodeOutlined"
);
function CodeBlockMenuTrigger({ editor, size }) {
  const language = editor.getAttributes("codeBlock").language || "";
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      selectionMode: "single",
      selectedValue: language,
      onSelectionChange: (key) => {
        editor.commands.toggleCodeBlock({ language: key });
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Codeblock" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            className: clsx("flex-shrink-0"),
            size,
            color: language ? "primary" : null,
            children: /* @__PURE__ */ jsx(CodeIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsxs(Menu, { children: [
          /* @__PURE__ */ jsx(Item, { value: "html", children: "HTML" }),
          /* @__PURE__ */ jsx(Item, { value: "javascript", children: "JavaScript" }),
          /* @__PURE__ */ jsx(Item, { value: "css", children: "CSS" }),
          /* @__PURE__ */ jsx(Item, { value: "php", children: "PHP" }),
          /* @__PURE__ */ jsx(Item, { value: "shell", children: "Shell" }),
          /* @__PURE__ */ jsx(Item, { value: "bash", children: "Bash" }),
          /* @__PURE__ */ jsx(Item, { value: "ruby", children: "Ruby" }),
          /* @__PURE__ */ jsx(Item, { value: "python", children: "Python" }),
          /* @__PURE__ */ jsx(Item, { value: "java", children: "Java" }),
          /* @__PURE__ */ jsx(Item, { value: "c++", children: "C++" })
        ] })
      ]
    }
  );
}
const AttachmentIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M18.5 16H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h12.5c1.38 0 2.5 1.12 2.5 2.5S20.88 13 19.5 13H9c-.55 0-1-.45-1-1s.45-1 1-1h9.5V9.5H9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h10.5c2.21 0 4-1.79 4-4s-1.79-4-4-4H7c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5h11.5V16z" }),
  "AttachmentOutlined"
);
const MenubarRowClassName = "flex items-center px-4 h-42 text-muted border-b overflow-hidden";
function ReplyEditorMenubar({
  editor,
  size = "sm",
  justify = "justify-start",
  onAttachmentUploaded,
  endButtons
}) {
  const uploadAttachments = useUploadReplyAttachments({
    onSuccess: onAttachmentUploaded
  });
  const handleUpload = async () => {
    const files = await openUploadWindow({
      multiple: true
    });
    if (files.length) {
      uploadAttachments(files);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "h-42", children: /* @__PURE__ */ jsxs("div", { className: clsx(MenubarRowClassName, justify, "relative z-20"), children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Upload attachments" }), children: /* @__PURE__ */ jsx(IconButton, { size, onClick: () => handleUpload(), children: /* @__PURE__ */ jsx(AttachmentIcon, {}) }) }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(FontStyleButtons, { editor, size }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(ListButtons, { editor, size }),
    /* @__PURE__ */ jsx(IndentButtons, { editor, size }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(LinkButton, { editor, size }),
    /* @__PURE__ */ jsx(ImageButton, { editor, size, diskPrefix: "ticket_images" }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(CodeBlockMenuTrigger, { editor, size }),
    /* @__PURE__ */ jsx(ClearFormatButton, { editor, size }),
    endButtons ? cloneElement(endButtons, { size }) : null
  ] }) });
}
function getReplyBody(editorRef) {
  var _a;
  const body = (_a = editorRef.current) == null ? void 0 : _a.getHTML();
  if (body === "<p></p>") {
    return null;
  }
  return body ?? null;
}
const ArticleBodyEditor = React.lazy(
  () => import("./article-body-editor-e46267e1.mjs")
);
function ReplyEditor(props) {
  const onSubmit = useCallbackRef(props.onSubmit);
  const {
    initialContent,
    isLoading,
    onChange,
    footerButtons,
    className,
    editorRef,
    attachments,
    onAttachmentsChange,
    menubarButtons,
    minHeight = "min-h-[243px]",
    autoFocus = "end"
  } = props;
  const uploadAttachments = useUploadReplyAttachments({
    onSuccess: (entry) => onAttachmentsChange([...attachments, entry])
  });
  const containerRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { droppableProps } = useDroppable({
    id: "driveRoot",
    ref: containerRef,
    types: ["nativeFile"],
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    onDrop: async (draggable) => {
      if (draggable.type === "nativeFile") {
        uploadAttachments(await draggable.getData());
      }
    }
  });
  const handleSubmit = useCallback(() => {
    onSubmit({
      body: getReplyBody(editorRef),
      attachments
    });
  }, [attachments, onSubmit, editorRef]);
  return /* @__PURE__ */ jsxs("div", { className, children: [
    !!attachments.length && /* @__PURE__ */ jsx(
      ReplyEditorAttachments,
      {
        attachments,
        onRemove: (attachment) => {
          onAttachmentsChange(
            attachments.filter((a) => a.id !== attachment.id)
          );
        }
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative overflow-hidden rounded border",
        ...droppableProps,
        children: [
          /* @__PURE__ */ jsx("div", { className: minHeight, children: /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(
            ArticleBodyEditor,
            {
              autoFocus,
              initialContent,
              minHeight: "min-h-184",
              onCtrlEnter: handleSubmit,
              onLoad: (editor) => {
                editorRef.current = editor;
                editor.on(
                  "update",
                  debounce(() => onChange == null ? void 0 : onChange(), 300)
                );
              },
              children: (content, editor) => /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  ReplyEditorMenubar,
                  {
                    endButtons: menubarButtons,
                    editor,
                    onAttachmentUploaded: (entry) => {
                      onAttachmentsChange([...attachments, entry]);
                    }
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "m-14", children: /* @__PURE__ */ jsx("div", { className: "ticket-reply-body max-w-none text-sm", children: content }) })
              ] })
            }
          ) }) }),
          footerButtons ? /* @__PURE__ */ jsx("div", { className: "flex justify-end border-t", children: cloneElement(footerButtons, { isLoading, onSubmit: handleSubmit }) }) : null,
          /* @__PURE__ */ jsx(ReplyEditorDropTargetMask, { isVisible: isDragOver })
        ]
      }
    )
  ] });
}
export {
  AttachmentListLayout as A,
  AttachmentIcon as B,
  ChipList as C,
  DataTablePaginationFooter as D,
  ChevronLeftIcon as E,
  FileEntryAttachmentLayout as F,
  FormatBoldIcon as G,
  FormatClearIcon as H,
  IndentButtons as I,
  FormatIndentDecreaseIcon as J,
  FormatIndentIncreaseIcon as K,
  LinkIcon as L,
  FormatItalicIcon as M,
  FormatListBulletedIcon as N,
  FormatListNumberedIcon as O,
  FormatUnderlinedIcon as P,
  ImageIcon as Q,
  ReplyEditor as R,
  Table as T,
  DataTableEmptyStateMessage as a,
  FileDownloadIcon as b,
  draggables as c,
  downloadFileFromUrl as d,
  droppables as e,
  dragSession as f,
  getReplyBody as g,
  dragMonitors as h,
  insertLinkIntoTextEditor as i,
  useCurrentDateTime as j,
  Avatar as k,
  FileTypeIcon as l,
  FilePreviewDialog as m,
  CodeIcon as n,
  Divider as o,
  FontStyleButtons as p,
  ListButtons as q,
  LinkButton as r,
  ImageButton as s,
  CodeBlockMenuTrigger as t,
  useDroppable as u,
  ClearFormatButton as v,
  TableContext as w,
  AccordionAnimation as x,
  hasNextPage as y,
  ArrowDownwardIcon as z
};
//# sourceMappingURL=reply-editor-0dd9f156.mjs.map
