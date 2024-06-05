import fetchApi from '.';
import { useChatsStore } from '../store/chats';

export const getChatByInboxId = (inboxId?: string) =>
	fetchApi({
		path: `/chats/${inboxId}`,
		method: 'GET',
	}).then((res) =>
		res.json().then((x) => {
			useChatsStore.getState().setData(x);
			return x;
		})
	);

export const editChatByInboxId = (inboxId: string, body: any) =>
	fetchApi({
		path: `/chats/${inboxId}`,
		method: 'PUT',
		body: JSON.stringify(body),
	}).then((res) => res.json());
