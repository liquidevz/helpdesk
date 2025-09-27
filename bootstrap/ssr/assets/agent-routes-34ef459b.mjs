import { jsx, jsxs } from "react/jsx-runtime";
import { useSearchParams, Link, NavLink, useLocation, Outlet, useParams, useRoutes, Navigate } from "react-router-dom";
import { U as UserAvatar, u as useChangeTicketStatus, a as useTickets, b as useTicketPageStore, c as useTicketReplies, T as TicketReplyLayout, I as InfiniteScrollSentinel, d as useOpenReplyEditor, e as TicketHeaderLayout, f as TicketTagList, g as useInfiniteData, h as useUpdateTicket, i as getCustomerLink, t as ticketPageStore, j as useDeleteDraft, S as SendReplyButton, k as defaultDraftValues, l as useCreateTicket } from "./use-create-ticket-dedcd6c5.mjs";
import { g as useNavigate, T as Trans, M as FormattedRelativeTime, O as Chip, y as getBootstrapData, n as apiClient, Q as queryClient, R as toast, m as message, s as showHttpErrorToast, U as Tooltip, I as IconButton, B as Button, V as createSvgIcon, W as MenuTrigger, X as KeyboardArrowDownIcon, Y as Menu, i as Item, D as DialogTrigger, e as useTrans, d as useDialogContext, b as Dialog, Z as DialogHeader, c as DialogBody, h as ComboBoxForwardRef, _ as DialogFooter, $ as ConfirmationDialog, a0 as useAutoFocus, E as IllustratedMessage, F as SvgImage, a1 as SettingsIcon, q as opacityAnimation, w as Skeleton, N as Navbar, a2 as TextField, S as SearchIcon, a3 as FormattedDate, f as useSearchArticles, j as getArticleLink, z as ArticleIcon, k as ArticlePath, a as useSettings, a4 as useLocalStorage, a5 as FileUploadProvider, a6 as openDialog, J as FullPageLoader, a7 as ErrorIcon, a8 as closeDialog, a9 as updateTicketQuery, aa as useSyncEnvatoPurchases, t as LinkStyle, ab as PersonIcon, A as ArticleLink, ac as useTicket, v as PageStatus, ad as Form, ae as ButtonBase, af as CheckCircleIcon, p as useAuth, ag as useTicketHcCategories, ah as getFromLocalStorage, ai as ArrowDropDownIcon, aj as Helmet, ak as getInputFieldClassNames, al as FormTextField, am as FormSelect, an as onFormQueryError, C as CloseIcon, ao as useValueLists, ap as TimezoneSelect, aq as useUser, ar as prefetchValueLists, K as NotFoundPage } from "../server-entry.mjs";
import { useCallback, useMemo, forwardRef, useState, useRef, Fragment, useEffect, Children, cloneElement, useContext } from "react";
import { D as DataTablePaginationFooter, C as ChipList, T as Table, a as DataTableEmptyStateMessage, R as ReplyEditor$1, g as getReplyBody, A as AttachmentListLayout, F as FileEntryAttachmentLayout, i as insertLinkIntoTextEditor } from "./reply-editor-0dd9f156.mjs";
import clsx from "clsx";
import { u as useTags, D as DeleteIcon, G as GlobalLoadingProgress, F as FilterOperator, a as FilterControlType, c as createdAtFilter, b as updatedAtFilter, t as timestampFilter, U as USER_MODEL, A as AddFilterButton, d as FilterList, T as Tabs, e as TabList, f as Tab, N as NameWithAvatar, B as ButtonGroup, M as MoreVertIcon, g as FormNormalizedModelField, C as CreateCannedReplyDialog, h as CannedRepliesDatatablePage, i as FormChipField, j as AddIcon, I as InfoDialogTrigger, k as BanUserDialog, S as SearchReportTable } from "./search-report-table-9acf0fea.mjs";
import { m, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";
import { u as useKeybind, S as SearchTriggerButton } from "./search-trigger-button-2521a5b9.mjs";
import { a as DashboardLayout, b as DashboardNavbar, c as DashboardSidenav, d as DashboardContent, s as searchImage, u as usePrevious, D as DashboardLayoutContext } from "./search-9f6b7ed0.mjs";
import { I as InboxIcon, F as FolderIcon, K as KeyboardArrowUpIcon, E as EmailIcon, C as CommentIcon } from "./Comment-81d85792.mjs";
import { useDebouncedCallback } from "use-debounce";
import { R as ReplyIcon } from "./Reply-cd05287b.mjs";
import { useForm, useFieldArray } from "react-hook-form";
import { useGlobalListeners } from "@react-aria/utils";
import { getLocalTimeZone } from "@internationalized/date";
import { M as MoreHorizIcon } from "./Edit-7ad4ec30.mjs";
import "zustand";
import "react-dom/server";
import "process";
import "http";
import "axios";
import "react-router-dom/server.mjs";
import "nano-memoize";
import "@internationalized/number";
import "zustand/middleware/immer";
import "nanoid";
import "@react-aria/focus";
import "@floating-ui/react-dom";
import "react-merge-refs";
import "react-dom";
import "immer";
import "@react-stately/utils";
import "@react-aria/ssr";
import "deepmerge";
import "axios-retry";
import "tus-js-client";
import "mime-match";
import "react-use-clipboard";
import "slugify";
import "@react-aria/interactions";
import "just-debounce-it";
const openedImage = "/assets/opened-bde6b15c.svg";
const defaultPage = "1";
const defaultPerPage = "20";
function useMailboxParams() {
  const [searchParams] = useSearchParams();
  const tagId = searchParams.get("tagId") || "unassigned";
  return {
    tagId,
    page: searchParams.get("page") || defaultPage,
    perPage: searchParams.get("perPage") || defaultPerPage,
    orderBy: searchParams.get("orderBy") || "",
    orderDir: searchParams.get("orderDir") || ""
  };
}
function useNavigateToMailboxTicketTable() {
  const navigate = useNavigate();
  const urlParams = useMailboxParams();
  return useCallback(
    (userParams = {}) => {
      const link = getMailboxTicketTableLink(urlParams, userParams);
      navigate(link);
    },
    [urlParams, navigate]
  );
}
function useMailboxTicketTableLink(userParams = {}) {
  const urlParams = useMailboxParams();
  return getMailboxTicketTableLink(urlParams, userParams);
}
function getMailboxTicketTableLink(urlParams, userParams = {}) {
  const tagId = userParams.tagId || urlParams.tagId;
  const page = `${userParams.page || urlParams.page}`;
  const perPage = `${userParams.perPage || urlParams.perPage}`;
  const orderBy = "orderBy" in userParams ? userParams.orderBy : urlParams.orderBy;
  const orderDir = "orderDir" in userParams ? userParams.orderDir : urlParams.orderDir;
  let link = `/agent/tickets?tagId=${tagId}`;
  if (page !== defaultPage) {
    link += `&page=${page}`;
  }
  if (perPage !== defaultPerPage) {
    link += `&perPage=${perPage}`;
  }
  if (orderBy) {
    link += `&orderBy=${orderBy}`;
  }
  if (orderDir) {
    link += `&orderDir=${orderDir}`;
  }
  return link;
}
function TicketTableFooter({
  onPageChange,
  onPerPageChange,
  query
}) {
  return /* @__PURE__ */ jsx(
    DataTablePaginationFooter,
    {
      className: "flex-shrink-0",
      onPerPageChange,
      onPageChange,
      query
    }
  );
}
const TicketTableColumns = [
  {
    key: "user_id",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Customer" }),
    visibleInMode: "all",
    width: "w-132",
    body: (ticket) => ticket.user ? ticket.user.display_name : "-"
  },
  {
    key: "avatar",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Avatar" }),
    hideHeader: true,
    width: "w-100 flex-shrink-0",
    body: (ticket) => ticket.user ? /* @__PURE__ */ jsx(
      "img",
      {
        className: "m-auto h-38 w-38 rounded-full",
        src: ticket.user.avatar,
        alt: ""
      }
    ) : "-"
  },
  {
    key: "summary",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Ticket summary" }),
    body: (ticket) => /* @__PURE__ */ jsx(TicketSummary, { ticket }),
    width: "flex-3 min-w-200"
  },
  {
    key: "replies_count",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Replies count" }),
    hideHeader: true,
    width: "w-50",
    body: (ticket) => /* @__PURE__ */ jsx("div", { className: "w-max rounded border bg-alt px-6 text-xs font-normal text-muted", children: ticket.replies_count || 1 })
  },
  {
    key: "assigned_to",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Assigned to" }),
    width: "w-124",
    body: (ticket) => ticket.assignee ? ticket.assignee.display_name : ""
  },
  {
    key: "id",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Number" }),
    width: "w-90",
    body: (ticket) => ticket.id
  },
  {
    key: "updated_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    visibleInMode: "all",
    width: "w-144",
    body: (ticket) => /* @__PURE__ */ jsx(FormattedRelativeTime, { date: ticket.updated_at })
  }
];
function TicketSummary({ ticket }) {
  var _a, _b, _c, _d;
  const body = ((_a = ticket.latest_reply) == null ? void 0 : _a.body) ? ticket.latest_reply.body : (_c = (_b = ticket.replies) == null ? void 0 : _b[0]) == null ? void 0 : _c.body;
  const tags = (_d = ticket.tags) == null ? void 0 : _d.filter((t) => t.type !== "status");
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden overflow-ellipsis whitespace-nowrap pr-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-10", children: [
      /* @__PURE__ */ jsx(ChipList, { size: "xs", wrap: false, children: tags == null ? void 0 : tags.map((tag) => /* @__PURE__ */ jsx(Chip, { children: tag.display_name || tag.name }, tag.id)) }),
      /* @__PURE__ */ jsx("div", { children: ticket.subject })
    ] }),
    body && /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis whitespace-nowrap pt-4 font-normal text-muted", children: body })
  ] });
}
function TicketPageLink({
  ticket,
  className,
  children,
  color = "inherit",
  ...linkProps
}) {
  const finalUri = useMemo(() => {
    return getTicketPageLink(ticket);
  }, [ticket]);
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...linkProps,
      className: clsx(
        color === "primary" ? "text-primary hover:text-primary-dark" : "text-inherit",
        "overflow-x-hidden overflow-ellipsis outline-none transition-colors hover:underline focus-visible:underline",
        className
      ),
      to: finalUri,
      children: children ?? ticket.subject
    }
  );
}
function getTicketPageLink(ticket, { absolute, tagId } = {}) {
  let link = `/agent/tickets/${ticket.id}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  if (tagId) {
    link = `${link}?tagId=${tagId}`;
  }
  return link;
}
function TicketTable({
  query,
  selectedTickets,
  onSelectionChange,
  sortDescriptor,
  onSortChange
}) {
  var _a;
  const navigate = useNavigate();
  const { tagId } = useMailboxParams();
  return /* @__PURE__ */ jsx(
    Table,
    {
      headerCellHeight: "h-36",
      cellHeight: "h-64",
      selectedRows: selectedTickets,
      onSelectionChange: (values) => onSelectionChange == null ? void 0 : onSelectionChange(values),
      columns: TicketTableColumns,
      data: ((_a = query.data) == null ? void 0 : _a.pagination.data) || [],
      renderRowAs: TicketTableRow,
      onAction: (ticket) => navigate(getTicketPageLink(ticket, { tagId })),
      sortDescriptor,
      onSortChange
    }
  );
}
function TicketTableRow({
  children,
  item,
  className,
  ...domProps
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        className,
        item.status === "open" && "font-semibold",
        item.closed_at && "bg-alt"
      ),
      ...domProps,
      children
    }
  );
}
const AGENT_PERMISSION = "tickets.update";
const TICKET_MODEL_TYPE = "ticket";
function useAgents() {
  return useQuery({
    queryKey: ["users", "agents"],
    queryFn: () => fetchAgents()
  });
}
function fetchAgents() {
  return apiClient.get("users", {
    params: {
      permission: AGENT_PERMISSION,
      perPage: 20
    }
  }).then((response) => response.data);
}
function useAssignTicketsToAgent() {
  return useMutation({
    mutationFn: (payload) => assignTickets(payload),
    onSuccess: async () => {
      await Promise.allSettled([
        queryClient.invalidateQueries({ queryKey: ["mailbox", "sidenav-tags"] }),
        queryClient.invalidateQueries({ queryKey: ["tickets"] })
      ]);
      toast(message("Tickets reassigned"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function assignTickets(payload) {
  return apiClient.post(`tickets/assign`, payload).then((r) => r.data);
}
const TicketActionButton = forwardRef(
  ({ startIcon, endIcon, children, color, isCompact = false, ...buttonProps }, ref) => {
    if (isCompact) {
      return /* @__PURE__ */ jsx(Tooltip, { label: children, ref, children: /* @__PURE__ */ jsx(IconButton, { color, iconSize: "md", size: "sm", ...buttonProps, children: startIcon }) });
    }
    return /* @__PURE__ */ jsx(
      Button,
      {
        startIcon,
        endIcon,
        variant: "outline",
        color,
        size: "xs",
        ref,
        ...buttonProps,
        children
      }
    );
  }
);
const AssignTicketIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M 16 5 C 12.145852 5 9 8.1458513 9 12 C 9 14.408843 10.23116 16.55212 12.09375 17.8125 C 8.5266131 19.342333 6 22.881262 6 27 L 8 27 C 8 24.109626 9.5263067 21.592958 11.8125 20.1875 C 12.483006 21.834363 14.120749 23 16 23 C 17.879251 23 19.516994 21.834363 20.1875 20.1875 C 22.473693 21.592958 24 24.109626 24 27 L 26 27 C 26 22.881262 23.473387 19.342333 19.90625 17.8125 C 21.76884 16.55212 23 14.408843 23 12 C 23 8.1458513 19.854148 5 16 5 z M 16 7 C 18.773268 7 21 9.2267317 21 12 C 21 14.773268 18.773268 17 16 17 C 13.226732 17 11 14.773268 11 12 C 11 9.2267317 13.226732 7 16 7 z M 16 19 C 16.81989 19 17.600009 19.116459 18.34375 19.34375 C 17.997935 20.307297 17.090648 21 16 21 C 14.909352 21 14.002065 20.307297 13.65625 19.34375 C 14.399991 19.116459 15.18011 19 16 19 z" }),
  "",
  "0 0 32 32"
);
function AssignTicketsButton({ ticketIds, onSuccess, isCompact }) {
  const { data } = useAgents();
  const assignTickets2 = useAssignTicketsToAgent();
  const [isOpen, setIsOpen] = useState(false);
  useKeybind("window", "a", () => setIsOpen(true));
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      isOpen,
      onOpenChange: setIsOpen,
      onItemSelected: (userId) => assignTickets2.mutate({ ticketIds, userId }, { onSuccess }),
      children: [
        /* @__PURE__ */ jsx(
          TicketActionButton,
          {
            isCompact,
            startIcon: /* @__PURE__ */ jsx(AssignTicketIcon, {}),
            endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
            disabled: assignTickets2.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: "Assign (a)" })
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: data == null ? void 0 : data.pagination.data.map((user) => /* @__PURE__ */ jsx(
          Item,
          {
            value: user.id,
            startIcon: /* @__PURE__ */ jsx(UserAvatar, { user, size: "sm" }),
            children: user.display_name
          },
          user.id
        )) })
      ]
    }
  );
}
function useMailboxSidenavTags() {
  return useQuery({
    queryKey: ["mailbox", "sidenav-tags"],
    queryFn: () => fetchTags()
  });
}
function fetchTags() {
  return apiClient.get("tags/agent-mailbox").then((response) => response.data);
}
const ChangeStatusIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M 5 5 L 5 6 L 5 29 L 7 29 L 7 19 L 15 19 L 15 21 L 15 22 L 16 22 L 26 22 L 27 22 L 27 21 L 27 9 L 27 8 L 26 8 L 17 8 L 17 6 L 17 5 L 16 5 L 6 5 L 5 5 z M 7 7 L 15 7 L 15 8 L 15 9 L 15 17 L 7 17 L 7 7 z M 17 10 L 25 10 L 25 20 L 17 20 L 17 19 L 17 18 L 17 10 z" }),
  "",
  "0 0 32 32"
);
function ChangeTicketStatusButton({
  ticketIds,
  onSuccess,
  isCompact
}) {
  const { data } = useMailboxSidenavTags();
  const changeStatus = useChangeTicketStatus();
  const [isOpen, setIsOpen] = useState(false);
  useKeybind("window", "s", () => setIsOpen(true));
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      isOpen,
      onOpenChange: setIsOpen,
      onItemSelected: (newStatus) => changeStatus.mutate(
        { ids: ticketIds, status: newStatus },
        {
          onSuccess: () => {
            onSuccess == null ? void 0 : onSuccess();
            toast(message("Status changed"));
          }
        }
      ),
      children: [
        /* @__PURE__ */ jsx(
          TicketActionButton,
          {
            isCompact,
            startIcon: /* @__PURE__ */ jsx(ChangeStatusIcon, {}),
            endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
            disabled: changeStatus.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: "Change status (s)" })
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: data == null ? void 0 : data.statusTags.map((tag) => /* @__PURE__ */ jsx(Item, { value: tag.name, capitalizeFirst: true, children: tag.display_name || tag.name }, tag.id)) })
      ]
    }
  );
}
function useAddTagToTickets() {
  return useMutation({
    mutationFn: (payload) => addTag(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["mailbox", "sidenav-tags"] });
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast(message("Tag added"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function addTag(payload) {
  return apiClient.post(`tickets/tags/add`, payload).then((r) => r.data);
}
const AddTagIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M 16 5 L 15.6875 5.28125 L 4.28125 16.8125 L 3.59375 17.5 L 4.28125 18.21875 L 13.78125 27.71875 L 14.5 28.40625 L 15.1875 27.71875 L 16.40625 26.5 C 17.46025 29.688126 20.466215 32 24 32 C 28.406433 32 32 28.406433 32 24 C 32 20.501976 29.731898 17.519896 26.59375 16.4375 L 26.71875 16.3125 L 27 16 L 27 15.59375 L 27 6 L 27 5 L 26 5 L 16.40625 5 L 16 5 z M 16.84375 7 L 25 7 L 25 15.15625 L 24.15625 16 C 24.103605 15.99897 24.052884 16 24 16 C 19.593567 16 16 19.593567 16 24 C 16 24.03173 15.999628 24.062105 16 24.09375 L 14.5 25.59375 L 6.40625 17.5 L 16.84375 7 z M 22 9 C 21.447715 9 21 9.4477153 21 10 C 21 10.552285 21.447715 11 22 11 C 22.552285 11 23 10.552285 23 10 C 23 9.4477153 22.552285 9 22 9 z M 24 18 C 27.325553 18 30 20.674447 30 24 C 30 27.325553 27.325553 30 24 30 C 20.674447 30 18 27.325553 18 24 C 18 20.674447 20.674447 18 24 18 z M 23 20 L 23 23 L 20 23 L 20 25 L 23 25 L 23 28 L 25 28 L 25 25 L 28 25 L 28 23 L 25 23 L 25 20 L 23 20 z" }),
  "",
  "0 0 32 32"
);
function AddTagToTicketsButton({
  ticketIds,
  onSuccess,
  isCompact
}) {
  const addTag2 = useAddTagToTickets();
  const [isOpen, setIsOpen] = useState(false);
  useKeybind("window", "t", () => setIsOpen(true));
  return /* @__PURE__ */ jsxs(
    DialogTrigger,
    {
      isOpen,
      onOpenChange: setIsOpen,
      type: "popover",
      onClose: (tagName) => {
        if (tagName) {
          addTag2.mutate({ tagName, ticketIds }, { onSuccess });
        }
      },
      children: [
        /* @__PURE__ */ jsx(
          TicketActionButton,
          {
            startIcon: /* @__PURE__ */ jsx(AddTagIcon, {}),
            isCompact,
            disabled: addTag2.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: "Add tag (t)" })
          }
        ),
        /* @__PURE__ */ jsx(AddTagDialog, {})
      ]
    }
  );
}
function AddTagDialog() {
  const { trans } = useTrans();
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const { data, isFetching } = useTags({ query, perPage: 8, notType: "status" });
  const { close: close2, formId } = useDialogContext();
  return /* @__PURE__ */ jsxs(Dialog, { size: "sm", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Add tag" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      "form",
      {
        id: formId,
        onSubmit: (e) => {
          e.preventDefault();
          close2(selectedTag);
        },
        children: /* @__PURE__ */ jsx(
          ComboBoxForwardRef,
          {
            isAsync: true,
            isLoading: isFetching,
            inputValue: query,
            onInputValueChange: setQuery,
            selectedValue: selectedTag,
            onSelectionChange: (value) => setSelectedTag(value),
            selectionMode: "single",
            placeholder: trans(message("Enter tag name...")),
            allowCustomValue: true,
            autoFocus: true,
            children: data == null ? void 0 : data.pagination.data.map((result) => /* @__PURE__ */ jsx(
              Item,
              {
                value: result.name,
                textLabel: result.name,
                capitalizeFirst: true,
                className: "rounded",
                children: result.display_name || result.name
              },
              result.id
            ))
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close2(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { variant: "flat", color: "primary", type: "submit", form: formId, children: /* @__PURE__ */ jsx(Trans, { message: "Add" }) })
    ] })
  ] });
}
function useDeleteTickets() {
  return useMutation({
    mutationFn: (payload) => deleteTickets(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast(message("Tickets deleted"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteTickets({ ids }) {
  return apiClient.delete(`tickets/${ids.join(",")}`).then((r) => r.data);
}
function DeleteTicketsButton({ ticketIds, onSuccess, isCompact }) {
  const [isOpen, setIsOpen] = useState(false);
  useKeybind("window", "d", () => setIsOpen(true));
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx(
      TicketActionButton,
      {
        startIcon: /* @__PURE__ */ jsx(DeleteIcon, {}),
        color: "danger",
        isCompact,
        children: /* @__PURE__ */ jsx(Trans, { message: "Delete (d)" })
      }
    ),
    /* @__PURE__ */ jsx(DeleteTicketsDialog, { ticketIds, onDeleted: onSuccess })
  ] });
}
function DeleteTicketsDialog({ ticketIds, onDeleted }) {
  const deleteTickets2 = useDeleteTickets();
  const { close: close2 } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isDanger: true,
      isLoading: deleteTickets2.isPending,
      onConfirm: () => {
        deleteTickets2.mutate(
          { ids: ticketIds },
          {
            onSuccess: () => {
              close2();
              onDeleted == null ? void 0 : onDeleted();
            }
          }
        );
      },
      title: /* @__PURE__ */ jsx(Trans, { message: "Delete tickets" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete selected tickets?" }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "delete" })
    }
  );
}
function TicketTableActions({ ticketIds, onActionCompleted }) {
  const ref = useRef(null);
  useAutoFocus({ autoFocus: true }, ref);
  return /* @__PURE__ */ jsxs(
    m.div,
    {
      ref,
      initial: { y: -30, opacity: 1 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 30, opacity: 0 },
      tabIndex: -1,
      role: "menu",
      className: "fixed left-0 right-0 top-120 mx-auto flex w-max items-center justify-center gap-12 rounded border bg p-14 shadow-lg outline-none focus-visible:ring-2",
      children: [
        /* @__PURE__ */ jsx(
          AssignTicketsButton,
          {
            ticketIds,
            onSuccess: onActionCompleted
          }
        ),
        /* @__PURE__ */ jsx(
          ChangeTicketStatusButton,
          {
            ticketIds,
            onSuccess: onActionCompleted
          }
        ),
        /* @__PURE__ */ jsx(
          AddTagToTicketsButton,
          {
            ticketIds,
            onSuccess: onActionCompleted
          }
        ),
        /* @__PURE__ */ jsx(
          DeleteTicketsButton,
          {
            ticketIds,
            onSuccess: onActionCompleted
          }
        )
      ]
    }
  );
}
function TicketTablePage() {
  const [searchParams] = useSearchParams();
  const orderBy = searchParams.get("orderBy") || "";
  const orderDir = searchParams.get("orderDir") || "";
  const sortDescriptor = useMemo(() => {
    return { orderBy, orderDir };
  }, [orderBy, orderDir]);
  const query = useTickets({
    ...useMailboxParams(),
    loader: "ticketTable"
  });
  const { data, isLoading, isPlaceholderData } = query;
  const items = (data == null ? void 0 : data.pagination.data) || [];
  const isEmpty = !isLoading && !isPlaceholderData && items.length === 0;
  const navigateToTicketTable = useNavigateToMailboxTicketTable();
  const [selectedTickets, setSelectedTickets] = useState([]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(GlobalLoadingProgress, { query }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-h-full min-w-0 flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
        /* @__PURE__ */ jsx(
          TicketTable,
          {
            query,
            selectedTickets,
            onSelectionChange: setSelectedTickets,
            sortDescriptor,
            onSortChange: (value) => {
              navigateToTicketTable({
                orderBy: value.orderBy,
                orderDir: value.orderDir
              });
            }
          }
        ),
        isEmpty && /* @__PURE__ */ jsx(
          IllustratedMessage,
          {
            className: "mt-40",
            size: "sm",
            image: /* @__PURE__ */ jsx(SvgImage, { src: openedImage }),
            title: /* @__PURE__ */ jsx(Trans, { message: "There are no tickets in this category yet." })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        TicketTableFooter,
        {
          query,
          onPageChange: (page) => navigateToTicketTable({ page }),
          onPerPageChange: (perPage) => navigateToTicketTable({ perPage })
        }
      ),
      /* @__PURE__ */ jsx(AnimatePresence, { children: selectedTickets.length && /* @__PURE__ */ jsx(
        TicketTableActions,
        {
          ticketIds: selectedTickets,
          onActionCompleted: () => setSelectedTickets([])
        }
      ) })
    ] })
  ] });
}
function AgentNavbar({ element, onOpenSearchPage }) {
  const navigate = useNavigate();
  const defaultOpenSearchPage = useCallback(() => {
    navigate("/agent/search");
  }, [navigate]);
  const Element = element;
  return /* @__PURE__ */ jsx(Element, { menuPosition: "agent-mailbox", color: "bg", size: "md", children: /* @__PURE__ */ jsx(
    SearchTriggerButton,
    {
      size: "sm",
      width: "w-320",
      onTrigger: onOpenSearchPage || defaultOpenSearchPage,
      children: /* @__PURE__ */ jsx(Trans, { message: "Search" })
    }
  ) });
}
function AgentTicketListSidenav() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("aside", { className: "compact-scrollbar flex w-full flex-col gap-24 overflow-y-auto border-r text-muted", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
      /* @__PURE__ */ jsx(Heading, { icon: /* @__PURE__ */ jsx(InboxIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Inbox" }) }),
      /* @__PURE__ */ jsx(TagList, { type: "viewTags" }),
      /* @__PURE__ */ jsx(Heading, { icon: /* @__PURE__ */ jsx(FolderIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Folders" }) }),
      /* @__PURE__ */ jsx(TagList, { type: "categoryTags" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-auto p-14", children: /* @__PURE__ */ jsxs(MenuTrigger, { placement: "top", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "min-h-34 w-full",
          variant: "outline",
          startIcon: /* @__PURE__ */ jsx(SettingsIcon, {}),
          endIcon: /* @__PURE__ */ jsx(KeyboardArrowUpIcon, {}),
          size: "xs",
          children: /* @__PURE__ */ jsx(Trans, { message: "Settings" })
        }
      ),
      /* @__PURE__ */ jsxs(Menu, { children: [
        /* @__PURE__ */ jsx(
          Item,
          {
            value: "saved-replies",
            onSelected: () => navigate("/agent/saved-replies"),
            children: /* @__PURE__ */ jsx(Trans, { message: "Saved replies" })
          }
        ),
        /* @__PURE__ */ jsx(
          Item,
          {
            value: "new-ticket",
            onSelected: () => navigate("/agent/tickets/new"),
            children: /* @__PURE__ */ jsx(Trans, { message: "New ticket" })
          }
        ),
        /* @__PURE__ */ jsx(
          Item,
          {
            value: "notifications",
            onSelected: () => navigate("/notifications/settings"),
            children: /* @__PURE__ */ jsx(Trans, { message: "Notifications" })
          }
        )
      ] })
    ] }) })
  ] });
}
function Heading({ icon, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-14 flex items-center gap-8 px-14 pt-20", children: [
    icon,
    /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold uppercase", children })
  ] });
}
const listItemClassName = "flex h-40 items-center justify-between gap-8 pl-38 pr-8 mx-8 rounded-lg";
function TagList({ type }) {
  const { data, isLoading } = useMailboxSidenavTags();
  const tags = data == null ? void 0 : data[type];
  const skeletons = /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: [...Array(4)].map((_, index) => /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(listItemClassName, "max-w-172 border-l-transparent"),
      children: /* @__PURE__ */ jsx(Skeleton, { variant: "text" })
    },
    index
  )) }, "skeletons");
  return /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: isLoading ? skeletons : /* @__PURE__ */ jsx(
    m.ul,
    {
      className: "cursor-pointer text-sm",
      ...opacityAnimation,
      children: tags == null ? void 0 : tags.map((tag) => /* @__PURE__ */ jsx(TagListItem, { tag }, tag.id))
    },
    "tag-list"
  ) });
}
function TagListItem({ tag }) {
  const isActive = `${tag.id}` === useMailboxParams().tagId;
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
    NavLink,
    {
      className: clsx(
        listItemClassName,
        isActive ? "border-l-primary bg-primary/6 hover:bg-primary/10" : "border-l-transparent hover:bg-hover"
      ),
      to: `/agent/tickets?tagId=${tag.id}`,
      end: true,
      children: [
        " ",
        /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Trans, { message: tag.display_name || tag.name }),
          tag.tickets_count ? /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "flex h-18 w-30 items-center justify-center rounded-full text-[11px] font-semibold",
                isActive && "bg-primary text-on-primary"
              ),
              children: tag.tickets_count
            }
          ) : null
        ] })
      ]
    }
  ) }, tag.id);
}
function AgentPageLayout({ children, rightSidenav }) {
  return /* @__PURE__ */ jsxs(DashboardLayout, { name: "mailbox", children: [
    /* @__PURE__ */ jsx(AgentNavbar, { element: DashboardNavbar }),
    /* @__PURE__ */ jsx(DashboardSidenav, { position: "left", className: "bg-alt", children: /* @__PURE__ */ jsx(AgentTicketListSidenav, {}) }),
    /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsx("main", { children }) }),
    rightSidenav
  ] });
}
function AgentTicketListPage() {
  return /* @__PURE__ */ jsx(AgentPageLayout, { children: /* @__PURE__ */ jsx(TicketTablePage, {}) });
}
function useSearchTicketsFilters() {
  const { data } = useMailboxSidenavTags();
  return useMemo(() => {
    if (!data)
      return null;
    return [
      {
        key: "status",
        label: message("Status"),
        description: message("Ticket status"),
        defaultOperator: FilterOperator.eq,
        control: {
          type: FilterControlType.Select,
          defaultValue: "01",
          options: data.statusTags.map((tag) => ({
            key: tag.id,
            label: message(tag.display_name || tag.name),
            value: tag.name
          }))
        }
      },
      {
        key: "tag",
        label: message("Folder"),
        description: message("Folder ticket is assigned to"),
        defaultOperator: FilterOperator.eq,
        control: {
          type: FilterControlType.Select,
          defaultValue: "01",
          options: data.categoryTags.map((tag) => ({
            key: tag.id,
            label: message(tag.display_name || tag.name),
            value: tag.name
          }))
        }
      },
      createdAtFilter({
        description: message("Date ticket was created")
      }),
      updatedAtFilter({
        description: message("Date ticket was last updated")
      }),
      timestampFilter({
        key: "closed_at",
        label: message("Closed at"),
        description: message("Date ticket was closed")
      }),
      {
        key: "user_id",
        label: message("Customer"),
        description: message("Customer that created the ticket"),
        defaultOperator: FilterOperator.eq,
        control: {
          type: FilterControlType.SelectModel,
          model: USER_MODEL
        }
      },
      {
        key: "assigned_to",
        label: message("Assignee"),
        description: message("Agent assigned to the ticket"),
        defaultOperator: FilterOperator.eq,
        control: {
          type: FilterControlType.SelectModel,
          model: USER_MODEL
        }
      }
    ];
  }, [data]);
}
function useStableScrollbar(disable = false) {
  useEffect(() => {
    if (disable) {
      document.documentElement.classList.remove("stable-scrollbar");
    } else {
      document.documentElement.classList.add("stable-scrollbar");
    }
    return () => {
      document.documentElement.classList.remove("stable-scrollbar");
    };
  }, [disable]);
}
const PageTabs = [
  { uri: "tickets", label: message("Tickets"), key: 0 },
  { uri: "users", label: message("Users"), key: 1 },
  { uri: "articles", label: message("Articles"), key: 2 }
];
function AgentSearchPage() {
  var _a;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsQuery = searchParams.get("query") || "";
  const { pathname } = useLocation();
  const tabName = pathname.split("/").pop();
  const selectedTab = ((_a = PageTabs.find((tab) => tab.uri === tabName)) == null ? void 0 : _a.key) ?? 0;
  const searchInputRef = useRef(null);
  const [searchQuery, _setSearchQuery] = useState(searchParamsQuery);
  useStableScrollbar();
  useEffect(() => {
    _setSearchQuery(searchParamsQuery);
  }, [searchParamsQuery]);
  const updateQueryParams = (value) => {
    setSearchParams((prev) => {
      prev.delete("page");
      prev.set("query", value);
      return prev;
    });
  };
  const debouncedUpdateQueryParams = useDebouncedCallback((value) => {
    updateQueryParams(value);
  }, 400);
  const setSearchQuery = (value) => {
    _setSearchQuery(value);
    debouncedUpdateQueryParams(value);
  };
  const focusSearchInput = useCallback(() => {
    var _a2;
    (_a2 = searchInputRef.current) == null ? void 0 : _a2.focus();
  }, []);
  const filters = useSearchTicketsFilters();
  const showFilters = filters && selectedTab === 0;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(AgentNavbar, { element: Navbar, onOpenSearchPage: focusSearchInput }),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto p-14 md:p-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-34 flex items-center gap-24 pt-6", children: [
        /* @__PURE__ */ jsx(
          "form",
          {
            className: "flex-auto",
            onSubmit: (e) => {
              e.preventDefault();
              updateQueryParams(searchQuery);
            },
            children: /* @__PURE__ */ jsx(
              TextField,
              {
                onBlur: () => updateQueryParams(searchQuery),
                inputRef: searchInputRef,
                value: searchQuery,
                onChange: (e) => {
                  setSearchQuery(e.target.value);
                },
                startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
                autoFocus: true
              }
            )
          }
        ),
        showFilters && /* @__PURE__ */ jsx(AddFilterButton, { className: "min-h-42 min-w-42", filters })
      ] }),
      showFilters && /* @__PURE__ */ jsx(FilterList, { filters }),
      /* @__PURE__ */ jsxs(Tabs, { selectedTab, children: [
        /* @__PURE__ */ jsx(TabList, { children: PageTabs.map((tab) => /* @__PURE__ */ jsx(
          Tab,
          {
            width: "min-w-132",
            elementType: Link,
            to: `/agent/search/${tab.uri}?query=${searchQuery}`,
            relative: "path",
            replace: true,
            children: /* @__PURE__ */ jsx(Trans, { ...tab.label })
          },
          tab.key
        )) }),
        /* @__PURE__ */ jsx("div", { className: "pt-34", children: /* @__PURE__ */ jsx(Outlet, {}) })
      ] })
    ] })
  ] });
}
function useSearchTickets() {
  const [searchParams] = useSearchParams();
  const params = {
    filters: searchParams.get("filters") ?? "",
    query: searchParams.get("query") ?? "",
    page: searchParams.get("page") ?? "1",
    perPage: searchParams.get("perPage") ?? "20"
  };
  const enabled = !!params.query || !!params.filters;
  return useQuery({
    queryKey: ["tickets", "search", params],
    queryFn: () => fetchTickets(params),
    placeholderData: enabled ? keepPreviousData : void 0,
    enabled
  });
}
function fetchTickets(params) {
  return apiClient.get("search/tickets", { params }).then((response) => response.data);
}
function SearchTableLayout({ query, children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, fetchStatus, isLoading, isPlaceholderData } = query;
  const items = (data == null ? void 0 : data.pagination.data) || [];
  const isEmpty = fetchStatus === "idle" && items.length === 0 || !isLoading && !isPlaceholderData && items.length === 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(GlobalLoadingProgress, { query }),
    children,
    isEmpty && /* @__PURE__ */ jsx(
      DataTableEmptyStateMessage,
      {
        isFiltering: !!searchParams.get("query") || !!searchParams.get("filters"),
        className: "mt-48",
        image: searchImage,
        title: /* @__PURE__ */ jsx(Trans, { message: "Enter your query or filters to start searching" }),
        filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No results match your query or filters" })
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
function SearchTicketsTable() {
  const query = useSearchTickets();
  const [selectedTickets, setSelectedTickets] = useState([]);
  return /* @__PURE__ */ jsxs(SearchTableLayout, { query, children: [
    /* @__PURE__ */ jsx(
      TicketTable,
      {
        query,
        selectedTickets,
        onSelectionChange: setSelectedTickets
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selectedTickets.length && /* @__PURE__ */ jsx(
      TicketTableActions,
      {
        ticketIds: selectedTickets,
        onActionCompleted: () => setSelectedTickets([])
      }
    ) })
  ] });
}
function useSearchUsers() {
  const [searchParams] = useSearchParams();
  const params = {
    query: searchParams.get("query") ?? "",
    page: searchParams.get("page") ?? "1",
    perPage: searchParams.get("perPage") ?? "20"
  };
  return useQuery({
    queryKey: ["users", "search", params],
    queryFn: () => fetchUsers(params),
    placeholderData: keepPreviousData,
    enabled: !!params.query
  });
}
function fetchUsers(params) {
  return apiClient.get("search/users", { params }).then((response) => response.data);
}
const columnConfig$1 = [
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
    key: "roles",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Roles" }),
    body: (user) => {
      var _a;
      return /* @__PURE__ */ jsx(ChipList, { radius: "rounded", size: "xs", children: (_a = user.roles) == null ? void 0 : _a.map((role) => /* @__PURE__ */ jsx(Chip, { selectable: true, className: "capitalize", children: /* @__PURE__ */ jsx(Trans, { message: role.name }) }, role.id)) });
    }
  },
  {
    key: "createdAt",
    allowsSorting: true,
    width: "w-96",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Created at" }),
    body: (user) => /* @__PURE__ */ jsx("time", { children: /* @__PURE__ */ jsx(FormattedDate, { date: user.created_at }) })
  }
];
function SearchUsersTable() {
  var _a;
  const navigate = useNavigate();
  const query = useSearchUsers();
  return /* @__PURE__ */ jsx(SearchTableLayout, { query, children: /* @__PURE__ */ jsx(
    Table,
    {
      headerCellHeight: "h-36",
      cellHeight: "h-64",
      columns: columnConfig$1,
      data: ((_a = query.data) == null ? void 0 : _a.pagination.data) || [],
      enableSelection: false,
      onAction: (user) => navigate(`/agent/users/${user.id}`)
    }
  ) });
}
const columnConfig = [
  {
    key: "name",
    width: "flex-3 min-w-200",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Article" }),
    body: (article) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
      /* @__PURE__ */ jsx(ArticleIcon, {}),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis", children: article.title }),
        /* @__PURE__ */ jsx(ArticlePath, { article, className: "text-xs text-muted" })
      ] })
    ] })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    width: "w-96",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    body: (user) => /* @__PURE__ */ jsx("time", { children: /* @__PURE__ */ jsx(FormattedDate, { date: user.updated_at }) })
  }
];
function SearchArticlesTable() {
  var _a;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = useSearchArticles(
    searchParams.get("query") || "",
    {
      page: searchParams.get("page") ?? "1",
      perPage: searchParams.get("perPage") ?? "20",
      paginate: "lengthAware"
    },
    { disableDebounce: true }
  );
  return /* @__PURE__ */ jsx(SearchTableLayout, { query, children: /* @__PURE__ */ jsx(
    Table,
    {
      headerCellHeight: "h-36",
      cellHeight: "h-64",
      columns: columnConfig,
      data: ((_a = query.data) == null ? void 0 : _a.pagination.data) || [],
      enableSelection: false,
      onAction: (article) => navigate(getArticleLink(article))
    }
  ) });
}
const AddNoteIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M 5 5 L 5 6 L 5 26 L 5 27 L 6 27 L 20 27 L 20.40625 27 L 20.71875 26.71875 L 26.71875 20.71875 L 27 20.40625 L 27 20 L 27 6 L 27 5 L 26 5 L 6 5 L 5 5 z M 7 7 L 25 7 L 25 19 L 20 19 L 19 19 L 19 20 L 19 25 L 7 25 L 7 7 z M 21 21 L 23.5625 21 L 21 23.5625 L 21 21 z" }),
  "",
  "0 0 32 32"
);
const BackToTicketsIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M 8.28125 5.28125 L 2.28125 11.28125 L 1.59375 12 L 2.28125 12.71875 L 8.28125 18.71875 L 9.71875 17.28125 L 5.4375 13 L 23 13 C 25.754545 13 28 15.245455 28 18 C 28 20.754545 25.754545 23 23 23 L 20 23 L 20 25 L 23 25 C 26.845455 25 30 21.845455 30 18 C 30 14.154545 26.845455 11 23 11 L 5.4375 11 L 9.71875 6.71875 L 8.28125 5.28125 z M 8 23 L 8 25 L 10 25 L 10 23 L 8 23 z M 12 23 L 12 25 L 14 25 L 14 23 L 12 23 z M 16 23 L 16 25 L 18 25 L 18 23 L 16 23 z" }),
  "",
  "0 0 32 32"
);
const AfterReplyActions = {
  stay_on_page: message("Send and stay on page"),
  next_active_ticket: message("Send and next ticket"),
  back_to_folder: message("Send and back to folder")
};
function useAfterReplyAction() {
  const { tagId } = useMailboxParams();
  const { ticketId } = useParams();
  const backToTicketTable = useNavigateToMailboxTicketTable();
  const { replies } = useSettings();
  const navigate = useNavigate();
  const defaultAction = (replies == null ? void 0 : replies.after_reply_action) || "next_active_ticket";
  const [action, setAction] = useLocalStorage(
    "after_reply_action",
    defaultAction
  );
  const perform = useCallback(async () => {
    if (action === "next_active_ticket") {
      const response = await apiClient.get(
        `tickets/${tagId}/next-active-ticket`
      );
      if (response == null ? void 0 : response.data.ticket) {
        if (ticketId === `${response.data.ticket.id}`) {
          backToTicketTable();
        } else {
          navigate(getTicketPageLink(response.data.ticket, { tagId }));
        }
      }
    } else if (action === "back_to_folder") {
      backToTicketTable();
    }
  }, [action, backToTicketTable, tagId, navigate]);
  return { action, setAction, perform };
}
function useCreateNote() {
  const { ticketId } = useParams();
  return useMutation({
    mutationFn: (payload) => createNote(ticketId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tickets", `${ticketId}`]
      });
      toast(message("Note added"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function createNote(ticketId, payload) {
  return apiClient.post(`tickets/${ticketId}/notes`, payload).then((r) => r.data);
}
function CreateNoteDialog() {
  const editorRef = useRef(null);
  const { close: close2 } = useDialogContext();
  const createNote2 = useCreateNote();
  const [attachments, setAttachments] = useState([]);
  const handleSubmit = () => {
    createNote2.mutate(
      {
        body: getReplyBody(editorRef),
        attachments: attachments.map((a) => a.id)
      },
      {
        onSuccess: () => close2()
      }
    );
  };
  return /* @__PURE__ */ jsxs(Dialog, { size: "lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Add a note" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
      ReplyEditor$1,
      {
        minHeight: "min-h-[300px]",
        isLoading: createNote2.isPending,
        editorRef,
        className: "mb-24",
        attachments,
        onAttachmentsChange: (attachments2) => setAttachments(attachments2),
        onSubmit: () => handleSubmit()
      }
    ) }) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close2(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          onClick: () => handleSubmit(),
          disabled: createNote2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Add" })
        }
      )
    ] })
  ] });
}
function TicketPageToolbar({ ticket }) {
  const backLink = useMailboxTicketTableLink();
  const { perform: afterReplyAction } = useAfterReplyAction();
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-14 border-b py-4 pl-14 pr-20", children: [
    /* @__PURE__ */ jsx(
      TicketActionButton,
      {
        startIcon: /* @__PURE__ */ jsx(BackToTicketsIcon, {}),
        isCompact: true,
        elementType: Link,
        to: backLink,
        children: /* @__PURE__ */ jsx(Trans, { message: "Back (b)" })
      }
    ),
    /* @__PURE__ */ jsx(AssignTicketsButton, { ticketIds: [ticket.id], isCompact: true }),
    /* @__PURE__ */ jsx(AddNoteButton, {}),
    /* @__PURE__ */ jsx(AddTagToTicketsButton, { ticketIds: [ticket.id], isCompact: true }),
    /* @__PURE__ */ jsx(
      ChangeTicketStatusButton,
      {
        ticketIds: [ticket.id],
        isCompact: true,
        onSuccess: () => afterReplyAction()
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "ml-auto text-2xl", children: [
      "#",
      ticket.id
    ] }),
    ticket.status && /* @__PURE__ */ jsx(
      Chip,
      {
        size: "sm",
        radius: "rounded",
        className: "font-bold capitalize",
        color: ticket.status === "open" ? "primary" : "chip",
        children: /* @__PURE__ */ jsx(Trans, { message: ticket.status })
      }
    )
  ] });
}
function AddNoteButton() {
  const [isOpen, setIsOpen] = useState(false);
  useKeybind("window", "n", () => setIsOpen(true));
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx(TicketActionButton, { startIcon: /* @__PURE__ */ jsx(AddNoteIcon, {}), isCompact: true, children: /* @__PURE__ */ jsx(Trans, { message: "Note (n)" }) }),
    /* @__PURE__ */ jsx(CreateNoteDialog, {})
  ] });
}
function useDeleteReply() {
  return useMutation({
    mutationFn: (payload) => deleteReply(payload),
    onSuccess: async (_, payload) => {
      await queryClient.invalidateQueries({
        queryKey: ["tickets", `${payload.reply.ticket_id}`]
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function deleteReply(payload) {
  return apiClient.delete(`replies/${payload.reply.id}`).then((r) => r.data);
}
function useUpdateReply() {
  return useMutation({
    mutationFn: (payload) => updateReply(payload),
    onSuccess: async (_, payload) => {
      await queryClient.invalidateQueries({
        queryKey: ["tickets", `${payload.reply.ticket_id}`, "replies"]
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function updateReply({ reply, ...payload }) {
  return apiClient.put(`replies/${reply.id}`, payload).then((r) => r.data);
}
function ReplyAttachmentList({ reply }) {
  var _a;
  if (!((_a = reply.attachments) == null ? void 0 : _a.length))
    return null;
  return /* @__PURE__ */ jsx(AttachmentListLayout, { className: "mt-30 w-max", children: reply.attachments.map((attachment, index) => /* @__PURE__ */ jsx(
    FileEntryAttachmentLayout,
    {
      attachments: reply.attachments,
      index,
      onRemove: () => {
        openDialog(DeleteAttachmentDialog, { reply, attachment });
      }
    },
    attachment.id
  )) });
}
function DeleteAttachmentDialog({
  reply,
  attachment
}) {
  const updateReply2 = useUpdateReply();
  const { close: close2 } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isDanger: true,
      title: /* @__PURE__ */ jsx(Trans, { message: "Delete attachment" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this attachment?" }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
      onConfirm: () => {
        updateReply2.mutate(
          {
            reply,
            attachments: reply.attachments.filter((u) => u.id !== attachment.id).map((u) => u.id)
          },
          { onSuccess: close2 }
        );
      },
      isLoading: updateReply2.isPending
    }
  );
}
function UpdateReplyDialog({ reply }) {
  const editorRef = useRef(null);
  const { close: close2 } = useDialogContext();
  const updateReply2 = useUpdateReply();
  const [attachments, setAttachments] = useState(
    reply.attachments || []
  );
  const title = reply.type === "notes" ? /* @__PURE__ */ jsx(Trans, { message: "Edit note" }) : /* @__PURE__ */ jsx(Trans, { message: "Edit reply" });
  const handleSubmit = () => {
    updateReply2.mutate(
      {
        reply,
        body: getReplyBody(editorRef),
        attachments: attachments.map((a) => a.id)
      },
      {
        onSuccess: () => {
          close2();
          toast(
            reply.type === "notes" ? message("Updated note") : message("Updated reply")
          );
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(Dialog, { size: "lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: title }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
      ReplyEditor$1,
      {
        minHeight: "min-h-[300px]",
        isLoading: updateReply2.isPending,
        initialContent: reply.body,
        editorRef,
        attachments,
        onAttachmentsChange: (attachments2) => setAttachments(attachments2),
        onSubmit: () => handleSubmit()
      }
    ) }) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close2(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          onClick: () => handleSubmit(),
          disabled: updateReply2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
        }
      )
    ] })
  ] });
}
function useOriginalReplyEmail(replyId) {
  return useQuery({
    queryKey: ["original-email", `${replyId}`],
    queryFn: () => fetchEmail(replyId),
    staleTime: Infinity
  });
}
function fetchEmail(replyId) {
  return apiClient.get(`replies/${replyId}/original`).then((response) => response.data);
}
function OriginalEmailPreviewDialog({ replyId }) {
  var _a;
  const { base_url } = useSettings();
  const query = useOriginalReplyEmail(replyId);
  const [activeTab, setActiveTab] = useState("html");
  return /* @__PURE__ */ jsxs(Dialog, { size: "fullscreen", className: "h-dialog", children: [
    /* @__PURE__ */ jsx(
      DialogHeader,
      {
        showDivider: true,
        padding: "px-24 py-12",
        titleFontWeight: "font-normal",
        titleTextSize: "text-base",
        justify: "justify-start",
        actions: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(
            ButtonGroup,
            {
              variant: "outline",
              radius: "rounded-md",
              size: "xs",
              value: activeTab,
              onChange: setActiveTab,
              children: [
                /* @__PURE__ */ jsx(Button, { value: "html", children: /* @__PURE__ */ jsx(Trans, { message: "HTML" }) }),
                /* @__PURE__ */ jsx(Button, { value: "plain", children: /* @__PURE__ */ jsx(Trans, { message: "Plain" }) }),
                /* @__PURE__ */ jsx(Button, { value: "headers", children: /* @__PURE__ */ jsx(Trans, { message: "Headers" }) })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "ml-34",
              variant: "outline",
              size: "xs",
              elementType: "a",
              download: true,
              href: `${base_url}/api/v1/replies/${replyId}/original/download`,
              children: /* @__PURE__ */ jsx(Trans, { message: "Download" })
            }
          )
        ] }),
        children: /* @__PURE__ */ jsx(Trans, { message: "Original email" })
      }
    ),
    /* @__PURE__ */ jsx(DialogBody, { children: ((_a = query.data) == null ? void 0 : _a.email) ? /* @__PURE__ */ jsx(Content$1, { data: query.data, activeTab }) : /* @__PURE__ */ jsx(Status, { query }) })
  ] });
}
function Content$1({ data, activeTab }) {
  if (activeTab === "html") {
    return /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: data.email.body.html } });
  } else if (activeTab === "plain") {
    return /* @__PURE__ */ jsx("pre", { className: "whitespace-pre-wrap break-words", children: data.email.body.plain });
  } else {
    return /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: Object.entries(data.email.headers).map(([key, value]) => /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "whitespace-nowrap border px-20 py-10 text-left", children: key }),
      /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap border px-20 py-10 text-left", children: value })
    ] }, key)) }) });
  }
}
function Status({ query }) {
  if (query.isLoading) {
    return /* @__PURE__ */ jsx(FullPageLoader, { className: "absolute inset-0 m-auto" });
  }
  return /* @__PURE__ */ jsx(
    IllustratedMessage,
    {
      className: "mt-40",
      image: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ErrorIcon, { size: "xl" }) }),
      imageHeight: "h-auto",
      title: /* @__PURE__ */ jsx(Trans, { message: "Original email for this reply does not exist" })
    }
  );
}
function AgentTicketPageReplyList({
  data: { ticket, replies, draft }
}) {
  const editorIsOpen = useTicketPageStore((s) => s.editorIsOpen);
  const showDraft = draft && !editorIsOpen;
  const query = useTicketReplies(ticket.id, replies);
  return /* @__PURE__ */ jsxs("div", { children: [
    showDraft && /* @__PURE__ */ jsx(
      TicketReplyLayout,
      {
        reply: draft,
        className: "pl-20 pr-8",
        actions: /* @__PURE__ */ jsx(ReplyActionsButton, { reply: draft })
      }
    ),
    query.items.map((reply) => {
      var _a;
      const isInitial = !query.hasNextPage && reply.id === ((_a = query.items.at(-1)) == null ? void 0 : _a.id);
      return /* @__PURE__ */ jsx(
        TicketReplyLayout,
        {
          className: "pl-20 pr-8",
          reply,
          isInitial,
          actions: /* @__PURE__ */ jsx(ReplyActionsButton, { reply }),
          attachments: /* @__PURE__ */ jsx(ReplyAttachmentList, { reply })
        },
        reply.id
      );
    }),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function ReplyActionsButton({ reply }) {
  return /* @__PURE__ */ jsxs(MenuTrigger, { children: [
    /* @__PURE__ */ jsx(IconButton, { className: "text-muted", size: "sm", children: /* @__PURE__ */ jsx(MoreVertIcon, {}) }),
    /* @__PURE__ */ jsxs(Menu, { children: [
      /* @__PURE__ */ jsx(
        Item,
        {
          value: "edit",
          onClick: () => openDialog(UpdateReplyDialog, { reply }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Edit" })
        }
      ),
      reply.type === "replies" && /* @__PURE__ */ jsx(
        Item,
        {
          value: "showOriginal",
          onClick: () => openDialog(OriginalEmailPreviewDialog, { replyId: reply.id }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Show original" })
        }
      ),
      /* @__PURE__ */ jsx(
        Item,
        {
          value: "delete",
          onClick: () => openDialog(ConfirmDeleteReplyDialog, { reply }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
        }
      )
    ] })
  ] });
}
function ConfirmDeleteReplyDialog({ reply }) {
  const deleteReply2 = useDeleteReply();
  let title = /* @__PURE__ */ jsx(Trans, { message: "Delete reply" });
  let body = /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this reply?" });
  if (reply.type === "notes") {
    title = /* @__PURE__ */ jsx(Trans, { message: "Delete note" });
    body = /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this note?" });
  }
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isDanger: true,
      title,
      body,
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" }),
      onConfirm: () => deleteReply2.mutate(
        { reply },
        {
          onSuccess: () => closeDialog()
        }
      ),
      isLoading: deleteReply2.isPending
    }
  );
}
function useRemoveTagFromTickets() {
  return useMutation({
    mutationFn: (payload) => removeTag(payload),
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: ["mailbox", "sidenav-tags"] });
      payload.ticketIds.forEach((ticketId) => {
        updateTicketQuery(ticketId, (old) => {
          var _a;
          old.ticket.tags = (_a = old.ticket.tags) == null ? void 0 : _a.filter(
            (tag) => tag.id !== payload.tagId
          );
        });
      });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function removeTag(payload) {
  return apiClient.post(`tickets/tags/remove`, payload).then((r) => r.data);
}
function TicketPageHeader({ data: { ticket } }) {
  const removeTags = useRemoveTagFromTickets();
  const editorIsOpen = useTicketPageStore((s) => s.editorIsOpen);
  const openEditor = useOpenReplyEditor();
  const handleRemoveTag = (tag) => {
    removeTags.mutate({
      ticketIds: [ticket.id],
      tagId: tag.id
    });
  };
  useKeybind("window", "r", () => {
    if (!editorIsOpen) {
      openEditor();
    }
  });
  return /* @__PURE__ */ jsx(
    TicketHeaderLayout,
    {
      ticket,
      actions: ticket.status !== "locked" && /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "xs",
          onClick: () => openEditor(),
          startIcon: /* @__PURE__ */ jsx(ReplyIcon, {}),
          disabled: editorIsOpen,
          children: /* @__PURE__ */ jsx(Trans, { message: "Reply" })
        }
      ),
      children: /* @__PURE__ */ jsx(TicketTagList, { ticket, onRemoveTag: handleRemoveTag })
    }
  );
}
function UserDetailsSection({ label, children, name, className }) {
  const [isVisible, setIsVisible] = useLocalStorage(name, true);
  return /* @__PURE__ */ jsxs("section", { className: clsx("border-b pb-14 text-sm", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-14 px-14", children: [
      /* @__PURE__ */ jsx("div", { className: "font-semibold", children: label }),
      /* @__PURE__ */ jsx(
        IconButton,
        {
          onClick: () => setIsVisible(!isVisible),
          className: clsx("transition-transform", isVisible && "rotate-180"),
          children: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {})
        }
      )
    ] }),
    isVisible && /* @__PURE__ */ jsx("div", { className: "pt-8", children })
  ] });
}
function PurchaseCodeDetailsDialog({ purchaseCode }) {
  const { close: close2 } = useDialogContext();
  const syncPurchases = useSyncEnvatoPurchases();
  return /* @__PURE__ */ jsxs(Dialog, { size: "md", children: [
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-14 text-sm", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: purchaseCode.image,
          alt: "",
          className: "h-80 w-80 flex-shrink-0 rounded"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: purchaseCode.url,
            target: "_blank",
            rel: "noreferrer",
            className: LinkStyle,
            children: purchaseCode.item_name
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm text-muted", children: purchaseCode.code }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
          /* @__PURE__ */ jsx(
            Detail$1,
            {
              label: /* @__PURE__ */ jsx(Trans, { message: "Customer" }),
              value: purchaseCode.envato_username
            }
          ),
          /* @__PURE__ */ jsx(
            Detail$1,
            {
              label: /* @__PURE__ */ jsx(Trans, { message: "Purchased" }),
              value: /* @__PURE__ */ jsx(FormattedDate, { date: purchaseCode.purchased_at })
            }
          ),
          /* @__PURE__ */ jsx(
            Detail$1,
            {
              label: /* @__PURE__ */ jsx(Trans, { message: "Supported until" }),
              value: /* @__PURE__ */ jsx(FormattedDate, { date: purchaseCode.supported_until })
            }
          ),
          /* @__PURE__ */ jsx(
            Detail$1,
            {
              label: /* @__PURE__ */ jsx(Trans, { message: "Last synced" }),
              value: /* @__PURE__ */ jsx(FormattedDate, { date: purchaseCode.updated_at })
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close2(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "flat",
          color: "primary",
          disabled: syncPurchases.isPending,
          onClick: () => syncPurchases.mutate({ userId: purchaseCode.user_id }),
          children: /* @__PURE__ */ jsx(Trans, { message: "Sync purchases" })
        }
      )
    ] })
  ] });
}
function Detail$1({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-14", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      label,
      ":"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-muted", children: value })
  ] });
}
function EnvatoPurchaseList({
  purchases,
  itemClassName,
  activePurchase
}) {
  return /* @__PURE__ */ jsx("div", { children: purchases.map((purchase) => /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          "flex cursor-pointer items-center gap-8 rounded py-8 hover:bg-hover",
          itemClassName,
          (activePurchase == null ? void 0 : activePurchase.code) === purchase.code && "bg-primary-light/30"
        ),
        children: [
          /* @__PURE__ */ jsx("img", { src: purchase.image, alt: "", className: "h-30 w-30 rounded" }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 text-xs", children: [
            /* @__PURE__ */ jsx("div", { className: "overflow-hidden overflow-ellipsis whitespace-nowrap", children: purchase.item_name }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: clsx(
                  "text-muted",
                  purchase.support_expired && "line-through"
                ),
                children: purchase.supported_until ? /* @__PURE__ */ jsx(FormattedDate, { date: purchase.supported_until }) : purchase.support_expired ? /* @__PURE__ */ jsx(Trans, { message: "Support expired" }) : "-"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(PurchaseCodeDetailsDialog, { purchaseCode: purchase })
  ] }, purchase.id)) });
}
function TicketPagePurchaseList({ user, ticket }) {
  const currentPurchase = useMemo(() => {
    var _a, _b, _c, _d;
    const category = (_b = (_a = ticket.tags) == null ? void 0 : _a.find((tag) => tag.type !== "status")) == null ? void 0 : _b.categories[0];
    let bestMatch;
    if (category) {
      const categoryName = category.name.toLowerCase();
      bestMatch = (_c = user.purchase_codes) == null ? void 0 : _c.find((code) => {
        return code.item_name.toLowerCase().indexOf(categoryName) > -1;
      });
    }
    return bestMatch || ((_d = user.purchase_codes) == null ? void 0 : _d[0]);
  }, [user, ticket]);
  return /* @__PURE__ */ jsx(
    UserDetailsSection,
    {
      label: /* @__PURE__ */ jsx(Trans, { message: "Envato" }),
      name: "purchase-list-visible",
      children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden", children: [
        currentPurchase && /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center gap-4 px-14 text-sm", children: [
          /* @__PURE__ */ jsx(PersonIcon, { size: "sm" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `https://codecanyon.net/user/${currentPurchase.envato_username}`,
              target: "_blank",
              rel: "noreferrer",
              children: currentPurchase.envato_username
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          EnvatoPurchaseList,
          {
            purchases: user.purchase_codes || [],
            itemClassName: "px-14",
            activePurchase: currentPurchase
          }
        )
      ] })
    }
  );
}
function useActivityLog(params) {
  return useInfiniteData({
    queryKey: ["activity-log"],
    endpoint: "activity-log",
    paginate: "simple",
    queryParams: params
  });
}
const ARTICLE_MODEL = "article";
const SEARCH_TERM_MODEL = "search_term";
function Timeline({ children, className }) {
  const items = Children.toArray(children);
  return /* @__PURE__ */ jsx("div", { className, children: items.map(
    (item, index) => cloneElement(item, {
      isLast: index === items.length - 1
    })
  ) });
}
function TimelineItem({ children, className, isLast }) {
  return /* @__PURE__ */ jsxs("div", { className: clsx("flex gap-12", className), children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "mt-4 h-12 w-12 flex-shrink-0 rounded-full border-[3px]" }),
      !isLast && /* @__PURE__ */ jsx("div", { className: "mx-auto mt-4 h-[calc(100%-12px)] w-1 bg-chip" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-auto", children })
  ] });
}
const timePreset = {
  hour: "numeric",
  minute: "numeric"
};
function ActivityList({ ticket }) {
  const userId = ticket.user.id;
  const query = useActivityLog({ userId });
  const skeletons = /* @__PURE__ */ jsx(m.div, { className: "px-14 py-6", ...opacityAnimation, children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsx(Skeleton, { className: "min-h-48" }, index)) }, "skeletons");
  const timeline = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: /* @__PURE__ */ jsx(Timeline, { children: query.items.map((activity) => {
      var _a;
      return /* @__PURE__ */ jsxs(
        TimelineItem,
        {
          className: clsx(
            "px-14 py-6",
            activity.event === "created" && ((_a = activity.subject) == null ? void 0 : _a.id) === ticket.id && "bg-primary/8"
          ),
          children: [
            /* @__PURE__ */ jsx(ListItem, { activity }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs text-muted", children: [
              /* @__PURE__ */ jsx(FormattedRelativeTime, { date: activity.created_at }),
              /* @__PURE__ */ jsx("div", { children: "•" }),
              /* @__PURE__ */ jsx(
                FormattedDate,
                {
                  date: activity.created_at,
                  options: timePreset
                }
              )
            ] })
          ]
        },
        activity.id
      );
    }) }) }, "timeline"),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query, size: "sm" })
  ] });
  return /* @__PURE__ */ jsx(
    UserDetailsSection,
    {
      label: /* @__PURE__ */ jsx(Trans, { message: "Activity" }),
      name: "activity-visible",
      className: "mt-10",
      children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: query.isLoading ? skeletons : timeline })
    }
  );
}
function ListItem({ activity }) {
  var _a;
  switch ((_a = activity.subject) == null ? void 0 : _a.model_type) {
    case ARTICLE_MODEL:
      return /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Viewd article: :link",
          values: {
            link: /* @__PURE__ */ jsx(
              ArticleLink,
              {
                target: "_blank",
                className: "font-semibold",
                article: activity.subject
              }
            )
          }
        }
      );
    case TICKET_MODEL_TYPE:
      return /* @__PURE__ */ jsx(TicketListItem, { activity });
    case SEARCH_TERM_MODEL:
      const term = activity.subject.term;
      return /* @__PURE__ */ jsx(
        Trans,
        {
          message: "Search for: :link",
          values: {
            link: /* @__PURE__ */ jsx(
              Link,
              {
                target: "_blank",
                className: "font-semibold",
                to: `/hc/search?query=${term}`,
                children: term
              }
            )
          }
        }
      );
    default:
      return null;
  }
}
function TicketListItem({ activity }) {
  var _a, _b, _c, _d;
  const link = /* @__PURE__ */ jsx(
    TicketPageLink,
    {
      target: "_blank",
      className: "font-semibold",
      ticket: activity.subject
    }
  );
  if (activity.event === "replied") {
    if (((_a = activity.properties) == null ? void 0 : _a.source) === "email") {
      return /* @__PURE__ */ jsx(Trans, { message: "Replied via email: :link", values: { link } });
    } else {
      return /* @__PURE__ */ jsx(Trans, { message: "Replied via website: :link", values: { link } });
    }
  } else if (activity.event === "created") {
    return /* @__PURE__ */ jsx(Trans, { message: "Created ticket: :link", values: { link } });
  } else if (activity.event === "articlesSuggested") {
    return /* @__PURE__ */ jsx(
      Trans,
      {
        message: `Suggested :count articles for ":query"`,
        values: {
          count: ((_c = (_b = activity.properties) == null ? void 0 : _b.articleIds) == null ? void 0 : _c.length) || 1,
          query: (_d = activity.properties) == null ? void 0 : _d.query
        }
      }
    );
  }
  return null;
}
function useMergeTickets() {
  const { ticketId } = useParams();
  return useMutation({
    mutationFn: (payload) => mergeTickets({
      ...payload,
      ticketId
    }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast(message("Merged tickets"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function mergeTickets(payload) {
  return apiClient.post(`tickets/merge`, payload).then((r) => r.data);
}
function TicketPreviewDialog({ ticketId }) {
  var _a, _b;
  const query = useTicket(ticketId);
  return /* @__PURE__ */ jsxs(Dialog, { size: "fullscreen", className: "h-dialog", children: [
    /* @__PURE__ */ jsx(
      DialogHeader,
      {
        showDivider: true,
        padding: "px-24 py-12",
        titleFontWeight: "font-normal",
        titleTextSize: "text-base",
        justify: "justify-start",
        actions: ((_a = query.data) == null ? void 0 : _a.ticket) ? /* @__PURE__ */ jsx(Actions, { ticket: (_b = query.data) == null ? void 0 : _b.ticket }) : null,
        children: /* @__PURE__ */ jsx(Trans, { message: "Ticket preview" })
      }
    ),
    /* @__PURE__ */ jsx(DialogBody, { className: "bg", padding: "p-0", children: query.data ? /* @__PURE__ */ jsx(Content, { data: query.data }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" }) })
  ] });
}
function Actions({ ticket }) {
  const { close: close2 } = useDialogContext();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        elementType: Link,
        to: getTicketPageLink(ticket),
        variant: "outline",
        size: "xs",
        children: /* @__PURE__ */ jsx(Trans, { message: "Open ticket" })
      }
    ),
    /* @__PURE__ */ jsxs(
      DialogTrigger,
      {
        type: "modal",
        onClose: (newTicket) => {
          if (newTicket) {
            close2();
          }
        },
        children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "xs", className: "mr-48", children: /* @__PURE__ */ jsx(Trans, { message: "Merge" }) }),
          /* @__PURE__ */ jsx(ConfirmMergeDialog, { ticket })
        ]
      }
    )
  ] });
}
function ConfirmMergeDialog({ ticket }) {
  const mergeTickets2 = useMergeTickets();
  const { close: close2 } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      title: /* @__PURE__ */ jsx(Trans, { message: "Merge tickets" }),
      isLoading: mergeTickets2.isPending,
      onConfirm: () => {
        mergeTickets2.mutate(
          { mergeeId: ticket.id },
          { onSuccess: (response) => close2(response.ticket) }
        );
      },
      body: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Trans, { message: "Please confirm you'd like to merge this ticket with the original one behind the popup." }),
        /* @__PURE__ */ jsx("p", { className: "mt-12 font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Merged tickets cannot be unmerged." }) })
      ] }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Merge" })
    }
  );
}
function Content({ data }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(TicketHeaderLayout, { ticket: data.ticket, children: /* @__PURE__ */ jsx(TicketTagList, { ticket: data.ticket }) }),
    /* @__PURE__ */ jsx(ReplyList, { data })
  ] });
}
function ReplyList({ data: { ticket, replies } }) {
  const query = useTicketReplies(ticket.id, replies);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    query.items.map((reply) => {
      var _a, _b;
      const isInitial = !query.hasNextPage && reply.id === ((_a = query.items.at(-1)) == null ? void 0 : _a.id);
      return /* @__PURE__ */ jsx(
        TicketReplyLayout,
        {
          reply,
          isInitial,
          className: "px-20",
          attachments: ((_b = reply.attachments) == null ? void 0 : _b.length) ? /* @__PURE__ */ jsx(AttachmentList, { attachments: reply.attachments }) : null
        },
        reply.id
      );
    }),
    /* @__PURE__ */ jsx(InfiniteScrollSentinel, { query })
  ] });
}
function AttachmentList({ attachments }) {
  return /* @__PURE__ */ jsx(AttachmentListLayout, { className: "mt-30 w-max", children: attachments.map((attachment, index) => /* @__PURE__ */ jsx(
    FileEntryAttachmentLayout,
    {
      attachments,
      index
    },
    attachment.id
  )) });
}
function ChangeCustomerDialog({ ticketId }) {
  const { close: close2, formId } = useDialogContext();
  const form = useForm();
  const updateTicket = useUpdateTicket(ticketId, form);
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(Trans, { message: "Change customer" }) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        id: formId,
        form,
        onSubmit: (values) => {
          updateTicket.mutate(values, { onSuccess: () => close2() });
        },
        children: /* @__PURE__ */ jsx(
          FormNormalizedModelField,
          {
            required: true,
            name: "user_id",
            endpoint: "normalized-models/user",
            label: /* @__PURE__ */ jsx(Trans, { message: "New customer" })
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close2(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          form: formId,
          variant: "flat",
          color: "primary",
          disabled: updateTicket.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Change" })
        }
      )
    ] })
  ] });
}
function UserDetailsSidebar({ className }) {
  const { tickets } = useSettings();
  const { data } = useTicket();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx(
        className,
        "compact-scrollbar stable-scrollbar overflow-y-auto border-l"
      ),
      children: (data == null ? void 0 : data.ticket.user) && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(CustomerDetails, { ticket: data.ticket }),
        /* @__PURE__ */ jsx(OtherTickets, { ticket: data.ticket }),
        (tickets == null ? void 0 : tickets.log_activity) && /* @__PURE__ */ jsx(ActivityList, { ticket: data.ticket })
      ] })
    }
  );
}
function CustomerDetails({ ticket }) {
  var _a, _b;
  const user = ticket.user;
  const { envato } = useSettings();
  const editLink = getCustomerLink(user.id);
  return /* @__PURE__ */ jsxs("div", { className: "py-14", children: [
    /* @__PURE__ */ jsx(Link, { to: editLink, target: "_blank", children: /* @__PURE__ */ jsx(UserAvatar, { user, size: "xl", circle: true, className: "mx-auto" }) }),
    /* @__PURE__ */ jsxs("section", { className: "mb-14 border-b px-14 pb-14 text-muted", children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex items-center justify-between gap-14 text-muted", children: [
        /* @__PURE__ */ jsx("div", { children: user.display_name }),
        /* @__PURE__ */ jsxs(MenuTrigger, { children: [
          /* @__PURE__ */ jsx(IconButton, { size: "sm", children: /* @__PURE__ */ jsx(SettingsIcon, {}) }),
          /* @__PURE__ */ jsxs(Menu, { children: [
            /* @__PURE__ */ jsx(
              Item,
              {
                value: "edit",
                elementType: Link,
                to: editLink,
                target: "_blank",
                children: /* @__PURE__ */ jsx(Trans, { message: "Edit" })
              }
            ),
            /* @__PURE__ */ jsx(
              Item,
              {
                value: "changeCustomer",
                onSelected: () => openDialog(ChangeCustomerDialog, { ticketId: ticket.id }),
                children: /* @__PURE__ */ jsx(Trans, { message: "Change customer" })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(EmailIcon, { size: "xs" }),
        /* @__PURE__ */ jsx("div", { className: "text-sm", children: user.email })
      ] }),
      !!((_a = user.tags) == null ? void 0 : _a.length) && /* @__PURE__ */ jsx(ChipList, { size: "xs", className: "mt-14", children: (_b = user.tags) == null ? void 0 : _b.map((tag) => /* @__PURE__ */ jsx(Chip, { children: tag.display_name }, tag.id)) })
    ] }),
    (envato == null ? void 0 : envato.enable) && /* @__PURE__ */ jsx(TicketPagePurchaseList, { user, ticket })
  ] });
}
function OtherTickets({ ticket }) {
  const user = ticket.user;
  const { data, isLoading } = useTickets({
    userId: user.id,
    perPage: 6,
    paginate: "simple"
  });
  const skeletons = /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsx(Skeleton, { className: "min-h-24" }, index)) }, "skeletons");
  const tickets = /* @__PURE__ */ jsx(m.div, { ...opacityAnimation, children: data == null ? void 0 : data.pagination.data.filter((t) => t.id !== ticket.id).map((ticket2) => /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(
      ButtonBase,
      {
        display: "block",
        className: clsx(
          "block min-w-0 max-w-full overflow-hidden text-ellipsis pb-4 text-sm hover:underline",
          ticket2.closed_at && "text-muted"
        ),
        children: ticket2.subject
      }
    ),
    /* @__PURE__ */ jsx(TicketPreviewDialog, { ticketId: ticket2.id })
  ] }, ticket2.id)) }, "tickets");
  return /* @__PURE__ */ jsx(
    UserDetailsSection,
    {
      label: /* @__PURE__ */ jsx(Trans, { message: "Other tickets" }),
      name: "other-tickets",
      children: /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: /* @__PURE__ */ jsx("div", { className: "space-y-10 px-14", children: isLoading ? skeletons : tickets }) })
    }
  );
}
function useSaveDraft() {
  const urlParams = useParams();
  const { updateActiveDraft, setEditorIsOpen } = useTicketPageStore();
  return useMutation({
    mutationFn: (params) => {
      updateActiveDraft({ isSaving: true });
      const ticketId = params.ticketId || urlParams.ticketId;
      return saveDraft(params.draft, ticketId);
    },
    onSuccess: async (response, params) => {
      if (params.type !== "background") {
        const ticketId = params.ticketId || urlParams.ticketId;
        await queryClient.invalidateQueries({
          queryKey: ["tickets", `${ticketId}`]
        });
        setEditorIsOpen(false);
      }
      updateActiveDraft({
        isDirty: false,
        id: response.reply.id
      });
    },
    onError: (err) => showHttpErrorToast(err),
    onSettled: () => {
      updateActiveDraft({ isSaving: false });
    }
  });
}
function saveDraft(activeDraft, ticketId) {
  const payload = {
    body: activeDraft.body,
    attachments: activeDraft.attachments.map((u) => u.id)
  };
  const request = activeDraft.id ? apiClient.put(`replies/${activeDraft.id}`, payload) : apiClient.post(`tickets/${ticketId}/drafts`, payload);
  return request.then((r) => r.data);
}
function useBackgroundDraftSave() {
  const saveDraft2 = useSaveDraft();
  return useCallback(
    (type = "background", ticketId) => {
      if (ticketPageStore().activeDraft.isDirty && !ticketPageStore().activeDraft.isSaving && !ticketPageStore().ticketIsSaving) {
        saveDraft2.mutate({
          ticketId,
          draft: ticketPageStore().activeDraft,
          type
        });
      }
    },
    [saveDraft2]
  );
}
function useSubmitAgentReply() {
  const { ticketId } = useParams();
  const { perform, action } = useAfterReplyAction();
  const deleteDraft = useDeleteDraft({ clearTicketCache: false });
  const { setTicketIsSaving } = useTicketPageStore();
  return useMutation({
    mutationFn: (payload) => {
      setTicketIsSaving(true);
      return submitReply({
        ticketId,
        ...payload
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["mailbox", "sidenav-tags"] });
      if (ticketPageStore().activeDraft.id) {
        deleteDraft.mutate({ id: ticketPageStore().activeDraft.id });
      }
      ticketPageStore().discardActiveDraft();
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: ["tickets"],
          predicate: (q) => {
            return action === "stay_on_page" || !shouldIgnoreQuery(q, ticketId);
          }
        }),
        perform()
      ]);
      toast(message("Reply submitted"));
    },
    onError: (err) => showHttpErrorToast(err),
    onSettled: () => setTicketIsSaving(false)
  });
}
function submitReply(payload) {
  return apiClient.post(
    `tickets/${payload.ticketId}/${payload.type}`,
    payload
  ).then((r) => r.data);
}
function shouldIgnoreQuery(q, ticketId) {
  const isActiveTicket = q.queryKey[0] === "tickets" && q.queryKey[1] === `${ticketId}`;
  const isOtherUserTickets = q.queryKey[0] === "tickets" && typeof q.queryKey[1] === "object" && q.queryKey[1] && "userId" in q.queryKey[1];
  return isActiveTicket || isOtherUserTickets;
}
function AgentReplyEditorDraftButtons({ size = "sm" }) {
  const isDirty = useTicketPageStore((s) => s.activeDraft.isDirty);
  const isSaving = useTicketPageStore((s) => s.activeDraft.isSaving);
  const isEmpty = useTicketPageStore(
    (s) => {
      var _a;
      return !s.activeDraft.body && !((_a = s.activeDraft.attachments) == null ? void 0 : _a.length);
    }
  );
  const saveDraft2 = useSaveDraft();
  const deleteDraft = useDeleteDraft();
  const handleDraftSave = () => {
    saveDraft2.mutate({
      draft: ticketPageStore().activeDraft,
      type: "manual"
    });
  };
  const handleDraftDelete = useCallback(() => {
    if (ticketPageStore().activeDraft.id) {
      deleteDraft.mutate(
        { id: ticketPageStore().activeDraft.id },
        { onSuccess: () => ticketPageStore().setEditorIsOpen(false) }
      );
    } else {
      ticketPageStore().setEditorIsOpen(false);
    }
  }, [deleteDraft]);
  useKeybind("window", "Escape", () => {
    if (ticketPageStore().editorIsOpen) {
      handleDraftDelete();
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Save draft" }), children: /* @__PURE__ */ jsx(
      IconButton,
      {
        className: "ml-auto",
        size,
        color: !isDirty ? "positive" : null,
        onClick: handleDraftSave,
        disabled: isSaving || isEmpty,
        children: /* @__PURE__ */ jsx(CheckCircleIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Discard (Esc)" }), children: /* @__PURE__ */ jsx(IconButton, { size, disabled: isSaving, onClick: handleDraftDelete, children: /* @__PURE__ */ jsx(DeleteIcon, {}) }) })
  ] });
}
function useCannedReplies(query = "") {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["canned-replies", `${user == null ? void 0 : user.id}`, query],
    queryFn: ({ signal }) => fetchCannedReplies(user.id, query, signal),
    placeholderData: keepPreviousData
  });
}
async function fetchCannedReplies(userId, query, signal) {
  if (query) {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return apiClient.get("canned-replies", {
    params: { userId, shared: true, perPage: 15, query },
    signal
  }).then((response) => response.data);
}
function CannedReplySelector({ onSelected, size }) {
  const { trans } = useTrans();
  const [query, setQuery] = useState("");
  const { data, isFetching } = useCannedReplies(query);
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      isAsync: true,
      searchPlaceholder: trans(message("Search...")),
      isLoading: isFetching,
      inputValue: query,
      onInputValueChange: setQuery,
      clearInputOnItemSelection: true,
      blurReferenceOnItemSelection: true,
      selectionMode: "none",
      showSearchField: true,
      floatingMaxHeight: 440,
      floatingMinWidth: "min-w-288",
      showEmptyMessage: true,
      children: [
        /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Saved replies" }), children: /* @__PURE__ */ jsx(IconButton, { size, children: /* @__PURE__ */ jsx(CommentIcon, {}) }) }),
        /* @__PURE__ */ jsxs(Menu, { children: [
          /* @__PURE__ */ jsx(
            Item,
            {
              value: "saveThisReply",
              className: "font-semibold",
              onSelected: () => openDialog(CreateCannedReplyDialog),
              children: /* @__PURE__ */ jsx(Trans, { message: "Save this reply..." })
            }
          ),
          data == null ? void 0 : data.pagination.data.map((reply) => /* @__PURE__ */ jsx(
            Item,
            {
              value: reply.id,
              onSelected: () => onSelected(reply),
              children: reply.name
            },
            reply.id
          ))
        ] })
      ]
    }
  );
}
function TicketPageDocsSearchInput({ onSelected }) {
  const hcCategories = useTicketHcCategories();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const { data, isFetching } = useSearchArticles(query, {
    categoryIds: hcCategories
  });
  const { trans } = useTrans();
  useKeybind(
    "window",
    "ctrl+/",
    () => {
      var _a;
      (_a = inputRef.current) == null ? void 0 : _a.focus();
    },
    { allowedInputSelector: ".ProseMirror" }
  );
  return /* @__PURE__ */ jsx(
    ComboBoxForwardRef,
    {
      inputValue: query,
      onInputValueChange: setQuery,
      isAsync: true,
      isLoading: isFetching,
      items: data == null ? void 0 : data.pagination.data,
      clearInputOnItemSelection: true,
      hideEndAdornment: true,
      placeholder: trans(message("Search documentation... (ctrl+/)")),
      startAdornment: /* @__PURE__ */ jsx(SearchIcon, {}),
      className: "mb-10",
      selectionMode: "none",
      showEmptyMessage: true,
      ref: inputRef,
      children: (result) => /* @__PURE__ */ jsx(
        Item,
        {
          value: result.id,
          onSelected: () => {
            close();
            onSelected(result);
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
function AgentReplyEditor() {
  var _a;
  const { addGlobalListener } = useGlobalListeners();
  const submitReply2 = useSubmitAgentReply();
  const attachments = useTicketPageStore((s) => s.activeDraft.attachments);
  const editorRef = useRef(null);
  const handleSubmit = useCallback(() => {
    if (!editorRef.current)
      return;
    submitReply2.mutate(
      {
        type: "replies",
        status: getFromLocalStorage("ticket-page-status", "pending"),
        attachments: ticketPageStore().activeDraft.attachments.map((u) => u.id),
        body: getReplyBody(editorRef)
      },
      {
        onSuccess: () => {
          ticketPageStore().setEditorIsOpen(false);
        }
      }
    );
  }, [submitReply2]);
  const handleBackgroundSave = useBackgroundDraftSave();
  useEffect(() => {
    addGlobalListener(document, "visibilitychange", () => {
      if (document.hidden) {
        handleBackgroundSave();
      }
    });
  }, [addGlobalListener, handleBackgroundSave]);
  return /* @__PURE__ */ jsxs("div", { className: "mb-24 px-20", children: [
    /* @__PURE__ */ jsx(
      TicketPageDocsSearchInput,
      {
        onSelected: (article) => {
          if (editorRef.current) {
            insertLinkIntoTextEditor(editorRef.current, {
              href: getArticleLink(article),
              target: "_blank",
              text: article.title
            });
          }
        }
      }
    ),
    /* @__PURE__ */ jsx(
      ReplyEditor$1,
      {
        menubarButtons: /* @__PURE__ */ jsx(MenubarButtons, { editorRef }),
        footerButtons: /* @__PURE__ */ jsx(FooterButtons, {}),
        attachments,
        onAttachmentsChange: (attachments2) => {
          ticketPageStore().updateActiveDraft({ attachments: attachments2 });
        },
        editorRef,
        onSubmit: handleSubmit,
        isLoading: submitReply2.isPending,
        initialContent: (_a = ticketPageStore().activeDraft) == null ? void 0 : _a.body,
        onChange: () => {
          if (editorRef.current) {
            ticketPageStore().updateActiveDraft({
              body: editorRef.current.getHTML()
            });
          }
        }
      }
    )
  ] });
}
function MenubarButtons({ size, editorRef }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      CannedReplySelector,
      {
        size,
        onSelected: (reply) => {
          var _a;
          ticketPageStore().updateActiveDraft({
            body: reply.body,
            attachments: reply.attachments
          });
          (_a = editorRef.current) == null ? void 0 : _a.commands.insertContent(reply.body);
        }
      }
    ),
    /* @__PURE__ */ jsx(AgentReplyEditorDraftButtons, { size })
  ] });
}
function FooterButtons({ isLoading, onSubmit }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(StatusSelector, {}),
    /* @__PURE__ */ jsx(SendReplyButton, { isLoading, onSubmit }),
    /* @__PURE__ */ jsx(AfterReplyActionSelector, { disabled: isLoading })
  ] });
}
function AfterReplyActionSelector({ disabled }) {
  const { action, setAction } = useAfterReplyAction();
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      selectionMode: "single",
      selectedValue: action,
      onItemSelected: (newValue) => setAction(newValue),
      children: [
        /* @__PURE__ */ jsx(
          IconButton,
          {
            border: "border border-transparent border-l-primary-light/40",
            variant: "flat",
            color: "primary",
            radius: "rounded-none",
            size: "sm",
            disabled,
            children: /* @__PURE__ */ jsx(ArrowDropDownIcon, {})
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: Object.entries(AfterReplyActions).map(([key, label]) => /* @__PURE__ */ jsx(Item, { value: key, capitalizeFirst: true, children: /* @__PURE__ */ jsx(Trans, { ...label }) }, key)) })
      ]
    }
  );
}
function StatusSelector() {
  const { data } = useMailboxSidenavTags();
  const [selectedStatus, setSelectedStatus] = useLocalStorage(
    "ticket-page-status",
    "pending"
  );
  if (!(data == null ? void 0 : data.statusTags.length))
    return null;
  const selectedTag = data.statusTags.find((t) => t.name === selectedStatus);
  return /* @__PURE__ */ jsxs(
    MenuTrigger,
    {
      selectionMode: "single",
      selectedValue: selectedStatus,
      onItemSelected: (newValue) => setSelectedStatus(newValue),
      children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            radius: "rounded-none",
            endIcon: /* @__PURE__ */ jsx(KeyboardArrowDownIcon, {}),
            className: "capitalize text-muted",
            children: selectedTag ? /* @__PURE__ */ jsx(Trans, { message: selectedTag.display_name }) : /* @__PURE__ */ jsx(Trans, { message: "Select status" })
          }
        ),
        /* @__PURE__ */ jsx(Menu, { children: data.statusTags.map((tag) => /* @__PURE__ */ jsx(Item, { value: tag.name, capitalizeFirst: true, children: /* @__PURE__ */ jsx(Trans, { message: tag.display_name }) }, tag.id)) })
      ]
    }
  );
}
function AgentTicketPage() {
  return /* @__PURE__ */ jsx(
    AgentPageLayout,
    {
      rightSidenav: /* @__PURE__ */ jsx(DashboardSidenav, { position: "right", className: "bg-alt", size: "w-264", children: /* @__PURE__ */ jsx(UserDetailsSidebar, {}) }),
      children: /* @__PURE__ */ jsx(TicketContent, {})
    }
  );
}
function TicketContent() {
  var _a;
  const { branding } = useSettings();
  const query = useTicket();
  const previousTicketId = usePrevious((_a = query.data) == null ? void 0 : _a.ticket.id);
  const saveDraft2 = useBackgroundDraftSave();
  useEffect(() => {
    var _a2, _b;
    const ticket = (_a2 = query.data) == null ? void 0 : _a2.ticket;
    if (ticket) {
      const draft = (_b = ticket.replies) == null ? void 0 : _b.find((reply) => reply.type === "drafts");
      if (draft && previousTicketId !== ticket.id) {
        ticketPageStore().updateActiveDraft({
          ...defaultDraftValues,
          ...draft,
          isDirty: false
        });
      }
    }
    return () => {
      if (previousTicketId) {
        saveDraft2("manual", previousTicketId);
        ticketPageStore().setEditorIsOpen(false);
      }
    };
  }, [previousTicketId]);
  return /* @__PURE__ */ jsx(Fragment, { children: query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsxs("title", { children: [
      query.data.ticket.subject,
      " - ",
      branding.site_name
    ] }) }),
    /* @__PURE__ */ jsx(TicketPageToolbar, { ticket: query.data.ticket }),
    /* @__PURE__ */ jsx(TicketPageHeader, { data: query.data }),
    /* @__PURE__ */ jsx(ReplyEditor, {}),
    /* @__PURE__ */ jsx(AgentTicketPageReplyList, { data: query.data })
  ] }) : /* @__PURE__ */ jsx(
    PageStatus,
    {
      query,
      loaderClassName: "absolute inset-0 m-auto",
      redirectOn404: "/agent/tickets"
    }
  ) });
}
function ReplyEditor() {
  const editorIsOpen = useTicketPageStore((s) => s.editorIsOpen);
  return /* @__PURE__ */ jsx(FileUploadProvider, { children: editorIsOpen && /* @__PURE__ */ jsx(AgentReplyEditor, {}) });
}
function AgentCannedRepliesPage() {
  const { user } = useAuth();
  return /* @__PURE__ */ jsx(AgentPageLayout, { children: /* @__PURE__ */ jsx(CannedRepliesDatatablePage, { userId: user == null ? void 0 : user.id }) });
}
function AgentNewTicketPage() {
  const query = useMailboxSidenavTags();
  return /* @__PURE__ */ jsx(AgentPageLayout, { children: /* @__PURE__ */ jsxs("main", { className: "container mx-auto p-12 md:p-24", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-34 mt-14 text-3xl font-light", children: /* @__PURE__ */ jsx(Trans, { message: "Create new ticket" }) }),
    query.data ? /* @__PURE__ */ jsx(TicketForm, { tags: query.data }) : /* @__PURE__ */ jsx(PageStatus, { query, show404: false, loaderIsScreen: false })
  ] }) });
}
function TicketForm({ tags: { statusTags, categoryTags } }) {
  var _a, _b, _c;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customer_id");
  const form = useForm({
    defaultValues: {
      category_id: (_a = categoryTags[0]) == null ? void 0 : _a.id,
      status: (_b = statusTags[0]) == null ? void 0 : _b.name,
      user_id: customerId ? parseInt(customerId) : void 0
    }
  });
  const bodyError = (_c = form.formState.errors.body) == null ? void 0 : _c.message;
  const createTicket = useCreateTicket(form);
  const editorRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const handleSubmit = () => {
    createTicket.mutate(
      {
        ...form.getValues(),
        body: getReplyBody(editorRef) || "",
        attachments: attachments.map((a) => a.id),
        created_by_agent: true
      },
      {
        onSuccess: () => navigate("/agent/tickets")
      }
    );
  };
  const inputFieldClassNames = getInputFieldClassNames();
  return /* @__PURE__ */ jsxs(
    Form,
    {
      form,
      onSubmit: () => handleSubmit(),
      onBeforeSubmit: () => form.clearErrors(),
      children: [
        /* @__PURE__ */ jsx(
          FormNormalizedModelField,
          {
            name: "user_id",
            endpoint: "normalized-models/user",
            label: /* @__PURE__ */ jsx(Trans, { message: "Customer" }),
            className: "mb-24",
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "subject",
            label: /* @__PURE__ */ jsx(Trans, { message: "Subject" }),
            className: "mb-24"
          }
        ),
        /* @__PURE__ */ jsx(
          FormSelect,
          {
            name: "category_id",
            label: /* @__PURE__ */ jsx(Trans, { message: "Category" }),
            selectionMode: "single",
            className: "mb-24",
            children: categoryTags.map((category) => /* @__PURE__ */ jsx(Item, { value: category.id, children: category.display_name || category.name }, category.id))
          }
        ),
        /* @__PURE__ */ jsx(
          FormSelect,
          {
            name: "status",
            label: /* @__PURE__ */ jsx(Trans, { message: "Status" }),
            selectionMode: "single",
            className: "mb-24",
            children: statusTags.map((status) => /* @__PURE__ */ jsx(Item, { value: status.name, children: status.display_name || status.name }, status.id))
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mb-24", children: [
          /* @__PURE__ */ jsx("div", { className: inputFieldClassNames.label, children: /* @__PURE__ */ jsx(Trans, { message: "Reply body" }) }),
          /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
            ReplyEditor$1,
            {
              autoFocus: false,
              minHeight: "min-h-[300px]",
              isLoading: createTicket.isPending,
              editorRef,
              attachments,
              onAttachmentsChange: (attachments2) => setAttachments(attachments2),
              onSubmit: () => handleSubmit()
            }
          ) }),
          bodyError && /* @__PURE__ */ jsx("div", { className: inputFieldClassNames.error, children: bodyError })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "flat",
            color: "primary",
            type: "submit",
            disabled: createTicket.isPending,
            children: /* @__PURE__ */ jsx(Trans, { message: "Create" })
          }
        )
      ]
    }
  );
}
function useUpdateUserDetails(userId, form) {
  return useMutation({
    mutationFn: (payload) => updateDetails(userId, payload),
    onSuccess: async () => {
      form.reset({}, { keepValues: true });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast(message("User details updated"));
    },
    onError: (err) => form ? onFormQueryError(err, form) : showHttpErrorToast(err)
  });
}
function updateDetails(userId, payload) {
  return apiClient.put(`users/${userId}/details`, payload).then((r) => r.data);
}
const borderColor = "border border-fg-base/6 hover:border-divider";
function AgentCustomerPageSidebar({ user, className }) {
  const { envato } = useSettings();
  return /* @__PURE__ */ jsxs("aside", { className, children: [
    user && /* @__PURE__ */ jsx(FormWrapper, { user }),
    (envato == null ? void 0 : envato.enable) && !!(user == null ? void 0 : user.purchase_codes) && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 mt-24 text-lg font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "Envato purchases" }) }),
      /* @__PURE__ */ jsx(EnvatoPurchaseList, { purchases: user.purchase_codes })
    ] })
  ] });
}
function FormWrapper({ user }) {
  var _a, _b, _c;
  const form = useForm({
    defaultValues: {
      language: user.language || "",
      country: user.country || "",
      timezone: user.timezone || getLocalTimeZone(),
      notes: ((_a = user.details) == null ? void 0 : _a.notes) || "",
      details: ((_b = user.details) == null ? void 0 : _b.details) || "",
      emails: user.secondary_emails,
      tags: (_c = user.tags) == null ? void 0 : _c.map((tag) => tag.name)
    }
  });
  const updateDetails2 = useUpdateUserDetails(user.id, form);
  return /* @__PURE__ */ jsxs(Form, { form, onSubmit: (values) => updateDetails2.mutate(values), children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsx(EmailsSection, { user }),
      /* @__PURE__ */ jsx(LocalizationFields, { user }),
      /* @__PURE__ */ jsx(Detail, { label: /* @__PURE__ */ jsx(Trans, { message: "Tags" }), children: /* @__PURE__ */ jsx(
        FormChipField,
        {
          name: "tags",
          size: "sm",
          chipSize: "xs",
          valueKey: "name",
          inputBorder: borderColor
        }
      ) }),
      /* @__PURE__ */ jsx(DetailsField, {}),
      /* @__PURE__ */ jsx(NotesField, {}),
      /* @__PURE__ */ jsx(Detail, { label: /* @__PURE__ */ jsx(Trans, { message: "Last login" }), children: user.last_login ? /* @__PURE__ */ jsx(FormattedDate, { date: user.last_login.created_at }) : "-" }),
      /* @__PURE__ */ jsx(Detail, { label: /* @__PURE__ */ jsx(Trans, { message: "Created at" }), children: user.created_at ? /* @__PURE__ */ jsx(FormattedDate, { date: user.created_at }) : "-" })
    ] }),
    form.formState.isDirty && /* @__PURE__ */ jsx(
      Button,
      {
        color: "primary",
        variant: "flat",
        type: "submit",
        size: "sm",
        display: "block",
        className: "mt-14 w-full",
        disabled: updateDetails2.isPending,
        children: /* @__PURE__ */ jsx(Trans, { message: "Save" })
      }
    )
  ] });
}
function EmailsSection({ user }) {
  const { fields, append, remove } = useFieldArray({
    name: "emails",
    keyName: "key"
  });
  return /* @__PURE__ */ jsx(
    Detail,
    {
      label: /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(Trans, { message: "Emails" }) }),
      align: "items-start",
      children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-12", children: [
          /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap", children: user.email }),
          /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Add email" }), children: /* @__PURE__ */ jsx(
            IconButton,
            {
              size: "xs",
              iconSize: "sm",
              onClick: () => append({ address: "" }),
              children: /* @__PURE__ */ jsx(AddIcon, {})
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 pt-6", children: fields.map((field, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
          /* @__PURE__ */ jsx(
            FormTextField,
            {
              name: `emails.${index}.address`,
              className: "flex-auto",
              size: "xs",
              type: "email",
              inputBorder: borderColor
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              color: "danger",
              size: "xs",
              iconSize: "sm",
              onClick: () => remove(index),
              children: /* @__PURE__ */ jsx(CloseIcon, {})
            }
          )
        ] }, field.key)) })
      ] })
    }
  );
}
function LocalizationFields({ user }) {
  const { trans } = useTrans();
  const { data } = useValueLists(["timezones", "countries", "localizations"]);
  const countries = (data == null ? void 0 : data.countries) || [];
  const localizations = (data == null ? void 0 : data.localizations) || [];
  const timezones = (data == null ? void 0 : data.timezones) || {};
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Detail, { label: /* @__PURE__ */ jsx(Trans, { message: "Timezone" }), children: /* @__PURE__ */ jsx(
      TimezoneSelect,
      {
        name: "timezone",
        timezones,
        size: "sm",
        inputBorder: borderColor
      }
    ) }),
    /* @__PURE__ */ jsx(Detail, { label: /* @__PURE__ */ jsx(Trans, { message: "Language" }), children: /* @__PURE__ */ jsx(
      FormSelect,
      {
        selectionMode: "single",
        name: "language",
        size: "sm",
        inputBorder: borderColor,
        children: localizations.map((localization) => /* @__PURE__ */ jsx(Item, { value: localization.language, children: localization.name }, localization.language))
      }
    ) }),
    /* @__PURE__ */ jsx(Detail, { label: /* @__PURE__ */ jsx(Trans, { message: "Country" }), children: /* @__PURE__ */ jsx(
      FormSelect,
      {
        selectionMode: "single",
        size: "sm",
        name: "country",
        showSearchField: true,
        searchPlaceholder: trans(message("Search countries")),
        inputBorder: borderColor,
        children: countries.map((country) => /* @__PURE__ */ jsx(Item, { value: country.code, children: country.name }, country.code))
      }
    ) })
  ] });
}
function DetailsField() {
  return /* @__PURE__ */ jsx(
    Detail,
    {
      label: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Trans, { message: "Details" }) }),
        /* @__PURE__ */ jsx(
          InfoDialogTrigger,
          {
            dialogSize: "xs",
            body: /* @__PURE__ */ jsx(Trans, { message: "Optional information, like address. Only visible to agents, not end users." })
          }
        )
      ] }),
      children: /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "details",
          inputElementType: "textarea",
          rows: 1,
          inputBorder: borderColor
        }
      )
    }
  );
}
function NotesField() {
  return /* @__PURE__ */ jsx(
    Detail,
    {
      label: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Trans, { message: "Notes" }) }),
        /* @__PURE__ */ jsx(
          InfoDialogTrigger,
          {
            dialogSize: "xs",
            body: /* @__PURE__ */ jsx(Trans, { message: "Optional notes. Only visible to agents, not end users." })
          }
        )
      ] }),
      children: /* @__PURE__ */ jsx(
        FormTextField,
        {
          name: "notes",
          inputElementType: "textarea",
          rows: 1,
          inputBorder: borderColor
        }
      )
    }
  );
}
function Detail({ label, children, align = "items-center" }) {
  return /* @__PURE__ */ jsxs("div", { className: `flex ${align} gap-12`, children: [
    /* @__PURE__ */ jsx("div", { className: "w-80 flex-shrink-0 text-sm text-muted", children: label }),
    /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-auto text-sm", children })
  ] });
}
function useDeleteUser() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      toast(message("User deleted"));
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: ["users"]
        }),
        queryClient.invalidateQueries({
          queryKey: ["tickets"]
        })
      ]);
      navigate("/agent/tickets");
    },
    onError: (r) => showHttpErrorToast(r)
  });
}
function deleteUser(payload) {
  return apiClient.delete(`users/${payload.userId}`).then((response) => response.data);
}
function useMergeUsers(form) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: mergeUsers,
    onSuccess: async () => {
      toast(message("Users merged"));
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: ["users"]
        }),
        queryClient.invalidateQueries({
          queryKey: ["tickets"]
        })
      ]);
      navigate("/agent/tickets");
    },
    onError: (r) => onFormQueryError(r, form)
  });
}
function mergeUsers(payload) {
  return apiClient.post(`merge-users`, payload).then((response) => response.data);
}
function MergeUsersDialog({ mergee }) {
  const { close: close2, formId } = useDialogContext();
  const form = useForm({
    defaultValues: {
      mergee_id: mergee.id
    }
  });
  const mergeUsers2 = useMergeUsers(form);
  const selectedUserId = form.watch("user_id");
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(
      Trans,
      {
        message: "Merge ':name' into another user",
        values: { name: mergee.display_name }
      }
    ) }),
    /* @__PURE__ */ jsx(DialogBody, { children: /* @__PURE__ */ jsx(
      Form,
      {
        id: formId,
        form,
        onSubmit: (values) => {
          mergeUsers2.mutate(values, { onSuccess: () => close2() });
        },
        children: /* @__PURE__ */ jsx(
          FormNormalizedModelField,
          {
            name: "user_id",
            endpoint: "normalized-models/user",
            label: /* @__PURE__ */ jsx(Trans, { message: "User to merge into" }),
            placeholder: message("Select user"),
            description: /* @__PURE__ */ jsx(
              Trans,
              {
                message: "':name' will be deleted and all data belonging to them will be merged into selected user.",
                values: { name: mergee.display_name }
              }
            )
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: () => close2(), children: /* @__PURE__ */ jsx(Trans, { message: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          variant: "flat",
          color: "primary",
          form: formId,
          disabled: !selectedUserId || mergeUsers2.isPending,
          children: /* @__PURE__ */ jsx(Trans, { message: "Merge" })
        }
      )
    ] })
  ] });
}
function AgentCustomerPage() {
  var _a;
  const { userId } = useParams();
  const query = useUser(userId, {
    with: [
      "tags",
      "secondary_emails",
      "details",
      "purchase_codes",
      "bans",
      "lastLogin"
    ]
  });
  const user = (_a = query.data) == null ? void 0 : _a.user;
  useEffect(() => {
    prefetchValueLists(["timezones", "countries", "localizations"]);
  }, []);
  if (!query.isLoading && !query.data) {
    return /* @__PURE__ */ jsx(PageStatus, { query });
  }
  return /* @__PURE__ */ jsxs(DashboardLayout, { name: "agent_customer_page", children: [
    /* @__PURE__ */ jsx(AgentNavbar, { element: DashboardNavbar }),
    /* @__PURE__ */ jsx(LeftSidebar, { user }),
    /* @__PURE__ */ jsx(DashboardContent, { children: /* @__PURE__ */ jsx(
      "main",
      {
        className: clsx(
          "p-14 transition-opacity md:p-24",
          !user && "opacity-0"
        ),
        children: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Header, { user }),
          /* @__PURE__ */ jsx(Tables, {})
        ] })
      }
    ) })
  ] });
}
function LeftSidebar({ user }) {
  const { isMobileMode } = useContext(DashboardLayoutContext);
  return /* @__PURE__ */ jsx(
    DashboardSidenav,
    {
      position: "left",
      size: "w-350",
      className: clsx(
        "bg",
        isMobileMode ? "border-r p-12" : "mt-8 py-24 pl-24"
      ),
      overflow: "overflow-y-auto overflow-x-hidden compact-scrollbar",
      children: /* @__PURE__ */ jsx(AgentCustomerPageSidebar, { user })
    }
  );
}
function Header({ user }) {
  var _a, _b;
  if (!user)
    return null;
  const banReason = (_b = (_a = user.bans) == null ? void 0 : _a[0]) == null ? void 0 : _b.comment;
  return /* @__PURE__ */ jsxs("header", { className: "mb-16 flex items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "mr-auto flex items-center gap-14", children: [
      /* @__PURE__ */ jsx(UserAvatar, { user, size: "w-50 h-50", circle: true }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold", children: user.display_name }),
        banReason && /* @__PURE__ */ jsx("div", { className: "text-sm text-danger", children: /* @__PURE__ */ jsx(
          Trans,
          {
            message: "Suspended: :reason",
            values: { reason: banReason }
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
        size: "xs",
        className: "mx-12",
        elementType: Link,
        to: `/agent/tickets/new?customer_id=${user.id}`,
        target: "_blank",
        children: /* @__PURE__ */ jsx(Trans, { message: "New ticket" })
      }
    ),
    /* @__PURE__ */ jsxs(MenuTrigger, { children: [
      /* @__PURE__ */ jsx(IconButton, { variant: "outline", size: "xs", children: /* @__PURE__ */ jsx(MoreHorizIcon, {}) }),
      /* @__PURE__ */ jsxs(Menu, { children: [
        /* @__PURE__ */ jsx(
          Item,
          {
            value: "suspend",
            onSelected: () => openDialog(BanUserDialog, { user }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Suspend" })
          }
        ),
        /* @__PURE__ */ jsx(
          Item,
          {
            value: "merge",
            onSelected: () => openDialog(MergeUsersDialog, { mergee: user }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Merge into another user" })
          }
        ),
        /* @__PURE__ */ jsx(
          Item,
          {
            value: "delete",
            onSelected: () => openDialog(DeleteUserDialog, { user }),
            children: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
          }
        )
      ] })
    ] })
  ] });
}
function DeleteUserDialog({ user }) {
  const deleteUser2 = useDeleteUser();
  const { close: close2 } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isDanger: true,
      title: /* @__PURE__ */ jsx(Trans, { message: "Delete user" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to delete this user? This will also delete all tickets created by this user and can't be undone." }),
      onConfirm: () => {
        deleteUser2.mutate(
          { userId: user.id },
          {
            onSuccess: () => close2()
          }
        );
      },
      isLoading: deleteUser2.isPending,
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Delete" })
    }
  );
}
function Tables() {
  const { userId } = useParams();
  const { pathname } = useLocation();
  const [selectedTab, setSelectedTab] = useState(() => {
    return pathname.endsWith("searches") ? 1 : 0;
  });
  return /* @__PURE__ */ jsx("div", { className: "rounded border", children: /* @__PURE__ */ jsxs(Tabs, { selectedTab, onTabChange: setSelectedTab, children: [
    /* @__PURE__ */ jsxs(TabList, { children: [
      /* @__PURE__ */ jsx(
        Tab,
        {
          width: "min-w-132",
          elementType: Link,
          to: getCustomerLink(userId),
          replace: true,
          children: /* @__PURE__ */ jsx(Trans, { message: "Tickets" })
        }
      ),
      /* @__PURE__ */ jsx(
        Tab,
        {
          width: "min-w-132",
          elementType: Link,
          to: getCustomerLink(userId, { tab: "searches" }),
          replace: true,
          children: /* @__PURE__ */ jsx(Trans, { message: "Searches" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] }) });
}
function AgentCustomerPageTicketTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { userId } = useParams();
  const [selectedTickets, setSelectedTickets] = useState([]);
  const query = useTickets({
    userId,
    page: searchParams.get("page") || 1,
    perPage: searchParams.get("perPage") ?? "",
    loader: "ticketTable"
  });
  const { data, fetchStatus, isLoading, isPlaceholderData } = query;
  const items = (data == null ? void 0 : data.pagination.data) || [];
  const isEmpty = fetchStatus === "idle" && items.length === 0 || !isLoading && !isPlaceholderData && items.length === 0;
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(GlobalLoadingProgress, { query }),
    /* @__PURE__ */ jsx(
      TicketTable,
      {
        query,
        selectedTickets,
        onSelectionChange: setSelectedTickets
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selectedTickets.length && /* @__PURE__ */ jsx(
      TicketTableActions,
      {
        ticketIds: selectedTickets,
        onActionCompleted: () => setSelectedTickets([])
      }
    ) }),
    isEmpty && /* @__PURE__ */ jsx(
      IllustratedMessage,
      {
        className: "mt-48",
        image: /* @__PURE__ */ jsx(SvgImage, { src: searchImage }),
        title: /* @__PURE__ */ jsx(Trans, { message: "User has not created any tickets yet" })
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
function CustomerSearchesTable() {
  const { userId } = useParams();
  return /* @__PURE__ */ jsx(
    SearchReportTable,
    {
      description: /* @__PURE__ */ jsx(Trans, { message: "This report shows what the user searched for recently." }),
      userId,
      orderBy: "last_seen"
    }
  );
}
const RouteConfig = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(Navigate, { to: "/agent/tickets", replace: true })
  },
  {
    path: "/tickets",
    element: /* @__PURE__ */ jsx(AgentTicketListPage, {})
  },
  {
    path: "/tickets/new",
    element: /* @__PURE__ */ jsx(AgentNewTicketPage, {})
  },
  {
    path: "/tickets/:ticketId",
    element: /* @__PURE__ */ jsx(AgentTicketPage, {})
  },
  {
    path: "/users/:userId",
    element: /* @__PURE__ */ jsx(AgentCustomerPage, {}),
    children: [
      { path: "", element: /* @__PURE__ */ jsx(Navigate, { to: "tickets", replace: true }) },
      {
        path: "tickets",
        element: /* @__PURE__ */ jsx(AgentCustomerPageTicketTable, {})
      },
      {
        path: "searches",
        element: /* @__PURE__ */ jsx(CustomerSearchesTable, {})
      }
    ]
  },
  {
    path: "/search",
    element: /* @__PURE__ */ jsx(AgentSearchPage, {}),
    children: [
      {
        path: "",
        element: /* @__PURE__ */ jsx(SearchTicketsTable, {})
      },
      {
        path: "tickets",
        element: /* @__PURE__ */ jsx(SearchTicketsTable, {})
      },
      {
        path: "users",
        element: /* @__PURE__ */ jsx(SearchUsersTable, {})
      },
      {
        path: "articles",
        element: /* @__PURE__ */ jsx(SearchArticlesTable, {})
      }
    ]
  },
  {
    path: "saved-replies",
    element: /* @__PURE__ */ jsx(AgentCannedRepliesPage, {})
  },
  {
    path: "*",
    element: /* @__PURE__ */ jsx(NotFoundPage, {})
  }
];
function AgentRoutes() {
  return useRoutes(RouteConfig);
}
export {
  AgentRoutes as default
};
//# sourceMappingURL=agent-routes-34ef459b.mjs.map
