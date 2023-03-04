import { getCookie } from 'library/helpers/common/cookies';

/**
Метод для подготовки хедеров fetch запроса, пример использования:

export const getProducts = (params) => {
  return myFetch('GET', `/api/v1/store/product/?${params}`);
};
**/

export const myFetch = (method, endPoint, body = null) => {
	let headers = {
		'User-Agent': 'Console app',
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	const token = getCookie('token');
	if (token) {
		headers.Authorization = 'Token ' + token;
	}

	let config = {
		method,
		headers,
		body: body !== null ? JSON.stringify(body) : body,
	};

	//DELETE ничего не возвращает, по этому, парсить нечего
	return method !== 'DELETE'
		? fetch(endPoint, config).then((response) => (response.ok ? response.json() : Promise.reject(response)))
		: fetch(endPoint, config);
};
