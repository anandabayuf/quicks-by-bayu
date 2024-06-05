import { API_BASE_URL } from './config';

type fetchApiPayload = {
	path: string;
	method: string;
	body?: BodyInit;
};

const fetchApi = ({ path, body, method }: fetchApiPayload) =>
	fetch(`${API_BASE_URL}${path}`, {
		body,
		method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});

export default fetchApi;
