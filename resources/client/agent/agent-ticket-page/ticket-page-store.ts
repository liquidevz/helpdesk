import {create} from 'zustand';
import {FileEntry} from '@common/uploads/file-entry';

export interface ActiveDraft {
  id?: number;
  body?: string;
  attachments: FileEntry[];
  isDirty: boolean;
  isSaving: boolean;
}

export interface TicketPageStore {
  editorIsOpen: boolean;
  setEditorIsOpen: (value: boolean) => void;
  ticketIsSaving: boolean;
  setTicketIsSaving: (value: boolean) => void;
  activeDraft: ActiveDraft;
  updateActiveDraft: (value: Partial<ActiveDraft>) => void;
  discardActiveDraft: () => void;
}

export const defaultDraftValues: ActiveDraft = {
  isDirty: false,
  isSaving: false,
  body: undefined,
  attachments: [],
};

export const useTicketPageStore = create<TicketPageStore>()(set => ({
  editorIsOpen: false,
  setEditorIsOpen: value => set(s => ({editorIsOpen: value})),
  ticketIsSaving: false,
  setTicketIsSaving: value => set(s => ({ticketIsSaving: value})),
  activeDraft: defaultDraftValues,
  updateActiveDraft: value =>
    set(s => {
      const isDirty = !isBodyEmpty(value.body) || !!value.attachments?.length;
      return {
        activeDraft: {
          ...s.activeDraft,
          isDirty,
          ...value,
        },
      };
    }),
  discardActiveDraft: () =>
    set(() => ({
      activeDraft: defaultDraftValues,
    })),
}));

export function ticketPageStore() {
  return useTicketPageStore.getState();
}

function isBodyEmpty(body: string | undefined): boolean {
  if (!body) return true;
  return body.trim() === '<p></p>' || !body.trim();
}
