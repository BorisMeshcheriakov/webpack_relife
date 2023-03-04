import xhr from 'core/axios/config';
import { useAppDispatch } from 'library/hooks/common/reduxTypedHooks';
import { openAuthModal } from 'library/redux/modal';

import st from './index.module.scss';

const ButtonLogin = () => {
	const dispatch = useAppDispatch();

	const login = () => {
		const isWebView = window.navigator.userAgent.toLowerCase().includes('wv');
		if (isWebView) {
			/**
			 * Костыль для перехвата webView нажатия на кнопку логин
			 *
			 * Выполняется фейковый запрос, который нужен только для
			 * открытия окна авторизации в мобильном приложении
			 */

			xhr.get('/open/mobile/login/');
		}

		dispatch(openAuthModal());
	};

	return (
		<button id="login_btn" className={st.login} onClick={login}>
			Войти
		</button>
	);
};

export default ButtonLogin;
