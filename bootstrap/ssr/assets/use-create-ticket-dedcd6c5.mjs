import { useQuery, keepPreviousData, useMutation, hashKey, useInfiniteQuery } from "@tanstack/react-query";
import { n as apiClient, aM as SiteConfigContext, Q as queryClient, s as showHttpErrorToast, B as Button, T as Trans, q as opacityAnimation, aE as ProgressCircle, y as getBootstrapData, ac as useTicket, D as DialogTrigger, d as useDialogContext, $ as ConfirmationDialog, x as highlightAllCode, p as useAuth, a3 as FormattedDate, an as onFormQueryError, M as FormattedRelativeTime, e as useTrans, ad as Form, al as FormTextField, U as Tooltip, R as toast, O as Chip, m as message } from "../server-entry.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
import { useContext, useRef, useState, useEffect, useMemo, useCallback, Fragment } from "react";
import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import { k as Avatar, y as hasNextPage, C as ChipList } from "./reply-editor-0dd9f156.mjs";
import { useParams, Link } from "react-router-dom";
import { create } from "zustand";
import { useForm } from "react-hook-form";
function useTickets(params) {
  return useQuery({
    queryKey: ["tickets", params],
    queryFn: () => fetchTickets(params),
    placeholderData: keepPreviousData
  });
}
function fetchTickets(params) {
  return apiClient.get("tickets", { params }).then((response) => response.data);
}
function UserAvatar({ user, ...props }) {
  var _a;
  const { auth } = useContext(SiteConfigContext);
  return /* @__PURE__ */ jsx(
    Avatar,
    {
      ...props,
      label: user == null ? void 0 : user.display_name,
      src: user == null ? void 0 : user.avatar,
      link: (user == null ? void 0 : user.id) && ((_a = auth.getUserProfileLink) == null ? void 0 : _a.call(auth, user))
    }
  );
}
function useChangeTicketStatus() {
  return useMutation({
    mutationFn: (payload) => changeStatus(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["mailbox", "sidenav-tags"] });
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: (err) => showHttpErrorToast(err)
  });
}
function changeStatus(payload) {
  return apiClient.post(`tickets/status/change`, payload).then((r) => r.data);
}
function InfiniteScrollSentinel({
  query: { isInitialLoading, fetchNextPage, isFetchingNextPage, hasNextPage: hasNextPage2 },
  children,
  loaderMarginTop = "mt-24",
  style,
  className,
  variant: _variant = "infiniteScroll",
  loadMoreExtraContent,
  size = "md"
}) {
  const sentinelRef = useRef(null);
  const isLoading = isFetchingNextPage || isInitialLoading;
  const [loadMoreClickCount, setLoadMoreClickCount] = useState(0);
  const innerVariant = _variant === "loadMore" && loadMoreClickCount < 3 ? "loadMore" : "infiniteScroll";
  useEffect(() => {
    const sentinelEl = sentinelRef.current;
    if (!sentinelEl || innerVariant === "loadMore")
      return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage2 && !isLoading) {
        fetchNextPage();
      }
    });
    observer.observe(sentinelEl);
    return () => {
      observer.unobserve(sentinelEl);
    };
  }, [fetchNextPage, hasNextPage2, isLoading, innerVariant]);
  let content;
  if (children) {
    content = isFetchingNextPage ? children : null;
  } else if (innerVariant === "loadMore") {
    content = !isInitialLoading && hasNextPage2 && /* @__PURE__ */ jsxs("div", { className: clsx("flex items-center gap-8", loaderMarginTop), children: [
      loadMoreExtraContent,
      /* @__PURE__ */ jsx(
        Button,
        {
          size: size === "md" ? "sm" : "xs",
          className: clsx(
            size === "sm" ? "min-h-24 min-w-96" : "min-h-36 min-w-112"
          ),
          variant: "outline",
          color: "primary",
          onClick: () => {
            fetchNextPage();
            setLoadMoreClickCount(loadMoreClickCount + 1);
          },
          disabled: isLoading,
          children: loadMoreClickCount >= 2 && !isFetchingNextPage ? /* @__PURE__ */ jsx(Trans, { message: "Load all" }) : /* @__PURE__ */ jsx(Trans, { message: "Show more" })
        }
      )
    ] });
  } else {
    content = /* @__PURE__ */ jsx(AnimatePresence, { children: isFetchingNextPage && /* @__PURE__ */ jsx(
      m.div,
      {
        className: clsx("flex justify-center w-full", loaderMarginTop),
        ...opacityAnimation,
        children: /* @__PURE__ */ jsx(ProgressCircle, { size, isIndeterminate: true, "aria-label": "loading" })
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style,
      className: clsx("w-full", className, hasNextPage2 && "min-h-36"),
      role: "presentation",
      children: [
        /* @__PURE__ */ jsx("div", { ref: sentinelRef, "aria-hidden": true }),
        content
      ]
    }
  );
}
const defaultDraftValues = {
  isDirty: false,
  isSaving: false,
  body: void 0,
  attachments: []
};
const useTicketPageStore = create()((set) => ({
  editorIsOpen: false,
  setEditorIsOpen: (value) => set((s) => ({ editorIsOpen: value })),
  ticketIsSaving: false,
  setTicketIsSaving: (value) => set((s) => ({ ticketIsSaving: value })),
  activeDraft: defaultDraftValues,
  updateActiveDraft: (value) => set((s) => {
    var _a;
    const isDirty = !isBodyEmpty(value.body) || !!((_a = value.attachments) == null ? void 0 : _a.length);
    return {
      activeDraft: {
        ...s.activeDraft,
        isDirty,
        ...value
      }
    };
  }),
  discardActiveDraft: () => set(() => ({
    activeDraft: defaultDraftValues
  }))
}));
function ticketPageStore() {
  return useTicketPageStore.getState();
}
function isBodyEmpty(body) {
  if (!body)
    return true;
  return body.trim() === "<p></p>" || !body.trim();
}
function buildQueryKey({
  queryKey,
  defaultOrderDir,
  defaultOrderBy,
  queryParams
}, sortDescriptor, searchQuery = "") {
  if (!sortDescriptor.orderBy) {
    sortDescriptor.orderBy = defaultOrderBy;
  }
  if (!sortDescriptor.orderDir) {
    sortDescriptor.orderDir = defaultOrderDir;
  }
  return [...queryKey, sortDescriptor, searchQuery, queryParams];
}
function useInfiniteData(props) {
  var _a, _b, _c, _d;
  const {
    initialPage,
    endpoint,
    defaultOrderBy,
    defaultOrderDir,
    queryParams,
    paginate,
    transformResponse,
    willSortOrFilter = false
  } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    orderBy: defaultOrderBy,
    orderDir: defaultOrderDir
  });
  const queryKey = buildQueryKey(props, sortDescriptor, searchQuery);
  const initialQueryKey = useRef(hashKey(queryKey)).current;
  const query = useInfiniteQuery({
    placeholderData: willSortOrFilter ? keepPreviousData : void 0,
    queryKey,
    queryFn: ({ pageParam, signal }) => {
      const params = {
        ...queryParams,
        perPage: (initialPage == null ? void 0 : initialPage.per_page) || (queryParams == null ? void 0 : queryParams.perPage),
        query: (queryParams == null ? void 0 : queryParams.query) ?? searchQuery,
        paginate,
        ...sortDescriptor
      };
      if (paginate === "cursor") {
        params.cursor = pageParam;
      } else {
        params.page = pageParam || 1;
      }
      return fetchData(endpoint, params, transformResponse, signal);
    },
    initialPageParam: paginate === "cursor" ? "" : 1,
    getNextPageParam: (lastResponse) => {
      if (!hasNextPage(lastResponse.pagination)) {
        return null;
      }
      if ("next_cursor" in lastResponse.pagination) {
        return lastResponse.pagination.next_cursor;
      }
      return lastResponse.pagination.current_page + 1;
    },
    initialData: () => {
      if (!initialPage || hashKey(queryKey) !== initialQueryKey) {
        return void 0;
      }
      return {
        pageParams: [void 0, 1],
        pages: [{ pagination: initialPage }]
      };
    }
  });
  const items = useMemo(() => {
    var _a2;
    return ((_a2 = query.data) == null ? void 0 : _a2.pages.flatMap((p) => p.pagination.data)) || [];
  }, [(_a = query.data) == null ? void 0 : _a.pages]);
  const firstPage = (_b = query.data) == null ? void 0 : _b.pages[0].pagination;
  const totalItems = firstPage && "total" in firstPage && firstPage.total ? firstPage.total : null;
  return {
    ...query,
    items,
    totalItems,
    noResults: ((_d = (_c = query.data) == null ? void 0 : _c.pages) == null ? void 0 : _d[0].pagination.data.length) === 0,
    // can't use "isRefetching", it's true for some reason when changing sorting or filters
    isReloading: query.isFetching && !query.isFetchingNextPage && query.isPlaceholderData,
    sortDescriptor,
    setSortDescriptor,
    searchQuery,
    setSearchQuery
  };
}
async function fetchData(endpoint, params, transformResponse, signal) {
  if (params.query) {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return apiClient.get(endpoint, { params, signal: params.query ? signal : void 0 }).then((r) => {
    if (transformResponse) {
      return transformResponse(r.data);
    }
    return r.data;
  });
}
function useTicketReplies(ticketId, initialPage) {
  return useInfiniteData({
    queryKey: ["tickets", `${ticketId}`, "replies"],
    endpoint: `tickets/${ticketId}/replies`,
    initialPage
  });
}
function getCustomerLink(userId, { absolute, tab } = {}) {
  if (!tab) {
    tab = "tickets";
  }
  let link = `/agent/users/${userId}/${tab}`;
  if (absolute) {
    link = `${getBootstrapData().settings.base_url}${link}`;
  }
  return link;
}
function useOpenReplyEditor() {
  const { data } = useTicket();
  return useCallback(() => {
    if (!data)
      return;
    if (data.draft) {
      ticketPageStore().updateActiveDraft({
        ...data.draft,
        isDirty: false
      });
    }
    ticketPageStore().setEditorIsOpen(true);
  }, [data]);
}
function useDeleteDraft({ clearTicketCache = true } = {}) {
  const { ticketId } = useParams();
  const { updateActiveDraft, discardActiveDraft } = useTicketPageStore();
  return useMutation({
    mutationFn: (payload) => {
      updateActiveDraft({ isSaving: true });
      return deleteDraft(payload);
    },
    onSuccess: async () => {
      discardActiveDraft();
      if (clearTicketCache) {
        await queryClient.invalidateQueries({
          queryKey: ["tickets", `${ticketId}`]
        });
      }
    },
    onError: (err) => showHttpErrorToast(err),
    onSettled: () => updateActiveDraft({ isSaving: false })
  });
}
function deleteDraft(payload) {
  return apiClient.delete(`replies/${payload.id}`).then((r) => r.data);
}
function ReplyListDraftActions({ draft }) {
  const openEditor = useOpenReplyEditor();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        size: "2xs",
        className: "ml-14",
        onClick: () => openEditor(),
        children: /* @__PURE__ */ jsx(Trans, { message: "Edit" })
      }
    ),
    /* @__PURE__ */ jsx(DeleteDraftButton, { draft })
  ] });
}
function DeleteDraftButton({ draft }) {
  return /* @__PURE__ */ jsxs(DialogTrigger, { type: "modal", children: [
    /* @__PURE__ */ jsx(Button, { variant: "outline", size: "2xs", className: "ml-6", children: /* @__PURE__ */ jsx(Trans, { message: "Discard" }) }),
    /* @__PURE__ */ jsx(DeleteDraftDialog, { draft })
  ] });
}
function DeleteDraftDialog({ draft }) {
  const deleteDraft2 = useDeleteDraft();
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx(
    ConfirmationDialog,
    {
      isDanger: true,
      title: /* @__PURE__ */ jsx(Trans, { message: "Discard draft" }),
      body: /* @__PURE__ */ jsx(Trans, { message: "Are you sure you want to discard this draft?" }),
      confirm: /* @__PURE__ */ jsx(Trans, { message: "Discard" }),
      onConfirm: () => deleteDraft2.mutate({ id: draft.id }, { onSuccess: close }),
      isLoading: deleteDraft2.isPending
    }
  );
}
const replyDateFormat = {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric"
};
function TicketReplyLayout({
  reply,
  isInitial,
  actions,
  attachments,
  className
}) {
  const bodyRef = useRef(null);
  useEffect(() => {
    if (bodyRef.current) {
      highlightAllCode(bodyRef.current);
    }
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "flex items-start gap-20 border-x-2 border-t border-x-transparent py-24",
        reply.type === "drafts" && "border-l-primary",
        reply.type === "notes" && "border-l-warning bg-warning/6",
        className
      ),
      children: [
        reply.user && /* @__PURE__ */ jsx(
          Link,
          {
            to: getCustomerLink(reply.user.id),
            className: "flex-shrink-0 max-md:hidden",
            target: "_blank",
            children: /* @__PURE__ */ jsx(UserAvatar, { user: reply.user, size: "w-50 h-50", circle: true })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-auto", children: [
          /* @__PURE__ */ jsx(ReplyHeader, { reply, isInitial, actions }),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: bodyRef,
              className: "ticket-reply-body mr-24 text-sm",
              dangerouslySetInnerHTML: { __html: reply.body }
            }
          ),
          attachments
        ] })
      ]
    }
  );
}
function ReplyHeader({ reply, isInitial, actions }) {
  var _a, _b;
  const { user: currentUser } = useAuth();
  return /* @__PURE__ */ jsxs("div", { className: "mb-14 flex items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "font-medium", children: ((_a = reply.user) == null ? void 0 : _a.id) === (currentUser == null ? void 0 : currentUser.id) ? /* @__PURE__ */ jsx(Trans, { message: "You" }) : (_b = reply.user) == null ? void 0 : _b.display_name }),
    /* @__PURE__ */ jsx("div", { className: "ml-4", children: /* @__PURE__ */ jsx(ReplySuffix, { reply, isInitial }) }),
    /* @__PURE__ */ jsx("div", { className: "ml-auto mr-4 flex-shrink-0 text-xs text-muted", children: /* @__PURE__ */ jsx(FormattedDate, { date: reply.created_at, options: replyDateFormat }) }),
    actions
  ] });
}
function ReplySuffix({ reply, isInitial }) {
  switch (reply.type) {
    case "drafts":
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: /* @__PURE__ */ jsx(Trans, { message: "created a draft" }) }),
        /* @__PURE__ */ jsx(ReplyListDraftActions, { draft: reply })
      ] });
    case "notes":
      return /* @__PURE__ */ jsx("span", { className: "text-warning", children: /* @__PURE__ */ jsx(Trans, { message: "left a note" }) });
    case "replies":
      if (isInitial) {
        return /* @__PURE__ */ jsx("span", { className: "text-muted max-md:hidden", children: /* @__PURE__ */ jsx(Trans, { message: "started the conversaion" }) });
      }
      return /* @__PURE__ */ jsx("span", { className: "text-muted", children: /* @__PURE__ */ jsx(Trans, { message: "replied" }) });
  }
}
function useUpdateTicket(ticketId, form) {
  return useMutation({
    mutationFn: (payload) => updateTicket(ticketId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: (err) => form ? onFormQueryError(err, form) : showHttpErrorToast(err)
  });
}
function updateTicket(ticketId, payload) {
  return apiClient.put(`tickets/${ticketId}`, payload).then((r) => r.data);
}
const TicketHeaderDateFormat = {
  month: "short",
  day: "numeric"
};
function TicketHeaderLayout({ ticket, actions, children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-12 px-20 py-14 max-md:flex-col md:items-center", children: [
    /* @__PURE__ */ jsx(EditableSubject, { ticket }),
    children,
    /* @__PURE__ */ jsx("div", { className: "mr-24 max-md:hidden" }),
    /* @__PURE__ */ jsxs("div", { className: "whitespace-nowrap text-muted md:ml-auto", children: [
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
    actions
  ] }) });
}
function EditableSubject({ ticket }) {
  const [isEditing, setIsEditing] = useState(false);
  const [subjectSize, setSubjectSize] = useState(null);
  const { trans } = useTrans();
  const h1Ref = useRef(null);
  const form = useForm({
    defaultValues: { subject: ticket.subject }
  });
  const updateTicket2 = useUpdateTicket(ticket.id, form);
  const watchedSubject = form.watch("subject");
  const titlePlaceholder = trans({ message: "Subject" });
  useEffect(() => {
    if (h1Ref.current) {
      const observer = new ResizeObserver((entries) => {
        if (entries[0].contentRect.width > 0) {
          setSubjectSize({
            width: entries[0].contentRect.width,
            height: entries[0].contentRect.height
          });
        }
      });
      observer.observe(h1Ref.current);
      return () => observer.disconnect();
    }
  }, []);
  const onSubmit = () => {
    setIsEditing(false);
    if (form.getValues("subject") === ticket.subject) {
      return;
    }
    updateTicket2.mutate(
      { subject: form.getValues("subject") },
      { onSuccess: () => toast(trans({ message: "Subject updated" })) }
    );
  };
  if (isEditing) {
    return /* @__PURE__ */ jsx(Form, { form, onSubmit: () => onSubmit(), children: /* @__PURE__ */ jsx(
      FormTextField,
      {
        placeholder: titlePlaceholder,
        autoFocus: true,
        onBlur: () => onSubmit(),
        name: "subject",
        size: "sm",
        style: {
          width: subjectSize ? `${subjectSize.width}px` : void 0,
          height: subjectSize ? `${subjectSize.height}px` : void 0
        },
        required: true
      }
    ) });
  }
  return /* @__PURE__ */ jsx(
    "h1",
    {
      ref: h1Ref,
      tabIndex: 0,
      onClick: () => setIsEditing(true),
      onFocus: () => setIsEditing(true),
      className: clsx(
        "cursor-pointer rounded text-2xl hover:bg-primary/focus",
        !watchedSubject && "text-muted"
      ),
      children: /* @__PURE__ */ jsx(Tooltip, { label: /* @__PURE__ */ jsx(Trans, { message: "Edit subject" }), children: /* @__PURE__ */ jsx("span", { children: watchedSubject || titlePlaceholder }) })
    }
  );
}
function TicketTagList({
  ticket,
  onRemoveTag,
  tagType,
  size = "xs",
  ...chipListProps
}) {
  var _a, _b;
  if (!((_a = ticket.tags) == null ? void 0 : _a.length))
    return null;
  return /* @__PURE__ */ jsx(ChipList, { ...chipListProps, size, selectable: !!onRemoveTag, children: (_b = ticket.tags) == null ? void 0 : _b.filter((t) => t.type !== "status" && (!tagType || t.type === tagType)).map((tag) => /* @__PURE__ */ jsx(
    Chip,
    {
      onRemove: onRemoveTag ? () => onRemoveTag(tag) : void 0,
      children: tag.display_name
    },
    tag.id
  )) });
}
function SendReplyButton({
  isLoading,
  onSubmit
}) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "flat",
      color: "primary",
      radius: "rounded-none",
      disabled: isLoading,
      onClick: () => onSubmit == null ? void 0 : onSubmit(),
      children: /* @__PURE__ */ jsx(Trans, { message: "Send reply" })
    }
  );
}
function useCreateTicket(form) {
  return useMutation({
    mutationFn: (payload) => createTicket(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast(message("Ticket created"));
    },
    onError: (err) => onFormQueryError(err, form)
  });
}
function createTicket(payload) {
  return apiClient.post(`tickets`, payload).then((r) => r.data);
}
export {
  InfiniteScrollSentinel as I,
  SendReplyButton as S,
  TicketReplyLayout as T,
  UserAvatar as U,
  useTickets as a,
  useTicketPageStore as b,
  useTicketReplies as c,
  useOpenReplyEditor as d,
  TicketHeaderLayout as e,
  TicketTagList as f,
  useInfiniteData as g,
  useUpdateTicket as h,
  getCustomerLink as i,
  useDeleteDraft as j,
  defaultDraftValues as k,
  useCreateTicket as l,
  TicketHeaderDateFormat as m,
  ticketPageStore as t,
  useChangeTicketStatus as u
};
//# sourceMappingURL=use-create-ticket-dedcd6c5.mjs.map
