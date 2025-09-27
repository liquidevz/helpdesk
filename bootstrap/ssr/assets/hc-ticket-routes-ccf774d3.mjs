import { jsx, jsxs } from "react/jsx-runtime";
import { Link, useSearchParams, useParams, useRoutes } from "react-router-dom";
import { T as Trans, M as FormattedRelativeTime, O as Chip, g as useNavigate, N as Navbar, B as Button, e as useTrans, p as useAuth, a2 as TextField, m as message, S as SearchIcon, aO as SelectForwardRef, i as Item, q as opacityAnimation, w as Skeleton, Q as queryClient, R as toast, s as showHttpErrorToast, n as apiClient, ac as useTicket, a5 as FileUploadProvider, v as PageStatus, a3 as FormattedDate, D as DialogTrigger, o as CheckIcon, $ as ConfirmationDialog, a as useSettings, f as useSearchArticles, A as ArticleLink, ak as getInputFieldClassNames, ad as Form, am as FormSelect, al as FormTextField, K as NotFoundPage } from "../server-entry.mjs";
import { H as HcSearchBar, u as useSearchTermLogger } from "./hc-routes-75b349d5.mjs";
import { useRef, useState, Fragment } from "react";
import { a as useTickets, S as SendReplyButton, m as TicketHeaderDateFormat, f as TicketTagList, c as useTicketReplies, T as TicketReplyLayout, I as InfiniteScrollSentinel, u as useChangeTicketStatus, l as useCreateTicket } from "./use-create-ticket-dedcd6c5.mjs";
import { T as Table, D as DataTablePaginationFooter, a as DataTableEmptyStateMessage, R as ReplyEditor, A as AttachmentListLayout, F as FileEntryAttachmentLayout, j as useCurrentDateTime, x as AccordionAnimation, g as getReplyBody } from "./reply-editor-0dd9f156.mjs";
import { s as searchImage } from "./search-9f6b7ed0.mjs";
import { AnimatePresence, m } from "framer-motion";
import { B as Breadcrumb, a as BreadcrumbItem } from "./breadcrumb-093d993c.mjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { R as ReplyIcon } from "./Reply-cd05287b.mjs";
import { u as useKeybind } from "./search-trigger-button-2521a5b9.mjs";
import { S as SectionHelper } from "./section-helper-914c12d5.mjs";
import { useForm } from "react-hook-form";
import "react-dom/server";
import "process";
import "http";
import "axios";
import "react-router-dom/server.mjs";
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
import "@react-stately/utils";
import "@react-aria/ssr";
import "deepmerge";
import "axios-retry";
import "tus-js-client";
import "mime-match";
import "react-use-clipboard";
import "slugify";
import "./bullet-seprated-items-77fb8967.mjs";
import "./AttachFile-58bf2900.mjs";
import "./Edit-7ad4ec30.mjs";
import "@react-aria/interactions";
import "just-debounce-it";
const CustomerTicketTableColumns = [
  {
    key: "subject",
    visibleInMode: "all",
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Subject" }),
    body: (ticket) => ticket.subject,
    width: "flex-3 min-w-200"
  },
  {
    key: "id",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Id" }),
    width: "w-90",
    body: (ticket) => `#${ticket.id}`
  },
  {
    key: "created_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Created" }),
    width: "w-144",
    body: (ticket) => /* @__PURE__ */ jsx(FormattedRelativeTime, { date: ticket.created_at })
  },
  {
    key: "updated_at",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Last updated" }),
    width: "w-144",
    body: (ticket) => /* @__PURE__ */ jsx(FormattedRelativeTime, { date: ticket.updated_at })
  },
  {
    key: "status",
    allowsSorting: true,
    header: () => /* @__PURE__ */ jsx(Trans, { message: "Status" }),
    visibleInMode: "all",
    width: "w-80",
    body: (ticket) => /* @__PURE__ */ jsx("div", { className: "w-max", children: /* @__PURE__ */ jsx(
      Chip,
      {
        size: "sm",
        color: !ticket.closed_at ? "primary" : void 0,
        radius: "rounded-md",
        className: "font-medium capitalize",
        children: /* @__PURE__ */ jsx(Trans, { message: ticket.status })
      }
    ) })
  }
];
const defaultPage = "1";
const defaultPerPage = "20";
function CustomerTicketListPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Navbar, { menuPosition: "header", children: /* @__PURE__ */ jsx(HcSearchBar, {}) }),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-24 pb-48", children: [
      /* @__PURE__ */ jsxs(Breadcrumb, { size: "sm", className: "mb-48 mt-34", children: [
        /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc`), children: /* @__PURE__ */ jsx(Trans, { message: "Help center" }) }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc/tickets`), children: /* @__PURE__ */ jsx(Trans, { message: "Requests" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-34 flex items-start justify-between gap-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold", children: /* @__PURE__ */ jsx(Trans, { message: "My requests" }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            elementType: Link,
            to: "/hc/tickets/new",
            size: "sm",
            variant: "outline",
            children: /* @__PURE__ */ jsx(Trans, { message: "New request" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(TicketTable, {})
    ] })
  ] });
}
function TicketTable() {
  var _a, _b;
  const [searchParams, setSearchParams] = useSearchParams();
  const { trans } = useTrans();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sort, setSort] = useState({});
  const query = useTickets({
    userId: user.id,
    query: searchParams.get("query"),
    tagId: searchParams.get("tagId"),
    page: searchParams.get("page") || defaultPage,
    perPage: searchParams.get("perPage") || defaultPerPage,
    ...sort
  });
  const data = ((_b = (_a = query.data) == null ? void 0 : _a.pagination) == null ? void 0 : _b.data) || [];
  const isFiltering = !!searchParams.get("query") || !!searchParams.get("tagId");
  const setSearchQuery = () => {
    setSearchParams((prev) => {
      var _a2;
      if ((_a2 = inputRef.current) == null ? void 0 : _a2.value) {
        prev.set("query", inputRef.current.value);
      } else {
        prev.delete("query");
      }
      return prev;
    });
  };
  const content = !data.length ? /* @__PURE__ */ jsx(StateMessage, { isFiltering }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Table,
      {
        columns: CustomerTicketTableColumns,
        data,
        sortDescriptor: sort,
        onSortChange: setSort,
        enableSelection: false,
        onAction: (item) => navigate(`/hc/tickets/${item.id}`),
        cellHeight: "h-60"
      }
    ),
    /* @__PURE__ */ jsx(
      DataTablePaginationFooter,
      {
        className: "mt-12",
        query,
        onPageChange: (page) => setSearchParams((prev) => {
          prev.set("page", page.toString());
          return prev;
        })
      }
    )
  ] });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "form",
      {
        className: "mb-34 items-end justify-between gap-24 md:flex",
        onSubmit: (e) => {
          e.preventDefault();
          setSearchQuery();
        },
        children: [
          /* @__PURE__ */ jsx(
            TextField,
            {
              className: "flex-auto max-md:mb-24",
              inputRef,
              defaultValue: searchParams.get("query") || "",
              onBlur: () => setSearchQuery(),
              placeholder: trans(message("Search requests")),
              startAdornment: /* @__PURE__ */ jsx(SearchIcon, {})
            }
          ),
          /* @__PURE__ */ jsx(StatusSelect, {})
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "wait", children: query.isLoading ? /* @__PURE__ */ jsx(Skeletons, {}) : content })
  ] });
}
function StateMessage({ isFiltering }) {
  return /* @__PURE__ */ jsx(
    DataTableEmptyStateMessage,
    {
      isFiltering,
      size: "sm",
      className: "mt-48",
      image: searchImage,
      title: /* @__PURE__ */ jsx(Trans, { message: "You have not created any requests yet" }),
      filteringTitle: /* @__PURE__ */ jsx(Trans, { message: "No requests match your search query or filters" })
    }
  );
}
function StatusSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  return /* @__PURE__ */ jsxs(
    SelectForwardRef,
    {
      className: "flex-shrink-0 md:min-w-172",
      selectionMode: "single",
      selectedValue: searchParams.get("tagId") || "",
      onSelectionChange: (newValue) => {
        setSearchParams((prev) => {
          if (newValue) {
            prev.set("tagId", `${newValue}`);
          } else {
            prev.delete("tagId");
          }
          return prev;
        });
      },
      children: [
        /* @__PURE__ */ jsx(Item, { value: "", children: /* @__PURE__ */ jsx(Trans, { message: "All requests" }) }),
        /* @__PURE__ */ jsx(Item, { value: "open", children: /* @__PURE__ */ jsx(Trans, { message: "Open requests" }) }),
        /* @__PURE__ */ jsx(Item, { value: "closed", children: /* @__PURE__ */ jsx(Trans, { message: "Closed requests" }) }),
        /* @__PURE__ */ jsx(Item, { value: "pending", children: /* @__PURE__ */ jsx(Trans, { message: "Awaiting your reply" }) })
      ]
    }
  );
}
function Skeletons() {
  return /* @__PURE__ */ jsxs(m.div, { ...opacityAnimation, children: [
    /* @__PURE__ */ jsx(Skeleton, { size: "h-36", variant: "rect", className: "mb-12" }),
    /* @__PURE__ */ jsx(Skeleton, { size: "h-54", variant: "rect", className: "mb-12" }),
    /* @__PURE__ */ jsx(Skeleton, { size: "h-54", variant: "rect" })
  ] }, "skeletons");
}
function useSubmitCustomerReply() {
  const { ticketId } = useParams();
  return useMutation({
    mutationFn: (payload) => submitReply({
      ticketId,
      ...payload
    }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast(message("Reply submitted"));
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function submitReply(data) {
  var _a;
  const payload = {
    body: data.body,
    attachments: (_a = data.attachments) == null ? void 0 : _a.map((a) => a.id)
  };
  return apiClient.post(`tickets/${data.ticketId}/replies`, payload).then((r) => r.data);
}
function CustomerTicketPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Navbar, { menuPosition: "header", children: /* @__PURE__ */ jsx(HcSearchBar, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-12 pb-48 md:px-24", children: [
      /* @__PURE__ */ jsxs(Breadcrumb, { size: "sm", className: "mb-34 mt-34 md:mb-48", children: [
        /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc`), children: /* @__PURE__ */ jsx(Trans, { message: "Help center" }) }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc/tickets`), children: /* @__PURE__ */ jsx(Trans, { message: "Requests" }) }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(Trans, { message: "Current ticket" }) })
      ] }),
      /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Content, {}) })
    ] })
  ] });
}
function Content() {
  const query = useTicket();
  const [editorIsOpen, setEditorIsOpen] = useState(false);
  useKeybind("window", "r", () => setEditorIsOpen(true));
  return /* @__PURE__ */ jsx(Fragment, { children: query.data ? /* @__PURE__ */ jsxs(Fragment, { children: [
    query.data.ticket.status === "locked" && /* @__PURE__ */ jsx(
      SectionHelper,
      {
        className: "mb-44 text-center",
        color: "danger",
        title: /* @__PURE__ */ jsx(Trans, { message: "This ticket was locked due to inactivity. To reply, create a new ticket." })
      }
    ),
    /* @__PURE__ */ jsx(
      Header,
      {
        ticket: query.data.ticket,
        editorIsOpen,
        onOpenEditor: () => setEditorIsOpen(true)
      }
    ),
    /* @__PURE__ */ jsx(FileUploadProvider, { children: editorIsOpen && /* @__PURE__ */ jsx(CustomerReplyEditor, { onClose: () => setEditorIsOpen(false) }) }),
    /* @__PURE__ */ jsx(ReplyList, { data: query.data })
  ] }) : /* @__PURE__ */ jsx(PageStatus, { query, loaderClassName: "absolute inset-0 m-auto" }) });
}
function CustomerReplyEditor({ onClose }) {
  const editorRef = useRef(null);
  const submitReply2 = useSubmitCustomerReply();
  const [attachments, setAttachments] = useState([]);
  return /* @__PURE__ */ jsx(
    ReplyEditor,
    {
      isLoading: submitReply2.isPending,
      footerButtons: /* @__PURE__ */ jsx(SendReplyButton, {}),
      editorRef,
      className: "mb-24",
      attachments,
      onAttachmentsChange: (attachments2) => setAttachments(attachments2),
      onSubmit: (reply) => submitReply2.mutate(reply, {
        onSuccess: () => onClose()
      })
    }
  );
}
function Header({ ticket, onOpenEditor, editorIsOpen }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-44", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "whitespace-nowrap text-muted max-md:hidden", children: [
        /* @__PURE__ */ jsx(FormattedRelativeTime, { date: ticket.created_at }),
        " (",
        /* @__PURE__ */ jsx(
          FormattedDate,
          {
            date: ticket.created_at,
            options: TicketHeaderDateFormat
          }
        ),
        ")"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-2xl md:ml-auto", children: [
        "#",
        ticket.id
      ] }),
      /* @__PURE__ */ jsx(
        Chip,
        {
          size: "sm",
          color: !ticket.closed_at ? "primary" : void 0,
          radius: "rounded",
          className: "min-w-60 font-bold capitalize",
          children: ticket.status
        }
      )
    ] }),
    /* @__PURE__ */ jsx("h1", { className: "my-12 text-2xl", children: ticket.subject }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-12", children: [
      /* @__PURE__ */ jsx(
        TicketTagList,
        {
          ticket,
          tagType: "category",
          size: "sm",
          radius: "rounded",
          className: "mr-auto font-semibold max-md:hidden"
        }
      ),
      !ticket.closed_at && /* @__PURE__ */ jsx(MarkAsSolvedButton, {}),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "outline",
          startIcon: /* @__PURE__ */ jsx(ReplyIcon, {}),
          disabled: editorIsOpen,
          onClick: () => onOpenEditor(),
          children: /* @__PURE__ */ jsx(Trans, { message: "Add a reply" })
        }
      )
    ] })
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
          className: "px-12",
          reply,
          isInitial,
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
function MarkAsSolvedButton() {
  const changeStatus = useChangeTicketStatus();
  const { ticketId } = useParams();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", startIcon: /* @__PURE__ */ jsx(CheckIcon, {}), children: /* @__PURE__ */ jsx(Trans, { message: "Mark as solved" }) }),
    ({ close }) => /* @__PURE__ */ jsx(
      ConfirmationDialog,
      {
        onConfirm: () => {
          changeStatus.mutate(
            {
              ids: [ticketId],
              status: "closed"
            },
            {
              onSuccess: () => {
                close();
                toast(message("Ticked marked as solved"));
                navigate(`/hc/tickets`);
              }
            }
          );
        },
        isLoading: changeStatus.isPending,
        title: /* @__PURE__ */ jsx(Trans, { message: "Mark as solved" }),
        body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to mark this ticket as solved?" }),
        confirm: /* @__PURE__ */ jsx(Trans, { message: "Confirm" })
      }
    )
  ] });
}
function useCustomerTicketCategories() {
  return useQuery({
    queryKey: ["new-ticket-categories"],
    queryFn: () => fetchCategories()
  });
}
function fetchCategories() {
  return apiClient.get(`ticket-categories`, {
    params: {
      perPage: 25,
      with: "categories",
      orderBy: "name",
      orderDir: "asc",
      filterByPurchases: true,
      paginate: "simple"
    }
  }).then((response) => response.data);
}
function useCustomerNewTicketConfig() {
  var _a, _b;
  const settings = useSettings();
  return ((_b = (_a = settings.hc) == null ? void 0 : _a.newTicket) == null ? void 0 : _b.appearance) || {};
}
function SuggestedArticlesDrawer({
  query,
  suggestionLog,
  hcCategoryIds
}) {
  const now = useCurrentDateTime();
  const handleSearch = (r) => {
    if (r.pagination.data.length) {
      suggestionLog.current.push({
        term: r.query,
        results: r.pagination.data.map((a) => a.id),
        date: now.toAbsoluteString()
      });
    }
  };
  const { data } = useSearchArticles(
    query,
    { perPage: 5, categoryIds: hcCategoryIds },
    { onSearch: handleSearch }
  );
  const results = data == null ? void 0 : data.pagination.data;
  const isVisible = !!(results == null ? void 0 : results.length);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsxs(
    m.div,
    {
      variants: AccordionAnimation.variants,
      transition: AccordionAnimation.transition,
      initial: false,
      animate: isVisible ? "open" : "closed",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-10 mt-24 text-xl font-semibold", children: [
          /* @__PURE__ */ jsx(Trans, { message: "Were you looking for" }),
          ":"
        ] }),
        results == null ? void 0 : results.map((article) => /* @__PURE__ */ jsx(
          ArticleLink,
          {
            article,
            className: "block py-10 text-sm text-primary",
            target: "_blank"
          },
          article.id
        ))
      ]
    },
    "drawer"
  ) });
}
function CustomerNewTicketPage() {
  const navigate = useNavigate();
  const config = useCustomerNewTicketConfig();
  const query = useCustomerTicketCategories();
  const { envato } = useSettings();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Navbar, { menuPosition: "header", children: /* @__PURE__ */ jsx(HcSearchBar, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-12 pb-48 md:px-24", children: [
      /* @__PURE__ */ jsxs(Breadcrumb, { size: "sm", className: "mb-34 mt-34 md:mb-48", children: [
        /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc`), children: /* @__PURE__ */ jsx(Trans, { message: "Help center" }) }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { onSelected: () => navigate(`/hc/tickets`), children: /* @__PURE__ */ jsx(Trans, { message: "Requests" }) }),
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(Trans, { message: "New request" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-stretch gap-44", children: [
        /* @__PURE__ */ jsxs("main", { className: "flex-auto", children: [
          /* @__PURE__ */ jsx("h1", { className: "mb-34 mt-14 text-3xl font-light", children: /* @__PURE__ */ jsx(Trans, { message: config.title }) }),
          query.error && (envato == null ? void 0 : envato.enable) && envato.require_purchase_code && /* @__PURE__ */ jsx(EnvatoError, {}),
          query.data ? /* @__PURE__ */ jsx(TicketForm, { ticketCategories: query.data.pagination.data }) : null
        ] }),
        /* @__PURE__ */ jsx(Sidebar, {})
      ] })
    ] })
  ] });
}
function TicketForm({ ticketCategories }) {
  var _a, _b, _c;
  const config = useCustomerNewTicketConfig();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      category_id: (_a = ticketCategories[0]) == null ? void 0 : _a.id
    }
  });
  const bodyError = (_b = form.formState.errors.body) == null ? void 0 : _b.message;
  const createTicket = useCreateTicket(form);
  const editorRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const searchQuery = form.watch("subject");
  const hcCategoryIds = (_c = ticketCategories.find((tc) => form.watch("category_id") == tc.id)) == null ? void 0 : _c.categories.map((hc) => hc.id);
  const searchTermLogger = useSearchTermLogger();
  const suggestionLog = useRef([]);
  const selectedCategoryId = form.watch("category_id");
  const selectedCategory = ticketCategories.find(
    (c) => c.id == selectedCategoryId
  );
  const handleSubmit = () => {
    createTicket.mutate(
      {
        ...form.getValues(),
        body: getReplyBody(editorRef) || "",
        attachments: attachments.map((a) => a.id),
        suggestionLog: suggestionLog.current
      },
      {
        onSuccess: () => {
          searchTermLogger.updateLastSearch({ createdTicket: true });
          navigate("/hc/tickets");
        }
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
          FormSelect,
          {
            name: "category_id",
            label: /* @__PURE__ */ jsx(Trans, { message: config.categoryLabel }),
            selectionMode: "single",
            className: "mb-24",
            errorMessage: selectedCategory && selectedCategory.support_expired && /* @__PURE__ */ jsx(
              Trans,
              {
                message: "Your support for this item has expired. <a>Click here to renew</a>",
                values: {
                  a: (content) => /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "https://codecanyon.net/downloads",
                      target: "_blank",
                      rel: "noreferrer",
                      className: "font-bold underline",
                      children: content
                    }
                  )
                }
              }
            ),
            children: ticketCategories.map((category) => /* @__PURE__ */ jsx(Item, { value: category.id, children: category.display_name || category.name }, category.id))
          }
        ),
        /* @__PURE__ */ jsx(
          FormTextField,
          {
            name: "subject",
            label: /* @__PURE__ */ jsx(Trans, { message: config.subjectLabel })
          }
        ),
        /* @__PURE__ */ jsx(
          SuggestedArticlesDrawer,
          {
            query: searchQuery,
            suggestionLog,
            hcCategoryIds
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "my-24", children: [
          /* @__PURE__ */ jsx("div", { className: inputFieldClassNames.label, children: /* @__PURE__ */ jsx(Trans, { message: config.descriptionLabel }) }),
          /* @__PURE__ */ jsx(FileUploadProvider, { children: /* @__PURE__ */ jsx(
            ReplyEditor,
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
            children: /* @__PURE__ */ jsx(Trans, { message: config.submitButtonText })
          }
        )
      ]
    }
  );
}
function Sidebar() {
  var _a;
  const config = useCustomerNewTicketConfig();
  return /* @__PURE__ */ jsxs("aside", { className: "w-500 border-l px-40 max-md:hidden", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-34 text-xl font-medium", children: /* @__PURE__ */ jsx(Trans, { message: config.sidebarTitle }) }),
    (_a = config.sidebarTips) == null ? void 0 : _a.map((tip, index) => /* @__PURE__ */ jsx(SidebarTip, { title: /* @__PURE__ */ jsx(Trans, { message: tip.title }), children: /* @__PURE__ */ jsx(Trans, { message: tip.content }) }, index))
  ] });
}
function SidebarTip({ title, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-30", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium", children: title }),
    /* @__PURE__ */ jsx("p", { children })
  ] });
}
function EnvatoError() {
  return /* @__PURE__ */ jsx("div", { className: "text-sm text-danger", children: /* @__PURE__ */ jsx(Trans, { message: "There was an issue fetching your purchase codes from envato. Try to logout and use 'login with envato' button." }) });
}
const RouteConfig = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(CustomerTicketListPage, {})
  },
  {
    path: "/new",
    element: /* @__PURE__ */ jsx(CustomerNewTicketPage, {})
  },
  {
    path: ":ticketId",
    element: /* @__PURE__ */ jsx(CustomerTicketPage, {})
  },
  {
    path: "*",
    element: /* @__PURE__ */ jsx(NotFoundPage, {})
  }
];
function HcTicketRoutes() {
  return useRoutes(RouteConfig);
}
export {
  HcTicketRoutes as default
};
//# sourceMappingURL=hc-ticket-routes-ccf774d3.mjs.map
