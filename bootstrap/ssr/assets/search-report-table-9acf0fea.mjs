var _a, _b;
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import { aP as ProgressBar, n as apiClient, V as createSvgIcon, B as Button, X as KeyboardArrowDownIcon, T as Trans, e as useTrans, am as FormSelect, i as Item, D as DialogTrigger, d as useDialogContext, b as Dialog, Z as DialogHeader, c as DialogBody, ad as Form, _ as DialogFooter, ak as getInputFieldClassNames, aO as SelectForwardRef, m as message, q as opacityAnimation, U as Tooltip, I as IconButton, w as Skeleton, aY as useField, aZ as Field, bn as useUserTimezone, aN as useIsMobileMediaQuery, be as useSelectedLocale, bf as useDateFormatter, aA as KeyboardArrowLeftIcon, az as KeyboardArrowRightIcon, a as useSettings, aW as DateFormatPresets, bd as shallowEqual, y as getBootstrapData, aF as List, aG as ListItem, b5 as useMediaQuery, a0 as useAutoFocus, al as FormTextField, O as Chip, bo as useListbox, bp as Listbox, bq as Popover, aE as ProgressCircle, br as useListboxKeyboardNavigation, b7 as createEventHandler, bs as useNumberFormatter, C as CloseIcon, ai as ArrowDropDownIcon, bb as Checkbox, Q as queryClient, R as toast, an as onFormQueryError, a5 as FileUploadProvider, a2 as TextField, S as SearchIcon, aC as StaticPageTitle, s as showHttpErrorToast, $ as ConfirmationDialog, o as CheckIcon, a3 as FormattedDate, t as LinkStyle, M as FormattedRelativeTime, bt as CategoryLink, E as IllustratedMessage, F as SvgImage } from "../server-entry.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useId, useMemo, useContext, useState, Children, isValidElement, cloneElement, useCallback, forwardRef, Fragment, memo } from "react";
import clsx from "clsx";
import { useControlledState } from "@react-stately/utils";
import { useFocusManager, FocusScope, createFocusManager } from "@react-aria/focus";
import { useLayoutEffect, useObjectRef, mergeProps } from "@react-aria/utils";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { k as Avatar, j as useCurrentDateTime, C as ChipList, x as AccordionAnimation, R as ReplyEditor, g as getReplyBody, T as Table, D as DataTablePaginationFooter, w as TableContext, a as DataTableEmptyStateMessage } from "./reply-editor-0dd9f156.mjs";
import { useForm, useFormContext, useController } from "react-hook-form";
import { CalendarDate, toZoned, maxDate, minDate, isSameDay, toCalendarDate, startOfMonth, endOfMonth, isSameMonth, today, getMinimumDayInMonth, getMinimumMonthInYear, getDayOfWeek, isToday, getWeeksInMonth, startOfWeek, parseAbsolute, getLocalTimeZone, now, endOfWeek, startOfYear, endOfYear, parseAbsoluteToLocal } from "@internationalized/date";
import { E as EditIcon } from "./Edit-7ad4ec30.mjs";
import { NumberParser } from "@internationalized/number";
import { s as searchImage } from "./search-9f6b7ed0.mjs";
function GlobalLoadingProgress({ query }) {
  if (query.fetchStatus === "fetching") {
    return /* @__PURE__ */ jsx(
      ProgressBar,
      {
        isIndeterminate: true,
        size: "xs",
        className: "fixed left-0 right-0 top-0"
      }
    );
  }
  return null;
}
function useTags(params) {
  return useQuery({
    queryKey: ["tags", params],
    queryFn: () => fetchTags(params)
  });
}
function fetchTags(params) {
  return apiClient.get(`tags`, {
    params: { paginate: "simple", ...params }
  }).then((response) => response.data);
}
const DeleteIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" }),
  "DeleteOutlined"
);
const TabContext = React.createContext(null);
function Tabs(props) {
  const {
    size = "md",
    children,
    className,
    isLazy,
    overflow = "overflow-hidden"
  } = props;
  const tabsRef = useRef([]);
  const id = useId();
  const [selectedTab, setSelectedTab] = useControlledState(
    props.selectedTab,
    props.defaultSelectedTab || 0,
    props.onTabChange
  );
  const ContextValue = useMemo(() => {
    return {
      selectedTab,
      setSelectedTab,
      tabsRef,
      size,
      isLazy,
      id
    };
  }, [selectedTab, id, isLazy, setSelectedTab, size]);
  return /* @__PURE__ */ jsx(TabContext.Provider, { value: ContextValue, children: /* @__PURE__ */ jsx("div", { className: clsx(className, overflow, "max-w-full"), children }) });
}
function Tab({
  index,
  className,
  isDisabled,
  children,
  padding: paddingProp,
  elementType = "button",
  to,
  relative,
  width = "min-w-min"
}) {
  const {
    selectedTab,
    setSelectedTab,
    tabsRef,
    size = "md",
    id
  } = useContext(TabContext);
  const isSelected = index === selectedTab;
  const focusManager = useFocusManager();
  const padding = paddingProp || (size === "sm" ? "px-12" : "px-18");
  const mergedClassname = clsx(
    "tracking-wide overflow-hidden capitalize text-sm flex items-center justify-center outline-none transition-colors",
    "focus-visible:ring focus-visible:ring-2 ring-inset rounded whitespace-nowrap cursor-pointer",
    width,
    textColor({ isDisabled, isSelected }),
    className,
    size === "md" && `${padding} h-48`,
    size === "sm" && `${padding} h-32`,
    isDisabled && "pointer-events-none"
  );
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        focusManager == null ? void 0 : focusManager.focusPrevious();
        break;
      case "ArrowRight":
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "Home":
        focusManager == null ? void 0 : focusManager.focusFirst();
        break;
      case "End":
        focusManager == null ? void 0 : focusManager.focusLast();
        break;
    }
  };
  const tabIndex = isSelected ? 0 : -1;
  const Element = elementType;
  return /* @__PURE__ */ jsx(
    Element,
    {
      disabled: isDisabled,
      id: `${id}-${index}-tab`,
      "aria-controls": `${id}-${index}-tabpanel`,
      type: "button",
      role: "tab",
      "aria-selected": isSelected,
      tabIndex: isDisabled ? void 0 : tabIndex,
      onKeyDown,
      onClick: () => {
        setSelectedTab(index);
      },
      to,
      relative,
      className: mergedClassname,
      ref: (el) => {
        if (tabsRef.current && el) {
          tabsRef.current[index] = el;
        }
      },
      children
    }
  );
}
function textColor({ isDisabled, isSelected }) {
  if (isDisabled) {
    return "text-disabled cursor-default";
  }
  if (isSelected) {
    return "text-primary";
  }
  return "text-muted hover:text-main";
}
function TabLine() {
  const { tabsRef, selectedTab } = useContext(TabContext);
  const [style, setStyle] = useState({
    width: void 0,
    transform: void 0,
    className: void 0
  });
  useLayoutEffect(() => {
    if (selectedTab != null && tabsRef.current) {
      const el = tabsRef.current[selectedTab];
      if (!el)
        return;
      setStyle((prevState) => {
        return {
          width: `${el.offsetWidth}px`,
          transform: `translateX(${el.offsetLeft}px)`,
          // disable initial transition for tabline
          className: prevState.width === void 0 ? "" : "transition-all"
        };
      });
    }
  }, [setStyle, selectedTab, tabsRef]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        "absolute bottom-0 left-0 h-2 bg-primary",
        style.className
      ),
      role: "presentation",
      style: { width: style.width, transform: style.transform }
    }
  );
}
function TabList({ children, center, expand, className }) {
  const childrenArray = Children.toArray(children);
  return /* @__PURE__ */ jsx(FocusScope, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        // hide scrollbar completely on mobile, show compact one on desktop
        "flex relative max-w-full overflow-auto border-b max-sm:hidden-scrollbar md:compact-scrollbar",
        className
      ),
      role: "tablist",
      "aria-orientation": "horizontal",
      children: [
        childrenArray.map((child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              index,
              className: clsx(
                child.props.className,
                expand && "flex-auto",
                center && index === 0 && "ml-auto",
                center && index === childrenArray.length - 1 && "mr-auto"
              )
            });
          }
          return null;
        }),
        /* @__PURE__ */ jsx(TabLine, {})
      ]
    }
  ) });
}
const BackendFiltersUrlKey = "filters";
function decodeBackendFilters(encodedFilters) {
  if (!encodedFilters)
    return [];
  let filtersFromQuery = [];
  try {
    filtersFromQuery = JSON.parse(atob(decodeURIComponent(encodedFilters)));
    filtersFromQuery.map((filterValue) => {
      if (filterValue.valueKey != null) {
        filterValue.value = filterValue.valueKey;
      }
      return filterValue;
    });
  } catch (e) {
  }
  return filtersFromQuery;
}
function encodeBackendFilters(filterValues, filters) {
  if (!filterValues)
    return "";
  filterValues = !filters ? filterValues : filterValues.filter((item) => item.value !== "").map((item) => transformValue(item, filters));
  filterValues = filterValues.filter((fm) => !fm.isInactive);
  if (!filterValues.length) {
    return "";
  }
  return encodeURIComponent(btoa(JSON.stringify(filterValues)));
}
function transformValue(filterValue, filters) {
  var _a2;
  const filterConfig = filters.find((f) => f.key === filterValue.key);
  if ((filterConfig == null ? void 0 : filterConfig.control.type) === "select") {
    const option = (filterConfig.control.options || []).find(
      (o) => o.key === filterValue.value
    );
    if (option) {
      return { ...filterValue, value: option.value, valueKey: option.key };
    }
  }
  if ((_a2 = filterConfig == null ? void 0 : filterConfig.extraFilters) == null ? void 0 : _a2.length) {
    filterValue["extraFilters"] = filterConfig.extraFilters;
  }
  return filterValue;
}
function useBackendFilterUrlParams(filters, pinnedFilters) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const encodedFilters = searchParams.get(BackendFiltersUrlKey);
  const decodedFilters = useMemo(() => {
    if (!filters)
      return [];
    const decoded = decodeBackendFilters(encodedFilters);
    (pinnedFilters || []).forEach((key) => {
      if (!decoded.find((f) => f.key === key)) {
        const config = filters.find((f) => f.key === key);
        decoded.push({
          key,
          value: config.control.defaultValue,
          operator: config.defaultOperator,
          isInactive: true
        });
      }
    });
    decoded.sort(
      (a, b) => filters.findIndex((f) => f.key === a.key) - filters.findIndex((f) => f.key === b.key)
    );
    return decoded;
  }, [encodedFilters, pinnedFilters, filters]);
  const getDecodedWithoutKeys = useCallback(
    (values) => {
      const newFilters = [...decodedFilters];
      values.forEach((value) => {
        const key = typeof value === "object" ? value.key : value;
        const index = newFilters.findIndex((f) => f.key === key);
        if (index > -1) {
          newFilters.splice(index, 1);
        }
      });
      return newFilters;
    },
    [decodedFilters]
  );
  const replaceAll = useCallback(
    (filterValues) => {
      const encodedFilters2 = encodeBackendFilters(filterValues, filters);
      if (encodedFilters2) {
        searchParams.set(BackendFiltersUrlKey, encodedFilters2);
      } else {
        searchParams.delete(BackendFiltersUrlKey);
      }
      navigate({ search: `?${searchParams}` }, { replace: true });
    },
    [filters, navigate, searchParams]
  );
  const add = useCallback(
    (filterValues) => {
      const existing = getDecodedWithoutKeys(filterValues);
      const decodedFilters2 = [...existing, ...filterValues];
      replaceAll(decodedFilters2);
    },
    [getDecodedWithoutKeys, replaceAll]
  );
  const remove = useCallback(
    (key) => replaceAll(getDecodedWithoutKeys([key])),
    [getDecodedWithoutKeys, replaceAll]
  );
  return {
    add,
    remove,
    replaceAll,
    decodedFilters,
    encodedFilters
  };
}
var FilterControlType = /* @__PURE__ */ ((FilterControlType2) => {
  FilterControlType2["Select"] = "select";
  FilterControlType2["DateRangePicker"] = "dateRangePicker";
  FilterControlType2["SelectModel"] = "selectModel";
  FilterControlType2["Input"] = "input";
  FilterControlType2["BooleanToggle"] = "booleanToggle";
  FilterControlType2["ChipField"] = "chipField";
  FilterControlType2["Custom"] = "custom";
  return FilterControlType2;
})(FilterControlType || {});
var FilterOperator = /* @__PURE__ */ ((FilterOperator2) => {
  FilterOperator2["eq"] = "=";
  FilterOperator2["ne"] = "!=";
  FilterOperator2["gt"] = ">";
  FilterOperator2["gte"] = ">=";
  FilterOperator2["lt"] = "<";
  FilterOperator2["lte"] = "<=";
  FilterOperator2["has"] = "has";
  FilterOperator2["hasAll"] = "hasAll";
  FilterOperator2["doesntHave"] = "doesntHave";
  FilterOperator2["between"] = "between";
  return FilterOperator2;
})(FilterOperator || {});
const FilterListTriggerButton = forwardRef((props, ref) => {
  const { isInactive, filter, ...domProps } = props;
  if (isInactive) {
    return /* @__PURE__ */ jsx(InactiveFilterButton, { filter, ...domProps, ref });
  }
  return /* @__PURE__ */ jsx(ActiveFilterButton, { filter, ...domProps, ref });
});
const InactiveFilterButton = forwardRef(({ filter, ...domProps }, ref) => {
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      size: "xs",
      color: "paper",
      radius: "rounded-md",
      border: "border",
      ref,
      endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
      ...domProps,
      children: /* @__PURE__ */ jsx(Trans, { ...filter.label })
    }
  );
});
const ActiveFilterButton = forwardRef(({ filter, children, ...domProps }, ref) => {
  const isBoolean = filter.control.type === FilterControlType.BooleanToggle;
  return /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "outline",
      size: "xs",
      color: "primary",
      radius: "rounded-r-md",
      border: "border-y border-r",
      endIcon: !isBoolean && /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
      ref,
      ...domProps,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              !isBoolean && "border-r border-r-primary-light mr-8 pr-8"
            ),
            children: /* @__PURE__ */ jsx(Trans, { ...filter.label })
          }
        ),
        children
      ]
    }
  );
});
function SelectFilterPanel({
  filter
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    FormSelect,
    {
      size: "sm",
      name: `${filter.key}.value`,
      selectionMode: "single",
      showSearchField: filter.control.showSearchField,
      placeholder: filter.control.placeholder ? trans(filter.control.placeholder) : void 0,
      searchPlaceholder: filter.control.searchPlaceholder ? trans(filter.control.searchPlaceholder) : void 0,
      children: filter.control.options.map((option) => /* @__PURE__ */ jsx(Item, { value: option.key, children: /* @__PURE__ */ jsx(Trans, { ...option.label }) }, option.key))
    }
  );
}
function FilterListItemDialogTrigger(props) {
  const { onValueChange, isInactive, filter, label } = props;
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      offset: 10,
      type: "popover",
      onClose: (value) => {
        if (value !== void 0) {
          onValueChange(value);
        }
      },
      children: [
        /* @__PURE__ */ jsx(FilterListTriggerButton, { isInactive, filter, children: label }),
        /* @__PURE__ */ jsx(FilterListControlDialog, { ...props })
      ]
    }
  );
}
function FilterListControlDialog({
  filter,
  panel,
  value,
  operator
}) {
  const form = useForm({
    defaultValues: {
      [filter.key]: { value, operator }
    }
  });
  const { close, formId } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { size: "xs", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { ...filter.label }) }),
    /* @__PURE__ */ jsx(DialogBody, { padding: "px-14 pt-14 pb-4 max-h-288", children: /* @__PURE__ */ jsxs(
      Form,
      {
        form,
        id: formId,
        onSubmit: (formValue) => {
          close(formValue[filter.key]);
        },
        children: [
          filter.description && /* @__PURE__ */ jsx("div", { className: "text-muted text-xs mb-14", children: /* @__PURE__ */ jsx(Trans, { ...filter.description }) }),
          panel
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(
      Button,
      {
        form: formId,
        type: "submit",
        variant: "flat",
        color: "primary",
        size: "xs",
        children: /* @__PURE__ */ jsx(Trans, { message: "Apply" })
      }
    ) })
  ] });
}
function useNormalizedModels(endpoint, queryParams, queryOptions) {
  return useQuery({
    queryKey: [endpoint, queryParams],
    queryFn: () => fetchModels(endpoint, queryParams),
    placeholderData: keepPreviousData,
    ...queryOptions
  });
}
async function fetchModels(endpoint, params) {
  return apiClient.get(endpoint, { params }).then((r) => r.data);
}
function useNormalizedModel(endpoint, queryParams, queryOptions) {
  return useQuery({
    queryKey: [endpoint, queryParams],
    queryFn: () => fetchModel(endpoint, queryParams),
    ...queryOptions
  });
}
async function fetchModel(endpoint, params) {
  return apiClient.get(endpoint, { params }).then((r) => r.data);
}
function NormalizedModelField({
  label,
  className,
  background,
  value,
  defaultValue = "",
  placeholder = message("Select item..."),
  searchPlaceholder = message("Find an item..."),
  onChange,
  description,
  errorMessage,
  invalid,
  autoFocus,
  queryParams,
  endpoint,
  disabled,
  required
}) {
  var _a2;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useControlledState(
    value,
    defaultValue,
    onChange
  );
  const query = useNormalizedModels(endpoint, {
    query: inputValue,
    ...queryParams
  });
  const { trans } = useTrans();
  const fieldClassNames = getInputFieldClassNames({ size: "md" });
  if (selectedValue) {
    return /* @__PURE__ */ jsxs("div", { className, children: [
      /* @__PURE__ */ jsx("div", { className: fieldClassNames.label, children: label }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(
            "rounded-input border p-8",
            background,
            invalid && "border-danger"
          ),
          children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: /* @__PURE__ */ jsx(
            SelectedModelPreview,
            {
              disabled,
              endpoint,
              modelId: selectedValue,
              queryParams,
              onEditClick: () => {
                setSelectedValue("");
                setInputValue("");
                requestAnimationFrame(() => {
                  var _a3, _b2;
                  (_a3 = inputRef.current) == null ? void 0 : _a3.focus();
                  (_b2 = inputRef.current) == null ? void 0 : _b2.click();
                });
              }
            }
          ) })
        }
      ),
      description && !errorMessage && /* @__PURE__ */ jsx("div", { className: fieldClassNames.description, children: description }),
      errorMessage && /* @__PURE__ */ jsx("div", { className: fieldClassNames.error, children: errorMessage })
    ] });
  }
  return /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      className,
      showSearchField: true,
      invalid,
      errorMessage,
      description,
      color: "white",
      isAsync: true,
      background,
      placeholder: trans(placeholder),
      searchPlaceholder: trans(searchPlaceholder),
      label,
      isLoading: query.isFetching,
      items: (_a2 = query.data) == null ? void 0 : _a2.results,
      inputValue,
      onInputValueChange: setInputValue,
      selectionMode: "single",
      selectedValue,
      onSelectionChange: setSelectedValue,
      ref: inputRef,
      autoFocus,
      disabled,
      required,
      children: (model) => /* @__PURE__ */ jsx(
        Item,
        {
          value: model.id,
          description: model.description,
          startIcon: /* @__PURE__ */ jsx(Avatar, { src: model.image }),
          children: model.name
        },
        model.id
      )
    }
  );
}
function SelectedModelPreview({
  modelId,
  onEditClick,
  endpoint,
  disabled,
  queryParams
}) {
  const { data, isLoading } = useNormalizedModel(
    `${endpoint}/${modelId}`,
    queryParams
  );
  if (isLoading || !(data == null ? void 0 : data.model)) {
    return /* @__PURE__ */ jsx(LoadingSkeleton, {}, "skeleton");
  }
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      className: clsx(
        "flex items-center gap-10",
        disabled && "pointer-events-none cursor-not-allowed text-disabled"
      ),
      ...opacityAnimation,
      children: [
        data.model.image && /* @__PURE__ */ jsx(Avatar, { src: data.model.image }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm leading-4", children: data.model.name }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: data.model.description })
        ] }),
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Change item" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            className: "ml-auto text-muted",
            size: "sm",
            onClick: onEditClick,
            disabled,
            children: /* @__PURE__ */ jsx(EditIcon, {})
          }
        ) })
      ]
    },
    "preview"
  );
}
function LoadingSkeleton() {
  return /* @__PURE__ */ jsxs(m.div, { className: "flex items-center gap-10", ...opacityAnimation, children: [
    /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-32 h-32" }),
    /* @__PURE__ */ jsxs("div", { className: "max-h-[36px] flex-auto", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "text-xs" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "max-h-8 text-xs" })
    ] }),
    /* @__PURE__ */ jsx(Skeleton, { variant: "icon", size: "w-24 h-24" })
  ] });
}
function FormNormalizedModelField({
  name,
  ...fieldProps
}) {
  const { clearErrors } = useFormContext();
  const {
    field: { onChange, value = "" },
    fieldState: { invalid, error }
  } = useController({
    name
  });
  return /* @__PURE__ */ jsx(
    NormalizedModelField,
    {
      value,
      onChange: (value2) => {
        onChange(value2);
        clearErrors(name);
      },
      invalid,
      errorMessage: error == null ? void 0 : error.message,
      ...fieldProps
    }
  );
}
function NormalizedModelFilterPanel({
  filter
}) {
  return /* @__PURE__ */ jsx(
    FormNormalizedModelField,
    {
      name: `${filter.key}.value`,
      endpoint: `normalized-models/${filter.control.model}`
    }
  );
}
const DateRangeIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z" }),
  "DateRangeOutlined"
);
const Input = React.forwardRef(
  (props, ref) => {
    const {
      children,
      inputProps,
      wrapperProps,
      className,
      autoFocus,
      style,
      onClick
    } = props;
    return /* @__PURE__ */ jsx("div", { ...wrapperProps, onClick, children: /* @__PURE__ */ jsx(
      "div",
      {
        ...inputProps,
        role: "group",
        className: clsx(
          className,
          "flex items-center focus-within:ring focus-within:ring-primary/focus focus-within:border-primary/60"
        ),
        ref,
        style,
        children: /* @__PURE__ */ jsx(FocusScope, { autoFocus, children })
      }
    ) });
  }
);
const DatePickerField = React.forwardRef(({ inputRef, wrapperProps, children, onBlur, ...other }, ref) => {
  const fieldClassNames = getInputFieldClassNames(other);
  const objRef = useObjectRef(ref);
  const { fieldProps, inputProps } = useField({
    ...other,
    focusRef: objRef,
    labelElementType: "span"
  });
  fieldClassNames.wrapper = clsx(
    fieldClassNames.wrapper,
    other.disabled && "pointer-events-none"
  );
  return /* @__PURE__ */ jsx(
    Field,
    {
      wrapperProps: mergeProps(
        wrapperProps,
        {
          onBlur: (e) => {
            if (!objRef.current.contains(e.relatedTarget)) {
              onBlur == null ? void 0 : onBlur(e);
            }
          },
          onClick: () => {
            const focusManager = createFocusManager(objRef);
            focusManager == null ? void 0 : focusManager.focusFirst();
          }
        }
      ),
      fieldClassNames,
      ref: objRef,
      ...fieldProps,
      children: /* @__PURE__ */ jsx(
        Input,
        {
          inputProps,
          className: clsx(fieldClassNames.input, "gap-10"),
          ref: inputRef,
          children
        }
      )
    }
  );
});
function getDefaultGranularity(date) {
  if (date instanceof CalendarDate) {
    return "day";
  }
  return "minute";
}
function dateIsInvalid(date, min, max) {
  return min != null && date.compare(min) < 0 || max != null && date.compare(max) > 0;
}
function useBaseDatePickerState(selectedDate, props) {
  const timezone = useUserTimezone();
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const closeDialogOnSelection = props.closeDialogOnSelection ?? true;
  const granularity = props.granularity || getDefaultGranularity(selectedDate);
  const min = props.min ? toZoned(props.min, timezone) : void 0;
  const max = props.max ? toZoned(props.max, timezone) : void 0;
  return {
    timezone,
    granularity,
    min,
    max,
    calendarIsOpen,
    setCalendarIsOpen,
    closeDialogOnSelection
  };
}
function startOfDay(date) {
  return date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
}
function endOfDay(date) {
  return date.set({
    hour: 24 - 1,
    minute: 60 - 1,
    second: 60 - 1,
    millisecond: 1e3 - 1
  });
}
function useDateRangePickerState(props) {
  var _a2, _b2;
  const now2 = useCurrentDateTime();
  const [isPlaceholder, setIsPlaceholder] = useState({
    start: (!props.value || !props.value.start) && !((_a2 = props.defaultValue) == null ? void 0 : _a2.start),
    end: (!props.value || !props.value.end) && !((_b2 = props.defaultValue) == null ? void 0 : _b2.end)
  });
  const setStateValue = props.onChange;
  const [internalValue, setInternalValue] = useControlledState(
    props.value ? completeRange(props.value, now2) : void 0,
    !props.value ? completeRange(props.defaultValue, now2) : void 0,
    (value) => {
      setIsPlaceholder({ start: false, end: false });
      setStateValue == null ? void 0 : setStateValue(value);
    }
  );
  const {
    min,
    max,
    granularity,
    timezone,
    calendarIsOpen,
    setCalendarIsOpen,
    closeDialogOnSelection
  } = useBaseDatePickerState(internalValue.start, props);
  const clear = useCallback(() => {
    setIsPlaceholder({ start: true, end: true });
    setInternalValue(completeRange(null, now2));
    setStateValue == null ? void 0 : setStateValue(null);
    setCalendarIsOpen(false);
  }, [now2, setInternalValue, setStateValue, setCalendarIsOpen]);
  const [anchorDate, setAnchorDate] = useState(null);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [highlightedRange, setHighlightedRange] = useState(internalValue);
  const [calendarDates, setCalendarDates] = useState(() => {
    return rangeToCalendarDates(internalValue, max);
  });
  const constrainRange = useCallback(
    (range) => {
      let start = range.start;
      let end = range.end;
      if (min) {
        start = maxDate(start, min);
      }
      const startMax = max ? minDate(max, end) : end;
      start = minDate(start, startMax);
      const endMin = min ? maxDate(min, start) : start;
      end = maxDate(end, endMin);
      if (max) {
        end = minDate(end, max);
      }
      return { start: toZoned(start, timezone), end: toZoned(end, timezone) };
    },
    [min, max, timezone]
  );
  const setSelectedValue = useCallback(
    (newRange) => {
      const value = {
        ...constrainRange(newRange),
        preset: newRange.preset
      };
      setInternalValue(value);
      setHighlightedRange(value);
      setCalendarDates(rangeToCalendarDates(value, max));
      setIsPlaceholder({ start: false, end: false });
    },
    [setInternalValue, constrainRange, max]
  );
  const dayIsActive = useCallback(
    (day) => {
      return !isPlaceholder.start && isSameDay(day, highlightedRange.start) || !isPlaceholder.end && isSameDay(day, highlightedRange.end);
    },
    [highlightedRange, isPlaceholder]
  );
  const dayIsHighlighted = useCallback(
    (day) => {
      return (isHighlighting || !isPlaceholder.start && !isPlaceholder.end) && day.compare(highlightedRange.start) >= 0 && day.compare(highlightedRange.end) <= 0;
    },
    [highlightedRange, isPlaceholder, isHighlighting]
  );
  const dayIsRangeStart = useCallback(
    (day) => isSameDay(day, highlightedRange.start),
    [highlightedRange]
  );
  const dayIsRangeEnd = useCallback(
    (day) => isSameDay(day, highlightedRange.end),
    [highlightedRange]
  );
  const getCellProps = useCallback(
    (date, isSameMonth2) => {
      return {
        onPointerEnter: () => {
          if (isHighlighting && isSameMonth2) {
            setHighlightedRange(
              makeRange({ start: anchorDate, end: date, timezone })
            );
          }
        },
        onClick: () => {
          if (!isHighlighting) {
            setIsHighlighting(true);
            setAnchorDate(date);
            setHighlightedRange(makeRange({ start: date, end: date, timezone }));
          } else {
            const finalRange = makeRange({
              start: anchorDate,
              end: date,
              timezone
            });
            finalRange.start = startOfDay(finalRange.start);
            finalRange.end = endOfDay(finalRange.end);
            setIsHighlighting(false);
            setAnchorDate(null);
            setSelectedValue == null ? void 0 : setSelectedValue(finalRange);
            if (closeDialogOnSelection) {
              setCalendarIsOpen == null ? void 0 : setCalendarIsOpen(false);
            }
          }
        }
      };
    },
    [
      anchorDate,
      isHighlighting,
      setSelectedValue,
      setCalendarIsOpen,
      closeDialogOnSelection,
      timezone
    ]
  );
  return {
    selectedValue: internalValue,
    setSelectedValue,
    calendarIsOpen,
    setCalendarIsOpen,
    dayIsActive,
    dayIsHighlighted,
    dayIsRangeStart,
    dayIsRangeEnd,
    getCellProps,
    calendarDates,
    setIsPlaceholder,
    isPlaceholder,
    clear,
    setCalendarDates,
    min,
    max,
    granularity,
    timezone,
    closeDialogOnSelection
  };
}
function rangeToCalendarDates(range, max) {
  let start = toCalendarDate(startOfMonth(range.start));
  let end = toCalendarDate(endOfMonth(range.end));
  if (isSameMonth(start, end)) {
    end = endOfMonth(end.add({ months: 1 }));
  }
  if (max && end.compare(max) > 0) {
    end = start;
    start = startOfMonth(start.subtract({ months: 1 }));
  }
  return [start, end];
}
function makeRange(props) {
  const start = toZoned(props.start, props.timezone);
  const end = toZoned(props.end, props.timezone);
  if (start.compare(end) > 0) {
    return { start: end, end: start };
  }
  return { start, end };
}
function completeRange(range, now2) {
  if ((range == null ? void 0 : range.start) && (range == null ? void 0 : range.end)) {
    return range;
  } else if (!(range == null ? void 0 : range.start) && (range == null ? void 0 : range.end)) {
    range.start = range.end.subtract({ months: 1 });
    return range;
  } else if (!(range == null ? void 0 : range.end) && (range == null ? void 0 : range.start)) {
    range.end = range.start.add({ months: 1 });
    return range;
  }
  return { start: now2, end: now2.add({ months: 1 }) };
}
const ArrowRightAltIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" }),
  "ArrowRightAltOutlined"
);
function adjustSegment(value, part, amount, options) {
  switch (part) {
    case "era":
    case "year":
    case "month":
    case "day":
      return value.cycle(part, amount, { round: part === "year" });
  }
  if ("hour" in value) {
    switch (part) {
      case "dayPeriod": {
        const hours = value.hour;
        const isPM = hours >= 12;
        return value.set({ hour: isPM ? hours - 12 : hours + 12 });
      }
      case "hour":
      case "minute":
      case "second":
        return value.cycle(part, amount, {
          round: part !== "hour",
          hourCycle: options.hour12 ? 12 : 24
        });
    }
  }
  return value;
}
function setSegment(value, part, segmentValue, options) {
  switch (part) {
    case "day":
    case "month":
    case "year":
      return value.set({ [part]: segmentValue });
  }
  if ("hour" in value) {
    switch (part) {
      case "dayPeriod": {
        const hours = value.hour;
        const wasPM = hours >= 12;
        const isPM = segmentValue >= 12;
        if (isPM === wasPM) {
          return value;
        }
        return value.set({ hour: wasPM ? hours - 12 : hours + 12 });
      }
      case "hour":
        if (options.hour12) {
          const hours = value.hour;
          const wasPM = hours >= 12;
          if (!wasPM && segmentValue === 12) {
            segmentValue = 0;
          }
          if (wasPM && segmentValue < 12) {
            segmentValue += 12;
          }
        }
      case "minute":
      case "second":
        return value.set({ [part]: segmentValue });
    }
  }
  return value;
}
const PAGE_STEP = {
  year: 5,
  month: 2,
  day: 7,
  hour: 2,
  minute: 15,
  second: 15,
  dayPeriod: 1
};
function EditableDateSegment({
  segment,
  domProps,
  value,
  onChange,
  isPlaceholder,
  state: { timezone, calendarIsOpen, setCalendarIsOpen }
}) {
  const isMobile = useIsMobileMediaQuery();
  const enteredKeys = useRef("");
  const { localeCode } = useSelectedLocale();
  const focusManager = useFocusManager();
  const formatter = useDateFormatter({ timeZone: timezone });
  const parser = useMemo(
    () => new NumberParser(localeCode, { maximumFractionDigits: 0 }),
    [localeCode]
  );
  const setSegmentValue = (newValue) => {
    onChange(
      setSegment(value, segment.type, newValue, formatter.resolvedOptions())
    );
  };
  const adjustSegmentValue = (amount) => {
    onChange(
      adjustSegment(value, segment.type, amount, formatter.resolvedOptions())
    );
  };
  const backspace = () => {
    if (parser.isValidPartialNumber(segment.text)) {
      const newValue = segment.text.slice(0, -1);
      const parsed = parser.parse(newValue);
      if (newValue.length === 0 || parsed === 0) {
        const now2 = today(timezone);
        if (segment.type in now2) {
          setSegmentValue(now2[segment.type]);
        }
      } else {
        setSegmentValue(parsed);
      }
      enteredKeys.current = newValue;
    } else if (segment.type === "dayPeriod") {
      adjustSegmentValue(-1);
    }
  };
  const onKeyDown = (e) => {
    var _a2;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return;
    }
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        e.stopPropagation();
        focusManager == null ? void 0 : focusManager.focusPrevious();
        break;
      case "ArrowRight":
        e.preventDefault();
        e.stopPropagation();
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "Enter":
        (_a2 = e.target.closest("form")) == null ? void 0 : _a2.requestSubmit();
        setCalendarIsOpen(!calendarIsOpen);
        break;
      case "Tab":
        break;
      case "Backspace":
      case "Delete": {
        e.preventDefault();
        e.stopPropagation();
        backspace();
        break;
      }
      case "ArrowUp":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(1);
        break;
      case "ArrowDown":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(-1);
        break;
      case "PageUp":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(PAGE_STEP[segment.type] || 1);
        break;
      case "PageDown":
        e.preventDefault();
        enteredKeys.current = "";
        adjustSegmentValue(-(PAGE_STEP[segment.type] || 1));
        break;
      case "Home":
        e.preventDefault();
        enteredKeys.current = "";
        setSegmentValue(segment.maxValue);
        break;
      case "End":
        e.preventDefault();
        enteredKeys.current = "";
        setSegmentValue(segment.minValue);
        break;
    }
    onInput(e.key);
  };
  const amPmFormatter = useDateFormatter({ hour: "numeric", hour12: true });
  const am = useMemo(() => {
    const amDate = /* @__PURE__ */ new Date();
    amDate.setHours(0);
    return amPmFormatter.formatToParts(amDate).find((part) => part.type === "dayPeriod").value;
  }, [amPmFormatter]);
  const pm = useMemo(() => {
    const pmDate = /* @__PURE__ */ new Date();
    pmDate.setHours(12);
    return amPmFormatter.formatToParts(pmDate).find((part) => part.type === "dayPeriod").value;
  }, [amPmFormatter]);
  const onInput = (key) => {
    const newValue = enteredKeys.current + key;
    switch (segment.type) {
      case "dayPeriod":
        if (am.toLowerCase().startsWith(key)) {
          setSegmentValue(0);
        } else if (pm.toLowerCase().startsWith(key)) {
          setSegmentValue(12);
        } else {
          break;
        }
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "day":
      case "hour":
      case "minute":
      case "second":
      case "month":
      case "year": {
        if (!parser.isValidPartialNumber(newValue)) {
          return;
        }
        let numberValue = parser.parse(newValue);
        let segmentValue = numberValue;
        let allowsZero = segment.minValue === 0;
        if (segment.type === "hour" && formatter.resolvedOptions().hour12) {
          switch (formatter.resolvedOptions().hourCycle) {
            case "h11":
              if (numberValue > 11) {
                segmentValue = parser.parse(key);
              }
              break;
            case "h12":
              allowsZero = false;
              if (numberValue > 12) {
                segmentValue = parser.parse(key);
              }
              break;
          }
          if (segment.value >= 12 && numberValue > 1) {
            numberValue += 12;
          }
        } else if (numberValue > segment.maxValue) {
          segmentValue = parser.parse(key);
        }
        if (Number.isNaN(numberValue)) {
          return;
        }
        const shouldSetValue = segmentValue !== 0 || allowsZero;
        if (shouldSetValue) {
          setSegmentValue(segmentValue);
        }
        if (Number(`${numberValue}0`) > segment.maxValue || newValue.length >= String(segment.maxValue).length) {
          enteredKeys.current = "";
          if (shouldSetValue) {
            focusManager == null ? void 0 : focusManager.focusNext();
          }
        } else {
          enteredKeys.current = newValue;
        }
        break;
      }
    }
  };
  const spinButtonProps = isMobile ? {} : {
    "aria-label": segment.type,
    "aria-valuetext": isPlaceholder ? void 0 : `${segment.value}`,
    "aria-valuemin": segment.minValue,
    "aria-valuemax": segment.maxValue,
    "aria-valuenow": isPlaceholder ? void 0 : segment.value,
    tabIndex: 0,
    onKeyDown
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...mergeProps(domProps, {
        ...spinButtonProps,
        onFocus: (e) => {
          enteredKeys.current = "";
          e.target.scrollIntoView({ block: "nearest" });
        },
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      }),
      className: "box-content cursor-default select-none whitespace-nowrap rounded p-2 text-center tabular-nums caret-transparent outline-none focus:bg-primary focus:text-on-primary",
      children: segment.text.padStart(segment.minLength, "0")
    }
  );
}
function LiteralDateSegment({ segment, domProps }) {
  const focusManager = useFocusManager();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...domProps,
      onPointerDown: (e) => {
        if (e.pointerType === "mouse") {
          e.preventDefault();
          const res = focusManager == null ? void 0 : focusManager.focusNext({ from: e.target });
          if (!res) {
            focusManager == null ? void 0 : focusManager.focusPrevious({ from: e.target });
          }
        }
      },
      "aria-hidden": true,
      className: "min-w-4 cursor-default select-none",
      children: segment.text
    }
  );
}
function getSegmentLimits(date, type, options) {
  switch (type) {
    case "year":
      return {
        value: date.year,
        placeholder: "yyyy",
        minValue: 1,
        maxValue: date.calendar.getYearsInEra(date)
      };
    case "month":
      return {
        value: date.month,
        placeholder: "mm",
        minValue: getMinimumMonthInYear(date),
        maxValue: date.calendar.getMonthsInYear(date)
      };
    case "day":
      return {
        value: date.day,
        minValue: getMinimumDayInMonth(date),
        maxValue: date.calendar.getDaysInMonth(date),
        placeholder: "dd"
      };
  }
  if ("hour" in date) {
    switch (type) {
      case "dayPeriod":
        return {
          value: date.hour >= 12 ? 12 : 0,
          minValue: 0,
          maxValue: 12,
          placeholder: "--"
        };
      case "hour":
        if (options.hour12) {
          const isPM = date.hour >= 12;
          return {
            value: date.hour,
            minValue: isPM ? 12 : 0,
            maxValue: isPM ? 23 : 11,
            placeholder: "--"
          };
        }
        return {
          value: date.hour,
          minValue: 0,
          maxValue: 23,
          placeholder: "--"
        };
      case "minute":
        return {
          value: date.minute,
          minValue: 0,
          maxValue: 59,
          placeholder: "--"
        };
    }
  }
  return {};
}
function DateSegmentList({
  segmentProps,
  state,
  value,
  onChange,
  isPlaceholder
}) {
  const { granularity } = state;
  const options = useMemo(() => {
    const memoOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    };
    if (granularity === "minute") {
      memoOptions.hour = "numeric";
      memoOptions.minute = "numeric";
    }
    return memoOptions;
  }, [granularity]);
  const formatter = useDateFormatter(options);
  const dateValue = useMemo(() => value.toDate(), [value]);
  const segments = useMemo(() => {
    return formatter.formatToParts(dateValue).map((segment) => {
      const limits = getSegmentLimits(
        value,
        segment.type,
        formatter.resolvedOptions()
      );
      const textValue = isPlaceholder && segment.type !== "literal" ? limits.placeholder : segment.value;
      return {
        type: segment.type,
        text: segment.value === ", " ? " " : textValue,
        ...limits,
        minLength: segment.type !== "literal" ? String(limits.maxValue).length : 1
      };
    });
  }, [dateValue, formatter, isPlaceholder, value]);
  return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: segments.map((segment, index) => {
    if (segment.type === "literal") {
      return /* @__PURE__ */ jsx(
        LiteralDateSegment,
        {
          domProps: segmentProps,
          segment
        },
        index
      );
    }
    return /* @__PURE__ */ jsx(
      EditableDateSegment,
      {
        isPlaceholder,
        domProps: segmentProps,
        state,
        value,
        onChange,
        segment
      },
      index
    );
  }) });
}
function CalendarCell({
  date,
  currentMonth,
  state: {
    dayIsActive,
    dayIsHighlighted,
    dayIsRangeStart,
    dayIsRangeEnd,
    getCellProps,
    timezone,
    min,
    max
  }
}) {
  const { localeCode } = useSelectedLocale();
  const dayOfWeek = getDayOfWeek(date, localeCode);
  const isActive = dayIsActive(date);
  const isHighlighted = dayIsHighlighted(date);
  const isRangeStart = dayIsRangeStart(date);
  const isRangeEnd = dayIsRangeEnd(date);
  const dayIsToday = isToday(date, timezone);
  const sameMonth = isSameMonth(date, currentMonth);
  const isDisabled = dateIsInvalid(date, min, max);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "button",
      "aria-disabled": isDisabled,
      className: clsx(
        "w-40 h-40 text-sm relative isolate flex-shrink-0",
        isDisabled && "text-disabled pointer-events-none",
        !sameMonth && "invisible pointer-events-none"
      ),
      ...getCellProps(date, sameMonth),
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "absolute inset-0 flex items-center justify-center rounded-full w-full h-full select-none z-10 cursor-pointer",
              !isActive && !dayIsToday && "hover:bg-hover",
              isActive && "bg-primary text-on-primary font-semibold",
              dayIsToday && !isActive && "bg-chip"
            ),
            children: date.day
          }
        ),
        isHighlighted && sameMonth && /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "absolute w-full h-full inset-0 bg-primary/focus",
              (isRangeStart || dayOfWeek === 0 || date.day === 1) && "rounded-l-full",
              (isRangeEnd || dayOfWeek === 6 || date.day === currentMonth.calendar.getDaysInMonth(currentMonth)) && "rounded-r-full"
            )
          }
        )
      ]
    }
  );
}
function CalendarMonth({
  startDate,
  state,
  isFirst,
  isLast
}) {
  const { localeCode } = useSelectedLocale();
  const weeksInMonth = getWeeksInMonth(startDate, localeCode);
  const monthStart = startOfWeek(startDate, localeCode);
  return /* @__PURE__ */ jsxs("div", { className: "w-280 flex-shrink-0", children: [
    /* @__PURE__ */ jsx(
      CalendarMonthHeader,
      {
        isFirst,
        isLast,
        state,
        currentMonth: startDate
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "block", role: "grid", children: [
      /* @__PURE__ */ jsx(WeekdayHeader, { state, startDate }),
      [...new Array(weeksInMonth).keys()].map((weekIndex) => /* @__PURE__ */ jsx(m.div, { className: "flex mb-6", children: [...new Array(7).keys()].map((dayIndex) => /* @__PURE__ */ jsx(
        CalendarCell,
        {
          date: monthStart.add({ weeks: weekIndex, days: dayIndex }),
          currentMonth: startDate,
          state
        },
        dayIndex
      )) }, weekIndex))
    ] })
  ] });
}
function CalendarMonthHeader({
  currentMonth,
  isFirst,
  isLast,
  state: { calendarDates, setCalendarDates, timezone, min, max }
}) {
  const shiftCalendars = (direction) => {
    const count = calendarDates.length;
    let newDates;
    if (direction === "forward") {
      newDates = calendarDates.map(
        (date) => endOfMonth(date.add({ months: count }))
      );
    } else {
      newDates = calendarDates.map(
        (date) => endOfMonth(date.subtract({ months: count }))
      );
    }
    setCalendarDates(newDates);
  };
  const monthFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    era: currentMonth.calendar.identifier !== "gregory" ? "long" : void 0,
    calendar: currentMonth.calendar.identifier
  });
  const isBackwardDisabled = dateIsInvalid(
    currentMonth.subtract({ days: 1 }),
    min,
    max
  );
  const isForwardDisabled = dateIsInvalid(
    startOfMonth(currentMonth.add({ months: 1 })),
    min,
    max
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-10", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className: clsx("text-muted", !isFirst && "invisible"),
        disabled: !isFirst || isBackwardDisabled,
        "aria-hidden": !isFirst,
        onClick: () => {
          shiftCalendars("backward");
        },
        children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold select-none", children: monthFormatter.format(currentMonth.toDate(timezone)) }),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className: clsx("text-muted", !isLast && "invisible"),
        disabled: !isLast || isForwardDisabled,
        "aria-hidden": !isLast,
        onClick: () => {
          shiftCalendars("forward");
        },
        children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
      }
    )
  ] });
}
function WeekdayHeader({ state: { timezone }, startDate }) {
  const { localeCode } = useSelectedLocale();
  const dayFormatter = useDateFormatter({ weekday: "short" });
  const monthStart = startOfWeek(startDate, localeCode);
  return /* @__PURE__ */ jsx("div", { className: "flex", children: [...new Array(7).keys()].map((index) => {
    const date = monthStart.add({ days: index });
    const dateDay = date.toDate(timezone);
    const weekday = dayFormatter.format(dateDay);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-40 h-40 text-sm font-semibold relative flex-shrink-0",
        children: /* @__PURE__ */ jsx("div", { className: "absolute flex items-center justify-center w-full h-full select-none", children: weekday })
      },
      index
    );
  }) });
}
function Calendar({ state, visibleMonths = 1 }) {
  const isMobile = useIsMobileMediaQuery();
  if (isMobile) {
    visibleMonths = 1;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: [...new Array(visibleMonths).keys()].map((index) => {
    const startDate = toCalendarDate(
      startOfMonth(state.calendarDates[index])
    );
    const isFirst = index === 0;
    const isLast = index === visibleMonths - 1;
    return /* @__PURE__ */ jsx(
      CalendarMonth,
      {
        state,
        startDate,
        isFirst,
        isLast
      },
      index
    );
  }) });
}
const FormattedDateTimeRange = memo(
  ({ start, end, options, preset }) => {
    const { dates } = useSettings();
    const timezone = useUserTimezone();
    const formatter = useDateFormatter(
      options || DateFormatPresets[preset || (dates == null ? void 0 : dates.format)]
    );
    if (!start || !end) {
      return null;
    }
    let value;
    try {
      value = formatter.formatRange(
        castToDate(start, timezone),
        castToDate(end, timezone)
      );
    } catch (e) {
      value = "";
    }
    return /* @__PURE__ */ jsx(Fragment, { children: value });
  },
  shallowEqual
);
function castToDate(date, timezone) {
  if (typeof date === "string") {
    return parseAbsolute(date, timezone).toDate();
  }
  if ("toDate" in date) {
    return date.toDate(timezone);
  }
  return date;
}
function getUserTimezone() {
  var _a2, _b2, _c;
  const defaultTimezone = (_a2 = getBootstrapData()) == null ? void 0 : _a2.settings.dates.default_timezone;
  const preferredTimezone = ((_c = (_b2 = getBootstrapData()) == null ? void 0 : _b2.user) == null ? void 0 : _c.timezone) || defaultTimezone || "auto";
  if (!preferredTimezone || preferredTimezone === "auto") {
    return getLocalTimeZone();
  }
  return preferredTimezone;
}
const Now = startOfDay(now(getUserTimezone()));
const locale = ((_b = (_a = getBootstrapData()) == null ? void 0 : _a.i18n) == null ? void 0 : _b.language) || "en";
const DateRangePresets = [
  {
    key: 0,
    label: message("Today"),
    getRangeValue: () => ({
      preset: 0,
      start: Now,
      end: endOfDay(Now)
    })
  },
  {
    key: 1,
    label: message("Yesterday"),
    getRangeValue: () => ({
      preset: 1,
      start: Now.subtract({ days: 1 }),
      end: endOfDay(Now).subtract({ days: 1 })
    })
  },
  {
    key: 2,
    label: message("This week"),
    getRangeValue: () => ({
      preset: 2,
      start: startOfWeek(Now, locale),
      end: endOfWeek(endOfDay(Now), locale)
    })
  },
  {
    key: 3,
    label: message("Last week"),
    getRangeValue: () => {
      const start = startOfWeek(Now, locale).subtract({ days: 7 });
      return {
        preset: 3,
        start,
        end: start.add({ days: 6 })
      };
    }
  },
  {
    key: 4,
    label: message("Last 7 days"),
    getRangeValue: () => ({
      preset: 4,
      start: Now.subtract({ days: 7 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 6,
    label: message("Last 30 days"),
    getRangeValue: () => ({
      preset: 6,
      start: Now.subtract({ days: 30 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 7,
    label: message("Last 3 months"),
    getRangeValue: () => ({
      preset: 7,
      start: Now.subtract({ months: 3 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 8,
    label: message("Last 12 months"),
    getRangeValue: () => ({
      preset: 8,
      start: Now.subtract({ months: 12 }),
      end: endOfDay(Now)
    })
  },
  {
    key: 9,
    label: message("This month"),
    getRangeValue: () => ({
      preset: 9,
      start: startOfMonth(Now),
      end: endOfMonth(endOfDay(Now))
    })
  },
  {
    key: 10,
    label: message("This year"),
    getRangeValue: () => ({
      preset: 10,
      start: startOfYear(Now),
      end: endOfYear(endOfDay(Now))
    })
  },
  {
    key: 11,
    label: message("Last year"),
    getRangeValue: () => ({
      preset: 11,
      start: startOfYear(Now).subtract({ years: 1 }),
      end: endOfYear(endOfDay(Now)).subtract({ years: 1 })
    })
  }
];
function DatePresetList({
  onPresetSelected,
  selectedValue
}) {
  return /* @__PURE__ */ jsx(List, { children: DateRangePresets.map((preset) => /* @__PURE__ */ jsx(
    ListItem,
    {
      borderRadius: "rounded-none",
      capitalizeFirst: true,
      isSelected: (selectedValue == null ? void 0 : selectedValue.preset) === preset.key,
      onSelected: () => {
        const newValue = preset.getRangeValue();
        onPresetSelected(newValue);
      },
      children: /* @__PURE__ */ jsx(Trans, { ...preset.label })
    },
    preset.key
  )) });
}
function useIsTabletMediaQuery(options) {
  return useMediaQuery("(max-width: 1024px)", options);
}
const Switch = React.forwardRef(
  (props, ref) => {
    const {
      children,
      size = "sm",
      description,
      className,
      invalid,
      autoFocus,
      errorMessage,
      iconRight,
      ...domProps
    } = props;
    const inputRef = useObjectRef(ref);
    useAutoFocus({ autoFocus }, inputRef);
    const style = getSizeClassName(size);
    const fieldClassNames = getInputFieldClassNames(props);
    const descriptionId = useId();
    return /* @__PURE__ */ jsxs("div", { className: clsx(className, "isolate"), children: [
      /* @__PURE__ */ jsxs("label", { className: "flex select-none items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...domProps,
            type: "checkbox",
            role: "switch",
            "aria-invalid": invalid || void 0,
            "aria-describedby": description ? descriptionId : void 0,
            ref: inputRef,
            "aria-checked": domProps.checked,
            className: clsx(
              style,
              !invalid && "checked:border-primary checked:bg-primary dark:checked:border-primary-dark dark:checked:bg-primary-dark",
              invalid && "checked:border-danger checked:bg-danger",
              "relative flex flex-shrink-0 cursor-pointer appearance-none items-center overflow-hidden rounded-3xl border border-chip bg-chip p-0 outline-none transition-colors checked:border-primary checked:bg-primary",
              "before:z-10 before:block before:translate-x-2 before:rounded-3xl before:border before:bg-white before:transition-transform",
              "checked:before:border-white",
              "focus-visible:ring",
              props.disabled && "cursor-not-allowed opacity-80"
            )
          }
        ),
        children && /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              fieldClassNames.size.font,
              "ml-12",
              invalid && "text-danger",
              props.disabled && "text-disabled"
            ),
            children
          }
        ),
        iconRight
      ] }),
      description && !errorMessage && /* @__PURE__ */ jsx("div", { id: descriptionId, className: fieldClassNames.description, children: description }),
      errorMessage && /* @__PURE__ */ jsx("div", { id: descriptionId, className: fieldClassNames.error, children: errorMessage })
    ] });
  }
);
function FormSwitch(props) {
  const {
    field: { onChange, onBlur, value = false, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange: (e) => {
      if (e.target.value && e.target.value !== "on") {
        onChange(e.target.checked ? e.target.value : false);
      } else {
        onChange(e);
      }
    },
    onBlur,
    checked: !!value,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    name: props.name
  };
  return /* @__PURE__ */ jsx(Switch, { ref, ...mergeProps(props, formProps) });
}
function getSizeClassName(size) {
  switch (size) {
    case "xl":
      return "w-68 h-36 before:w-28 before:h-28 checked:before:translate-x-36";
    case "lg":
      return "w-56 h-30 before:w-22 before:h-22 checked:before:translate-x-30";
    case "md":
      return "w-46 h-24 before:w-18 before:h-18 checked:before:translate-x-24";
    case "xs":
      return "w-30 h-18 before:w-12 before:h-12 checked:before:translate-x-14";
    default:
      return "w-38 h-20 before:w-14 before:h-14 checked:before:translate-x-20";
  }
}
const DateRangeComparePresets = [
  {
    key: 0,
    label: message("Preceding period"),
    getRangeValue: (range) => {
      const startDate = range.start;
      const endDate = range.end;
      const diffInMilliseconds = endDate.toDate().getTime() - startDate.toDate().getTime();
      const diffInMinutes = diffInMilliseconds / (1e3 * 60);
      const newStart = startDate.subtract({ minutes: diffInMinutes });
      return {
        preset: 0,
        start: newStart,
        end: startDate
      };
    }
  },
  {
    key: 1,
    label: message("Same period last year"),
    getRangeValue: (range) => {
      return {
        start: range.start.subtract({ years: 1 }),
        end: range.end.subtract({ years: 1 }),
        preset: 1
      };
    }
  },
  {
    key: 2,
    label: message("Custom"),
    getRangeValue: (range) => {
      return {
        start: range.start.subtract({ weeks: 1 }),
        end: range.end.subtract({ weeks: 1 }),
        preset: 2
      };
    }
  }
];
function DateRangeComparePresetList({
  originalRangeValue,
  onPresetSelected,
  selectedValue
}) {
  return /* @__PURE__ */ jsx(List, { children: DateRangeComparePresets.map((preset) => /* @__PURE__ */ jsx(
    ListItem,
    {
      borderRadius: "rounded-none",
      capitalizeFirst: true,
      isSelected: (selectedValue == null ? void 0 : selectedValue.preset) === preset.key,
      onSelected: () => {
        const newValue = preset.getRangeValue(originalRangeValue);
        onPresetSelected(newValue);
      },
      children: /* @__PURE__ */ jsx(Trans, { ...preset.label })
    },
    preset.key
  )) });
}
function DateRangeDialog({
  state,
  compareState,
  showInlineDatePickerField = false,
  compareVisibleDefault = false
}) {
  const isTablet = useIsTabletMediaQuery();
  const { close } = useDialogContext();
  const initialStateRef = useRef(state);
  const hasPlaceholder = state.isPlaceholder.start || state.isPlaceholder.end;
  const [compareVisible, setCompareVisible] = useState(compareVisibleDefault);
  const footer = /* @__PURE__ */ jsxs(
    DialogFooter,
    {
      dividerTop: true,
      startAction: !hasPlaceholder && !isTablet ? /* @__PURE__ */ jsx("div", { className: "text-xs", children: /* @__PURE__ */ jsx(
        FormattedDateTimeRange,
        {
          start: state.selectedValue.start.toDate(),
          end: state.selectedValue.end.toDate(),
          options: { dateStyle: "medium" }
        }
      ) }) : void 0,
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "text",
            size: "xs",
            onClick: () => {
              state.setSelectedValue(initialStateRef.current.selectedValue);
              state.setIsPlaceholder(initialStateRef.current.isPlaceholder);
              close();
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            size: "xs",
            onClick: () => {
              const value = state.selectedValue;
              if (compareState && compareVisible) {
                value.compareStart = compareState.selectedValue.start;
                value.compareEnd = compareState.selectedValue.end;
              }
              close(value);
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Select" })
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ jsxs(Dialog, { size: "auto", children: [
    /* @__PURE__ */ jsxs(DialogBody, { className: "flex", padding: "p-0", children: [
      !isTablet && /* @__PURE__ */ jsxs("div", { className: "min-w-192 py-14", children: [
        /* @__PURE__ */ jsx(
          DatePresetList,
          {
            selectedValue: state.selectedValue,
            onPresetSelected: (preset) => {
              state.setSelectedValue(preset);
              if (state.closeDialogOnSelection) {
                close(preset);
              }
            }
          }
        ),
        !!compareState && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Switch,
            {
              className: "mx-20 mb-10 mt-14",
              checked: compareVisible,
              onChange: (e) => setCompareVisible(e.target.checked),
              children: /* @__PURE__ */ jsx(Trans, { message: "Compare" })
            }
          ),
          compareVisible && /* @__PURE__ */ jsx(
            DateRangeComparePresetList,
            {
              originalRangeValue: state.selectedValue,
              selectedValue: compareState.selectedValue,
              onPresetSelected: (preset) => {
                compareState.setSelectedValue(preset);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsx(
        Calendars,
        {
          state,
          compareState,
          showInlineDatePickerField,
          compareVisible
        }
      ) })
    ] }),
    !state.closeDialogOnSelection && footer
  ] });
}
function Calendars({
  state,
  compareState,
  showInlineDatePickerField,
  compareVisible
}) {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      initial: { width: 0, overflow: "hidden" },
      animate: { width: "auto" },
      exit: { width: 0, overflow: "hidden" },
      transition: { type: "tween", duration: 0.125 },
      className: "border-l px-20 pb-20 pt-10",
      children: [
        showInlineDatePickerField && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InlineDatePickerField, { state }),
          !!compareState && compareVisible && /* @__PURE__ */ jsx(
            InlineDatePickerField,
            {
              state: compareState,
              label: /* @__PURE__ */ jsx(Trans, { message: "Compare" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-start gap-36", children: /* @__PURE__ */ jsx(Calendar, { state, visibleMonths: 2 }) })
      ]
    }
  );
}
function InlineDatePickerField({ state, label }) {
  const { selectedValue, setSelectedValue } = state;
  return /* @__PURE__ */ jsxs(DatePickerField, { className: "mb-20 mt-10", label, children: [
    /* @__PURE__ */ jsx(
      DateSegmentList,
      {
        state,
        value: selectedValue.start,
        onChange: (newValue) => {
          setSelectedValue({ ...selectedValue, start: newValue });
        }
      }
    ),
    /* @__PURE__ */ jsx(ArrowRightAltIcon, { className: "block flex-shrink-0 text-muted", size: "md" }),
    /* @__PURE__ */ jsx(
      DateSegmentList,
      {
        state,
        value: selectedValue.end,
        onChange: (newValue) => {
          setSelectedValue({ ...selectedValue, end: newValue });
        }
      }
    )
  ] });
}
function DateRangePicker(props) {
  var _a2, _b2;
  const { granularity, closeDialogOnSelection, ...fieldProps } = props;
  const state = useDateRangePickerState(props);
  const inputRef = useRef(null);
  const isMobile = useIsMobileMediaQuery();
  const hideCalendarIcon = isMobile && granularity !== "day";
  const dialog = /* @__PURE__ */ jsx(
    DialogTrigger,
    {
      offset: 8,
      placement: "bottom-start",
      isOpen: state.calendarIsOpen,
      onOpenChange: state.setCalendarIsOpen,
      type: "popover",
      triggerRef: inputRef,
      returnFocusToTrigger: false,
      moveFocusToDialog: false,
      children: /* @__PURE__ */ jsx(DateRangeDialog, { state })
    }
  );
  const openOnClick = {
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isHourSegment$1(e)) {
        state.setCalendarIsOpen(true);
      } else {
        state.setCalendarIsOpen(false);
      }
    }
  };
  const value = state.selectedValue;
  const onChange = state.setSelectedValue;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      DatePickerField,
      {
        ref: inputRef,
        wrapperProps: openOnClick,
        endAdornment: !hideCalendarIcon ? /* @__PURE__ */ jsx(DateRangeIcon, {}) : void 0,
        ...fieldProps,
        children: [
          /* @__PURE__ */ jsx(
            DateSegmentList,
            {
              isPlaceholder: (_a2 = state.isPlaceholder) == null ? void 0 : _a2.start,
              state,
              segmentProps: openOnClick,
              value: value.start,
              onChange: (newValue) => {
                onChange({ start: newValue, end: value.end });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            ArrowRightAltIcon,
            {
              className: "block flex-shrink-0 text-muted",
              size: "md"
            }
          ),
          /* @__PURE__ */ jsx(
            DateSegmentList,
            {
              isPlaceholder: (_b2 = state.isPlaceholder) == null ? void 0 : _b2.end,
              state,
              segmentProps: openOnClick,
              value: value.end,
              onChange: (newValue) => {
                onChange({ start: value.start, end: newValue });
              }
            }
          )
        ]
      }
    ),
    dialog
  ] });
}
function isHourSegment$1(e) {
  return ["hour", "minute", "dayPeriod"].includes(
    e.currentTarget.ariaLabel || ""
  );
}
function FormDateRangePicker(props) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange: (e) => {
      onChange(e ? dateRangeToAbsoluteRange(e) : null);
    },
    onBlur,
    value: absoluteRangeToDateRange(value),
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    inputRef: ref
  };
  return /* @__PURE__ */ jsx(DateRangePicker, { ...mergeProps(formProps, props) });
}
function absoluteRangeToDateRange(props) {
  const { start, end, preset } = props || {};
  const dateRange = { preset };
  try {
    if (start) {
      dateRange.start = typeof start === "string" ? parseAbsoluteToLocal(start) : start;
    }
    if (end) {
      dateRange.end = typeof end === "string" ? parseAbsoluteToLocal(end) : end;
    }
  } catch (e) {
  }
  return dateRange;
}
function dateRangeToAbsoluteRange({
  start,
  end,
  preset
} = {}) {
  const absoluteRange = {
    preset
  };
  if (start) {
    absoluteRange.start = start.toAbsoluteString();
  }
  if (end) {
    absoluteRange.end = end.toAbsoluteString();
  }
  return absoluteRange;
}
function DateRangeFilterPanel({
  filter
}) {
  return /* @__PURE__ */ jsx(
    FormDateRangePicker,
    {
      min: filter.control.min,
      max: filter.control.max,
      size: "sm",
      name: `${filter.key}.value`,
      granularity: "day",
      closeDialogOnSelection: true
    }
  );
}
const FilterOperatorNames = {
  "=": message("is"),
  "!=": message("is not"),
  ">": message("is greater than"),
  ">=": message("is greater than or equal to"),
  "<": message("is less than"),
  "<=": message("is less than or equal to"),
  has: message("Include"),
  doesntHave: message("Do not include"),
  between: message("Is between"),
  hasAll: message("Include all")
};
function InputFilterPanel({
  filter
}) {
  var _a2;
  const control = filter.control;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        selectionMode: "single",
        name: `${filter.key}.operator`,
        className: "mb-14",
        size: "sm",
        required: true,
        children: (_a2 = filter.operators) == null ? void 0 : _a2.map((operator) => /* @__PURE__ */ jsx(Item, { value: operator, children: /* @__PURE__ */ jsx(Trans, { ...FilterOperatorNames[operator] }) }, operator))
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        size: "sm",
        name: `${filter.key}.value`,
        type: filter.control.inputType,
        min: "minValue" in control ? control.minValue : void 0,
        max: "maxValue" in control ? control.maxValue : void 0,
        minLength: "minLength" in control ? control.minLength : void 0,
        maxLength: "maxLength" in control ? control.maxLength : void 0,
        required: true
      }
    )
  ] });
}
function stringToChipValue(value) {
  return { id: value, name: `${value}`, description: `${value}` };
}
function ChipFieldInner(props, ref) {
  const fieldRef = useRef(null);
  const inputRef = useObjectRef(ref);
  const {
    displayWith = (v) => v.name,
    validateWith,
    children,
    suggestions,
    isLoading,
    inputValue,
    onInputValueChange,
    onItemSelected,
    placeholder,
    onOpenChange,
    chipSize = "sm",
    openMenuOnFocus = true,
    showEmptyMessage,
    value: propsValue,
    defaultValue,
    onChange: propsOnChange,
    valueKey,
    isAsync,
    allowCustomValue = true,
    showDropdownArrow,
    onChipClick,
    ...inputFieldProps
  } = props;
  const fieldClassNames = getInputFieldClassNames({
    ...props,
    flexibleHeight: true
  });
  const [value, onChange] = useChipFieldValueState(props);
  const [listboxIsOpen, setListboxIsOpen] = useState(false);
  const loadingIndicator = /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, size: "sm", "aria-label": "loading..." });
  const dropdownArrow = showDropdownArrow ? /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}) : null;
  const { fieldProps, inputProps } = useField({
    ...inputFieldProps,
    focusRef: inputRef,
    endAdornment: isLoading && listboxIsOpen ? loadingIndicator : dropdownArrow
  });
  return /* @__PURE__ */ jsx(Field, { fieldClassNames, ...fieldProps, children: /* @__PURE__ */ jsxs(
    Input,
    {
      ref: fieldRef,
      className: clsx("flex flex-wrap items-center", fieldClassNames.input),
      onClick: () => {
        var _a2;
        (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
      },
      children: [
        /* @__PURE__ */ jsx(
          ListWrapper,
          {
            displayChipUsing: displayWith,
            onChipClick,
            items: value,
            setItems: onChange,
            chipSize
          }
        ),
        /* @__PURE__ */ jsx(
          ChipInput,
          {
            size: props.size,
            showEmptyMessage,
            inputProps,
            inputValue,
            onInputValueChange,
            fieldRef,
            inputRef,
            chips: value,
            setChips: onChange,
            validateWith,
            isLoading,
            suggestions,
            placeholder,
            openMenuOnFocus,
            listboxIsOpen,
            setListboxIsOpen,
            allowCustomValue,
            children
          }
        )
      ]
    }
  ) });
}
function ListWrapper({
  items,
  setItems,
  displayChipUsing,
  chipSize,
  onChipClick
}) {
  const manager = useFocusManager();
  const removeItem = useCallback(
    (key) => {
      const i = items.findIndex((cr) => cr.id === key);
      const newItems = [...items];
      if (i > -1) {
        newItems.splice(i, 1);
        setItems(newItems);
      }
      return newItems;
    },
    [items, setItems]
  );
  return /* @__PURE__ */ jsx(
    ChipList,
    {
      className: clsx(
        "max-w-full flex-shrink-0 flex-wrap",
        chipSize === "xs" ? "my-6" : "my-8"
      ),
      size: chipSize,
      selectable: true,
      children: items.map((item) => /* @__PURE__ */ jsx(
        Chip,
        {
          errorMessage: item.errorMessage,
          adornment: item.image ? /* @__PURE__ */ jsx(Avatar, { circle: true, src: item.image }) : null,
          onClick: () => onChipClick == null ? void 0 : onChipClick(item),
          onRemove: () => {
            const newItems = removeItem(item.id);
            if (newItems.length) {
              manager == null ? void 0 : manager.focusPrevious({ tabbable: true });
            } else {
              manager == null ? void 0 : manager.focusLast();
            }
          },
          children: displayChipUsing(item)
        },
        item.id
      ))
    }
  );
}
function ChipInput(props) {
  const {
    inputRef,
    fieldRef,
    validateWith,
    setChips,
    chips,
    suggestions,
    inputProps,
    placeholder,
    openMenuOnFocus,
    listboxIsOpen,
    setListboxIsOpen,
    allowCustomValue,
    isLoading,
    size
  } = props;
  const manager = useFocusManager();
  const addItems = useCallback(
    (items) => {
      items = (items || []).filter((item) => {
        const invalid = !item || !item.id || !item.name;
        const alreadyExists = chips.findIndex((cr) => cr.id === (item == null ? void 0 : item.id)) > -1;
        return !alreadyExists && !invalid;
      });
      if (!items.length)
        return;
      if (validateWith) {
        items = items.map((item) => validateWith(item));
      }
      setChips([...chips, ...items]);
    },
    [chips, setChips, validateWith]
  );
  const listbox = useListbox({
    ...props,
    clearInputOnItemSelection: true,
    isOpen: listboxIsOpen,
    onOpenChange: setListboxIsOpen,
    items: suggestions,
    selectionMode: "none",
    role: "listbox",
    virtualFocus: true,
    onItemSelected: (value) => {
      handleItemSelection(value);
    }
  });
  const {
    state: {
      activeIndex,
      setActiveIndex,
      isOpen,
      setIsOpen,
      inputValue,
      setInputValue
    },
    refs,
    listboxId,
    collection,
    onInputChange
  } = listbox;
  const handleItemSelection = (textValue) => {
    const option = collection.size && activeIndex != null ? [...collection.values()][activeIndex] : null;
    if (option == null ? void 0 : option.item) {
      addItems([option.item]);
    } else if (allowCustomValue) {
      addItems([stringToChipValue(option ? option.value : textValue)]);
    }
    setInputValue("");
    setActiveIndex(null);
    setIsOpen(false);
  };
  useLayoutEffect(() => {
    if (fieldRef.current && refs.reference.current !== fieldRef.current) {
      listbox.reference(fieldRef.current);
    }
  }, [fieldRef, listbox, refs]);
  const { handleTriggerKeyDown, handleListboxKeyboardNavigation } = useListboxKeyboardNavigation(listbox);
  const handleFocusAndClick = createEventHandler(() => {
    if (openMenuOnFocus && !isOpen) {
      setIsOpen(true);
    }
  });
  return /* @__PURE__ */ jsx(
    Listbox,
    {
      listbox,
      mobileOverlay: Popover,
      isLoading,
      onPointerDown: (e) => {
        e.preventDefault();
      },
      children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          className: clsx(
            "mx-8 my-4 min-w-30 flex-[1_1_60px] bg-transparent text-sm outline-none",
            size === "xs" ? "h-20" : "h-30"
          ),
          placeholder,
          ...mergeProps(inputProps, {
            ref: inputRef,
            value: inputValue,
            onChange: onInputChange,
            onPaste: (e) => {
              const paste = e.clipboardData.getData("text");
              const emails = paste.match(
                /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
              );
              if (emails) {
                e.preventDefault();
                const selection = window.getSelection();
                if (selection == null ? void 0 : selection.rangeCount) {
                  selection.deleteFromDocument();
                  addItems(emails.map((email) => stringToChipValue(email)));
                }
              }
            },
            "aria-autocomplete": "list",
            "aria-controls": isOpen ? listboxId : void 0,
            autoComplete: "off",
            autoCorrect: "off",
            spellCheck: "false",
            onKeyDown: (e) => {
              const input = e.target;
              if (e.key === "Enter") {
                e.preventDefault();
                handleItemSelection(input.value);
                return;
              }
              if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
                setInputValue("");
              }
              if (e.key === "ArrowUp" && isOpen && (activeIndex === 0 || activeIndex == null)) {
                setActiveIndex(null);
                return;
              }
              if (activeIndex != null && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
                e.preventDefault();
                return;
              }
              if ((e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "Delete") && input.selectionStart === 0 && activeIndex == null && chips.length) {
                manager == null ? void 0 : manager.focusPrevious({ tabbable: true });
                return;
              }
              const handled = handleTriggerKeyDown(e);
              if (!handled) {
                handleListboxKeyboardNavigation(e);
              }
            },
            onFocus: handleFocusAndClick,
            onClick: handleFocusAndClick
          })
        }
      )
    }
  );
}
function useChipFieldValueState({
  onChange,
  value,
  defaultValue,
  valueKey
}) {
  const propsValue = useMemo(() => {
    return mixedValueToChipValue(value);
  }, [value]);
  const propsDefaultValue = useMemo(() => {
    return mixedValueToChipValue(defaultValue);
  }, [defaultValue]);
  const handleChange = useCallback(
    (value2) => {
      const newValue = valueKey ? value2.map((v) => v[valueKey]) : value2;
      onChange == null ? void 0 : onChange(newValue);
    },
    [onChange, valueKey]
  );
  return useControlledState(
    !propsValue ? void 0 : propsValue,
    propsDefaultValue || [],
    handleChange
  );
}
function mixedValueToChipValue(value) {
  if (value == null) {
    return void 0;
  }
  return value.map((v) => {
    return typeof v !== "object" ? stringToChipValue(v) : v;
  });
}
const ChipField = React.forwardRef(ChipFieldInner);
function FormChipField({ children, ...props }) {
  const {
    field: { onChange, onBlur, value = [], ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange,
    onBlur,
    value,
    invalid,
    errorMessage: error == null ? void 0 : error.message
  };
  return /* @__PURE__ */ jsx(ChipField, { ref, ...mergeProps(formProps, props), children });
}
function ChipFieldFilterPanel({
  filter
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      size: "sm",
      name: `${filter.key}.value`,
      valueKey: "id",
      allowCustomValue: false,
      showDropdownArrow: true,
      placeholder: filter.control.placeholder ? trans(filter.control.placeholder) : void 0,
      displayWith: (chip) => {
        var _a2;
        return (_a2 = filter.control.options.find((o) => o.key === chip.id)) == null ? void 0 : _a2.label.message;
      },
      suggestions: filter.control.options.map((o) => ({
        id: o.key,
        name: o.label.message
      })),
      children: (chip) => /* @__PURE__ */ jsx(Item, { value: chip.id, children: /* @__PURE__ */ jsx(Trans, { message: chip.name }) }, chip.id)
    }
  );
}
const FormattedNumber = memo(
  ({ value, ...options }) => {
    const formatter = useNumberFormatter(options);
    if (isNaN(value)) {
      value = 0;
    }
    return /* @__PURE__ */ jsx(Fragment, { children: formatter.format(value) });
  },
  shallowEqual
);
function FilterListControl(props) {
  switch (props.filter.control.type) {
    case FilterControlType.DateRangePicker:
      return /* @__PURE__ */ jsx(DatePickerControl, { ...props });
    case FilterControlType.BooleanToggle:
      return /* @__PURE__ */ jsx(BooleanToggleControl, { ...props });
    case FilterControlType.Select:
      return /* @__PURE__ */ jsx(SelectControl, { ...props });
    case FilterControlType.ChipField:
      return /* @__PURE__ */ jsx(ChipFieldControl, { ...props });
    case FilterControlType.Input:
      return /* @__PURE__ */ jsx(InputControl, { ...props });
    case FilterControlType.SelectModel:
      return /* @__PURE__ */ jsx(SelectModelControl, { ...props });
    case FilterControlType.Custom:
      const Control = props.filter.control.listItem;
      return /* @__PURE__ */ jsx(Control, { ...props });
    default:
      return null;
  }
}
function DatePickerControl(props) {
  const { value, filter } = props;
  let valueLabel;
  if (value.preset !== void 0) {
    valueLabel = /* @__PURE__ */ jsx(Trans, { ...DateRangePresets[value.preset].label });
  } else {
    valueLabel = /* @__PURE__ */ jsx(
      FormattedDateTimeRange,
      {
        start: new Date(value.start),
        end: new Date(value.end),
        options: { dateStyle: "medium" }
      }
    );
  }
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: valueLabel,
      panel: /* @__PURE__ */ jsx(DateRangeFilterPanel, { filter })
    }
  );
}
function BooleanToggleControl({
  filter,
  isInactive,
  onValueChange
}) {
  return /* @__PURE__ */ jsx(
    FilterListTriggerButton,
    {
      onClick: () => {
        onValueChange({ value: filter.control.defaultValue });
      },
      filter,
      isInactive
    }
  );
}
function SelectControl(props) {
  const { filter, value } = props;
  const option = filter.control.options.find((o) => o.key === value);
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: option ? /* @__PURE__ */ jsx(Trans, { ...option.label }) : null,
      panel: /* @__PURE__ */ jsx(SelectFilterPanel, { filter })
    }
  );
}
function ChipFieldControl(props) {
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: /* @__PURE__ */ jsx(MultipleValues, { ...props }),
      panel: /* @__PURE__ */ jsx(ChipFieldFilterPanel, { filter: props.filter })
    }
  );
}
function MultipleValues(props) {
  const { trans } = useTrans();
  const { filter, value } = props;
  const options = value.map((v) => filter.control.options.find((o) => o.key === v));
  const maxShownCount = 3;
  const notShownCount = value.length - maxShownCount;
  const names = /* @__PURE__ */ jsx(Fragment, { children: options.filter(Boolean).slice(0, maxShownCount).map((o, i) => {
    let name = "";
    if (i !== 0) {
      name += ", ";
    }
    name += trans(o.label);
    return name;
  }) });
  return notShownCount > 0 ? /* @__PURE__ */ jsx(
    Trans,
    {
      message: ":names + :count more",
      values: { names, count: notShownCount }
    }
  ) : names;
}
function InputControl(props) {
  const { filter, value, operator } = props;
  const operatorLabel = operator ? /* @__PURE__ */ jsx(Trans, { ...FilterOperatorNames[operator] }) : null;
  const formattedValue = filter.control.inputType === "number" ? /* @__PURE__ */ jsx(FormattedNumber, { value }) : value;
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label: /* @__PURE__ */ jsxs(Fragment, { children: [
        operatorLabel,
        " ",
        formattedValue
      ] }),
      panel: /* @__PURE__ */ jsx(InputFilterPanel, { filter })
    }
  );
}
function SelectModelControl(props) {
  const { value, filter } = props;
  const { isLoading, data } = useNormalizedModel(
    `normalized-models/${filter.control.model}/${value}`,
    void 0,
    { enabled: !!value }
  );
  const skeleton = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Skeleton, { variant: "avatar", size: "w-18 h-18 mr-6" }),
    /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-50" })
  ] });
  const modelPreview = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Avatar, { size: "xs", src: data == null ? void 0 : data.model.image, className: "mr-6" }),
    data == null ? void 0 : data.model.name
  ] });
  const label = isLoading || !data ? skeleton : modelPreview;
  return /* @__PURE__ */ jsx(
    FilterListItemDialogTrigger,
    {
      ...props,
      label,
      panel: /* @__PURE__ */ jsx(NormalizedModelFilterPanel, { filter })
    }
  );
}
function FilterList$1({
  filters,
  pinnedFilters,
  className
}) {
  const { decodedFilters, remove, replaceAll } = useBackendFilterUrlParams(
    filters,
    pinnedFilters
  );
  if (!decodedFilters.length)
    return null;
  return /* @__PURE__ */ jsx("div", { className: clsx("flex items-center gap-6 overflow-x-auto", className), children: decodedFilters.map((field, index) => {
    const filter = filters.find((f) => f.key === field.key);
    if (!filter)
      return null;
    const handleValueChange = (payload) => {
      const newFilters = [...decodedFilters];
      newFilters.splice(index, 1, {
        key: filter.key,
        value: payload.value,
        isInactive: false,
        operator: payload.operator || filter.defaultOperator
      });
      replaceAll(newFilters);
    };
    return /* @__PURE__ */ jsxs("div", { children: [
      !field.isInactive && /* @__PURE__ */ jsx(
        IconButton,
        {
          variant: "outline",
          color: "primary",
          size: "xs",
          radius: "rounded-l-md",
          onClick: () => {
            remove(field.key);
          },
          children: /* @__PURE__ */ jsx(CloseIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        FilterListControl,
        {
          filter,
          isInactive: field.isInactive,
          value: field.valueKey != null ? field.valueKey : field.value,
          operator: field.operator,
          onValueChange: handleValueChange
        }
      )
    ] }, field.key);
  }) });
}
const FilterAltIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z" }),
  "FilterAltOutlined"
);
const Accordion = React.forwardRef(
  ({
    variant = "default",
    mode = "single",
    children,
    className,
    isLazy,
    ...other
  }, ref) => {
    const [expandedValues, setExpandedValues] = useControlledState(
      other.expandedValues,
      other.defaultExpandedValues || [],
      other.onExpandedChange
    );
    const itemsCount = React.Children.count(children);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx(variant === "outline" && "space-y-10", className),
        ref,
        role: "presentation",
        children: /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(FocusScope, { children: React.Children.map(children, (child, index) => {
          if (!isValidElement(child))
            return null;
          return cloneElement(child, {
            key: child.key || index,
            value: child.props.value || index,
            isFirst: index === 0,
            isLast: index === itemsCount - 1,
            mode,
            variant,
            expandedValues,
            setExpandedValues,
            isLazy
          });
        }) }) })
      }
    );
  }
);
function AccordionItem(props) {
  const {
    children,
    label,
    disabled,
    bodyClassName,
    labelClassName,
    buttonPadding = "py-10 pl-14 pr-10",
    startIcon,
    description,
    endAppend,
    chevronPosition = "right",
    isFirst,
    mode,
    isLazy,
    variant,
    footerContent,
    onHeaderMouseEnter,
    onHeaderMouseLeave
  } = props;
  const expandedValues = props.expandedValues || [];
  const value = props.value || 0;
  const setExpandedValues = props.setExpandedValues || (() => {
  });
  const ref = useRef(null);
  const isExpanded = !disabled && expandedValues.includes(value);
  const wasExpandedOnce = useRef(false);
  if (isExpanded) {
    wasExpandedOnce.current = true;
  }
  const focusManager = useFocusManager();
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        focusManager == null ? void 0 : focusManager.focusNext();
        break;
      case "ArrowUp":
        focusManager == null ? void 0 : focusManager.focusPrevious();
        break;
      case "Home":
        focusManager == null ? void 0 : focusManager.focusFirst();
        break;
      case "End":
        focusManager == null ? void 0 : focusManager.focusLast();
        break;
    }
  };
  const toggle = () => {
    const i = expandedValues.indexOf(value);
    if (i > -1) {
      const newKeys = [...expandedValues];
      newKeys.splice(i, 1);
      setExpandedValues(newKeys);
    } else if (mode === "single") {
      setExpandedValues([value]);
    } else {
      setExpandedValues([...expandedValues, value]);
    }
  };
  const chevron = /* @__PURE__ */ jsx("div", { className: clsx(variant === "minimal" && ""), children: /* @__PURE__ */ jsx(
    ArrowDropDownIcon,
    {
      "aria-hidden": "true",
      size: "md",
      className: clsx(
        disabled ? "text-disabled" : "text-muted",
        isExpanded && "rotate-180 transition-transform"
      )
    }
  ) });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        variant === "default" && "border-b",
        variant === "outline" && "rounded-panel border",
        disabled && "text-disabled"
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "h3",
          {
            className: clsx(
              "flex w-full items-center justify-between text-sm",
              disabled && "pointer-events-none",
              isFirst && variant === "default" && "border-t",
              isExpanded && variant !== "minimal" ? "border-b" : "border-b border-b-transparent",
              variant === "outline" ? isExpanded ? "rounded-panel-t" : "rounded-panel" : void 0
            ),
            onMouseEnter: onHeaderMouseEnter,
            onMouseLeave: onHeaderMouseLeave,
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  disabled,
                  "aria-expanded": isExpanded,
                  id: buttonId,
                  "aria-controls": panelId,
                  type: "button",
                  ref,
                  onKeyDown,
                  onClick: () => {
                    if (!disabled) {
                      toggle();
                    }
                  },
                  className: clsx(
                    "flex flex-auto items-center gap-10 text-left outline-none hover:bg-hover focus-visible:bg-primary/focus",
                    buttonPadding
                  ),
                  children: [
                    chevronPosition === "left" && chevron,
                    startIcon && cloneElement(startIcon, {
                      size: "md",
                      className: clsx(
                        startIcon.props.className,
                        disabled ? "text-disabled" : "text-muted"
                      )
                    }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-auto overflow-hidden overflow-ellipsis", children: [
                      /* @__PURE__ */ jsx("div", { className: labelClassName, "data-testid": "accordion-label", children: label }),
                      description && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: description })
                    ] }),
                    chevronPosition === "right" && chevron
                  ]
                }
              ),
              endAppend && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 px-4 text-sm text-muted", children: endAppend })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          m.div,
          {
            "aria-labelledby": id,
            role: "region",
            variants: AccordionAnimation.variants,
            transition: AccordionAnimation.transition,
            initial: false,
            animate: isExpanded ? "open" : "closed",
            children: [
              /* @__PURE__ */ jsx("div", { className: clsx("p-16", bodyClassName), children: !isLazy || wasExpandedOnce ? children : null }),
              footerContent
            ]
          }
        )
      ]
    }
  );
}
function BooleanFilterPanel({
  filter
}) {
  return null;
}
function AddFilterDialog({ filters }) {
  const { decodedFilters } = useBackendFilterUrlParams(filters);
  const { formId } = useDialogContext();
  const [expandedFilters, setExpandedFilters] = useState(
    () => {
      return decodedFilters.map((f) => f.key);
    }
  );
  const clearButton = /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: "outline",
      className: "mr-auto",
      onClick: () => {
        setExpandedFilters([]);
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Clear" })
    }
  );
  const applyButton = /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: "flat",
      color: "primary",
      className: "ml-auto",
      type: "submit",
      form: formId,
      children: /* @__PURE__ */ jsx(Trans, { message: "Apply" })
    }
  );
  return /* @__PURE__ */ jsxs(Dialog, { className: "min-w-[300px]", maxWidth: "max-w-400", size: "auto", children: [
    /* @__PURE__ */ jsx(
      DialogHeader,
      {
        padding: "px-14 py-10",
        leftAdornment: clearButton,
        rightAdornment: applyButton,
        children: /* @__PURE__ */ jsx(Trans, { message: "Filter" })
      }
    ),
    /* @__PURE__ */ jsx(DialogBody, { padding: "p-0", children: /* @__PURE__ */ jsx(
      FilterList,
      {
        filters,
        expandedFilters,
        setExpandedFilters
      }
    ) })
  ] });
}
function FilterList({
  filters,
  expandedFilters,
  setExpandedFilters
}) {
  const { decodedFilters, replaceAll } = useBackendFilterUrlParams(filters);
  const defaultValues = {};
  filters.forEach((filter) => {
    const appliedFilter = decodedFilters.find((f) => f.key === filter.key);
    defaultValues[filter.key] = (appliedFilter == null ? void 0 : appliedFilter.value) !== void 0 ? (
      // there might be some extra keys set on filter besides
      // "value" and "operator", so add the whole object to form
      appliedFilter
    ) : {
      value: filter.control.defaultValue,
      operator: filter.defaultOperator
    };
  });
  const form = useForm({ defaultValues });
  const { formId, close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    Form,
    {
      form,
      id: formId,
      onSubmit: (formValue) => {
        const filterValue = Object.entries(formValue).filter(
          ([key, fieldValue]) => expandedFilters.includes(key) && fieldValue !== void 0
        ).map(([key, fieldValue]) => ({
          key,
          ...fieldValue
          // value and operator from form
        }));
        replaceAll(filterValue);
        close();
      },
      children: /* @__PURE__ */ jsx(
        Accordion,
        {
          mode: "multiple",
          expandedValues: expandedFilters,
          onExpandedChange: setExpandedFilters,
          children: filters.map((filter) => /* @__PURE__ */ jsxs(
            AccordionItem,
            {
              startIcon: /* @__PURE__ */ jsx(Checkbox, { checked: expandedFilters.includes(filter.key) }),
              value: filter.key,
              label: /* @__PURE__ */ jsx(Trans, { ...filter.label }),
              bodyClassName: "max-h-288 overflow-y-auto compact-scrollbar",
              children: [
                filter.description && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: clsx(
                      "text-xs text-muted",
                      // boolean filter will have nothing in the panel, no need to add margin
                      filter.control.type !== FilterControlType.BooleanToggle && "mb-14"
                    ),
                    children: /* @__PURE__ */ jsx(Trans, { ...filter.description })
                  }
                ),
                /* @__PURE__ */ jsx(AddFilterDialogPanel, { filter })
              ]
            },
            filter.key
          ))
        }
      )
    }
  );
}
function AddFilterDialogPanel({ filter }) {
  switch (filter.control.type) {
    case FilterControlType.Select:
      return /* @__PURE__ */ jsx(
        SelectFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.ChipField:
      return /* @__PURE__ */ jsx(
        ChipFieldFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.DateRangePicker:
      return /* @__PURE__ */ jsx(
        DateRangeFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.SelectModel:
      return /* @__PURE__ */ jsx(
        NormalizedModelFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.Input:
      return /* @__PURE__ */ jsx(
        InputFilterPanel,
        {
          filter
        }
      );
    case FilterControlType.BooleanToggle:
      return /* @__PURE__ */ jsx(
        BooleanFilterPanel,
        {
          filter
        }
      );
    case "custom":
      const CustomComponent = filter.control.panel;
      return /* @__PURE__ */ jsx(
        CustomComponent,
        {
          filter
        }
      );
    default:
      return null;
  }
}
function AddFilterButton({
  filters,
  icon = /* @__PURE__ */ jsx(FilterAltIcon, {}),
  color = "primary",
  variant = "outline",
  size = "sm",
  disabled,
  className
}) {
  const isMobile = useIsMobileMediaQuery();
  const desktopButton = /* @__PURE__ */ jsx(
    Button,
    {
      variant,
      color,
      startIcon: icon,
      disabled,
      size,
      className,
      children: /* @__PURE__ */ jsx(Trans, { message: "Filter" })
    }
  );
  const mobileButton = /* @__PURE__ */ jsx(
    IconButton,
    {
      color,
      size: "sm",
      variant,
      disabled,
      className,
      children: icon
    }
  );
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", children: [
    isMobile ? mobileButton : desktopButton,
    /* @__PURE__ */ jsx(AddFilterDialog, { filters })
  ] });
}
function timestampFilter(options) {
  var _a2;
  return {
    ...options,
    defaultOperator: FilterOperator.between,
    control: {
      type: FilterControlType.DateRangePicker,
      defaultValue: ((_a2 = options.control) == null ? void 0 : _a2.defaultValue) || dateRangeToAbsoluteRange(
        DateRangePresets[3].getRangeValue()
      )
    }
  };
}
function createdAtFilter(options) {
  return timestampFilter({
    key: "created_at",
    label: message("Date created"),
    ...options
  });
}
function updatedAtFilter(options) {
  return timestampFilter({
    key: "updated_at",
    label: message("Last updated"),
    ...options
  });
}
const USER_MODEL = "user";
function NameWithAvatar({
  image,
  label,
  description,
  labelClassName,
  avatarSize = "md"
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
    image && /* @__PURE__ */ jsx(Avatar, { size: avatarSize, className: "flex-shrink-0", src: image }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: clsx(labelClassName, "overflow-hidden overflow-ellipsis"),
          children: label
        }
      ),
      description && /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis text-xs text-muted", children: description })
    ] })
  ] });
}
const MoreVertIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }),
  "MoreVertOutlined"
);
function ButtonGroup({
  children,
  color,
  variant,
  radius = "rounded-button",
  size,
  className,
  value,
  onChange,
  multiple,
  disabled
}) {
  const isActive = (childValue) => {
    if (value === void 0)
      return false;
    if (multiple) {
      return value.includes(childValue);
    }
    return childValue === value;
  };
  const toggleMultipleValue = (childValue) => {
    const newValue = [...value];
    const childIndex = value.indexOf(childValue);
    if (childIndex > -1) {
      newValue.splice(childIndex, 1);
    } else {
      newValue.push(childValue);
    }
    return newValue;
  };
  const buttons = React.Children.map(children, (button, i) => {
    if (React.isValidElement(button)) {
      const active = isActive(button.props.value);
      const adjustedColor = active ? "primary" : color;
      return React.cloneElement(button, {
        color: active ? "primary" : color,
        variant,
        size,
        radius: null,
        disabled: button.props.disabled || disabled,
        ...button.props,
        onClick: (e) => {
          if (button.props.onClick) {
            button.props.onClick(e);
          }
          if (!onChange)
            return;
          if (multiple) {
            onChange == null ? void 0 : onChange(toggleMultipleValue(button.props.value));
          } else {
            onChange == null ? void 0 : onChange(button.props.value);
          }
        },
        className: clsx(
          button.props.className,
          // borders are hidden via negative margin, make sure both are visible for active item
          active ? "z-20" : "z-10",
          getStyle(i, children, radius, adjustedColor)
        )
      });
    }
  });
  return /* @__PURE__ */ jsx("div", { className: clsx(radius, "isolate inline-flex", className), children: buttons });
}
function getStyle(i, children, radius, color) {
  if (i === 0) {
    return clsx(
      radius,
      "rounded-tr-none rounded-br-none",
      !color && "border-r-transparent disabled:border-r-transparent"
    );
  }
  if (i === children.length - 1) {
    return clsx(radius, "rounded-tl-none rounded-bl-none -ml-1");
  }
  return clsx(
    "rounded-none -ml-1",
    !color && "border-r-transparent disabled:border-r-transparent"
  );
}
function useCreateCannedReply(form) {
  return useMutation({
    mutationFn: (payload) => createCannedReply(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["canned-replies"] });
      toast(message("Saved reply created"));
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createCannedReply(payload) {
  return apiClient.post(`canned-replies`, payload).then((r) => r.data);
}
function CannedReplyForm({ onSubmit, form, reply }) {
  var _a2;
  const { formId } = useDialogContext();
  const editorRef = useRef(null);
  const [attachments, setAttachments] = useState(
    (reply == null ? void 0 : reply.attachments) || []
  );
  const bodyError = (_a2 = form.formState.errors.body) == null ? void 0 : _a2.message;
  const handleSubmit = () => {
    onSubmit({
      ...form.getValues(),
      body: getReplyBody(editorRef),
      attachments: attachments.map((a) => a.id)
    });
  };
  return /* @__PURE__ */ jsx(
    Form,
    {
      id: formId,
      form,
      onSubmit: handleSubmit,
      onBeforeSubmit: () => form.clearErrors(),
      children: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(FileUploadProvider, { children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            autoFocus: true,
            className: "mb-24",
            label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
            name: "name"
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-24",
            name: "shared",
            description: /* @__PURE__ */ jsx(Trans, { message: "Shared replies will be visible to all agents, not just you." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Shared" })
          }
        ),
        /* @__PURE__ */ jsx(
          ReplyEditor,
          {
            initialContent: (reply == null ? void 0 : reply.body) || "",
            minHeight: "min-h-[300px]",
            isLoading: false,
            editorRef,
            attachments,
            onAttachmentsChange: (attachments2) => setAttachments(attachments2),
            onSubmit: handleSubmit
          }
        ),
        bodyError && /* @__PURE__ */ jsx("div", { className: "pt-10 text-xs text-danger", children: bodyError })
      ] }) })
    }
  );
}
function CreateCannedReplyDialog() {
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      shared: false
    }
  });
  const createCannedReply2 = useCreateCannedReply(form);
  const handleSubmit = (value) => {
    createCannedReply2.mutate(value, {
      onSuccess: () => close()
    });
  };
  return /* @__PURE__ */ jsxs(Dialog, { size: "lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "New saved reply" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(CannedReplyForm, { form, onSubmit: handleSubmit }) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          form: formId,
          variant: "flat",
          color: "primary",
          disabled: createCannedReply2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const DatatableDataQueryKey = (endpoint, params) => {
  const key = endpoint.split("/");
  if (params) {
    key.push(params);
  }
  return key;
};
function useDatatableData(endpoint, params, options, onLoad) {
  return useQuery({
    queryKey: DatatableDataQueryKey(endpoint, params),
    queryFn: ({ signal }) => paginate(endpoint, params, onLoad, signal),
    placeholderData: keepPreviousData,
    ...options
  });
}
async function paginate(endpoint, params, onLoad, signal) {
  if (params.query) {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  const response = await apiClient.get(endpoint, { params, signal: params.query ? signal : void 0 }).then((response2) => response2.data);
  onLoad == null ? void 0 : onLoad(response);
  return response;
}
const DataTableContext = React.createContext(
  null
);
function useDataTable() {
  return useContext(DataTableContext);
}
function DataTableHeader({
  actions,
  filters,
  filtersLoading,
  searchPlaceholder = message("Type to search..."),
  searchValue = "",
  onSearchChange
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs(HeaderLayout, { children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        size: "sm",
        className: "mr-auto min-w-180 max-w-440 flex-auto",
        inputWrapperClassName: "mr-24 md:mr-0",
        placeholder: trans(searchPlaceholder),
        startAdornment: /* @__PURE__ */ jsx(SearchIcon, { size: "sm" }),
        value: searchValue,
        onChange: (e) => {
          onSearchChange(e.target.value);
        }
      }
    ),
    filters && /* @__PURE__ */ jsx(AddFilterButton, { filters, disabled: filtersLoading }),
    actions
  ] });
}
function HeaderLayout({ children, ...domProps }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "hidden-scrollbar relative mb-24 flex h-42 items-center gap-8 overflow-x-auto text-muted md:gap-12",
      ...domProps,
      children
    }
  );
}
function SelectedStateDatatableHeader({
  actions,
  selectedItemsCount
}) {
  return /* @__PURE__ */ jsxs(HeaderLayout, { "data-testid": "datatable-selected-header", children: [
    /* @__PURE__ */ jsx("div", { className: "mr-auto", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "[one 1 item|other :count items] selected",
        values: { count: selectedItemsCount }
      }
    ) }),
    actions
  ] });
}
function FilterListSkeleton() {
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      className: "flex items-center gap-6 h-30",
      ...opacityAnimation,
      children: [
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-144", radius: "rounded-md" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-112", radius: "rounded-md" }),
        /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "h-full w-172", radius: "rounded-md" })
      ]
    },
    "filter-list-skeleton"
  );
}
function DataTable({
  filters,
  filtersLoading,
  columns,
  searchPlaceholder,
  queryParams,
  endpoint,
  actions,
  selectedActions,
  emptyStateMessage,
  tableDomProps,
  onRowAction,
  enableSelection = true,
  selectionStyle = "checkbox",
  children,
  cellHeight,
  collapseTableOnMobile = true
}) {
  var _a2;
  const isMobile = useIsMobileMediaQuery();
  const { trans } = useTrans();
  const { encodedFilters } = useBackendFilterUrlParams(filters);
  const [params, setParams] = useState({ perPage: 15 });
  const [selectedRows, setSelectedRows] = useState([]);
  const query = useDatatableData(
    endpoint,
    {
      ...params,
      ...queryParams,
      [BackendFiltersUrlKey]: encodedFilters
    },
    void 0,
    () => setSelectedRows([])
  );
  const isFiltering = !!(params.query || params.filters || encodedFilters);
  const pagination = (_a2 = query.data) == null ? void 0 : _a2.pagination;
  return /* @__PURE__ */ jsxs(
    DataTableContext.Provider,
    {
      value: {
        selectedRows,
        setSelectedRows,
        endpoint,
        params,
        setParams,
        query
      },
      children: [
        children,
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: selectedRows.length ? /* @__PURE__ */ jsx(
          SelectedStateDatatableHeader,
          {
            selectedItemsCount: selectedRows.length,
            actions: selectedActions
          },
          "selected"
        ) : /* @__PURE__ */ jsx(
          DataTableHeader,
          {
            searchPlaceholder,
            searchValue: params.query,
            onSearchChange: (query2) => setParams({ ...params, query: query2 }),
            actions,
            filters,
            filtersLoading
          },
          "default"
        ) }),
        filters && /* @__PURE__ */ jsx("div", { className: "mb-14", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: filtersLoading && encodedFilters ? /* @__PURE__ */ jsx(FilterListSkeleton, {}) : /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(FilterList$1, { filters }) }, "filter-list") }) }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "relative rounded-panel",
              (!isMobile || !collapseTableOnMobile) && "border"
            ),
            children: [
              query.isFetching && /* @__PURE__ */ jsx(
                ProgressBar,
                {
                  isIndeterminate: true,
                  className: "absolute left-0 top-0 z-10 w-full",
                  "aria-label": trans({ message: "Loading" }),
                  size: "xs"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "relative overflow-x-auto md:overflow-hidden", children: /* @__PURE__ */ jsx(
                Table,
                {
                  ...tableDomProps,
                  columns,
                  data: (pagination == null ? void 0 : pagination.data) || [],
                  sortDescriptor: params,
                  onSortChange: (descriptor) => {
                    setParams({ ...params, ...descriptor });
                  },
                  selectedRows,
                  enableSelection,
                  selectionStyle,
                  onSelectionChange: setSelectedRows,
                  onAction: onRowAction,
                  collapseOnMobile: collapseTableOnMobile,
                  cellHeight
                }
              ) }),
              (query.isFetched || query.isPlaceholderData) && !(pagination == null ? void 0 : pagination.data.length) ? /* @__PURE__ */ jsx("div", { className: "pt-50", children: cloneElement(emptyStateMessage, {
                isFiltering
              }) }) : void 0,
              /* @__PURE__ */ jsx(
                DataTablePaginationFooter,
                {
                  query,
                  onPageChange: (page) => setParams({ ...params, page }),
                  onPerPageChange: (perPage) => setParams({ ...params, perPage })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function DataTablePage({
  title,
  headerContent,
  headerItemsAlign = "items-end",
  className,
  padding,
  ...dataTableProps
}) {
  const titleId = useId();
  return /* @__PURE__ */ jsxs("div", { className: clsx(padding ?? "p-12 md:p-24", className), children: [
    title && /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "mb-16",
          headerContent && `flex ${headerItemsAlign} gap-4`
        ),
        children: [
          /* @__PURE__ */ jsx(StaticPageTitle, { children: title }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-light first:capitalize", id: titleId, children: title }),
          headerContent
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      DataTable,
      {
        ...dataTableProps,
        tableDomProps: {
          "aria-labelledby": title ? titleId : void 0
        }
      }
    )
  ] });
}
const AddIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" }),
  "AddOutlined"
);
const DataTableAddItemButton = React.forwardRef(
  ({ children, to, elementType, onClick, href, download, icon, disabled }, ref) => {
    const isMobile = useIsMobileMediaQuery();
    if (isMobile) {
      return /* @__PURE__ */ jsx(
        IconButton,
        {
          ref,
          variant: "flat",
          color: "primary",
          className: "flex-shrink-0",
          size: "sm",
          to,
          href,
          download,
          elementType,
          onClick,
          disabled,
          children: icon || /* @__PURE__ */ jsx(AddIcon, {})
        }
      );
    }
    return /* @__PURE__ */ jsx(
      Button,
      {
        ref,
        startIcon: icon || /* @__PURE__ */ jsx(AddIcon, {}),
        variant: "flat",
        color: "primary",
        size: "sm",
        to,
        href,
        download,
        elementType,
        onClick,
        disabled,
        children
      }
    );
  }
);
function useDeleteSelectedRows() {
  const { endpoint, selectedRows, setSelectedRows } = useDataTable();
  return useMutation({
    mutationFn: () => deleteSelectedRows(endpoint, selectedRows),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint)
      });
      toast(
        message("Deleted [one 1 record|other :count records]", {
          values: { count: selectedRows.length }
        })
      );
      setSelectedRows([]);
    },
    onError: (err) => showHttpErrorToast(err, message("Could not delete records"))
  });
}
function deleteSelectedRows(endpoint, ids) {
  return apiClient.delete(`${endpoint}/${ids.join(",")}`).then((r) => r.data);
}
function DeleteSelectedItemsAction() {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { variant: "flat", color: "danger", className: "ml-auto", children: /* @__PURE__ */ jsx(Trans, { message: "Delete" }) }),
    /* @__PURE__ */ jsx(DeleteItemsDialog, {})
  ] });
}
function DeleteItemsDialog() {
  const deleteSelectedRows2 = useDeleteSelectedRows();
  const { selectedRows } = useDataTable();
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isLoading: deleteSelectedRows2.isPending,
      title: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Delete [one 1 item|other :count items]?",
          values: { count: selectedRows.length }
        }
      ),
      body: /* @__PURE__ */ jsx(Trans, { message: "This will permanently remove the items and cannot be undone." }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
      isDanger: true,
      onConfirm: () => {
        deleteSelectedRows2.mutate(void 0, { onSuccess: () => close() });
      }
    }
  );
}
const onlineArticlesImg = "/assets/online-articles-1ec8936a.svg";
const CannedRepliesDatatableFilters = [
  {
    key: "shared",
    label: message("Shared"),
    description: message("Whether reply is marked as shared"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.BooleanToggle,
      defaultValue: true
    }
  },
  {
    key: "user_id",
    label: message("Owner"),
    description: message("User this reply was created by"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL
    }
  },
  createdAtFilter({
    description: message("Date reply was created")
  }),
  updatedAtFilter({
    description: message("Date reply was last updated")
  })
];
function useDeleteCannedReplies() {
  return useMutation({
    mutationFn: (payload) => deleteReplies(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["canned-replies"] });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteReplies(payload) {
  return apiClient.delete(`canned-replies/${payload.ids.join(",")}`).then((r) => r.data);
}
function useUpdateCannedReply(form, id) {
  return useMutation({
    mutationFn: (payload) => updateCannedReply(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["canned-replies"] });
      toast(message("Reply updated"));
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateCannedReply(id, payload) {
  return apiClient.put(`canned-replies/${id}`, payload).then((r) => r.data);
}
function UpdateCannedReplyDialog({ reply }) {
  var _a2;
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      name: reply.name,
      body: reply.body,
      shared: reply.shared,
      attachments: (_a2 = reply.attachments) == null ? void 0 : _a2.map((a) => a.id)
    }
  });
  const updateCannedReply2 = useUpdateCannedReply(form, reply.id);
  const handleSubmit = (value) => {
    updateCannedReply2.mutate(value, {
      onSuccess: () => close()
    });
  };
  return /* @__PURE__ */ jsxs(Dialog, { size: "lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update saved reply" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(CannedReplyForm, { form, onSubmit: handleSubmit, reply }) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          form: formId,
          variant: "flat",
          color: "primary",
          disabled: updateCannedReply2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
function truncateString(str, length, end = "...") {
  if (length == null || length >= str.length) {
    return str;
  }
  return str.slice(0, Math.max(0, length - end.length)) + end;
}
function stripTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}
const CannedRepliesDatatableColumns = [
  {
    key: "name",
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Saved reply" }),
    body: (reply) => /* @__PURE__ */ jsx(CannedReplyColumn, { reply })
  },
  {
    key: "user_id",
    allowsSorting: true,
    width: "min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Owner" }),
    body: (reply) => reply.user ? /* @__PURE__ */ jsx(
      NameWithAvatar,
      {
        image: reply.user.avatar,
        label: reply.user.display_name,
        description: reply.user.email
      }
    ) : null
  },
  {
    key: "shared",
    allowsSorting: true,
    width: "w-60 flex-shrink-0",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Shared" }),
    body: (reply) => reply.shared ? /* @__PURE__ */ jsx(CheckIcon, { size: "md", className: "text-positive" }) : /* @__PURE__ */ jsx(CloseIcon, { size: "md", className: "text-danger" })
  },
  {
    key: "updatedAt",
    allowsSorting: true,
    width: "w-96",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (reply) => /* @__PURE__ */ jsx("time", { children: /* @__PURE__ */ jsx(FormattedDate, { date: reply.updated_at }) })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    width: "w-84 flex-shrink-0",
    hideHeader: true,
    align: "end",
    visibleInMode: "all",
    body: (reply) => /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Edit reply" }), children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(EditIcon, {}) }) }),
        /* @__PURE__ */ jsx(UpdateCannedReplyDialog, { reply })
      ] }),
      /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Delete reply" }), children: /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(DeleteIcon, {}) }) }),
        /* @__PURE__ */ jsx(DeleteCannedReplyDialog, { reply })
      ] })
    ] })
  }
];
function CannedReplyColumn({ reply }) {
  const { isCollapsedMode } = useContext(TableContext);
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx(
          isCollapsedMode ? "whitespace-normal" : "overflow-hidden overflow-ellipsis whitespace-nowrap font-medium"
        ),
        children: reply.name
      }
    ),
    !isCollapsedMode && /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-680 whitespace-normal text-xs text-muted", children: truncateString(stripTags(reply.body), 230) })
  ] });
}
function DeleteCannedReplyDialog({ reply }) {
  const deleteReplies2 = useDeleteCannedReplies();
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isDanger: true,
      isLoading: deleteReplies2.isPending,
      title: /* @__PURE__ */ jsx(Trans, { message: "Delete saved reply" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this saved reply?" }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
      onConfirm: () => {
        deleteReplies2.mutate({ ids: [reply.id] }, { onSuccess: () => close() });
      }
    }
  );
}
function CannedRepliesDatatablePage({ userId }) {
  const { columns, filters } = useMemo(() => {
    return {
      columns: CannedRepliesDatatableColumns.filter(
        (c) => c.key !== "user_id" || !userId
      ),
      filters: CannedRepliesDatatableFilters.filter(
        (f) => f.key !== "user_id" || !userId
      )
    };
  }, [userId]);
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "canned-replies",
      title: /* @__PURE__ */ jsx(Trans, { message: "Saved replies" }),
      columns,
      filters,
      queryParams: {
        shared: "true",
        with: !userId ? "user" : void 0,
        user_id: userId
      },
      actions: /* @__PURE__ */ jsx(Actions, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      enableSelection: false,
      cellHeight: "h-76",
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: onlineArticlesImg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No saved replies have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching replies" })
        }
      )
    }
  );
}
function Actions() {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add reply" }) }),
    /* @__PURE__ */ jsx(CreateCannedReplyDialog, {})
  ] });
}
const InfoDialogTriggerIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" }),
  "InfoDialogTrigger"
);
function InfoDialogTrigger({
  title,
  body,
  dialogSize = "sm",
  className
}) {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "popover", triggerOnHover: true, children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        className: clsx("ml-4 text-muted opacity-70", className),
        iconSize: "xs",
        size: "2xs",
        children: /* @__PURE__ */ jsx(InfoDialogTriggerIcon, { viewBox: "0 0 16 16" })
      }
    ),
    /* @__PURE__ */ jsxs(Dialog, { size: dialogSize, children: [
      title && /* @__PURE__ */ jsx(DialogHeader, { padding: "px-18 pt-12", size: "md", hideDismissButton: true, children: title }),
      /* @__PURE__ */ jsx(DialogBody, { children: body })
    ] })
  ] });
}
function useBanUser(form, userId) {
  return useMutation({
    mutationFn: (payload) => banUser(userId, payload),
    onSuccess: async () => {
      toast(message("User suspended"));
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function banUser(userId, payload) {
  return apiClient.post(`users/${userId}/ban`, payload).then((r) => r.data);
}
function useDatePickerState(props) {
  const now2 = useCurrentDateTime();
  const [isPlaceholder, setIsPlaceholder] = useState(
    !props.value && !props.defaultValue
  );
  const setStateValue = props.onChange;
  const [internalValue, setInternalValue] = useControlledState(
    props.value || now2,
    props.defaultValue || now2,
    (value) => {
      setIsPlaceholder(false);
      setStateValue == null ? void 0 : setStateValue(value);
    }
  );
  const {
    min,
    max,
    granularity,
    timezone,
    calendarIsOpen,
    setCalendarIsOpen,
    closeDialogOnSelection
  } = useBaseDatePickerState(internalValue, props);
  const clear = useCallback(() => {
    setIsPlaceholder(true);
    setInternalValue(now2);
    setStateValue == null ? void 0 : setStateValue(null);
    setCalendarIsOpen(false);
  }, [now2, setInternalValue, setStateValue, setCalendarIsOpen]);
  const [calendarDates, setCalendarDates] = useState(() => {
    return [toCalendarDate(internalValue)];
  });
  const setSelectedValue = useCallback(
    (newValue) => {
      if (min && newValue.compare(min) < 0) {
        newValue = min;
      } else if (max && newValue.compare(max) > 0) {
        newValue = max;
      }
      const value = internalValue ? internalValue.set(newValue) : toZoned(newValue, timezone);
      setInternalValue(value);
      setCalendarDates([toCalendarDate(value)]);
      setIsPlaceholder(false);
    },
    [setInternalValue, min, max, internalValue, timezone]
  );
  const dayIsActive = useCallback(
    (day) => !isPlaceholder && isSameDay(internalValue, day),
    [internalValue, isPlaceholder]
  );
  const getCellProps = useCallback(
    (date) => {
      return {
        onClick: () => {
          setSelectedValue == null ? void 0 : setSelectedValue(date);
          if (closeDialogOnSelection) {
            setCalendarIsOpen == null ? void 0 : setCalendarIsOpen(false);
          }
        }
      };
    },
    [setSelectedValue, setCalendarIsOpen, closeDialogOnSelection]
  );
  return {
    selectedValue: internalValue,
    setSelectedValue: setInternalValue,
    calendarIsOpen,
    setCalendarIsOpen,
    dayIsActive,
    dayIsHighlighted: () => false,
    dayIsRangeStart: () => false,
    dayIsRangeEnd: () => false,
    getCellProps,
    calendarDates,
    setCalendarDates,
    isPlaceholder,
    clear,
    setIsPlaceholder,
    min,
    max,
    granularity,
    timezone,
    closeDialogOnSelection
  };
}
function DatePicker({ showCalendarFooter, ...props }) {
  const state = useDatePickerState(props);
  const inputRef = useRef(null);
  const now2 = useCurrentDateTime();
  const footer = showCalendarFooter && /* @__PURE__ */ jsx(
    DialogFooter,
    {
      padding: "px-14 pb-14",
      startAction: /* @__PURE__ */ jsx(
        Button,
        {
          disabled: state.isPlaceholder,
          variant: "text",
          color: "primary",
          onClick: () => {
            state.clear();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Clear" })
        }
      ),
      children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "text",
          color: "primary",
          onClick: () => {
            state.setSelectedValue(now2);
            state.setCalendarIsOpen(false);
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Today" })
        }
      )
    }
  );
  const dialog = /* @__PURE__ */ jsx(
    DialogTrigger,
    {
      offset: 8,
      placement: "bottom-start",
      isOpen: state.calendarIsOpen,
      onOpenChange: state.setCalendarIsOpen,
      type: "popover",
      triggerRef: inputRef,
      returnFocusToTrigger: false,
      moveFocusToDialog: false,
      children: /* @__PURE__ */ jsxs(Dialog, { size: "auto", children: [
        /* @__PURE__ */ jsx(
          DialogBody,
          {
            className: "flex items-start gap-40",
            padding: showCalendarFooter ? "px-24 pt-20 pb-10" : null,
            children: /* @__PURE__ */ jsx(Calendar, { state, visibleMonths: 1 })
          }
        ),
        footer
      ] })
    }
  );
  const openOnClick = {
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isHourSegment(e)) {
        state.setCalendarIsOpen(true);
      } else {
        state.setCalendarIsOpen(false);
      }
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      DatePickerField,
      {
        ref: inputRef,
        wrapperProps: openOnClick,
        endAdornment: /* @__PURE__ */ jsx(DateRangeIcon, { className: clsx(props.disabled && "text-disabled") }),
        ...props,
        children: /* @__PURE__ */ jsx(
          DateSegmentList,
          {
            segmentProps: openOnClick,
            state,
            value: state.selectedValue,
            onChange: state.setSelectedValue,
            isPlaceholder: state.isPlaceholder
          }
        )
      }
    ),
    dialog
  ] });
}
function FormDatePicker(props) {
  const { min, max } = props;
  const { trans } = useTrans();
  const { format } = useDateFormatter();
  const {
    field: { onChange, onBlur, value = null, ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name,
    rules: {
      validate: (v) => {
        if (!v)
          return;
        const date = parseAbsoluteToLocal(v);
        if (min && date.compare(min) < 0) {
          return trans({
            message: "Enter a date after :date",
            values: { date: format(v) }
          });
        }
        if (max && date.compare(max) > 0) {
          return trans({
            message: "Enter a date before :date",
            values: { date: format(v) }
          });
        }
      }
    }
  });
  const parsedValue = value ? parseAbsoluteToLocal(value) : null;
  const formProps = {
    onChange: (e) => {
      onChange(e ? e.toAbsoluteString() : e);
    },
    onBlur,
    value: parsedValue,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    inputRef: ref
  };
  return /* @__PURE__ */ jsx(DatePicker, { ...mergeProps(formProps, props) });
}
function isHourSegment(e) {
  return ["hour", "minute", "dayPeriod"].includes(
    e.currentTarget.ariaLabel || ""
  );
}
function BanUserDialog({ user }) {
  const { trans } = useTrans();
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      permanent: true
    }
  });
  const isPermanent = form.watch("permanent");
  const banUser2 = useBanUser(form, user.id);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Suspend “:name“", values: { name: user.display_name } }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form,
      {
        id: formId,
        form,
        onSubmit: (values) => banUser2.mutate(values, { onSuccess: () => close() }),
        children: [
          /* @__PURE__ */ jsx(
            FormDatePicker,
            {
              name: "ban_until",
              label: /* @__PURE__ */ jsx(Trans, { message: "Suspend until" }),
              disabled: isPermanent
            }
          ),
          /* @__PURE__ */ jsx(FormSwitch, { name: "permanent", className: "mt-12", children: /* @__PURE__ */ jsx(Trans, { message: "Permanent" }) }),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mt-24",
              name: "comment",
              inputElementType: "textarea",
              maxLength: 250,
              label: /* @__PURE__ */ jsx(Trans, { message: "Reason" }),
              placeholder: trans(message("Optional"))
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          variant: "flat",
          color: "primary",
          type: "submit",
          disabled: banUser2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Suspend" })
        }
      )
    ] })
  ] });
}
function getSearchReportTableColumns({
  skipCtr,
  description
}) {
  const cols = [
    {
      key: "normalized_term",
      header: () => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Trans, { message: "Term" }) }),
        !!description && /* @__PURE__ */ jsx(InfoDialogTrigger, { body: description })
      ] }),
      visibleInMode: "all",
      body: (item) => /* @__PURE__ */ jsx(
        Link,
        {
          to: `/hc/search/${item.term}`,
          className: LinkStyle,
          target: "_blank",
          children: item.term
        }
      )
    },
    {
      key: "count",
      header: () => /* @__PURE__ */ jsx(Trans, { message: "Count" }),
      width: "w-144",
      body: (item) => /* @__PURE__ */ jsx("span", { children: item.count || 1 })
    },
    skipCtr ? null : {
      key: "ctr",
      header: () => /* @__PURE__ */ jsx(Trans, { message: "CTR" }),
      width: "w-144",
      body: (item) => /* @__PURE__ */ jsxs("span", { children: [
        item.ctr,
        "%"
      ] })
    },
    {
      key: "resulted_in_ticket",
      header: () => /* @__PURE__ */ jsx(Trans, { message: "Resulted in ticket" }),
      width: "w-144",
      body: (item) => /* @__PURE__ */ jsx("span", { className: "text-muted", children: item.resulted_in_ticket ? /* @__PURE__ */ jsx(CheckIcon, {}) : /* @__PURE__ */ jsx(CloseIcon, {}) })
    },
    {
      key: "last_seen",
      header: () => /* @__PURE__ */ jsx(Trans, { message: "Last seen" }),
      visibleInMode: "all",
      width: "w-144",
      body: (item) => /* @__PURE__ */ jsx(FormattedRelativeTime, { date: item.last_seen })
    },
    {
      key: "category",
      header: () => /* @__PURE__ */ jsx(Trans, { message: "Category" }),
      visibleInMode: "all",
      body: (item) => item.category ? /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          image: item.category.image,
          label: /* @__PURE__ */ jsx(CategoryLink, { category: item.category, target: "_blank" }),
          description: item.category.description
        }
      ) : null
    }
  ];
  return cols.filter(Boolean);
}
function dateRangeValueToPayload(value) {
  var _a2, _b2;
  const payload = {
    ...value
  };
  if (payload.dateRange) {
    payload.startDate = payload.dateRange.start.toAbsoluteString();
    payload.endDate = payload.dateRange.end.toAbsoluteString();
    payload.compareStartDate = (_a2 = payload.dateRange.compareStart) == null ? void 0 : _a2.toAbsoluteString();
    payload.compareEndDate = (_b2 = payload.dateRange.compareEnd) == null ? void 0 : _b2.toAbsoluteString();
    payload.timezone = payload.dateRange.start.timeZone;
    delete payload.dateRange;
  }
  return payload;
}
function useSearchReport(params) {
  return useQuery({
    queryKey: ["reports", "search", params],
    queryFn: () => fetchSearches(params)
  });
}
function fetchSearches(params) {
  return apiClient.get(`reports/search`, {
    params: dateRangeValueToPayload(params)
  }).then((response) => response.data);
}
function SearchReportTable({
  userId,
  dateRange,
  failedSearches,
  description
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useSearchReport({
    dateRange,
    userId,
    failedSearches,
    page: searchParams.get("page") || 1,
    perPage: searchParams.get("perPage") || 15
  });
  const { data, fetchStatus, isLoading, isPlaceholderData } = query;
  const items = (data == null ? void 0 : data.pagination.data) || [];
  const isEmpty = fetchStatus === "idle" && items.length === 0 || !isLoading && !isPlaceholderData && items.length === 0;
  const columns = useMemo(() => {
    return getSearchReportTableColumns({
      skipCtr: failedSearches,
      description
    });
  }, [description, failedSearches]);
  return /* @__PURE__ */ jsxs("div", { className: "relative max-md:overflow-x-auto", children: [
    /* @__PURE__ */ jsx(GlobalLoadingProgress, { query }),
    /* @__PURE__ */ jsx(
      Table,
      {
        columns,
        data: items,
        enableSelection: false,
        collapseOnMobile: false,
        className: "max-md:w-min"
      }
    ),
    isEmpty && /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-48",
        image: /* @__PURE__ */ jsx(SvgImage, { src: searchImage }),
        title: /* @__PURE__ */ jsx(Trans, { message: "There are no searches to display" })
      }
    ),
    /* @__PURE__ */ jsx(
      DataTablePaginationFooter,
      {
        query,
        onPageChange: (page) => setSearchParams((prev) => {
          prev.set("page", page.toString());
          return prev;
        }),
        onPerPageChange: (perPage) => setSearchParams((prev) => {
          prev.set("perPage", perPage.toString());
          return prev;
        })
      }
    )
  ] });
}
export {
  AddFilterButton as A,
  ButtonGroup as B,
  CreateCannedReplyDialog as C,
  DeleteIcon as D,
  FormDatePicker as E,
  FilterOperator as F,
  GlobalLoadingProgress as G,
  dateRangeValueToPayload as H,
  InfoDialogTrigger as I,
  FormattedNumber as J,
  DateRangeIcon as K,
  FormattedDateTimeRange as L,
  MoreVertIcon as M,
  NameWithAvatar as N,
  useDateRangePickerState as O,
  DateRangeComparePresets as P,
  DateRangeDialog as Q,
  DateRangePresets as R,
  SearchReportTable as S,
  Tabs as T,
  USER_MODEL as U,
  truncateString as V,
  stripTags as W,
  onlineArticlesImg as X,
  ArrowRightAltIcon as Y,
  FilterAltIcon as Z,
  FilterControlType as a,
  updatedAtFilter as b,
  createdAtFilter as c,
  FilterList$1 as d,
  TabList as e,
  Tab as f,
  FormNormalizedModelField as g,
  CannedRepliesDatatablePage as h,
  FormChipField as i,
  AddIcon as j,
  BanUserDialog as k,
  DataTablePage as l,
  DeleteSelectedItemsAction as m,
  DataTableAddItemButton as n,
  FormSwitch as o,
  Accordion as p,
  AccordionItem as q,
  Switch as r,
  ChipField as s,
  timestampFilter as t,
  useTags as u,
  TabContext as v,
  DatatableDataQueryKey as w,
  useNormalizedModels as x,
  DataTable as y,
  useDataTable as z
};
//# sourceMappingURL=search-report-table-9acf0fea.mjs.map
