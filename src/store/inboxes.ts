import { create } from 'zustand';

type InboxesState = {
	selectedInboxesId?: string;
};
type InboxesAction = {
	setSelectedInboxesId: (selectedInboxesId?: string) => void;
};

export const useInboxesStore = create<InboxesState & InboxesAction>((set) => ({
	selectedInboxesId: undefined,
	setSelectedInboxesId: (selectedInboxesId) => set({ selectedInboxesId }),
}));
