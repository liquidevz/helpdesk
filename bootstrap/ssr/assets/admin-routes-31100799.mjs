var _a;
import { jsxs, jsx, Fragment as Fragment$1 } from "react/jsx-runtime";
import { Outlet, Link, useLocation, Navigate, useNavigate, useParams, NavLink, useSearchParams, useOutletContext, useRoutes } from "react-router-dom";
import clsx from "clsx";
import { a as useSettings, at as CustomMenu, T as Trans, n as apiClient, a4 as useLocalStorage, a7 as ErrorIcon, au as setInLocalStorage, m as message, s as showHttpErrorToast, d as useDialogContext, b as Dialog, Z as DialogHeader, c as DialogBody, _ as DialogFooter, B as Button, I as IconButton, D as DialogTrigger, V as createSvgIcon, R as toast, Q as queryClient, o as CheckIcon, C as CloseIcon, O as Chip, a3 as FormattedDate, U as Tooltip, $ as ConfirmationDialog, av as LoginIcon, aw as RadioGroup, ax as Radio, am as FormSelect, i as Item, ay as FormImageSelector, al as FormTextField, ae as ButtonBase, az as KeyboardArrowRightIcon, aA as KeyboardArrowLeftIcon, aB as MixedText, aC as StaticPageTitle, ad as Form$1, a5 as FileUploadProvider, aD as useAppearanceEditorMode, aE as ProgressCircle, e as useTrans, ao as useValueLists, aF as List, aG as ListItem, aH as clamp, E as IllustratedMessage, F as SvgImage, aI as createSvgIconFromTree, aJ as DoneAllIcon, a2 as TextField, q as opacityAnimation, w as Skeleton, aK as Section, g as useNavigate$1, aL as useBootstrapData, J as FullPageLoader, t as LinkStyle, aM as SiteConfigContext, y as getBootstrapData, aN as useIsMobileMediaQuery, aO as SelectForwardRef, an as onFormQueryError, aP as ProgressBar, aQ as ExternalLink, W as MenuTrigger, Y as Menu, ak as getInputFieldClassNames, aR as openUploadWindow, aS as useSocialLogin, a1 as SettingsIcon, aT as removeEmptyValuesFromObject, aU as FormRadioGroup, aV as FormRadio, aW as DateFormatPresets, aX as prettyBytes, aY as useField, aZ as Field, a_ as useResendVerificationEmail, aq as useUser, a$ as useUploadAvatar, b0 as useRemoveAvatar, a6 as openDialog, b1 as UploadInputType, S as SearchIcon, b2 as slugifyString, b3 as useProducts, b4 as FormattedPrice, v as PageStatus, b5 as useMediaQuery, b6 as rootEl, b7 as createEventHandler, l as getCategoryLink, a8 as closeDialog, j as getArticleLink, b8 as WarningIcon, X as KeyboardArrowDownIcon, b9 as UnfoldLessIcon, ba as UnfoldMoreIcon, bb as Checkbox, bc as useFileUploadStore, P as PageMetaTags, p as useAuth, bd as shallowEqual, be as useSelectedLocale, bf as useDateFormatter, bg as useThemeSelector, bh as lazyLoader, k as ArticlePath, bi as useSpinDelay, bj as PageErrorMessage, r as getEditArticleLink, bk as useCustomPage, bl as useCollator, bm as loadFonts, M as FormattedRelativeTime, H as AuthRoute, K as NotFoundPage } from "../server-entry.mjs";
import { a as DashboardLayout, b as DashboardNavbar, c as DashboardSidenav, d as DashboardContent, u as usePrevious, F as FormattedBytes, s as searchImage } from "./search-9f6b7ed0.mjs";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { S as SectionHelper } from "./section-helper-914c12d5.mjs";
import React, { useState, Fragment, forwardRef, useEffect, useRef, useLayoutEffect, useMemo, Suspense, useContext, Children, isValidElement, cloneElement, useCallback, useImperativeHandle, lazy, memo } from "react";
import { F as FilterOperator, a as FilterControlType, c as createdAtFilter, b as updatedAtFilter, N as NameWithAvatar, k as BanUserDialog, l as DataTablePage, m as DeleteSelectedItemsAction, n as DataTableAddItemButton, o as FormSwitch, I as InfoDialogTrigger, p as Accordion, q as AccordionItem, j as AddIcon, i as FormChipField, D as DeleteIcon, r as Switch, U as USER_MODEL, M as MoreVertIcon, s as ChipField, v as TabContext, T as Tabs, e as TabList, f as Tab, w as DatatableDataQueryKey, x as useNormalizedModels, y as DataTable, z as useDataTable, t as timestampFilter, g as FormNormalizedModelField, E as FormDatePicker, u as useTags, H as dateRangeValueToPayload, J as FormattedNumber, K as DateRangeIcon, L as FormattedDateTimeRange, O as useDateRangePickerState, P as DateRangeComparePresets, Q as DateRangeDialog, B as ButtonGroup, R as DateRangePresets, S as SearchReportTable, G as GlobalLoadingProgress, V as truncateString, W as stripTags, X as onlineArticlesImg, h as CannedRepliesDatatablePage } from "./search-report-table-9acf0fea.mjs";
import { d as downloadFileFromUrl, b as FileDownloadIcon, C as ChipList, a as DataTableEmptyStateMessage, c as draggables, e as droppables, f as dragSession, h as dragMonitors, u as useDroppable, L as LinkIcon, j as useCurrentDateTime, k as Avatar, l as FileTypeIcon, m as FilePreviewDialog, n as CodeIcon, o as Divider, p as FontStyleButtons, I as IndentButtons, q as ListButtons, r as LinkButton, s as ImageButton, t as CodeBlockMenuTrigger, v as ClearFormatButton, T as Table, D as DataTablePaginationFooter, w as TableContext } from "./reply-editor-0dd9f156.mjs";
import { E as EditIcon } from "./Edit-7ad4ec30.mjs";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import deepMerge from "deepmerge";
import { useFormContext, useFieldArray, useForm, useController, FormProvider } from "react-hook-form";
import { nanoid } from "nanoid";
import { useGlobalListeners, mergeProps, getScrollParent, useLayoutEffect as useLayoutEffect$1, useObjectRef, isMac } from "@react-aria/utils";
import { useControlledState } from "@react-stately/utils";
import { produce } from "immer";
import { AnimatePresence, m } from "framer-motion";
import { diff } from "deep-object-diff";
import dot from "dot-object";
import { parseColor } from "@react-stately/color";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { getFocusableTreeWalker } from "@react-aria/focus";
import memoize from "nano-memoize";
import { B as Breadcrumb, a as BreadcrumbItem } from "./breadcrumb-093d993c.mjs";
import { useVirtualizer } from "@tanstack/react-virtual";
import { u as useCancelSubscription, a as useResumeSubscription, O as OpenInNewIcon } from "./OpenInNew-0b085879.mjs";
import { B as BulletSeparatedItems, u as useArticle } from "./bullet-seprated-items-77fb8967.mjs";
import { flushSync, createPortal } from "react-dom";
import { DateFormatter, parseAbsoluteToLocal, startOfWeek } from "@internationalized/date";
function AdminSidebar({ className, isCompactMode }) {
  const { version } = useSettings();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "relative flex flex-col gap-20 overflow-y-auto border-r bg-alt px-12 pb-16 pt-26 text-sm font-medium text-muted"
      ),
      children: [
        /* @__PURE__ */ jsx(
          CustomMenu,
          {
            matchDescendants: (to) => to === "/admin",
            menu: "admin-sidebar",
            orientation: "vertical",
            onlyShowIcons: isCompactMode,
            itemClassName: ({ isActive }) => clsx(
              "block w-full rounded-button py-12 px-16",
              isActive ? "bg-primary/6 text-primary font-semibold" : "hover:bg-hover"
            ),
            gap: "gap-8"
          }
        ),
        !isCompactMode && /* @__PURE__ */ jsx("div", { className: "mt-auto gap-14 px-16 text-xs", children: /* @__PURE__ */ jsx(Trans, { message: "Version: :number", values: { number: version } }) })
      ]
    }
  );
}
function useAdminSetupAlerts() {
  return useQuery({
    queryKey: ["admin-setup-alerts"],
    queryFn: () => fetchAlerts()
  });
}
function fetchAlerts() {
  return apiClient.get(`admin/setup-alerts`).then((response) => response.data);
}
function AdminLayout() {
  return /* @__PURE__ */ jsxs(DashboardLayout, { name: "admin", leftSidenavCanBeCompact: true, children: [
    /* @__PURE__ */ jsx(DashboardNavbar, { size: "sm", menuPosition: "admin-navbar" }),
    /* @__PURE__ */ jsx(DashboardSidenav, { position: "left", size: "sm", children: /* @__PURE__ */ jsx(AdminSidebar, {}) }),
    /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsxs("div", { className: "bg dark:bg-alt", children: [
      /* @__PURE__ */ jsx(SetupAlertsList, {}),
      /* @__PURE__ */ jsx(Outlet, {})
    ] }) })
  ] });
}
function SetupAlertsList() {
  const { data } = useAdminSetupAlerts();
  const [dismissValue] = useLocalStorage("admin-setup-alert-dismissed", null);
  const shouldShowAlert = !dismissValue || Date.now() - dismissValue.timestamp > 864e5;
  if (!(data == null ? void 0 : data.alerts.length) || !shouldShowAlert) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "fixed left-0 right-0 top-24 z-10 mx-auto w-max overflow-hidden rounded-panel bg shadow-md", children: /* @__PURE__ */ jsx(SetupAlert, { alert: data.alerts[0] }) });
}
function SetupAlert({ alert }) {
  const description = /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: alert.description } });
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      leadingIcon: /* @__PURE__ */ jsx(ErrorIcon, { size: "xs", className: "text-danger" }),
      onClose: () => {
        setInLocalStorage("admin-setup-alert-dismissed", {
          timestamp: Date.now()
        });
      },
      title: alert.title,
      description,
      color: "neutral"
    },
    alert.title
  );
}
const UserDatatableFilters = [
  {
    key: "email_verified_at",
    label: message("Email"),
    description: message("Email verification status"),
    defaultOperator: FilterOperator.ne,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("is confirmed"),
          value: { value: null, operator: FilterOperator.ne }
        },
        {
          key: "02",
          label: message("is not confirmed"),
          value: { value: null, operator: FilterOperator.eq }
        }
      ]
    }
  },
  createdAtFilter({
    description: message("Date user registered or was created")
  }),
  updatedAtFilter({
    description: message("Date user was last updated")
  }),
  {
    key: "subscriptions",
    label: message("Subscription"),
    description: message("Whether user is subscribed or not"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("is subscribed"),
          value: { value: "*", operator: FilterOperator.has }
        },
        {
          key: "02",
          label: message("is not subscribed"),
          value: { value: "*", operator: FilterOperator.doesntHave }
        }
      ]
    }
  }
];
const teamSvg = "/assets/team-de984127.svg";
function useExportCsv(endpoint2) {
  return useMutation({
    mutationFn: (payload) => exportCsv(endpoint2, payload),
    onError: (err) => showHttpErrorToast(err)
  });
}
function exportCsv(endpoint2, payload) {
  return apiClient.post(endpoint2, payload).then((r) => r.data);
}
function CsvExportInfoDialog() {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Csv export" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Your request is being processed. We'll email you when the report is ready to download. In\n            certain cases, it might take a little longer, depending on the number of items beings\n            exported and the volume of activity."
      }
    ) }),
    /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Got it" }) }) })
  ] });
}
function DataTableExportCsvButton({
  endpoint: endpoint2,
  payload
}) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const exportCsv2 = useExportCsv(endpoint2);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        variant: "outline",
        color: "primary",
        size: "sm",
        className: "flex-shrink-0",
        disabled: exportCsv2.isPending,
        onClick: () => {
          exportCsv2.mutate(payload, {
            onSuccess: (response) => {
              if (response.downloadPath) {
                downloadFileFromUrl(response.downloadPath);
              } else {
                setDialogIsOpen(true);
              }
            }
          });
        },
        children: /* @__PURE__ */ jsx(FileDownloadIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: dialogIsOpen,
        onOpenChange: setDialogIsOpen,
        children: /* @__PURE__ */ jsx(CsvExportInfoDialog, {})
      }
    )
  ] });
}
const PersonOffIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m20 17.17-3.37-3.38c.64.22 1.23.48 1.77.76.97.51 1.58 1.52 1.6 2.62zm1.19 4.02-1.41 1.41-2.61-2.6H4v-2.78c0-1.12.61-2.15 1.61-2.66 1.29-.66 2.87-1.22 4.67-1.45L1.39 4.22 2.8 2.81l18.39 18.38zM15.17 18l-3-3H12c-2.37 0-4.29.73-5.48 1.34-.32.16-.52.5-.52.88V18h9.17zM12 6c1.1 0 2 .9 2 2 0 .86-.54 1.59-1.3 1.87l1.48 1.48C15.28 10.64 16 9.4 16 8c0-2.21-1.79-4-4-4-1.4 0-2.64.72-3.35 1.82l1.48 1.48C10.41 6.54 11.14 6 12 6z" }),
  "PersonOffOutlined"
);
function useUnbanUser(userId) {
  return useMutation({
    mutationFn: () => unbanUser(userId),
    onSuccess: () => {
      toast(message("User unsuspended"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function unbanUser(userId) {
  return apiClient.delete(`users/${userId}/unban`).then((r) => r.data);
}
function useImpersonateUser() {
  return useMutation({
    mutationFn: (payload) => impersonateUser(payload),
    onSuccess: async (response) => {
      toast(message(`Impersonating User "${response.user.display_name}"`));
      window.location.href = "/";
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function impersonateUser(payload) {
  return apiClient.post(`admin/users/impersonate/${payload.userId}`, payload).then((r) => r.data);
}
const userDatatableColumns = [
  {
    key: "name",
    allowsSorting: true,
    sortingKey: "email",
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "User" }),
    body: (user) => /* @__PURE__ */ jsx(
      NameWithAvatar,
      {
        image: user.avatar,
        label: user.display_name,
        description: user.email
      }
    )
  },
  {
    key: "subscribed",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Subscribed" }),
    width: "w-96",
    body: (user) => {
      var _a2;
      return ((_a2 = user.subscriptions) == null ? void 0 : _a2.length) ? /* @__PURE__ */ jsx(CheckIcon, { className: "text-positive icon-md" }) : /* @__PURE__ */ jsx(CloseIcon, { className: "text-danger icon-md" });
    }
  },
  {
    key: "roles",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Roles" }),
    body: (user) => {
      var _a2;
      return /* @__PURE__ */ jsx(ChipList, { radius: "rounded", size: "xs", children: (_a2 = user == null ? void 0 : user.roles) == null ? void 0 : _a2.map((role) => /* @__PURE__ */ jsx(Chip, { selectable: true, children: /* @__PURE__ */ jsx(
        Link,
        {
          className: clsx("capitalize"),
          target: "_blank",
          to: `/admin/roles/${role.id}/edit`,
          children: /* @__PURE__ */ jsx(Trans, { message: role.name })
        }
      ) }, role.id)) });
    }
  },
  {
    key: "firstName",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "First name" }),
    body: (user) => user.first_name
  },
  {
    key: "lastName",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last name" }),
    body: (user) => user.last_name
  },
  {
    key: "createdAt",
    allowsSorting: true,
    width: "w-96",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Created at" }),
    body: (user) => /* @__PURE__ */ jsx("time", { children: /* @__PURE__ */ jsx(FormattedDate, { date: user.created_at }) })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    width: "w-128 flex-shrink-0",
    hideHeader: true,
    align: "end",
    visibleInMode: "all",
    body: (user) => /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsx(Link, { to: `${user.id}/edit`, children: /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Edit user" }), children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(EditIcon, {}) }) }) }),
      user.banned_at ? /* @__PURE__ */ jsx(UnbanButton, { user }) : /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Suspend user" }), children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(PersonOffIcon, {}) }) }),
        /* @__PURE__ */ jsx(BanUserDialog, { user })
      ] }),
      /* @__PURE__ */ jsx(ImpersonateButton, { user })
    ] })
  }
];
function UnbanButton({ user }) {
  const unban = useUnbanUser(user.id);
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (confirmed) => {
        if (confirmed) {
          unban.mutate();
        }
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Remove suspension" }), children: /* @__PURE__ */ jsx(IconButton, { size: "md", color: "danger", children: /* @__PURE__ */ jsx(PersonOffIcon, {}) }) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Suspend “:name“", values: { name: user.display_name } }),
            body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to remove suspension from this user?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Unsuspend" })
          }
        )
      ]
    }
  );
}
function ImpersonateButton({ user }) {
  const impersonate = useImpersonateUser();
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Login as user" }), children: /* @__PURE__ */ jsx(IconButton, { size: "md", children: /* @__PURE__ */ jsx(LoginIcon, {}) }) }),
    /* @__PURE__ */ jsx(
      ConfirmationDialog,
      {
        title: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Login as “:name“",
            values: { name: user.display_name }
          }
        ),
        isLoading: impersonate.isPending,
        body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to login as this user?" }),
        confirm: /* @__PURE__ */ jsx(Trans, { message: "Login" }),
        onConfirm: () => {
          impersonate.mutate({ userId: user.id });
        }
      }
    )
  ] });
}
function UserDatatable() {
  const { billing } = useSettings();
  const filteredColumns = !billing.enable ? userDatatableColumns.filter((c) => c.key !== "subscribed") : userDatatableColumns;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "users",
      title: /* @__PURE__ */ jsx(Trans, { message: "Users" }),
      filters: UserDatatableFilters,
      columns: filteredColumns,
      actions: /* @__PURE__ */ jsx(Actions$b, {}),
      queryParams: { with: "subscriptions,bans" },
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: teamSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No users have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching users" })
        }
      )
    }
  ) });
}
function Actions$b() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DataTableExportCsvButton, { endpoint: "users/csv/export" }),
    /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "new", children: /* @__PURE__ */ jsx(Trans, { message: "Add new user" }) })
  ] });
}
function chunkArray(array, chunkSize) {
  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
}
const DefaultAppearanceConfig = {
  preview: {
    defaultRoute: "/",
    navigationRoutes: []
  },
  sections: {
    general: {
      label: message("General"),
      position: 1,
      buildBreadcrumb: () => [
        {
          label: message("General"),
          location: `general`
        }
      ]
    },
    themes: {
      label: message("Themes"),
      position: 2,
      buildBreadcrumb: (pathname, formValue) => {
        var _a2;
        const parts = pathname.split("/").filter((p) => !!p);
        const [, , , themeIndex] = parts;
        const breadcrumb = [
          {
            label: message("Themes"),
            location: `themes`
          }
        ];
        if (themeIndex != null) {
          breadcrumb.push({
            label: (_a2 = formValue.appearance.themes.all[+themeIndex]) == null ? void 0 : _a2.name,
            location: `themes/${themeIndex}`
          });
        }
        if (parts.at(-1) === "font") {
          breadcrumb.push({
            label: message("Font"),
            location: `themes/${themeIndex}/font`
          });
        }
        if (parts.at(-1) === "radius") {
          breadcrumb.push({
            label: message("Rounding"),
            location: `themes/${themeIndex}/radius`
          });
        }
        return breadcrumb;
      }
    },
    menus: {
      label: message("Menus"),
      position: 3,
      buildBreadcrumb: (pathname, formValue) => {
        const parts = pathname.split("/").filter((p) => !!p);
        const [, , ...rest] = parts;
        const breadcrumb = [
          {
            label: message("Menus"),
            location: "menus"
          }
        ];
        const chunked = chunkArray(rest, 2);
        chunked.forEach(([sectionName, sectionIndex], chunkIndex) => {
          var _a2, _b;
          if (sectionName === "menus" && sectionIndex != null) {
            breadcrumb.push({
              label: (_a2 = formValue.settings.menus[+sectionIndex]) == null ? void 0 : _a2.name,
              location: `menus/${sectionIndex}`
            });
          } else if (sectionName === "items" && sectionIndex != null) {
            const [, menuIndex] = chunked[chunkIndex - 1];
            breadcrumb.push({
              label: (_b = formValue.settings.menus[+menuIndex].items[+sectionIndex]) == null ? void 0 : _b.label,
              location: `menus/${menuIndex}/${sectionIndex}`
            });
          }
        });
        return breadcrumb;
      },
      config: {
        availableRoutes: [
          "/",
          "/login",
          "/register",
          "/contact",
          "/pricing",
          "/account-settings",
          "/admin",
          "/admin/appearance",
          "/admin/settings",
          "/admin/plans",
          "/admin/subscriptions",
          "/admin/users",
          "/admin/roles",
          "/admin/pages",
          "/admin/tags",
          "/admin/files",
          "/admin/localizations",
          "/admin/ads",
          "/admin/settings/authentication",
          "/admin/settings/branding",
          "/admin/settings/cache",
          "/admin/settings/providers",
          "/api-docs"
        ],
        positions: [
          "admin-navbar",
          "admin-sidebar",
          "custom-page-navbar",
          "auth-page-footer",
          "auth-dropdown",
          "account-settings-page",
          "billing-page",
          "checkout-page-navbar",
          "checkout-page-footer",
          "pricing-table-page",
          "contact-us-page",
          "notifications-page",
          "footer",
          "footer-secondary"
        ]
      }
    },
    "custom-code": {
      label: message("Custom Code"),
      position: 4,
      buildBreadcrumb: () => [
        {
          label: message("Custom code"),
          location: `custom-code`
        }
      ]
    },
    "seo-settings": {
      label: message("SEO Settings"),
      position: 5,
      buildBreadcrumb: () => [
        {
          label: message("SEO"),
          location: `seo`
        }
      ]
    }
  }
};
const BackgroundPositions = {
  cover: {
    label: message("Stretch to fit"),
    bgConfig: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }
  },
  contain: {
    label: message("Fit"),
    bgConfig: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center top"
    }
  },
  repeat: {
    label: message("Repeat"),
    bgConfig: {
      backgroundRepeat: "repeat",
      backgroundSize: void 0,
      backgroundPosition: "left top"
    }
  }
};
function BackgroundPositionSelector({
  value: imageBgValue,
  onChange,
  className,
  disabled
}) {
  const selectedPosition = positionKeyFromValue(imageBgValue);
  return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx(RadioGroup, { size: "sm", disabled, children: Object.entries(BackgroundPositions).map(([key, position]) => /* @__PURE__ */ jsx(
    Radio,
    {
      name: "background-position",
      value: key,
      checked: key === selectedPosition,
      onChange: (e) => {
        if (imageBgValue) {
          onChange == null ? void 0 : onChange({
            ...imageBgValue,
            ...position.bgConfig
          });
        }
      },
      children: /* @__PURE__ */ jsx(Trans, { ...position.label })
    },
    key
  )) }) });
}
function positionKeyFromValue(value) {
  if ((value == null ? void 0 : value.backgroundSize) === "cover") {
    return "cover";
  } else if ((value == null ? void 0 : value.backgroundSize) === "contain") {
    return "contain";
  } else {
    return "repeat";
  }
}
function LandingPageSection() {
  const { watch, setValue, getValues } = useFormContext();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Header style" }),
        className: "mb-24",
        name: "settings.landing.header.variant",
        children: [
          /* @__PURE__ */ jsx(Item, { value: "simple", children: /* @__PURE__ */ jsx(Trans, { message: "Simple" }) }),
          /* @__PURE__ */ jsx(Item, { value: "colorful", children: /* @__PURE__ */ jsx(Trans, { message: "Colorful" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      FormImageSelector,
      {
        name: "settings.landing.header.background",
        className: "mb-12",
        label: /* @__PURE__ */ jsx(Trans, { message: "Header image" }),
        defaultValue: "",
        diskPrefix: "homepage"
      }
    ),
    /* @__PURE__ */ jsx(
      BackgroundPositionSelector,
      {
        value: watch("settings.landing.header"),
        disabled: !watch("settings.landing.header.background"),
        onChange: (value) => {
          setValue("settings.landing.header", {
            ...getValues("settings.landing.header"),
            ...value
          });
        },
        className: "mb-20 border-b pb-12"
      }
    ),
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Content style" }),
        className: "mb-12",
        name: "settings.landing.content.variant",
        children: [
          /* @__PURE__ */ jsx(Item, { value: "articleGrid", children: /* @__PURE__ */ jsx(Trans, { message: "Article grid" }) }),
          /* @__PURE__ */ jsx(Item, { value: "multiProduct", children: /* @__PURE__ */ jsx(Trans, { message: "Multiproduct" }) })
        ]
      }
    ),
    watch("settings.landing.content.variant") === "articleGrid" && /* @__PURE__ */ jsx(ArticleGridLayoutFields, {}),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Header title" }),
        className: "mb-24",
        name: "settings.landing.header.title",
        inputElementType: "textarea",
        rows: 2,
        onFocus: () => {
          appearanceState().preview.setHighlight('[data-testid="headerTitle"]');
        }
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Header subtitle" }),
        className: "mb-24",
        inputElementType: "textarea",
        rows: 2,
        name: "settings.landing.header.subtitle",
        onFocus: () => {
          appearanceState().preview.setHighlight(
            '[data-testid="headerSubtitle"]'
          );
        }
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Search field placeholder" }),
        className: "mb-24",
        name: "settings.landing.header.placeholder",
        inputElementType: "textarea",
        rows: 2,
        onFocus: () => {
          appearanceState().preview.setHighlight(
            '[data-testid="headerSubtitle"]'
          );
        }
      }
    ),
    /* @__PURE__ */ jsx(FormSwitch, { className: "mb-24", name: "settings.landing.show_footer", children: /* @__PURE__ */ jsx(Trans, { message: "Show footer" }) })
  ] });
}
function ArticleGridLayoutFields() {
  return /* @__PURE__ */ jsxs("div", { className: "mb-18 border-b pb-18", children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "settings.landing.articles_per_category",
        label: /* @__PURE__ */ jsx(Trans, { message: "Articles per category" }),
        labelSuffixPosition: "inline",
        labelSuffix: /* @__PURE__ */ jsx(
          InfoDialogTrigger,
          {
            body: /* @__PURE__ */ jsx(Trans, { message: "How many articles should each category display in help center homepage." })
          }
        ),
        type: "number",
        className: "mb-12",
        min: "1",
        max: "50"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "settings.landing.children_per_category",
        label: /* @__PURE__ */ jsx(Trans, { message: "Child categories" }),
        labelSuffix: /* @__PURE__ */ jsx(
          InfoDialogTrigger,
          {
            body: /* @__PURE__ */ jsx(Trans, { message: "How many child categories should each parent category display in help center homepage." })
          }
        ),
        labelSuffixPosition: "inline",
        className: "mb-18",
        type: "number",
        min: "1",
        max: "50"
      }
    ),
    /* @__PURE__ */ jsx(FormSwitch, { name: "settings.landing.hide_small_categories", children: /* @__PURE__ */ jsx(Trans, { message: "Hide empty categories" }) })
  ] });
}
const AppearanceButton = forwardRef(
  ({ startIcon, children, className, description, ...other }, ref) => {
    return /* @__PURE__ */ jsxs(
      ButtonBase,
      {
        ref,
        display: "flex",
        className: clsx(
          "relative mb-10 h-54 w-full items-center gap-10 rounded-input border bg px-14 text-sm hover:bg-hover",
          className
        ),
        variant: null,
        ...other,
        children: [
          startIcon,
          /* @__PURE__ */ jsxs("span", { className: "block min-w-0", children: [
            /* @__PURE__ */ jsx("span", { className: "block", children }),
            description && /* @__PURE__ */ jsx("span", { className: "block overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-muted", children: description })
          ] }),
          /* @__PURE__ */ jsx(
            KeyboardArrowRightIcon,
            {
              "aria-hidden": true,
              className: "ml-auto text-muted icon-sm"
            }
          )
        ]
      }
    );
  }
);
function NewTicketPageSection() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Title" }),
        className: "mb-20",
        name: "settings.hc.newTicket.appearance.title",
        inputElementType: "textarea",
        rows: 2
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Category label" }),
        className: "mb-20",
        name: "settings.hc.newTicket.appearance.categoryLabel",
        inputElementType: "textarea",
        rows: 2
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Subject label" }),
        className: "mb-20",
        name: "settings.hc.newTicket.appearance.subjectLabel",
        inputElementType: "textarea",
        rows: 2
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Description label" }),
        className: "mb-20",
        name: "settings.hc.newTicket.appearance.descriptionLabel",
        inputElementType: "textarea",
        rows: 2
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Submit button text" }),
        className: "mb-20",
        name: "settings.hc.newTicket.appearance.submitButtonText",
        inputElementType: "textarea",
        rows: 2
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-24 border-t pt-24", children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          label: /* @__PURE__ */ jsx(Trans, { message: "Sidebar title" }),
          className: "mb-20",
          name: "settings.hc.newTicket.appearance.sidebarTitle",
          inputElementType: "textarea",
          rows: 2
        }
      ),
      /* @__PURE__ */ jsx(AppearanceButton, { to: "sidebar", elementType: Link, children: /* @__PURE__ */ jsx(Trans, { message: "Sidebar tips" }) })
    ] })
  ] });
}
function SidebarTipSection() {
  const { fields, remove, append } = useFieldArray({
    name: "settings.hc.newTicket.appearance.sidebarTips"
  });
  const [expandedValues, setExpandedValues] = useState([0]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      Accordion,
      {
        variant: "outline",
        expandedValues,
        onExpandedChange: (values) => {
          setExpandedValues(values);
        },
        children: fields.map((field, index) => {
          return /* @__PURE__ */ jsxs(
            AccordionItem,
            {
              value: index,
              label: /* @__PURE__ */ jsx(Trans, { message: `Sidebar tip ${index + 1}` }),
              children: [
                /* @__PURE__ */ jsx(SidebarTip, { index }),
                /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "xs",
                    variant: "outline",
                    color: "danger",
                    onClick: () => {
                      remove(index);
                    },
                    children: /* @__PURE__ */ jsx(Trans, { message: "Remove" })
                  }
                ) })
              ]
            },
            field.id
          );
        })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-20 text-right", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "xs",
        variant: "outline",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        onClick: () => {
          append({});
          setExpandedValues([fields.length]);
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Add another" })
      }
    ) })
  ] });
}
function SidebarTip({ index }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: `settings.hc.newTicket.appearance.sidebarTips.${index}.title`,
        label: /* @__PURE__ */ jsx(Trans, { message: "Title" }),
        className: "mb-20",
        inputElementType: "textarea",
        rows: 2
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: `settings.hc.newTicket.appearance.sidebarTips.${index}.content`,
        label: /* @__PURE__ */ jsx(Trans, { message: "Content" }),
        className: "mb-20",
        inputElementType: "textarea",
        rows: 4
      }
    )
  ] });
}
const AppAppearanceConfig = {
  preview: {
    defaultRoute: "/",
    navigationRoutes: ["/"]
  },
  sections: {
    "landing-page": {
      label: message("Landing page"),
      position: 0,
      previewRoute: "/",
      routes: [{ path: "landing-page", element: /* @__PURE__ */ jsx(LandingPageSection, {}) }],
      buildBreadcrumb: () => [
        {
          label: message("Landing page"),
          location: "landing-page"
        }
      ]
    },
    "new-ticket": {
      label: message("New ticket page"),
      position: 1,
      previewRoute: "/hc/tickets/new",
      routes: [
        { path: "new-ticket", element: /* @__PURE__ */ jsx(NewTicketPageSection, {}) },
        {
          path: "new-ticket/sidebar",
          element: /* @__PURE__ */ jsx(SidebarTipSection, {})
        }
      ],
      buildBreadcrumb: (sectionName) => {
        const breadcrumb = [
          {
            label: message("New ticket page"),
            location: "new-ticket"
          }
        ];
        if (sectionName.endsWith("sidebar")) {
          breadcrumb.push({
            label: message("Sidebar"),
            location: "landing-page/sidebar"
          });
        }
        return breadcrumb;
      }
    },
    // missing label will get added by deepMerge from default config
    // @ts-ignore
    menus: {
      config: {
        positions: [
          "header",
          "agent-mailbox",
          "landing-page-navbar",
          "landing-page-footer"
        ],
        availableRoutes: [
          "/hc",
          "/hc/tickets",
          "/hc/tickets/new",
          "/agent/tickets",
          "/admin/hc/arrange",
          "/admin/hc/articles",
          "/admin/triggers"
        ]
      }
    },
    // @ts-ignore
    "seo-settings": {
      config: {
        pages: [
          {
            key: "landing-page",
            label: message("Landing page")
          },
          {
            key: "article-page",
            label: message("Article page")
          },
          {
            key: "category-page",
            label: message("Category page")
          },
          {
            key: "search-page",
            label: message("Search page")
          }
        ]
      }
    }
  }
};
const mergedAppearanceConfig = deepMerge.all([
  DefaultAppearanceConfig,
  AppAppearanceConfig
]);
const useAppearanceStore = create()(
  subscribeWithSelector(
    immer((set, get) => ({
      defaults: null,
      iframeWindow: null,
      config: mergedAppearanceConfig,
      setDefaults: (value) => {
        set((state) => {
          state.defaults = { ...value };
        });
      },
      setIframeWindow: (value) => {
        set(() => {
          return { iframeWindow: value };
        });
      },
      preview: {
        navigate: (sectionName) => {
          var _a2;
          const section = (_a2 = get().config) == null ? void 0 : _a2.sections[sectionName];
          const route = (section == null ? void 0 : section.previewRoute) || "/";
          const preview = get().iframeWindow;
          if (route) {
            postMessage(preview, { type: "navigate", to: route });
          }
        },
        setValues: (values) => {
          const preview = get().iframeWindow;
          postMessage(preview, { type: "setValues", values });
        },
        setThemeFont: (font) => {
          const preview = get().iframeWindow;
          postMessage(preview, { type: "setThemeFont", value: font });
        },
        setThemeValue: (name, value) => {
          const preview = get().iframeWindow;
          postMessage(preview, { type: "setThemeValue", name, value });
        },
        setActiveTheme: (themeId) => {
          const preview = get().iframeWindow;
          postMessage(preview, { type: "setActiveTheme", themeId });
        },
        setCustomCode: (mode, value) => {
          const preview = get().iframeWindow;
          postMessage(preview, { type: "setCustomCode", mode, value });
        },
        setHighlight: (selector) => {
          set(() => {
            var _a2;
            let node = null;
            const document2 = (_a2 = get().iframeWindow) == null ? void 0 : _a2.document;
            if (document2 && selector) {
              node = document2.querySelector(selector);
            }
            if (node) {
              requestAnimationFrame(() => {
                if (!node)
                  return;
                node.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "center"
                });
              });
            }
          });
        }
      }
    }))
  )
);
function postMessage(window2, command) {
  if (window2) {
    window2.postMessage({ source: "be-appearance-editor", ...command }, "*");
  }
}
function appearanceState() {
  return useAppearanceStore.getState();
}
function useSaveAppearanceChanges() {
  return useMutation({
    mutationFn: (values) => saveAppearanceChanges(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin/appearance/values"]
      });
      toast(message("Changes saved"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function saveAppearanceChanges(changes) {
  return apiClient.post(`admin/appearance`, { changes }).then((r) => r.data);
}
function useAppearanceValues() {
  return useQuery({
    queryKey: ["admin/appearance/values"],
    queryFn: () => fetchAppearanceValues(),
    staleTime: Infinity
  });
}
function fetchAppearanceValues() {
  return apiClient.get("admin/appearance/values").then((response) => response.data);
}
function SectionHeader() {
  const { pathname } = useLocation();
  const { getValues } = useFormContext();
  const [breadcrumb, setBreadcrumb] = useState(null);
  useEffect(() => {
    var _a2;
    const [, , sectionName] = pathname.split("/").filter((p) => !!p);
    if (sectionName) {
      const section = (_a2 = appearanceState().config) == null ? void 0 : _a2.sections[sectionName];
      if (section) {
        setBreadcrumb([
          {
            label: message("Appearance"),
            location: ""
          },
          ...section.buildBreadcrumb(pathname, getValues())
        ]);
        return;
      }
    }
    setBreadcrumb(null);
  }, [pathname, getValues]);
  if (!breadcrumb || breadcrumb.length < 2) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b h-60 flex-shrink-0", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        iconSize: "md",
        radius: "rounded-none",
        className: "text-muted h-full w-50 flex-shrink-0",
        elementType: Link,
        to: `/admin/appearance/${breadcrumb[breadcrumb.length - 2].location}`,
        children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "border-l p-10 min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "Customizing" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 text-sm mt-2", children: breadcrumb.map((item, index) => {
        const isLast = breadcrumb.length - 1 === index;
        const isFirst = index === 0;
        const label = /* @__PURE__ */ jsx(MixedText, { value: item.label });
        if (isFirst) {
          return null;
        }
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "whitespace-nowrap overflow-hidden overflow-ellipsis min-w-0",
                isLast && "text-primary",
                // don't overflow ellipses last item
                isLast ? "flex-shrink-0" : "flex-auto"
              ),
              children: label
            }
          ),
          !isLast && /* @__PURE__ */ jsx(KeyboardArrowRightIcon, { className: "icon-sm text-muted flex-shrink-0" })
        ] }, index);
      }) })
    ] })
  ] });
}
function AppearanceLayout() {
  const { isAppearanceEditorActive } = useAppearanceEditorMode();
  const { data } = useAppearanceValues();
  const { base_url } = useSettings();
  const iframeRef = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    if ((data == null ? void 0 : data.defaults) && !appearanceState().defaults) {
      appearanceState().setDefaults(data.defaults);
    }
  }, [data]);
  useEffect(() => {
    if (iframeRef.current) {
      appearanceState().setIframeWindow(iframeRef.current.contentWindow);
    }
  }, []);
  useEffect(() => {
    const sectionName = pathname.split("/")[3];
    appearanceState().preview.navigate(sectionName);
  }, [pathname]);
  if (isAppearanceEditorActive) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/admin" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "h-screen items-center md:flex", children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Appearance" }) }),
    /* @__PURE__ */ jsx(Sidebar, { values: data == null ? void 0 : data.values }),
    /* @__PURE__ */ jsx("div", { className: "relative h-full flex-auto", children: /* @__PURE__ */ jsx(
      "iframe",
      {
        ref: iframeRef,
        className: "h-full w-full max-md:hidden",
        src: `${base_url}?appearanceEditor=true`
      }
    ) })
  ] });
}
function Sidebar({ values }) {
  const spinner = /* @__PURE__ */ jsx("div", { className: "flex h-full flex-auto items-center justify-center", children: /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, "aria-label": "Loading editor" }) });
  return /* @__PURE__ */ jsx("div", { className: "relative z-10 h-full w-full border-r bg shadow-lg @container md:w-320", children: values ? /* @__PURE__ */ jsx(AppearanceForm, { defaultValues: values }) : spinner });
}
function AppearanceForm({ defaultValues }) {
  const form = useForm({ defaultValues });
  const { watch, reset } = form;
  const saveChanges = useSaveAppearanceChanges();
  useEffect(() => {
    const subscription = watch((value) => {
      appearanceState().preview.setValues(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  return /* @__PURE__ */ jsxs(
    Form$1,
    {
      className: "flex h-full flex-col",
      form,
      onSubmit: (values) => {
        saveChanges.mutate(values, {
          onSuccess: () => reset(values)
        });
      },
      children: [
        /* @__PURE__ */ jsx(Header$2, { isLoading: saveChanges.isPending }),
        /* @__PURE__ */ jsx(SectionHeader, {}),
        /* @__PURE__ */ jsx("div", { className: "flex-auto overflow-y-auto px-14 py-20", children: /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) })
      ]
    }
  );
}
function Header$2({ isLoading }) {
  const {
    formState: { dirtyFields }
  } = useFormContext();
  const isDirty = Object.keys(dirtyFields).length;
  return /* @__PURE__ */ jsxs("div", { className: "flex h-50 flex-shrink-0 items-center border-b pr-10", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        border: "border-r",
        className: "text-muted",
        elementType: Link,
        to: "..",
        children: /* @__PURE__ */ jsx(CloseIcon, {})
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "pl-10", children: /* @__PURE__ */ jsx(Trans, { message: "Appearance editor" }) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "flat",
        color: "primary",
        className: "ml-auto block",
        disabled: !isDirty || isLoading,
        type: "submit",
        children: isDirty ? /* @__PURE__ */ jsx(Trans, { message: "Save" }) : /* @__PURE__ */ jsx(Trans, { message: "Saved" })
      }
    )
  ] });
}
function MenuList() {
  const navigate = useNavigate();
  const { trans } = useTrans();
  const { fields, append } = useFieldArray({
    name: "settings.menus",
    keyName: "key"
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { children: fields.map((field, index) => /* @__PURE__ */ jsx(AppearanceButton, { to: `${index}`, elementType: Link, children: field.name }, field.key)) }),
    /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        size: "xs",
        onClick: () => {
          const id = nanoid(10);
          append({
            name: trans(
              message("New menu :number", {
                values: { number: fields.length + 1 }
              })
            ),
            id,
            positions: [],
            items: []
          });
          navigate(`${fields.length}`);
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Create menu" })
      }
    ) })
  ] });
}
function useAvailableRoutes() {
  const menuConfig = mergedAppearanceConfig.sections.menus.config;
  if (!menuConfig)
    return [];
  return menuConfig.availableRoutes.map((route) => {
    return {
      id: route,
      label: route,
      action: route,
      type: "route",
      target: "_self"
    };
  });
}
function ucFirst(string) {
  if (!string)
    return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function AddMenuItemDialog({
  title = /* @__PURE__ */ jsx(Trans, { message: "Add menu item" })
}) {
  const { data } = useValueLists(["menuItemCategories"]);
  const categories = (data == null ? void 0 : data.menuItemCategories) || [];
  const routeItems = useAvailableRoutes();
  return /* @__PURE__ */ jsxs(Dialog, { size: "sm", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: title }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(Accordion, { variant: "outline", children: [
      /* @__PURE__ */ jsx(
        AccordionItem,
        {
          label: /* @__PURE__ */ jsx(Trans, { message: "Link" }),
          bodyClassName: "max-h-240 overflow-y-auto",
          children: /* @__PURE__ */ jsx(AddCustomLink, {})
        }
      ),
      /* @__PURE__ */ jsx(
        AccordionItem,
        {
          label: /* @__PURE__ */ jsx(Trans, { message: "Route" }),
          bodyClassName: "max-h-240 overflow-y-auto",
          children: /* @__PURE__ */ jsx(AddRoute, { items: routeItems })
        }
      ),
      categories.map((category) => /* @__PURE__ */ jsx(
        AccordionItem,
        {
          label: /* @__PURE__ */ jsx(Trans, { message: category.name }),
          children: /* @__PURE__ */ jsx(AddRoute, { items: category.items })
        },
        category.name
      ))
    ] }) })
  ] });
}
function AddCustomLink() {
  const form = useForm({
    defaultValues: {
      id: nanoid(6),
      type: "link",
      target: "_blank"
    }
  });
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsxs(
    Form$1,
    {
      form,
      onSubmit: (value) => {
        close(value);
      },
      children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            required: true,
            name: "label",
            label: /* @__PURE__ */ jsx(Trans, { message: "Label" }),
            className: "mb-20"
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            required: true,
            type: "url",
            name: "action",
            placeholder: "https://",
            label: /* @__PURE__ */ jsx(Trans, { message: "Url" }),
            className: "mb-20"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(Button, { type: "submit", variant: "flat", color: "primary", size: "xs", children: /* @__PURE__ */ jsx(Trans, { message: "Add to menu" }) }) })
      ]
    }
  );
}
function AddRoute({ items }) {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(List, { children: items.map((item) => {
    return /* @__PURE__ */ jsx(
      ListItem,
      {
        startIcon: /* @__PURE__ */ jsx(AddIcon, { size: "sm" }),
        onSelected: () => {
          if (item.label) {
            const last = item.label.split("/").pop();
            item.label = last ? ucFirst(last) : item.label;
            item.id = nanoid(6);
          }
          close(item);
        },
        children: item.label
      },
      item.id
    );
  }) });
}
const DragIndicatorIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }),
  "DragIndicatorOutlined"
);
const dropdownMenu = "/assets/dropdown-menu-c9b3bd6a.svg";
function interactableEvent({
  e,
  rect,
  deltaX,
  deltaY
}) {
  return {
    rect,
    x: e.clientX,
    y: e.clientY,
    deltaX: deltaX ?? 0,
    deltaY: deltaY ?? 0,
    nativeEvent: e
  };
}
let activeInteraction = null;
function setActiveInteraction(name) {
  activeInteraction = name;
}
function domRectToObj(rect) {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height
  };
}
function updateRects(targets) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const { width, height, left, top } = entry.boundingClientRect;
      const [id, target] = [...targets].find(
        ([, target2]) => target2.ref.current === entry.target
      ) || [];
      if (id == null || target == null)
        return;
      const rect = {
        width,
        height,
        left,
        top
      };
      targets.set(id, { ...target, rect });
    });
    observer.disconnect();
  });
  [...targets.values()].forEach((target) => {
    if (target.ref.current) {
      observer.observe(target.ref.current);
    }
  });
}
function useDraggable({
  id,
  disabled,
  ref,
  preview,
  hidePreview,
  ...options
}) {
  const dragHandleRef = useRef(null);
  const { addGlobalListener, removeAllGlobalListeners } = useGlobalListeners();
  const state = useRef({
    lastPosition: { x: 0, y: 0 }
  }).current;
  const optionsRef = useRef(options);
  optionsRef.current = options;
  useLayoutEffect(() => {
    if (!disabled) {
      draggables.set(id, {
        ...draggables.get(id),
        id,
        ref,
        type: optionsRef.current.type,
        getData: optionsRef.current.getData
      });
    } else {
      draggables.delete(id);
    }
    return () => {
      draggables.delete(id);
    };
  }, [id, disabled, optionsRef, ref]);
  const notifyMonitors = (callback) => {
    dragMonitors.forEach((monitor) => {
      var _a2;
      if (monitor.type === ((_a2 = draggables.get(id)) == null ? void 0 : _a2.type)) {
        callback(monitor);
      }
    });
  };
  const onDragStart = (e) => {
    var _a2, _b;
    const draggable = draggables.get(id);
    const el = ref.current;
    const clickedOnHandle = !dragHandleRef.current || !state.clickedEl || dragHandleRef.current.contains(state.clickedEl);
    if (activeInteraction || !el || !draggable || !clickedOnHandle) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    updateRects(droppables);
    setActiveInteraction("drag");
    if (hidePreview) {
      hideNativeGhostImage(e);
    }
    e.dataTransfer.effectAllowed = "move";
    state.lastPosition = { x: e.clientX, y: e.clientY };
    state.currentRect = domRectToObj(el.getBoundingClientRect());
    const ie = interactableEvent({ rect: state.currentRect, e });
    if (preview == null ? void 0 : preview.current) {
      preview.current(draggable, (node) => {
        e.dataTransfer.setDragImage(node, 0, 0);
      });
    }
    dragSession.status = "dragging";
    dragSession.dragTargetId = id;
    if (ref.current) {
      ref.current.dataset.dragging = "true";
    }
    (_b = (_a2 = optionsRef.current).onDragStart) == null ? void 0 : _b.call(_a2, ie, draggable);
    requestAnimationFrame(() => {
      notifyMonitors((m2) => {
        var _a3;
        return (_a3 = m2.onDragStart) == null ? void 0 : _a3.call(m2, ie, draggable);
      });
    });
    addGlobalListener(window, "dragover", onDragOver, true);
  };
  const onDragOver = (e) => {
    var _a2, _b;
    e.preventDefault();
    if (!state.currentRect)
      return;
    const deltaX = e.clientX - state.lastPosition.x;
    const deltaY = e.clientY - state.lastPosition.y;
    const newRect = {
      ...state.currentRect,
      left: state.currentRect.left + deltaX,
      top: state.currentRect.top + deltaY
    };
    const ie = interactableEvent({ rect: newRect, e, deltaX, deltaY });
    const target = draggables.get(id);
    if (target) {
      (_b = (_a2 = optionsRef.current).onDragMove) == null ? void 0 : _b.call(_a2, ie, target);
      notifyMonitors((m2) => {
        var _a3;
        return (_a3 = m2.onDragMove) == null ? void 0 : _a3.call(m2, ie, target);
      });
    }
    state.lastPosition = { x: e.clientX, y: e.clientY };
    state.currentRect = newRect;
  };
  const onDragEnd = (e) => {
    var _a2, _b;
    removeAllGlobalListeners();
    if (!state.currentRect)
      return;
    setActiveInteraction(null);
    if (emptyImage) {
      emptyImage.remove();
    }
    const ie = interactableEvent({ rect: state.currentRect, e });
    const draggable = draggables.get(id);
    if (draggable) {
      (_b = (_a2 = optionsRef.current).onDragEnd) == null ? void 0 : _b.call(_a2, ie, draggable);
      notifyMonitors((m2) => {
        var _a3;
        return (_a3 = m2.onDragEnd) == null ? void 0 : _a3.call(m2, ie, draggable, dragSession.status);
      });
    }
    requestAnimationFrame(() => {
      dragSession.dragTargetId = void 0;
      dragSession.status = "inactive";
      if (ref.current) {
        delete ref.current.dataset.dragging;
      }
    });
  };
  const draggableProps = {
    draggable: !disabled,
    onDragStart,
    onDragEnd,
    onPointerDown: (e) => {
      state.clickedEl = e.target;
    }
  };
  return { draggableProps, dragHandleRef };
}
let emptyImage;
function hideNativeGhostImage(e) {
  if (!emptyImage) {
    emptyImage = new Image();
    document.body.append(emptyImage);
    emptyImage.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }
  e.dataTransfer.setDragImage(emptyImage, 0, 0);
}
const sortableLineStrategy = {
  onDragStart: () => {
  },
  onDragEnter: () => {
  },
  onDragOver: ({ e, ref, item, sortSession: sortSession2, onDropPositionChange }) => {
    var _a2;
    const previousPosition = sortSession2.dropPosition;
    let newPosition = null;
    const rect = (_a2 = droppables.get(item)) == null ? void 0 : _a2.rect;
    if (rect) {
      const midY = rect.top + rect.height / 2;
      if (e.clientY <= midY) {
        newPosition = "before";
      } else if (e.clientY >= midY) {
        newPosition = "after";
      }
    }
    if (newPosition !== previousPosition) {
      const overIndex = sortSession2.sortables.indexOf(item);
      sortSession2.dropPosition = newPosition;
      onDropPositionChange == null ? void 0 : onDropPositionChange(sortSession2.dropPosition);
      clearLinePreview(sortSession2);
      if (ref.current) {
        if (sortSession2.dropPosition === "after") {
          addLinePreview(ref.current, "bottom", sortSession2);
        } else {
          if (overIndex === 0) {
            addLinePreview(ref.current, "top", sortSession2);
          } else {
            const droppableId = sortSession2.sortables[overIndex - 1];
            const droppable = droppables.get(droppableId);
            if (droppable == null ? void 0 : droppable.ref.current) {
              addLinePreview(droppable.ref.current, "bottom", sortSession2);
            }
          }
        }
      }
      const itemIndex = sortSession2.sortables.indexOf(item);
      if (sortSession2.activeIndex === itemIndex) {
        sortSession2.finalIndex = sortSession2.activeIndex;
        return;
      }
      const dragDirection = overIndex > sortSession2.activeIndex ? "after" : "before";
      if (dragDirection === "after") {
        sortSession2.finalIndex = sortSession2.dropPosition === "before" ? itemIndex - 1 : itemIndex;
      } else {
        sortSession2.finalIndex = sortSession2.dropPosition === "after" ? itemIndex + 1 : itemIndex;
      }
    }
  },
  onDragEnd: (sortSession2) => {
    clearLinePreview(sortSession2);
  }
};
function clearLinePreview(sortSession2) {
  if (sortSession2 == null ? void 0 : sortSession2.linePreviewEl) {
    sortSession2.linePreviewEl.style.borderBottomColor = "";
    sortSession2.linePreviewEl.style.borderTopColor = "";
    sortSession2.linePreviewEl = void 0;
  }
}
function addLinePreview(el, side, sortSession2) {
  const color = "rgb(var(--be-primary))";
  if (side === "top") {
    el.style.borderTopColor = color;
  } else {
    el.style.borderBottomColor = color;
  }
  if (sortSession2) {
    sortSession2.linePreviewEl = el;
  }
}
function moveItemInArray(array, fromIndex, toIndex) {
  const from = clamp(fromIndex, 0, array.length - 1);
  const to = clamp(toIndex, 0, array.length - 1);
  if (from === to) {
    return array;
  }
  const target = array[from];
  const delta = to < from ? -1 : 1;
  for (let i = from; i !== to; i += delta) {
    array[i] = array[i + delta];
  }
  array[to] = target;
  return array;
}
function moveItemInNewArray(array, from, to) {
  const newArray = array.slice();
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0]
  );
  return newArray;
}
const transition = "transform 0.2s cubic-bezier(0.2, 0, 0, 1)";
const sortableTransformStrategy = {
  onDragStart: (sortSession2) => {
    sortSession2.sortables.forEach((sortable, index) => {
      const droppable = droppables.get(sortable);
      if (!(droppable == null ? void 0 : droppable.ref.current))
        return;
      droppable.ref.current.style.transition = transition;
      if ((sortSession2 == null ? void 0 : sortSession2.activeIndex) === index) {
        droppable.ref.current.style.opacity = "0.4";
      }
    });
  },
  onDragEnter: (sortSession2, overIndex, currentIndex) => {
    moveItemInArray(sortSession2.sortables, currentIndex, overIndex);
    const rects = sortSession2.sortables.map((s) => {
      var _a2;
      return (_a2 = droppables.get(s)) == null ? void 0 : _a2.rect;
    });
    sortSession2.sortables.forEach((sortable, index) => {
      if (!sortSession2)
        return;
      const newRects = moveItemInNewArray(
        rects,
        overIndex,
        sortSession2.activeIndex
      );
      const oldRect = rects[index];
      const newRect = newRects[index];
      const sortableTarget = droppables.get(sortable);
      if ((sortableTarget == null ? void 0 : sortableTarget.ref.current) && newRect && oldRect) {
        const x = newRect.left - oldRect.left;
        const y = newRect.top - oldRect.top;
        sortableTarget.ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    });
    sortSession2.finalIndex = overIndex;
  },
  onDragOver: () => {
  },
  onDragEnd: (sortSession2) => {
    sortSession2.sortables.forEach((sortable) => {
      const droppable = droppables.get(sortable);
      if (droppable == null ? void 0 : droppable.ref.current) {
        droppable.ref.current.style.transform = "";
        droppable.ref.current.style.transition = "";
        droppable.ref.current.style.opacity = "";
        droppable.ref.current.style.zIndex = "";
      }
    });
  }
};
const sortableMoveNodeStrategy = {
  onDragStart: () => {
  },
  onDragOver: () => {
  },
  onDragEnter: (sortSession2, overIndex, currentIndex) => {
    var _a2;
    const node = (_a2 = droppables.get(sortSession2.sortables[currentIndex])) == null ? void 0 : _a2.ref.current;
    if (node) {
      moveNode(node, currentIndex, overIndex);
      moveItemInArray(sortSession2.sortables, currentIndex, overIndex);
      sortSession2.finalIndex = overIndex;
    }
  },
  onDragEnd: () => {
  }
};
function moveNode(el, currentIndex, newIndex) {
  const parentEl = el.parentElement;
  if (newIndex < 0) {
    parentEl.prepend(el);
  } else {
    if (currentIndex > -1 && currentIndex <= newIndex) {
      newIndex++;
    }
    const ref = parentEl.children.item(newIndex);
    if (ref) {
      ref.before(el);
    } else {
      parentEl.append(el);
    }
  }
}
let sortSession = null;
const strategies = {
  line: sortableLineStrategy,
  liveSort: sortableTransformStrategy,
  moveNode: sortableMoveNodeStrategy
};
function useSortable({
  item,
  items,
  type,
  ref,
  onSortEnd,
  onSortStart,
  onDragEnd,
  preview,
  disabled,
  onDropPositionChange,
  strategy = "liveSort"
}) {
  useEffect(() => {
    if (sortSession && sortSession.sortables.length !== items.length) {
      sortSession.sortables = [...items];
      sortSession.activeIndex = items.indexOf(item);
    }
  }, [items, item]);
  const { draggableProps, dragHandleRef } = useDraggable({
    id: item,
    ref,
    type,
    preview,
    disabled,
    onDragStart: () => {
      var _a2;
      sortSession = {
        sortables: [...items],
        activeSortable: item,
        activeIndex: items.indexOf(item),
        finalIndex: items.indexOf(item),
        dropPosition: null,
        ref,
        scrollParent: ref.current ? getScrollParent(ref.current) : void 0,
        scrollListener: () => {
          updateRects(droppables);
        }
      };
      strategies[strategy].onDragStart(sortSession);
      onSortStart == null ? void 0 : onSortStart();
      (_a2 = sortSession.scrollParent) == null ? void 0 : _a2.addEventListener(
        "scroll",
        sortSession.scrollListener
      );
    },
    onDragEnd: () => {
      var _a2;
      if (!sortSession)
        return;
      sortSession.dropPosition = null;
      onDropPositionChange == null ? void 0 : onDropPositionChange(sortSession.dropPosition);
      if (sortSession.activeIndex !== sortSession.finalIndex) {
        onSortEnd == null ? void 0 : onSortEnd(sortSession.activeIndex, sortSession.finalIndex);
      }
      (_a2 = sortSession.scrollParent) == null ? void 0 : _a2.removeEventListener(
        "scroll",
        sortSession.scrollListener
      );
      strategies[strategy].onDragEnd(sortSession);
      onDragEnd == null ? void 0 : onDragEnd();
      sortSession = null;
    },
    getData: () => {
    }
  });
  const { droppableProps } = useDroppable({
    id: item,
    ref,
    types: [type],
    disabled,
    allowDragEventsFromItself: true,
    onDragOver: (target, e) => {
      if (!sortSession)
        return;
      strategies[strategy].onDragOver({
        e,
        ref,
        item,
        sortSession,
        onDropPositionChange
      });
    },
    onDragEnter: () => {
      if (!sortSession)
        return;
      const overIndex = sortSession.sortables.indexOf(item);
      const oldIndex = sortSession.sortables.indexOf(
        sortSession.activeSortable
      );
      strategies[strategy].onDragEnter(sortSession, overIndex, oldIndex);
    },
    onDragLeave: () => {
      if (!sortSession)
        return;
      sortSession.dropPosition = null;
      onDropPositionChange == null ? void 0 : onDropPositionChange(sortSession.dropPosition);
    }
  });
  return {
    sortableProps: { ...mergeProps(draggableProps, droppableProps) },
    dragHandleRef
  };
}
function MenuEditor() {
  const { menuIndex } = useParams();
  const navigate = useNavigate();
  const { getValues } = useFormContext();
  const formPath = `settings.menus.${menuIndex}`;
  const menu = getValues(formPath);
  useEffect(() => {
    if (!menu) {
      navigate("/admin/appearance/menus");
    } else {
      appearanceState().preview.setHighlight(`[data-menu-id="${menu.id}"]`);
    }
  }, [navigate, menu]);
  if (!menu) {
    return null;
  }
  return /* @__PURE__ */ jsx(MenuEditorSection, { formPath });
}
function MenuEditorSection({ formPath }) {
  const {
    site: { has_mobile_app }
  } = useSettings();
  const menuSectionConfig = useAppearanceStore(
    (s) => {
      var _a2;
      return (_a2 = s.config) == null ? void 0 : _a2.sections.menus.config;
    }
  );
  const menuPositions = useMemo(() => {
    const positions = [...menuSectionConfig == null ? void 0 : menuSectionConfig.positions];
    if (has_mobile_app) {
      positions.push("mobile-app-about");
    }
    return positions.map((position) => ({
      key: position,
      name: position.replaceAll("-", " ")
    }));
  }, [menuSectionConfig, has_mobile_app]);
  const fieldArray = useFieldArray({
    name: `${formPath}.items`,
    keyName: "key"
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-30 border-b pb-30", children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: `${formPath}.name`,
          label: /* @__PURE__ */ jsx(Trans, { message: "Menu name" }),
          className: "mb-20",
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsx(
        FormChipField,
        {
          chipSize: "sm",
          name: `${formPath}.positions`,
          valueKey: "id",
          label: /* @__PURE__ */ jsx(Trans, { message: "Menu positions" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Where should this menu appear on the site" }),
          children: menuPositions.map((item) => /* @__PURE__ */ jsx(Item, { value: item.key, capitalizeFirst: true, children: item.name }, item.key))
        }
      )
    ] }),
    /* @__PURE__ */ jsx(MenuItemsManager, { fieldArray }),
    /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(DeleteMenuTrigger, {}) })
  ] });
}
function MenuItemsManager({ fieldArray: { append, fields, move } }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-shrink-0 items-center justify-between gap-16", children: [
      /* @__PURE__ */ jsx(Trans, { message: "Menu items" }),
      /* @__PURE__ */ jsxs(
        DialogTrigger,
        {
          type: "popover",
          placement: "right",
          offset: 20,
          onClose: (menuItemConfig) => {
            if (menuItemConfig) {
              append({ ...menuItemConfig });
              navigate(`items/${fields.length}`);
            }
          },
          children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                color: "primary",
                size: "xs",
                startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
                children: /* @__PURE__ */ jsx(Trans, { message: "Add" })
              }
            ),
            /* @__PURE__ */ jsx(AddMenuItemDialog, {})
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-20 flex-shrink-0", children: [
      fields.map((item, index) => /* @__PURE__ */ jsx(
        MenuListItem,
        {
          item,
          items: fields,
          index,
          onSortEnd: (oldIndex, newIndex) => {
            move(oldIndex, newIndex);
          }
        },
        item.key
      )),
      !fields.length ? /* @__PURE__ */ jsx(
        IllustratedMessage,
        {
          size: "xs",
          className: "my-40",
          image: /* @__PURE__ */ jsx(SvgImage, { src: dropdownMenu }),
          title: /* @__PURE__ */ jsx(Trans, { message: "No menu items yet" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Click “add“ button to start adding links, pages, routes and other items to this menu. " })
        }
      ) : null
    ] })
  ] });
}
function DeleteMenuTrigger() {
  const navigate = useNavigate();
  const { menuIndex } = useParams();
  const { fields, remove } = useFieldArray({
    name: "settings.menus",
    keyName: "key"
  });
  if (!menuIndex)
    return null;
  const menu = fields[+menuIndex];
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          const index = fields.findIndex((m2) => m2.id === menu.id);
          remove(index);
          navigate("/admin/appearance/menus");
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            color: "danger",
            size: "xs",
            startIcon: /* @__PURE__ */ jsx(DeleteIcon, {}),
            children: /* @__PURE__ */ jsx(Trans, { message: "Delete menu" })
          }
        ),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete menu" }),
            body: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Are you sure you want to delete “:name“?",
                values: { name: menu.name }
              }
            ),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ]
    }
  );
}
function MenuListItem({ item, items, index, onSortEnd }) {
  const ref = useRef(null);
  const { sortableProps, dragHandleRef } = useSortable({
    item,
    items,
    type: "menuEditorSortable",
    ref,
    onSortEnd,
    strategy: "liveSort"
  });
  const Icon = item.icon && createSvgIconFromTree(item.icon);
  const iconOnlyLabel = /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs text-muted", children: [
    Icon && /* @__PURE__ */ jsx(Icon, { size: "sm" }),
    "(",
    /* @__PURE__ */ jsx(Trans, { message: "No label..." }),
    ")"
  ] });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    AppearanceButton,
    {
      elementType: Link,
      to: `items/${index}`,
      ref,
      ...sortableProps,
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10", children: [
        /* @__PURE__ */ jsx(IconButton, { ref: dragHandleRef, size: "sm", children: /* @__PURE__ */ jsx(DragIndicatorIcon, { className: "text-muted hover:cursor-move" }) }),
        /* @__PURE__ */ jsx("div", { children: item.label || iconOnlyLabel })
      ] })
    }
  ) });
}
const PermissionSelector$1 = React.forwardRef(({ valueListKey = "permissions", ...props }, ref) => {
  const { data } = useValueLists([valueListKey]);
  const permissions = (data == null ? void 0 : data.permissions) || (data == null ? void 0 : data.workspacePermissions);
  const [value, setValue] = useControlledState(props.value, [], props.onChange);
  const [showAdvanced, setShowAdvanced] = useState(false);
  if (!permissions)
    return null;
  const groupedPermissions = buildPermissionList(
    permissions,
    value,
    showAdvanced
  );
  const onRestrictionChange = (newPermission) => {
    const newValue = [...value];
    const index = newValue.findIndex((p) => p.id === newPermission.id);
    if (index > -1) {
      newValue.splice(index, 1, newPermission);
    }
    setValue(newValue);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Accordion, { variant: "outline", ref, children: groupedPermissions.map(({ groupName, items, anyChecked }) => /* @__PURE__ */ jsx(
      AccordionItem,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: prettyName(groupName) }),
        startIcon: anyChecked ? /* @__PURE__ */ jsx(DoneAllIcon, { size: "sm" }) : void 0,
        children: /* @__PURE__ */ jsx(List, { children: items.map((permission) => {
          const index = value.findIndex((v) => v.id === permission.id);
          const isChecked = index > -1;
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              ListItem,
              {
                onSelected: () => {
                  if (isChecked) {
                    const newValue = [...value];
                    newValue.splice(index, 1);
                    setValue(newValue);
                  } else {
                    setValue([...value, permission]);
                  }
                },
                endSection: /* @__PURE__ */ jsx(
                  Switch,
                  {
                    tabIndex: -1,
                    checked: isChecked,
                    onChange: () => {
                    }
                  }
                ),
                description: /* @__PURE__ */ jsx(Trans, { message: permission.description }),
                children: /* @__PURE__ */ jsx(
                  Trans,
                  {
                    message: permission.display_name || permission.name
                  }
                )
              }
            ),
            isChecked && /* @__PURE__ */ jsx(
              Restrictions,
              {
                permission,
                onChange: onRestrictionChange
              }
            )
          ] }, permission.id);
        }) })
      },
      groupName
    )) }),
    /* @__PURE__ */ jsx(
      Switch,
      {
        className: "mt-30",
        checked: showAdvanced,
        onChange: (e) => {
          setShowAdvanced(e.target.checked);
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Show advanced permissions" })
      }
    )
  ] });
});
function Restrictions({ permission, onChange }) {
  var _a2;
  if (!((_a2 = permission == null ? void 0 : permission.restrictions) == null ? void 0 : _a2.length))
    return null;
  const setRestrictionValue = (name, value) => {
    const nextState = produce(permission, (draftState) => {
      const restriction = draftState.restrictions.find((r) => r.name === name);
      if (restriction) {
        restriction.value = value;
      }
    });
    onChange == null ? void 0 : onChange(nextState);
  };
  return /* @__PURE__ */ jsx("div", { className: "px-40 py-20", children: permission.restrictions.map((restriction, index) => {
    const isLast = index === permission.restrictions.length - 1;
    const name = /* @__PURE__ */ jsx(Trans, { message: prettyName(restriction.name) });
    const description = restriction.description ? /* @__PURE__ */ jsx(Trans, { message: restriction.description }) : void 0;
    if (restriction.type === "bool") {
      return /* @__PURE__ */ jsx(
        Switch,
        {
          description,
          className: clsx(!isLast && "mb-30"),
          checked: Boolean(restriction.value),
          onChange: (e) => {
            setRestrictionValue(restriction.name, e.target.checked);
          },
          children: name
        },
        restriction.name
      );
    }
    return /* @__PURE__ */ jsx(
      TextField,
      {
        size: "sm",
        label: name,
        description,
        type: "number",
        className: clsx(!isLast && "mb-30"),
        value: restriction.value || "",
        onChange: (e) => {
          setRestrictionValue(
            restriction.name,
            e.target.value === "" ? void 0 : parseInt(e.target.value)
          );
        }
      },
      restriction.name
    );
  }) });
}
function FormPermissionSelector(props) {
  const {
    field: { onChange, value = [], ref }
  } = useController({
    name: props.name
  });
  const formProps = {
    onChange,
    value
  };
  return /* @__PURE__ */ jsx(PermissionSelector$1, { ref, ...mergeProps(formProps, props) });
}
const prettyName = (name) => {
  return ucFirst(name.replace("_", " "));
};
function buildPermissionList(allPermissions, selectedPermissions, showAdvanced) {
  const groupedPermissions = [];
  allPermissions.forEach((permission) => {
    const index = selectedPermissions.findIndex((p) => p.id === permission.id);
    if (!showAdvanced && permission.advanced)
      return;
    let group = groupedPermissions.find(
      (g) => g.groupName === permission.group
    );
    if (!group) {
      group = { groupName: permission.group, anyChecked: false, items: [] };
      groupedPermissions.push(group);
    }
    if (index > -1) {
      const mergedPermission = {
        ...permission,
        restrictions: mergeRestrictions(
          permission.restrictions,
          selectedPermissions[index].restrictions
        )
      };
      group.anyChecked = true;
      group.items.push(mergedPermission);
    } else {
      group.items.push(permission);
    }
  });
  return groupedPermissions;
}
function mergeRestrictions(allRestrictions, selectedRestrictions) {
  return allRestrictions == null ? void 0 : allRestrictions.map((restriction) => {
    const selected = selectedRestrictions.find(
      (r) => r.name === restriction.name
    );
    if (selected) {
      return { ...restriction, value: selected.value };
    } else {
      return restriction;
    }
  });
}
const iconGridStyle = {
  grid: "flex flex-wrap gap-24",
  button: "flex flex-col items-center rounded hover:bg-hover h-90 aspect-square"
};
const skeletons = [...Array(60).keys()];
const IconList = React.lazy(() => import("./icon-list-c6fa1fd9.mjs"));
function IconPicker({ onIconSelected }) {
  const { trans } = useTrans();
  const [value, setValue] = React.useState("");
  return /* @__PURE__ */ jsxs("div", { className: "py-4", children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        className: "mb-20",
        value,
        onChange: (e) => {
          setValue(e.target.value);
        },
        placeholder: trans({ message: "Search icons..." })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      Suspense,
      {
        fallback: /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, className: iconGridStyle.grid, children: skeletons.map((_, index) => /* @__PURE__ */ jsx("div", { className: iconGridStyle.button, children: /* @__PURE__ */ jsx(Skeleton, { variant: "rect" }) }, index)) }),
        children: /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, className: iconGridStyle.grid, children: /* @__PURE__ */ jsx(IconList, { searchQuery: value, onIconSelected }) })
      }
    ) })
  ] });
}
function IconPickerDialog() {
  return /* @__PURE__ */ jsxs(Dialog, { size: "w-850", className: "min-h-dialog", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Select icon" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(IconPickerWrapper, {}) })
  ] });
}
function IconPickerWrapper() {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    IconPicker,
    {
      onIconSelected: (value) => {
        close(value);
      }
    }
  );
}
function MenuItemForm({
  formPathPrefix,
  hideRoleAndPermissionFields
}) {
  const { trans } = useTrans();
  const prefixName = (name) => {
    return formPathPrefix ? `${formPathPrefix}.${name}` : name;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mb-20",
        name: prefixName("label"),
        label: /* @__PURE__ */ jsx(Trans, { message: "Label" }),
        placeholder: trans(message("No label...")),
        startAppend: /* @__PURE__ */ jsx(IconDialogTrigger, { prefixName })
      }
    ),
    /* @__PURE__ */ jsx(DestinationSelector, { prefixName }),
    !hideRoleAndPermissionFields && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(RoleSelector$1, { prefixName }),
      /* @__PURE__ */ jsx(PermissionSelector, { prefixName })
    ] }),
    /* @__PURE__ */ jsx(TargetSelect, { prefixName })
  ] });
}
function IconDialogTrigger({
  prefixName,
  ...buttonProps
}) {
  const { watch, setValue } = useFormContext();
  const fieldName = prefixName("icon");
  const watchedItemIcon = watch(fieldName);
  const Icon = watchedItemIcon && createSvgIconFromTree(watchedItemIcon);
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (iconTree) => {
        if (iconTree || iconTree === null) {
          setValue(fieldName, iconTree, {
            shouldDirty: true
          });
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            className: "text-muted icon-sm",
            variant: "outline",
            size: "md",
            ...buttonProps,
            children: Icon ? /* @__PURE__ */ jsx(Icon, {}) : /* @__PURE__ */ jsx(EditIcon, {})
          }
        ),
        /* @__PURE__ */ jsx(IconPickerDialog, {})
      ]
    }
  );
}
function DestinationSelector({ prefixName }) {
  const form = useFormContext();
  const currentType = form.watch(prefixName("type"));
  const previousType = usePrevious(currentType);
  const { data } = useValueLists(["menuItemCategories"]);
  const categories = (data == null ? void 0 : data.menuItemCategories) || [];
  const selectedCategory = categories.find((c) => c.type === currentType);
  const { trans } = useTrans();
  const routeItems = useAvailableRoutes();
  useEffect(() => {
    if (previousType && previousType !== currentType) {
      form.setValue(prefixName("action"), "");
    }
  }, [currentType, previousType, form, prefixName]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        className: "mb-20",
        name: prefixName("type"),
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Type" }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: "link", children: /* @__PURE__ */ jsx(Trans, { message: "Custom link" }) }),
          /* @__PURE__ */ jsx(Item, { value: "route", children: /* @__PURE__ */ jsx(Trans, { message: "Site page" }) }),
          categories.map((category) => /* @__PURE__ */ jsx(Item, { value: category.type, children: category.name }, category.type))
        ]
      }
    ),
    currentType === "link" && /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mb-20",
        required: true,
        type: "url",
        name: prefixName("action"),
        placeholder: trans({ message: "Enter a url..." }),
        label: /* @__PURE__ */ jsx(Trans, { message: "Url" })
      }
    ),
    currentType === "route" && /* @__PURE__ */ jsx(
      FormSelect,
      {
        className: "mb-20",
        required: true,
        items: routeItems,
        name: prefixName("action"),
        label: /* @__PURE__ */ jsx(Trans, { message: "Page" }),
        searchPlaceholder: trans(message("Search pages")),
        showSearchField: true,
        selectionMode: "single",
        children: (item) => /* @__PURE__ */ jsx(Item, { value: item.id, children: item.label }, item.id)
      }
    ),
    selectedCategory && /* @__PURE__ */ jsx(
      FormSelect,
      {
        className: "mb-20",
        required: true,
        items: selectedCategory.items,
        name: prefixName("action"),
        showSearchField: true,
        searchPlaceholder: trans(message("Search...")),
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: selectedCategory.name }),
        children: (item) => /* @__PURE__ */ jsx(Item, { value: item.action, children: /* @__PURE__ */ jsx(Trans, { message: item.label }) })
      }
    )
  ] });
}
function RoleSelector$1({ prefixName }) {
  const { data } = useValueLists(["roles", "permissions"]);
  const roles = (data == null ? void 0 : data.roles) || [];
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      className: "mb-20",
      placeholder: trans({ message: "Add role..." }),
      label: /* @__PURE__ */ jsx(Trans, { message: "Only show if user has role" }),
      name: prefixName("roles"),
      chipSize: "sm",
      suggestions: roles,
      valueKey: "id",
      displayWith: (c) => {
        var _a2;
        return (_a2 = roles.find((r) => r.id === c.id)) == null ? void 0 : _a2.name;
      },
      children: (role) => /* @__PURE__ */ jsx(Item, { value: role.id, capitalizeFirst: true, children: /* @__PURE__ */ jsx(Trans, { message: role.name }) }, role.id)
    }
  );
}
function PermissionSelector({ prefixName }) {
  const { data } = useValueLists(["roles", "permissions"]);
  const { trans } = useTrans();
  const groupedPermissions = useMemo(() => {
    return buildPermissionList((data == null ? void 0 : data.permissions) || [], [], false);
  }, [data == null ? void 0 : data.permissions]);
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      label: /* @__PURE__ */ jsx(Trans, { message: "Only show if user has permissions" }),
      placeholder: trans({ message: "Add permission..." }),
      chipSize: "sm",
      suggestions: groupedPermissions,
      name: prefixName("permissions"),
      valueKey: "name",
      children: ({ groupName, items }) => /* @__PURE__ */ jsx(Section, { label: prettyName(groupName), children: items.map((permission) => /* @__PURE__ */ jsx(
        Item,
        {
          value: permission.name,
          description: /* @__PURE__ */ jsx(Trans, { message: permission.description }),
          children: /* @__PURE__ */ jsx(Trans, { message: permission.display_name || permission.name })
        },
        permission.name
      )) }, groupName)
    }
  );
}
function TargetSelect({ prefixName }) {
  return /* @__PURE__ */ jsxs(
    FormSelect,
    {
      className: "mt-20",
      selectionMode: "single",
      name: prefixName("target"),
      label: /* @__PURE__ */ jsx(Trans, { message: "Open link in" }),
      children: [
        /* @__PURE__ */ jsx(Item, { value: "_self", children: /* @__PURE__ */ jsx(Trans, { message: "Same window" }) }),
        /* @__PURE__ */ jsx(Item, { value: "_blank", children: /* @__PURE__ */ jsx(Trans, { message: "New window" }) })
      ]
    }
  );
}
function MenuItemEditor() {
  const { menuIndex, menuItemIndex } = useParams();
  const navigate = useNavigate$1();
  const { getValues } = useFormContext();
  const formPath = `settings.menus.${menuIndex}.items.${menuItemIndex}`;
  const item = getValues(formPath);
  useEffect(() => {
    if (!item)
      ;
    else {
      appearanceState().preview.setHighlight(
        `[data-menu-item-id="${item.id}"]`
      );
    }
  }, [navigate, item]);
  if (!item || menuItemIndex == null) {
    return null;
  }
  return /* @__PURE__ */ jsx(MenuItemEditorSection, { formPath });
}
function MenuItemEditorSection({ formPath }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(MenuItemForm, { formPathPrefix: formPath }),
    /* @__PURE__ */ jsx("div", { className: "text-right mt-40", children: /* @__PURE__ */ jsx(DeleteItemTrigger, {}) })
  ] });
}
function DeleteItemTrigger() {
  const navigate = useNavigate$1();
  const { menuIndex, menuItemIndex } = useParams();
  const { fields, remove } = useFieldArray({
    name: `settings.menus.${+menuIndex}.items`
  });
  if (!menuItemIndex)
    return null;
  const item = fields[+menuItemIndex];
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          if (menuItemIndex) {
            remove(+menuItemIndex);
            navigate(`/admin/appearance/menus/${menuIndex}`);
          }
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            color: "danger",
            size: "xs",
            startIcon: /* @__PURE__ */ jsx(DeleteIcon, {}),
            children: /* @__PURE__ */ jsx(Trans, { message: "Delete this item" })
          }
        ),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete menu item" }),
            body: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Are you sure you want to delete “:name“?",
                values: { name: item.label }
              }
            ),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ]
    }
  );
}
function GeneralSection() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      BrandingImageSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Favicon" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "This will generate different size favicons. Image should be at least 512x512 in size." }),
        type: "favicon"
      }
    ),
    /* @__PURE__ */ jsx(
      BrandingImageSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Light logo" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Will be used on dark backgrounds." }),
        type: "logo_light"
      }
    ),
    /* @__PURE__ */ jsx(
      BrandingImageSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Dark logo" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Will be used on light backgrounds. Will default to light logo if left empty." }),
        type: "logo_dark"
      }
    ),
    /* @__PURE__ */ jsx(
      BrandingImageSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Mobile light logo" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Will be used on light backgrounds on mobile. Will default to desktop logo if left empty." }),
        type: "logo_light_mobile"
      }
    ),
    /* @__PURE__ */ jsx(
      BrandingImageSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Mobile dark logo" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Will be used on dark backgrounds on mobile. Will default to desktop if left empty." }),
        type: "logo_dark_mobile"
      }
    ),
    /* @__PURE__ */ jsx(SiteNameTextField, {}),
    /* @__PURE__ */ jsx(SiteDescriptionTextArea, {})
  ] });
}
function BrandingImageSelector({ label, description, type }) {
  const defaultValue = useAppearanceStore(
    (s) => {
      var _a2;
      return (_a2 = s.defaults) == null ? void 0 : _a2.settings.branding[type];
    }
  );
  return /* @__PURE__ */ jsx(
    FormImageSelector,
    {
      name: `settings.branding.${type}`,
      className: "border-b pb-30 mb-30",
      label,
      description,
      diskPrefix: "branding_media",
      defaultValue,
      onChange: () => {
        appearanceState().preview.setHighlight('[data-logo="navbar"]');
      }
    }
  );
}
function SiteNameTextField() {
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      name: "appearance.env.app_name",
      required: true,
      className: "mt-20",
      label: /* @__PURE__ */ jsx(Trans, { message: "Site name" })
    }
  );
}
function SiteDescriptionTextArea() {
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      name: "settings.branding.site_description",
      className: "mt-20",
      inputElementType: "textarea",
      rows: 4,
      label: /* @__PURE__ */ jsx(Trans, { message: "Site description" })
    }
  );
}
function randomNumber(min = 1, max = 1e4) {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  const number = randomBuffer[0] / (4294967295 + 1);
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(number * (max - min + 1)) + min;
}
function ThemeList() {
  const { trans } = useTrans();
  const navigate = useNavigate();
  const {
    data: { themes }
  } = useBootstrapData();
  const { fields, append } = useFieldArray({
    name: "appearance.themes.all",
    keyName: "key"
  });
  useEffect(() => {
    if (themes.selectedThemeId) {
      appearanceState().preview.setActiveTheme(themes.selectedThemeId);
    }
  }, [themes.selectedThemeId]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-20", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "xs",
        variant: "outline",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        onClick: () => {
          var _a2;
          const lightThemeColors = (_a2 = appearanceState().defaults) == null ? void 0 : _a2.appearance.themes.light;
          append({
            id: randomNumber(),
            name: trans(message("New theme")),
            values: lightThemeColors
          });
          navigate(`${fields.length + 1}`);
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "New theme" })
      }
    ) }),
    fields.map((field, index) => /* @__PURE__ */ jsx(AppearanceButton, { to: `${index}`, elementType: NavLink, children: field.name }, field.key))
  ] });
}
const AceEditor = React.lazy(() => import("./ace-editor-56a88974.mjs"));
function AceDialog({
  defaultValue,
  mode = "html",
  title,
  onSave,
  isSaving,
  footerStartAction,
  beautify,
  editorRef
}) {
  const [value, setValue] = useState(defaultValue);
  const [isValid, setIsValid] = useState(true);
  return /* @__PURE__ */ jsxs(Dialog, { size: "fullscreen", className: "h-full w-full", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: title }),
    /* @__PURE__ */ jsx(DialogBody, { className: "relative flex-auto", padding: "p-0", children: /* @__PURE__ */ jsx(
      Suspense,
      {
        fallback: /* @__PURE__ */ jsx("div", { className: "flex h-400 w-full items-center justify-center", children: /* @__PURE__ */ jsx(
          ProgressCircle,
          {
            "aria-label": "Loading editor...",
            isIndeterminate: true,
            size: "md"
          }
        ) }),
        children: /* @__PURE__ */ jsx(
          AceEditor,
          {
            beautify,
            mode,
            onChange: (newValue) => setValue(newValue),
            defaultValue: value || "",
            onIsValidChange: setIsValid,
            editorRef
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx(
      Footer,
      {
        disabled: !isValid || isSaving,
        value,
        onSave,
        startAction: footerStartAction
      }
    )
  ] });
}
function Footer({ disabled, value, onSave, startAction }) {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsxs(DialogFooter, { dividerTop: true, startAction, children: [
    /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        disabled,
        variant: "flat",
        color: "primary",
        onClick: () => {
          if (onSave) {
            onSave(value);
          } else {
            close(value);
          }
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
      }
    )
  ] });
}
function useSeoTags(name) {
  return useQuery({
    queryKey: ["admin", "seo-tags", name],
    queryFn: () => fetchTags(name)
  });
}
function fetchTags(name) {
  return apiClient.get(`admin/appearance/seo-tags/${name}`).then((response) => response.data);
}
function useUpdateSeoTags(name) {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: (payload) => updateTags(name, payload.tags),
    onSuccess: async () => {
      await queryClient2.invalidateQueries({
        queryKey: ["admin", "seo-tags", name]
      });
      toast(message("Updated SEO tags"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function updateTags(name, tags) {
  return apiClient.put(`admin/appearance/seo-tags/${name}`, { tags }).then((r) => r.data);
}
const pages = ((_a = mergedAppearanceConfig.sections["seo-settings"].config) == null ? void 0 : _a.pages) || [];
const names = pages.map((page) => page.key);
function SeoSection() {
  const { isLoading } = useSeoTags(names);
  if (isLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, {});
  }
  return /* @__PURE__ */ jsx(Fragment, { children: pages.map((page) => /* @__PURE__ */ jsx(TagEditorTrigger, { label: page.label, name: page.key }, page.key)) });
}
function TagEditorTrigger({ label, name }) {
  const { data, isLoading } = useSeoTags(names);
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(AppearanceButton, { disabled: isLoading, children: /* @__PURE__ */ jsx(Trans, { ...label }) }),
    data ? /* @__PURE__ */ jsx(TagsEditorDialog, { name, value: data[name] }) : null
  ] });
}
function TagsEditorDialog({ name, value }) {
  const { close } = useDialogContext();
  const updateTags2 = useUpdateSeoTags(name);
  const editorRef = useRef(null);
  const resetButton = /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      color: "primary",
      onClick: () => {
        if (editorRef.current) {
          editorRef.current.editor.setValue(value.original);
        }
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Reset to original" })
    }
  );
  return /* @__PURE__ */ jsx(
    AceDialog,
    {
      mode: "php_laravel_blade",
      title: /* @__PURE__ */ jsx(Trans, { message: "Edit SEO meta tags" }),
      footerStartAction: resetButton,
      editorRef,
      defaultValue: value.custom || value.original,
      isSaving: updateTags2.isPending,
      beautify: false,
      onSave: (newValue) => {
        if (newValue != null) {
          updateTags2.mutate(
            { tags: newValue },
            {
              onSuccess: () => close()
            }
          );
        }
      }
    }
  );
}
function CustomCodeSection() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(CustomCodeDialogTrigger, { mode: "css" }),
    /* @__PURE__ */ jsx(CustomCodeDialogTrigger, { mode: "html" })
  ] });
}
function CustomCodeDialogTrigger({ mode }) {
  const { getValues } = useFormContext();
  const { setValue } = useFormContext();
  const title = mode === "html" ? /* @__PURE__ */ jsx(Trans, { message: "Custom HTML & JavaScript" }) : /* @__PURE__ */ jsx(Trans, { message: "Custom CSS" });
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (newValue) => {
        if (newValue != null) {
          setValue(`appearance.custom_code.${mode}`, newValue, {
            shouldDirty: true
          });
          appearanceState().preview.setCustomCode(mode, newValue);
        }
      },
      children: [
        /* @__PURE__ */ jsx(AppearanceButton, { children: title }),
        /* @__PURE__ */ jsx(
          AceDialog,
          {
            title,
            defaultValue: getValues(`appearance.custom_code.${mode}`) || "",
            mode
          }
        )
      ]
    }
  );
}
const articlesSvg = "/assets/articles-8bfd9f17.svg";
const CustomPageDatatableFilters = (config) => {
  const dynamicFilters = config.customPages.types.length > 1 ? [
    {
      control: {
        type: FilterControlType.Select,
        defaultValue: "default",
        options: config.customPages.types.map((type) => ({
          value: type.type,
          label: type.label,
          key: type.type
        }))
      },
      key: "type",
      label: message("Type"),
      description: message("Type of the page"),
      defaultOperator: FilterOperator.eq
    }
  ] : [];
  return [
    {
      key: "user_id",
      label: message("User"),
      description: message("User page was created by"),
      defaultOperator: FilterOperator.eq,
      control: {
        type: FilterControlType.SelectModel,
        model: USER_MODEL
      }
    },
    ...dynamicFilters,
    createdAtFilter({
      description: message("Date page was created")
    }),
    updatedAtFilter({
      description: message("Date page was last updated")
    })
  ];
};
const CustomPageDatatableColumns = [
  {
    key: "slug",
    allowsSorting: true,
    width: "flex-2 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Slug" }),
    body: (page) => /* @__PURE__ */ jsx(Link, { target: "_blank", to: `/pages/${page.slug}`, className: LinkStyle, children: page.slug })
  },
  {
    key: "user_id",
    allowsSorting: true,
    width: "flex-2 min-w-140",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Owner" }),
    body: (page) => page.user && /* @__PURE__ */ jsx(
      NameWithAvatar,
      {
        image: page.user.avatar,
        label: page.user.display_name,
        description: page.user.email
      }
    )
  },
  {
    key: "type",
    maxWidth: "max-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Type" }),
    body: (page) => /* @__PURE__ */ jsx(Trans, { message: page.type })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (page) => /* @__PURE__ */ jsx(FormattedDate, { date: page.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-84 flex-shrink-0",
    visibleInMode: "all",
    body: (page) => /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className: "text-muted",
        elementType: Link,
        to: `${page.id}/edit`,
        children: /* @__PURE__ */ jsx(EditIcon, {})
      }
    )
  }
];
function CustomPageDatablePage() {
  const config = useContext(SiteConfigContext);
  const filters = useMemo(() => {
    return CustomPageDatatableFilters(config);
  }, [config]);
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "custom-pages",
      title: /* @__PURE__ */ jsx(Trans, { message: "Custom pages" }),
      filters,
      columns: CustomPageDatatableColumns,
      queryParams: { with: "user" },
      actions: /* @__PURE__ */ jsx(Actions$a, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: articlesSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No pages have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching pages" })
        }
      )
    }
  );
}
function Actions$a() {
  return /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "new", children: /* @__PURE__ */ jsx(Trans, { message: "New page" }) });
}
const AppSettingsNavConfig = [
  { label: message("Search"), to: "search" },
  { label: message("Incoming email"), to: "incoming-email" },
  { label: message("Help center"), to: "hc" },
  { label: message("Envato"), to: "envato" }
];
const filteredSettingsNavConfig = [
  { label: message("General"), to: "general" },
  ...AppSettingsNavConfig,
  getBootstrapData().settings.billing.integrated && {
    label: message("Subscriptions"),
    to: "subscriptions"
  },
  { label: message("Localization"), to: "localization" },
  {
    label: message("Authentication"),
    to: "authentication"
  },
  { label: message("Uploading"), to: "uploading" },
  { label: message("Outgoing email"), to: "outgoing-email" },
  { label: message("Cache"), to: "cache" },
  { label: message("Analytics"), to: "analytics" },
  { label: message("Logging"), to: "logging" },
  { label: message("Queue"), to: "queue" },
  { label: message("Recaptcha"), to: "recaptcha" },
  { label: message("GDPR"), to: "gdpr" },
  {
    label: message("Menus"),
    to: "/admin/appearance/menus"
  },
  {
    label: message("Seo"),
    to: "/admin/appearance/seo-settings"
  },
  {
    label: message("Themes"),
    to: "/admin/appearance/themes"
  }
].filter(Boolean);
const SettingsNavConfig = filteredSettingsNavConfig;
function SettingsLayout({ className }) {
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        className,
        "container mx-auto min-h-full items-start gap-30 p-24 md:flex"
      ),
      children: [
        /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Settings" }) }),
        isMobile ? /* @__PURE__ */ jsx(MobileNav, {}) : /* @__PURE__ */ jsx(DesktopNav, {}),
        /* @__PURE__ */ jsx("div", { className: "relative max-w-500 flex-auto md:px-30", children: /* @__PURE__ */ jsx(Outlet, {}) })
      ]
    }
  );
}
function MobileNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const value = pathname.split("/").pop();
  return /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      minWidth: "min-w-none",
      className: "mb-24 w-full bg",
      selectionMode: "single",
      selectedValue: value,
      onSelectionChange: (newPage) => {
        navigate(newPage);
      },
      children: SettingsNavConfig.map((item) => /* @__PURE__ */ jsx(Item, { value: item.to, children: /* @__PURE__ */ jsx(Trans, { ...item.label }) }, item.to))
    }
  );
}
function DesktopNav() {
  return /* @__PURE__ */ jsx("div", { className: "sticky top-24 w-240 flex-shrink-0", children: SettingsNavConfig.map((item) => /* @__PURE__ */ jsx(
    NavLink,
    {
      to: item.to,
      className: ({ isActive }) => clsx(
        "mb-8 block whitespace-nowrap rounded-button p-14 text-sm transition-bg-color",
        isActive ? "bg-primary/6 font-semibold text-primary" : "hover:bg-hover"
      ),
      children: /* @__PURE__ */ jsx(Trans, { ...item.label })
    },
    item.to
  )) });
}
function useAdminSettings() {
  return useQuery({
    queryKey: ["fetchAdminSettings"],
    queryFn: () => fetchAdminSettings(),
    // prevent automatic re-fetching so diffing with previous settings work properly
    staleTime: Infinity
  });
}
function fetchAdminSettings() {
  return apiClient.get("settings").then((response) => response.data);
}
function GenerateSitemap() {
  return apiClient.post("sitemap/generate").then((r) => r.data);
}
function useGenerateSitemap() {
  return useMutation({
    mutationFn: () => GenerateSitemap(),
    onSuccess: () => {
      toast(message("Sitemap generated"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function useUpdateAdminSettings(form) {
  const { data: original } = useAdminSettings();
  return useMutation({
    mutationFn: (props) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      if ((_b = (_a2 = props.client) == null ? void 0 : _a2.cookie_notice) == null ? void 0 : _b.button) {
        props.client.cookie_notice.button = JSON.stringify(
          props.client.cookie_notice.button
        );
      }
      if ((_d = (_c = props.client) == null ? void 0 : _c.registration) == null ? void 0 : _d.policies) {
        props.client.registration.policies = JSON.stringify(
          props.client.registration.policies
        );
      }
      if ((_f = (_e = props.client) == null ? void 0 : _e.artistPage) == null ? void 0 : _f.tabs) {
        props.client.artistPage.tabs = JSON.stringify(
          props.client.artistPage.tabs
        );
      }
      if ((_h = (_g = props.client) == null ? void 0 : _g.title_page) == null ? void 0 : _h.sections) {
        props.client.title_page.sections = JSON.stringify(
          props.client.title_page.sections
        );
      }
      if ((_i = props.client) == null ? void 0 : _i.incoming_email) {
        props.client.incoming_email = JSON.stringify(
          props.client.incoming_email
        );
      }
      if ((_k = (_j = props.client) == null ? void 0 : _j.publish) == null ? void 0 : _k.default_credentials) {
        props.client.publish.default_credentials = JSON.stringify(
          props.client.publish.default_credentials
        );
      }
      const client = props.client ? diff(original.client, props.client) : null;
      const server = props.server ? diff(original.server, props.server) : null;
      return updateAdminSettings({
        client,
        server,
        files: props.files
      });
    },
    onSuccess: () => {
      toast(message("Settings updated"), {
        position: "bottom-right"
      });
      queryClient.invalidateQueries({ queryKey: ["fetchAdminSettings"] });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function updateAdminSettings({
  client,
  server,
  files
}) {
  const formData = new FormData();
  if (client) {
    formData.set("client", JSON.stringify(dot.dot(client)));
  }
  if (server) {
    formData.set("server", JSON.stringify(dot.dot(server)));
  }
  Object.entries(files || {}).forEach(([key, file]) => {
    formData.set(key, file);
  });
  return apiClient.post("settings", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then((r) => r.data);
}
function SettingsPanel({
  title,
  description,
  children,
  transformValues
}) {
  const { data } = useAdminSettings();
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-40", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-xl", children: title }),
      /* @__PURE__ */ jsx("div", { className: "text-sm text-muted", children: description })
    ] }),
    data ? /* @__PURE__ */ jsx(FormWrapper, { defaultValues: data, transformValues, children }) : /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, "aria-label": "Loading settings..." })
  ] });
}
function FormWrapper({
  children,
  defaultValues,
  transformValues
}) {
  const form = useForm({ defaultValues });
  const updateSettings = useUpdateAdminSettings(form);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        onBeforeSubmit: () => {
          const errors = form.formState.errors;
          const keys = Object.keys(errors).filter((key) => {
            return key.endsWith("_group");
          });
          form.clearErrors(keys);
        },
        onSubmit: (value) => {
          value = transformValues ? transformValues(value) : value;
          updateSettings.mutate(value);
        },
        children: [
          children,
          /* @__PURE__ */ jsx("div", { className: "mt-40", children: /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              variant: "flat",
              color: "primary",
              disabled: updateSettings.isPending,
              children: /* @__PURE__ */ jsx(Trans, { message: "Update" })
            }
          ) })
        ]
      }
    ),
    updateSettings.isPending && /* @__PURE__ */ jsx(
      ProgressBar,
      {
        size: "xs",
        className: "absolute -bottom-14 left-30 w-full",
        isIndeterminate: true,
        "aria-label": "Saving settings..."
      }
    )
  ] });
}
function SettingsSeparator() {
  return /* @__PURE__ */ jsx("div", { className: "h-1 bg-divider my-30" });
}
function LearnMoreLink({ link, className }) {
  const { site } = useSettings();
  if (site.hide_docs_button) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center gap-8", className), children: [
    /* @__PURE__ */ jsx(LinkIcon, { size: "sm" }),
    /* @__PURE__ */ jsx(ExternalLink, { href: link, children: /* @__PURE__ */ jsx(Trans, { message: "Learn more" }) })
  ] });
}
function GeneralSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "General" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure site url, homepage, theme and other general settings." }),
      children: [
        /* @__PURE__ */ jsx(SiteUrlSection, {}),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(HomepageSection, {}),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(ThemeSection, {}),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(SitemapSection, {})
      ]
    }
  );
}
function SiteUrlSection() {
  const { data } = useAdminSettings();
  if (!data)
    return null;
  let append = null;
  const server = data.server;
  const isInvalid = server.newAppUrl && server.newAppUrl !== server.app_url;
  if (isInvalid) {
    append = /* @__PURE__ */ jsx("div", { className: "mt-20 text-sm text-danger", children: /* @__PURE__ */ jsx(
      Trans,
      {
        values: {
          baseUrl: server.app_url,
          currentUrl: server.newAppUrl,
          b: (chunks) => /* @__PURE__ */ jsx("b", { children: chunks })
        },
        message: "Base site url is set as <b>:baseUrl</b> in configuration, but current url is <b>:currentUrl</b>. It is recommended to set the primary url you want to use in configuration file and then redirect all other url versions to this primary version via cpanel or .htaccess file."
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: !!isInvalid,
        name: "server.app_url",
        label: /* @__PURE__ */ jsx(Trans, { message: "Primary site url" }),
        description: /* @__PURE__ */ jsx(LearnMoreLink, { link: "https://support.vebto.com/help-center/articles/35/primary-site-url" })
      }
    ),
    append
  ] });
}
function HomepageSection() {
  var _a2, _b;
  const { watch } = useFormContext();
  const { homepage } = useContext(SiteConfigContext);
  const { data } = useValueLists(["menuItemCategories"]);
  const selectedType = watch("client.homepage.type");
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        name: "client.homepage.type",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Site home page" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Which page should be used as site homepage." }),
        children: [
          homepage.options.map((option) => /* @__PURE__ */ jsx(Item, { value: option.value, children: /* @__PURE__ */ jsx(Trans, { ...option.label }) }, option.value)),
          (_a2 = data == null ? void 0 : data.menuItemCategories) == null ? void 0 : _a2.map((category) => /* @__PURE__ */ jsx(Item, { value: category.type, children: category.name }, category.type))
        ]
      }
    ),
    (_b = data == null ? void 0 : data.menuItemCategories) == null ? void 0 : _b.map((category) => {
      return selectedType === category.type ? /* @__PURE__ */ jsx(
        FormSelect,
        {
          className: "mt-24",
          name: "client.homepage.value",
          selectionMode: "single",
          label: /* @__PURE__ */ jsx(Trans, { message: "Homepage :name", values: { name: category.name } }),
          children: category.items.map((item) => /* @__PURE__ */ jsx(Item, { value: item.model_id, children: item.label }, item.label))
        },
        category.name
      ) : null;
    })
  ] });
}
function ThemeSection() {
  const {
    data: { themes }
  } = useBootstrapData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        className: "mb-20",
        name: "client.themes.default_id",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Default site theme" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Which theme to use for users that have not chosen a theme manually." }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: 0, children: /* @__PURE__ */ jsx(Trans, { message: "System" }) }),
          themes.all.map((theme) => /* @__PURE__ */ jsx(Item, { value: theme.id, children: theme.name }, theme.id))
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "client.themes.user_change",
        description: /* @__PURE__ */ jsx(Trans, { message: "Allow users to manually change site theme." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Allow theme change" })
      }
    )
  ] });
}
function SitemapSection() {
  const generateSitemap = useGenerateSitemap();
  const { base_url } = useSettings();
  const url = `${base_url}/storage/sitemaps/sitemap-index.xml`;
  const link = /* @__PURE__ */ jsx(ExternalLink, { href: url, children: url });
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        size: "xs",
        color: "primary",
        disabled: generateSitemap.isPending,
        onClick: () => {
          generateSitemap.mutate();
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Generate sitemap" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-14 text-sm text-muted", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Once generated, sitemap url will be: :url",
        values: {
          url: link
        }
      }
    ) })
  ] });
}
const ColorIcon = createSvgIcon(
  /* @__PURE__ */ jsx(
    "path",
    {
      stroke: "#E0E0E0",
      d: "M24,44c-7.168,0-13-5.816-13-12.971C11,24,24,4,24,4s13,20,13,27.029C37,38.184,31.168,44,24,44z"
    }
  )
);
function colorToThemeValue(color) {
  return parseColor(color).toString("rgb").replace("rgb(", "").replace(")", "").replace(/, ?/g, " ");
}
const TuneIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" }),
  "TuneOutlined"
);
function ThemeSettingsDialogTrigger() {
  const { getValues, setValue } = useFormContext();
  const { themeIndex } = useParams();
  const theme = getValues(`appearance.themes.all.${+themeIndex}`);
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (value) => {
        if (!value)
          return;
        getValues("appearance.themes.all").forEach((currentTheme, index) => {
          if (currentTheme.id === value.id) {
            setValue(`appearance.themes.all.${index}`, value, {
              shouldDirty: true
            });
            return;
          }
          if (value.default_light) {
            setValue(
              `appearance.themes.all.${index}`,
              { ...currentTheme, default_light: false },
              { shouldDirty: true }
            );
            return;
          }
          if (value.default_dark) {
            setValue(
              `appearance.themes.all.${index}`,
              { ...currentTheme, default_dark: false },
              { shouldDirty: true }
            );
            return;
          }
        });
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "xs",
            variant: "outline",
            color: "primary",
            startIcon: /* @__PURE__ */ jsx(TuneIcon, {}),
            children: /* @__PURE__ */ jsx(Trans, { message: "Settings" })
          }
        ),
        /* @__PURE__ */ jsx(SettingsDialog, { theme })
      ]
    }
  );
}
function SettingsDialog({ theme }) {
  const form = useForm({ defaultValues: theme });
  const { close, formId } = useDialogContext();
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "default_light" && value.default_light) {
        form.setValue("default_dark", false);
      }
      if (name === "default_dark" && value.default_dark) {
        form.setValue("default_light", false);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update settings" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (values) => {
          close(values);
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "name",
              label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
              className: "mb-30",
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormSwitch,
            {
              name: "is_dark",
              className: "mb-20 pb-20 border-b",
              description: /* @__PURE__ */ jsx(Trans, { message: "Whether this theme has light text on dark background." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Dark theme" })
            }
          ),
          /* @__PURE__ */ jsx(
            FormSwitch,
            {
              name: "default_light",
              className: "mb-30",
              description: /* @__PURE__ */ jsx(Trans, { message: "When light mode is selected, this theme will be used." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Default for light mode" })
            }
          ),
          /* @__PURE__ */ jsx(
            FormSwitch,
            {
              name: "default_dark",
              description: /* @__PURE__ */ jsx(Trans, { message: "When dark mode is selected, this theme will be used." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Default for dark mode" })
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
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
          type: "submit",
          form: formId,
          disabled: !form.formState.isDirty,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const RestartAltIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M6 13c0-1.65.67-3.15 1.76-4.24L6.34 7.34C4.9 8.79 4 10.79 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91zm14 0c0-4.42-3.58-8-8-8-.06 0-.12.01-.18.01l1.09-1.09L11.5 2.5 8 6l3.5 3.5 1.41-1.41-1.08-1.08c.06 0 .12-.01.17-.01 3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93z" }),
  "RestartAltOutlined"
);
function ThemeMoreOptionsButton() {
  const navigate = useNavigate$1();
  const { themeIndex } = useParams();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { setValue, getValues } = useFormContext();
  const { fields, remove } = useFieldArray({
    name: "appearance.themes.all"
  });
  const deleteTheme = () => {
    if (fields.length <= 1) {
      toast.danger(message("At least one theme is required"));
      return;
    }
    if (themeIndex) {
      navigate("/admin/appearance/themes");
      remove(+themeIndex);
      setValue("appearance.themes.selectedThemeId", null);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      MenuTrigger,
      {
        onItemSelected: (key) => {
          if (key === "delete") {
            setConfirmDialogOpen(true);
          } else if (key === "reset") {
            const path = `appearance.themes.all.${+themeIndex}`;
            const defaultColors = getValues(`${path}.is_dark`) ? appearanceState().defaults.appearance.themes.dark : appearanceState().defaults.appearance.themes.light;
            Object.entries(defaultColors).forEach(([colorName, themeValue]) => {
              appearanceState().preview.setThemeValue(colorName, themeValue);
            });
            appearanceState().preview.setThemeFont(null);
            setValue(`${path}.values`, defaultColors, {
              shouldDirty: true
            });
            setValue(`${path}.font`, void 0, {
              shouldDirty: true
            });
          }
        },
        children: [
          /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(MoreVertIcon, {}) }),
          /* @__PURE__ */ jsxs(Menu, { children: [
            /* @__PURE__ */ jsx(Item, { value: "reset", startIcon: /* @__PURE__ */ jsx(RestartAltIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Reset colors" }) }),
            /* @__PURE__ */ jsx(Item, { value: "delete", startIcon: /* @__PURE__ */ jsx(DeleteIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Delete" }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: confirmDialogOpen,
        onClose: (isConfirmed) => {
          if (isConfirmed) {
            deleteTheme();
          }
          setConfirmDialogOpen(false);
        },
        children: /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete theme" }),
            body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this theme?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      }
    )
  ] });
}
function ColorSwatch({ onChange, value, colors }) {
  const presetButtons = colors.map((color) => {
    const isSelected = value === color;
    return /* @__PURE__ */ jsx(
      ButtonBase,
      {
        onClick: () => {
          onChange == null ? void 0 : onChange(color);
        },
        className: clsx(
          "relative block flex-shrink-0 w-26 h-26 border rounded",
          isSelected && "shadow-md"
        ),
        style: { backgroundColor: color },
        children: isSelected && /* @__PURE__ */ jsx("span", { className: "absolute inset-0 m-auto rounded-full w-8 h-8 bg-white" })
      },
      color
    );
  });
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-6", children: presetButtons });
}
const ColorPresets = [
  {
    color: "rgb(255, 255, 255)",
    name: message("White")
  },
  {
    color: "rgb(239,245,245)",
    name: message("Solitude")
  },
  {
    color: "rgb(245,213,174)",
    name: message("Wheat")
  },
  {
    color: "rgb(253,227,167)",
    name: message("Cape Honey")
  },
  {
    color: "rgb(242,222,186)",
    name: message("Milk punch")
  },
  {
    color: "rgb(97,118,75)",
    name: message("Dingy"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(4, 147, 114)",
    name: message("Aquamarine"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(222,245,229)",
    name: message("Cosmic Latte")
  },
  {
    color: "rgb(233,119,119)",
    name: message("Geraldine"),
    foreground: "rgb(90,14,14)"
  },
  {
    color: "rgb(247,164,164)",
    name: message("Sundown")
  },
  {
    color: "rgb(30,139,195)",
    name: message("Pelorous"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(142,68,173)",
    name: message("Deep Lilac"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(108,74,182)",
    name: message("Blue marguerite"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(139,126,116)",
    name: message("Americano"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(0,0,0)",
    name: message("Black"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(64,66,88)",
    name: message("Blue zodiac"),
    foreground: "rgb(255, 255, 255)"
  },
  {
    color: "rgb(101,100,124)",
    name: message("Comet"),
    foreground: "rgb(255, 255, 255)"
  }
];
const DefaultPresets = ColorPresets.map(({ color }) => color).slice(0, 14);
function ColorPicker({
  defaultValue,
  onChange,
  colorPresets,
  showInput
}) {
  const [color, setColor] = useState(defaultValue);
  const presets = colorPresets || DefaultPresets;
  const style = getInputFieldClassNames({ size: "sm" });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      HexColorPicker,
      {
        className: "!w-auto",
        color,
        onChange: (newColor) => {
          onChange == null ? void 0 : onChange(newColor);
          setColor(newColor);
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "py-20 px-12", children: [
      presets && /* @__PURE__ */ jsx(
        ColorSwatch,
        {
          colors: presets,
          onChange: (newColor) => {
            if (newColor) {
              const hex = parseColor(newColor).toString("hex");
              onChange == null ? void 0 : onChange(hex);
              setColor(hex);
            }
          },
          value: color
        }
      ),
      showInput && /* @__PURE__ */ jsx("div", { className: "pt-20", children: /* @__PURE__ */ jsx(
        HexColorInput,
        {
          autoComplete: "off",
          role: "textbox",
          autoCorrect: "off",
          spellCheck: "false",
          required: true,
          "aria-label": "Hex color",
          prefixed: true,
          className: style.input,
          color,
          onChange: (newColor) => {
            onChange == null ? void 0 : onChange(newColor);
            setColor(newColor);
          }
        }
      ) })
    ] })
  ] });
}
function ColorPickerDialog({
  hideFooter = false,
  showInput = true
}) {
  const { close, value, setValue, initialValue } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { size: "2xs", children: [
    /* @__PURE__ */ jsx(
      ColorPicker,
      {
        showInput,
        defaultValue: initialValue ? initialValue : "",
        onChange: (newValue) => setValue(newValue)
      }
    ),
    !hideFooter && /* @__PURE__ */ jsxs(DialogFooter, { dividerTop: true, children: [
      /* @__PURE__ */ jsx(Button, { variant: "text", size: "xs", onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          size: "xs",
          onClick: () => close(value),
          children: /* @__PURE__ */ jsx(Trans, { message: "Apply" })
        }
      )
    ] })
  ] });
}
const navbarColorMap = [
  {
    label: message("Accent"),
    value: "primary",
    bgColor: "bg-primary",
    previewBgColor: "text-primary"
  },
  {
    label: message("Background"),
    value: "bg",
    bgColor: "bg-background",
    previewBgColor: "text-background"
  },
  {
    label: message("Background alt"),
    value: "bg-alt",
    bgColor: "bg-alt",
    previewBgColor: "text-background-alt"
  },
  {
    label: message("Transparent"),
    value: "transparent",
    bgColor: "bg-transparent",
    previewBgColor: "text-transparent"
  }
];
function NavbarColorPicker() {
  var _a2;
  const { themeIndex } = useParams();
  const { watch, setValue } = useFormContext();
  const key = `appearance.themes.all.${themeIndex}.values.--be-navbar-color`;
  const selectedValue = watch(key);
  const previewColor = (_a2 = navbarColorMap.find(({ value }) => value === selectedValue)) == null ? void 0 : _a2.previewBgColor;
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      placement: "right",
      selectionMode: "single",
      selectedValue,
      onSelectionChange: (value) => {
        setValue(key, value, { shouldDirty: true });
      },
      children: [
        /* @__PURE__ */ jsx(
          AppearanceButton,
          {
            startIcon: /* @__PURE__ */ jsx(
              ColorIcon,
              {
                viewBox: "0 0 48 48",
                className: clsx("icon-lg", previewColor)
              }
            ),
            children: /* @__PURE__ */ jsx(Trans, { message: "Navbar" })
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: navbarColorMap.map(({ label, value, bgColor }) => /* @__PURE__ */ jsx(
          Item,
          {
            value,
            startIcon: /* @__PURE__ */ jsx("div", { className: clsx("h-20 w-20 rounded border", bgColor) }),
            children: /* @__PURE__ */ jsx(Trans, { ...label })
          },
          value
        )) })
      ]
    }
  );
}
function themeValueToHex(value) {
  try {
    return parseColor(`rgb(${value.split(" ").join(",")})`).toString("hex");
  } catch (e) {
    return value;
  }
}
const colorList = [
  {
    label: message("Background"),
    key: "--be-background"
  },
  {
    label: message("Background alt"),
    key: "--be-background-alt"
  },
  {
    label: message("Foreground"),
    key: "--be-foreground-base"
  },
  {
    label: message("Accent light"),
    key: "--be-primary-light"
  },
  {
    label: message("Accent"),
    key: "--be-primary"
  },
  {
    label: message("Accent dark"),
    key: "--be-primary-dark"
  },
  {
    label: message("Text on accent"),
    key: "--be-on-primary"
  },
  {
    label: message("Chip"),
    key: "--be-background-chip"
  }
];
function ThemeEditor() {
  const navigate = useNavigate();
  const { themeIndex } = useParams();
  const { getValues, watch } = useFormContext();
  const theme = getValues(`appearance.themes.all.${+themeIndex}`);
  const selectedFont = watch(
    `appearance.themes.all.${+themeIndex}.font.family`
  );
  useEffect(() => {
    if (!theme) {
      navigate("/admin/appearance/themes");
    }
  }, [navigate, theme]);
  useEffect(() => {
    if (theme == null ? void 0 : theme.id) {
      appearanceState().preview.setActiveTheme(theme.id);
    }
  }, [theme == null ? void 0 : theme.id]);
  if (!theme)
    return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-20 flex items-center justify-between gap-10", children: [
      /* @__PURE__ */ jsx(ThemeSettingsDialogTrigger, {}),
      /* @__PURE__ */ jsx(ThemeMoreOptionsButton, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        AppearanceButton,
        {
          elementType: Link,
          to: "font",
          description: selectedFont ? selectedFont : /* @__PURE__ */ jsx(Trans, { message: "System" }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Font" })
        }
      ),
      /* @__PURE__ */ jsx(AppearanceButton, { elementType: Link, to: "radius", children: /* @__PURE__ */ jsx(Trans, { message: "Rounding" }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-6 mt-22 text-sm font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Colors" }) }),
      /* @__PURE__ */ jsx(NavbarColorPicker, {}),
      colorList.map((color) => /* @__PURE__ */ jsx(
        ColorPickerTrigger,
        {
          colorName: color.key,
          label: /* @__PURE__ */ jsx(Trans, { ...color.label }),
          initialThemeValue: theme.values[color.key],
          theme
        },
        color.key
      ))
    ] })
  ] });
}
function ColorPickerTrigger({
  label,
  theme,
  colorName,
  initialThemeValue
}) {
  const { setValue } = useFormContext();
  const { themeIndex } = useParams();
  const [selectedThemeValue, setSelectedThemeValue] = useState(initialThemeValue);
  const selectThemeValue = (themeValue) => {
    setSelectedThemeValue(themeValue);
    appearanceState().preview.setThemeValue(colorName, themeValue);
  };
  useEffect(() => {
    setSelectedThemeValue(initialThemeValue);
  }, [initialThemeValue]);
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      value: themeValueToHex(selectedThemeValue),
      type: "popover",
      placement: "right",
      offset: 10,
      onValueChange: (newColor) => {
        selectThemeValue(colorToThemeValue(newColor));
      },
      onClose: (newColor, { valueChanged, initialValue }) => {
        if (newColor && valueChanged) {
          setValue(
            `appearance.themes.all.${+themeIndex}.values.${colorName}`,
            colorToThemeValue(newColor),
            { shouldDirty: true }
          );
          setValue("appearance.themes.selectedThemeId", theme.id);
        } else {
          selectThemeValue(initialValue);
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          AppearanceButton,
          {
            className: "capitalize",
            startIcon: /* @__PURE__ */ jsx(
              ColorIcon,
              {
                viewBox: "0 0 48 48",
                className: "icon-lg",
                style: { fill: `rgb(${selectedThemeValue})` }
              }
            ),
            children: label
          }
        ),
        /* @__PURE__ */ jsx(ColorPickerDialog, {})
      ]
    }
  );
}
function SettingsErrorGroup({
  children,
  name,
  separatorBottom = true,
  separatorTop = true
}) {
  const {
    formState: { errors }
  } = useFormContext();
  const ref = useRef(null);
  const error = errors[name];
  useEffect(() => {
    var _a2;
    if (error) {
      (_a2 = ref.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
    }
  }, [error]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        separatorBottom && "border-b mb-20 pb-20",
        separatorTop && "border-t mt-20 pt-20",
        error && "border-y-error"
      ),
      ref,
      children: [
        children(!!error),
        error && /* @__PURE__ */ jsx(
          "div",
          {
            className: "text-danger text-sm mt-20",
            dangerouslySetInnerHTML: { __html: error.message }
          }
        )
      ]
    }
  );
}
function useSearchModels() {
  return useQuery({
    queryKey: ["search-models"],
    queryFn: () => fetchModels()
  });
}
function fetchModels() {
  return apiClient.get("admin/search/models").then((response) => response.data);
}
function useImportSearchModels() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => importModels(payload),
    onSuccess: () => {
      toast(trans(message("Imported search models")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function importModels(payload) {
  return apiClient.post("admin/search/import", payload).then((r) => r.data);
}
function SearchSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Search" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure search method used on the site as well as related 3rd party integrations." }),
      children: [
        /* @__PURE__ */ jsx(SearchMethodSelect, {}),
        /* @__PURE__ */ jsx(ImportRecordsPanel, {})
      ]
    }
  );
}
function SearchMethodSelect() {
  const { watch } = useFormContext();
  const selectedMethod = watch("server.scout_driver");
  return /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "search_group", separatorBottom: false, children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        invalid: isInvalid,
        name: "server.scout_driver",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Search method" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Which method should be used for search related functionality across the site." }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: "mysql", children: "Mysql" }),
          /* @__PURE__ */ jsx(Item, { value: "meilisearch", children: "Meilisearch" }),
          /* @__PURE__ */ jsx(Item, { value: "tntsearch", children: "TNTSearch" }),
          /* @__PURE__ */ jsx(Item, { value: "Matchish\\ScoutElasticSearch\\Engines\\ElasticSearchEngine", children: "Elasticsearch" }),
          /* @__PURE__ */ jsx(Item, { value: "algolia", children: "Algolia" })
        ]
      }
    ),
    selectedMethod === "mysql" && /* @__PURE__ */ jsx(MysqlFields, {}),
    selectedMethod === "meilisearch" && /* @__PURE__ */ jsx(MeilisearchFields, {}),
    selectedMethod === "algolia" && /* @__PURE__ */ jsx(AlgoliaFields, {}),
    selectedMethod === "Matchish\\ScoutElasticSearch\\Engines\\ElasticSearchEngine" && /* @__PURE__ */ jsx(ElasticsearchField, {})
  ] }) });
}
function MysqlFields() {
  const { clearErrors } = useFormContext();
  return /* @__PURE__ */ jsxs(
    FormSelect,
    {
      className: "mt-24",
      name: "server.scout_mysql_mode",
      selectionMode: "single",
      label: /* @__PURE__ */ jsx(Trans, { message: "MySQL mode" }),
      onSelectionChange: () => {
        clearErrors();
      },
      children: [
        /* @__PURE__ */ jsx(Item, { value: "basic", children: /* @__PURE__ */ jsx(Trans, { message: "Basic" }) }),
        /* @__PURE__ */ jsx(Item, { value: "extended", children: /* @__PURE__ */ jsx(Trans, { message: "Extended" }) }),
        /* @__PURE__ */ jsx(Item, { value: "fulltext", children: /* @__PURE__ */ jsx(Trans, { message: "Fulltext" }) })
      ]
    }
  );
}
function MeilisearchFields() {
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      className: "mt-24",
      color: "warning",
      title: /* @__PURE__ */ jsx(Trans, { message: "Important!" }),
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "<a>Meilisearch</a> needs to be installed and running for this method to work.",
          values: {
            a: (parts) => /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.meilisearch.com",
                target: "_blank",
                rel: "noreferrer",
                children: parts
              }
            )
          }
        }
      )
    }
  );
}
function ElasticsearchField() {
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      className: "mt-24",
      color: "warning",
      title: /* @__PURE__ */ jsx(Trans, { message: "Important!" }),
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "<a>Elasticsearch</a> needs to be installed and running for this method to work.",
          values: {
            a: (parts) => /* @__PURE__ */ jsx("a", { href: "https://www.elastic.co", target: "_blank", rel: "noreferrer", children: parts })
          }
        }
      )
    }
  );
}
function AlgoliaFields() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mt-24",
        name: "server.algolia_app_id",
        label: /* @__PURE__ */ jsx(Trans, { message: "Algolia app ID" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mt-24",
        name: "server.algolia_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "Algolia app secret" }),
        required: true
      }
    )
  ] });
}
function ImportRecordsPanel() {
  const { getValues } = useFormContext();
  const { data } = useSearchModels();
  const importModels2 = useImportSearchModels();
  const [selectedModel, setSelectedModel] = useState("*");
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      className: "mt-34",
      color: "neutral",
      title: /* @__PURE__ */ jsx(Trans, { message: "Import records" }),
      description: /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx(Trans, { message: "Whenever a new search method is enabled, records that already exist in database need to be imported into the index. All records created after search method is enabled will be imported automatically." }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(Trans, { message: "Depending on number of records in database, importing could take some time. Don't close this window while it is in progress." })
      ] }),
      actions: /* @__PURE__ */ jsxs("div", { className: "mt-10 border-t pt-14", children: [
        /* @__PURE__ */ jsxs(
          SelectForwardRef,
          {
            selectionMode: "single",
            label: /* @__PURE__ */ jsx(Trans, { message: "What to import?" }),
            selectedValue: selectedModel,
            onSelectionChange: (newValue) => {
              setSelectedModel(newValue);
            },
            children: [
              /* @__PURE__ */ jsx(Item, { value: "*", children: /* @__PURE__ */ jsx(Trans, { message: "Everything" }) }),
              data == null ? void 0 : data.models.map((item) => /* @__PURE__ */ jsx(Item, { value: item.model, children: /* @__PURE__ */ jsx(Trans, { message: item.name }) }, item.model))
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            className: "mb-8 mt-24",
            disabled: importModels2.isPending,
            onClick: () => {
              importModels2.mutate({
                model: selectedModel,
                driver: getValues("server.scout_driver")
              });
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Import now" })
          }
        )
      ] })
    }
  );
}
function useImportEnvatoItems() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: () => importItems(),
    onSuccess: () => {
      toast(trans(message("Envato items imported")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function importItems() {
  return apiClient.post("envato/items/import").then((r) => r.data);
}
function EnvatoSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Envato" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Manage envato integration related configuration or disable it completely." }),
      children: [
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.envato.enable",
            className: "mb-24",
            description: /* @__PURE__ */ jsx(Trans, { message: "Enable envato integration (social login, purchase code validation, sales reports and more)." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Envato integration" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.envato.require_purchase_code",
            className: "mb-24",
            description: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Require users to enter a valid purchase code in order to register and submit support requests.\n      Envato social login will also check for purchase code automatically when this is enabled."
              }
            ),
            children: /* @__PURE__ */ jsx(Trans, { message: "Envato purchase code" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.envato.active_support",
            className: "mb-24",
            description: /* @__PURE__ */ jsx(Trans, { message: "Require users to have active support for item on envato in order to be able to create tickets." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Envato active support" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.envato.filter_search",
            className: "mb-24",
            description: /* @__PURE__ */ jsx(Trans, { message: "Users will only be able to find articles for items that they have purchased." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Filter help center search" })
          }
        ),
        /* @__PURE__ */ jsx(ImportItemsPanel, {})
      ]
    }
  );
}
function ImportItemsPanel() {
  const importItems2 = useImportEnvatoItems();
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      className: "mt-34",
      color: "neutral",
      title: /* @__PURE__ */ jsx(Trans, { message: "Import envato items" }),
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "This will automatically import all your envato items for use as categories in new ticket and\n      ticket list pages."
        }
      ),
      actions: /* @__PURE__ */ jsx("div", { className: "mt-10 border-t pt-14", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          disabled: importItems2.isPending,
          size: "xs",
          onClick: () => {
            importItems2.mutate();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Import now" })
        }
      ) })
    }
  );
}
function useImportHcDataFromZip() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => importData(payload),
    onSuccess: () => {
      toast(trans(message("Help center data imported")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function importData(payload) {
  const formData = new FormData();
  formData.append("file", payload.file.native);
  return apiClient.post("hc/actions/import", formData).then((r) => r.data);
}
const StyleIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "m2.53 19.65 1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zm-9.2 3.8L7.87 7.79l7.35-3.04h.01l4.95 11.95-7.35 3.05z" }, "0"), /* @__PURE__ */ jsx("circle", { cx: "11", cy: "9", r: "1" }, "1"), /* @__PURE__ */ jsx("path", { d: "M5.88 19.75c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z" }, "2")],
  "StyleOutlined"
);
function HcSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Help center" }),
      description: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Trans, { message: "Configure help center settings and import/export help center data." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-14 flex items-center gap-8", children: [
          /* @__PURE__ */ jsx(StyleIcon, { size: "sm", className: "text-primary" }),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/admin/appearance/landing-page",
              className: LinkStyle,
              target: "_blank",
              children: /* @__PURE__ */ jsx(Trans, { message: "Edit help center appearance" })
            }
          )
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsxs(
          FormSelect,
          {
            label: /* @__PURE__ */ jsx(Trans, { message: "Default article order" }),
            name: "client.articles.default_order",
            className: "mb-24",
            selectionMode: "single",
            description: /* @__PURE__ */ jsx(Trans, { message: "In what way should help center articles be ordered by default." }),
            children: [
              /* @__PURE__ */ jsx(Item, { value: "position|desc", children: /* @__PURE__ */ jsx(Trans, { message: "Position" }) }),
              /* @__PURE__ */ jsx(Item, { value: "views|desc", children: /* @__PURE__ */ jsx(Trans, { message: "Most viewed first" }) }),
              /* @__PURE__ */ jsx(Item, { value: "was_helpful|desc", children: /* @__PURE__ */ jsx(Trans, { message: "Most helpful first" }) }),
              /* @__PURE__ */ jsx(Item, { value: "created_at|desc", children: /* @__PURE__ */ jsx(Trans, { message: "Newest first" }) }),
              /* @__PURE__ */ jsx(Item, { value: "title|asc", children: /* @__PURE__ */ jsx(Trans, { message: "A to Z" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.article.hide_new_ticket_link",
            className: "mb-24",
            description: /* @__PURE__ */ jsx(
              Trans,
              {
                message: `Whether "Submit a Request" link on article pages should be hidden.`
              }
            ),
            children: /* @__PURE__ */ jsx(Trans, { message: "Hide new ticket link" })
          }
        ),
        /* @__PURE__ */ jsxs(
          FormSelect,
          {
            label: /* @__PURE__ */ jsx(Trans, { message: "Default after reply action" }),
            name: "client.replies.after_reply_action",
            selectionMode: "single",
            children: [
              /* @__PURE__ */ jsx(Item, { value: "stay_on_page", children: /* @__PURE__ */ jsx(Trans, { message: "Stay on page" }) }),
              /* @__PURE__ */ jsx(Item, { value: "next_active_ticket", children: /* @__PURE__ */ jsx(Trans, { message: "Open next active ticket" }) }),
              /* @__PURE__ */ jsx(Item, { value: "back_to_folder", children: /* @__PURE__ */ jsx(Trans, { message: "Go back to ticket list" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.mail.simplified_threading",
            className: "mt-24",
            description: /* @__PURE__ */ jsx(Trans, { message: "Removes full ticket thread from email respones, unless it's the initial agent response." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Simplified threading" })
          }
        ),
        /* @__PURE__ */ jsx(HcDataPanel, {})
      ]
    }
  );
}
function HcDataPanel() {
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      className: "mt-34",
      color: "neutral",
      title: /* @__PURE__ */ jsx(Trans, { message: "Help center data" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Import and export help center data (articles, categories, images, tags) in a .zip file for backup or migration." }),
      actions: /* @__PURE__ */ jsxs("div", { className: "mt-10 border-t pt-14", children: [
        /* @__PURE__ */ jsx(ImportButton, {}),
        /* @__PURE__ */ jsx(ExportButton, {})
      ] })
    }
  );
}
function ImportButton() {
  const importData2 = useImportHcDataFromZip();
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", size: "xs", className: "mr-10", children: /* @__PURE__ */ jsx(Trans, { message: "Import" }) }),
    ({ close }) => /* @__PURE__ */ jsx(
      ConfirmationDialog,
      {
        isDanger: true,
        title: /* @__PURE__ */ jsx(Trans, { message: "Import help center data" }),
        body: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to import help center data?" }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 font-bold", children: /* @__PURE__ */ jsx(Trans, { message: "This will erase all existing articles and categories." }) })
        ] }),
        confirm: /* @__PURE__ */ jsx(Trans, { message: "Import" }),
        isLoading: importData2.isPending,
        onConfirm: async () => {
          const files = await openUploadWindow({
            extensions: ["zip"]
          });
          importData2.mutate({ file: files[0] }, { onSuccess: () => close() });
        }
      }
    )
  ] });
}
function ExportButton() {
  const { base_url } = useSettings();
  const exportData = (format) => {
    const url = `${base_url}/api/v1/hc/actions/export?format=${format}`;
    downloadFileFromUrl(url, "hc-export.json");
  };
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      onItemSelected: (value) => {
        exportData(value);
      },
      children: [
        /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", size: "xs", children: /* @__PURE__ */ jsx(Trans, { message: "Export" }) }),
        /* @__PURE__ */ jsxs(Menu, { children: [
          /* @__PURE__ */ jsx(Item, { value: "html", children: /* @__PURE__ */ jsx(Trans, { message: "HTML (Offline docs)" }) }),
          /* @__PURE__ */ jsx(Item, { value: "json", children: /* @__PURE__ */ jsx(Trans, { message: "JSON" }) })
        ] })
      ]
    }
  );
}
function CrupdateImapConnectionDialog({ connection }) {
  const form = useForm({
    defaultValues: connection ? connection : {
      id: nanoid(6).toLowerCase(),
      createTickets: true,
      createReplies: true
    }
  });
  const { formId, close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: connection ? /* @__PURE__ */ jsx(Trans, { message: "Edit connection" }) : /* @__PURE__ */ jsx(Trans, { message: "New connection" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(Form$1, { form, id: formId, onSubmit: (values) => close(values), children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          autoFocus: true,
          required: true,
          name: "name",
          label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
          className: "mb-14"
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          required: true,
          name: "host",
          placeholder: "imap.gmail.com",
          label: /* @__PURE__ */ jsx(Trans, { message: "Host" }),
          className: "mb-14"
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          required: true,
          name: "username",
          placeholder: "username@gmail.com",
          type: "email",
          label: /* @__PURE__ */ jsx(Trans, { message: "Username" }),
          className: "mb-14"
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          required: true,
          type: "password",
          name: "password",
          label: /* @__PURE__ */ jsx(Trans, { message: "Password" }),
          className: "mb-14"
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "port",
          type: "number",
          label: /* @__PURE__ */ jsx(Trans, { message: "Port" }),
          placeholder: "993",
          className: "mb-14"
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "folder",
          label: /* @__PURE__ */ jsx(Trans, { message: "Folder" }),
          className: "mb-14",
          description: /* @__PURE__ */ jsx(Trans, { message: "From which folder emails should be imported. Leave empty to import all emails in the inbox." })
        }
      ),
      /* @__PURE__ */ jsx(
        FormSwitch,
        {
          name: "createTickets",
          className: "mb-14 mt-28",
          description: /* @__PURE__ */ jsx(Trans, { message: "Create new tickets from emails received via this connection." }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Create new tickets" })
        }
      ),
      /* @__PURE__ */ jsx(
        FormSwitch,
        {
          name: "createReplies",
          description: /* @__PURE__ */ jsx(Trans, { message: "If email is in reply to existing ticket, create a new reply." }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Create replies" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", form: formId, variant: "flat", color: "primary", children: /* @__PURE__ */ jsx(Trans, { message: "Save" }) })
    ] })
  ] });
}
const GmailIcon = createSvgIcon(
  [
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#4caf50",
        d: "M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
      },
      "0"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#1e88e5",
        d: "M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
      },
      "1"
    ),
    /* @__PURE__ */ jsx(
      "polygon",
      {
        fill: "#e53935",
        points: "35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
      },
      "2"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#c62828",
        d: "M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
      },
      "3"
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#fbc02d",
        d: "M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
      },
      "4"
    )
  ],
  "Gmail",
  "0 0 48 48"
);
function ConnectGmailPanel() {
  const { watch, setValue } = useFormContext();
  const { connectSocial } = useSocialLogin();
  const connectedEmail = watch("server.connectedGmailAccount");
  const handleGmailConnect = async () => {
    const e = await connectSocial("secure/settings/mail/gmail/connect");
    if ((e == null ? void 0 : e.status) === "SUCCESS") {
      const email = e.callbackData.profile.email;
      setValue("server.connectedGmailAccount", email);
      toast(message("Connected gmail account: :email", { values: { email } }));
    }
  };
  const connectButton = /* @__PURE__ */ jsx(
    Button,
    {
      variant: "outline",
      color: "primary",
      startIcon: /* @__PURE__ */ jsx(GmailIcon, {}),
      onClick: () => {
        handleGmailConnect();
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Connect gmail account" })
    }
  );
  const reconnectPanel = /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-14 rounded border bg-alt px-14 py-6 text-sm", children: [
    /* @__PURE__ */ jsx(GmailIcon, { size: "lg" }),
    connectedEmail,
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "text",
        color: "primary",
        className: "ml-auto",
        onClick: () => {
          handleGmailConnect();
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Reconnect" })
      }
    )
  ] });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Gmail account" }) }),
    connectedEmail ? reconnectPanel : connectButton
  ] });
}
function AuthenticationSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Authentication" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure registration, social login and related 3rd party integrations." }),
      children: [
        /* @__PURE__ */ jsx(EmailConfirmationSection, {}),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-24",
            name: "client.registration.disable",
            description: /* @__PURE__ */ jsx(Trans, { message: "All registration related functionality (including social login) will be disabled." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Disable registration" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-24",
            name: "client.single_device_login",
            description: /* @__PURE__ */ jsx(Trans, { message: "Only allow one device to be logged into user account at the same time." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Single device login" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.social.compact_buttons",
            description: /* @__PURE__ */ jsx(Trans, { message: "Use compact design for social login buttons." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Compact buttons" })
          }
        ),
        /* @__PURE__ */ jsx(EnvatoSection, {}),
        /* @__PURE__ */ jsx(GoogleSection, {}),
        /* @__PURE__ */ jsx(FacebookSection, {}),
        /* @__PURE__ */ jsx(TwitterSection, {}),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            inputElementType: "textarea",
            rows: 3,
            className: "mt-24",
            name: "client.auth.domain_blacklist",
            label: /* @__PURE__ */ jsx(Trans, { message: "Domain blacklist" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Comma separated list of domains. Users will not be able to register or login using any email adress from specified domains." })
          }
        )
      ]
    }
  );
}
function MailNotSetupWarning() {
  const { watch } = useFormContext();
  const mailSetup = watch("server.mail_setup");
  if (mailSetup)
    return null;
  return /* @__PURE__ */ jsx("p", { className: "mt-10 rounded-panel border p-10 text-sm text-danger", children: /* @__PURE__ */ jsx(
    Trans,
    {
      message: "Outgoing mail method needs to be setup before enabling this setting. <a>Fix now</a>",
      values: {
        a: (text) => /* @__PURE__ */ jsx(
          Button,
          {
            elementType: Link,
            variant: "outline",
            size: "xs",
            display: "flex",
            className: "mt-10 max-w-max",
            to: "/admin/settings/outgoing-email",
            children: text
          }
        )
      }
    }
  ) });
}
function EmailConfirmationSection() {
  return /* @__PURE__ */ jsx(
    FormSwitch,
    {
      className: "mb-30",
      name: "client.require_email_confirmation",
      description: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Trans, { message: "Require newly registered users to validate their email address before being able to login." }),
        /* @__PURE__ */ jsx(MailNotSetupWarning, {})
      ] }),
      children: /* @__PURE__ */ jsx(Trans, { message: "Require email confirmation" })
    }
  );
}
function EnvatoSection() {
  var _a2;
  const { watch } = useFormContext();
  const settings = useSettings();
  const envatoLoginEnabled = watch("client.social.envato.enable");
  if (!((_a2 = settings.envato) == null ? void 0 : _a2.enable))
    return null;
  return /* @__PURE__ */ jsx(SettingsErrorGroup, { separatorBottom: false, name: "envato_group", children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        invalid: isInvalid,
        name: "client.social.envato.enable",
        description: /* @__PURE__ */ jsx(Trans, { message: "Enable logging into the site via envato." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Envato login" })
      }
    ),
    !!envatoLoginEnabled && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          className: "mt-30",
          name: "server.envato_id",
          label: /* @__PURE__ */ jsx(Trans, { message: "Envato ID" }),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          className: "mt-30",
          name: "server.envato_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "Envato secret" }),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          className: "mt-30",
          name: "server.envato_personal_token",
          label: /* @__PURE__ */ jsx(Trans, { message: "Envato personal token" }),
          required: true
        }
      )
    ] })
  ] }) });
}
function GoogleSection() {
  const { watch } = useFormContext();
  const googleLoginEnabled = watch("client.social.google.enable");
  return /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "google_group", children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        invalid: isInvalid,
        name: "client.social.google.enable",
        description: /* @__PURE__ */ jsx(Trans, { message: "Enable logging into the site via google." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Google login" })
      }
    ),
    !!googleLoginEnabled && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          className: "mt-30",
          name: "server.google_id",
          label: /* @__PURE__ */ jsx(Trans, { message: "Google client ID" }),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          className: "mt-30",
          name: "server.google_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "Google client secret" }),
          required: true
        }
      )
    ] })
  ] }) });
}
function FacebookSection() {
  const { watch } = useFormContext();
  const facebookLoginEnabled = watch("client.social.facebook.enable");
  return /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "facebook_group", separatorTop: false, children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        invalid: isInvalid,
        name: "client.social.facebook.enable",
        description: /* @__PURE__ */ jsx(Trans, { message: "Enable logging into the site via facebook." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Facebook login" })
      }
    ),
    !!facebookLoginEnabled && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          className: "mt-30",
          name: "server.facebook_id",
          label: /* @__PURE__ */ jsx(Trans, { message: "Facebook app ID" }),
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          invalid: isInvalid,
          className: "mt-30",
          name: "server.facebook_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "Facebook app secret" }),
          required: true
        }
      )
    ] })
  ] }) });
}
function TwitterSection() {
  const { watch } = useFormContext();
  const twitterLoginEnabled = watch("client.social.twitter.enable");
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      name: "twitter_group",
      separatorTop: false,
      separatorBottom: false,
      children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            invalid: isInvalid,
            name: "client.social.twitter.enable",
            description: /* @__PURE__ */ jsx(Trans, { message: "Enable logging into the site via twitter." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Twitter login" })
          }
        ),
        !!twitterLoginEnabled && /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              invalid: isInvalid,
              className: "mt-30",
              name: "server.twitter_id",
              label: /* @__PURE__ */ jsx(Trans, { message: "Twitter ID" }),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              invalid: isInvalid,
              className: "mt-30",
              name: "server.twitter_secret",
              label: /* @__PURE__ */ jsx(Trans, { message: "Twitter secret" }),
              required: true
            }
          )
        ] })
      ] })
    }
  );
}
const clearEmptyValues = (values) => {
  var _a2, _b;
  if ((_a2 = values.client) == null ? void 0 : _a2.incoming_email) {
    removeEmptyValuesFromObject(values.client.incoming_email, {
      copy: false,
      arrays: true,
      deep: true
    });
  }
  if (((_b = values.client) == null ? void 0 : _b.incoming_email) && Object.keys(values.client.incoming_email).length === 0) {
    delete values.client.incoming_email;
  }
  return values;
};
function IncomingEmailSettings() {
  const {
    branding: { site_name }
  } = useSettings();
  const [expandedValues, setExpandedValues] = useLocalStorage(
    "incoming-email-settings-expanded",
    [0, 1, 2]
  );
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Incoming email" }),
      transformValues: clearEmptyValues,
      description: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Configure different handlers for turning incoming emails into tickets and replies. You can enable multiple handlers at the same time.",
            values: { site: site_name }
          }
        ),
        /* @__PURE__ */ jsx(
          LearnMoreLink,
          {
            className: "mt-6 text-sm",
            link: "https://support.vebto.com/hc/articles/42/44/155/incoming-emails"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.tickets.create_from_emails",
            className: "mb-24",
            description: /* @__PURE__ */ jsx(Trans, { message: "If email can't be matched to existing ticket, create a new ticket from it." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "New ticket from emails" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.replies.create_from_emails",
            className: "mb-24",
            description: /* @__PURE__ */ jsx(Trans, { message: "If email can be matched to existing ticket, create a new reply for that ticket from the email." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Replies from emails" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.tickets.send_ticket_created_notification",
            className: "mb-24",
            description: /* @__PURE__ */ jsx(Trans, { message: "Send a notification to customer via email informing them that their ticket has been received." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Ticket received notification" })
          }
        ),
        /* @__PURE__ */ jsx(TicketRejectedNotification, {}),
        /* @__PURE__ */ jsx(SendRepliesSwitch, {}),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "server.openai_api_key",
            className: "mb-24",
            label: /* @__PURE__ */ jsx(Trans, { message: "OpenAI API key" }),
            labelSuffix: /* @__PURE__ */ jsx(
              InfoDialogTrigger,
              {
                body: /* @__PURE__ */ jsx(
                  Trans,
                  {
                    message: "OpenAI API key is used to extract only relevant content from raw email. It will remove previous emails quoted by clients like gmail or outlook as well as signatures added by iPhone and other devices. :br This can be done by BeDesk without the API key, but it will be more consistent when using AI.",
                    values: {
                      br: /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx("br", {}),
                        /* @__PURE__ */ jsx("br", {})
                      ] })
                    }
                  }
                )
              }
            ),
            labelSuffixPosition: "inline"
          }
        ),
        /* @__PURE__ */ jsxs(
          Accordion,
          {
            variant: "outline",
            mode: "multiple",
            expandedValues,
            onExpandedChange: (values) => setExpandedValues(values),
            children: [
              /* @__PURE__ */ jsx(AccordionItem, { label: /* @__PURE__ */ jsx(Trans, { message: "IMAP" }), children: /* @__PURE__ */ jsx(ImapPanel, {}) }),
              /* @__PURE__ */ jsx(AccordionItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Pipe" }), children: /* @__PURE__ */ jsx(PipePanel, {}) }),
              /* @__PURE__ */ jsx(AccordionItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Rest API" }), children: /* @__PURE__ */ jsx(ApiPanel, {}) }),
              /* @__PURE__ */ jsx(AccordionItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Gmail API" }), children: /* @__PURE__ */ jsx(GmailPanel, {}) }),
              /* @__PURE__ */ jsx(AccordionItem, { label: /* @__PURE__ */ jsx(Trans, { message: "Mailgun" }), children: /* @__PURE__ */ jsx(MailgunPanel, {}) })
            ]
          }
        )
      ]
    }
  );
}
function ApiPanel() {
  const {
    base_url,
    branding: { site_name }
  } = useSettings();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(FormSwitch, { name: "client.incoming_email.api.enabled", children: /* @__PURE__ */ jsx(Trans, { message: "Enabled" }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-10 text-xs text-muted", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Send emails to :siteName from a 3rd party application or a different website using REST API.",
        values: { siteName: site_name }
      }
    ) }),
    /* @__PURE__ */ jsx(
      LearnMoreLink,
      {
        className: "mt-12 text-sm",
        link: `${base_url}/api-docs#Tickets-incomingEmail`
      }
    )
  ] });
}
function MailgunPanel() {
  const {
    branding: { site_name }
  } = useSettings();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(FormSwitch, { name: "client.incoming_email.mailgun.enabled", children: /* @__PURE__ */ jsx(Trans, { message: "Enabled" }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-10 text-xs text-muted", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Send emails to :siteName using Mailgun inbound routes functionality.",
        values: { siteName: site_name }
      }
    ) }),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        size: "sm",
        className: "mt-20",
        name: "server.mailgun_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "Mailgun API key" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mt-14",
        name: "client.incoming_email.mailgun.verify",
        description: /* @__PURE__ */ jsx(Trans, { message: "Verify that incoming request is really from mailgun. It's highly recommended to have this on, unless you are not able to receive emails from mailgun otherwise." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Verify" })
      }
    ),
    /* @__PURE__ */ jsx(
      LearnMoreLink,
      {
        className: "mt-12 text-sm",
        link: "https://support.vebto.com/hc/articles/42/44/155/incoming-emails#mailgun"
      }
    )
  ] });
}
function GmailPanel() {
  const {
    branding: { site_name }
  } = useSettings();
  const { watch } = useFormContext();
  const isEnabled = watch("client.incoming_email.gmail.enabled");
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      name: "gmail_group",
      separatorBottom: false,
      separatorTop: false,
      children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.incoming_email.gmail.enabled",
            invalid: isInvalid,
            children: /* @__PURE__ */ jsx(Trans, { message: "Enabled" })
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-10 text-xs text-muted", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Connect your existing gmail acocunt using gmail API.",
            values: { siteName: site_name }
          }
        ) }),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            invalid: isInvalid,
            name: "client.incoming_email.gmail.topicName",
            minLength: 10,
            required: isEnabled,
            label: /* @__PURE__ */ jsx(Trans, { message: "Gmail topic name" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Google cloud Pub/Sub topic name." }),
            className: "my-20",
            size: "sm"
          }
        ),
        /* @__PURE__ */ jsx(ConnectGmailPanel, {})
      ] })
    }
  );
}
function PipePanel() {
  const {
    branding: { site_name }
  } = useSettings();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(FormSwitch, { name: "client.incoming_email.pipe.enabled", children: /* @__PURE__ */ jsx(Trans, { message: "Enabled" }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-10 text-xs text-muted", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Pipe emails to :siteName from cpanel or another control panel used by your hosting provider.",
        values: { siteName: site_name }
      }
    ) }),
    /* @__PURE__ */ jsx(
      LearnMoreLink,
      {
        className: "mt-12 text-sm",
        link: "https://support.vebto.com/hc/articles/42/44/155/incoming-emails#piping"
      }
    )
  ] });
}
function ImapPanel() {
  const {
    branding: { site_name }
  } = useSettings();
  const { fields, append, remove, update } = useFieldArray({
    name: "client.incoming_email.imap.connections",
    keyName: "key"
  });
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      name: "imap_group",
      separatorBottom: false,
      separatorTop: false,
      children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { className: "mb-10 text-xs text-muted", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Connect your existing email accounts to :siteName using IMAP.",
            values: { siteName: site_name }
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "mb-20 space-y-14", children: fields.map((field, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(
              "flex items-center",
              isInvalid && "text-danger"
            ),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "mr-auto", children: [
                /* @__PURE__ */ jsx("div", { children: field.name }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: field.username })
              ] }),
              /* @__PURE__ */ jsxs(
                DialogTrigger,
                {
                  type: "modal",
                  onClose: (updatedConnection) => {
                    if (updatedConnection) {
                      update(index, updatedConnection);
                    }
                  },
                  children: [
                    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Edit" }), children: /* @__PURE__ */ jsx(IconButton, { size: "sm", className: "text-muted", children: /* @__PURE__ */ jsx(SettingsIcon, {}) }) }),
                    /* @__PURE__ */ jsx(CrupdateImapConnectionDialog, { connection: field })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Delete" }), children: /* @__PURE__ */ jsx(
                IconButton,
                {
                  size: "sm",
                  className: "text-muted",
                  onClick: () => remove(index),
                  children: /* @__PURE__ */ jsx(DeleteIcon, {})
                }
              ) })
            ]
          },
          field.key
        )) }),
        /* @__PURE__ */ jsxs(
          DialogTrigger,
          {
            type: "modal",
            onClose: (connection) => {
              if (connection) {
                append(connection);
              }
            },
            children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  color: "primary",
                  startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
                  size: "xs",
                  children: /* @__PURE__ */ jsx(Trans, { message: "Add connection" })
                }
              ),
              /* @__PURE__ */ jsx(CrupdateImapConnectionDialog, {})
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          LearnMoreLink,
          {
            className: "mt-20 text-sm",
            link: "https://support.vebto.com/hc/articles/42/44/155/incoming-emails#imap"
          }
        )
      ] })
    }
  );
}
function TicketRejectedNotification() {
  const { watch } = useFormContext();
  if (watch("client.tickets.create_from_emails"))
    return null;
  return /* @__PURE__ */ jsx(
    FormSwitch,
    {
      name: "client.tickets.send_ticket_rejected_notification",
      className: "mb-24",
      description: /* @__PURE__ */ jsx(Trans, { message: "Send a notification to customer, if their ticket has not been created, because ticket creation via email is disabled." }),
      children: /* @__PURE__ */ jsx(Trans, { message: "Ticket rejected notification" })
    }
  );
}
function SendRepliesSwitch() {
  const { watch } = useFormContext();
  return /* @__PURE__ */ jsx(
    FormSwitch,
    {
      name: "client.replies.send_email",
      className: "mb-24",
      disabled: !watch("server.mail_setup"),
      description: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Trans, { message: "When agent replies to ticket, send email to customer who created the ticket." }),
        /* @__PURE__ */ jsx(MailNotSetupWarning, {})
      ] }),
      children: /* @__PURE__ */ jsx(Trans, { message: "Send replies via email" })
    }
  );
}
const AppSettingsRoutes = [
  {
    path: "search",
    element: /* @__PURE__ */ jsx(SearchSettings, {})
  },
  {
    path: "envato",
    element: /* @__PURE__ */ jsx(EnvatoSettings, {})
  },
  {
    path: "hc",
    element: /* @__PURE__ */ jsx(HcSettings, {})
  },
  {
    path: "incoming-email",
    element: /* @__PURE__ */ jsx(IncomingEmailSettings, {})
  }
];
function JsonChipField({ children, ...props }) {
  const {
    field: { onChange, onBlur, value = [], ref },
    fieldState: { invalid, error }
  } = useController({
    name: props.name
  });
  const arrayValue = useMemo(() => {
    const mixedValue = value;
    return typeof mixedValue === "string" ? JSON.parse(mixedValue) : mixedValue;
  }, [value]);
  const formProps = {
    onChange: (newValue) => {
      const jsonValue = JSON.stringify(newValue.map((chip) => chip.name));
      onChange(jsonValue);
    },
    onBlur,
    value: arrayValue,
    invalid,
    errorMessage: error == null ? void 0 : error.message
  };
  return /* @__PURE__ */ jsx(ChipField, { ref, ...mergeProps(formProps, props) });
}
function TabPanels({ children, className }) {
  const { selectedTab, isLazy } = useContext(TabContext);
  const panelArray = Children.toArray(children).filter((p) => !!p);
  let rendered;
  if (isLazy) {
    const el = panelArray[selectedTab];
    rendered = isValidElement(el) ? cloneElement(panelArray[selectedTab], {
      index: selectedTab
    }) : null;
  } else {
    rendered = panelArray.map((panel, index) => {
      if (isValidElement(panel)) {
        const isSelected = index === selectedTab;
        return cloneElement(panel, {
          index,
          "aria-hidden": !isSelected,
          className: !isSelected ? clsx(panel.props.className, "hidden") : panel.props.className
        });
      }
      return null;
    });
  }
  return /* @__PURE__ */ jsx("div", { className, children: rendered });
}
function TabPanel({
  className,
  children,
  index,
  ...domProps
}) {
  const { id } = useContext(TabContext);
  const [tabIndex, setTabIndex] = useState(0);
  const ref = useRef(null);
  useLayoutEffect$1(() => {
    if (ref == null ? void 0 : ref.current) {
      const update = () => {
        const walker = getFocusableTreeWalker(ref.current, { tabbable: true });
        setTabIndex(walker.nextNode() ? void 0 : 0);
      };
      update();
      const observer = new MutationObserver(update);
      observer.observe(ref.current, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["tabIndex", "disabled"]
      });
      return () => {
        observer.disconnect();
      };
    }
  }, [ref]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      tabIndex,
      ref,
      id: `${id}-${index}-tabpanel`,
      "aria-labelledby": `${id}-${index}-tab`,
      className: clsx(className, "focus-visible:outline-primary-light"),
      role: "tabpanel",
      ...domProps,
      children
    }
  );
}
function SubscriptionSettings() {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsx(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Subscriptions" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure gateway integration, accepted cards, invoices and other related settings." }),
      children: /* @__PURE__ */ jsxs(Tabs, { children: [
        /* @__PURE__ */ jsxs(TabList, { children: [
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "General" }) }),
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Invoices" }) })
        ] }),
        /* @__PURE__ */ jsxs(TabPanels, { className: "pt-30", children: [
          /* @__PURE__ */ jsxs(TabPanel, { children: [
            /* @__PURE__ */ jsx(
              FormSwitch,
              {
                name: "client.billing.enable",
                description: /* @__PURE__ */ jsx(Trans, { message: "Enable or disable all subscription related functionality across the site." }),
                children: /* @__PURE__ */ jsx(Trans, { message: "Enable subscriptions" })
              }
            ),
            /* @__PURE__ */ jsx(SettingsSeparator, {}),
            /* @__PURE__ */ jsx(PaypalSection, {}),
            /* @__PURE__ */ jsx(StripeSection, {}),
            /* @__PURE__ */ jsx(SettingsSeparator, {}),
            /* @__PURE__ */ jsx(
              JsonChipField,
              {
                label: /* @__PURE__ */ jsx(Trans, { message: "Accepted cards" }),
                name: "client.billing.accepted_cards",
                placeholder: trans({ message: "Add new card..." })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(TabPanel, { children: [
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                inputElementType: "textarea",
                rows: 5,
                label: /* @__PURE__ */ jsx(Trans, { message: "Invoice address" }),
                name: "client.billing.invoice.address",
                className: "mb-30"
              }
            ),
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                inputElementType: "textarea",
                rows: 5,
                label: /* @__PURE__ */ jsx(Trans, { message: "Invoice notes" }),
                description: /* @__PURE__ */ jsx(Trans, { message: "Default notes to show under `notes` section of user invoice. Optional." }),
                name: "client.billing.invoice.notes"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function PaypalSection() {
  const { watch } = useFormContext();
  const paypalIsEnabled = watch("client.billing.paypal.enable");
  return /* @__PURE__ */ jsxs("div", { className: "mb-30", children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "client.billing.paypal.enable",
        description: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Trans, { message: "Enable PayPal payment gateway integration." }),
          /* @__PURE__ */ jsx(
            LearnMoreLink,
            {
              className: "mt-6",
              link: "https://support.vebto.com/help-center/articles/147/configuring-paypal"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsx(Trans, { message: "PayPal gateway" })
      }
    ),
    paypalIsEnabled ? /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "paypal_group", children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "server.paypal_client_id",
          label: /* @__PURE__ */ jsx(Trans, { message: "PayPal Client ID" }),
          required: true,
          invalid: isInvalid,
          className: "mb-20"
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "server.paypal_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "PayPal Secret" }),
          required: true,
          invalid: isInvalid,
          className: "mb-20"
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "server.paypal_webhook_id",
          label: /* @__PURE__ */ jsx(Trans, { message: "PayPal Webhook ID" }),
          required: true,
          invalid: isInvalid,
          className: "mb-20"
        }
      ),
      /* @__PURE__ */ jsx(
        FormSwitch,
        {
          name: "client.billing.paypal_test_mode",
          invalid: isInvalid,
          description: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Trans, { message: "Allows testing PayPal payments with sandbox accounts." }) }),
          children: /* @__PURE__ */ jsx(Trans, { message: "PayPal test mode" })
        }
      )
    ] }) }) : null
  ] });
}
function StripeSection() {
  const { watch } = useFormContext();
  const stripeEnabled = watch("client.billing.stripe.enable");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "client.billing.stripe.enable",
        description: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Trans, { message: "Enable Stripe payment gateway integration." }),
          /* @__PURE__ */ jsx(
            LearnMoreLink,
            {
              className: "mt-6",
              link: "https://support.vebto.com/help-center/articles/148/configuring-stripe"
            }
          )
        ] }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Stripe gateway" })
      }
    ),
    stripeEnabled ? /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "stripe_group", separatorBottom: false, children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "server.stripe_key",
          label: /* @__PURE__ */ jsx(Trans, { message: "Stripe publishable key" }),
          required: true,
          className: "mb-20",
          invalid: isInvalid
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "server.stripe_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "Stripe secret key" }),
          required: true,
          className: "mb-20",
          invalid: isInvalid
        }
      ),
      /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "server.stripe_webhook_secret",
          label: /* @__PURE__ */ jsx(Trans, { message: "Stripe webhook signing secret" }),
          className: "mb-20",
          invalid: isInvalid
        }
      )
    ] }) }) : null
  ] });
}
function LocalizationSettings() {
  const { data } = useValueLists(["timezones", "localizations"]);
  const today = useCurrentDateTime();
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Localization" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure global date, time and language settings." }),
      children: [
        /* @__PURE__ */ jsxs(
          FormSelect,
          {
            className: "mb-30",
            required: true,
            name: "client.dates.default_timezone",
            showSearchField: true,
            selectionMode: "single",
            label: /* @__PURE__ */ jsx(Trans, { message: "Default timezone" }),
            searchPlaceholder: trans(message("Search timezones")),
            description: /* @__PURE__ */ jsx(Trans, { message: "Which timezone should be selected by default for new users and guests." }),
            children: [
              /* @__PURE__ */ jsx(Item, { value: "auto", children: /* @__PURE__ */ jsx(Trans, { message: "Auto" }) }, "auto"),
              Object.entries((data == null ? void 0 : data.timezones) || {}).map(([groupName, timezones]) => /* @__PURE__ */ jsx(Section, { label: groupName, children: timezones.map((timezone) => /* @__PURE__ */ jsx(Item, { value: timezone.value, children: timezone.text }, timezone.value)) }, groupName))
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          FormSelect,
          {
            name: "client.locale.default",
            className: "mb-30",
            selectionMode: "single",
            label: /* @__PURE__ */ jsx(Trans, { message: "Default language" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Which localization should be selected by default for new users and guests." }),
            children: [
              /* @__PURE__ */ jsx(Item, { value: "auto", children: /* @__PURE__ */ jsx(Trans, { message: "Auto" }) }, "auto"),
              ((data == null ? void 0 : data.localizations) || []).map((locale) => /* @__PURE__ */ jsx(Item, { value: locale.language, capitalizeFirst: true, children: locale.name }, locale.language))
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          FormRadioGroup,
          {
            required: true,
            className: "mb-30",
            size: "sm",
            name: "client.dates.format",
            orientation: "vertical",
            label: /* @__PURE__ */ jsx(Trans, { message: "Date verbosity" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Default verbosity for all dates displayed across the site. Month/day order and separators will be adjusted automatically, based on user's locale." }),
            children: [
              /* @__PURE__ */ jsx(FormRadio, { value: "auto", children: /* @__PURE__ */ jsx(Trans, { message: "Auto" }) }, "auto"),
              Object.entries(DateFormatPresets).map(([format, options]) => /* @__PURE__ */ jsx(FormRadio, { value: format, children: /* @__PURE__ */ jsx(FormattedDate, { date: today, options }) }, format))
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.i18n.enable",
            description: /* @__PURE__ */ jsx(Trans, { message: "If disabled, site will always be shown in default language and user will not be able to change their locale." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Enable translations" })
          }
        )
      ]
    }
  );
}
function fetchMaxServerUploadSize() {
  return apiClient.get("uploads/server-max-file-size").then((response) => response.data);
}
function useMaxServerUploadSize() {
  return useQuery({
    queryKey: ["MaxServerUploadSize"],
    queryFn: () => fetchMaxServerUploadSize()
  });
}
const spaceUnits = ["B", "KB", "MB", "GB", "TB", "PB"];
function convertToBytes(value, unit) {
  if (value == null)
    return 0;
  switch (unit) {
    case "KB":
      return value * 1024;
    case "MB":
      return value * 1024 ** 2;
    case "GB":
      return value * 1024 ** 3;
    case "TB":
      return value * 1024 ** 4;
    case "PB":
      return value * 1024 ** 5;
    default:
      return value;
  }
}
const MaxValue = 108851651149824;
const FormFileSizeField = React.forwardRef(({ name, ...props }, ref) => {
  const {
    field: {
      onChange: setByteValue,
      onBlur,
      value: byteValue = "",
      ref: inputRef
    },
    fieldState: { invalid, error }
  } = useController({
    name
  });
  const [liveValue, setLiveValue] = useState("");
  const [unit, setUnit] = useState("MB");
  useEffect(() => {
    if (byteValue == null || byteValue === "") {
      setLiveValue("");
      return;
    }
    const { amount, unit: newUnit } = fromBytes({
      bytes: Math.min(byteValue, MaxValue)
    });
    setUnit(newUnit || "MB");
    setLiveValue(Number.isNaN(amount) ? "" : amount);
  }, [byteValue, unit]);
  const formProps = {
    onChange: (e) => {
      const value = parseInt(e.target.value);
      if (Number.isNaN(value)) {
        setByteValue(value);
      } else {
        const newBytes = convertToBytes(
          parseInt(e.target.value),
          unit
        );
        setByteValue(newBytes);
      }
    },
    onBlur,
    value: liveValue,
    invalid,
    errorMessage: error == null ? void 0 : error.message,
    inputRef
  };
  const unitSelect = /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      minWidth: "min-w-80",
      selectionMode: "single",
      selectedValue: unit,
      disabled: !byteValue,
      onSelectionChange: (newUnit) => {
        const newBytes = convertToBytes(
          liveValue || 0,
          newUnit
        );
        setByteValue(newBytes);
      },
      children: spaceUnits.slice(0, 5).map((u) => /* @__PURE__ */ jsx(Item, { value: u, children: u === "B" ? "Bytes" : u }, u))
    }
  );
  return /* @__PURE__ */ jsx(
    TextField,
    {
      ...mergeProps(formProps, props),
      type: "number",
      ref,
      endAppend: unitSelect
    }
  );
});
const fromBytes = memoize(
  ({ bytes }) => {
    const pretty = prettyBytes(bytes);
    if (!pretty)
      return { amount: "", unit: "MB" };
    let amount = parseInt(pretty.split(" ")[0]);
    amount = Math.round(amount);
    return { amount, unit: pretty.split(" ")[1] };
  }
);
function useUploadS3Cors() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: () => uploadCors(),
    onSuccess: () => {
      toast(trans(message("CORS file updated")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function uploadCors() {
  return apiClient.post("s3/cors/upload").then((r) => r.data);
}
function useGenerateDropboxRefreshToken() {
  return useMutation({
    mutationFn: (props) => generateToken(props),
    onError: (err) => showHttpErrorToast(err)
  });
}
function generateToken(payload) {
  return apiClient.post("settings/uploading/dropbox-refresh-token", payload).then((r) => r.data);
}
function DropboxForm({ isInvalid }) {
  const { watch, setValue } = useFormContext();
  const appKey = watch("server.storage_dropbox_app_key");
  const appSecret = watch("server.storage_dropbox_app_secret");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-20",
        name: "server.storage_dropbox_app_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "Dropbox application key" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-20",
        name: "server.storage_dropbox_app_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "Dropbox application secret" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-20",
        name: "server.storage_dropbox_refresh_token",
        label: /* @__PURE__ */ jsx(Trans, { message: "Dropbox refresh token" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "modal",
        onClose: (refreshToken) => {
          if (refreshToken) {
            setValue("server.storage_dropbox_refresh_token", refreshToken);
          }
        },
        children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              color: "primary",
              size: "xs",
              disabled: !appKey || !appSecret,
              children: /* @__PURE__ */ jsx(Trans, { message: "Get dropbox refresh token" })
            }
          ),
          /* @__PURE__ */ jsx(DropboxRefreshTokenDialog, { appKey, appSecret })
        ]
      }
    )
  ] });
}
function DropboxRefreshTokenDialog({
  appKey,
  appSecret
}) {
  const form = useForm();
  const { formId, close } = useDialogContext();
  const generateRefreshToken = useGenerateDropboxRefreshToken();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Connected dropbox account" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        id: formId,
        form,
        onSubmit: (data) => {
          generateRefreshToken.mutate(
            {
              app_key: appKey,
              app_secret: appSecret,
              access_code: data.accessCode
            },
            {
              onSuccess: (response) => {
                close(response.refreshToken);
              }
            }
          );
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-20 pb-20 border-b", children: [
            /* @__PURE__ */ jsx("div", { className: "text-muted text-sm mb-10", children: /* @__PURE__ */ jsx(Trans, { message: "Click the 'get access code' button to get dropbox access code, then paste it into the field below." }) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                color: "primary",
                size: "xs",
                elementType: "a",
                target: "_blank",
                href: `https://www.dropbox.com/oauth2/authorize?client_id=${appKey}&token_access_type=offline&response_type=code`,
                children: /* @__PURE__ */ jsx(Trans, { message: "Get access code" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "accessCode",
              label: /* @__PURE__ */ jsx(Trans, { message: "Dropbox access code" }),
              required: true
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
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
          form: formId,
          type: "submit",
          disabled: !appKey || !appSecret || generateRefreshToken.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Connect" })
        }
      )
    ] })
  ] });
}
function UploadingSettings() {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Uploading" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure size and type of files that users are able to upload. This will affect all uploads across the site." }),
      children: [
        /* @__PURE__ */ jsx(PrivateUploadSection, {}),
        /* @__PURE__ */ jsx(PublicUploadSection, {}),
        /* @__PURE__ */ jsx(CredentialsSection, {}),
        /* @__PURE__ */ jsx(SettingsErrorGroup, { name: "static_delivery_group", children: (isInvalid) => /* @__PURE__ */ jsxs(
          FormRadioGroup,
          {
            invalid: isInvalid,
            size: "sm",
            name: "server.static_file_delivery",
            orientation: "vertical",
            label: /* @__PURE__ */ jsx(Trans, { message: "File delivery optimization" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Both X-Sendfile and X-Accel need to be enabled on the server first. When enabled, it will reduce server memory and CPU usage when previewing or downloading files, especially for large files." }),
            children: [
              /* @__PURE__ */ jsx(FormRadio, { value: "", children: /* @__PURE__ */ jsx(Trans, { message: "None" }) }),
              /* @__PURE__ */ jsx(FormRadio, { value: "xsendfile", children: /* @__PURE__ */ jsx(Trans, { message: "X-Sendfile (Apache)" }) }),
              /* @__PURE__ */ jsx(FormRadio, { value: "xaccel", children: /* @__PURE__ */ jsx(Trans, { message: "X-Accel (Nginx)" }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          FormFileSizeField,
          {
            className: "mb-30",
            name: "client.uploads.chunk_size",
            min: 1,
            label: /* @__PURE__ */ jsx(Trans, { message: "Chunk size" }),
            placeholder: "Infinity",
            description: /* @__PURE__ */ jsx(Trans, { message: "Size (in bytes) for each file chunk. It should only be changed if there is a maximum upload size on your server or proxy (for example cloudflare). If chunk size is larger then limit on the server, uploads will fail." })
          }
        ),
        /* @__PURE__ */ jsx(MaxUploadSizeSection, {}),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(
          FormFileSizeField,
          {
            min: 1,
            name: "client.uploads.max_size",
            className: "mb-30",
            label: /* @__PURE__ */ jsx(Trans, { message: "Maximum file size" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Maximum size (in bytes) for a single file user can upload." })
          }
        ),
        /* @__PURE__ */ jsx(
          FormFileSizeField,
          {
            min: 1,
            name: "client.uploads.available_space",
            className: "mb-30",
            label: /* @__PURE__ */ jsx(Trans, { message: "Available space" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Disk space (in bytes) each user uploads are allowed to take up. This can be overridden per user." })
          }
        ),
        /* @__PURE__ */ jsx(
          JsonChipField,
          {
            name: "client.uploads.allowed_extensions",
            className: "mb-30",
            label: /* @__PURE__ */ jsx(Trans, { message: "Allowed extensions" }),
            placeholder: trans(message("Add extension...")),
            description: /* @__PURE__ */ jsx(Trans, { message: "List of allowed file types (jpg, mp3, pdf etc.). Leave empty to allow all file types." })
          }
        ),
        /* @__PURE__ */ jsx(
          JsonChipField,
          {
            name: "client.uploads.blocked_extensions",
            label: /* @__PURE__ */ jsx(Trans, { message: "Blocked extensions" }),
            placeholder: trans(message("Add extension...")),
            description: /* @__PURE__ */ jsx(Trans, { message: "Prevent uploading of these file types, even if they are allowed above." })
          }
        )
      ]
    }
  );
}
function MaxUploadSizeSection() {
  const { data } = useMaxServerUploadSize();
  return /* @__PURE__ */ jsx(
    SectionHelper,
    {
      color: "warning",
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Maximum upload size on your server currently is set to <b>:size</b>",
          values: { size: data == null ? void 0 : data.maxSize, b: (chunks) => /* @__PURE__ */ jsx("b", { children: chunks }) }
        }
      )
    }
  );
}
function PrivateUploadSection() {
  const { watch, clearErrors } = useFormContext();
  const isEnabled = watch("server.uploads_disk_driver");
  if (!isEnabled)
    return null;
  return /* @__PURE__ */ jsxs(
    FormSelect,
    {
      className: "mb-30",
      selectionMode: "single",
      name: "server.uploads_disk_driver",
      label: /* @__PURE__ */ jsx(Trans, { message: "User Uploads Storage Method" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Where should user private file uploads be stored." }),
      onSelectionChange: () => {
        clearErrors();
      },
      children: [
        /* @__PURE__ */ jsx(Item, { value: "local", children: /* @__PURE__ */ jsx(Trans, { message: "Local Disk (Default)" }) }),
        /* @__PURE__ */ jsx(Item, { value: "ftp", children: "FTP" }),
        /* @__PURE__ */ jsx(Item, { value: "digitalocean_s3", children: "DigitalOcean Spaces" }),
        /* @__PURE__ */ jsx(Item, { value: "backblaze_s3", children: "Backblaze" }),
        /* @__PURE__ */ jsx(Item, { value: "s3", children: "Amazon S3 (Or compatible service)" }),
        /* @__PURE__ */ jsx(Item, { value: "dropbox", children: "Dropbox" }),
        /* @__PURE__ */ jsx(Item, { value: "rackspace", children: "Rackspace" })
      ]
    }
  );
}
function PublicUploadSection() {
  const { watch, clearErrors } = useFormContext();
  const isEnabled = watch("server.public_disk_driver");
  if (!isEnabled)
    return null;
  return /* @__PURE__ */ jsxs(
    FormSelect,
    {
      label: /* @__PURE__ */ jsx(Trans, { message: "Public Uploads Storage Method" }),
      selectionMode: "single",
      name: "server.public_disk_driver",
      description: /* @__PURE__ */ jsx(Trans, { message: "Where should user public uploads (like avatars) be stored." }),
      onSelectionChange: () => {
        clearErrors();
      },
      children: [
        /* @__PURE__ */ jsx(Item, { value: "local", children: /* @__PURE__ */ jsx(Trans, { message: "Local Disk (Default)" }) }),
        /* @__PURE__ */ jsx(Item, { value: "s3", children: "Amazon S3" }),
        /* @__PURE__ */ jsx(Item, { value: "ftp", children: "FTP" }),
        /* @__PURE__ */ jsx(Item, { value: "digitalocean_s3", children: "DigitalOcean Spaces" }),
        /* @__PURE__ */ jsx(Item, { value: "backblaze_s3", children: "Backblaze" })
      ]
    }
  );
}
function CredentialsSection() {
  const { watch } = useFormContext();
  const drives = [
    watch("server.uploads_disk_driver"),
    watch("server.public_disk_driver")
  ];
  if (drives[0] === "local" && drives[1] === "local") {
    return null;
  }
  return /* @__PURE__ */ jsx(SettingsErrorGroup, { separatorBottom: false, name: "storage_group", children: (isInvalid) => {
    if (drives.includes("s3")) {
      return /* @__PURE__ */ jsx(S3Form, { isInvalid });
    }
    if (drives.includes("ftp")) {
      return /* @__PURE__ */ jsx(FtpForm, { isInvalid });
    }
    if (drives.includes("dropbox")) {
      return /* @__PURE__ */ jsx(DropboxForm, { isInvalid });
    }
    if (drives.includes("digitalocean_s3")) {
      return /* @__PURE__ */ jsx(DigitalOceanForm, { isInvalid });
    }
    if (drives.includes("backblaze_s3")) {
      return /* @__PURE__ */ jsx(BackblazeForm, { isInvalid });
    }
  } });
}
function S3Form({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_s3_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "Amazon S3 key" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_s3_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "Amazon S3 secret" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_s3_region",
        label: /* @__PURE__ */ jsx(Trans, { message: "Amazon S3 region" }),
        pattern: "[a-z1-9\\-]+",
        placeholder: "us-east-1"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_s3_bucket",
        label: /* @__PURE__ */ jsx(Trans, { message: "Amazon S3 bucket" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        name: "server.storage_s3_endpoint",
        label: /* @__PURE__ */ jsx(Trans, { message: "Amazon S3 endpoint" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Only change endpoint if you are using another S3 compatible storage service." })
      }
    ),
    /* @__PURE__ */ jsx(S3DirectUploadField, { invalid: isInvalid })
  ] });
}
function DigitalOceanForm({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_digitalocean_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "DigitalOcean key" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_digitalocean_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "DigitalOcean secret" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_digitalocean_region",
        label: /* @__PURE__ */ jsx(Trans, { message: "DigitalOcean region" }),
        pattern: "[a-z0-9\\-]+",
        placeholder: "us-east-1",
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_digitalocean_bucket",
        label: /* @__PURE__ */ jsx(Trans, { message: "DigitalOcean bucket" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(S3DirectUploadField, { invalid: isInvalid })
  ] });
}
function BackblazeForm({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_backblaze_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "Backblaze KeyID" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_backblaze_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "Backblaze applicationKey" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_backblaze_region",
        label: /* @__PURE__ */ jsx(Trans, { message: "Backblaze Region" }),
        pattern: "[a-z0-9\\-]+",
        placeholder: "us-west-002",
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_backblaze_bucket",
        label: /* @__PURE__ */ jsx(Trans, { message: "Backblaze bucket name" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(S3DirectUploadField, { invalid: isInvalid })
  ] });
}
function S3DirectUploadField({ invalid }) {
  var _a2, _b;
  const uploadCors2 = useUploadS3Cors();
  const { data: defaultSettings } = useAdminSettings();
  const s3DriverEnabled = ((_a2 = defaultSettings == null ? void 0 : defaultSettings.server.uploads_disk_driver) == null ? void 0 : _a2.endsWith("s3")) || ((_b = defaultSettings == null ? void 0 : defaultSettings.server.public_disk_driver) == null ? void 0 : _b.endsWith("s3"));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        className: "mt-30",
        invalid,
        name: "client.uploads.s3_direct_upload",
        description: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { message: "Upload files directly from the browser to s3 without going through the server. It will save on server bandwidth and should result in faster upload times. This should be enabled, unless storage provider does not support multipart uploads." }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-10", children: /* @__PURE__ */ jsx(Trans, { message: "If s3 provider is not configured to allow uploads from browser, this can be done automatically via CORS button below, when valid credentials are saved." }) })
        ] }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Direct upload" })
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "flat",
        color: "primary",
        size: "xs",
        className: "mt-20",
        onClick: () => {
          uploadCors2.mutate();
        },
        disabled: !s3DriverEnabled || uploadCors2.isPending,
        children: /* @__PURE__ */ jsx(Trans, { message: "Configure CORS" })
      }
    )
  ] });
}
function FtpForm({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_ftp_host",
        label: /* @__PURE__ */ jsx(Trans, { message: "FTP hostname" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_ftp_username",
        label: /* @__PURE__ */ jsx(Trans, { message: "FTP username" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_ftp_password",
        label: /* @__PURE__ */ jsx(Trans, { message: "FTP password" }),
        type: "password",
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_ftp_root",
        label: /* @__PURE__ */ jsx(Trans, { message: "FTP directory" }),
        placeholder: "/"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.storage_ftp_port",
        label: /* @__PURE__ */ jsx(Trans, { message: "FTP port" }),
        type: "number",
        min: 0,
        placeholder: "21"
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        invalid: isInvalid,
        name: "server.storage_ftp_passive",
        className: "mb-30",
        children: /* @__PURE__ */ jsx(Trans, { message: "Passive" })
      }
    ),
    /* @__PURE__ */ jsx(FormSwitch, { invalid: isInvalid, name: "server.storage_ftp_ssl", children: /* @__PURE__ */ jsx(Trans, { message: "SSL" }) })
  ] });
}
function MailgunCredentials({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.mailgun_domain",
        label: /* @__PURE__ */ jsx(Trans, { message: "Mailgun domain" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Usually the domain of your site (site.com)" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.mailgun_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "Mailgun API key" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Should start with `key-`" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        name: "server.mailgun_endpoint",
        label: /* @__PURE__ */ jsx(Trans, { message: "Mailgun endpoint" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Can be left empty, if your mailgun account is in the US region." }),
        placeholder: "api.eu.mailgun.net"
      }
    )
  ] });
}
function SmtpCredentials({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.mail_host",
        label: /* @__PURE__ */ jsx(Trans, { message: "SMTP host" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.mail_username",
        label: /* @__PURE__ */ jsx(Trans, { message: "SMTP username" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        type: "password",
        name: "server.mail_password",
        label: /* @__PURE__ */ jsx(Trans, { message: "SMTP password" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        type: "number",
        name: "server.mail_port",
        label: /* @__PURE__ */ jsx(Trans, { message: "SMTP port" })
      }
    ),
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        selectionMode: "single",
        invalid: isInvalid,
        className: "mb-30",
        name: "server.mail_encryption",
        label: /* @__PURE__ */ jsx(Trans, { message: "SMTP encryption" }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: "", children: /* @__PURE__ */ jsx(Trans, { message: "None" }) }),
          /* @__PURE__ */ jsx(Item, { value: "tls", children: /* @__PURE__ */ jsx(Trans, { message: "TLS" }) })
        ]
      }
    )
  ] });
}
function SesCredentials({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.ses_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "SES key" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.ses_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "SES secret" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        name: "server.ses_region",
        label: /* @__PURE__ */ jsx(Trans, { message: "SES region" }),
        placeholder: "us-east-1",
        required: true
      }
    )
  ] });
}
function PostmarkCredentials({ isInvalid }) {
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      invalid: isInvalid,
      name: "server.postmark_token",
      label: /* @__PURE__ */ jsx(Trans, { message: "Postmark token" }),
      required: true
    }
  );
}
function OutgoingMailGroup() {
  const { watch, clearErrors } = useFormContext();
  const selectedDriver = watch("server.mail_driver");
  const credentialForms = [];
  if (selectedDriver === "mailgun") {
    credentialForms.push(MailgunCredentials);
  }
  if (selectedDriver === "smtp") {
    credentialForms.push(SmtpCredentials);
  }
  if (selectedDriver === "ses") {
    credentialForms.push(SesCredentials);
  }
  if (selectedDriver === "postmark") {
    credentialForms.push(PostmarkCredentials);
  }
  if (selectedDriver === "gmailApi") {
    credentialForms.push(ConnectGmailPanel);
  }
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      separatorTop: false,
      separatorBottom: false,
      name: "mail_group",
      children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          FormSelect,
          {
            onSelectionChange: () => {
              clearErrors();
            },
            invalid: isInvalid,
            selectionMode: "single",
            name: "server.mail_driver",
            label: /* @__PURE__ */ jsx(Trans, { message: "Outgoing mail method" }),
            description: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Trans, { message: "Which method should be used for sending outgoing application emails (like registration confirmation)" }),
              /* @__PURE__ */ jsx(
                LearnMoreLink,
                {
                  className: "mt-8",
                  link: "https://support.vebto.com/help-center/articles/42/44/155/incoming-emails"
                }
              )
            ] }),
            children: [
              /* @__PURE__ */ jsx(Item, { value: "mailgun", children: "Mailgun" }),
              /* @__PURE__ */ jsx(Item, { value: "gmailApi", children: "Gmail Api" }),
              /* @__PURE__ */ jsx(Item, { value: "smtp", children: "SMTP" }),
              /* @__PURE__ */ jsx(Item, { value: "postmark", children: "Postmark" }),
              /* @__PURE__ */ jsx(Item, { value: "ses", children: "Ses (Amazon Simple Email Service)" }),
              /* @__PURE__ */ jsx(Item, { value: "sendmail", children: "SendMail" }),
              /* @__PURE__ */ jsx(Item, { value: "log", children: "Log (Email will be saved to error log)" })
            ]
          }
        ),
        credentialForms.length ? /* @__PURE__ */ jsx("div", { className: "mt-30", children: credentialForms.map((CredentialsForm, index) => /* @__PURE__ */ jsx(CredentialsForm, { isInvalid }, index)) }) : null
      ] })
    }
  );
}
function OutgoingEmailSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Outgoing email settings" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Change outgoing email handlers, email credentials and other related settings." }),
      children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            id: "outgoing-emails",
            className: "mb-30",
            type: "email",
            name: "server.mail_from_address",
            label: /* @__PURE__ */ jsx(Trans, { message: "From address" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "All outgoing application emails will be sent from this email address." }),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(ContactAddressSection, {}),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            className: "mb-30",
            name: "server.mail_from_name",
            label: /* @__PURE__ */ jsx(Trans, { message: "From name" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "All outgoing application emails will be sent using this name." }),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          SectionHelper,
          {
            color: "warning",
            description: /* @__PURE__ */ jsx(Trans, { message: "Your selected mail method must be authorized to send emails using this address and name." })
          }
        ),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(OutgoingMailGroup, {})
      ]
    }
  );
}
function ContactAddressSection() {
  const { base_url } = useSettings();
  const contactPageUrl = `${base_url}/contact`;
  const link = /* @__PURE__ */ jsx(ExternalLink, { href: contactPageUrl, children: contactPageUrl });
  return /* @__PURE__ */ jsx(
    FormTextField,
    {
      className: "mb-30",
      type: "email",
      name: "client.mail.contact_page_address",
      label: /* @__PURE__ */ jsx(Trans, { message: "Contact page address" }),
      description: /* @__PURE__ */ jsx(
        Trans,
        {
          values: {
            contactPageUrl: link
          },
          message: "Where emails from :contactPageUrl page should be sent to."
        }
      )
    }
  );
}
function clearCache() {
  return apiClient.post("cache/flush").then((r) => r.data);
}
function useClearCache() {
  return useMutation({
    mutationFn: () => clearCache(),
    onSuccess: () => {
      toast(message("Cache cleared"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function CacheSettings() {
  const clearCache2 = useClearCache();
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Cache settings" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Select cache provider and manually clear cache." }),
      children: [
        /* @__PURE__ */ jsx(CacheSelect, {}),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "xs",
            color: "primary",
            disabled: clearCache2.isPending,
            onClick: () => {
              clearCache2.mutate();
            },
            children: /* @__PURE__ */ jsx(Trans, { message: "Clear cache" })
          }
        ),
        /* @__PURE__ */ jsx(
          SectionHelper,
          {
            color: "warning",
            className: "mt-30",
            description: /* @__PURE__ */ jsx(
              Trans,
              {
                message: '"File" is the best option for most cases and should not be changed, unless you are familiar with another cache method and have it set up on the server already.'
              }
            )
          }
        )
      ]
    }
  );
}
function CacheSelect() {
  const { watch, clearErrors } = useFormContext();
  const cacheDriver = watch("server.cache_driver");
  let CredentialSection = null;
  if (cacheDriver === "memcached") {
    CredentialSection = MemcachedCredentials;
  }
  return /* @__PURE__ */ jsx(SettingsErrorGroup, { separatorTop: false, name: "cache_group", children: (isInvalid) => {
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsxs(
        FormSelect,
        {
          invalid: isInvalid,
          onSelectionChange: () => {
            clearErrors();
          },
          selectionMode: "single",
          name: "server.cache_driver",
          label: /* @__PURE__ */ jsx(Trans, { message: "Cache method" }),
          description: /* @__PURE__ */ jsx(Trans, { message: "Which method should be used for storing and retrieving cached items." }),
          children: [
            /* @__PURE__ */ jsx(Item, { value: "file", children: /* @__PURE__ */ jsx(Trans, { message: "File (Default)" }) }),
            /* @__PURE__ */ jsx(Item, { value: "array", children: /* @__PURE__ */ jsx(Trans, { message: "None" }) }),
            /* @__PURE__ */ jsx(Item, { value: "apc", children: "APC" }),
            /* @__PURE__ */ jsx(Item, { value: "memcached", children: "Memcached" }),
            /* @__PURE__ */ jsx(Item, { value: "redis", children: "Redis" })
          ]
        }
      ),
      CredentialSection && /* @__PURE__ */ jsx("div", { className: "mt-30", children: /* @__PURE__ */ jsx(CredentialSection, { isInvalid }) })
    ] });
  } });
}
function MemcachedCredentials({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.memcached_host",
        label: /* @__PURE__ */ jsx(Trans, { message: "Memcached host" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        type: "number",
        name: "server.memcached_port",
        label: /* @__PURE__ */ jsx(Trans, { message: "Memcached port" }),
        required: true
      }
    )
  ] });
}
function LoggingSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Error logging" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure site error logging and related 3rd party integrations." }),
      children: [
        /* @__PURE__ */ jsx(SentrySection, {}),
        /* @__PURE__ */ jsx(
          SectionHelper,
          {
            className: "mt-30",
            color: "positive",
            description: /* @__PURE__ */ jsx(
              Trans,
              {
                values: {
                  a: (parts) => /* @__PURE__ */ jsx(ExternalLink, { href: "https://sentry.io", children: parts })
                },
                message: "<a>Sentry</a> integration provides real-time error tracking and helps identify and fix issues when site is in production."
              }
            )
          }
        )
      ]
    }
  );
}
function SentrySection() {
  const { clearErrors } = useFormContext();
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      separatorTop: false,
      separatorBottom: false,
      name: "logging_group",
      children: (isInvalid) => {
        return /* @__PURE__ */ jsx(
          FormTextField,
          {
            onChange: () => {
              clearErrors();
            },
            invalid: isInvalid,
            name: "server.sentry_dsn",
            type: "url",
            minLength: 30,
            label: /* @__PURE__ */ jsx(Trans, { message: "Sentry DSN" })
          }
        );
      }
    }
  );
}
function QueueSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Queue" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Select active queue method and enter related 3rd party API keys." }),
      children: [
        /* @__PURE__ */ jsx(
          SectionHelper,
          {
            color: "positive",
            className: "mb-30",
            description: /* @__PURE__ */ jsx(Trans, { message: "Queues allow to defer time consuming tasks, such as sending an email, until a later time. Deferring these tasks can speed up web requests to the application." })
          }
        ),
        /* @__PURE__ */ jsx(
          SectionHelper,
          {
            color: "warning",
            className: "mb-30",
            description: /* @__PURE__ */ jsx(Trans, { message: "All methods except sync require additional setup, which should be performed before changing the queue method. Consult documentation for more information." })
          }
        ),
        /* @__PURE__ */ jsx(DriverSection, {})
      ]
    }
  );
}
function DriverSection() {
  const { watch, clearErrors } = useFormContext();
  const queueDriver = watch("server.queue_driver");
  let CredentialSection = null;
  if (queueDriver === "sqs") {
    CredentialSection = SqsCredentials;
  }
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      separatorTop: false,
      separatorBottom: false,
      name: "queue_group",
      children: (isInvalid) => {
        return /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsxs(
            FormSelect,
            {
              invalid: isInvalid,
              onSelectionChange: () => {
                clearErrors();
              },
              selectionMode: "single",
              name: "server.queue_driver",
              label: /* @__PURE__ */ jsx(Trans, { message: "Queue method" }),
              required: true,
              children: [
                /* @__PURE__ */ jsx(Item, { value: "sync", children: /* @__PURE__ */ jsx(Trans, { message: "Sync (Default)" }) }),
                /* @__PURE__ */ jsx(Item, { value: "beanstalkd", children: "Beanstalkd" }),
                /* @__PURE__ */ jsx(Item, { value: "database", children: /* @__PURE__ */ jsx(Trans, { message: "Database" }) }),
                /* @__PURE__ */ jsx(Item, { value: "sqs", children: /* @__PURE__ */ jsx(Trans, { message: "SQS (Amazon simple queue service)" }) }),
                /* @__PURE__ */ jsx(Item, { value: "redis", children: "Redis" })
              ]
            }
          ),
          CredentialSection && /* @__PURE__ */ jsx("div", { className: "mt-30", children: /* @__PURE__ */ jsx(CredentialSection, { isInvalid }) })
        ] });
      }
    }
  );
}
function SqsCredentials({ isInvalid }) {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.sqs_queue_key",
        label: /* @__PURE__ */ jsx(Trans, { message: "SQS queue key" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.sqs_queue_secret",
        label: /* @__PURE__ */ jsx(Trans, { message: "SQS queue secret" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.sqs_queue_prefix",
        label: /* @__PURE__ */ jsx(Trans, { message: "SQS queue prefix" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.sqs_queue_name",
        label: /* @__PURE__ */ jsx(Trans, { message: "SQS queue name" }),
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        invalid: isInvalid,
        className: "mb-30",
        name: "server.sqs_queue_region",
        label: /* @__PURE__ */ jsx(Trans, { message: "SQS queue region" }),
        required: true
      }
    )
  ] });
}
function RecaptchaSettings() {
  const { settings } = useContext(SiteConfigContext);
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Recaptcha" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure google recaptcha integration and credentials." }),
      children: [
        (settings == null ? void 0 : settings.showRecaptchaLinkSwitch) && /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-30",
            name: "client.recaptcha.enable.link_creation",
            description: /* @__PURE__ */ jsx(Trans, { message: "Enable recaptcha integration when creating links from homepage or user dashboard." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Link creation" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-30",
            name: "client.recaptcha.enable.contact",
            description: /* @__PURE__ */ jsx(
              Trans,
              {
                message: 'Enable recaptcha integration for "contact us" page.'
              }
            ),
            children: /* @__PURE__ */ jsx(Trans, { message: "Contact page" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            className: "mb-30",
            name: "client.recaptcha.enable.register",
            description: /* @__PURE__ */ jsx(Trans, { message: "Enable recaptcha integration for registration page." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Registration page" })
          }
        ),
        /* @__PURE__ */ jsx(RecaptchaSection, {})
      ]
    }
  );
}
function RecaptchaSection() {
  const { clearErrors } = useFormContext();
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      separatorTop: false,
      separatorBottom: false,
      name: "recaptcha_group",
      children: (isInvalid) => {
        return /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              className: "mb-30",
              onChange: () => {
                clearErrors();
              },
              invalid: isInvalid,
              name: "client.recaptcha.site_key",
              label: /* @__PURE__ */ jsx(Trans, { message: "Recaptcha v3 site key" })
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              onChange: () => {
                clearErrors();
              },
              invalid: isInvalid,
              name: "client.recaptcha.secret_key",
              label: /* @__PURE__ */ jsx(Trans, { message: "Recaptcha v3 secret key" })
            }
          )
        ] });
      }
    }
  );
}
const FileField = React.forwardRef(
  (props, ref) => {
    const inputRef = useObjectRef(ref);
    const { fieldProps, inputProps } = useField({ ...props, focusRef: inputRef });
    const inputFieldClassNames = getInputFieldClassNames(props);
    return /* @__PURE__ */ jsx(Field, { ref, fieldClassNames: inputFieldClassNames, ...fieldProps, children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "file",
        ref: inputRef,
        ...inputProps,
        className: clsx(
          inputFieldClassNames.input,
          "py-8",
          "file:bg-primary file:text-on-primary file:border-none file:rounded file:text-sm file:font-semibold file:px-10 file:h-24 file:mr-10"
        )
      }
    ) });
  }
);
function FormFileField({ name, ...props }) {
  const {
    field: { onChange, onBlur, ref },
    fieldState: { invalid, error }
  } = useController({
    name
  });
  const [value, setValue] = React.useState("");
  const formProps = {
    onChange: (e) => {
      var _a2;
      onChange((_a2 = e.target.files) == null ? void 0 : _a2[0]);
      setValue(e.target.value);
    },
    onBlur,
    value,
    invalid,
    errorMessage: error == null ? void 0 : error.message
  };
  return /* @__PURE__ */ jsx(FileField, { ref, ...mergeProps(formProps, props) });
}
function ReportsSettings() {
  return /* @__PURE__ */ jsx(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Analytics" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure google analytics integration and credentials." }),
      children: /* @__PURE__ */ jsx(AnalyticsSection, {})
    }
  );
}
function AnalyticsSection() {
  const { clearErrors } = useFormContext();
  return /* @__PURE__ */ jsx(
    SettingsErrorGroup,
    {
      separatorTop: false,
      separatorBottom: false,
      name: "analytics_group",
      children: (isInvalid) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          FormFileField,
          {
            className: "mb-30",
            onChange: () => {
              clearErrors();
            },
            invalid: isInvalid,
            name: "files.certificate",
            accept: ".json",
            label: /* @__PURE__ */ jsx(Trans, { message: "Google service account key file (.json)" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            className: "mb-30",
            onChange: () => {
              clearErrors();
            },
            invalid: isInvalid,
            name: "server.analytics_property_id",
            type: "number",
            label: /* @__PURE__ */ jsx(Trans, { message: "Google analytics property ID" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            className: "mb-30",
            onChange: () => {
              clearErrors();
            },
            invalid: isInvalid,
            name: "client.analytics.tracking_code",
            placeholder: "G-******",
            min: "1",
            max: "20",
            description: /* @__PURE__ */ jsx(Trans, { message: "Google analytics measurement ID only, not the whole javascript snippet." }),
            label: /* @__PURE__ */ jsx(Trans, { message: "Google tag manager measurement ID" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "client.analytics.gchart_api_key",
            label: /* @__PURE__ */ jsx(Trans, { message: "Google maps javascript API key" }),
            description: /* @__PURE__ */ jsx(Trans, { message: "Only required in order to show world geochart on integrated analytics pages." })
          }
        )
      ] })
    }
  );
}
function useUpdateUser(form) {
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (props) => updateUser(props),
    onSuccess: (response, props) => {
      toast(message("User updated"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/admin/users");
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function updateUser({ id, ...other }) {
  if (other.roles) {
    other.roles = other.roles.map((r) => r.id);
  }
  return apiClient.put(`users/${id}`, other).then((r) => r.data);
}
function useStickySentinel() {
  const [isSticky, setIsSticky] = useState(false);
  const observerRef = useRef();
  const sentinelRef = useCallback((sentinel) => {
    var _a2;
    if (sentinel) {
      const observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        { threshold: [1] }
      );
      observerRef.current = observer;
      observer.observe(sentinel);
    } else if (observerRef.current) {
      (_a2 = observerRef.current) == null ? void 0 : _a2.disconnect();
    }
  }, []);
  return { isSticky, sentinelRef };
}
function CrupdateResourceLayout({
  onSubmit,
  form,
  title,
  subTitle,
  children,
  actions,
  backButton,
  isLoading = false,
  disableSaveWhenNotDirty = false,
  wrapInContainer = true
}) {
  const { isSticky, sentinelRef } = useStickySentinel();
  const isDirty = !disableSaveWhenNotDirty ? true : Object.keys(form.formState.dirtyFields).length;
  return /* @__PURE__ */ jsxs(
    Form$1,
    {
      onSubmit,
      onBeforeSubmit: () => form.clearErrors(),
      form,
      children: [
        /* @__PURE__ */ jsx("div", { ref: sentinelRef }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx(
              "sticky top-0 z-10 my-12 transition-shadow md:my-24",
              isSticky && "bg shadow"
            ),
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: clsx(
                  "flex items-center gap-24 py-14 md:items-start",
                  wrapInContainer && "container mx-auto px-24"
                ),
                children: [
                  backButton,
                  /* @__PURE__ */ jsxs("div", { className: "overflow-hidden overflow-ellipsis md:mr-64", children: [
                    /* @__PURE__ */ jsx("h1", { className: "overflow-hidden overflow-ellipsis whitespace-nowrap text-xl md:text-3xl", children: title }),
                    subTitle && /* @__PURE__ */ jsx("div", { className: "mt-4", children: subTitle })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mr-auto" }),
                  actions,
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "flat",
                      color: "primary",
                      type: "submit",
                      disabled: isLoading || !isDirty,
                      children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: wrapInContainer ? "container mx-auto px-24 pb-24" : void 0,
            children: /* @__PURE__ */ jsx("div", { className: "rounded", children })
          }
        )
      ]
    }
  );
}
function CrupdateUserForm({
  onSubmit,
  form,
  title,
  subTitle,
  isLoading,
  avatarManager,
  resendEmailButton,
  children
}) {
  const { require_email_confirmation } = useSettings();
  const { data: valueLists } = useValueLists(["roles", "permissions"]);
  return /* @__PURE__ */ jsxs(
    CrupdateResourceLayout,
    {
      onSubmit,
      form,
      title,
      subTitle,
      isLoading,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-40 flex items-start gap-40 md:gap-80", children: [
          avatarManager,
          /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
            children,
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                className: "mb-30",
                name: "first_name",
                label: /* @__PURE__ */ jsx(Trans, { message: "First name" })
              }
            ),
            /* @__PURE__ */ jsx(
              FormTextField,
              {
                name: "last_name",
                label: /* @__PURE__ */ jsx(Trans, { message: "Last name" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-30 border-b border-t pb-30 pt-30", children: [
          /* @__PURE__ */ jsx(
            FormSwitch,
            {
              className: clsx(resendEmailButton && "mb-30"),
              disabled: !require_email_confirmation,
              name: "email_verified_at",
              description: /* @__PURE__ */ jsx(Trans, { message: "Whether email address has been confirmed. User will not be able to login until address is confirmed, unless confirmation is disabled from settings page." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Email confirmed" })
            }
          ),
          resendEmailButton
        ] }),
        /* @__PURE__ */ jsx(
          FormFileSizeField,
          {
            className: "mb-30",
            name: "available_space",
            label: /* @__PURE__ */ jsx(Trans, { message: "Allowed storage space" }),
            description: /* @__PURE__ */ jsx(
              Trans,
              {
                values: {
                  a: (parts) => /* @__PURE__ */ jsx(
                    Link,
                    {
                      className: LinkStyle,
                      target: "_blank",
                      to: "/admin/settings/uploading",
                      children: parts
                    }
                  )
                },
                message: "Total storage space all user uploads are allowed to take up. If left empty, this value will be inherited from any roles or subscriptions user has, or from 'Available space' setting in <a>Uploading</a> settings page."
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          FormChipField,
          {
            className: "mb-30",
            name: "roles",
            label: /* @__PURE__ */ jsx(Trans, { message: "Roles" }),
            suggestions: valueLists == null ? void 0 : valueLists.roles,
            children: (chip) => /* @__PURE__ */ jsx(Item, { value: chip.id, children: chip.name }, chip.id)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-30 border-t pt-30", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-10 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Permissions" }) }),
          /* @__PURE__ */ jsx(FormPermissionSelector, { name: "permissions" })
        ] })
      ]
    }
  );
}
const ReportIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9 14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z" }, "0"), /* @__PURE__ */ jsx("circle", { cx: "12", cy: "16", r: "1" }, "1"), /* @__PURE__ */ jsx("path", { d: "M11 7h2v7h-2z" }, "2")],
  "ReportOutlined"
);
function UpdateUserPage() {
  var _a2, _b, _c;
  const form = useForm();
  const { require_email_confirmation } = useSettings();
  const { userId } = useParams();
  const updateUser2 = useUpdateUser(form);
  const resendConfirmationEmail = useResendVerificationEmail();
  const { data, isLoading } = useUser(userId, {
    with: ["subscriptions", "roles", "permissions", "bans"]
  });
  const banReason = (_b = (_a2 = data == null ? void 0 : data.user.bans) == null ? void 0 : _a2[0]) == null ? void 0 : _b.comment;
  useEffect(() => {
    if ((data == null ? void 0 : data.user) && !form.getValues().id) {
      form.reset({
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        roles: data.user.roles,
        permissions: data.user.permissions,
        id: data.user.id,
        email_verified_at: Boolean(data.user.email_verified_at),
        available_space: data.user.available_space,
        avatar: data.user.avatar
      });
    }
  }, [data == null ? void 0 : data.user, form]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, {});
  }
  const resendEmailButton = /* @__PURE__ */ jsx(
    Button,
    {
      size: "xs",
      variant: "outline",
      color: "primary",
      disabled: !require_email_confirmation || resendConfirmationEmail.isPending || ((_c = data == null ? void 0 : data.user) == null ? void 0 : _c.email_verified_at) != null,
      onClick: () => {
        resendConfirmationEmail.mutate({ email: data.user.email });
      },
      children: /* @__PURE__ */ jsx(Trans, { message: "Resend email" })
    }
  );
  return /* @__PURE__ */ jsx(
    CrupdateUserForm,
    {
      onSubmit: (newValues) => {
        updateUser2.mutate(newValues);
      },
      form,
      title: /* @__PURE__ */ jsx(Trans, { values: { email: data == null ? void 0 : data.user.email }, message: "Edit “:email“" }),
      subTitle: banReason && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm text-danger", children: [
        /* @__PURE__ */ jsx(ReportIcon, {}),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Suspended: :reason",
            values: { reason: banReason }
          }
        ) })
      ] }),
      isLoading: updateUser2.isPending,
      avatarManager: /* @__PURE__ */ jsx(
        AvatarSection,
        {
          user: data.user,
          onChange: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
          }
        }
      ),
      resendEmailButton,
      children: /* @__PURE__ */ jsx(
        FormTextField,
        {
          className: "mb-30",
          name: "password",
          type: "password",
          label: /* @__PURE__ */ jsx(Trans, { message: "New password" })
        }
      )
    }
  );
}
function AvatarSection({ user, onChange }) {
  const uploadAvatar = useUploadAvatar({ user });
  const removeAvatar = useRemoveAvatar({ user });
  return /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
    FormImageSelector,
    {
      name: "avatar",
      diskPrefix: "avatars",
      variant: "avatar",
      stretchPreview: true,
      label: /* @__PURE__ */ jsx(Trans, { message: "Profile image" }),
      previewSize: "w-90 h-90",
      showRemoveButton: true,
      onChange: (url) => {
        if (url) {
          uploadAvatar.mutate({ url });
        } else {
          removeAvatar.mutate();
        }
        onChange();
      }
    }
  ) });
}
function useCreateUser(form) {
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (props) => createUser(props),
    onSuccess: () => {
      toast(message("User created"));
      queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("users") });
      navigate("/admin/users");
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function createUser(payload) {
  if (payload.roles) {
    payload.roles = payload.roles.map((r) => r.id);
  }
  return apiClient.post("users", payload).then((r) => r.data);
}
function CreateUserPage() {
  const form = useForm();
  const createUser2 = useCreateUser(form);
  const avatarManager = /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
    FormImageSelector,
    {
      name: "avatar",
      diskPrefix: "avatars",
      variant: "avatar",
      stretchPreview: true,
      label: /* @__PURE__ */ jsx(Trans, { message: "Profile image" }),
      previewSize: "w-90 h-90",
      showRemoveButton: true
    }
  ) });
  return /* @__PURE__ */ jsxs(
    CrupdateUserForm,
    {
      onSubmit: (newValues) => {
        createUser2.mutate(newValues);
      },
      form,
      title: /* @__PURE__ */ jsx(Trans, { message: "Add new user" }),
      isLoading: createUser2.isPending,
      avatarManager,
      children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            className: "mb-30",
            name: "email",
            type: "email",
            label: /* @__PURE__ */ jsx(Trans, { message: "Email" })
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            className: "mb-30",
            name: "password",
            type: "password",
            label: /* @__PURE__ */ jsx(Trans, { message: "Password" })
          }
        )
      ]
    }
  );
}
const TranslateIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m12.87 15.07-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7 1.62-4.33L19.12 17h-3.24z" }),
  "TranslateOutlined"
);
const getLocalWithLinesQueryKey = (localeId) => {
  const key = ["getLocaleWithLines"];
  if (localeId != null) {
    key.push(localeId);
  }
  return key;
};
function useLocaleWithLines(localeId) {
  return useQuery({
    queryKey: getLocalWithLinesQueryKey(localeId),
    queryFn: () => fetchLocaleWithLines(localeId),
    staleTime: Infinity
  });
}
function fetchLocaleWithLines(localeId) {
  return apiClient.get(`localizations/${localeId}`).then((response) => response.data);
}
function UpdateLocalization({
  id,
  ...other
}) {
  return apiClient.put(`localizations/${id}`, other).then((r) => r.data);
}
function useUpdateLocalization(form) {
  return useMutation({
    mutationFn: (props) => UpdateLocalization(props),
    onSuccess: () => {
      toast(message("Localization updated"));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("localizations")
      });
      queryClient.invalidateQueries({ queryKey: getLocalWithLinesQueryKey() });
    },
    onError: (r) => form ? onFormQueryError(r, form) : showHttpErrorToast(r)
  });
}
function UpdateLocalizationDialog({
  localization
}) {
  const { trans } = useTrans();
  const { formId, close } = useDialogContext();
  const form = useForm({
    defaultValues: {
      id: localization.id,
      name: localization.name,
      language: localization.language
    }
  });
  const { data } = useValueLists(["languages"]);
  const languages = (data == null ? void 0 : data.languages) || [];
  const updateLocalization = useUpdateLocalization(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update localization" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (values) => {
          updateLocalization.mutate(values, { onSuccess: close });
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: "name",
              label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
              className: "mb-30",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormSelect,
            {
              required: true,
              name: "language",
              label: /* @__PURE__ */ jsx(Trans, { message: "Language" }),
              selectionMode: "single",
              showSearchField: true,
              searchPlaceholder: trans(message("Search languages")),
              children: languages.map((language) => /* @__PURE__ */ jsx(Item, { value: language.code, children: language.name }, language.code))
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: updateLocalization.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
function createLocalization(payload) {
  return apiClient.post(`localizations`, payload).then((r) => r.data);
}
function useCreateLocalization(form) {
  const queryClient2 = useQueryClient();
  return useMutation({
    mutationFn: (props) => createLocalization(props),
    onSuccess: () => {
      toast(message("Localization created"));
      queryClient2.invalidateQueries({
        queryKey: DatatableDataQueryKey("localizations")
      });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function CreateLocationDialog() {
  const { trans } = useTrans();
  const { formId, close } = useDialogContext();
  const form = useForm({
    defaultValues: {
      language: "en"
    }
  });
  const { data } = useValueLists(["languages"]);
  const languages = (data == null ? void 0 : data.languages) || [];
  const createLocalization2 = useCreateLocalization(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Create localization" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (values) => {
          createLocalization2.mutate(values, { onSuccess: close });
        },
        children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              autoFocus: true,
              name: "name",
              label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
              className: "mb-30",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormSelect,
            {
              required: true,
              name: "language",
              label: /* @__PURE__ */ jsx(Trans, { message: "Language" }),
              selectionMode: "single",
              showSearchField: true,
              searchPlaceholder: trans(message("Search languages")),
              children: languages.map((language) => /* @__PURE__ */ jsx(Item, { value: language.code, children: language.name }, language.code))
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          form: formId,
          disabled: createLocalization2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const aroundTheWorldSvg = "/assets/around-the-world-df9b11c5.svg";
function useUploadTranslationFile() {
  return useMutation({
    mutationFn: (payload) => uploadFile(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("localizations")
      });
      await queryClient.invalidateQueries({
        queryKey: getLocalWithLinesQueryKey()
      });
      toast(message("Translation file uploaded"));
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function uploadFile({ localeId, file }) {
  const data = new FormData();
  data.append("file", file.native);
  return apiClient.post(`localizations/${localeId}/upload`, data).then((r) => r.data);
}
const columnConfig$6 = [
  {
    key: "name",
    allowsSorting: true,
    sortingKey: "name",
    visibleInMode: "all",
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (locale) => locale.name
  },
  {
    key: "language",
    allowsSorting: true,
    sortingKey: "language",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Language code" }),
    body: (locale) => locale.language
  },
  {
    key: "updatedAt",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (locale) => /* @__PURE__ */ jsx(FormattedDate, { date: locale.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-84 flex-shrink-0",
    visibleInMode: "all",
    body: (locale) => {
      return /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Translate" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            elementType: Link,
            to: `${locale.id}/translate`,
            children: /* @__PURE__ */ jsx(TranslateIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(RowActionsMenuTrigger, { locale }) })
      ] });
    }
  }
];
function LocalizationIndex() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "localizations",
      title: /* @__PURE__ */ jsx(Trans, { message: "Localizations" }),
      columns: columnConfig$6,
      actions: /* @__PURE__ */ jsx(Actions$9, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: aroundTheWorldSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No localizations have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching localizations" })
        }
      )
    }
  );
}
function Actions$9() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new localization" }) }),
    /* @__PURE__ */ jsx(CreateLocationDialog, {})
  ] }) });
}
function RowActionsMenuTrigger({ locale }) {
  const uploadFile2 = useUploadTranslationFile();
  return /* @__PURE__ */ jsxs(MenuTrigger, { children: [
    /* @__PURE__ */ jsx(IconButton, { disabled: uploadFile2.isPending, children: /* @__PURE__ */ jsx(MoreVertIcon, {}) }),
    /* @__PURE__ */ jsxs(Menu, { children: [
      /* @__PURE__ */ jsx(
        Item,
        {
          value: "translate",
          elementType: Link,
          to: `${locale.id}/translate`,
          children: /* @__PURE__ */ jsx(Trans, { message: "Translate" })
        }
      ),
      /* @__PURE__ */ jsx(
        Item,
        {
          value: "rename",
          onSelected: () => openDialog(UpdateLocalizationDialog, { localization: locale }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Rename" })
        }
      ),
      /* @__PURE__ */ jsx(
        Item,
        {
          value: "download",
          onSelected: () => downloadFileFromUrl(`api/v1/localizations/${locale.id}/download`),
          children: /* @__PURE__ */ jsx(Trans, { message: "Download" })
        }
      ),
      /* @__PURE__ */ jsx(
        Item,
        {
          value: "upload",
          onSelected: async () => {
            const files = await openUploadWindow({
              types: [UploadInputType.json]
            });
            if (files.length == 1) {
              uploadFile2.mutate({ localeId: locale.id, file: files[0] });
            }
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Upload" })
        }
      )
    ] })
  ] });
}
function NewTranslationDialog() {
  const { formId, close } = useDialogContext();
  const form = useForm();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Add translation" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (values) => {
          close(values);
        },
        children: [
          /* @__PURE__ */ jsx(
            SectionHelper,
            {
              className: "mb-30",
              title: /* @__PURE__ */ jsx(Trans, { message: "Add a new translation, if it does not exist already." }),
              description: /* @__PURE__ */ jsx(Trans, { message: "This should only need to be done for things like custom menu items." })
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              inputElementType: "textarea",
              rows: 2,
              autoFocus: true,
              name: "key",
              label: /* @__PURE__ */ jsx(Trans, { message: "Translation key" }),
              className: "mb-30",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              inputElementType: "textarea",
              rows: 2,
              name: "value",
              label: /* @__PURE__ */ jsx(Trans, { message: "Translation value" }),
              required: true
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: close, children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", type: "submit", form: formId, children: /* @__PURE__ */ jsx(Trans, { message: "Add" }) })
    ] })
  ] });
}
function TranslationManagementPage() {
  const { localeId } = useParams();
  const { data, isLoading } = useLocaleWithLines(localeId);
  const localization = data == null ? void 0 : data.localization;
  if (isLoading || !localization) {
    return /* @__PURE__ */ jsx(FullPageLoader, {});
  }
  return /* @__PURE__ */ jsx(Form, { localization });
}
function Form({ localization }) {
  const [lines, setLines] = useState(localization.lines || {});
  const navigate = useNavigate$1();
  const updateLocalization = useUpdateLocalization();
  const [searchQuery, setSearchQuery] = useState("");
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: "flex h-full flex-col p-14 md:p-24",
      onSubmit: (e) => {
        e.preventDefault();
        updateLocalization.mutate(
          { id: localization.id, lines },
          {
            onSuccess: () => {
              navigate("/admin/localizations");
            }
          }
        );
      },
      children: [
        /* @__PURE__ */ jsx(
          Header$1,
          {
            localization,
            setLines,
            lines,
            searchQuery,
            setSearchQuery,
            isLoading: updateLocalization.isPending
          }
        ),
        /* @__PURE__ */ jsx(LinesList, { lines, setLines, searchQuery })
      ]
    }
  );
}
function Header$1({
  localization,
  searchQuery,
  setSearchQuery,
  isLoading,
  lines,
  setLines
}) {
  const navigate = useNavigate$1();
  const isMobile = useIsMobileMediaQuery();
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0", children: [
    /* @__PURE__ */ jsxs(Breadcrumb, { size: "lg", className: "mb-16", children: [
      /* @__PURE__ */ jsx(
        BreadcrumbItem,
        {
          onSelected: () => {
            navigate("/admin/localizations");
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Localizations" })
        }
      ),
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(
        Trans,
        {
          message: ":locale translations",
          values: { locale: localization.name }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-24 flex items-center gap-32 md:gap-12", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-440 flex-auto", children: /* @__PURE__ */ jsx(
        TextField,
        {
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
          placeholder: trans({ message: "Type to search..." })
        }
      ) }),
      /* @__PURE__ */ jsxs(
        DialogTrigger,
        {
          type: "modal",
          onClose: (newTranslation) => {
            if (newTranslation) {
              const newLines = { ...lines };
              newLines[newTranslation.key] = newTranslation.value;
              setLines(newLines);
            }
          },
          children: [
            !isMobile && /* @__PURE__ */ jsx(
              Button,
              {
                className: "ml-auto",
                variant: "outline",
                color: "primary",
                startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
                children: /* @__PURE__ */ jsx(Trans, { message: "Add new" })
              }
            ),
            /* @__PURE__ */ jsx(NewTranslationDialog, {})
          ]
        }
      ),
      /* @__PURE__ */ jsx(ActionsMenuTrigger, { locale: localization }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          type: "submit",
          disabled: isLoading,
          children: isMobile ? /* @__PURE__ */ jsx(Trans, { message: "Save" }) : /* @__PURE__ */ jsx(Trans, { message: "Save translations" })
        }
      )
    ] })
  ] });
}
function LinesList({ searchQuery, lines, setLines }) {
  const filteredLines = useMemo(() => {
    return Object.entries(lines).filter(([id, translation]) => {
      const lowerCaseQuery = searchQuery == null ? void 0 : searchQuery.toLowerCase();
      return !lowerCaseQuery || (id == null ? void 0 : id.toLowerCase().includes(lowerCaseQuery)) || (translation == null ? void 0 : translation.toLowerCase().includes(lowerCaseQuery));
    });
  }, [lines, searchQuery]);
  const ref = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: filteredLines.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 123
  });
  return /* @__PURE__ */ jsx("div", { className: "flex-auto overflow-y-auto", ref, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: "relative w-full",
      style: {
        height: `${rowVirtualizer.getTotalSize()}px`
      },
      children: rowVirtualizer.getVirtualItems().map((virtualItem) => {
        const [id, translation] = filteredLines[virtualItem.index];
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute left-0 top-0 w-full",
            style: {
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`
            },
            children: /* @__PURE__ */ jsxs("div", { className: "mb-10 rounded border md:mr-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-24 border-b px-10 py-2", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    className: "flex-auto text-xs font-semibold",
                    htmlFor: id,
                    children: id
                  }
                ),
                /* @__PURE__ */ jsx(
                  IconButton,
                  {
                    size: "xs",
                    className: "text-muted",
                    onClick: () => {
                      const newLines = { ...lines };
                      delete newLines[id];
                      setLines(newLines);
                    },
                    children: /* @__PURE__ */ jsx(CloseIcon, {})
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                "textarea",
                {
                  id,
                  name: id,
                  defaultValue: translation,
                  className: "block w-full resize-none rounded bg-inherit p-10 text-sm outline-none focus-visible:ring-2",
                  rows: 2,
                  onChange: (e) => {
                    const newLines = { ...lines };
                    newLines[id] = e.target.value;
                    setLines(newLines);
                  }
                }
              ) })
            ] })
          },
          id
        );
      })
    }
  ) });
}
function ActionsMenuTrigger({ locale }) {
  const uploadFile2 = useUploadTranslationFile();
  return /* @__PURE__ */ jsxs(MenuTrigger, { children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        variant: "outline",
        size: "sm",
        color: "primary",
        disabled: uploadFile2.isPending,
        children: /* @__PURE__ */ jsx(MoreVertIcon, {})
      }
    ),
    /* @__PURE__ */ jsxs(Menu, { children: [
      /* @__PURE__ */ jsx(
        Item,
        {
          value: "download",
          onSelected: () => downloadFileFromUrl(`api/v1/localizations/${locale.id}/download`),
          children: /* @__PURE__ */ jsx(Trans, { message: "Download" })
        }
      ),
      /* @__PURE__ */ jsx(
        Item,
        {
          value: "upload",
          onSelected: async () => {
            const files = await openUploadWindow({
              types: [UploadInputType.json]
            });
            if (files.length == 1) {
              uploadFile2.mutate({ localeId: locale.id, file: files[0] });
            }
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Upload" })
        }
      )
    ] })
  ] });
}
function ImageZoomDialog(props) {
  const { close } = useDialogContext();
  const { image, images } = props;
  const [activeIndex, setActiveIndex] = useControlledState(
    props.activeIndex,
    props.defaultActiveIndex,
    props.onActiveIndexChange
  );
  const src = image || (images == null ? void 0 : images[activeIndex]);
  return /* @__PURE__ */ jsx(Dialog, { size: "fullscreenTakeover", background: "bg-black/80", children: /* @__PURE__ */ jsxs(DialogBody, { padding: "p-0", className: "h-full w-full", children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "lg",
        color: "paper",
        className: "absolute right-0 top-0 z-20 text-white",
        onClick: () => {
          close();
        },
        children: /* @__PURE__ */ jsx(CloseIcon, {})
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative flex h-full w-full items-center justify-center p-40", children: [
      (images == null ? void 0 : images.length) ? /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "lg",
          color: "white",
          variant: "flat",
          className: "absolute bottom-0 left-20 top-0 my-auto",
          disabled: activeIndex < 1,
          onClick: () => {
            setActiveIndex(activeIndex - 1);
          },
          children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
        }
      ) : null,
      /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: "",
          className: "max-h-full w-auto object-contain shadow"
        }
      ),
      (images == null ? void 0 : images.length) ? /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "lg",
          color: "white",
          variant: "flat",
          className: "absolute bottom-0 right-20 top-0 my-auto",
          disabled: activeIndex + 1 === (images == null ? void 0 : images.length),
          onClick: () => {
            setActiveIndex(activeIndex + 1);
          },
          children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
        }
      ) : null
    ] })
  ] }) });
}
function AdsPage() {
  var _a2;
  const query = useAdminSettings();
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-12 md:p-24", children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Ads" }) }),
    /* @__PURE__ */ jsx("h1", { className: "mb-20 text-2xl font-light md:mb-40 md:text-3xl", children: /* @__PURE__ */ jsx(Trans, { message: "Predefined Ad slots" }) }),
    query.isLoading ? /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true }) : /* @__PURE__ */ jsx(AdsForm, { defaultValues: ((_a2 = query.data) == null ? void 0 : _a2.client.ads) || {} })
  ] });
}
function AdsForm({ defaultValues }) {
  const {
    admin: { ads }
  } = useContext(SiteConfigContext);
  const form = useForm({
    defaultValues: { client: { ads: defaultValues } }
  });
  const updateSettings = useUpdateAdminSettings(form);
  return /* @__PURE__ */ jsxs(
    Form$1,
    {
      form,
      onSubmit: (value) => {
        updateSettings.mutate(value);
      },
      children: [
        ads.map((ad) => {
          return /* @__PURE__ */ jsx(AdSection, { adConfig: ad }, ad.slot);
        }),
        /* @__PURE__ */ jsx(
          FormSwitch,
          {
            name: "client.ads.disable",
            className: "mb-30",
            description: /* @__PURE__ */ jsx(Trans, { message: "Disable all add related functionality across the site." }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Disable ads" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            variant: "flat",
            color: "primary",
            disabled: updateSettings.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
          }
        )
      ]
    }
  );
}
function AdSection({ adConfig }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24", children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        className: "mb-30 flex-auto",
        name: `client.${adConfig.slot}`,
        inputElementType: "textarea",
        rows: 8,
        label: /* @__PURE__ */ jsx(Trans, { ...adConfig.description })
      }
    ),
    /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "cursor-zoom-in overflow-hidden rounded outline-none transition hover:scale-105 focus-visible:ring max-md:hidden",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: adConfig.image,
              className: "h-[186px] w-auto border",
              alt: "Ad slot example"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(ImageZoomDialog, { image: adConfig.image })
    ] })
  ] });
}
function SectionList() {
  const sections = useAppearanceStore((s) => {
    var _a2;
    return (_a2 = s.config) == null ? void 0 : _a2.sections;
  });
  const sortedSection = useMemo(() => {
    if (!sections)
      return [];
    return Object.entries(sections || []).map(([key, value]) => {
      return {
        ...value,
        key
      };
    }).sort((a, b) => ((a == null ? void 0 : a.position) || 1) - ((b == null ? void 0 : b.position) || 1));
  }, [sections]);
  return /* @__PURE__ */ jsx(Fragment, { children: sortedSection.map((section) => {
    return /* @__PURE__ */ jsx(
      AppearanceButton,
      {
        to: section.key,
        elementType: NavLink,
        children: /* @__PURE__ */ jsx(Trans, { ...section.label })
      },
      section.key
    );
  }) });
}
const RoleIndexPageFilters = [
  {
    key: "type",
    label: message("Type"),
    description: message("Type of the role"),
    defaultOperator: FilterOperator.ne,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Sitewide"),
          value: "sitewide"
        },
        {
          key: "02",
          label: message("Workspace"),
          value: "workspace"
        }
      ]
    }
  },
  createdAtFilter({
    description: message("Date role was created")
  }),
  updatedAtFilter({
    description: message("Date role was last updated")
  })
];
const columnConfig$5 = [
  {
    key: "name",
    allowsSorting: true,
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Role" }),
    body: (role) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Trans, { message: role.name }) }),
      /* @__PURE__ */ jsx("div", { className: "text-muted text-xs overflow-x-hidden overflow-ellipsis", children: role.description ? /* @__PURE__ */ jsx(Trans, { message: role.description }) : void 0 })
    ] })
  },
  {
    key: "type",
    maxWidth: "max-w-100",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Type" }),
    body: (role) => /* @__PURE__ */ jsx(Trans, { message: role.type })
  },
  {
    key: "updated_at",
    maxWidth: "max-w-100",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (role) => /* @__PURE__ */ jsx(FormattedDate, { date: role.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    visibleInMode: "all",
    align: "end",
    width: "w-42 flex-shrink-0",
    body: (role) => {
      return /* @__PURE__ */ jsx(Link, { to: `${role.id}/edit`, children: /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(EditIcon, {}) }) });
    }
  }
];
function RolesIndexPage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "roles",
      title: /* @__PURE__ */ jsx(Trans, { message: "Roles" }),
      columns: columnConfig$5,
      filters: RoleIndexPageFilters,
      actions: /* @__PURE__ */ jsx(Actions$8, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: teamSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No roles have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching roles" })
        }
      )
    }
  );
}
function Actions$8() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DataTableExportCsvButton, { endpoint: "roles/csv/export" }),
    /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "new", children: /* @__PURE__ */ jsx(Trans, { message: "Add new role" }) })
  ] });
}
const Endpoint$5 = (id) => `roles/${id}`;
function useRole() {
  const { roleId } = useParams();
  return useQuery({
    queryKey: [Endpoint$5(roleId)],
    queryFn: () => fetchRole(roleId)
  });
}
function fetchRole(roleId) {
  return apiClient.get(Endpoint$5(roleId)).then((response) => response.data);
}
const Endpoint$4 = (id) => `roles/${id}`;
function useUpdateRole() {
  const { trans } = useTrans();
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (payload) => updateRole(payload),
    onSuccess: (response) => {
      toast(trans(message("Role updated")));
      queryClient.invalidateQueries({ queryKey: [Endpoint$4(response.role.id)] });
      queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("roles") });
      navigate("/admin/roles");
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function updateRole({ id, ...payload }) {
  return apiClient.put(Endpoint$4(id), payload).then((r) => r.data);
}
function CrupdateRolePageSettingsPanel({
  isInternal = false
}) {
  const { trans } = useTrans();
  const { workspaces } = useSettings();
  const { watch } = useFormContext();
  const watchedType = watch("type");
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        name: "name",
        className: "mb-20",
        required: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
        name: "description",
        inputElementType: "textarea",
        placeholder: trans(message("Role description...")),
        rows: 4,
        className: "mb-20"
      }
    ),
    workspaces.integrated && /* @__PURE__ */ jsxs(
      FormSelect,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Type" }),
        name: "type",
        selectionMode: "single",
        className: "mb-20",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether this role will be assigned to users globally on the site or only within workspaces." }),
        children: [
          /* @__PURE__ */ jsx(Item, { value: "sitewide", children: /* @__PURE__ */ jsx(Trans, { message: "Sitewide" }) }),
          /* @__PURE__ */ jsx(Item, { value: "workspace", children: /* @__PURE__ */ jsx(Trans, { message: "Workspace" }) })
        ]
      }
    ),
    !isInternal && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        FormSwitch,
        {
          name: "default",
          className: "mb-20",
          description: /* @__PURE__ */ jsx(Trans, { message: "Assign this role to new users automatically." }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Default" })
        }
      ),
      watchedType === "sitewide" && /* @__PURE__ */ jsx(
        FormSwitch,
        {
          name: "guests",
          description: /* @__PURE__ */ jsx(Trans, { message: "Assign this role to guests (not logged in users)." }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Guests" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "mb-10 mt-30 text-lg", children: /* @__PURE__ */ jsx(Trans, { message: "Permissions" }) }),
    /* @__PURE__ */ jsx(
      FormPermissionSelector,
      {
        name: "permissions",
        valueListKey: watchedType === "sitewide" ? "permissions" : "workspacePermissions"
      }
    )
  ] });
}
function SelectUserDialog({ onUserSelected }) {
  var _a2;
  const { close } = useDialogContext();
  const [searchTerm, setSearchTerm] = useState("");
  const { trans } = useTrans();
  const query = useNormalizedModels("normalized-models/user", {
    query: searchTerm,
    perPage: 14
  });
  const users = ((_a2 = query.data) == null ? void 0 : _a2.results) || [];
  const emptyStateMessage = /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      className: "pt-20",
      size: "sm",
      title: /* @__PURE__ */ jsx(Trans, { message: "No matching users" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Try another search query" }),
      image: /* @__PURE__ */ jsx(SvgImage, { src: teamSvg })
    }
  );
  const selectUser = (user) => {
    close();
    onUserSelected(user);
  };
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Select a user" }) }),
    /* @__PURE__ */ jsxs(DialogBody, { children: [
      /* @__PURE__ */ jsx(
        TextField,
        {
          autoFocus: true,
          className: "mb-20",
          startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
          placeholder: trans(message("Search for user by name or email")),
          value: searchTerm,
          onChange: (e) => {
            setSearchTerm(e.target.value);
          }
        }
      ),
      !query.isLoading && !users.length && emptyStateMessage,
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-10", children: users.map((user) => /* @__PURE__ */ jsx(
        UserListItem,
        {
          user,
          onUserSelected: selectUser
        },
        user.id
      )) })
    ] })
  ] });
}
function UserListItem({ user, onUserSelected }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex items-center gap-10 rounded p-10 outline-none ring-offset-4 hover:bg-hover focus-visible:ring",
      role: "button",
      tabIndex: 0,
      onClick: () => {
        onUserSelected(user);
      },
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onUserSelected(user);
        }
      },
      children: [
        /* @__PURE__ */ jsx(Avatar, { src: user.image }),
        /* @__PURE__ */ jsxs("div", { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden text-ellipsis", children: user.name }),
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden text-ellipsis text-muted", children: user.description })
        ] })
      ]
    },
    user.id
  );
}
function useRemoveUsersFromRole(role) {
  return useMutation({
    mutationFn: ({ userIds }) => removeUsersFromRole({ userIds, roleId: role.id }),
    onSuccess: (response, payload) => {
      toast(
        message("Removed [one 1 user|other :count users] from “{role}“", {
          values: { count: payload.userIds.length, role: role.name }
        })
      );
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function removeUsersFromRole({
  roleId,
  userIds
}) {
  return apiClient.post(`roles/${roleId}/remove-users`, { userIds }).then((r) => r.data);
}
function useAddUsersToRole(role) {
  return useMutation({
    mutationFn: ({ userIds }) => addUsersToRole({ userIds, roleId: role.id }),
    onSuccess: (response, payload) => {
      toast(
        message("Assigned [one 1 user|other :count users] to {role}", {
          values: { count: payload.userIds.length, role: role.name }
        })
      );
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function addUsersToRole({
  roleId,
  userIds
}) {
  return apiClient.post(`roles/${roleId}/add-users`, { userIds }).then((r) => r.data);
}
const userColumn = {
  key: "name",
  allowsSorting: true,
  sortingKey: "email",
  header: () => /* @__PURE__ */ jsx(Trans, { message: "User" }),
  body: (user) => /* @__PURE__ */ jsx(
    NameWithAvatar,
    {
      image: user.avatar,
      label: user.display_name,
      description: user.email
    }
  ),
  width: "col-w-3"
};
const desktopColumns = [
  userColumn,
  {
    key: "first_name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "First name" }),
    body: (user) => user.first_name
  },
  {
    key: "last_name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last name" }),
    body: (user) => user.last_name
  },
  {
    key: "created_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Assigned at" }),
    body: (user) => /* @__PURE__ */ jsx(FormattedDate, { date: user.created_at })
  }
];
const mobileColumns = [userColumn];
function EditRolePageUsersPanel({
  role
}) {
  const isMobile = useIsMobileMediaQuery();
  if (role.guests || role.type === "workspace") {
    return /* @__PURE__ */ jsx("div", { className: "pt-30 pb-10", children: /* @__PURE__ */ jsx(
      DataTableEmptyStateMessage,
      {
        image: teamSvg,
        title: /* @__PURE__ */ jsx(Trans, { message: "Users can't be assigned to this role" })
      }
    ) });
  }
  return /* @__PURE__ */ jsx(
    DataTable,
    {
      endpoint: "users",
      columns: isMobile ? mobileColumns : desktopColumns,
      queryParams: { roleId: `${role.id}` },
      actions: /* @__PURE__ */ jsx(AssignUserAction, { role }),
      selectedActions: /* @__PURE__ */ jsx(RemoveUsersAction, { role }),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: teamSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No users have been assigned to this role yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching users" })
        }
      )
    }
  );
}
function AssignUserAction({ role }) {
  const addUsers = useAddUsersToRole(role);
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", disabled: addUsers.isPending, children: /* @__PURE__ */ jsx(Trans, { message: "Assign user" }) }),
    /* @__PURE__ */ jsx(
      SelectUserDialog,
      {
        onUserSelected: (user) => {
          addUsers.mutate(
            { userIds: [user.id] },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: DatatableDataQueryKey("users", {
                    roleId: `${role.id}`
                  })
                });
              }
            }
          );
        }
      }
    )
  ] });
}
function RemoveUsersAction({ role }) {
  const removeUsers = useRemoveUsersFromRole(role);
  const { selectedRows } = useDataTable();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (isConfirmed) => {
        if (isConfirmed) {
          removeUsers.mutate(
            { userIds: selectedRows },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: DatatableDataQueryKey("users", {
                    roleId: `${role.id}`
                  })
                });
              }
            }
          );
        }
      },
      children: [
        /* @__PURE__ */ jsx(Button, { variant: "flat", color: "danger", disabled: removeUsers.isPending, children: /* @__PURE__ */ jsx(Trans, { message: "Remove users" }) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            title: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Remove [one 1 user|other :count users] from “:name“ role?",
                values: { count: selectedRows.length, name: role.name }
              }
            ),
            body: /* @__PURE__ */ jsx(Trans, { message: "This will permanently remove the users." }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Remove" }),
            isDanger: true
          }
        )
      ]
    }
  );
}
function EditRolePage() {
  const query = useRole();
  if (query.status !== "success") {
    return /* @__PURE__ */ jsx(FullPageLoader, {});
  }
  return /* @__PURE__ */ jsx(PageContent$7, { role: query.data.role });
}
function PageContent$7({ role }) {
  const form = useForm({ defaultValues: role });
  const updateRole2 = useUpdateRole();
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        updateRole2.mutate(values);
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Edit “:name“ role", values: { name: role.name } }),
      isLoading: updateRole2.isPending,
      children: /* @__PURE__ */ jsxs(Tabs, { isLazy: true, children: [
        /* @__PURE__ */ jsxs(TabList, { children: [
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Settings" }) }),
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx(Trans, { message: "Users" }) })
        ] }),
        /* @__PURE__ */ jsxs(TabPanels, { className: "pt-20", children: [
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(CrupdateRolePageSettingsPanel, { isInternal: role.internal }) }),
          /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(EditRolePageUsersPanel, { role }) })
        ] })
      ] })
    }
  );
}
const Endpoint$3 = "roles";
function useCreateRole(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => createRole(payload),
    onSuccess: () => {
      toast(trans(message("Created new role")));
      queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("roles") });
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function createRole({ id, ...payload }) {
  return apiClient.post(Endpoint$3, payload).then((r) => r.data);
}
function CreateRolePage() {
  const form = useForm({ defaultValues: { type: "sitewide" } });
  const createRole2 = useCreateRole(form);
  const navigate = useNavigate$1();
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        createRole2.mutate(values, {
          onSuccess: (response) => {
            navigate(`/admin/roles/${response.role.id}/edit`);
          }
        });
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Add new role" }),
      isLoading: createRole2.isPending,
      children: /* @__PURE__ */ jsx(CrupdateRolePageSettingsPanel, {})
    }
  );
}
const TagIndexPageFilters = (types) => {
  return [
    {
      key: "type",
      label: message("Type"),
      description: message("Type of the tag"),
      defaultOperator: FilterOperator.ne,
      control: {
        type: FilterControlType.Select,
        defaultValue: types[0].name,
        options: types.map((type) => ({
          key: type.name,
          label: message(type.name),
          value: type.name
        }))
      }
    },
    createdAtFilter({
      description: message("Date tag was created")
    }),
    updatedAtFilter({
      description: message("Date tag was last updated")
    })
  ];
};
const softwareEngineerSvg$2 = "/assets/software-engineer-ba026106.svg";
function CrupdateTagForm({
  form,
  onSubmit,
  formId
}) {
  const {
    tags: { types }
  } = useContext(SiteConfigContext);
  const watchedType = form.watch("type");
  const isSystem = !!types.find((t) => t.name === watchedType && t.system);
  return /* @__PURE__ */ jsxs(Form$1, { id: formId, form, onSubmit, children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Unique tag identifier." }),
        className: "mb-20",
        required: true,
        autoFocus: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "display_name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Display name" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "User friendly tag name." }),
        className: "mb-20"
      }
    ),
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Type" }),
        name: "type",
        selectionMode: "single",
        disabled: isSystem,
        children: types.filter((t) => !t.system).map((type) => /* @__PURE__ */ jsx(Item, { value: type.name, children: /* @__PURE__ */ jsx(Trans, { message: type.name }) }, type.name))
      }
    )
  ] });
}
function useCreateNewTag(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => createNewTag(props),
    onSuccess: () => {
      toast(trans(message("Tag created")));
      queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("tags") });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createNewTag(payload) {
  payload.name = slugifyString(payload.name);
  return apiClient.post("tags", payload).then((r) => r.data);
}
function CreateTagDialog() {
  const { close, formId } = useDialogContext();
  const {
    tags: { types }
  } = useContext(SiteConfigContext);
  const form = useForm({
    defaultValues: {
      type: types[0].name
    }
  });
  const createNewTag2 = useCreateNewTag(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new tag" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateTagForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          createNewTag2.mutate(values, {
            onSuccess: () => {
              close();
            }
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: createNewTag2.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
function useUpdateTag(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => updateTag(props),
    onSuccess: () => {
      toast(trans(message("Tag updated")));
      queryClient.invalidateQueries({ queryKey: DatatableDataQueryKey("tags") });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateTag({ id, ...payload }) {
  if (payload.name) {
    payload.name = slugifyString(payload.name);
  }
  return apiClient.put(`tags/${id}`, payload).then((r) => r.data);
}
function UpdateTagDialog({ tag }) {
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      id: tag.id,
      name: tag.name,
      display_name: tag.display_name,
      type: tag.type
    }
  });
  const updateTag2 = useUpdateTag(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update “:name“ tag", values: { name: tag.name } }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateTagForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          updateTag2.mutate(values, {
            onSuccess: () => {
              close();
            }
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: updateTag2.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const columnConfig$4 = [
  {
    key: "name",
    allowsSorting: true,
    visibleInMode: "all",
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (tag) => tag.name
  },
  {
    key: "type",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Type" }),
    body: (tag) => tag.type
  },
  {
    key: "display_name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Display name" }),
    body: (tag) => tag.display_name
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (tag) => /* @__PURE__ */ jsx(FormattedDate, { date: tag.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    visibleInMode: "all",
    body: (tag) => {
      return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(EditIcon, {}) }),
        /* @__PURE__ */ jsx(UpdateTagDialog, { tag })
      ] });
    }
  }
];
function TagIndexPage() {
  const { tags } = useContext(SiteConfigContext);
  const filters = useMemo(() => {
    return TagIndexPageFilters(tags.types);
  }, [tags.types]);
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "tags",
      title: /* @__PURE__ */ jsx(Trans, { message: "Tags" }),
      columns: columnConfig$4,
      filters,
      actions: /* @__PURE__ */ jsx(Actions$7, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: softwareEngineerSvg$2,
          title: /* @__PURE__ */ jsx(Trans, { message: "No tags have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching tags" })
        }
      )
    }
  );
}
function Actions$7() {
  return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new tag" }) }),
    /* @__PURE__ */ jsx(CreateTagDialog, {})
  ] }) });
}
const VisibilityIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" }),
  "VisibilityOutlined"
);
const uploadSvg = "/assets/upload-cabfc914.svg";
const FILE_ENTRY_TYPE_FILTER = {
  key: "type",
  label: message("Type"),
  description: message("Type of the file"),
  defaultOperator: FilterOperator.eq,
  control: {
    type: FilterControlType.Select,
    defaultValue: "05",
    options: [
      { key: "02", label: message("Text"), value: "text" },
      {
        key: "03",
        label: message("Audio"),
        value: "audio"
      },
      {
        key: "04",
        label: message("Video"),
        value: "video"
      },
      {
        key: "05",
        label: message("Image"),
        value: "image"
      },
      { key: "06", label: message("PDF"), value: "pdf" },
      {
        key: "07",
        label: message("Spreadsheet"),
        value: "spreadsheet"
      },
      {
        key: "08",
        label: message("Word Document"),
        value: "word"
      },
      {
        key: "09",
        label: message("Photoshop"),
        value: "photoshop"
      },
      {
        key: "10",
        label: message("Archive"),
        value: "archive"
      },
      {
        key: "11",
        label: message("Folder"),
        value: "folder"
      }
    ]
  }
};
const FILE_ENTRY_INDEX_FILTERS = [
  FILE_ENTRY_TYPE_FILTER,
  {
    key: "public",
    label: message("Visibility"),
    description: message("Whether file is publicly accessible"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        { key: "01", label: message("Private"), value: false },
        { key: "02", label: message("Public"), value: true }
      ]
    }
  },
  createdAtFilter({
    description: message("Date file was uploaded")
  }),
  updatedAtFilter({
    description: message("Date file was last changed")
  }),
  {
    key: "owner_id",
    label: message("Uploader"),
    description: message("User that this file was uploaded by"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL
    }
  }
];
const columnConfig$3 = [
  {
    key: "name",
    allowsSorting: true,
    visibleInMode: "all",
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (entry) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-hidden overflow-ellipsis", children: entry.name }),
      /* @__PURE__ */ jsx("div", { className: "text-muted text-xs overflow-x-hidden overflow-ellipsis", children: entry.file_name })
    ] })
  },
  {
    key: "owner_id",
    allowsSorting: true,
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Uploader" }),
    body: (entry) => {
      var _a2;
      const user = (_a2 = entry.users) == null ? void 0 : _a2[0];
      if (!user)
        return null;
      return /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          image: user.avatar,
          label: user.display_name,
          description: user.email
        }
      );
    }
  },
  {
    key: "type",
    width: "w-100 flex-shrink-0",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Type" }),
    body: (entry) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
      /* @__PURE__ */ jsx(FileTypeIcon, { type: entry.type, className: "w-24 h-24 overflow-hidden" }),
      /* @__PURE__ */ jsx("div", { className: "capitalize", children: entry.type })
    ] })
  },
  {
    key: "public",
    allowsSorting: true,
    width: "w-60 flex-shrink-0",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Public" }),
    body: (entry) => entry.public ? /* @__PURE__ */ jsx(CheckIcon, { className: "icon-md text-positive" }) : /* @__PURE__ */ jsx(CloseIcon, { className: "icon-md text-danger" })
  },
  {
    key: "file_size",
    allowsSorting: true,
    maxWidth: "max-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "File size" }),
    body: (entry) => /* @__PURE__ */ jsx(FormattedBytes, { bytes: entry.file_size })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (entry) => /* @__PURE__ */ jsx(FormattedDate, { date: entry.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    visibleInMode: "all",
    body: (entry) => {
      return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(VisibilityIcon, {}) }),
        /* @__PURE__ */ jsx(FilePreviewDialog, { entries: [entry] })
      ] });
    }
  }
];
function FileEntryIndexPage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "file-entries",
      title: /* @__PURE__ */ jsx(Trans, { message: "Uploaded files and folders" }),
      columns: columnConfig$3,
      filters: FILE_ENTRY_INDEX_FILTERS,
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: uploadSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "Nothing has been uploaded yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching files or folders" })
        }
      )
    }
  );
}
const SubscriptionIndexPageFilters = [
  {
    key: "ends_at",
    label: message("Status"),
    description: message("Whether subscription is active or cancelled"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "active",
      options: [
        {
          key: "active",
          label: message("Active"),
          value: { value: null, operator: FilterOperator.eq }
        },
        {
          key: "cancelled",
          label: message("Cancelled"),
          value: { value: null, operator: FilterOperator.ne }
        }
      ]
    }
  },
  {
    control: {
      type: FilterControlType.Select,
      defaultValue: "stripe",
      options: [
        {
          key: "stripe",
          label: message("Stripe"),
          value: "stripe"
        },
        {
          key: "paypal",
          label: message("PayPal"),
          value: "paypal"
        },
        {
          key: "none",
          label: message("None"),
          value: "none"
        }
      ]
    },
    key: "gateway_name",
    label: message("Gateway"),
    description: message(
      "With which payment provider was subscription created"
    ),
    defaultOperator: FilterOperator.eq
  },
  timestampFilter({
    key: "renews_at",
    label: message("Renew date"),
    description: message("Date subscription will renew")
  }),
  createdAtFilter({
    description: message("Date subscription was created")
  }),
  updatedAtFilter({
    description: message("Date subscription was last updated")
  })
];
const subscriptionsSvg = "/assets/subscriptions-7eacea42.svg";
function useUpdateSubscription(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => updateSubscription(props),
    onSuccess: () => {
      toast(trans(message("Subscription updated")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("billing/subscriptions")
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateSubscription({
  id,
  ...payload
}) {
  return apiClient.put(`billing/subscriptions/${id}`, payload).then((r) => r.data);
}
function CrupdateSubscriptionForm({
  form,
  onSubmit,
  formId
}) {
  var _a2, _b;
  const query = useProducts();
  const watchedProductId = form.watch("product_id");
  const selectedProduct = (_a2 = query.data) == null ? void 0 : _a2.products.find(
    (p) => p.id === watchedProductId
  );
  return /* @__PURE__ */ jsxs(Form$1, { id: formId, form, onSubmit, children: [
    /* @__PURE__ */ jsx(
      FormNormalizedModelField,
      {
        name: "user_id",
        className: "mb-20",
        endpoint: "normalized-models/user",
        label: /* @__PURE__ */ jsx(Trans, { message: "User" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        name: "product_id",
        selectionMode: "single",
        className: "mb-20",
        label: /* @__PURE__ */ jsx(Trans, { message: "Plan" }),
        children: (_b = query.data) == null ? void 0 : _b.products.filter((p) => !p.free).map((product) => /* @__PURE__ */ jsx(Item, { value: product.id, children: /* @__PURE__ */ jsx(Trans, { message: product.name }) }, product.id))
      }
    ),
    !(selectedProduct == null ? void 0 : selectedProduct.free) && /* @__PURE__ */ jsx(
      FormSelect,
      {
        name: "price_id",
        selectionMode: "single",
        className: "mb-20",
        label: /* @__PURE__ */ jsx(Trans, { message: "Price" }),
        children: selectedProduct == null ? void 0 : selectedProduct.prices.map((price) => /* @__PURE__ */ jsx(Item, { value: price.id, children: /* @__PURE__ */ jsx(FormattedPrice, { price }) }, price.id))
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        inputElementType: "textarea",
        rows: 3,
        name: "description",
        label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
        className: "mb-20"
      }
    ),
    /* @__PURE__ */ jsx(
      FormDatePicker,
      {
        className: "mb-20",
        name: "renews_at",
        granularity: "day",
        label: /* @__PURE__ */ jsx(Trans, { message: "Renews at" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "This will only change local records. User will continue to be billed on their original cycle on the payment gateway." })
      }
    ),
    /* @__PURE__ */ jsx(
      FormDatePicker,
      {
        className: "mb-20",
        name: "ends_at",
        granularity: "day",
        label: /* @__PURE__ */ jsx(Trans, { message: "Ends at" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "This will only change local records. User will continue to be billed on their original cycle on the payment gateway." })
      }
    )
  ] });
}
function UpdateSubscriptionDialog({
  subscription
}) {
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      id: subscription.id,
      product_id: subscription.product_id,
      price_id: subscription.price_id,
      description: subscription.description,
      renews_at: subscription.renews_at,
      ends_at: subscription.ends_at,
      user_id: subscription.user_id
    }
  });
  const updateSubscription2 = useUpdateSubscription(form);
  return /* @__PURE__ */ jsxs(Dialog, { size: "md", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update subscription" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateSubscriptionForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          updateSubscription2.mutate(values, {
            onSuccess: () => {
              close();
            }
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: updateSubscription2.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const endpoint$4 = "billing/subscriptions";
function useCreateSubscription(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => createNewSubscription(props),
    onSuccess: () => {
      toast(trans(message("Subscription created")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(endpoint$4)
      });
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createNewSubscription(payload) {
  return apiClient.post(endpoint$4, payload).then((r) => r.data);
}
function CreateSubscriptionDialog() {
  const { close, formId } = useDialogContext();
  const form = useForm({});
  const createSubscription = useCreateSubscription(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new subscription" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateSubscriptionForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          createSubscription.mutate(values, {
            onSuccess: () => {
              close();
            }
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: createSubscription.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const PauseIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" }),
  "PauseOutlined"
);
const PlayArrowIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M10 8.64 15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" }),
  "PlayArrowOutlined"
);
const endpoint$3 = "billing/subscriptions";
const columnConfig$2 = [
  {
    key: "user_id",
    allowsSorting: true,
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Customer" }),
    body: (subscription) => subscription.user && /* @__PURE__ */ jsx(
      NameWithAvatar,
      {
        image: subscription.user.avatar,
        label: subscription.user.display_name,
        description: subscription.user.email
      }
    )
  },
  {
    key: "status",
    width: "w-100 flex-shrink-0",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Status" }),
    body: (subscription) => /* @__PURE__ */ jsx(
      Chip,
      {
        size: "xs",
        color: subscription.valid ? "positive" : void 0,
        radius: "rounded",
        className: "w-max",
        children: subscription.gateway_status
      }
    )
  },
  {
    key: "product_id",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Plan" }),
    body: (subscription) => {
      var _a2;
      return (_a2 = subscription.product) == null ? void 0 : _a2.name;
    }
  },
  {
    key: "gateway_name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Gateway" }),
    body: (subscription) => /* @__PURE__ */ jsx("span", { className: "capitalize", children: subscription.gateway_name })
  },
  {
    key: "renews_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Renews at" }),
    body: (subscription) => /* @__PURE__ */ jsx(FormattedDate, { date: subscription.renews_at })
  },
  {
    key: "ends_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Ends at" }),
    body: (subscription) => /* @__PURE__ */ jsx(FormattedDate, { date: subscription.ends_at })
  },
  {
    key: "created_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Created at" }),
    body: (subscription) => /* @__PURE__ */ jsx(FormattedDate, { date: subscription.created_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    visibleInMode: "all",
    width: "w-128 flex-shrink-0",
    body: (subscription) => {
      return /* @__PURE__ */ jsx(SubscriptionActions, { subscription });
    }
  }
];
function SubscriptionsIndexPage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: endpoint$3,
      title: /* @__PURE__ */ jsx(Trans, { message: "Subscriptions" }),
      columns: columnConfig$2,
      filters: SubscriptionIndexPageFilters,
      actions: /* @__PURE__ */ jsx(PageActions, {}),
      enableSelection: false,
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      queryParams: { with: "product" },
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: subscriptionsSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No subscriptions have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching subscriptions" })
        }
      )
    }
  );
}
function PageActions() {
  return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add new subscription" }) }),
    /* @__PURE__ */ jsx(CreateSubscriptionDialog, {})
  ] }) });
}
function SubscriptionActions({ subscription }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
      /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(EditIcon, {}) }),
      /* @__PURE__ */ jsx(UpdateSubscriptionDialog, { subscription })
    ] }),
    subscription.cancelled && subscription.on_grace_period ? /* @__PURE__ */ jsx(ResumeSubscriptionButton, { subscription }) : null,
    subscription.active ? /* @__PURE__ */ jsx(SuspendSubscriptionButton, { subscription }) : null,
    /* @__PURE__ */ jsx(CancelSubscriptionButton, { subscription })
  ] });
}
function SuspendSubscriptionButton({ subscription }) {
  const cancelSubscription = useCancelSubscription();
  const handleSuspendSubscription = () => {
    cancelSubscription.mutate(
      { subscriptionId: subscription.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: DatatableDataQueryKey(endpoint$3)
          });
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (confirmed) => {
        if (confirmed) {
          handleSuspendSubscription();
        }
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Cancel subscription" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            className: "text-muted",
            disabled: cancelSubscription.isPending,
            children: /* @__PURE__ */ jsx(PauseIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            title: /* @__PURE__ */ jsx(Trans, { message: "Cancel subscription" }),
            body: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to cancel this subscription?" }),
              /* @__PURE__ */ jsx("div", { className: "mt-10 text-sm font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "This will put user on grace period until their next scheduled renewal date. Subscription can be renewed until that date by user or from admin area." }) })
            ] }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Confirm" })
          }
        )
      ]
    }
  );
}
function ResumeSubscriptionButton({ subscription }) {
  const resumeSubscription = useResumeSubscription();
  const handleResumeSubscription = () => {
    resumeSubscription.mutate(
      { subscriptionId: subscription.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: DatatableDataQueryKey(endpoint$3)
          });
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (confirmed) => {
        if (confirmed) {
          handleResumeSubscription();
        }
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Renew subscription" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            className: "text-muted",
            onClick: handleResumeSubscription,
            disabled: resumeSubscription.isPending,
            children: /* @__PURE__ */ jsx(PlayArrowIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            title: /* @__PURE__ */ jsx(Trans, { message: "Resume subscription" }),
            body: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to resume this subscription?" }),
              /* @__PURE__ */ jsx("div", { className: "mt-10 text-sm font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "This will put user on their original plan and billing cycle." }) })
            ] }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Confirm" })
          }
        )
      ]
    }
  );
}
function CancelSubscriptionButton({ subscription }) {
  const cancelSubscription = useCancelSubscription();
  const handleDeleteSubscription = () => {
    cancelSubscription.mutate(
      { subscriptionId: subscription.id, delete: true },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: DatatableDataQueryKey(endpoint$3)
          });
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (confirmed) => {
        if (confirmed) {
          handleDeleteSubscription();
        }
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Delete subscription" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            className: "text-muted",
            disabled: cancelSubscription.isPending,
            children: /* @__PURE__ */ jsx(CloseIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            isDanger: true,
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete subscription" }),
            body: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this subscription?" }),
              /* @__PURE__ */ jsx("div", { className: "mt-10 text-sm font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "This will permanently delete the subscription and immediately cancel it on billing gateway. Subscription will not be renewable anymore." }) })
            ] }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Confirm" })
          }
        )
      ]
    }
  );
}
const SyncIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" }),
  "SyncOutlined"
);
function useSyncProducts() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: () => syncPlans(),
    onSuccess: () => {
      toast(trans(message("Plans synced")));
    },
    onError: (err) => showHttpErrorToast(err, message("Could not sync plans"))
  });
}
function syncPlans() {
  return apiClient.post("billing/products/sync").then((r) => r.data);
}
const endpoint$2 = (id) => `billing/products/${id}`;
function useDeleteProduct() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => updateProduct$1(payload),
    onSuccess: () => {
      toast(trans(message("Plan deleted")));
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("billing/products")
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function updateProduct$1({ productId }) {
  return apiClient.delete(endpoint$2(productId)).then((r) => r.data);
}
const PlansIndexPageFilters = [
  {
    key: "subscriptions",
    label: message("Subscriptions"),
    description: message("Whether plan has any active subscriptions"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Has active subscriptions"),
          value: { value: "*", operator: FilterOperator.has }
        },
        {
          key: "02",
          label: message("Does not have active subscriptions"),
          value: { value: "*", operator: FilterOperator.doesntHave }
        }
      ]
    }
  },
  createdAtFilter({
    description: message("Date plan was created")
  }),
  updatedAtFilter({
    description: message("Date plan was last updated")
  })
];
const columnConfig$1 = [
  {
    key: "name",
    allowsSorting: true,
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (product) => {
      const price = product.prices[0];
      return /* @__PURE__ */ jsx(
        NameWithAvatar,
        {
          label: product.name,
          description: product.free ? /* @__PURE__ */ jsx(Trans, { message: "Free" }) : /* @__PURE__ */ jsx(FormattedPrice, { price })
        }
      );
    }
  },
  {
    key: "created_at",
    allowsSorting: true,
    maxWidth: "max-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Created" }),
    body: (product) => /* @__PURE__ */ jsx(FormattedDate, { date: product.created_at })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    maxWidth: "max-w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (product) => /* @__PURE__ */ jsx(FormattedDate, { date: product.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    visibleInMode: "all",
    hideHeader: true,
    align: "end",
    maxWidth: "max-w-84",
    body: (product) => {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            className: "text-muted",
            elementType: Link,
            to: `/admin/plans/${product.id}/edit`,
            children: /* @__PURE__ */ jsx(EditIcon, {})
          }
        ),
        /* @__PURE__ */ jsx(DeleteProductButton, { product })
      ] });
    }
  }
];
function PlansIndexPage() {
  const navigate = useNavigate$1();
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "billing/products",
      title: /* @__PURE__ */ jsx(Trans, { message: "Subscription plans" }),
      columns: columnConfig$1,
      actions: /* @__PURE__ */ jsx(Actions$6, {}),
      enableSelection: false,
      filters: PlansIndexPageFilters,
      onRowAction: (item) => {
        navigate(`/admin/plans/${item.id}/edit`);
      },
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: softwareEngineerSvg$2,
          title: /* @__PURE__ */ jsx(Trans, { message: "No plans have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching plans" })
        }
      )
    }
  );
}
function DeleteProductButton({ product }) {
  const deleteProduct = useDeleteProduct();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (confirmed) => {
        if (confirmed) {
          deleteProduct.mutate({ productId: product.id });
        }
      },
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Delete plan" }), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "md",
            className: "text-muted",
            disabled: deleteProduct.isPending,
            children: /* @__PURE__ */ jsx(DeleteIcon, {})
          }
        ) }),
        /* @__PURE__ */ jsx(
          ConfirmationDialog,
          {
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete plan" }),
            body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this plan?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ]
    }
  );
}
function Actions$6() {
  const syncPlans2 = useSyncProducts();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Sync plans with Stripe & PayPal" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        color: "primary",
        variant: "outline",
        size: "sm",
        disabled: syncPlans2.isPending,
        onClick: () => {
          syncPlans2.mutate();
        },
        children: /* @__PURE__ */ jsx(SyncIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "/admin/plans/new", children: /* @__PURE__ */ jsx(Trans, { message: "Add new plan" }) })
  ] });
}
const Endpoint$2 = (id) => `billing/products/${id}`;
function useProduct() {
  const { productId } = useParams();
  return useQuery({
    queryKey: [Endpoint$2(productId)],
    queryFn: () => fetchProduct(productId)
  });
}
function fetchProduct(productId) {
  return apiClient.get(Endpoint$2(productId)).then((response) => response.data);
}
const BillingPeriodPresets = [
  {
    key: "day1",
    label: message("Daily"),
    interval: "day",
    interval_count: 1
  },
  {
    key: "week1",
    label: message("Weekly"),
    interval: "week",
    interval_count: 1
  },
  {
    key: "month1",
    label: message("Monthly"),
    interval: "month",
    interval_count: 1
  },
  {
    key: "month3",
    label: message("Every 3 months"),
    interval: "month",
    interval_count: 3
  },
  {
    key: "month6",
    label: message("Every 6 months"),
    interval: "month",
    interval_count: 6
  },
  {
    key: "year1",
    label: message("Yearly"),
    interval: "year",
    interval_count: 1
  },
  {
    key: "custom",
    label: message("Custom"),
    interval: null,
    interval_count: null
  }
];
function PriceForm({ index, onRemovePrice }) {
  const { trans } = useTrans();
  const query = useValueLists(["currencies"]);
  const currencies = useMemo(() => {
    var _a2;
    return ((_a2 = query.data) == null ? void 0 : _a2.currencies) ? Object.values(query.data.currencies) : [];
  }, [query.data]);
  const { watch, getValues } = useFormContext();
  const isNewProduct = !watch("id");
  const isNewPrice = watch(`prices.${index}.id`) == null;
  const subscriberCount = watch(`prices.${index}.subscriptions_count`) || 0;
  const [billingPeriodPreset, setBillingPeriodPreset] = useState(() => {
    const interval = getValues(`prices.${index}.interval`);
    const intervalCount = getValues(`prices.${index}.interval_count`);
    const preset = BillingPeriodPresets.find(
      (p) => p.key === `${interval}${intervalCount}`
    );
    return preset ? preset.key : "custom";
  });
  const allowPriceChanges = isNewProduct || isNewPrice || !subscriberCount;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !allowPriceChanges && /* @__PURE__ */ jsx("p", { className: "text-muted text-sm max-w-500 mb-20", children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "This price can't modified or deleted, because it has [one 1 subscriber|other :count subscribers]. You can instead add a new price.",
        values: { count: subscriberCount }
      }
    ) }),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        required: true,
        disabled: !allowPriceChanges,
        label: /* @__PURE__ */ jsx(Trans, { message: "Amount" }),
        type: "number",
        min: 0.1,
        step: 0.01,
        name: `prices.${index}.amount`,
        className: "mb-20"
      }
    ),
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        required: true,
        disabled: !allowPriceChanges,
        label: /* @__PURE__ */ jsx(Trans, { message: "Currency" }),
        name: `prices.${index}.currency`,
        items: currencies,
        showSearchField: true,
        searchPlaceholder: trans(message("Search currencies")),
        selectionMode: "single",
        className: "mb-20",
        children: (item) => /* @__PURE__ */ jsx(
          Item,
          {
            value: item.code,
            children: `${item.code}: ${item.name}`
          },
          item.code
        )
      }
    ),
    /* @__PURE__ */ jsx(
      BillingPeriodSelect,
      {
        disabled: !allowPriceChanges,
        index,
        value: billingPeriodPreset,
        onValueChange: setBillingPeriodPreset
      }
    ),
    billingPeriodPreset === "custom" && /* @__PURE__ */ jsx(CustomBillingPeriodField, { disabled: !allowPriceChanges, index }),
    /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "xs",
        variant: "outline",
        color: "danger",
        disabled: !allowPriceChanges,
        onClick: () => {
          onRemovePrice();
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Delete price" })
      }
    ) })
  ] });
}
function BillingPeriodSelect({
  index,
  value,
  onValueChange,
  disabled
}) {
  const { setValue: setFormValue } = useFormContext();
  return /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      label: /* @__PURE__ */ jsx(Trans, { message: "Billing period" }),
      disabled,
      className: "mb-20",
      selectionMode: "single",
      selectedValue: value,
      onSelectionChange: (value2) => {
        onValueChange(value2);
        if (value2 === "custom")
          ;
        else {
          const preset = BillingPeriodPresets.find((p) => p.key === value2);
          if (preset) {
            setFormValue(
              `prices.${index}.interval`,
              preset.interval
            );
            setFormValue(
              `prices.${index}.interval_count`,
              preset.interval_count
            );
          }
        }
      },
      children: BillingPeriodPresets.map((preset) => /* @__PURE__ */ jsx(Item, { value: preset.key, children: /* @__PURE__ */ jsx(Trans, { ...preset.label }) }, preset.key))
    }
  );
}
function CustomBillingPeriodField({
  index,
  disabled
}) {
  const { watch } = useFormContext();
  const interval = watch(`prices.${index}.interval`);
  let maxIntervalCount;
  if (interval === "day") {
    maxIntervalCount = 365;
  } else if (interval === "week") {
    maxIntervalCount = 52;
  } else {
    maxIntervalCount = 12;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex border rounded w-min", children: [
    /* @__PURE__ */ jsx("div", { className: "px-18 flex items-center text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Every" }) }),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        inputShadow: "shadow-none",
        inputBorder: "border-none",
        className: "border-l border-r w-80",
        name: `prices.${index}.interval_count`,
        type: "number",
        min: 1,
        max: maxIntervalCount,
        disabled,
        required: true
      }
    ),
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        inputShadow: "shadow-none",
        inputBorder: "border-none",
        name: `prices.${index}.interval`,
        selectionMode: "single",
        disabled,
        children: [
          /* @__PURE__ */ jsx(Item, { value: "day", children: /* @__PURE__ */ jsx(Trans, { message: "Days" }) }),
          /* @__PURE__ */ jsx(Item, { value: "week", children: /* @__PURE__ */ jsx(Trans, { message: "Weeks" }) }),
          /* @__PURE__ */ jsx(Item, { value: "month", children: /* @__PURE__ */ jsx(Trans, { message: "Months" }) })
        ]
      }
    )
  ] });
}
function CrupdatePlanForm() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        className: "mb-20",
        required: true,
        autoFocus: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "description",
        label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
        className: "mb-20",
        inputElementType: "textarea",
        rows: 4
      }
    ),
    /* @__PURE__ */ jsxs(
      FormSelect,
      {
        name: "position",
        selectionMode: "single",
        label: /* @__PURE__ */ jsx(Trans, { message: "Position in pricing table" }),
        className: "mb-20",
        children: [
          /* @__PURE__ */ jsx(Item, { value: 0, children: /* @__PURE__ */ jsx(Trans, { message: "First" }) }),
          /* @__PURE__ */ jsx(Item, { value: 1, children: /* @__PURE__ */ jsx(Trans, { message: "Second" }) }),
          /* @__PURE__ */ jsx(Item, { value: 2, children: /* @__PURE__ */ jsx(Trans, { message: "Third" }) }),
          /* @__PURE__ */ jsx(Item, { value: 3, children: /* @__PURE__ */ jsx(Trans, { message: "Fourth" }) }),
          /* @__PURE__ */ jsx(Item, { value: 4, children: /* @__PURE__ */ jsx(Trans, { message: "Fifth" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      FormFileSizeField,
      {
        className: "mb-30",
        name: "available_space",
        label: /* @__PURE__ */ jsx(Trans, { message: "Allowed storage space" }),
        description: /* @__PURE__ */ jsx(
          Trans,
          {
            values: {
              a: (parts) => /* @__PURE__ */ jsx(
                Link,
                {
                  className: LinkStyle,
                  target: "_blank",
                  to: "/admin/settings/uploading",
                  children: parts
                }
              )
            },
            message: "Total storage space all user uploads are allowed to take up."
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "recommended",
        className: "mb-20",
        description: /* @__PURE__ */ jsx(Trans, { message: "Plan will be displayed more prominently on pricing page." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Recommend" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "hidden",
        className: "mb-20",
        description: /* @__PURE__ */ jsx(Trans, { message: "Plan will not be shown on pricing or upgrade pages." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Hidden" })
      }
    ),
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "free",
        className: "mb-20",
        description: /* @__PURE__ */ jsx(Trans, { message: "Will be assigned to all users, if they are not subscribed already." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Free" })
      }
    ),
    /* @__PURE__ */ jsx(Header, { children: /* @__PURE__ */ jsx(Trans, { message: "Feature list" }) }),
    /* @__PURE__ */ jsx(FeatureListForm, {}),
    /* @__PURE__ */ jsx(PricingListForm, {}),
    /* @__PURE__ */ jsx(Header, { children: /* @__PURE__ */ jsx(Trans, { message: "Permissions" }) }),
    /* @__PURE__ */ jsx(FormPermissionSelector, { name: "permissions" })
  ] });
}
function Header({ children }) {
  return /* @__PURE__ */ jsx("h2", { className: "mt-40 mb-20 text-base font-semibold", children });
}
function FeatureListForm() {
  const { fields, append, remove } = useFieldArray({
    name: "feature_list"
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    fields.map((field, index) => {
      return /* @__PURE__ */ jsxs("div", { className: "flex gap-10 mb-10", children: [
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: `feature_list.${index}.value`,
            size: "sm",
            className: "flex-auto"
          }
        ),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            size: "sm",
            color: "primary",
            className: "flex-shrink-0",
            onClick: () => {
              remove(index);
            },
            children: /* @__PURE__ */ jsx(CloseIcon, {})
          }
        )
      ] }, field.id);
    }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "text",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        size: "xs",
        onClick: () => {
          append({ value: "" });
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Add another line" })
      }
    )
  ] });
}
function PricingListForm() {
  var _a2;
  const {
    watch,
    formState: { errors }
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "prices",
    keyName: "key"
  });
  if (watch("free")) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, { children: /* @__PURE__ */ jsx(Trans, { message: "Pricing" }) }),
    ((_a2 = errors.prices) == null ? void 0 : _a2.message) && /* @__PURE__ */ jsx("div", { className: "text-sm text-danger mb-20", children: errors.prices.message }),
    /* @__PURE__ */ jsx(Accordion, { variant: "outline", className: "mb-10", children: fields.map((field, index) => /* @__PURE__ */ jsx(
      AccordionItem,
      {
        label: /* @__PURE__ */ jsx(FormattedPrice, { price: field }),
        children: /* @__PURE__ */ jsx(
          PriceForm,
          {
            index,
            onRemovePrice: () => {
              remove(index);
            }
          }
        )
      },
      field.key
    )) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "text",
        color: "primary",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        size: "xs",
        onClick: () => {
          append({
            currency: "USD",
            amount: 1,
            interval_count: 1,
            interval: "month"
          });
        },
        children: /* @__PURE__ */ jsx(Trans, { message: "Add another price" })
      }
    )
  ] });
}
const Endpoint$1 = (id) => `billing/products/${id}`;
function useUpdateProduct(form) {
  const { trans } = useTrans();
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (payload) => updateProduct(payload),
    onSuccess: (response) => {
      toast(trans(message("Plan updated")));
      queryClient.invalidateQueries({
        queryKey: [Endpoint$1(response.product.id)]
      });
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("billing/products")
      });
      navigate("/admin/plans");
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateProduct({
  id,
  ...payload
}) {
  const backendPayload = {
    ...payload,
    feature_list: payload.feature_list.map((feature) => feature.value)
  };
  return apiClient.put(Endpoint$1(id), backendPayload).then((r) => r.data);
}
function EditPlanPage() {
  const query = useProduct();
  if (query.status !== "success") {
    return /* @__PURE__ */ jsx(FullPageLoader, {});
  }
  return /* @__PURE__ */ jsx(PageContent$6, { product: query.data.product });
}
function PageContent$6({ product }) {
  const form = useForm({
    defaultValues: {
      ...product,
      feature_list: product.feature_list.map((f) => ({ value: f }))
    }
  });
  const updateProduct2 = useUpdateProduct(form);
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        updateProduct2.mutate(values);
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Edit “:name“ plan", values: { name: product.name } }),
      isLoading: updateProduct2.isPending,
      children: /* @__PURE__ */ jsx(CrupdatePlanForm, {})
    }
  );
}
const endpoint$1 = "billing/products";
function useCreateProduct(form) {
  const { trans } = useTrans();
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (payload) => createProduct(payload),
    onSuccess: () => {
      toast(trans(message("Plan created")));
      queryClient.invalidateQueries({ queryKey: [endpoint$1] });
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("billing/products")
      });
      navigate("/admin/plans");
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createProduct(payload) {
  const backendPayload = {
    ...payload,
    feature_list: payload.feature_list.map((feature) => feature.value)
  };
  return apiClient.post(endpoint$1, backendPayload).then((r) => r.data);
}
function CreatePlanPage() {
  const form = useForm({
    defaultValues: {
      free: false,
      recommended: false
    }
  });
  const createProduct2 = useCreateProduct(form);
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      form,
      onSubmit: (values) => {
        createProduct2.mutate(values);
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Create new plan" }),
      isLoading: createProduct2.isPending,
      children: /* @__PURE__ */ jsx(CrupdatePlanForm, {})
    }
  );
}
function GdprSettings() {
  return /* @__PURE__ */ jsxs(
    SettingsPanel,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "GDPR" }),
      description: /* @__PURE__ */ jsx(Trans, { message: "Configure settings related to EU General Data Protection Regulation." }),
      children: [
        /* @__PURE__ */ jsx(CookieNoticeSection, {}),
        /* @__PURE__ */ jsx(SettingsSeparator, {}),
        /* @__PURE__ */ jsx(RegistrationPoliciesSection, {})
      ]
    }
  );
}
function CookieNoticeSection() {
  const { watch } = useFormContext();
  const noticeEnabled = watch("client.cookie_notice.enable");
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      FormSwitch,
      {
        name: "client.cookie_notice.enable",
        className: "mb-20",
        description: /* @__PURE__ */ jsx(Trans, { message: "Whether cookie notice should be shown automatically to users from EU until it is accepted." }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Enable cookie notice" })
      }
    ),
    noticeEnabled && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-20 border-b pb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-20 border-b pb-10 text-sm font-medium", children: /* @__PURE__ */ jsx(Trans, { message: "Information button" }) }),
        /* @__PURE__ */ jsx(
          MenuItemForm,
          {
            hideRoleAndPermissionFields: true,
            formPathPrefix: "client.cookie_notice.button"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        FormSelect,
        {
          name: "client.cookie_notice.position",
          selectionMode: "single",
          label: /* @__PURE__ */ jsx(Trans, { message: "Cookie notice position" }),
          className: "mb-20",
          children: [
            /* @__PURE__ */ jsx(Item, { value: "top", children: /* @__PURE__ */ jsx(Trans, { message: "Top" }) }),
            /* @__PURE__ */ jsx(Item, { value: "bottom", children: /* @__PURE__ */ jsx(Trans, { message: "Bottom" }) })
          ]
        }
      )
    ] })
  ] });
}
function RegistrationPoliciesSection() {
  const { fields, append, remove } = useFieldArray({
    name: "client.registration.policies"
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Registration policies" }) }),
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "Create policies that will be shown on registration page. User will be required to accept them by toggling a checkbox." }) }),
    /* @__PURE__ */ jsx(Accordion, { className: "mt-16", variant: "outline", children: fields.map((field, index) => /* @__PURE__ */ jsx(
      AccordionItem,
      {
        label: field.label,
        chevronPosition: "left",
        endAppend: /* @__PURE__ */ jsx(
          IconButton,
          {
            variant: "text",
            color: "danger",
            size: "sm",
            onClick: () => {
              remove(index);
            },
            children: /* @__PURE__ */ jsx(CloseIcon, {})
          }
        ),
        children: /* @__PURE__ */ jsx(
          MenuItemForm,
          {
            hideRoleAndPermissionFields: true,
            formPathPrefix: `client.register_policies.${index}`
          }
        )
      },
      field.id
    )) }),
    /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "modal",
        onClose: (value) => {
          if (value) {
            append(value);
          }
        },
        children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "mt-12",
              variant: "link",
              color: "primary",
              startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
              size: "xs",
              children: /* @__PURE__ */ jsx(Trans, { message: "Add another policy" })
            }
          ),
          /* @__PURE__ */ jsx(AddMenuItemDialog, { title: /* @__PURE__ */ jsx(Trans, { message: "Add policy" }) })
        ]
      }
    )
  ] });
}
const fetchCategoriesQueryKey = (params) => [
  "hc",
  "categories",
  "admin",
  params
];
function useCategories(params) {
  return useQuery({
    queryKey: fetchCategoriesQueryKey(params),
    queryFn: () => fetchCategories(params)
  });
}
function fetchCategories(params) {
  return apiClient.get(`hc/categories`, {
    params: { paginate: "simple", perPage: 30, ...params }
  }).then((response) => response.data);
}
function useHcCategoryManagerParams() {
  const { categoryId } = useParams();
  return categoryId ? { type: "section", parentId: categoryId } : { type: "category" };
}
function useCreateCategory(form) {
  const { trans } = useTrans();
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (props) => createCategory$1(props),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["hc", "categories"] });
      const part = response.category.is_section ? "sections" : "categories";
      navigate(`/admin/hc/arrange/${part}/${response.category.id}`);
      toast(
        trans(
          response.category.is_section ? message("Category created") : message("Section created")
        )
      );
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createCategory$1(payload) {
  return apiClient.post("hc/categories", payload).then((r) => r.data);
}
function RoleSelector({
  name,
  label,
  description,
  className,
  defaultItem
}) {
  const { data } = useValueLists(["roles"]);
  const roles = (data == null ? void 0 : data.roles) || [];
  if (!roles.length)
    return /* @__PURE__ */ jsx("div", { className: clsx(className, "h-92") });
  return /* @__PURE__ */ jsxs(
    FormSelect,
    {
      background: "bg",
      label,
      name,
      description,
      className,
      valueClassName: "first:capitalize",
      selectionMode: "single",
      children: [
        defaultItem,
        roles.map((role) => /* @__PURE__ */ jsx(Item, { value: role.id, capitalizeFirst: true, children: /* @__PURE__ */ jsx(Trans, { message: role.name }) }, role.id))
      ]
    }
  );
}
function VisibleToField({ className, description }) {
  return /* @__PURE__ */ jsx(
    RoleSelector,
    {
      className,
      name: "visible_to_role",
      label: /* @__PURE__ */ jsx(Trans, { message: "Visible to" }),
      description,
      defaultItem: /* @__PURE__ */ jsx(Item, { value: null, children: /* @__PURE__ */ jsx(Trans, { message: "Everyone" }) }, "everyone-default")
    }
  );
}
function ManagedByField({ className, description }) {
  return /* @__PURE__ */ jsx(
    RoleSelector,
    {
      className,
      name: "managed_by_role",
      label: /* @__PURE__ */ jsx(Trans, { message: "Managed by" }),
      description,
      defaultItem: /* @__PURE__ */ jsx(Item, { value: void 0, children: /* @__PURE__ */ jsx(Trans, { message: "Admins" }) }, "admins-default")
    }
  );
}
function CrupdateCategoryForm({
  form,
  onSubmit,
  formId,
  hideParentId
}) {
  const { data } = useCategories({ type: "category", compact: true });
  return /* @__PURE__ */ jsxs(Form$1, { id: formId, form, onSubmit, children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        className: "mb-24",
        required: true,
        autoFocus: true
      }
    ),
    /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
      FormImageSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Image" }),
        name: "image",
        diskPrefix: "category_images",
        className: "mb-24"
      }
    ) }),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "description",
        label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
        inputElementType: "textarea",
        rows: 4,
        className: "mb-24"
      }
    ),
    hideParentId && /* @__PURE__ */ jsx(
      FormSelect,
      {
        name: "parent_id",
        selectionMode: "single",
        label: "Parent category",
        className: "mb-24",
        children: data == null ? void 0 : data.pagination.data.map((category) => /* @__PURE__ */ jsx(Item, { value: category.id, children: /* @__PURE__ */ jsx(Trans, { message: category.name }) }, category.id))
      }
    ),
    /* @__PURE__ */ jsx(
      VisibleToField,
      {
        className: "mb-24",
        description: /* @__PURE__ */ jsx(Trans, { message: "Control who can see this category in help center" })
      }
    ),
    /* @__PURE__ */ jsx(
      ManagedByField,
      {
        description: /* @__PURE__ */ jsx(Trans, { message: "Control who can edit this category" })
      }
    )
  ] });
}
function CreateCategoryDialog({ parentId }) {
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      parent_id: parentId ? parseInt(parentId) : void 0
    }
  });
  const createCategory2 = useCreateCategory(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: parentId ? /* @__PURE__ */ jsx(Trans, { message: "Add new section" }) : /* @__PURE__ */ jsx(Trans, { message: "Add new category" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateCategoryForm,
      {
        hideParentId: !!parentId,
        formId,
        form,
        onSubmit: (values) => {
          createCategory2.mutate(values, {
            onSuccess: () => close()
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: createCategory2.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Create" })
        }
      )
    ] })
  ] });
}
function HcManagerLayout({ actionButton, query, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "p-12 md:p-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-18", children: [
      /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Help center" }) }),
      /* @__PURE__ */ jsxs("div", { className: "items-end justify-between gap-24 md:flex", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-light", children: /* @__PURE__ */ jsx(Trans, { message: "Help center" }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "Arrange help center categories, sections and articles." }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "max-md:mt-12", children: actionButton })
      ] })
    ] }),
    /* @__PURE__ */ jsx("main", { children: query.data ? children(query.data) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" }) })
  ] });
}
function HcManagerBreadcrumb({ category, section }) {
  const navigate = useNavigate$1();
  if (!category && !section)
    return null;
  return /* @__PURE__ */ jsxs(Breadcrumb, { size: "sm", className: "-mx-8", children: [
    /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate("/admin/hc/arrange"), children: /* @__PURE__ */ jsx(Trans, { message: "Categories" }) }),
    category && /* @__PURE__ */ jsx(
      BreadcrumbItem,
      {
        className: !section ? "text-primary" : void 0,
        onSelected: () => navigate(`/admin/hc/arrange/categories/${category.id}`),
        children: /* @__PURE__ */ jsx(Trans, { message: category.name })
      }
    ),
    section && /* @__PURE__ */ jsx(BreadcrumbItem, { className: "text-primary", children: /* @__PURE__ */ jsx(Trans, { message: section.name }) })
  ] });
}
function HcManagerTitle({ children }) {
  return /* @__PURE__ */ jsx("h2", { className: "mb-10 mt-20 text-sm font-semibold text-muted", children });
}
function useIsTouchDevice() {
  return useMediaQuery("((pointer: coarse))");
}
function useReorderCategories(type) {
  const queryKey = fetchCategoriesQueryKey(useHcCategoryManagerParams());
  return useMutation({
    mutationFn: (payload) => {
      const ids = queryClient.getQueryData(queryKey).pagination.data.map((c) => c.id);
      return reorder$1({
        parentId: payload.parentId,
        ids
      });
    },
    onMutate: async ({ oldIndex, newIndex }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousResponse = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (prev) => {
        const newData = { ...prev, pagination: { ...prev.pagination } };
        newData.pagination.data = moveItemInNewArray(
          newData.pagination.data,
          oldIndex,
          newIndex
        );
        return newData;
      });
      return { previousResponse };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["hc", "categories"] });
    },
    onError: (err, _, context) => {
      showHttpErrorToast(err);
      queryClient.setQueryData(queryKey, context == null ? void 0 : context.previousResponse);
    }
  });
}
function reorder$1(payload) {
  return apiClient.post(`hc/categories/reorder`, payload).then((r) => r.data);
}
const DragPreview = React.forwardRef((props, ref) => {
  const render = props.children;
  const [children, setChildren] = useState(null);
  const domRef = useRef(null);
  useImperativeHandle(
    ref,
    () => (draggable, callback) => {
      flushSync(() => {
        setChildren(render(draggable));
      });
      callback(domRef.current);
      requestAnimationFrame(() => {
        setChildren(null);
      });
    },
    [render]
  );
  if (!children) {
    return null;
  }
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        style: { zIndex: -100, position: "absolute", top: 0, left: -1e5 },
        ref: domRef,
        children
      }
    ),
    rootEl
  );
});
function HcManagerRow({
  item,
  items,
  onSortEnd,
  onClick,
  onView,
  onEdit,
  onDelete,
  children,
  description
}) {
  const domRef = useRef(null);
  const previewRef = useRef(null);
  const isTouchDevice = useIsTouchDevice();
  const reorder2 = useReorderCategories();
  const { sortableProps, dragHandleRef } = useSortable({
    ref: domRef,
    disabled: isTouchDevice ?? false,
    item,
    items,
    type: "hcManagerSort",
    preview: previewRef,
    onSortEnd
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "cursor:pointer mb-12 flex items-center gap-6 rounded-panel border p-12 transition-colors hover:border-primary",
      onClick: createEventHandler(() => onClick()),
      ref: domRef,
      ...sortableProps,
      children: [
        !isTouchDevice && /* @__PURE__ */ jsx(
          IconButton,
          {
            className: "text-muted",
            ref: dragHandleRef,
            disabled: reorder2.isPending,
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
            },
            children: /* @__PURE__ */ jsx(DragIndicatorIcon, {})
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold", children }),
          description && /* @__PURE__ */ jsx("div", { className: "text-sm text-muted", children: description })
        ] }),
        /* @__PURE__ */ jsxs(MenuTrigger, { children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              className: "ml-auto text-muted",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx(MoreVertIcon, {})
            }
          ),
          /* @__PURE__ */ jsxs(Menu, { children: [
            /* @__PURE__ */ jsx(Item, { value: "edit", onSelected: () => onEdit(), children: /* @__PURE__ */ jsx(Trans, { message: "Edit" }) }),
            /* @__PURE__ */ jsx(
              Item,
              {
                value: "sendToTop",
                onSelected: () => {
                  onSortEnd(items.indexOf(item), 0);
                  document.documentElement.scrollTop = 0;
                },
                children: /* @__PURE__ */ jsx(Trans, { message: "Send to top" })
              }
            ),
            /* @__PURE__ */ jsx(Item, { value: "viewInHc", onSelected: () => onView(), children: /* @__PURE__ */ jsx(Trans, { message: "View in help center" }) }),
            /* @__PURE__ */ jsx(Item, { value: "delete", onSelected: () => onDelete(), children: /* @__PURE__ */ jsx(Trans, { message: "Delete" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(RowDragPreview, { name: children, ref: previewRef })
      ]
    }
  );
}
const RowDragPreview = React.forwardRef(({ name }, ref) => {
  return /* @__PURE__ */ jsx(DragPreview, { ref, children: () => /* @__PURE__ */ jsx("div", { className: "rounded bg-chip p-6 text-sm shadow", children: name }) });
});
function HcManagerEmptyMessage({ title, description }) {
  return /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      className: "mx-auto mt-40 max-w-450",
      image: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ErrorIcon, { size: "lg" }) }),
      size: "sm",
      imageHeight: "h-auto",
      imageMargin: "mb-12",
      title,
      description
    }
  );
}
function useDeleteCategory() {
  return useMutation({
    mutationFn: (payload) => deleteCategory(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["hc", "categories"] });
      toast(message("Category deleted"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteCategory({ id }) {
  return apiClient.delete(`hc/categories/${id}`).then((r) => r.data);
}
function useUpdateCategory(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => updateCategory$1(payload),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["hc", "categories"] });
      response.category.is_section ? "sections" : "categories";
      toast(
        trans(
          response.category.is_section ? message("Category updated") : message("Section updated")
        )
      );
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateCategory$1({
  id,
  ...payload
}) {
  return apiClient.put(`hc/categories/${id}`, payload).then((r) => r.data);
}
function UpdateCategoryDialog({ category }) {
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      name: category.name,
      parent_id: category.is_section ? category.parent_id : void 0,
      description: category.description,
      image: category.image,
      visible_to_role: category.visible_to_role,
      managed_by_role: category.managed_by_role
    }
  });
  const updateCategory2 = useUpdateCategory(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: category.is_section ? /* @__PURE__ */ jsx(Trans, { message: "Update section" }) : /* @__PURE__ */ jsx(Trans, { message: "Update category" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateCategoryForm,
      {
        hideParentId: category.is_section,
        formId,
        form,
        onSubmit: (values) => {
          updateCategory2.mutate(
            { ...values, id: category.id },
            {
              onSuccess: () => close()
            }
          );
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => {
            close();
          },
          children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" })
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: updateCategory2.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Update" })
        }
      )
    ] })
  ] });
}
function HcCategoryManager() {
  const params = useHcCategoryManagerParams();
  const query = useCategories(params);
  return /* @__PURE__ */ jsx(
    HcManagerLayout,
    {
      query,
      actionButton: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", className: "max-md:mt-12", children: params.type === "category" ? /* @__PURE__ */ jsx(Trans, { message: "New category" }) : /* @__PURE__ */ jsx(Trans, { message: "New section" }) }),
        /* @__PURE__ */ jsx(CreateCategoryDialog, { parentId: params.parentId })
      ] }),
      children: (data) => /* @__PURE__ */ jsx(PageContent$5, { data })
    }
  );
}
function PageContent$5({ data }) {
  const params = useHcCategoryManagerParams();
  const categories = data.pagination.data;
  const count = categories.length;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HcManagerBreadcrumb, { category: data.category }),
    count ? /* @__PURE__ */ jsx(HcManagerTitle, { children: params.type === "category" ? /* @__PURE__ */ jsx(Trans, { message: "Categories (:count)", values: { count } }) : /* @__PURE__ */ jsx(Trans, { message: "Sections (:count)", values: { count } }) }) : null,
    categories.map((category) => /* @__PURE__ */ jsx(CategoryRow, { category, data }, category.id)),
    !categories.length && /* @__PURE__ */ jsx(NoResultsMessage, {})
  ] });
}
function CategoryRow({
  category,
  data: {
    pagination: { data: categories },
    category: parent
  }
}) {
  const navigate = useNavigate$1();
  const deleteCategory2 = useDeleteCategory();
  const reorder2 = useReorderCategories();
  const goToEditPage = () => {
    if (category.is_section) {
      navigate(`/admin/hc/arrange/sections/${category.id}`);
    } else {
      navigate(`/admin/hc/arrange/categories/${category.id}`);
    }
  };
  return /* @__PURE__ */ jsx(
    HcManagerRow,
    {
      item: category,
      items: categories,
      onSortEnd: (oldIndex, newIndex) => {
        reorder2.mutate({ oldIndex, newIndex, parentId: parent == null ? void 0 : parent.id });
      },
      onClick: () => goToEditPage(),
      onView: () => navigate(getCategoryLink(category)),
      onEdit: () => openDialog(UpdateCategoryDialog, { category }),
      onDelete: () => {
        openDialog(ConfirmationDialog, {
          title: /* @__PURE__ */ jsx(Trans, { message: "Delete category" }),
          body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this category?" }),
          confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
          isDanger: true,
          isLoading: deleteCategory2.isPending,
          onConfirm: () => deleteCategory2.mutate(
            { id: category.id },
            { onSuccess: () => closeDialog() }
          )
        });
      },
      description: /* @__PURE__ */ jsxs(BulletSeparatedItems, { children: [
        category.sections_count ? /* @__PURE__ */ jsx(
          Trans,
          {
            message: "[one 1 section|other :count sections]",
            values: { count: category.sections_count }
          }
        ) : null,
        /* @__PURE__ */ jsx(
          Trans,
          {
            message: "[one 1 article|other :count articles]",
            values: { count: category.articles_count }
          }
        )
      ] }),
      children: category.name
    }
  );
}
function NoResultsMessage() {
  const { parentId } = useHcCategoryManagerParams();
  if (parentId) {
    return /* @__PURE__ */ jsx(
      HcManagerEmptyMessage,
      {
        title: /* @__PURE__ */ jsx(Trans, { message: "This category is empty" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Empty categories aren't visible in the Help Center. You can make them visible by adding a section." })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    HcManagerEmptyMessage,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "There are no categories yet" })
    }
  );
}
const fetchArticlesQueryKey = (params) => [
  "hc",
  "articles",
  "admin",
  params
];
function useArticles(params) {
  return useQuery({
    queryKey: fetchArticlesQueryKey(params),
    queryFn: () => fetchArticles(params)
  });
}
function fetchArticles(params) {
  return apiClient.get(`hc/articles`, {
    params: { paginate: "simple", perPage: 30, ...params }
  }).then((response) => response.data);
}
function useDeleteArticles() {
  return useMutation({
    mutationFn: (payload) => deleteArticle(payload),
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({ queryKey: ["hc", "categories"] }),
        queryClient.invalidateQueries({ queryKey: ["hc", "articles"] }),
        queryClient.invalidateQueries({ queryKey: ["articles"] })
      ]);
      toast(message("Article deleted"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteArticle({ ids }) {
  return apiClient.delete(`hc/articles/${ids.join(",")}`).then((r) => r.data);
}
function useHcArticleManagerParams() {
  const { sectionId } = useParams();
  return { sectionId, order: "position|desc" };
}
function useReorderArticles() {
  const queryKey = fetchArticlesQueryKey(useHcArticleManagerParams());
  return useMutation({
    mutationFn: (payload) => {
      const ids = queryClient.getQueryData(queryKey).pagination.data.map((c) => c.id);
      return reorder({
        sectionId: payload.sectionId,
        ids
      });
    },
    onMutate: async ({ oldIndex, newIndex }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousResponse = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (prev) => {
        const newData = { ...prev, pagination: { ...prev.pagination } };
        newData.pagination.data = moveItemInNewArray(
          newData.pagination.data,
          oldIndex,
          newIndex
        );
        return newData;
      });
      return { previousResponse };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["hc", "articles"] });
    },
    onError: (err, _, context) => {
      showHttpErrorToast(err);
      queryClient.setQueryData(queryKey, context == null ? void 0 : context.previousResponse);
    }
  });
}
function reorder(payload) {
  return apiClient.post(
    `hc/categories/${payload.sectionId}/articles/reorder`,
    payload
  ).then((r) => r.data);
}
function HcArticleManager() {
  const query = useArticles(useHcArticleManagerParams());
  return /* @__PURE__ */ jsx(
    HcManagerLayout,
    {
      query,
      actionButton: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          elementType: Link,
          to: "articles/new",
          children: /* @__PURE__ */ jsx(Trans, { message: "New article" })
        }
      ),
      children: (data) => /* @__PURE__ */ jsx(PageContent$4, { data })
    }
  );
}
function PageContent$4({ data }) {
  var _a2;
  const { sectionId } = useHcArticleManagerParams();
  const navigate = useNavigate$1();
  const deleteArticles = useDeleteArticles();
  const articles = data.pagination.data;
  const count = articles.length;
  const reorder2 = useReorderArticles();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      HcManagerBreadcrumb,
      {
        category: (_a2 = data.section) == null ? void 0 : _a2.parent,
        section: data.section
      }
    ),
    count ? /* @__PURE__ */ jsx(HcManagerTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "Articles (:count)", values: { count } }) }) : null,
    articles.map((article) => /* @__PURE__ */ jsx(
      HcManagerRow,
      {
        item: article,
        items: articles,
        onSortEnd: (oldIndex, newIndex) => {
          reorder2.mutate({ sectionId, oldIndex, newIndex });
        },
        onEdit: () => navigate(`articles/${article.id}/edit`),
        onClick: () => navigate(`articles/${article.id}/edit`),
        onView: () => navigate(getArticleLink(article, { section: data.section })),
        onDelete: () => {
          openDialog(ConfirmationDialog, {
            title: /* @__PURE__ */ jsx(Trans, { message: "Delete article" }),
            body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this article?" }),
            confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
            isDanger: true,
            isLoading: deleteArticles.isPending,
            onConfirm: () => deleteArticles.mutate(
              { ids: [article.id] },
              { onSuccess: () => closeDialog() }
            )
          });
        },
        children: article.title
      },
      article.id
    )),
    !articles.length && /* @__PURE__ */ jsx(
      HcManagerEmptyMessage,
      {
        title: /* @__PURE__ */ jsx(Trans, { message: "This section is empty" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Empty sections aren't visible in the Help Center. You can make them visible by adding an article." })
      }
    )
  ] });
}
function useCreateArticle(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => createArticle(props),
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({ queryKey: ["hc", "categories"] }),
        queryClient.invalidateQueries({ queryKey: ["hc", "articles"] })
      ]);
      toast(trans(message("Article created")));
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function articleEditorFormValueToPayload(formValue) {
  var _a2, _b;
  return {
    ...formValue,
    attachments: (_a2 = formValue.attachments) == null ? void 0 : _a2.map((a) => a.id),
    tags: (_b = formValue.tags) == null ? void 0 : _b.map((t) => t.name)
  };
}
function createArticle(formValue) {
  return apiClient.post("hc/articles", articleEditorFormValueToPayload(formValue)).then((r) => r.data);
}
function useUpdateArticle(form) {
  return useMutation({
    mutationFn: (payload) => updateArticle(payload),
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({ queryKey: ["hc", "categories"] }),
        queryClient.invalidateQueries({ queryKey: ["hc", "articles"] })
      ]);
    },
    onError: (err) => form ? onFormQueryError(err, form) : showHttpErrorToast(err)
  });
}
function updateArticle({
  id,
  ...formValue
}) {
  return apiClient.put(`hc/articles/${id}`, articleEditorFormValueToPayload(formValue)).then((r) => r.data);
}
function TogglePublishedButton({ article }) {
  const updateArticle2 = useUpdateArticle();
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "link",
      color: "primary",
      disabled: updateArticle2.isPending,
      onClick: () => {
        updateArticle2.mutate({
          id: article.id,
          draft: !article.draft
        });
      },
      children: article.draft ? /* @__PURE__ */ jsx(Trans, { message: "Publish" }) : /* @__PURE__ */ jsx(Trans, { message: "Unpublish" })
    }
  );
}
function ArticleEditorTitle() {
  const [editingTitle, setEditingTitle] = useState(false);
  const { trans } = useTrans();
  const form = useFormContext();
  const watchedTitle = form.watch("title");
  const titlePlaceholder = trans({ message: "Title" });
  if (editingTitle) {
    return /* @__PURE__ */ jsx(
      FormTextField,
      {
        placeholder: titlePlaceholder,
        autoFocus: true,
        className: "mb-30",
        onBlur: () => {
          setEditingTitle(false);
        },
        name: "title",
        required: true
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "h1",
    {
      tabIndex: 0,
      onClick: () => {
        setEditingTitle(true);
      },
      onFocus: () => {
        setEditingTitle(true);
      },
      className: clsx(
        "hover:bg-primary/focus rounded cursor-pointer",
        !watchedTitle && "text-muted"
      ),
      children: [
        watchedTitle || titlePlaceholder,
        /* @__PURE__ */ jsx(EditIcon, { className: "icon-sm mx-8 mt-8 align-top text-muted" })
      ]
    }
  );
}
function SlugEditor({
  host,
  value: initialValue = "",
  placeholder: placeholder2,
  onChange,
  className,
  inputRef,
  onInputBlur,
  showLinkIcon = true,
  pattern,
  minLength,
  maxLength,
  hideButton,
  ...props
}) {
  const { base_url } = useSettings();
  const prefix = props.prefix ? `/${props.prefix}` : "";
  const suffix = props.suffix ? `/${props.suffix}` : "";
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  host = host || base_url;
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const handleSubmit = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
      if (value) {
        onChange == null ? void 0 : onChange(value);
      }
    }
  };
  let preview = "";
  if (value) {
    preview = value;
  } else if (placeholder2) {
    preview = slugifyString(placeholder2);
  }
  return (
    // can't use <form/> here as component might be used inside another form
    /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center", className), children: [
      showLinkIcon && /* @__PURE__ */ jsx(LinkIcon, { className: "icon-md text-muted" }),
      /* @__PURE__ */ jsxs("div", { className: "text-primary ml-6 mr-14", children: [
        host,
        prefix,
        !isEditing && preview && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: preview })
        ] }),
        !isEditing ? suffix : null
      ] }),
      isEditing && /* @__PURE__ */ jsx(
        TextField,
        {
          pattern,
          minLength,
          maxLength,
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          },
          ref: inputRef,
          "aria-label": "slug",
          autoFocus: true,
          className: "mr-14",
          size: "2xs",
          value,
          onBlur: onInputBlur,
          onChange: (e) => {
            setValue(e.target.value);
          }
        }
      ),
      !hideButton && /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          color: "chip",
          variant: "outline",
          size: "2xs",
          onClick: () => {
            handleSubmit();
          },
          children: isEditing ? /* @__PURE__ */ jsx(Trans, { message: "Save" }) : /* @__PURE__ */ jsx(Trans, { message: "Edit" })
        }
      )
    ] })
  );
}
const ArrowBackIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" }),
  "ArrowBackOutlined"
);
const UndoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" }),
  "UndoOutlined"
);
const RedoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" }),
  "RedoOutlined"
);
function HistoryButtons({ editor }) {
  return /* @__PURE__ */ jsxs("span", { children: [
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        disabled: !editor.can().undo(),
        onClick: () => {
          editor.commands.focus();
          editor.commands.undo();
        },
        children: /* @__PURE__ */ jsx(UndoIcon, {})
      }
    ),
    /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        disabled: !editor.can().redo(),
        onClick: () => {
          editor.commands.focus();
          editor.commands.redo();
        },
        children: /* @__PURE__ */ jsx(RedoIcon, {})
      }
    )
  ] });
}
function ModeButton({ editor }) {
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "modal",
      onClose: (newValue) => {
        if (newValue != null) {
          editor == null ? void 0 : editor.commands.setContent(newValue);
        }
      },
      children: [
        /* @__PURE__ */ jsx(Button, { variant: "text", startIcon: /* @__PURE__ */ jsx(CodeIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Source" }) }),
        /* @__PURE__ */ jsx(
          AceDialog,
          {
            title: /* @__PURE__ */ jsx(Trans, { message: "Source code" }),
            defaultValue: editor.getHTML()
          }
        )
      ]
    }
  );
}
const HorizontalRuleIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4 11h16v2H4z" }),
  "HorizontalRuleOutlined"
);
const PriorityHighIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("circle", { cx: "12", cy: "19", r: "2" }, "0"), /* @__PURE__ */ jsx("path", { d: "M10 3h4v12h-4z" }, "1")],
  "PriorityHighOutlined"
);
const NoteIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16 4H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99h16c1.1 0 2-.9 2-2v-8l-6-6zM4 18.01V6h11v5h5v7.01H4z" }),
  "NoteOutlined"
);
const SmartDisplayIcon = createSvgIcon(
  [/* @__PURE__ */ jsx("path", { d: "M9.5 7.5v9l7-4.5z" }, "0"), /* @__PURE__ */ jsx("path", { d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14.01H4V5.99h16v12.02z" }, "1")],
  "SmartDisplayOutlined"
);
function InsertMenuTrigger({ editor, size }) {
  const [dialog, setDialog] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs(
      MenuTrigger,
      {
        onItemSelected: (key) => {
          if (key === "hr") {
            editor.commands.focus();
            editor.commands.setHorizontalRule();
          } else if (key === "embed") {
            setDialog("embed");
          } else {
            editor.commands.focus();
            editor.commands.addInfo({ type: key });
          }
        },
        children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              variant: "text",
              size,
              className: clsx("flex-shrink-0"),
              children: /* @__PURE__ */ jsx(MoreVertIcon, {})
            }
          ),
          /* @__PURE__ */ jsxs(Menu, { children: [
            /* @__PURE__ */ jsx(Item, { value: "hr", startIcon: /* @__PURE__ */ jsx(HorizontalRuleIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Horizontal rule" }) }),
            /* @__PURE__ */ jsx(Item, { value: "embed", startIcon: /* @__PURE__ */ jsx(SmartDisplayIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Embed" }) }),
            /* @__PURE__ */ jsx(Item, { value: "important", startIcon: /* @__PURE__ */ jsx(PriorityHighIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Important" }) }),
            /* @__PURE__ */ jsx(Item, { value: "warning", startIcon: /* @__PURE__ */ jsx(WarningIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Warning" }) }),
            /* @__PURE__ */ jsx(Item, { value: "success", startIcon: /* @__PURE__ */ jsx(NoteIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Note" }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        type: "modal",
        isOpen: !!dialog,
        onClose: () => {
          setDialog(false);
        },
        children: /* @__PURE__ */ jsx(EmbedDialog, { editor })
      }
    )
  ] });
}
function EmbedDialog({ editor }) {
  const previousSrc = editor.getAttributes("embed").src;
  const form = useForm({
    defaultValues: { src: previousSrc }
  });
  const { formId, close } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Insert link" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form$1,
      {
        form,
        id: formId,
        onSubmit: (value) => {
          editor.commands.setEmbed(value);
          close();
        },
        children: /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "src",
            label: /* @__PURE__ */ jsx(Trans, { message: "Embed URL" }),
            autoFocus: true,
            type: "url",
            required: true
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: close, variant: "text", children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          form: formId,
          disabled: !form.formState.isValid,
          variant: "flat",
          color: "primary",
          children: /* @__PURE__ */ jsx(Trans, { message: "Add" })
        }
      )
    ] })
  ] });
}
function Keyboard({ children, modifier, separator = "+" }) {
  const modKey = isMac() ? /* @__PURE__ */ jsx("span", { className: "text-base align-middle", children: "⌘" }) : "Ctrl";
  return /* @__PURE__ */ jsxs("kbd", { className: "text-xs text-muted", children: [
    modifier && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      modKey,
      separator
    ] }),
    children
  ] });
}
function FormatMenuTrigger({ editor, size }) {
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      floatingMinWidth: "w-256",
      onItemSelected: (key) => {
        editor.commands.focus();
        if (typeof key === "string" && key.startsWith("h")) {
          editor.commands.toggleHeading({
            level: parseInt(key.replace("h", ""))
          });
        } else if (key === "code") {
          editor.commands.toggleCode();
        } else if (key === "strike") {
          editor.commands.toggleStrike();
        } else if (key === "super") {
          editor.commands.toggleSuperscript();
        } else if (key === "sub") {
          editor.commands.toggleSubscript();
        } else if (key === "blockquote") {
          editor.commands.toggleBlockquote();
        } else if (key === "paragraph") {
          editor.commands.setParagraph();
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            className: clsx("flex-shrink-0"),
            variant: "text",
            size,
            endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
            children: /* @__PURE__ */ jsx(Trans, { message: "Format" })
          }
        ),
        /* @__PURE__ */ jsxs(Menu, { children: [
          /* @__PURE__ */ jsx(Item, { value: "h1", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+1" }), children: /* @__PURE__ */ jsx(Trans, { message: "Heading :number", values: { number: 1 } }) }),
          /* @__PURE__ */ jsx(Item, { value: "h2", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+2" }), children: /* @__PURE__ */ jsx(Trans, { message: "Heading :number", values: { number: 2 } }) }),
          /* @__PURE__ */ jsx(Item, { value: "h3", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+3" }), children: /* @__PURE__ */ jsx(Trans, { message: "Heading :number", values: { number: 3 } }) }),
          /* @__PURE__ */ jsx(Item, { value: "h4", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+4" }), children: /* @__PURE__ */ jsx(Trans, { message: "Heading :number", values: { number: 4 } }) }),
          /* @__PURE__ */ jsx(Item, { value: "code", endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "E" }), children: /* @__PURE__ */ jsx(Trans, { message: "Code" }) }),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "strike",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Shift+X" }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Strikethrough" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "super",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, separator: " ", children: "." }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Superscript" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "sub",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, separator: " ", children: "," }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Subscript" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "blockquote",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Shift+B" }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Blockquote" })
            }
          ),
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "paragraph",
              endSection: /* @__PURE__ */ jsx(Keyboard, { modifier: true, children: "Alt+0" }),
              children: /* @__PURE__ */ jsx(Trans, { message: "Paragraph" })
            }
          )
        ] })
      ]
    }
  );
}
const FormatColorTextIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M2 20h20v4H2v-4zm3.49-3h2.42l1.27-3.58h5.65L16.09 17h2.42L13.25 3h-2.5L5.49 17zm4.42-5.61 2.03-5.79h.12l2.03 5.79H9.91z" }),
  "FormatColorTextOutlined"
);
const FormatColorFillIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M16.56 8.94 7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10 10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5zM2 20h20v4H2v-4z" }),
  "FormatColorFillOutlined"
);
function ColorButtons({ editor, size }) {
  const [dialog, setDialog] = useState(false);
  const textActive = editor.getAttributes("textStyle").color;
  const backgroundActive = editor.getAttributes("textStyle").backgroundColor;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("span", { className: clsx("flex-shrink-0 whitespace-nowrap"), children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          size,
          color: textActive ? "primary" : null,
          onClick: () => {
            setDialog("text");
          },
          children: /* @__PURE__ */ jsx(FormatColorTextIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        IconButton,
        {
          size,
          color: backgroundActive ? "primary" : null,
          onClick: () => {
            setDialog("bg");
          },
          children: /* @__PURE__ */ jsx(FormatColorFillIcon, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        defaultValue: dialog === "text" ? "#000000" : "#FFFFFF",
        type: "modal",
        isOpen: !!dialog,
        onClose: (newValue) => {
          if (newValue) {
            if (dialog === "text") {
              editor.commands.setColor(newValue);
            } else {
              editor.commands.setBackgroundColor(newValue);
            }
          }
          setDialog(false);
        },
        children: /* @__PURE__ */ jsx(ColorPickerDialog, {})
      }
    )
  ] });
}
const FormatAlignLeftIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z" }),
  "FormatAlignLeftOutlined"
);
const FormatAlignCenterIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z" }),
  "FormatAlignCenterOutlined"
);
const FormatAlignRightIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z" }),
  "FormatAlignRightOutlined"
);
const FormatAlignJustifyIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z" }),
  "FormatAlignJustifyOutlined"
);
const iconMap = {
  left: {
    icon: FormatAlignLeftIcon,
    label: message("Align left")
  },
  center: {
    icon: FormatAlignCenterIcon,
    label: message("Align center")
  },
  right: {
    icon: FormatAlignRightIcon,
    label: message("Align right")
  },
  justify: {
    icon: FormatAlignJustifyIcon,
    label: message("Justify")
  }
};
function AlignButtons({ editor, size }) {
  const activeKey = Object.keys(iconMap).find((key) => {
    return editor.isActive({ textAlign: key });
  }) || "left";
  const ActiveIcon = activeKey ? iconMap[activeKey].icon : iconMap.left.icon;
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      floatingWidth: "auto",
      selectionMode: "single",
      selectedValue: activeKey,
      onSelectionChange: (key) => {
        editor.commands.focus();
        editor.commands.setTextAlign(key);
      },
      children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            size,
            color: activeKey ? "primary" : null,
            className: clsx("flex-shrink-0"),
            children: /* @__PURE__ */ jsx(ActiveIcon, {})
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: Object.entries(iconMap).map(([name, config]) => {
          const Icon = config.icon;
          return /* @__PURE__ */ jsx(
            Item,
            {
              value: name,
              startIcon: /* @__PURE__ */ jsx(Icon, { size: "md" }),
              capitalizeFirst: true,
              children: /* @__PURE__ */ jsx(Trans, { message: config.label.message })
            },
            name
          );
        }) })
      ]
    }
  );
}
const MenubarRowClassName = "flex items-center px-4 h-42 text-muted border-b overflow-hidden";
function ArticleBodyEditorMenubar({
  editor,
  size = "md",
  justify = "justify-center",
  hideInsertButton = false,
  imageDiskPrefix
}) {
  const isMobile = useIsMobileMediaQuery();
  const [extendedVisible, setExtendedVisible] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: clsx(extendedVisible ? "h-84" : "h-42"), children: [
    /* @__PURE__ */ jsxs("div", { className: clsx(MenubarRowClassName, justify, "relative z-20"), children: [
      /* @__PURE__ */ jsx(FormatMenuTrigger, { editor, size }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(FontStyleButtons, { editor, size }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(AlignButtons, { editor, size }),
      /* @__PURE__ */ jsx(IndentButtons, { editor, size }),
      /* @__PURE__ */ jsx(Divider, {}),
      isMobile ? /* @__PURE__ */ jsx(
        IconButton,
        {
          className: "flex-shrink-0",
          color: extendedVisible ? "primary" : null,
          size,
          onClick: () => {
            setExtendedVisible(!extendedVisible);
          },
          children: extendedVisible ? /* @__PURE__ */ jsx(UnfoldLessIcon, {}) : /* @__PURE__ */ jsx(UnfoldMoreIcon, {})
        }
      ) : /* @__PURE__ */ jsx(
        ExtendedButtons,
        {
          editor,
          size,
          hideInsertButton,
          imageDiskPrefix
        }
      )
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: extendedVisible && /* @__PURE__ */ jsx(
      m.div,
      {
        className: clsx(
          MenubarRowClassName,
          justify,
          "absolute flex h-full w-full"
        ),
        initial: { y: "-100%" },
        animate: { y: 0 },
        exit: { y: "-100%" },
        children: /* @__PURE__ */ jsx(
          ExtendedButtons,
          {
            editor,
            size,
            imageDiskPrefix
          }
        )
      }
    ) })
  ] });
}
function ExtendedButtons({
  editor,
  size = "md",
  hideInsertButton,
  imageDiskPrefix
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ListButtons, { editor, size }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(LinkButton, { editor, size }),
    /* @__PURE__ */ jsx(ImageButton, { editor, size, diskPrefix: imageDiskPrefix }),
    !hideInsertButton && /* @__PURE__ */ jsx(InsertMenuTrigger, { editor, size }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(ColorButtons, { editor, size }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(CodeBlockMenuTrigger, { editor, size }),
    /* @__PURE__ */ jsx(ClearFormatButton, { editor, size })
  ] });
}
function ArticleEditorStickyHeader({
  editor,
  allowSlugEditing = true,
  onSave,
  saveButton,
  isLoading = false,
  backLink,
  slugPrefix = "pages",
  imageDiskPrefix
}) {
  const { isSticky, sentinelRef } = useStickySentinel();
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { ref: sentinelRef }),
    /* @__PURE__ */ jsxs("div", { className: clsx("sticky top-0 z-10 mb-20 bg", isSticky && "shadow"), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-20 border-b px-20 py-10 text-muted sm:justify-start", children: [
        !isMobile && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "text",
              size: "sm",
              elementType: Link,
              to: backLink,
              relative: "path",
              startIcon: /* @__PURE__ */ jsx(ArrowBackIcon, {}),
              children: /* @__PURE__ */ jsx(Trans, { message: "Back" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mr-auto", children: allowSlugEditing && /* @__PURE__ */ jsx(
            FormSlugEditor,
            {
              name: "slug",
              showLinkIcon: false,
              prefix: slugPrefix
            }
          ) })
        ] }),
        editor && /* @__PURE__ */ jsx(HistoryButtons, { editor }),
        !isMobile && /* @__PURE__ */ jsx(ModeButton, { editor }),
        onSave && /* @__PURE__ */ jsx(
          SaveButton,
          {
            onSave: () => {
              onSave(editor.getHTML());
            },
            isLoading
          }
        ),
        saveButton
      ] }),
      /* @__PURE__ */ jsx(
        ArticleBodyEditorMenubar,
        {
          editor,
          size: "sm",
          imageDiskPrefix
        }
      )
    ] })
  ] });
}
function SaveButton({ onSave, isLoading }) {
  const form = useFormContext();
  const title = form.watch("title");
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "flat",
      size: "sm",
      color: "primary",
      className: "min-w-90",
      disabled: isLoading || !title,
      onClick: () => onSave(),
      children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
    }
  );
}
function FormSlugEditor({ name, ...other }) {
  const {
    field: { onChange, onBlur, value = "", ref }
  } = useController({
    name
  });
  const manuallyChanged = useRef(false);
  const { watch, setValue } = useFormContext();
  useEffect(() => {
    const subscription = watch((formVal, { name: fieldName }) => {
      if (fieldName === "title" && !manuallyChanged.current) {
        setValue("slug", formVal.title);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);
  return /* @__PURE__ */ jsx(
    SlugEditor,
    {
      className: clsx(!value && "invisible"),
      onChange: (e) => {
        manuallyChanged.current = true;
        onChange(e);
      },
      onInputBlur: onBlur,
      value,
      inputRef: ref,
      ...other
    }
  );
}
function useArticleEditorBackLink() {
  const { categoryId, sectionId, articleId } = useParams();
  let backLink = categoryId || sectionId ? `../../` : `../`;
  if (articleId) {
    backLink += "../";
  }
  return backLink;
}
const ArticleBodyEditor$2 = React.lazy(
  () => import("./article-body-editor-e46267e1.mjs")
);
function HcArticleBodyEditor({
  initialContent,
  onLoad,
  mobileSaveButton
}) {
  const backLink = useArticleEditorBackLink();
  return /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(ArticleBodyEditor$2, { initialContent, onLoad, children: (content, editor) => /* @__PURE__ */ jsxs(FileUploadProvider, { children: [
    /* @__PURE__ */ jsx(
      ArticleEditorStickyHeader,
      {
        allowSlugEditing: false,
        editor,
        backLink,
        isLoading: false,
        saveButton: mobileSaveButton,
        imageDiskPrefix: "article_images"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mx-20", children: /* @__PURE__ */ jsxs("div", { className: "prose mx-auto flex-auto dark:prose-invert", children: [
      /* @__PURE__ */ jsx(ArticleEditorTitle, {}),
      content
    ] }) })
  ] }) }) });
}
function ArticleEditorLayout({
  children,
  aside
}) {
  const isCompactMode = useMediaQuery("(max-width: 1024px)");
  const mobileSaveButton = isCompactMode ? /* @__PURE__ */ jsx(MobileSaveButton, { aside }) : void 0;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-full items-stretch lg:flex", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-auto", children: children && cloneElement(children, {
      mobileSaveButton
    }) }),
    !isCompactMode && /* @__PURE__ */ jsx("div", { className: "w-320 border-l bg-alt xl:w-400", children: /* @__PURE__ */ jsx("aside", { className: "sticky top-0 px-24 py-14 xl:px-48 xl:py-28", children: aside }) })
  ] });
}
function MobileSaveButton({ aside }) {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { variant: "outline", color: "primary", size: "xs", children: /* @__PURE__ */ jsx(Trans, { message: "Save" }) }),
    /* @__PURE__ */ jsx(Dialog, { children: /* @__PURE__ */ jsx(DialogBody, { children: aside }) })
  ] });
}
function ArticleSectionSelector({ onSave }) {
  var _a2;
  const { data } = useCategories({
    type: "category",
    compact: true,
    load: ["sections"]
  });
  const categories = (data == null ? void 0 : data.pagination.data) || [];
  const sections = categories.map((c) => c.sections).flat() || [];
  const { watch, clearErrors } = useFormContext();
  const selectedSections = watch("sections") || [];
  const { getFieldState } = useFormContext();
  const errorMessage = (_a2 = getFieldState("sections").error) == null ? void 0 : _a2.message;
  const classNames = getInputFieldClassNames({ errorMessage });
  if (!sections.length) {
    return null;
  }
  const firstSection = sections.find((s) => s.id === selectedSections[0]);
  const firstCategory = categories.find((c) => c.id === (firstSection == null ? void 0 : firstSection.parent_id));
  const sectionCount = selectedSections.length;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: classNames.label, children: /* @__PURE__ */ jsx(Trans, { message: "Publish in sections" }) }),
    /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "modal",
        onClose: (sections2) => {
          if (sections2) {
            onSave(sections2);
            clearErrors("sections");
          }
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative cursor-pointer rounded border bg py-12 pl-12 pr-30 text-sm", children: [
            !firstSection || !firstCategory ? /* @__PURE__ */ jsx(Trans, { message: "Select a section" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold", children: firstCategory.name }),
              /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis whitespace-nowrap text-xs text-muted", children: sectionCount > 1 ? /* @__PURE__ */ jsx(
                Trans,
                {
                  message: ":name + :count more sections",
                  values: { name: firstSection.name, count: sectionCount - 1 }
                }
              ) : firstSection.name })
            ] }),
            /* @__PURE__ */ jsx(EditIcon, { className: "absolute right-8 top-8 text-muted", size: "sm" })
          ] }),
          /* @__PURE__ */ jsx(SectionSelectorDialog, {})
        ]
      }
    ),
    errorMessage && /* @__PURE__ */ jsx("div", { className: classNames.error, children: errorMessage })
  ] });
}
function SectionSelectorDialog() {
  const { data } = useCategories({ type: "category", load: ["sections"] });
  const { close } = useDialogContext();
  const { getValues } = useFormContext();
  const [selectedSections, setSelectedSections] = useState(
    () => getValues("sections") || []
  );
  const handleToggle = (e, section) => {
    if (e.target.checked) {
      setSelectedSections([...selectedSections, section.id]);
    } else {
      setSelectedSections(selectedSections.filter((id) => id !== section.id));
    }
  };
  return /* @__PURE__ */ jsxs(Dialog, { size: "lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Select sections" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(Accordion, { children: data == null ? void 0 : data.pagination.data.map((category) => {
      var _a2, _b;
      const sectionIds = ((_a2 = category.sections) == null ? void 0 : _a2.map((s) => s.id)) || [];
      const selectedCount = sectionIds.filter(
        (id) => selectedSections.includes(id)
      ).length;
      return /* @__PURE__ */ jsx(
        AccordionItem,
        {
          description: selectedCount ? /* @__PURE__ */ jsx(
            Trans,
            {
              message: "[one 1 section|other :count sections] selected",
              values: { count: selectedCount }
            }
          ) : null,
          label: category.name,
          children: (_b = category.sections) == null ? void 0 : _b.map((section) => /* @__PURE__ */ jsx(
            Checkbox,
            {
              className: "mb-8 block",
              checked: selectedSections.includes(section.id),
              onChange: (e) => handleToggle(e, section),
              children: section.name
            },
            section.id
          ))
        },
        category.id
      );
    }) }) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          onClick: () => close(selectedSections),
          children: /* @__PURE__ */ jsx(Trans, { message: "Select" })
        }
      )
    ] })
  ] });
}
const TwentyMB = 20 * 1024 * 1024;
function ArticleAttachmentsEditor() {
  const uploads = useFileUploadStore((s) => s.fileUploads);
  const abortUpload = useFileUploadStore((s) => s.abortUpload);
  const uploadMultiple = useFileUploadStore((s) => s.uploadMultiple);
  const { fields, append, remove } = useFieldArray({
    name: "attachments"
  });
  const handleUpload = async () => {
    const files = await openUploadWindow({
      multiple: true
    });
    if (files.length) {
      uploadMultiple(files, {
        restrictions: {
          maxFileSize: TwentyMB
        },
        onSuccess: (entry) => {
          append(entry);
        },
        onError: (message2) => {
          if (message2) {
            toast.danger(message2);
          }
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-8 mt-34 text-sm", children: /* @__PURE__ */ jsx(Trans, { message: "Attachments" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      fields.map((field, index) => {
        const attachment = field;
        return /* @__PURE__ */ jsx(
          AttachmentPreview,
          {
            name: attachment.name,
            mime: attachment.mime,
            onRemove: () => remove(index),
            downloadLink: `file-entries/download/${attachment.hash}`
          },
          attachment.id
        );
      }),
      [...uploads.entries()].filter(([_, upload]) => upload.status === "inProgress").map(([id, upload]) => /* @__PURE__ */ jsx(
        AttachmentPreview,
        {
          name: upload.file.name,
          mime: upload.file.mime,
          progress: upload.percentage,
          onRemove: () => abortUpload(id)
        },
        id
      ))
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Button, { variant: "link", color: "primary", onClick: () => handleUpload(), children: /* @__PURE__ */ jsx(Trans, { message: "Upload attachment (max 20MB)" }) }) })
  ] });
}
function AttachmentPreview({
  name,
  mime,
  progress,
  onRemove,
  downloadLink
}) {
  return /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 text-sm", children: [
      /* @__PURE__ */ jsx(FileTypeIcon, { mime, size: "xs" }),
      /* @__PURE__ */ jsx(
        AttachmentName,
        {
          name,
          className: "overflow-hidden overflow-ellipsis whitespace-nowrap",
          downloadLink
        }
      ),
      /* @__PURE__ */ jsx(IconButton, { onClick: () => onRemove(), size: "xs", children: /* @__PURE__ */ jsx(CloseIcon, {}) })
    ] }),
    progress ? /* @__PURE__ */ jsx(ProgressBar, { value: progress, className: "mt-4 max-w-224", size: "xs" }) : null
  ] });
}
function AttachmentName({ name, downloadLink, className }) {
  if (downloadLink) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href: downloadLink,
        download: true,
        className: clsx(className, "hover:underline"),
        children: name
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className, children: name });
}
const placeholder = message("Select author...");
const searchPlaceholder = message("Find a user");
function ArticleAuthorField() {
  return /* @__PURE__ */ jsx(
    FormNormalizedModelField,
    {
      endpoint: "autocomplete/article-authors",
      name: "author_id",
      background: "bg",
      className: "mb-24",
      label: /* @__PURE__ */ jsx(Trans, { message: "Author" }),
      placeholder,
      searchPlaceholder
    }
  );
}
function ArticleEditorAside({ children, onSave, isSaving }) {
  const form = useFormContext();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "flat",
        color: "primary",
        className: "min-h-46 w-full",
        onClick: () => onSave(),
        disabled: isSaving,
        children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-34", children: [
      children,
      /* @__PURE__ */ jsx(
        VisibleToField,
        {
          className: "mb-24",
          description: /* @__PURE__ */ jsx(Trans, { message: "Control who can see this article in help center" })
        }
      ),
      /* @__PURE__ */ jsx(ArticleAuthorField, {}),
      /* @__PURE__ */ jsx(
        ManagedByField,
        {
          className: "mb-24",
          description: /* @__PURE__ */ jsx(Trans, { message: "Control who can edit and publish this article" })
        }
      ),
      /* @__PURE__ */ jsx(
        ArticleSectionSelector,
        {
          onSave: (sections) => {
            form.setValue("sections", sections);
          }
        }
      ),
      /* @__PURE__ */ jsx(TagSelector, {}),
      /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(ArticleAttachmentsEditor, {}) })
    ] })
  ] });
}
function TagSelector() {
  const { data } = useTags({ type: "custom", perPage: 10 });
  const tags = (data == null ? void 0 : data.pagination.data) || [];
  const { trans } = useTrans();
  if (!tags.length)
    return null;
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      className: "mt-24",
      placeholder: trans({ message: "Add tag..." }),
      background: "bg",
      label: /* @__PURE__ */ jsx(Trans, { message: "Tags" }),
      name: "tags",
      chipSize: "sm",
      suggestions: tags,
      description: /* @__PURE__ */ jsx(Trans, { message: "Add content tags to help users find articles easier" }),
      children: (tag) => /* @__PURE__ */ jsx(Item, { value: tag.id, capitalizeFirst: true, children: /* @__PURE__ */ jsx(Trans, { message: tag.display_name || tag.name }) }, tag.id)
    }
  );
}
function UpdateArticlePage() {
  const query = useArticle("updateArticle");
  return query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent$3, { article: query.data.article })
  ] }) : /* @__PURE__ */ jsx(ArticleEditorLayout, { aside: /* @__PURE__ */ jsx(Skeleton, { variant: "rect", size: "w-full h-46" }), children: /* @__PURE__ */ jsx(PageStatus, { query }) });
}
function PageContent$3({ article }) {
  var _a2, _b;
  const { trans } = useTrans();
  const editor = useRef();
  const form = useForm({
    defaultValues: {
      title: article.title,
      slug: article.slug,
      visible_to_role: article.visible_to_role,
      author_id: article.author_id,
      managed_by_role: article.managed_by_role,
      sections: (_a2 = article.sections) == null ? void 0 : _a2.map((s) => s.id),
      tags: (_b = article.tags) == null ? void 0 : _b.map((t) => ({
        name: t.name,
        id: t.id,
        description: t.display_name
      })),
      attachments: article.attachments
    }
  });
  const updateArticle2 = useUpdateArticle(form);
  const handleSave = () => {
    if (!editor.current)
      return null;
    updateArticle2.mutate(
      {
        ...form.getValues(),
        body: editor.current.getHTML(),
        id: article.id
      },
      {
        onSuccess: () => {
          toast(trans(message("Article updated")));
        }
      }
    );
  };
  return /* @__PURE__ */ jsx(FormProvider, { ...form, children: /* @__PURE__ */ jsx(
    ArticleEditorLayout,
    {
      aside: /* @__PURE__ */ jsx(
        ArticleEditorAside,
        {
          onSave: () => handleSave(),
          isSaving: updateArticle2.isPending,
          children: /* @__PURE__ */ jsx(PublicationStatus, { article })
        }
      ),
      children: /* @__PURE__ */ jsx(
        HcArticleBodyEditor,
        {
          initialContent: article.body,
          onLoad: (e) => editor.current = e
        }
      )
    }
  ) });
}
function PublicationStatus({ article }) {
  var _a2;
  return /* @__PURE__ */ jsxs("div", { className: "mb-28 border-b pb-14 text-sm", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-8 font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Publication status" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "mr-10 flex items-center gap-8 border-r pr-10", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: clsx(
              "h-12 w-12 rounded-full border",
              article.draft ? "border-divider" : "border-transparent bg-positive"
            )
          }
        ),
        article.draft ? /* @__PURE__ */ jsx(Trans, { message: "Draft" }) : /* @__PURE__ */ jsx(Trans, { message: "Published" })
      ] }),
      /* @__PURE__ */ jsx(TogglePublishedButton, { article })
    ] }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "link",
        color: "primary",
        elementType: Link,
        to: getArticleLink(article, { section: (_a2 = article.sections) == null ? void 0 : _a2[0] }),
        endIcon: /* @__PURE__ */ jsx(OpenInNewIcon, {}),
        target: "_blank",
        size: "xs",
        className: "mt-18",
        children: /* @__PURE__ */ jsx(Trans, { message: "Preview in Help Center" })
      }
    )
  ] });
}
function CreateArticlePage() {
  const { sectionId } = useParams();
  const navigate = useNavigate$1();
  const { trans } = useTrans();
  const editor = useRef();
  const { user } = useAuth();
  const form = useForm({
    defaultValues: {
      draft: true,
      sections: sectionId ? [parseInt(sectionId)] : [],
      author_id: user == null ? void 0 : user.id
    }
  });
  const createArticle2 = useCreateArticle(form);
  const handleSave = () => {
    if (!editor.current)
      return null;
    createArticle2.mutate(
      {
        ...form.getValues(),
        body: editor.current.getHTML()
      },
      {
        onSuccess: (response) => {
          toast(trans(message("Article created")));
          navigate(`../${response.article.id}/edit`, {
            relative: "path",
            replace: true
          });
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(FormProvider, { ...form, children: [
    /* @__PURE__ */ jsx(StaticPageTitle, { children: /* @__PURE__ */ jsx(Trans, { message: "New article" }) }),
    /* @__PURE__ */ jsx(
      ArticleEditorLayout,
      {
        aside: /* @__PURE__ */ jsx(
          ArticleEditorAside,
          {
            onSave: () => handleSave(),
            isSaving: createArticle2.isPending,
            children: /* @__PURE__ */ jsxs(
              FormSelect,
              {
                name: "draft",
                label: /* @__PURE__ */ jsx(Trans, { message: "Publication status" }),
                selectionMode: "single",
                background: "bg",
                className: "mb-24",
                children: [
                  /* @__PURE__ */ jsx(Item, { value: false, children: /* @__PURE__ */ jsx(Trans, { message: "Published" }) }),
                  /* @__PURE__ */ jsx(Item, { value: true, children: /* @__PURE__ */ jsx(Trans, { message: "Draft" }) })
                ]
              }
            )
          }
        ),
        children: /* @__PURE__ */ jsx(HcArticleBodyEditor, { onLoad: (e) => editor.current = e })
      }
    )
  ] });
}
function ChartLayout(props) {
  const {
    title,
    description,
    children,
    className,
    contentIsFlex = true,
    contentClassName,
    contentRef,
    minHeight = "min-h-440"
  } = props;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "rounded-panel flex h-full flex-auto flex-col border bg",
        minHeight,
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-shrink-0 items-center justify-between p-14 text-xs", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: title }),
          description && /* @__PURE__ */ jsx("div", { className: "text-muted", children: description })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: contentRef,
            className: clsx(
              "relative p-14",
              contentIsFlex && "flex flex-auto items-center justify-center",
              contentClassName
            ),
            children
          }
        )
      ]
    }
  );
}
function ChartLoadingIndicator() {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10 text-sm absolute mx-auto", children: [
    /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true, size: "sm" }),
    /* @__PURE__ */ jsx(Trans, { message: "Chart loading" })
  ] });
}
const LazyChart = lazy(() => import("./lazy-chart-9300132f.mjs"));
function BaseChart(props) {
  const { title, description, className, contentRef, isLoading } = props;
  return /* @__PURE__ */ jsx(
    ChartLayout,
    {
      title,
      description,
      className,
      contentRef,
      children: /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx(ChartLoadingIndicator, {}), children: [
        /* @__PURE__ */ jsx(LazyChart, { ...props }),
        isLoading && /* @__PURE__ */ jsx(ChartLoadingIndicator, {})
      ] })
    }
  );
}
function formatReportData(report, { localeCode = "en", shareFirstDatasetLabels = true }) {
  if (!report)
    return { datasets: [] };
  const firstDatasetLabels = [];
  return {
    ...report,
    datasets: report.datasets.map((dataset, datasetIndex) => {
      const data = dataset.data.map((datasetItem, itemIndex) => {
        let label;
        if (datasetIndex === 0 || !shareFirstDatasetLabels) {
          label = generateDatasetLabels(
            datasetItem,
            report.granularity,
            localeCode
          );
          firstDatasetLabels[itemIndex] = label;
        } else {
          label = firstDatasetLabels[itemIndex];
        }
        return {
          ...label,
          value: datasetItem.value
        };
      });
      return { ...dataset, data };
    })
  };
}
function generateDatasetLabels(datum, granularity, locale) {
  if (datum.label) {
    return { label: datum.label };
  }
  if (!datum.date) {
    return { label: "" };
  }
  return generateTimeLabels(datum, granularity, locale);
}
function generateTimeLabels({ date: isoDate, endDate: isoEndDate }, granularity = "day", locale) {
  const date = parseAbsoluteToLocal(isoDate).toDate();
  const endDate = isoEndDate ? parseAbsoluteToLocal(isoEndDate).toDate() : null;
  switch (granularity) {
    case "minute":
      return {
        label: getFormatter(locale, {
          second: "2-digit"
        }).format(date),
        tooltipTitle: getFormatter(locale, {
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          second: "2-digit"
        }).format(date)
      };
    case "hour":
      return {
        label: getFormatter(locale, {
          hour: "numeric",
          minute: "numeric"
        }).format(date),
        tooltipTitle: getFormatter(locale, {
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric"
        }).format(date)
      };
    case "day":
      return {
        label: getFormatter(locale, {
          day: "2-digit",
          weekday: "short"
        }).format(date),
        tooltipTitle: getFormatter(locale, {
          day: "2-digit",
          weekday: "short",
          month: "short"
        }).format(date)
      };
    case "week":
      return {
        label: getFormatter(locale, {
          month: "short",
          day: "2-digit"
        }).format(date),
        tooltipTitle: getFormatter(locale, {
          day: "2-digit",
          month: "long",
          year: "numeric"
        }).formatRange(date, endDate)
      };
    case "month":
      return {
        label: getFormatter(locale, {
          month: "short",
          year: "numeric"
        }).format(date),
        tooltipTitle: getFormatter(locale, {
          month: "long",
          year: "numeric"
        }).format(date)
      };
    case "year":
      return {
        label: getFormatter(locale, {
          year: "numeric"
        }).format(date),
        tooltipTitle: getFormatter(locale, {
          year: "numeric"
        }).format(date)
      };
  }
}
const getFormatter = memoize(
  (locale, options) => {
    return new DateFormatter(locale, options);
  },
  {
    equals: (a, b) => {
      return shallowEqual(a, b);
    },
    callTimeout: void 0
  }
);
const primaryColor = getBootstrapData().themes.all[0].values["--be-primary"];
const ChartColors = [
  [
    `rgb(${primaryColor.replaceAll(" ", ",")})`,
    `rgba(${primaryColor.replaceAll(" ", ",")},0.2)`
  ],
  ["rgb(255,112,67)", "rgb(255,112,67,0.2)"],
  ["rgb(255,167,38)", "rgb(255,167,38,0.2)"],
  ["rgb(141,110,99)", "rgb(141,110,99,0.2)"],
  ["rgb(102,187,106)", "rgba(102,187,106,0.2)"],
  ["rgb(92,107,192)", "rgb(92,107,192,0.2)"]
];
const LineChartOptions = {
  parsing: {
    xAxisKey: "label",
    yAxisKey: "value"
  },
  datasets: {
    line: {
      fill: "origin",
      tension: 0.1,
      pointBorderWidth: 4,
      pointHitRadius: 10
    }
  },
  plugins: {
    tooltip: {
      intersect: false,
      mode: "index"
    }
  }
};
function LineChart({ data, className, ...props }) {
  const { localeCode } = useSelectedLocale();
  const formattedData = useMemo(() => {
    const formattedData2 = formatReportData(data, { localeCode });
    formattedData2.datasets = formattedData2.datasets.map((dataset, i) => ({
      ...dataset,
      backgroundColor: ChartColors[i][1],
      borderColor: ChartColors[i][0],
      pointBackgroundColor: ChartColors[i][0]
    }));
    return formattedData2;
  }, [data, localeCode]);
  return /* @__PURE__ */ jsx(
    BaseChart,
    {
      ...props,
      className: clsx(className, "min-w-500"),
      data: formattedData,
      type: "line",
      options: LineChartOptions
    }
  );
}
const endpoint = "reports/tickets";
function useTicketReport(payload) {
  return useQuery({
    queryKey: [endpoint, payload],
    queryFn: () => fetchTicketReport(endpoint, payload),
    placeholderData: keepPreviousData
  });
}
function fetchTicketReport(endpoint2, payload) {
  return apiClient.get(endpoint2, { params: dateRangeValueToPayload(payload) }).then((response) => response.data);
}
function BarChart({
  data,
  direction = "vertical",
  individualBarColors = false,
  className,
  ...props
}) {
  const { localeCode } = useSelectedLocale();
  const formattedData = useMemo(() => {
    const formattedData2 = formatReportData(data, { localeCode });
    formattedData2.datasets = formattedData2.datasets.map((dataset, i) => ({
      ...dataset,
      backgroundColor: individualBarColors ? ChartColors.map((c) => c[1]) : ChartColors[i][1],
      borderColor: individualBarColors ? ChartColors.map((c) => c[0]) : ChartColors[i][0],
      borderWidth: 2
    }));
    return formattedData2;
  }, [data, localeCode, individualBarColors]);
  const isHorizontal = direction === "horizontal";
  const options = useMemo(() => {
    return {
      indexAxis: isHorizontal ? "y" : "x",
      parsing: {
        xAxisKey: isHorizontal ? "value" : "label",
        yAxisKey: isHorizontal ? "label" : "value"
      }
    };
  }, [isHorizontal]);
  return /* @__PURE__ */ jsx(
    BaseChart,
    {
      type: "bar",
      className: clsx(className, "min-w-500"),
      data: formattedData,
      options,
      ...props
    }
  );
}
const days = [0, 1, 2, 3, 4, 5, 6];
const hours = [
  "0-2",
  "2-4",
  "4-6",
  "6-8",
  "8-10",
  "10-12",
  "12-14",
  "14-16",
  "16-18",
  "18-20",
  "20-22",
  "22-24"
];
function BusiestTimeOfDayChart({ report }) {
  const locale = useSelectedLocale();
  const formatter = useDateFormatter({ weekday: "short" });
  const date = startOfWeek(useCurrentDateTime(), locale.localeCode);
  return /* @__PURE__ */ jsx(ChartLayout, { title: /* @__PURE__ */ jsx(Trans, { message: "Busiest time of day" }), children: /* @__PURE__ */ jsxs("div", { className: "grid w-full grid-cols-[max-content,repeat(12,minmax(66px,1fr))] gap-1", children: [
    /* @__PURE__ */ jsx("div", { className: "spacer" }),
    hours.map((hour) => /* @__PURE__ */ jsx("div", { className: "py-6 text-center text-xs font-semibold", children: hour }, hour)),
    days.map((day) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-44 items-center pr-10 text-xs font-semibold", children: formatter.format(date.add({ days: day }).toDate()) }),
      hours.map((hour) => {
        const count = report ? report.datasets[0].data[day].value[hour] : 0;
        return /* @__PURE__ */ jsx(
          Tooltip,
          {
            label: /* @__PURE__ */ jsx(Trans, { message: ":count new tickets", values: { count } }),
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "h-44 bg-primary opacity-10 transition-opacity",
                style: {
                  opacity: report ? getOpacity(count, report.datasets[0].max) : 0.1
                }
              }
            )
          },
          hour
        );
      })
    ] }, day))
  ] }) });
}
function getOpacity(count, max) {
  if (count === 0)
    return 0.1;
  return Math.max(0.1, Math.min(1, count / max));
}
function AgentPerformanceTable({ report }) {
  var _a2;
  const data = report == null ? void 0 : report.datasets[0].data;
  const cmpData = (_a2 = report == null ? void 0 : report.datasets[1]) == null ? void 0 : _a2.data;
  return /* @__PURE__ */ jsx(
    ChartLayout,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Agent performance" }),
      contentIsFlex: false,
      minHeight: "min-h-0",
      children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { className: "text-xs font-medium text-muted", children: /* @__PURE__ */ jsxs("tr", { className: "h-40", children: [
          /* @__PURE__ */ jsx("th", { className: "border-b text-left", children: /* @__PURE__ */ jsx(Trans, { message: "Agent" }) }),
          /* @__PURE__ */ jsx("th", { className: "border-b text-left", children: /* @__PURE__ */ jsx(Trans, { message: "Reply count" }) }),
          /* @__PURE__ */ jsx("th", { className: "border-b text-left", children: /* @__PURE__ */ jsx(Trans, { message: "Tickets solved" }) }),
          /* @__PURE__ */ jsx("th", { className: "border-b text-left", children: /* @__PURE__ */ jsx(Trans, { message: "Avg response time" }) })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: data == null ? void 0 : data.map((agent, i) => {
          const isLast = i === data.length - 1;
          return /* @__PURE__ */ jsxs("tr", { className: "h-40 text-sm", children: [
            /* @__PURE__ */ jsx("td", { className: !isLast ? "border-b" : void 0, children: agent.email }),
            /* @__PURE__ */ jsxs("td", { className: !isLast ? "border-b" : void 0, children: [
              agent.replyCount,
              cmpData && /* @__PURE__ */ jsx(
                CompareValue,
                {
                  currentValue: agent.replyCount,
                  previousValue: cmpData[i].replyCount
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("td", { className: !isLast ? "border-b" : void 0, children: [
              agent.ticketsSolved,
              cmpData && /* @__PURE__ */ jsx(
                CompareValue,
                {
                  currentValue: agent.ticketsSolved,
                  previousValue: cmpData[i].ticketsSolved
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("td", { className: !isLast ? "border-b" : void 0, children: [
              agent.averageResponseTime,
              "h",
              cmpData && /* @__PURE__ */ jsx(
                CompareValue,
                {
                  currentValue: agent.averageResponseTime,
                  previousValue: cmpData[i].averageResponseTime
                }
              )
            ] })
          ] }, i);
        }) })
      ] })
    }
  );
}
function CompareValue({ currentValue, previousValue }) {
  const percent = calculatePercentage$1(currentValue, previousValue);
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: clsx("pl-6", percent > 0 ? "text-positive" : "text-danger"),
      children: [
        percent,
        "%"
      ]
    }
  );
}
function calculatePercentage$1(currentValue, previousValue) {
  if (previousValue == null || currentValue == null) {
    return 0;
  }
  if (previousValue === 0) {
    return 100;
  }
  return Math.round((currentValue - previousValue) / previousValue * 100);
}
const TrendingUpIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" }),
  "TrendingUpOutlined"
);
const TrendingDownIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m16 18 2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6h-6z" }),
  "TrendingDownOutlined"
);
const PolarAreaChartOptions = {
  parsing: {
    key: "value"
  },
  plugins: {
    tooltip: {
      intersect: true
    }
  }
};
function PolarAreaChart({
  data,
  className,
  ...props
}) {
  const { localeCode } = useSelectedLocale();
  const formattedData = useMemo(() => {
    var _a2;
    const formattedData2 = formatReportData(data, { localeCode });
    formattedData2.labels = (_a2 = formattedData2.datasets[0]) == null ? void 0 : _a2.data.map((d) => d.label);
    formattedData2.datasets = formattedData2.datasets.map((dataset, i) => ({
      ...dataset,
      backgroundColor: ChartColors.map((c) => c[1]),
      borderColor: ChartColors.map((c) => c[0]),
      borderWidth: 2
    }));
    return formattedData2;
  }, [data, localeCode]);
  return /* @__PURE__ */ jsx(
    BaseChart,
    {
      type: "polarArea",
      data: formattedData,
      options: PolarAreaChartOptions,
      className: clsx(className, "min-w-500"),
      ...props
    }
  );
}
const loaderUrl = "https://www.gstatic.com/charts/loader.js";
function useGoogleGeoChart({
  placeholderRef,
  data,
  country,
  onCountrySelected
}) {
  const { trans } = useTrans();
  const { analytics } = useSettings();
  const apiKey = analytics == null ? void 0 : analytics.gchart_api_key;
  const { selectedTheme } = useThemeSelector();
  const geoChartRef = useRef();
  const regionInteractivity = !!onCountrySelected && !country;
  const drawGoogleChart = useCallback(() => {
    var _a2, _b;
    if (typeof google === "undefined")
      return;
    const seedData = data.map((location) => [location.label, location.value]);
    seedData.unshift([
      country ? trans(message("City")) : trans(message("Country")),
      trans(message("Clicks"))
    ]);
    const backgroundColor = `${themeValueToHex(
      selectedTheme.values["--be-paper"]
    )}`;
    const chartColor = `${themeValueToHex(
      selectedTheme.values["--be-primary"]
    )}`;
    const options = {
      colorAxis: { colors: [chartColor] },
      backgroundColor,
      region: country ? country.toUpperCase() : void 0,
      resolution: country ? "provinces" : "countries",
      displayMode: country ? "markers" : "regions",
      enableRegionInteractivity: regionInteractivity
    };
    if (!geoChartRef.current && placeholderRef.current && ((_a2 = google == null ? void 0 : google.visualization) == null ? void 0 : _a2.GeoChart)) {
      geoChartRef.current = new google.visualization.GeoChart(
        placeholderRef.current
      );
    }
    (_b = geoChartRef.current) == null ? void 0 : _b.draw(
      google.visualization.arrayToDataTable(seedData),
      options
    );
  }, [
    selectedTheme,
    data,
    placeholderRef,
    trans,
    country,
    regionInteractivity
  ]);
  const initGoogleGeoChart = useCallback(async () => {
    if (lazyLoader.isLoadingOrLoaded(loaderUrl))
      return;
    await lazyLoader.loadAsset(loaderUrl, { type: "js", id: "google-charts-js" });
    await google.charts.load("current", {
      packages: ["geochart"],
      mapsApiKey: apiKey
    });
    drawGoogleChart();
  }, [apiKey, drawGoogleChart]);
  useEffect(() => {
    if (geoChartRef.current && onCountrySelected) {
      google.visualization.events.addListener(
        geoChartRef.current,
        "regionClick",
        (a) => onCountrySelected == null ? void 0 : onCountrySelected(a.region)
      );
    }
    return () => {
      if (geoChartRef.current) {
        google.visualization.events.removeAllListeners(geoChartRef.current);
      }
    };
  }, [onCountrySelected, geoChartRef.current]);
  useEffect(() => {
    initGoogleGeoChart();
  }, [initGoogleGeoChart]);
  useEffect(() => {
    drawGoogleChart();
  }, [selectedTheme, drawGoogleChart, data]);
  return { drawGoogleChart };
}
const FormattedCountryName = memo(({ code: countryCode }) => {
  const { localeCode } = useSelectedLocale();
  const regionNames = new Intl.DisplayNames([localeCode], { type: "region" });
  let formattedName;
  try {
    formattedName = regionNames.of(countryCode.toUpperCase());
  } catch (e) {
  }
  return /* @__PURE__ */ jsx(Fragment, { children: formattedName });
});
function GeoChart({
  data: metricData,
  isLoading,
  onCountrySelected,
  country,
  ...layoutProps
}) {
  const placeholderRef = useRef(null);
  const regionInteractivity = !!onCountrySelected;
  const initialData = metricData == null ? void 0 : metricData.datasets[0].data;
  const data = useMemo(() => {
    return initialData || [];
  }, [initialData]);
  useGoogleGeoChart({ placeholderRef, data, country, onCountrySelected });
  return /* @__PURE__ */ jsxs(
    ChartLayout,
    {
      ...layoutProps,
      className: "min-w-500",
      title: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(Trans, { message: "Top Locations" }),
        country ? /* @__PURE__ */ jsxs("span", { className: "pl-4", children: [
          "(",
          /* @__PURE__ */ jsx(FormattedCountryName, { code: country }),
          ")"
        ] }) : null,
        regionInteractivity && /* @__PURE__ */ jsx(InfoTrigger, {})
      ] }),
      contentIsFlex: isLoading,
      children: [
        isLoading && /* @__PURE__ */ jsx(ChartLoadingIndicator, {}),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-24", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: placeholderRef,
              className: "flex-auto w-[480px] min-h-[340px]"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "w-[170px]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm max-h-[340px] w-full flex-initial overflow-y-auto", children: data.map((location) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: clsx(
                  "flex items-center gap-4 mb-4",
                  regionInteractivity && "cursor-pointer hover:underline"
                ),
                role: regionInteractivity ? "button" : void 0,
                onClick: () => {
                  onCountrySelected == null ? void 0 : onCountrySelected(location.code);
                },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "max-w-110 whitespace-nowrap overflow-hidden overflow-ellipsis", children: location.label }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    "(",
                    location.percentage,
                    ")%"
                  ] })
                ]
              },
              location.label
            )) }),
            country && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "xs",
                className: "mt-14",
                startIcon: /* @__PURE__ */ jsx(ArrowBackIcon, {}),
                onClick: () => {
                  onCountrySelected == null ? void 0 : onCountrySelected(void 0);
                },
                children: /* @__PURE__ */ jsx(Trans, { message: "Back to countries" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function InfoTrigger() {
  return /* @__PURE__ */ jsx(
    InfoDialogTrigger,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Zooming in" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Click on a country inside the map or country list to zoom in and see city data for that country." })
    }
  );
}
const AdminReportPageColGap = "gap-12 md:gap-24 mb-12 md:mb-24";
const rowClassName$2 = `flex flex-col md:flex-row md:items-center overflow-x-auto ${AdminReportPageColGap}`;
function VisitorsReportCharts({
  report,
  isLoading
}) {
  const totalViews = report == null ? void 0 : report.pageViews.total;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: rowClassName$2, children: [
      /* @__PURE__ */ jsx(
        LineChart,
        {
          isLoading,
          className: "flex-auto",
          data: report == null ? void 0 : report.pageViews,
          title: /* @__PURE__ */ jsx(Trans, { message: "Pageviews" }),
          description: totalViews ? /* @__PURE__ */ jsx(
            Trans,
            {
              message: ":count total views",
              values: { count: /* @__PURE__ */ jsx(FormattedNumber, { value: totalViews }) }
            }
          ) : null
        }
      ),
      /* @__PURE__ */ jsx(
        PolarAreaChart,
        {
          isLoading,
          data: report == null ? void 0 : report.devices,
          title: /* @__PURE__ */ jsx(Trans, { message: "Top devices" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: rowClassName$2, children: [
      /* @__PURE__ */ jsx(
        BarChart,
        {
          isLoading,
          data: report == null ? void 0 : report.browsers,
          className: "flex-auto md:w-1/3",
          direction: "horizontal",
          individualBarColors: true,
          hideLegend: true,
          title: /* @__PURE__ */ jsx(Trans, { message: "Top browsers" })
        }
      ),
      /* @__PURE__ */ jsx(
        GeoChart,
        {
          isLoading,
          className: "flex-auto",
          data: report == null ? void 0 : report.locations,
          title: /* @__PURE__ */ jsx(Trans, { message: "Top locations" })
        }
      )
    ] })
  ] });
}
const TrendingFlatIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m22 12-4-4v3H3v2h15v3l4-4z" }),
  "TrendingFlatOutlined"
);
function AdminHeaderReport({ report, isLoading }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex h-[97px] flex-shrink-0 items-center overflow-x-auto ${AdminReportPageColGap}`,
      children: report == null ? void 0 : report.map((datum) => /* @__PURE__ */ jsx(ReportItem, { datum, isLoading }, datum.name))
    }
  );
}
function ReportItem({ datum, isLoading = false }) {
  let icon;
  if (isValidElement(datum.icon)) {
    icon = cloneElement(datum.icon, { size: "lg" });
  } else {
    const IconEl = createSvgIconFromTree(datum.icon);
    icon = /* @__PURE__ */ jsx(IconEl, { size: "lg" });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-panel flex h-full flex-auto items-center gap-18 whitespace-nowrap border p-20",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 rounded-lg bg-primary-light/20 p-10 text-primary", children: icon }),
        /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-20", children: /* @__PURE__ */ jsx("div", { className: "text-lg font-bold text-main", children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: isLoading ? /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(Skeleton, { className: "min-w-24" }) }, "skeleton") : /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(FormattedValue, { datum }) }, "value") }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-20", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-sm text-muted", children: datum.name }),
            (datum.percentageChange != null || datum.previousValue != null) && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-10", children: /* @__PURE__ */ jsx(TrendingIndicator, { datum }) })
          ] })
        ] })
      ]
    },
    datum.name
  );
}
function FormattedValue({ datum }) {
  switch (datum.type) {
    case "fileSize":
      return /* @__PURE__ */ jsx(FormattedBytes, { bytes: datum.currentValue });
    case "percentage":
      return /* @__PURE__ */ jsx(
        FormattedNumber,
        {
          value: datum.currentValue,
          style: "percent",
          maximumFractionDigits: 1
        }
      );
    default:
      return /* @__PURE__ */ jsx(FormattedNumber, { value: datum.currentValue });
  }
}
function TrendingIndicator({ datum }) {
  const percentage = calculatePercentage(datum);
  let icon;
  if (percentage > 0) {
    icon = /* @__PURE__ */ jsx(TrendingUpIcon, { size: "md", className: "text-positive" });
  } else if (percentage === 0) {
    icon = /* @__PURE__ */ jsx(TrendingFlatIcon, { className: "text-muted" });
  } else {
    icon = /* @__PURE__ */ jsx(TrendingDownIcon, { className: "text-danger" });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    icon,
    /* @__PURE__ */ jsxs("div", { className: "text-sm font-semibold text-muted", children: [
      percentage,
      "%"
    ] })
  ] });
}
function calculatePercentage({
  percentageChange,
  previousValue,
  currentValue
}) {
  if (percentageChange != null || previousValue == null || currentValue == null) {
    return percentageChange ?? 0;
  }
  if (previousValue === 0) {
    return 100;
  }
  return Math.round((currentValue - previousValue) / previousValue * 100);
}
const HelpOutlineIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" }),
  "HelpOutlineOutlined"
);
const SendIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m4.01 6.03 7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3 2 10l15 2-15 2 .01 7L23 12 2.01 3z" }),
  "SendOutlined"
);
const EmojiEventsIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm7 6c-1.65 0-3-1.35-3-3V5h6v6c0 1.65-1.35 3-3 3zm7-6c0 1.3-.84 2.4-2 2.82V7h2v1z" }),
  "EmojiEventsOutlined"
);
function TicketReportHeader({ data, isLoading }) {
  const report = useMemo(() => {
    var _a2, _b, _c, _d;
    return [
      {
        name: "New tickets",
        currentValue: (data == null ? void 0 : data.newTickets.datasets[0].total) ?? 0,
        previousValue: ((_a2 = data == null ? void 0 : data.newTickets.datasets[1]) == null ? void 0 : _a2.total) ?? void 0,
        icon: /* @__PURE__ */ jsx(SendIcon, {})
      },
      {
        name: "Solved tickets",
        currentValue: (data == null ? void 0 : data.newTickets.datasets[0].solvedTotal) ?? 0,
        previousValue: ((_b = data == null ? void 0 : data.newTickets.datasets[1]) == null ? void 0 : _b.solvedTotal) ?? void 0,
        icon: /* @__PURE__ */ jsx(CheckIcon, {})
      },
      {
        name: "Unsolved tickets",
        currentValue: (data == null ? void 0 : data.newTickets.datasets[0].unsolvedTotal) ?? 0,
        previousValue: ((_c = data == null ? void 0 : data.newTickets.datasets[1]) == null ? void 0 : _c.unsolvedTotal) ?? void 0,
        icon: /* @__PURE__ */ jsx(HelpOutlineIcon, {})
      },
      {
        name: "Solved on first reply",
        currentValue: (data == null ? void 0 : data.newTickets.datasets[0].solvedOnFirstReplyPercentage) ?? 0,
        previousValue: ((_d = data == null ? void 0 : data.newTickets.datasets[1]) == null ? void 0 : _d.solvedOnFirstReplyPercentage) ?? void 0,
        icon: /* @__PURE__ */ jsx(EmojiEventsIcon, {}),
        type: "percentage"
      }
    ];
  }, [data]);
  return /* @__PURE__ */ jsx(AdminHeaderReport, { report, isLoading });
}
const monthDayFormat = {
  month: "short",
  day: "2-digit"
};
function ReportDateSelector({
  value,
  onChange,
  disabled,
  compactOnMobile = true,
  enableCompare = false,
  granularity = "minute"
}) {
  const isMobile = useIsMobileMediaQuery();
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      type: "popover",
      onClose: (value2) => {
        if (value2) {
          onChange(value2);
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            color: "chip",
            endIcon: /* @__PURE__ */ jsx(DateRangeIcon, {}),
            disabled,
            children: /* @__PURE__ */ jsx(
              FormattedDateTimeRange,
              {
                start: value.start,
                end: value.end,
                options: isMobile && compactOnMobile ? monthDayFormat : DateFormatPresets.short
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          DateSelectorDialog,
          {
            value,
            enableCompare,
            granularity
          }
        )
      ]
    }
  );
}
function DateSelectorDialog({
  value,
  enableCompare,
  granularity
}) {
  const isMobile = useIsMobileMediaQuery();
  const state = useDateRangePickerState({
    granularity,
    defaultValue: {
      start: value.start,
      end: value.end,
      preset: value.preset
    },
    closeDialogOnSelection: false
  });
  const compareHasInitialValue = !!value.compareStart && !!value.compareEnd;
  const compareState = useDateRangePickerState({
    granularity,
    defaultValue: compareHasInitialValue ? {
      start: value.compareStart,
      end: value.compareEnd,
      preset: value.comparePreset
    } : DateRangeComparePresets[0].getRangeValue(state.selectedValue)
  });
  return /* @__PURE__ */ jsx(
    DateRangeDialog,
    {
      state,
      compareState: enableCompare ? compareState : void 0,
      compareVisibleDefault: compareHasInitialValue,
      showInlineDatePickerField: !isMobile
    }
  );
}
const NavigationItems = [
  { name: "tickets", to: "/admin/tickets", label: message("Tickets") },
  { name: "search", to: "/admin/search/failed", label: message("Search") },
  { name: "envato", to: "/admin/envato", label: message("Envato") },
  { name: "visitors", to: "/admin/visitors", label: message("Visitors") }
];
function BedeskAdminReportLayout({
  title,
  name,
  children,
  dateRange,
  setDateRange,
  disableDateRange,
  enableCompare,
  granularity
}) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-full overflow-x-hidden p-12 md:p-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-24 items-center justify-between gap-24 md:flex", children: [
      /* @__PURE__ */ jsx(StaticPageTitle, { children: title }),
      /* @__PURE__ */ jsx("h1", { className: "mb-24 text-3xl font-light md:mb-0", children: title }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-shrink-0 items-center justify-between gap-10 md:gap-24", children: [
        /* @__PURE__ */ jsx(ReportSelector, { value: name }),
        /* @__PURE__ */ jsx(
          ReportDateSelector,
          {
            disabled: disableDateRange,
            value: dateRange,
            onChange: setDateRange,
            enableCompare,
            granularity
          }
        )
      ] })
    ] }),
    children
  ] });
}
function ReportSelector({ value }) {
  const { envato } = useSettings();
  const items = NavigationItems.filter(
    (item) => item.name !== "envato" || (envato == null ? void 0 : envato.enable)
  );
  const activeItem = NavigationItems.find((item) => item.name === value);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ButtonGroup, { variant: "outline", value, className: "max-md:hidden", children: items.map((item) => /* @__PURE__ */ jsx(
      Button,
      {
        value: item.name,
        elementType: Link,
        to: item.to,
        children: /* @__PURE__ */ jsx(Trans, { ...item.label })
      },
      item.name
    )) }),
    /* @__PURE__ */ jsxs(MenuTrigger, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          className: "md:hidden",
          startIcon: /* @__PURE__ */ jsx(TrendingUpIcon, {}),
          children: /* @__PURE__ */ jsx(Trans, { ...activeItem.label })
        }
      ),
      /* @__PURE__ */ jsx(Menu, { children: items.map((item) => /* @__PURE__ */ jsx(
        Item,
        {
          value: item.name,
          elementType: Link,
          to: item.to,
          children: /* @__PURE__ */ jsx(Trans, { ...item.label })
        },
        item.name
      )) })
    ] })
  ] });
}
function useBedeskReportDateRangeState(defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateRange, setStateDateRange] = useState(() => {
    try {
      const startDate = searchParams.get("startDate");
      const endDate = searchParams.get("endDate");
      const compareStartDate = searchParams.get("compareStartDate");
      const compareEndDate = searchParams.get("compareEndDate");
      if (startDate && endDate) {
        return {
          start: parseAbsoluteToLocal(startDate),
          end: parseAbsoluteToLocal(endDate),
          compareStart: compareStartDate ? parseAbsoluteToLocal(compareStartDate) : void 0,
          compareEnd: compareEndDate ? parseAbsoluteToLocal(compareEndDate) : void 0
        };
      }
    } catch (e) {
    }
    return defaultValue || DateRangePresets[2].getRangeValue();
  });
  const setDateRange = useCallback(
    (dateRange2) => {
      setStateDateRange(dateRange2);
      setSearchParams(
        (prev) => {
          if (dateRange2.start) {
            prev.set("startDate", dateRange2.start.toAbsoluteString());
          } else {
            prev.delete("startDate");
          }
          if (dateRange2.end) {
            prev.set("endDate", dateRange2.end.toAbsoluteString());
          } else {
            prev.delete("endDate");
          }
          if (dateRange2.compareStart) {
            prev.set(
              "compareStartDate",
              dateRange2.compareStart.toAbsoluteString()
            );
          } else {
            prev.delete("compareStartDate");
          }
          if (dateRange2.compareEnd) {
            prev.set("compareEndDate", dateRange2.compareEnd.toAbsoluteString());
          } else {
            prev.delete("compareEndDate");
          }
          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );
  return [dateRange, setDateRange];
}
const colGap$1 = "gap-12 md:gap-24 mb-12 md:mb-24";
const rowClassName$1 = `flex flex-col lg:flex-row lg:items-center overflow-x-auto ${colGap$1}`;
function AdminTicketReport() {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const [dateRange, setDateRange] = useBedeskReportDateRangeState();
  const query = useTicketReport({ dateRange });
  return /* @__PURE__ */ jsxs(
    BedeskAdminReportLayout,
    {
      name: "tickets",
      title: /* @__PURE__ */ jsx(Trans, { message: "Ticket report" }),
      dateRange,
      setDateRange,
      enableCompare: true,
      children: [
        /* @__PURE__ */ jsx(TicketReportHeader, { data: query.data, isLoading: query.isLoading }),
        /* @__PURE__ */ jsxs("div", { className: rowClassName$1, children: [
          /* @__PURE__ */ jsx(
            LineChart,
            {
              data: (_a2 = query.data) == null ? void 0 : _a2.newTickets,
              className: "flex-auto",
              isLoading: query.isLoading,
              title: /* @__PURE__ */ jsx(Trans, { message: "New tickets" }),
              hideLegend: true,
              description: /* @__PURE__ */ jsx(
                Trans,
                {
                  message: ":count total tickets",
                  values: {
                    count: /* @__PURE__ */ jsx(
                      FormattedNumber,
                      {
                        value: ((_d = (_c = (_b = query.data) == null ? void 0 : _b.newTickets) == null ? void 0 : _c.datasets[0]) == null ? void 0 : _d.total) || 0
                      }
                    )
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            BarChart,
            {
              data: (_e = query.data) == null ? void 0 : _e.firstReplyTimes,
              className: "max-w-500",
              direction: "vertical",
              individualBarColors: true,
              isLoading: query.isLoading,
              hideLegend: true,
              title: /* @__PURE__ */ jsx(Trans, { message: "Hours until first agent reply" }),
              description: /* @__PURE__ */ jsx(
                Trans,
                {
                  message: ":hoursh average",
                  values: {
                    hours: /* @__PURE__ */ jsx(
                      FormattedNumber,
                      {
                        value: ((_g = (_f = query.data) == null ? void 0 : _f.firstReplyTimes.datasets[0]) == null ? void 0 : _g.average) || 0
                      }
                    )
                  }
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: rowClassName$1, children: [
          /* @__PURE__ */ jsx(BusiestTimeOfDayChart, { report: (_h = query.data) == null ? void 0 : _h.busiestTimeOfDay }),
          /* @__PURE__ */ jsx(
            BarChart,
            {
              data: (_i = query.data) == null ? void 0 : _i.tags,
              className: "max-w-620",
              direction: "horizontal",
              isLoading: query.isLoading,
              individualBarColors: true,
              hideLegend: true,
              title: /* @__PURE__ */ jsx(Trans, { message: "Tickets by tags" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: rowClassName$1, children: /* @__PURE__ */ jsx(AgentPerformanceTable, { report: (_j = query.data) == null ? void 0 : _j.agents }) })
      ]
    }
  );
}
const Endpoint = "admin/reports";
function useAdminReport(payload = {}) {
  return useQuery({
    queryKey: [Endpoint, payload],
    queryFn: () => fetchAnalyticsReport(payload),
    placeholderData: keepPreviousData
  });
}
function fetchAnalyticsReport({
  types,
  dateRange
}) {
  const params = {};
  if (types) {
    params.types = types.join(",");
  }
  if (dateRange) {
    params.startDate = dateRange.start.toAbsoluteString();
    params.endDate = dateRange.end.toAbsoluteString();
    params.timezone = dateRange.start.timeZone;
  }
  return apiClient.get(Endpoint, { params }).then((response) => response.data);
}
function AdminVisitorsReport() {
  const [dateRange, setDateRange] = useBedeskReportDateRangeState();
  const { data, isLoading, isPlaceholderData } = useAdminReport({
    types: ["visitors"],
    dateRange
  });
  return /* @__PURE__ */ jsxs(
    BedeskAdminReportLayout,
    {
      name: "visitors",
      title: /* @__PURE__ */ jsx(Trans, { message: "Visitors report" }),
      dateRange,
      setDateRange,
      enableCompare: true,
      children: [
        /* @__PURE__ */ jsx(HeaderReport, { dateRange }),
        /* @__PURE__ */ jsx(
          VisitorsReportCharts,
          {
            isLoading: isLoading || isPlaceholderData,
            report: data == null ? void 0 : data.visitorsReport
          }
        )
      ]
    }
  );
}
function HeaderReport({ dateRange }) {
  const { data, isLoading, isPlaceholderData } = useAdminReport({
    types: ["header"],
    dateRange
  });
  return /* @__PURE__ */ jsx(AdminHeaderReport, { report: data == null ? void 0 : data.headerReport, isLoading });
}
const PageTabs = [
  { uri: "failed", label: message("Failed searches"), key: 0 },
  { uri: "popular", label: message("Popular searches"), key: 1 },
  { uri: "articles", label: message("Popular articles"), key: 2 }
];
function AdminSearchReport() {
  const [dateRange, setDateRange] = useBedeskReportDateRangeState(
    DateRangePresets[8].getRangeValue()
  );
  const { pathname } = useLocation();
  const tabName = pathname.split("/").pop();
  const selectedTab = PageTabs.find((tab) => tab.uri === tabName) || PageTabs[0];
  return /* @__PURE__ */ jsx(
    BedeskAdminReportLayout,
    {
      title: /* @__PURE__ */ jsx(Trans, { ...selectedTab.label }),
      name: "search",
      dateRange,
      setDateRange,
      disableDateRange: selectedTab.key === 2,
      children: /* @__PURE__ */ jsxs(Tabs, { selectedTab: selectedTab.key, children: [
        /* @__PURE__ */ jsx(TabList, { children: PageTabs.map((tab) => /* @__PURE__ */ jsx(
          Tab,
          {
            width: "min-w-132",
            elementType: Link,
            to: `/admin/search/${tab.uri}`,
            replace: true,
            children: /* @__PURE__ */ jsx(Trans, { ...tab.label })
          },
          tab.key
        )) }),
        /* @__PURE__ */ jsx("div", { className: "pt-34", children: /* @__PURE__ */ jsx(Outlet, { context: { dateRange } }) })
      ] })
    }
  );
}
function FailedSearchesReport() {
  const { dateRange } = useOutletContext();
  return /* @__PURE__ */ jsx(
    SearchReportTable,
    {
      dateRange,
      failedSearches: true,
      description: /* @__PURE__ */ jsx(Trans, { message: "This report shows search terms people use that don't match any articles. Use this metric to improve your help center search and content." })
    }
  );
}
function PopularSearchesReport() {
  const { dateRange } = useOutletContext();
  return /* @__PURE__ */ jsx(
    SearchReportTable,
    {
      dateRange,
      description: /* @__PURE__ */ jsx(Trans, { message: "Use the popular searches report to see what your customers are looking for, and learn what your customers are most interested in or struggling with the most." })
    }
  );
}
function useArticlesReport(params) {
  return useQuery({
    queryKey: ["reports", "articles", params],
    queryFn: () => fetchArticleReport(params)
  });
}
function fetchArticleReport(params) {
  return apiClient.get(`reports/popular-articles`, {
    params: dateRangeValueToPayload(params)
  }).then((response) => response.data);
}
const ArticleReportTableColumns = [
  {
    key: "article",
    header: () => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Trans, { message: "Article" }) }),
      /* @__PURE__ */ jsx(
        InfoDialogTrigger,
        {
          body: /* @__PURE__ */ jsx(Trans, { message: "Use the popular articles report to see which articles are most popular, and which articles are the most or least helpful." })
        }
      )
    ] }),
    visibleInMode: "all",
    body: (item) => /* @__PURE__ */ jsx(Link, { to: getArticleLink(item), className: LinkStyle, target: "_blank", children: item.title })
  },
  {
    key: "views",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Views" }),
    width: "w-144",
    body: (item) => /* @__PURE__ */ jsx(FormattedNumber, { value: item.views })
  },
  {
    key: "score",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Score" }),
    width: "w-144",
    body: (item) => /* @__PURE__ */ jsxs("span", { children: [
      item.score,
      "%"
    ] })
  },
  {
    key: "likes",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Likes" }),
    width: "w-144",
    body: (item) => /* @__PURE__ */ jsx(FormattedNumber, { value: item.positive_votes })
  },
  {
    key: "dislikes",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Dislikes" }),
    width: "w-144",
    body: (item) => /* @__PURE__ */ jsx(FormattedNumber, { value: item.negative_votes })
  },
  {
    key: "category",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Category" }),
    visibleInMode: "all",
    body: (item) => /* @__PURE__ */ jsx(ArticlePath, { article: item })
  }
];
function ArticlesReport() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useArticlesReport({
    page: searchParams.get("page") || 1,
    perPage: searchParams.get("perPage") || 15
  });
  const { data, fetchStatus, isLoading, isPlaceholderData } = query;
  const items = (data == null ? void 0 : data.pagination.data) || [];
  const isEmpty = fetchStatus === "idle" && items.length === 0 || !isLoading && !isPlaceholderData && items.length === 0;
  return /* @__PURE__ */ jsxs("div", { className: "relative max-md:overflow-x-auto", children: [
    /* @__PURE__ */ jsx(GlobalLoadingProgress, { query }),
    /* @__PURE__ */ jsx(
      Table,
      {
        columns: ArticleReportTableColumns,
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
        title: /* @__PURE__ */ jsx(Trans, { message: "There are no articles to display" })
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
function useEnvatoReport(params) {
  return useQuery({
    queryKey: ["reports", "envato", params],
    queryFn: () => fetchEnvatoReport(params)
  });
}
function fetchEnvatoReport(params) {
  return apiClient.get(`reports/envato`, {
    params: dateRangeValueToPayload(params)
  }).then((response) => response.data);
}
const colGap = "gap-12 md:gap-24 mb-12 md:mb-24";
const rowClassName = `flex flex-col lg:flex-row lg:items-center overflow-x-auto ${colGap}`;
function EnvatoReport() {
  var _a2, _b, _c, _d, _e, _f, _g;
  const [dateRange, setDateRange] = useBedeskReportDateRangeState();
  const query = useEnvatoReport({
    dateRange
  });
  return /* @__PURE__ */ jsxs(
    BedeskAdminReportLayout,
    {
      name: "envato",
      title: /* @__PURE__ */ jsx(Trans, { message: "Envato report" }),
      dateRange,
      setDateRange,
      enableCompare: true,
      granularity: "day",
      children: [
        /* @__PURE__ */ jsxs("div", { className: rowClassName, children: [
          /* @__PURE__ */ jsx(
            LineChart,
            {
              data: (_a2 = query.data) == null ? void 0 : _a2.earnings,
              className: "flex-auto",
              isLoading: query.isLoading,
              title: /* @__PURE__ */ jsx(Trans, { message: "Earnings" }),
              hideLegend: true,
              description: /* @__PURE__ */ jsx(
                Trans,
                {
                  message: ":count total",
                  values: {
                    count: /* @__PURE__ */ jsx(
                      FormattedNumber,
                      {
                        value: ((_d = (_c = (_b = query.data) == null ? void 0 : _b.earnings) == null ? void 0 : _c.datasets[0]) == null ? void 0 : _d.total) || 0
                      }
                    )
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            BarChart,
            {
              data: (_e = query.data) == null ? void 0 : _e.items,
              className: "max-w-620",
              direction: "horizontal",
              isLoading: query.isLoading,
              individualBarColors: true,
              hideLegend: true,
              title: /* @__PURE__ */ jsx(Trans, { message: "Earnings by item" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: rowClassName, children: [
          /* @__PURE__ */ jsx(
            LineChart,
            {
              data: (_f = query.data) == null ? void 0 : _f.earningsVsTickets,
              className: "flex-auto",
              isLoading: query.isLoading,
              title: /* @__PURE__ */ jsx(Trans, { message: "Earnings vs tickets" })
            }
          ),
          /* @__PURE__ */ jsx(
            BarChart,
            {
              data: (_g = query.data) == null ? void 0 : _g.countries,
              className: "max-w-620",
              direction: "horizontal",
              isLoading: query.isLoading,
              individualBarColors: true,
              hideLegend: true,
              title: /* @__PURE__ */ jsx(Trans, { message: "Earnings by country" })
            }
          )
        ] })
      ]
    }
  );
}
const softwareEngineerSvg$1 = "/assets/software-engineer-ba026106.svg";
const TriggersDatatableColumns = [
  {
    key: "name",
    allowsSorting: true,
    visibleInMode: "all",
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (trigger) => trigger.name
  },
  {
    key: "times_fired",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Times used" }),
    body: (trigger) => /* @__PURE__ */ jsx(FormattedNumber, { value: trigger.times_fired })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (trigger) => /* @__PURE__ */ jsx(FormattedDate, { date: trigger.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    visibleInMode: "all",
    body: (trigger) => /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className: "text-muted",
        elementType: Link,
        to: `/admin/triggers/${trigger.id}/edit`,
        children: /* @__PURE__ */ jsx(EditIcon, {})
      }
    )
  }
];
function TriggersDatatablePage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "triggers",
      title: /* @__PURE__ */ jsx(Trans, { message: "Triggers" }),
      columns: TriggersDatatableColumns,
      actions: /* @__PURE__ */ jsx(Actions$5, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: softwareEngineerSvg$1,
          title: /* @__PURE__ */ jsx(Trans, { message: "No triggers have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching triggers" })
        }
      )
    }
  );
}
function Actions$5() {
  return /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "/admin/triggers/new", children: /* @__PURE__ */ jsx(Trans, { message: "Add new trigger" }) });
}
function useTrigger() {
  const { triggerId } = useParams();
  return useQuery({
    queryKey: ["triggers", `${triggerId}`],
    queryFn: () => fetchTrigger(triggerId)
  });
}
async function fetchTrigger(triggerId) {
  const data = await apiClient.get(`triggers/${triggerId}`).then((response) => response.data);
  data.trigger["all_conditions"] = data.trigger.conditions.filter(
    (c) => c.match_type === "all"
  );
  data.trigger["any_conditions"] = data.trigger.conditions.filter(
    (c) => c.match_type === "any"
  );
  return data;
}
function useUpdateTrigger(form) {
  const { trans } = useTrans();
  const { triggerId } = useParams();
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (props) => updateTrigger(triggerId, props),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("triggers")
      });
      navigate("/admin/triggers");
      toast(trans(message("Trigger updated")));
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateTrigger(triggerId, data) {
  const payload = {
    ...data,
    conditions: removeTempIds(data.all_conditions.concat(data.any_conditions)),
    actions: removeTempIds(data.actions || [])
  };
  return apiClient.put(`triggers/${triggerId}`, payload).then((r) => r.data);
}
function removeTempIds(items) {
  return items.map((item) => {
    var _a2;
    if ((_a2 = item.id) == null ? void 0 : _a2.toString().startsWith("temp_")) {
      delete item.id;
    }
    return item;
  });
}
function TriggerSectionHeader({ children }) {
  return /* @__PURE__ */ jsx("h2", { className: "border-b pb-8 text-sm font-bold", children });
}
function TriggerConditionSelector({
  matchType,
  className,
  config
}) {
  var _a2;
  const { fields, remove, append } = useFieldArray({
    name: matchType,
    keyName: "key"
  });
  const { getFieldState } = useFormContext();
  const conditionError = (_a2 = getFieldState(`conditions`).error) == null ? void 0 : _a2.message;
  const headerMessage = matchType === "all_conditions" ? message("Meet <b>all</b> the following conditions") : message("Meet <b>any</b> of the following conditions");
  const addNewCondition = () => {
    const condition = config.conditions.find((c) => c.type === "event:type");
    append({
      id: `temp_${nanoid()}`,
      condition_id: condition.id,
      operator_id: condition.operators[0].id,
      value: "ticket_created",
      match_type: matchType === "all_conditions" ? "all" : "any"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx(TriggerSectionHeader, { children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: headerMessage.message,
        values: {
          b: (text) => /* @__PURE__ */ jsx("span", { className: "mx-4 rounded border bg-alt px-6 py-2 font-bold", children: text })
        }
      }
    ) }),
    fields.map((field, index) => /* @__PURE__ */ jsx(
      ConditionRow,
      {
        index,
        matchType,
        config,
        onRemove: (index2) => remove(index2),
        className: "mt-12"
      },
      field.key
    )),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        onClick: addNewCondition,
        size: "xs",
        className: "mt-12",
        children: /* @__PURE__ */ jsx(Trans, { message: "Add condition" })
      }
    ),
    conditionError && matchType === "all_conditions" && /* @__PURE__ */ jsx("p", { className: "mt-12 text-sm text-danger", children: conditionError })
  ] });
}
function ConditionRow({
  index,
  onRemove,
  matchType,
  config,
  className
}) {
  const groupedConditions = config.groupedConditions;
  const { setValue, watch } = useFormContext();
  const selectedConditionId = watch(`${matchType}.${index}.condition_id`);
  const selectedCondition = config.conditions.find(
    (c) => c.id === selectedConditionId
  );
  const previousSelectedCondition = usePrevious(selectedCondition);
  useEffect(() => {
    var _a2;
    if (selectedCondition && previousSelectedCondition && previousSelectedCondition.type !== selectedCondition.type) {
      setValue(
        `${matchType}.${index}.operator_id`,
        (_a2 = selectedCondition.operators[0]) == null ? void 0 : _a2.id
      );
      if (selectedCondition.type === "event:type") {
        setValue(`${matchType}.${index}.value`, "ticket_created");
      } else {
        setValue(`${matchType}.${index}.value`, "");
      }
    }
  }, [
    previousSelectedCondition,
    selectedCondition,
    index,
    setValue,
    matchType
  ]);
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex flex-col gap-12 md:flex-row", className), children: [
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        name: `${matchType}.${index}.condition_id`,
        selectionMode: "single",
        minWidth: "min-w-224",
        children: Object.entries(groupedConditions).map(([groupName, conditions]) => /* @__PURE__ */ jsx(Section, { label: prettyName(groupName), children: conditions.map((condition) => /* @__PURE__ */ jsx(Item, { value: condition.id, children: condition.name }, condition.id)) }, groupName))
      }
    ),
    /* @__PURE__ */ jsx(
      FormSelect,
      {
        name: `${matchType}.${index}.operator_id`,
        selectionMode: "single",
        minWidth: "min-w-200",
        children: selectedCondition == null ? void 0 : selectedCondition.operators.map((operator) => /* @__PURE__ */ jsx(Item, { value: operator.id, children: operator.display_name }, operator.id))
      }
    ),
    (selectedCondition == null ? void 0 : selectedCondition.type) === "event:type" && /* @__PURE__ */ jsxs(FormSelect, { name: `${matchType}.${index}.value`, selectionMode: "single", children: [
      /* @__PURE__ */ jsx(Item, { value: "ticket_created", children: /* @__PURE__ */ jsx(Trans, { message: "Ticket created" }) }),
      /* @__PURE__ */ jsx(Item, { value: "ticket_updated", children: /* @__PURE__ */ jsx(Trans, { message: "Ticket updated" }) })
    ] }),
    (selectedCondition == null ? void 0 : selectedCondition.type) !== "event:type" && /* @__PURE__ */ jsx(FormTextField, { name: `${matchType}.${index}.value` }),
    /* @__PURE__ */ jsx(IconButton, { color: "danger", onClick: () => onRemove(index), children: /* @__PURE__ */ jsx(CloseIcon, {}) })
  ] });
}
function TriggerActionSelector({ config }) {
  var _a2;
  const { fields, remove, append } = useFieldArray({
    name: "actions",
    keyName: "key"
  });
  const { getFieldState } = useFormContext();
  const actionError = (_a2 = getFieldState(`actions`).error) == null ? void 0 : _a2.message;
  const addNewAction = () => {
    const actions = config.actions.find(
      (c) => c.name === "change_ticket_status"
    );
    append({
      id: `temp_${nanoid()}`,
      action_id: actions.id,
      action_value: {
        status_name: "open"
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(TriggerSectionHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Perform these actions" }) }),
    fields.map((field, index) => /* @__PURE__ */ jsx(
      ActionRow,
      {
        actionIndex: index,
        config,
        onRemove: (index2) => remove(index2),
        className: index === 0 ? "mt-12" : void 0
      },
      field.key
    )),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        onClick: () => addNewAction(),
        size: "xs",
        className: "mt-12",
        children: /* @__PURE__ */ jsx(Trans, { message: "Add action" })
      }
    ),
    actionError && /* @__PURE__ */ jsx("p", { className: "mt-12 text-sm text-danger", children: actionError })
  ] });
}
function ActionRow({ actionIndex, onRemove, config, className }) {
  var _a2;
  const { watch, setValue } = useFormContext();
  const selectedActionId = watch(`actions.${actionIndex}.action_id`);
  const selectedAction = config.actions.find((c) => c.id === selectedActionId);
  const previousSelectedAction = usePrevious(selectedAction);
  useEffect(() => {
    var _a3;
    if (selectedAction && previousSelectedAction && selectedAction.name !== previousSelectedAction.name) {
      setValue(`actions.${actionIndex}.action_value`, {});
      (_a3 = selectedAction.input_config) == null ? void 0 : _a3.inputs.map((input) => {
        if (input.select_options) {
          setValue(
            `actions.${actionIndex}.action_value.${input.name}`,
            config.actionOptions[input.select_options][0].value
          );
        }
      });
    }
  }, [previousSelectedAction, selectedAction, actionIndex, setValue, config]);
  return /* @__PURE__ */ jsxs("div", { className: clsx("mb-12 flex gap-12 border-b pb-12", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-auto space-y-12 md:max-w-400", children: [
      /* @__PURE__ */ jsx(
        FormSelect,
        {
          name: `actions.${actionIndex}.action_id`,
          selectionMode: "single",
          children: config.actions.map((action) => /* @__PURE__ */ jsx(Item, { value: action.id, children: action.display_name }, action.id))
        }
      ),
      (_a2 = selectedAction == null ? void 0 : selectedAction.input_config) == null ? void 0 : _a2.inputs.map((input, inputIndex) => /* @__PURE__ */ jsx(
        ActionValueInput,
        {
          actionIndex,
          input,
          config
        },
        inputIndex
      ))
    ] }),
    /* @__PURE__ */ jsx(IconButton, { color: "danger", onClick: () => onRemove(actionIndex), children: /* @__PURE__ */ jsx(CloseIcon, {}) })
  ] });
}
function ActionValueInput({ input, actionIndex, config }) {
  const name = `actions.${actionIndex}.action_value.${input.name}`;
  if (input.name === "tags_to_add" || input.name === "tags_to_remove") {
    return /* @__PURE__ */ jsx(TagComboBox, { name });
  }
  switch (input.type) {
    case "text":
    case "textarea":
      return /* @__PURE__ */ jsx(
        FormTextField,
        {
          name,
          label: input.display_name,
          placeholder: input.placeholder,
          inputElementType: input.type === "textarea" ? "textarea" : void 0,
          rows: input.type === "textarea" ? 3 : void 0
        }
      );
    case "select":
      return /* @__PURE__ */ jsx(FormSelect, { name, selectionMode: "single", children: config.actionOptions[input.select_options].map((option) => /* @__PURE__ */ jsx(
        Item,
        {
          description: option.description,
          value: option.value,
          capitalizeFirst: true,
          startIcon: option.image ? /* @__PURE__ */ jsx(Avatar, { src: option.image }) : null,
          children: option.name
        },
        option.value
      )) });
  }
}
function TagComboBox({ name }) {
  const { trans } = useTrans();
  const [query, setQuery] = useState("");
  const { data, isFetching } = useTags({ query, perPage: 8, notType: "status" });
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      name,
      isAsync: true,
      isLoading: isFetching,
      inputValue: query,
      onInputValueChange: setQuery,
      valueKey: "id",
      placeholder: trans(message("Enter tag name...")),
      allowCustomValue: true,
      children: data == null ? void 0 : data.pagination.data.map((result) => /* @__PURE__ */ jsx(
        Item,
        {
          value: result.name,
          textLabel: result.name,
          capitalizeFirst: true,
          children: result.display_name
        },
        result.id
      ))
    }
  );
}
function CrupdateTriggerForm({ config }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        className: "mb-24"
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "description",
        label: /* @__PURE__ */ jsx(Trans, { message: "Description" }),
        inputElementType: "textarea",
        rows: 3,
        className: "mb-44"
      }
    ),
    /* @__PURE__ */ jsx(
      TriggerConditionSelector,
      {
        matchType: "all_conditions",
        className: "mb-44",
        config
      }
    ),
    /* @__PURE__ */ jsx(
      TriggerConditionSelector,
      {
        matchType: "any_conditions",
        config,
        className: "mb-44"
      }
    ),
    /* @__PURE__ */ jsx(TriggerActionSelector, { config })
  ] });
}
function groupArrayBy(arr, cb, options) {
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    const bucketCategory = cb(item);
    const bucket = result[bucketCategory];
    item = (options == null ? void 0 : options.map) ? options.map(arr[i]) : arr[i];
    if (!Array.isArray(bucket)) {
      result[bucketCategory] = [item];
    } else {
      result[bucketCategory].push(item);
    }
  }
  return result;
}
function useTriggerConfig() {
  return useQuery({
    queryKey: ["triggers", `config`],
    queryFn: () => fetchConfig()
  });
}
async function fetchConfig() {
  const data = await apiClient.get(`triggers/config`).then((response) => response.data);
  return {
    groupedConditions: groupArrayBy(
      data.conditions,
      (item) => {
        const [group] = item.name.split(":");
        return group.trim();
      },
      {
        map: (item) => {
          item.name = item.name.split(":")[1].trim();
          return item;
        }
      }
    ),
    conditions: data.conditions,
    operators: data.operators,
    actions: data.actions,
    actionOptions: data.actionOptions
  };
}
function UpdateTriggerPage() {
  const triggerQuery = useTrigger();
  const configQuery = useTriggerConfig();
  const isLoading = triggerQuery.isPending || configQuery.isPending;
  const showSpinner = useSpinDelay(isLoading, {
    delay: 500,
    minDuration: 200
  });
  if (triggerQuery.data && configQuery.data) {
    return /* @__PURE__ */ jsx(
      PageContent$2,
      {
        trigger: triggerQuery.data.trigger,
        config: configQuery.data
      }
    );
  }
  if (isLoading) {
    return showSpinner ? /* @__PURE__ */ jsx(FullPageLoader, {}) : null;
  }
  return /* @__PURE__ */ jsx(PageErrorMessage, {});
}
function PageContent$2({ trigger, config }) {
  const form = useForm({
    defaultValues: {
      name: trigger.name,
      description: trigger.description,
      all_conditions: trigger.all_conditions,
      any_conditions: trigger.any_conditions,
      actions: trigger.actions
    }
  });
  const updateTrigger2 = useUpdateTrigger(form);
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      onSubmit: (values) => updateTrigger2.mutate(values),
      form,
      title: /* @__PURE__ */ jsx(Trans, { message: "Edit “:name“ trigger", values: { name: trigger.name } }),
      isLoading: updateTrigger2.isPending,
      backButton: /* @__PURE__ */ jsx(
        IconButton,
        {
          elementType: Link,
          to: "/admin/triggers",
          className: "max-md:hidden",
          children: /* @__PURE__ */ jsx(ArrowBackIcon, {})
        }
      ),
      wrapInContainer: true,
      children: /* @__PURE__ */ jsx(CrupdateTriggerForm, { config })
    }
  );
}
function useCreateTrigger(form) {
  const { trans } = useTrans();
  const navigate = useNavigate$1();
  return useMutation({
    mutationFn: (props) => createTrigger(props),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("triggers")
      });
      navigate(`/admin/triggers/${response.trigger.id}/edit`);
      toast(trans(message("Trigger created")));
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createTrigger(data) {
  const payload = {
    ...data,
    conditions: data.all_conditions.concat(data.any_conditions)
  };
  return apiClient.post("triggers", payload).then((r) => r.data);
}
function CreateTriggerPage() {
  const configQuery = useTriggerConfig();
  const showSpinner = useSpinDelay(configQuery.isLoading, {
    delay: 500,
    minDuration: 200
  });
  if (configQuery.data) {
    return /* @__PURE__ */ jsx(PageContent$1, { config: configQuery.data });
  }
  if (configQuery.isLoading) {
    return showSpinner ? /* @__PURE__ */ jsx(FullPageLoader, {}) : null;
  }
  return /* @__PURE__ */ jsx(PageErrorMessage, {});
}
function PageContent$1({ config }) {
  const form = useForm();
  const createTrigger2 = useCreateTrigger(form);
  return /* @__PURE__ */ jsx(
    CrupdateResourceLayout,
    {
      onSubmit: (values) => createTrigger2.mutate(values),
      form,
      title: /* @__PURE__ */ jsx(Trans, { message: "Create new trigger" }),
      isLoading: createTrigger2.isPending,
      backButton: /* @__PURE__ */ jsx(
        IconButton,
        {
          elementType: Link,
          to: "/admin/triggers",
          className: "max-md:hidden",
          children: /* @__PURE__ */ jsx(ArrowBackIcon, {})
        }
      ),
      wrapInContainer: true,
      children: /* @__PURE__ */ jsx(CrupdateTriggerForm, { config })
    }
  );
}
const ArticleDatatableColumns = [
  {
    key: "name",
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Article" }),
    body: (article) => /* @__PURE__ */ jsx(ArticleColumn, { article })
  },
  {
    key: "author_id",
    allowsSorting: true,
    width: "min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Owner" }),
    body: (article) => article.author ? /* @__PURE__ */ jsx(
      NameWithAvatar,
      {
        image: article.author.avatar,
        label: article.author.display_name,
        description: article.author.email
      }
    ) : null
  },
  {
    key: "draft",
    allowsSorting: true,
    width: "w-100 flex-shrink-0",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Published" }),
    body: (article) => !article.draft ? /* @__PURE__ */ jsx(CheckIcon, { size: "md", className: "text-positive" }) : /* @__PURE__ */ jsx(CloseIcon, { size: "md", className: "text-danger" })
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
    body: (article) => /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "md",
          elementType: Link,
          to: getEditArticleLink(article),
          children: /* @__PURE__ */ jsx(EditIcon, {})
        }
      ),
      /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Delete reply" }), children: /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(DeleteIcon, {}) }) }),
        /* @__PURE__ */ jsx(DeleteArticleDialog, { article })
      ] })
    ] })
  }
];
function ArticleColumn({ article }) {
  const { isCollapsedMode } = useContext(TableContext);
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx(
          isCollapsedMode ? "whitespace-normal" : "overflow-hidden overflow-ellipsis whitespace-nowrap font-medium"
        ),
        children: article.title
      }
    ),
    !isCollapsedMode && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs", children: /* @__PURE__ */ jsx(ArticlePath, { article }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-680 whitespace-normal text-xs text-muted", children: truncateString(stripTags(article.body), 230) })
    ] })
  ] });
}
function DeleteArticleDialog({ article }) {
  const deleteArticles = useDeleteArticles();
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isDanger: true,
      isLoading: deleteArticles.isPending,
      title: /* @__PURE__ */ jsx(Trans, { message: "Delete article" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this article?" }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
      onConfirm: () => {
        deleteArticles.mutate({ ids: [article.id] }, { onSuccess: () => close() });
      }
    }
  );
}
const ArticleDatatableFilters = [
  {
    key: "draft",
    label: message("Published"),
    description: message("Whether article is published or draft"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.BooleanToggle,
      defaultValue: true
    }
  },
  {
    key: "author_id",
    label: message("Author"),
    description: message("User this article was created by"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL
    }
  },
  createdAtFilter({
    description: message("Date article was created")
  }),
  updatedAtFilter({
    description: message("Date article was last updated")
  })
];
function ArticleDatatablePage() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "hc/articles",
      queryParams: {
        with: "body,path,author",
        defaultOrder: "updated_at|desc"
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Articles" }),
      columns: ArticleDatatableColumns,
      filters: ArticleDatatableFilters,
      actions: /* @__PURE__ */ jsx(Actions$4, {}),
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      enableSelection: false,
      cellHeight: "h-90",
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: onlineArticlesImg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No articles have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching articles" })
        }
      )
    }
  );
}
function Actions$4() {
  return /* @__PURE__ */ jsx(DataTableAddItemButton, { elementType: Link, to: "/admin/articles/new", children: /* @__PURE__ */ jsx(Trans, { message: "Add article" }) });
}
function CrupdateTicketCategoryForm({ form, onSubmit, formId }) {
  return /* @__PURE__ */ jsxs(Form$1, { id: formId, form, onSubmit, children: [
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Name" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Unique category identifier." }),
        className: "mb-20",
        required: true,
        autoFocus: true
      }
    ),
    /* @__PURE__ */ jsx(
      FormTextField,
      {
        name: "display_name",
        label: /* @__PURE__ */ jsx(Trans, { message: "Display name" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "User friendly category name." }),
        className: "mb-20"
      }
    ),
    /* @__PURE__ */ jsx(CategoriesField, {})
  ] });
}
function CategoriesField() {
  const { trans } = useTrans();
  const { data, isFetching } = useCategories({ type: "category", compact: true });
  const [query, setQuery] = useState("");
  const suggestions = data == null ? void 0 : data.pagination.data;
  return /* @__PURE__ */ jsx(
    FormChipField,
    {
      name: "categories",
      label: /* @__PURE__ */ jsx(Trans, { message: "Help center categories" }),
      isAsync: true,
      isLoading: isFetching,
      inputValue: query,
      onInputValueChange: setQuery,
      placeholder: trans(message("Select help center categories")),
      allowCustomValue: false,
      suggestions,
      children: data == null ? void 0 : data.pagination.data.map((category) => /* @__PURE__ */ jsx(Item, { value: category.name, textLabel: category.name, children: category.name }, category.id))
    }
  );
}
function useUpdateTicketCategory(categoryId, form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => updateCategory(categoryId, props),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("ticket-categories")
      });
      toast(trans(message("Category updated")));
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function updateCategory(categoryId, formPayload) {
  var _a2;
  const payload = {
    ...formPayload,
    categories: ((_a2 = formPayload.categories) == null ? void 0 : _a2.map((c) => c.id)) ?? []
  };
  return apiClient.put(`ticket-categories/${categoryId}`, payload).then((r) => r.data);
}
function UpdateTicketCategoryDialog({ tag }) {
  const { close, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      name: tag.name,
      display_name: tag.display_name,
      categories: tag.categories
    }
  });
  const updateCategory2 = useUpdateTicketCategory(tag.id, form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Update ticket category" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateTicketCategoryForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          updateCategory2.mutate(values, {
            onSuccess: () => close()
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: updateCategory2.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const softwareEngineerSvg = "/assets/software-engineer-ba026106.svg";
function useCreateTicketCategory(form) {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (props) => createCategory(props),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("ticket-categories")
      });
      toast(trans(message("Category created")));
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createCategory(formPayload) {
  var _a2;
  const payload = {
    ...formPayload,
    categories: ((_a2 = formPayload.categories) == null ? void 0 : _a2.map((c) => c.id)) ?? []
  };
  return apiClient.post("ticket-categories", payload).then((r) => r.data);
}
function CreateTicketCategoryDialog() {
  const { close, formId } = useDialogContext();
  const form = useForm();
  const createCategory2 = useCreateTicketCategory(form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Add ticket category" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      CrupdateTicketCategoryForm,
      {
        formId,
        form,
        onSubmit: (values) => {
          createCategory2.mutate(values, {
            onSuccess: () => close()
          });
        }
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          form: formId,
          disabled: createCategory2.isPending,
          variant: "flat",
          color: "primary",
          type: "submit",
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
const columnConfig = [
  {
    key: "display_name",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (category) => category.display_name
  },
  {
    key: "name",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Identifier" }),
    body: (category) => category.name
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-100",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (category) => /* @__PURE__ */ jsx(FormattedDate, { date: category.updated_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    visibleInMode: "all",
    body: (category) => /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
      /* @__PURE__ */ jsx(IconButton, { size: "md", className: "text-muted", children: /* @__PURE__ */ jsx(EditIcon, {}) }),
      /* @__PURE__ */ jsx(UpdateTicketCategoryDialog, { tag: category })
    ] })
  }
];
function TicketCategoryDatatable() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      endpoint: "ticket-categories",
      title: /* @__PURE__ */ jsx(Trans, { message: "Ticket categories" }),
      columns: columnConfig,
      actions: /* @__PURE__ */ jsx(Actions$3, {}),
      queryParams: {
        with: "categories"
      },
      selectedActions: /* @__PURE__ */ jsx(DeleteSelectedItemsAction, {}),
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: softwareEngineerSvg,
          title: /* @__PURE__ */ jsx(Trans, { message: "No categories have been created yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching categories" })
        }
      )
    }
  );
}
function Actions$3() {
  return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(DataTableAddItemButton, { children: /* @__PURE__ */ jsx(Trans, { message: "Add category" }) }),
    /* @__PURE__ */ jsx(CreateTicketCategoryDialog, {})
  ] }) });
}
const AppAdminRoutes = [
  {
    path: "/",
    children: [
      { path: "tickets", element: /* @__PURE__ */ jsx(AdminTicketReport, {}) },
      { path: "envato", element: /* @__PURE__ */ jsx(EnvatoReport, {}) },
      {
        path: "search",
        element: /* @__PURE__ */ jsx(AdminSearchReport, {}),
        children: [
          {
            index: true,
            element: /* @__PURE__ */ jsx(Navigate, { to: "failed", replace: true })
          },
          {
            path: "failed",
            element: /* @__PURE__ */ jsx(FailedSearchesReport, {})
          },
          {
            path: "popular",
            element: /* @__PURE__ */ jsx(PopularSearchesReport, {})
          },
          {
            path: "articles",
            element: /* @__PURE__ */ jsx(ArticlesReport, {})
          }
        ]
      },
      { path: "visitors", element: /* @__PURE__ */ jsx(AdminVisitorsReport, {}) },
      { index: true, element: /* @__PURE__ */ jsx(Navigate, { to: "tickets", replace: true }) }
    ]
  },
  // help center
  {
    path: "/hc",
    element: /* @__PURE__ */ jsx(Navigate, { to: "/hc/arrange", replace: true })
  },
  {
    path: "/hc/arrange",
    element: /* @__PURE__ */ jsx(HcCategoryManager, {})
  },
  {
    path: "/hc/arrange/categories/:categoryId",
    element: /* @__PURE__ */ jsx(HcCategoryManager, {})
  },
  {
    path: "/hc/arrange/sections/:sectionId",
    element: /* @__PURE__ */ jsx(HcArticleManager, {})
  },
  {
    path: "articles",
    element: /* @__PURE__ */ jsx(ArticleDatatablePage, {})
  },
  {
    path: "articles/new",
    element: /* @__PURE__ */ jsx(CreateArticlePage, {})
  },
  {
    path: "articles/:articleId/edit",
    element: /* @__PURE__ */ jsx(UpdateArticlePage, {})
  },
  // edit article
  {
    path: "/hc/arrange/sections/:sectionId/articles/:articleId/edit",
    element: /* @__PURE__ */ jsx(UpdateArticlePage, {})
  },
  {
    path: "/hc/arrange/categories/:categoryId/articles/:articleId/edit",
    element: /* @__PURE__ */ jsx(UpdateArticlePage, {})
  },
  {
    path: "/hc/articles/:articleId/edit",
    element: /* @__PURE__ */ jsx(UpdateArticlePage, {})
  },
  // create article
  {
    path: "/hc/arrange/sections/:sectionId/articles/new",
    element: /* @__PURE__ */ jsx(CreateArticlePage, {})
  },
  {
    path: "/hc/arrange/categories/:categoryId/articles/new",
    element: /* @__PURE__ */ jsx(CreateArticlePage, {})
  },
  {
    path: "/hc/articles/new",
    element: /* @__PURE__ */ jsx(CreateArticlePage, {})
  },
  // tickets
  {
    path: "/ticket-categories",
    element: /* @__PURE__ */ jsx(TicketCategoryDatatable, {})
  },
  // canned replies
  {
    path: "/saved-replies",
    element: /* @__PURE__ */ jsx(CannedRepliesDatatablePage, {})
  },
  // triggers
  {
    path: "/triggers",
    element: /* @__PURE__ */ jsx(TriggersDatatablePage, {})
  },
  {
    path: "/triggers/new",
    element: /* @__PURE__ */ jsx(CreateTriggerPage, {})
  },
  {
    path: "/triggers/:triggerId/edit",
    element: /* @__PURE__ */ jsx(UpdateTriggerPage, {})
  }
];
function useUpdateCustomPage(endpoint2) {
  const { pageId } = useParams();
  const finalEndpoint = `${endpoint2 || "custom-pages"}/${pageId}`;
  return useMutation({
    mutationFn: (payload) => updatePage(payload, finalEndpoint),
    onError: (err) => showHttpErrorToast(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["custom-pages"] });
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(finalEndpoint)
      });
      toast(message("Page updated"));
    }
  });
}
function updatePage(payload, endpoint2) {
  return apiClient.put(`${endpoint2}`, payload).then((r) => r.data);
}
const ArticleBodyEditor$1 = React.lazy(
  () => import("./article-body-editor-e46267e1.mjs")
);
function EditCustomPage() {
  const query = useCustomPage();
  return query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageMetaTags, { query }),
    /* @__PURE__ */ jsx(PageContent, { page: query.data.page })
  ] }) : /* @__PURE__ */ jsx("div", { className: "relative w-full h-full", children: /* @__PURE__ */ jsx(PageStatus, { query }) });
}
function PageContent({ page }) {
  const navigate = useNavigate$1();
  const crupdatePage = useUpdateCustomPage();
  const form = useForm({
    defaultValues: {
      title: page.title,
      slug: page.slug,
      body: page.body
    }
  });
  const handleSave = (editorContent) => {
    crupdatePage.mutate(
      {
        ...form.getValues(),
        body: editorContent
      },
      {
        onSuccess: () => navigate("../..", { relative: "path" })
      }
    );
  };
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, {}), children: /* @__PURE__ */ jsx(ArticleBodyEditor$1, { initialContent: page.body, children: (content, editor) => /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsxs(FormProvider, { ...form, children: [
    /* @__PURE__ */ jsx(
      ArticleEditorStickyHeader,
      {
        editor,
        backLink: "../..",
        isLoading: crupdatePage.isPending,
        onSave: handleSave
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mx-20", children: /* @__PURE__ */ jsxs("div", { className: "prose dark:prose-invert mx-auto flex-auto", children: [
      /* @__PURE__ */ jsx(ArticleEditorTitle, {}),
      content
    ] }) })
  ] }) }) }) });
}
function useCreateCustomPage(endpoint2) {
  const finalEndpoint = endpoint2 || "custom-pages";
  return useMutation({
    mutationFn: (payload) => createPage(payload, finalEndpoint),
    onError: (err) => showHttpErrorToast(err),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["custom-pages"] });
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey(finalEndpoint)
      });
      toast(message("Page created"));
    }
  });
}
function createPage(payload, endpoint2) {
  return apiClient.post(`${endpoint2}`, payload).then((r) => r.data);
}
const ArticleBodyEditor = React.lazy(
  () => import("./article-body-editor-e46267e1.mjs")
);
function CreateCustomPage() {
  const navigate = useNavigate$1();
  const createPage2 = useCreateCustomPage();
  const form = useForm();
  const handleSave = (editorContent) => {
    createPage2.mutate(
      {
        ...form.getValues(),
        body: editorContent
      },
      {
        onSuccess: () => navigate("../", { relative: "path" })
      }
    );
  };
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, {}), children: /* @__PURE__ */ jsx(ArticleBodyEditor, { children: (content, editor) => /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsxs(FormProvider, { ...form, children: [
    /* @__PURE__ */ jsx(
      ArticleEditorStickyHeader,
      {
        editor,
        isLoading: createPage2.isPending,
        onSave: handleSave,
        backLink: "../"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mx-20", children: /* @__PURE__ */ jsxs("div", { className: "prose dark:prose-invert mx-auto flex-auto", children: [
      /* @__PURE__ */ jsx(ArticleEditorTitle, {}),
      content
    ] }) })
  ] }) }) }) });
}
const fontImage = "/assets/font-a5a81d1a.svg";
function FontSelectorFilters({
  state: { filters, setFilters }
}) {
  const { trans } = useTrans();
  return /* @__PURE__ */ jsxs("div", { className: "mb-24 items-center gap-24 @xs:flex", children: [
    /* @__PURE__ */ jsx(
      TextField,
      {
        className: "mb-12 flex-auto @xs:mb-0",
        value: filters.query,
        onChange: (e) => {
          setFilters({
            ...filters,
            query: e.target.value
          });
        },
        startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
        placeholder: trans(message("Search fonts"))
      }
    ),
    /* @__PURE__ */ jsxs(
      SelectForwardRef,
      {
        className: "flex-auto",
        selectionMode: "single",
        selectedValue: filters.category,
        onSelectionChange: (value) => {
          setFilters({
            ...filters,
            category: value
          });
        },
        children: [
          /* @__PURE__ */ jsx(Item, { value: "", children: /* @__PURE__ */ jsx(Trans, { message: "All categories" }) }),
          /* @__PURE__ */ jsx(Item, { value: "serif", children: /* @__PURE__ */ jsx(Trans, { message: "Serif" }) }),
          /* @__PURE__ */ jsx(Item, { value: "sans-serif", children: /* @__PURE__ */ jsx(Trans, { message: "Sans serif" }) }),
          /* @__PURE__ */ jsx(Item, { value: "display", children: /* @__PURE__ */ jsx(Trans, { message: "Display" }) }),
          /* @__PURE__ */ jsx(Item, { value: "handwriting", children: /* @__PURE__ */ jsx(Trans, { message: "Handwriting" }) }),
          /* @__PURE__ */ jsx(Item, { value: "monospace", children: /* @__PURE__ */ jsx(Trans, { message: "Monospace" }) })
        ]
      }
    )
  ] });
}
function useFilter(options) {
  const collator = useCollator({
    usage: "search",
    ...options
  });
  return {
    startsWith(string, substring) {
      if (substring.length === 0) {
        return true;
      }
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      return collator.compare(string.slice(0, substring.length), substring) === 0;
    },
    endsWith(string, substring) {
      if (substring.length === 0) {
        return true;
      }
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      return collator.compare(string.slice(-substring.length), substring) === 0;
    },
    contains(string, substring) {
      if (substring.length === 0) {
        return true;
      }
      string = string.normalize("NFC");
      substring = substring.normalize("NFC");
      let scan = 0;
      const sliceLen = substring.length;
      for (; scan + sliceLen <= string.length; scan++) {
        const slice = string.slice(scan, scan + sliceLen);
        if (collator.compare(substring, slice) === 0) {
          return true;
        }
      }
      return false;
    }
  };
}
const BrowserSafeFonts = [
  {
    label: message("System"),
    family: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    category: "sans-serif"
  },
  { family: "Impact, Charcoal, sans-serif", category: "sans-serif" },
  { family: "Arial, Helvetica Neue, Helvetica, sans-serif", category: "serif" },
  { family: '"Comic Sans MS", cursive, sans-serif', category: "Handwriting" },
  { family: "Century Gothic, sans-serif", category: "sans-serif" },
  { family: '"Courier New", Courier, monospace', category: "monospace" },
  {
    family: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
    category: "sans-serif"
  },
  { family: '"Times New Roman", Times, serif', category: "serif" },
  { family: '"Lucida Console", Monaco, monospace', category: "monospace" },
  { family: '"Andele Mono", monospace, sans-serif', category: "sans-serif" },
  { family: "Verdana, Geneva, sans-serif", category: "sans-serif" },
  {
    family: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    category: "sans-serif"
  }
];
function useFontSelectorState({
  value,
  onChange
}) {
  const { data, isLoading } = useValueLists(["googleFonts"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilterState] = useState({
    query: "",
    category: (value == null ? void 0 : value.category) ?? ""
  });
  const { contains } = useFilter({
    sensitivity: "base"
  });
  const setFilters = useCallback((filters2) => {
    setFilterState(filters2);
    setCurrentPage(0);
  }, []);
  const allFonts = useMemo(() => {
    return BrowserSafeFonts.concat((data == null ? void 0 : data.googleFonts) ?? []);
  }, [data == null ? void 0 : data.googleFonts]);
  const filteredFonts = useMemo(() => {
    return allFonts.filter((font) => {
      var _a2;
      return contains(font.family, filters.query) && (!filters.category || ((_a2 = font.category) == null ? void 0 : _a2.toLowerCase()) === filters.category.toLowerCase());
    });
  }, [allFonts, filters, contains]);
  const pages2 = useMemo(() => {
    return chunkArray(filteredFonts, 20);
  }, [filteredFonts]);
  const fonts = pages2[currentPage];
  useEffect(() => {
    const id = "font-selector";
    if (fonts == null ? void 0 : fonts.length) {
      loadFonts(fonts, { id });
    }
  }, [fonts, currentPage]);
  return {
    fonts: fonts || [],
    currentPage,
    filteredFonts: filteredFonts || [],
    setCurrentPage,
    isLoading,
    filters,
    setFilters,
    value,
    onChange,
    pages: pages2
  };
}
function FontSelectorPagination({
  state: { currentPage = 0, setCurrentPage, filteredFonts, pages: pages2 }
}) {
  const total = (filteredFonts == null ? void 0 : filteredFonts.length) || 0;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-24 text-sm mt-30 pt-14 border-t", children: [
    total > 0 && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: ":from - :to of :total",
        values: {
          from: currentPage * 20 + 1,
          to: Math.min((currentPage + 1) * 20, total),
          total
        }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          disabled: currentPage < 1,
          onClick: () => {
            setCurrentPage(Math.max(0, currentPage - 1));
          },
          children: /* @__PURE__ */ jsx(KeyboardArrowLeftIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        IconButton,
        {
          disabled: currentPage >= pages2.length - 1,
          onClick: () => {
            setCurrentPage(currentPage + 1);
          },
          children: /* @__PURE__ */ jsx(KeyboardArrowRightIcon, {})
        }
      )
    ] })
  ] });
}
function FontSelector(props) {
  const state = useFontSelectorState(props);
  return /* @__PURE__ */ jsxs("div", { className: props.className, children: [
    /* @__PURE__ */ jsx(FontSelectorFilters, { state }),
    /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: /* @__PURE__ */ jsx(FontList, { state }) }),
    /* @__PURE__ */ jsx(FontSelectorPagination, { state })
  ] });
}
function FontList({ state }) {
  const { isLoading, fonts } = state;
  const gridClassName = "grid gap-24 grid-cols-[repeat(auto-fill,minmax(90px,1fr))] items-start";
  if (isLoading) {
    return /* @__PURE__ */ jsx(FontListSkeleton, { className: gridClassName });
  }
  if (!(fonts == null ? void 0 : fonts.length)) {
    return /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-60",
        size: "sm",
        image: /* @__PURE__ */ jsx(SvgImage, { src: fontImage }),
        title: /* @__PURE__ */ jsx(Trans, { message: "No matching fonts" }),
        description: /* @__PURE__ */ jsx(Trans, { message: "Try another search query or different category" })
      }
    );
  }
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, className: gridClassName, children: fonts == null ? void 0 : fonts.map((font) => /* @__PURE__ */ jsx(FontButton, { font, state }, font.family)) }, "font-list");
}
function FontButton({ font, state: { value, onChange } }) {
  const isActive = (value == null ? void 0 : value.family) === font.family;
  const displayName = font.family.split(",")[0].replace(/"/g, "");
  return /* @__PURE__ */ jsxs(
    ButtonBase,
    {
      display: "block",
      onClick: () => {
        onChange(font);
      },
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "flex aspect-square items-center justify-center rounded-panel border text-4xl transition-bg-color hover:bg-hover md:text-5xl",
              isActive && "ring-2 ring-primary ring-offset-2"
            ),
            children: /* @__PURE__ */ jsx("span", { style: { fontFamily: font.family }, children: "Aa" })
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: clsx(
              "mt-6 block overflow-hidden overflow-ellipsis whitespace-nowrap text-sm",
              isActive && "text-primary"
            ),
            children: font.label ? /* @__PURE__ */ jsx(Trans, { ...font.label }) : displayName
          }
        )
      ]
    },
    font.family
  );
}
function FontListSkeleton({ className }) {
  const items = Array.from(Array(20).keys());
  return /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, className, children: items.map((index) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "aspect-square", children: /* @__PURE__ */ jsx(Skeleton, { display: "block", variant: "rect" }) }),
    /* @__PURE__ */ jsx(Skeleton, { className: "mt-6 text-sm" })
  ] }, index)) }, "font-list-skeleton");
}
function ThemeFontPanel() {
  const { setValue, watch } = useFormContext();
  const { themeIndex } = useParams();
  const key = `appearance.themes.all.${themeIndex}.font`;
  return /* @__PURE__ */ jsx(
    FontSelector,
    {
      value: watch(key),
      onChange: (font) => {
        setValue(key, font, { shouldDirty: true });
        appearanceState().preview.setThemeFont(font);
      }
    }
  );
}
const radiusMap = {
  "rounded-none": {
    label: message("Square"),
    value: "0px"
  },
  "rounded-sm": {
    label: message("Small"),
    value: "0.125rem"
  },
  "rounded-md": {
    label: message("Medium"),
    value: "0.25rem"
  },
  "rounded-lg": {
    label: message("Large"),
    value: "0.5rem"
  },
  "rounded-xl": {
    label: message("Larger"),
    value: "0.75rem"
  },
  "rounded-full": {
    label: message("Pill"),
    value: "9999px"
  }
};
function ThemeRadiusPanel() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-24", children: [
    /* @__PURE__ */ jsx(
      RadiusSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Button rounding" }),
        name: "button-radius"
      }
    ),
    /* @__PURE__ */ jsx(
      RadiusSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Input rounding" }),
        name: "input-radius"
      }
    ),
    /* @__PURE__ */ jsx(
      RadiusSelector,
      {
        label: /* @__PURE__ */ jsx(Trans, { message: "Panel rounding" }),
        name: "panel-radius",
        hidePill: true
      }
    )
  ] });
}
function RadiusSelector({ label, name, hidePill }) {
  const { themeIndex } = useParams();
  const { watch, setValue } = useFormContext();
  const formKey = `appearance.themes.all.${themeIndex}.values.--be-${name}`;
  const currentValue = watch(formKey);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-10 text-sm font-semibold", children: label }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-10 text-sm", children: Object.entries(radiusMap).filter(([key]) => !hidePill || !key.includes("full")).map(([key, { label: label2, value }]) => /* @__PURE__ */ jsx(
      PreviewButton,
      {
        radius: key,
        isActive: value === currentValue,
        onClick: () => {
          setValue(formKey, value, { shouldDirty: true });
        },
        children: /* @__PURE__ */ jsx(Trans, { ...label2 })
      },
      key
    )) })
  ] });
}
function PreviewButton({
  radius,
  children,
  isActive,
  onClick
}) {
  return /* @__PURE__ */ jsx(
    ButtonBase,
    {
      display: "block",
      className: clsx(
        "h-36 border-2 hover:bg-hover",
        radius,
        isActive && "border-primary"
      ),
      onClick,
      children
    }
  );
}
const tabs = ["schedule", "error", "outgoing-email"];
function LogsPage() {
  const { pathname } = useLocation();
  const activeTab = pathname.split("/").pop();
  const activeIndex = tabs.includes(activeTab) ? tabs.indexOf(activeTab) : 0;
  return /* @__PURE__ */ jsxs(Tabs, { className: "p-12 md:p-24", selectedTab: activeIndex, children: [
    /* @__PURE__ */ jsxs(TabList, { children: [
      /* @__PURE__ */ jsx(Tab, { elementType: Link, to: "/admin/logs/schedule", replace: true, children: /* @__PURE__ */ jsx(Trans, { message: "Schedule" }) }),
      /* @__PURE__ */ jsx(Tab, { elementType: Link, to: "/admin/logs/error", replace: true, children: /* @__PURE__ */ jsx(Trans, { message: "Error" }) }),
      /* @__PURE__ */ jsx(Tab, { elementType: Link, to: "/admin/logs/outgoing-email", replace: true, children: /* @__PURE__ */ jsx(Trans, { message: "Email" }) })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
function BooleanIndicator({ value }) {
  if (value) {
    return /* @__PURE__ */ jsx(CheckIcon, { className: "icon-md text-positive" });
  }
  return /* @__PURE__ */ jsx(CloseIcon, { className: "icon-md text-danger" });
}
function useRerunScheduledCommand() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => rerunCommand(payload),
    onSuccess: async (response, props) => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("logs/schedule")
      });
      toast.positive(trans(message("Command reran")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function rerunCommand({ id }) {
  return apiClient.post(`logs/schedule/rerun/${id}`).then((r) => r.data);
}
const EventRepeatIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M21 12V6c0-1.1-.9-2-2-2h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V10h14v2h2zm-2-4H5V6h14v2zm-3.36 12c.43 1.45 1.77 2.5 3.36 2.5 1.93 0 3.5-1.57 3.5-3.5s-1.57-3.5-3.5-3.5c-.95 0-1.82.38-2.45 1H18V18h-4v-4h1.5v1.43c.9-.88 2.14-1.43 3.5-1.43 2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.42 0-4.44-1.72-4.9-4h1.54z" }),
  "EventRepeatOutlined"
);
const ScheduleDatatableColumns = [
  {
    key: "command",
    allowsSorting: true,
    visibleInMode: "all",
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Name" }),
    body: (item) => /* @__PURE__ */ jsx(NameWithAvatar, { label: item.command, description: item.output })
  },
  {
    key: "ran_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Ran at" }),
    body: (item) => /* @__PURE__ */ jsx(FormattedRelativeTime, { date: item.ran_at })
  },
  {
    key: "duration",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Duration" }),
    body: (item) => `${item.duration}ms`
  },
  {
    key: "exit_code",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Completed" }),
    body: (item) => /* @__PURE__ */ jsx(BooleanIndicator, { value: item.exit_code === 0 })
  },
  {
    key: "count_in_last_hour",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Runs recently" }),
    body: (item) => /* @__PURE__ */ jsx(FormattedNumber, { value: item.count_in_last_hour })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    visibleInMode: "all",
    body: (item) => /* @__PURE__ */ jsx(RerunButton, { item })
  }
];
function RerunButton({ item }) {
  const rerunCommand2 = useRerunScheduledCommand();
  return /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Rerun now" }), children: /* @__PURE__ */ jsx(
    IconButton,
    {
      size: "md",
      className: "text-muted",
      disabled: rerunCommand2.isPending,
      onClick: () => {
        rerunCommand2.mutate({ id: item.id });
      },
      children: /* @__PURE__ */ jsx(EventRepeatIcon, {})
    }
  ) });
}
const timelineImage = "/assets/timeline-172fbeee.svg";
const DownloadIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z" }),
  "DownloadOutlined"
);
function ScheduleLogDatatable() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      padding: "pt-12 md:pt-24",
      endpoint: "logs/schedule",
      title: /* @__PURE__ */ jsx(Trans, { message: "CRON schedule log" }),
      columns: ScheduleDatatableColumns,
      actions: /* @__PURE__ */ jsx(Actions$2, {}),
      enableSelection: false,
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: timelineImage,
          title: /* @__PURE__ */ jsx(Trans, { message: "No scheduled commands have ran yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching scheduled commands" })
        }
      )
    }
  );
}
function Actions$2() {
  return /* @__PURE__ */ jsx(
    DataTableAddItemButton,
    {
      elementType: "a",
      href: "api/v1/logs/schedule/download",
      download: true,
      icon: /* @__PURE__ */ jsx(DownloadIcon, {}),
      children: /* @__PURE__ */ jsx(Trans, { message: "Download log" })
    }
  );
}
const bugFixingImage = "/assets/bug-fixing-bd601a66.svg";
const InfoIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" }),
  "InfoOutlined"
);
const ErrorLogDatatableColumns = [
  {
    key: "message",
    visibleInMode: "all",
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Message" }),
    body: (item) => item.message
  },
  {
    key: "datetime",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Date" }),
    body: (item) => /* @__PURE__ */ jsx(FormattedRelativeTime, { date: item.datetime })
  },
  {
    key: "severity",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Severity" }),
    body: (item) => {
      return /* @__PURE__ */ jsxs(
        "span",
        {
          className: clsx(
            "flex items-center gap-6 text-xs capitalize",
            item.level === "error" ? "text-danger" : "text-primary"
          ),
          children: [
            item.level === "error" ? /* @__PURE__ */ jsx(ErrorIcon, { size: "sm" }) : /* @__PURE__ */ jsx(InfoIcon, { size: "sm" }),
            item.level
          ]
        }
      );
    }
  }
];
function ErrorLogEntryDialog({ error }) {
  return /* @__PURE__ */ jsxs(Dialog, { size: "fullscreen", children: [
    /* @__PURE__ */ jsx(
      DialogHeader,
      {
        showDivider: true,
        padding: "px-24 py-10",
        actions: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "xs",
            onClick: () => downloadLogItem(error),
            children: /* @__PURE__ */ jsx(Trans, { message: "Download" })
          }
        ),
        children: /* @__PURE__ */ jsx(Trans, { message: "Error details" })
      }
    ),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx("pre", { className: "whitespace-pre-wrap break-words text-xs leading-5", children: error.exception }) })
  ] });
}
function downloadLogItem(item) {
  const el = document.createElement("a");
  el.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(item.exception)
  );
  el.setAttribute("download", `error-${item.id}.log`);
  el.style.display = "none";
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}
function useDeleteErrorLog() {
  const { trans } = useTrans();
  return useMutation({
    mutationFn: (payload) => deleteLogFile(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey("logs/error")
      });
      toast(trans(message("Log file deleted")));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteLogFile({ identifier }) {
  return apiClient.delete(`logs/error/${identifier}`).then((r) => r.data);
}
function ErrorLogDatatable() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      padding: "pt-12 md:pt-24",
      endpoint: "logs/error",
      title: /* @__PURE__ */ jsx(Trans, { message: "Error log" }),
      onRowAction: (item) => {
        openDialog(ErrorLogEntryDialog, { error: item });
      },
      columns: ErrorLogDatatableColumns,
      actions: /* @__PURE__ */ jsx(Actions$1, {}),
      enableSelection: false,
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: bugFixingImage,
          title: /* @__PURE__ */ jsx(Trans, { message: "No errors have been logged yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching error log entries" })
        }
      )
    }
  );
}
function Actions$1() {
  var _a2, _b, _c;
  const { query, setParams } = useDataTable();
  const setOnce = useRef(false);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    var _a3, _b2;
    if (((_b2 = (_a3 = query.data) == null ? void 0 : _a3.files) == null ? void 0 : _b2.length) && !setOnce.current) {
      setOnce.current = true;
      const firstFile = query.data.files[0].identifier;
      setSelectedFile(query.data.files[0].identifier);
      if (firstFile !== query.data.selectedFile) {
        setParams({ file: query.data.files[0].identifier });
      }
    }
  }, [query.data, setParams, setOnce]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      FileSelector,
      {
        files: ((_a2 = query.data) == null ? void 0 : _a2.files) ?? null,
        selectedFile,
        onSelected: (file) => {
          setSelectedFile(file.identifier);
          setParams({ file: file.identifier });
        }
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        color: "danger",
        disabled: !selectedFile,
        onClick: () => openDialog(ConfirmDeleteDialog, { identifier: selectedFile }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
      }
    ),
    selectedFile && /* @__PURE__ */ jsx(
      DataTableAddItemButton,
      {
        elementType: "a",
        download: (_c = (_b = query.data) == null ? void 0 : _b.files.find((f) => f.identifier === selectedFile)) == null ? void 0 : _c.name,
        href: `api/v1/logs/error/${selectedFile}/download`,
        icon: /* @__PURE__ */ jsx(DownloadIcon, {}),
        children: /* @__PURE__ */ jsx(Trans, { message: "Download log" })
      }
    )
  ] });
}
function FileSelector({ files, selectedFile, onSelected }) {
  if (!files) {
    return /* @__PURE__ */ jsx(Skeleton, { variant: "rect", className: "max-w-[210px]" });
  }
  if (!files.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    SelectForwardRef,
    {
      selectionMode: "single",
      selectedValue: selectedFile,
      size: "sm",
      minWidth: "min-w-[210px]",
      children: files == null ? void 0 : files.map((file) => /* @__PURE__ */ jsxs(
        Item,
        {
          value: file.identifier,
          onSelected: () => onSelected(file),
          children: [
            file.name,
            " (",
            /* @__PURE__ */ jsx(FormattedBytes, { bytes: file.size }),
            ")"
          ]
        },
        file.identifier
      ))
    }
  );
}
function ConfirmDeleteDialog({ identifier }) {
  const deleteLog = useDeleteErrorLog();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Delete log file" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this log file?" }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
      onConfirm: () => deleteLog.mutate({ identifier }, { onSuccess: () => closeDialog() }),
      isLoading: deleteLog.isPending,
      isDanger: true
    }
  );
}
const openedImage = "/assets/opened-4dded9dc.svg";
function useOutgoingEmailLogItemWithMime(id) {
  return useQuery({
    queryKey: ["logs/outgoing-email", id],
    queryFn: () => fetchLogItem(id)
  });
}
function fetchLogItem(id) {
  return apiClient.get(`logs/outgoing-email/${id}`).then((r) => r.data);
}
function OutgoingEmailLogEntryDialog({ logItemId }) {
  const { data } = useOutgoingEmailLogItemWithMime(logItemId);
  const { base_url } = useSettings();
  return /* @__PURE__ */ jsxs(Dialog, { size: "fullscreen", children: [
    /* @__PURE__ */ jsx(
      DialogHeader,
      {
        showDivider: true,
        padding: "px-24 py-10",
        actions: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "xs",
            disabled: !data,
            type: "button",
            onClick: data ? () => downloadFileFromUrl(
              `${base_url}/api/v1/logs/outgoing-email/${logItemId}/download`
            ) : void 0,
            children: /* @__PURE__ */ jsx(Trans, { message: "Download" })
          }
        ),
        children: /* @__PURE__ */ jsx(Trans, { message: "Email preview" })
      }
    ),
    /* @__PURE__ */ jsx(DialogBody, { children: data ? /* @__PURE__ */ jsx(
      "iframe",
      {
        srcDoc: data.logItem.parsed_message.body.html,
        className: "h-max w-full border-none",
        onLoad: (e) => {
          const iframe = e.target;
          iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
        }
      }
    ) : /* @__PURE__ */ jsx("div", { className: "flex min-h-200 items-center justify-center", children: /* @__PURE__ */ jsx(ProgressCircle, { isIndeterminate: true }) }) })
  ] });
}
const OutgoingEmailLogDatatableColumns = [
  {
    key: "message_id",
    allowsSorting: true,
    visibleInMode: "all",
    width: "flex-3 min-w-200",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Subject" }),
    body: (item) => /* @__PURE__ */ jsx(NameWithAvatar, { label: item.subject, description: item.message_id })
  },
  {
    key: "status",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Status" }),
    body: (item) => {
      switch (item.status) {
        case "sent":
          return /* @__PURE__ */ jsx(StatusChip, { color: "positive", children: /* @__PURE__ */ jsx(Trans, { message: "Sent" }) });
        case "not-sent":
          return /* @__PURE__ */ jsx(StatusChip, { color: void 0, children: /* @__PURE__ */ jsx(Trans, { message: "Not sent" }) });
        case "error":
          return /* @__PURE__ */ jsx(StatusChip, { color: "danger", children: /* @__PURE__ */ jsx(Trans, { message: "Error" }) });
      }
    }
  },
  {
    key: "from",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "From" }),
    body: (item) => item.from
  },
  {
    key: "to",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "To" }),
    body: (item) => item.to
  },
  {
    key: "created_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Date" }),
    body: (item) => /* @__PURE__ */ jsx(FormattedRelativeTime, { date: item.created_at })
  },
  {
    key: "actions",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Actions" }),
    hideHeader: true,
    align: "end",
    width: "w-42 flex-shrink-0",
    visibleInMode: "all",
    body: (item) => /* @__PURE__ */ jsx(PreviewEmailButton, { item })
  }
];
function PreviewEmailButton({ item }) {
  const rerunCommand2 = useRerunScheduledCommand();
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Preview" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        size: "md",
        className: "text-muted",
        disabled: rerunCommand2.isPending,
        onClick: () => {
          rerunCommand2.mutate({ id: item.id });
        },
        children: /* @__PURE__ */ jsx(VisibilityIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(OutgoingEmailLogEntryDialog, { logItemId: item.id })
  ] });
}
function StatusChip({ color, children }) {
  return /* @__PURE__ */ jsx(Chip, { color, size: "xs", className: "w-max min-w-50 text-center", children });
}
const OutgoingEmailLogDatatableFilters = [
  {
    key: "status",
    label: message("Status"),
    description: message("Status of the outgoing email"),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: "01",
      options: [
        {
          key: "01",
          label: message("Not sent"),
          value: "no-sent"
        },
        {
          key: "02",
          label: message("Sent"),
          value: "sent"
        },
        {
          key: "03",
          label: message("Error"),
          value: "error"
        }
      ]
    }
  },
  createdAtFilter({
    description: message("Date email send was attempted")
  })
];
function OutgoingEmailLogDatatable() {
  return /* @__PURE__ */ jsx(
    DataTablePage,
    {
      padding: "pt-12 md:pt-24",
      endpoint: "logs/outgoing-email",
      title: /* @__PURE__ */ jsx(Trans, { message: "Outgoing email" }),
      columns: OutgoingEmailLogDatatableColumns,
      filters: OutgoingEmailLogDatatableFilters,
      actions: /* @__PURE__ */ jsx(Actions, {}),
      enableSelection: false,
      emptyStateMessage: /* @__PURE__ */ jsx(
        DataTableEmptyStateMessage,
        {
          image: openedImage,
          title: /* @__PURE__ */ jsx(Trans, { message: "No outgoing emails have been logged yet" }),
          filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No matching emails" })
        }
      )
    }
  );
}
function Actions() {
  return /* @__PURE__ */ jsx(
    DataTableAddItemButton,
    {
      elementType: "a",
      href: "api/v1/logs/outgoing-email/download",
      download: true,
      icon: /* @__PURE__ */ jsx(DownloadIcon, {}),
      children: /* @__PURE__ */ jsx(Trans, { message: "Download log" })
    }
  );
}
const ReportsPage = React.lazy(() => import("./admin-report-page-0a4d73eb.mjs"));
const AdminRouteConfig = [
  {
    path: "appearance",
    element: /* @__PURE__ */ jsx(AuthRoute, { permission: "appearance.update", children: /* @__PURE__ */ jsx(AppearanceLayout, {}) }),
    children: [
      { index: true, element: /* @__PURE__ */ jsx(SectionList, {}) },
      { path: "general", element: /* @__PURE__ */ jsx(GeneralSection, {}) },
      { path: "seo-settings", element: /* @__PURE__ */ jsx(SeoSection, {}) },
      { path: "custom-code", element: /* @__PURE__ */ jsx(CustomCodeSection, {}) },
      { path: "themes", element: /* @__PURE__ */ jsx(ThemeList, {}) },
      { path: "themes/:themeIndex", element: /* @__PURE__ */ jsx(ThemeEditor, {}) },
      { path: "themes/:themeIndex/font", element: /* @__PURE__ */ jsx(ThemeFontPanel, {}) },
      { path: "themes/:themeIndex/radius", element: /* @__PURE__ */ jsx(ThemeRadiusPanel, {}) },
      { path: "menus", element: /* @__PURE__ */ jsx(MenuList, {}) },
      { path: "menus/:menuIndex", element: /* @__PURE__ */ jsx(MenuEditor, {}) },
      {
        path: "menus/:menuIndex/items/:menuItemIndex",
        element: /* @__PURE__ */ jsx(MenuItemEditor, {})
      },
      ...Object.values(AppAppearanceConfig.sections).flatMap(
        (s) => s.routes || []
      )
    ]
  },
  {
    path: "/",
    element: /* @__PURE__ */ jsx(AdminLayout, {}),
    children: [
      ...AppAdminRoutes,
      // REPORT PAGE
      {
        path: "/",
        element: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(FullPageLoader, { screen: true }), children: /* @__PURE__ */ jsx(ReportsPage, {}) })
      },
      // USERS
      {
        path: "users",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "users.update", children: /* @__PURE__ */ jsx(UserDatatable, {}) })
      },
      {
        path: "users/new",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "users.update", children: /* @__PURE__ */ jsx(CreateUserPage, {}) })
      },
      {
        path: "users/:userId/edit",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "users.update", children: /* @__PURE__ */ jsx(UpdateUserPage, {}) })
      },
      // ROLES
      {
        path: "roles",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "roles.update", children: /* @__PURE__ */ jsx(RolesIndexPage, {}) })
      },
      {
        path: "roles/new",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "roles.update", children: /* @__PURE__ */ jsx(CreateRolePage, {}) })
      },
      {
        path: "roles/:roleId/edit",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "roles.update", children: /* @__PURE__ */ jsx(EditRolePage, {}) })
      },
      // SUBSCRIPTIONS and PLANS
      {
        path: "subscriptions",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "subscriptions.update", children: /* @__PURE__ */ jsx(SubscriptionsIndexPage, {}) })
      },
      {
        path: "plans",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "plans.update", children: /* @__PURE__ */ jsx(PlansIndexPage, {}) })
      },
      {
        path: "plans/new",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "plans.update", children: /* @__PURE__ */ jsx(CreatePlanPage, {}) })
      },
      {
        path: "plans/:productId/edit",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "plans.update", children: /* @__PURE__ */ jsx(EditPlanPage, {}) })
      },
      // CUSTOM PAGES
      {
        path: "custom-pages",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "custom_pages.update", children: /* @__PURE__ */ jsx(CustomPageDatablePage, {}) })
      },
      {
        path: "custom-pages/new",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "custom_pages.update", children: /* @__PURE__ */ jsx(CreateCustomPage, {}) })
      },
      {
        path: "custom-pages/:pageId/edit",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "custom_pages.update", children: /* @__PURE__ */ jsx(EditCustomPage, {}) })
      },
      // TAGS
      {
        path: "tags",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "tags.update", children: /* @__PURE__ */ jsx(TagIndexPage, {}) })
      },
      // LOCALIZATIONS
      {
        path: "localizations",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "localizations.update", children: /* @__PURE__ */ jsx(LocalizationIndex, {}) })
      },
      {
        path: "localizations/:localeId/translate",
        element: /* @__PURE__ */ jsx(TranslationManagementPage, {})
      },
      // FILE ENTRIES
      {
        path: "files",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "files.update", children: /* @__PURE__ */ jsx(FileEntryIndexPage, {}) })
      },
      // ADS
      {
        path: "ads",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "settings.update", children: /* @__PURE__ */ jsx(AdsPage, {}) })
      },
      // SETTINGS
      {
        path: "settings",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "settings.update", children: /* @__PURE__ */ jsx(SettingsLayout, {}) }),
        children: [
          { index: true, element: /* @__PURE__ */ jsx(Navigate, { to: "general", replace: true }) },
          { path: "general", element: /* @__PURE__ */ jsx(GeneralSettings, {}) },
          { path: "subscriptions", element: /* @__PURE__ */ jsx(SubscriptionSettings, {}) },
          { path: "localization", element: /* @__PURE__ */ jsx(LocalizationSettings, {}) },
          { path: "authentication", element: /* @__PURE__ */ jsx(AuthenticationSettings, {}) },
          { path: "uploading", element: /* @__PURE__ */ jsx(UploadingSettings, {}) },
          { path: "outgoing-email", element: /* @__PURE__ */ jsx(OutgoingEmailSettings, {}) },
          { path: "cache", element: /* @__PURE__ */ jsx(CacheSettings, {}) },
          { path: "analytics", element: /* @__PURE__ */ jsx(ReportsSettings, {}) },
          { path: "logging", element: /* @__PURE__ */ jsx(LoggingSettings, {}) },
          { path: "queue", element: /* @__PURE__ */ jsx(QueueSettings, {}) },
          { path: "recaptcha", element: /* @__PURE__ */ jsx(RecaptchaSettings, {}) },
          { path: "gdpr", element: /* @__PURE__ */ jsx(GdprSettings, {}) },
          ...AppSettingsRoutes
        ]
      },
      // LOGS
      {
        path: "logs",
        element: /* @__PURE__ */ jsx(AuthRoute, { permission: "logs.view", children: /* @__PURE__ */ jsx(LogsPage, {}) }),
        children: [
          { index: true, element: /* @__PURE__ */ jsx(ScheduleLogDatatable, {}) },
          { path: "schedule", element: /* @__PURE__ */ jsx(ScheduleLogDatatable, {}) },
          { path: "error", element: /* @__PURE__ */ jsx(ErrorLogDatatable, {}) },
          { path: "outgoing-email", element: /* @__PURE__ */ jsx(OutgoingEmailLogDatatable, {}) }
        ]
      }
    ]
  },
  { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) }
];
function AdminRoutes() {
  return useRoutes(AdminRouteConfig);
}
const adminRoutes = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminRoutes
}, Symbol.toStringTag, { value: "Module" }));
export {
  AdminHeaderReport as A,
  adminRoutes as B,
  DownloadIcon as D,
  EmojiEventsIcon as E,
  FormatAlignCenterIcon as F,
  HelpOutlineIcon as H,
  InfoIcon as I,
  NoteIcon as N,
  PauseIcon as P,
  ReportDateSelector as R,
  SendIcon as S,
  TranslateIcon as T,
  UndoIcon as U,
  VisitorsReportCharts as V,
  ArrowBackIcon as a,
  DragIndicatorIcon as b,
  EventRepeatIcon as c,
  FormatAlignJustifyIcon as d,
  FormatAlignLeftIcon as e,
  FormatAlignRightIcon as f,
  FormatColorFillIcon as g,
  FormatColorTextIcon as h,
  HorizontalRuleIcon as i,
  PersonOffIcon as j,
  PlayArrowIcon as k,
  PriorityHighIcon as l,
  RedoIcon as m,
  ReportIcon as n,
  RestartAltIcon as o,
  SmartDisplayIcon as p,
  StyleIcon as q,
  SyncIcon as r,
  TrendingDownIcon as s,
  TrendingFlatIcon as t,
  useAdminReport as u,
  TrendingUpIcon as v,
  TuneIcon as w,
  VisibilityIcon as x,
  useFilter as y,
  iconGridStyle as z
};
//# sourceMappingURL=admin-routes-31100799.mjs.map
