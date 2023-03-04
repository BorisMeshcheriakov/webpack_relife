import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import xhr from 'core/axios/config';
import { setCookie } from '../../../setupCookie';
import { useAppDispatch } from 'library/hooks/common/reduxTypedHooks';

import { authService } from 'library/api/authService';

import { Register } from 'library/types/auth';
import { RegisterRequest } from 'library/models/auth';

import { getIAm } from 'library/redux/users';
import { getModules } from 'library/redux/common';
import {
	closeAuthModal,
	openDialogModal,
	openNotifyModal,
	toggleFrameModal,
} from 'library/redux/modal';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AxiosError } from 'axios';
import { useAuth } from 'library/components/authentication';
import { useCommonSettings, useWebSettings } from 'library/hooks/common';

const phoneCode = yup.object({
	phonenumber: yup.string().required('Это поле обязательно').min(6, 'Номер слишком короткий'),
	acceptAgreement: yup.bool().oneOf([true], 'Необходимо принять условия'),
});

const schemaCode = yup
	.object({
		passcode: yup.string().required('Это поле обязательно').min(4, 'Минимум 4 символа'),
	})
	.required();

const schemaPassword = yup
	.object({
		password: yup
			.string()
			.required('Это поле обязательно')
			.min(8, 'Пароль не может быть короче 8 символов'),
		passwordRepeat: yup
			.string()
			.required('Это поле обязательно')
			.min(8, 'Пароль не может быть короче 8 символов')
			.matches(/(?!^\d+$)^.+$/, { message: 'Пароль не должен состоять только из цифр' })
			.oneOf([yup.ref('password'), null], 'Пароли не совпали'),
	})
	.required();

const useRegister = (openRestore: () => void) => {
	const authContext = useAuth();
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [step, setStep] = useState<number>(1);
	const [phonenumber, setPhonenumber] = useState<string>('');
	const [passcode, setPasscode] = useState<string>('');
	const [showTimer, setShowTimer] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const { resource_name } = useWebSettings();
	const settings = useCommonSettings();

	// Шаг 1: телефон
	const {
		control: controlPhoneNumber,
		handleSubmit,
		setError: setPhoneError,
		formState: { errors: phoneNumberErrors },
	} = useForm<{ phonenumber: string; acceptAgreement: boolean }>({
		defaultValues: {
			phonenumber: authContext?.state.phone ?? '',
			acceptAgreement: false,
		},
		resolver: yupResolver(phoneCode),
	});

	const registerPhone = async (phonenumber: string) => {
		setIsLoading(true);

		try {
			const dataToSend = {
				phonenumber: `+${phonenumber.replace(/\+/, '')}`,
			};
			await authService.registerPhone(dataToSend).then((response) => {
				setStep(2);
				setShowTimer(true);
				setPhonenumber(phonenumber);
				authContext.dispatch({ type: 'head', payload: 'Подтверждение регистрации' });
			});
		} catch (error) {
			authContext.dispatch({ type: 'phone', payload: phonenumber });
			const err = error as AxiosError;
			if (err.response?.status === 400) {
				if (err.response?.data.message === 'Пользователь с таким номером уже существует!') {
					dispatch(
						openDialogModal({
							title: 'Регистрация',
							text: 'Данный номер уже есть в системе. Восстановить пароль?',
							confirmText: 'Да, восстановить',
							confirm: openRestore,
							declineText: 'Отмена',
							// decline: () => resetPhoneNumber({ phonenumber: '+7' }),
						})
					);
				} else {
					// обработка обычных ошибок с сервиса и вывод под полем //
					let errMessage = JSON.parse(err.response?.data);
					setStep(1);
					setPhoneError('phonenumber', { type: 'manual', message: errMessage.status_text });
				}
			}
		}
		setIsLoading(false);
	};

	const timerAction = () => {
		setShowTimer(false);
	};

	// Шаг 2: код
	const {
		control: controlPassCode,
		handleSubmit: submitCode,
		formState: { errors: passcodeErrors },
		setError,
	} = useForm<{ passcode: string }>({ resolver: yupResolver(schemaCode) });

	const checkCode = async (data: { passcode: string }) => {
		setIsLoading(true);
		try {
			const dataToSend = {
				phonenumber: `+${phonenumber.replace(/\+/, '')}`,
				passcode: data.passcode,
			};

			await authService.checkCode(dataToSend);
			setPasscode(data.passcode);
			setStep(3);
		} catch (error) {
			setError('passcode', {
				type: 'manual',
				message: 'Неверный код или номер телефона',
			});
		}
		setIsLoading(false);
	};

	// Шаг 3: пароль
	const {
		control: passwordControl,
		handleSubmit: submitRegister,
		formState: { errors: passwordErrors },
		setError: setPasswordError,
	} = useForm<Register>({ resolver: yupResolver(schemaPassword) });

	const confirmRegister = async (data: Register) => {
		setIsLoading(true);
		try {
			const dataToSend: RegisterRequest = {
				phonenumber: `+${phonenumber.replace(/\+/, '')}`,
				passcode: passcode,
				password: data.password,
			};
			const response = await authService.confirmRegister(dataToSend);
			setCookie('token', response.data.token);
			xhr.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
			dispatch(getIAm());
			dispatch(getModules());
			dispatch(closeAuthModal());
			dispatch(
				openNotifyModal({
					title: 'Регистрация успешна',
					text: `Добро пожаловать в систему ${resource_name}. Для завершения регистрации необходимо заполнить данные профиля.`,
					confirmText: 'Далее',
				})
			);
		} catch (error) {
			console.error(error);
			const err = error as AxiosError;
			if (err.response?.status === 400) {
				let message = err.response.data['password'][0] ?? '';
				if (message === 'This password is too common.') {
					message = 'Пароль слишком простой';
				}
				setPasswordError('password', {
					type: 'manual',
					message: message,
				});
			}
		}
		setIsLoading(false);
	};

	const openAgreement = () => {
		// return window.open(`${settings.platform_domain}/media/site_files/agreement.pdf`);

		return dispatch(
			toggleFrameModal({ isOpen: true, url: `${settings.platform_domain}/agreement/` })
		);
	};

	return {
		isLoading,
		registerPhone,
		controlPhoneNumber,
		controlPassCode,
		Controller,
		phoneNumberErrors,
		handleSubmit,
		step,
		checkCode,
		passcodeErrors,
		passwordControl,
		submitCode,
		passwordErrors,
		submitRegister,
		confirmRegister,
		showTimer,
		timerAction,
		phonenumber,
		setShowPassword,
		showPassword,
		openAgreement,
	};
};

export default useRegister;
