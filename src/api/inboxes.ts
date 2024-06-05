import fetchApi from '.';

export const getAllInboxes = () =>
	fetchApi({
		path: '/inboxes',
		method: 'GET',
	}).then((res) => res.json());
