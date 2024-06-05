export type TInboxes = {
	isGroup: boolean;
	isRead: boolean;
	lastChatTime: number;
	name: string;
	lastChat: string;
	sender: string;
	id: string;
};

export type TChatItem = {
	chat: string;
	sender: string;
	senderColor?: string;
	isNewMessage: boolean;
	time: number;
	bubbleColor?: string;
};

export type TChat = {
	[x: string]: TChatItem[];
};

export type TChats = {
	id: string;
	name: string;
	isGroup: boolean;
	inboxesId: string;
	totalParticipants: number;
	chats: TChat;
};
