import { create } from 'zustand';
import { TChats } from '../api/types';

type ChatsState = {
	data: TChats | null;
};

type ChatsAction = {
	setData: (data: TChats) => void;
};

export const useChatsStore = create<ChatsState & ChatsAction>((set) => ({
	data: null,
	setData: (data) => set({ data }),
}));
