import { useState } from 'react';
import xhr from 'core/axios/config';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { setCookie, clearCookie } from '../../../setupCookie';
import { useAppDispatch } from '../common';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema as schema } from 'library/helpers/auth';

import { AxiosError } from 'axios';

import { authService } from 'library/api/authService';

import { getIAm, clearUserData } from 'library/redux/users';
import { getModules } from 'library/redux/common';
import { closeAuthModal } from 'library/redux/modal';
// import { clearCart } from 'library/redux/cart';
// import { clearShop } from 'library/redux/shop';
// import { resetEvents } from 'library/redux/events';
import { useAuth } from 'library/components/authentication';
// import { reset, setSelectedTab } from 'library/redux/programs';
// import { clearStatistics } from 'library/redux/statistics';
// import { clearNotifications } from 'library/redux/notifications';
// import { clearClients } from 'library/redux/clients';

interface FormValues {
	phonenumber: string;
	password: string;
}

const useLogin = () => {
	const authContext = useAuth();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<FormValues>({ resolver: yupResolver(schema) });
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const { push } = useHistory();

	const clearAppData = () => {
		dispatch(clearUserData());
		// dispatch(clearCart());
		// dispatch(clearShop());
		// dispatch(clearStatistics());
		// dispatch(resetEvents());
		// dispatch(clearNotifications());
		// dispatch(setSelectedTab('Все'));
		// dispatch(clearClients());
	};

	const login = async (data: FormValues) => {
		setIsLoading(true);
		try {
			clearCookie();
			const response = await authService.login({
				...data,
				phonenumber: `+${data.phonenumber.replace(/\+/, '')}`,
			});
			if (!response.data) {
				throw response;
			}
			xhr.defaults.headers.common['Authorization'] = `Token ${response.data.key}`;
			setCookie('token', response.data.key);
			dispatch(getIAm());
			dispatch(getModules());
			dispatch(closeAuthModal());
			// dispatch(clearShop());
			// dispatch(reset());

			// push('/store');
		} catch (error) {
			authContext.dispatch({ type: 'phone', payload: data.phonenumber });
			const err = error as AxiosError;
			if (err.response?.status === 400) {
				setError('phonenumber', {
					type: 'manual',
					message: `Не удалось авторизоваться с текущими данными`,
				});
				setError('password', { type: 'manual' });
			} else {
				window.location.reload();
			}
		}
		setIsLoading(false);
	};

	const logout = async () => {
		setIsLoading(true);
		try {
			await authService.logout();
			clearCookie();
			push('/');
		} catch (error) {}
		clearAppData();
		dispatch(getModules());
		setIsLoading(false);
	};

	return {
		register,
		control,
		Controller,
		isLoading,
		handleSubmit,
		login,
		logout,
		errors,
		showPassword,
		setShowPassword,
	};
};

export default useLogin;
