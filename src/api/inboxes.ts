import fetchApi from '.';
import { useInboxesStore } from '../store';

export const getAllInboxes = () =>
	fetchApi({
		path: '/inboxes',
		method: 'GET',
	}).then((res) =>
		res.json().then((resJson) => {
			useInboxesStore.getState().setData(resJson);
			return resJson;
		})
	);
