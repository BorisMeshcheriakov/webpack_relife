import axios from 'axios';
import { clearCookie, getCookie } from '../../setupCookie';
import { clearUserData } from 'library/redux/users';
import { store } from 'core/redux/store';
import { showPopup } from 'library/redux/modal';

axios.defaults.withCredentials = true;

const xhr = axios.create();

const token = getCookie('token');

if (token) {
	xhr.defaults.headers.common['Authorization'] = `Token ${token}`;
}

xhr.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			// console.log('ошибка авторизации');
			clearCookie();
			store.dispatch(clearUserData());
			return (window.location.href = '/');
		}

		if (error.response.status === 502) {
			// console.log('технические работы');
			// delete xhr.defaults.headers.common.Authorization;
			// store.dispatch(clearUserData());
			return (window.location.href = '/technical-service');
		}

		if (error.response?.status === 403) {
			store.dispatch(showPopup({ type: 'error', text: '403: Недостаточно пользовательских прав' }));
			return;
		}

		if (error.response?.status === 500) {
			store.dispatch(showPopup({ type: 'error', text: '500: Неизвестная ошибка' }));
			return;
		}

		return error;
	}
);

export default xhr;
