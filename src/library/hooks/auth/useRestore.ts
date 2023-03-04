import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch } from 'library/hooks/common/reduxTypedHooks';

import { authService } from 'library/api/authService';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { openNotifyModal, closeAuthModal, openDialogModal } from 'library/redux/modal';
import { AxiosError } from 'axios';
import { useAuth } from 'library/components/authentication';
import useLogin from './useLogin';

interface FormValues {
	phonenumber: string;
	backend?: string;
}

interface FormCodeValues {
	first?: string;
	second?: string;
	third?: string;
	fourth?: string;
	code: string;
	password: string;
	passwordRepeat: string;
	backend?: string;
}

const schemaCode = yup
	.object({
		passcode: yup.string().required('Это поле обязательно').min(4, 'Минимум 4 символа'),
	})
	.required();

const schemaPass = yup
	.object({
		password: yup
			.string()
			.required('Это поле обязательно')
			.min(8, 'Пароль не может быть короче 8 символов')
			.matches(/(?!^\d+$)^.+$/, { message: 'Пароль не должен состоять только из цифр' }),
		passwordRepeat: yup
			.string()
			.required('Это поле обязательно')
			.min(8, 'Пароль не может быть короче 8 символов')
			.matches(/(?!^\d+$)^.+$/, { message: 'Пароль не должен состоять только из цифр' })
			.oneOf([yup.ref('password'), null], 'Пароли не совпали'),
	})
	.required();

const useRestore = (openLogin: () => void, openRegister: () => void) => {
	const authContext = useAuth();
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [step, setStep] = useState<number>(1);
	const [phone, setPhone] = useState<string>('');
	const [passcode, setPasscode] = useState<string>('');
	const [showTimer, setShowTimer] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	// Шаг 1: телефон
	const {
		control: controlPhoneNumber,
		handleSubmit,
		setError: setPhoneError,
		formState: { errors: phoneNumberErrors },
	} = useForm<FormValues>({
		defaultValues: {
			phonenumber: authContext?.state.phone ?? '',
		},
	});

	const restore = async (data: FormValues) => {
		setIsLoading(true);

		// удаляем все символы и прибавляем знак + в начале номера
		let phonenumber = `+${data.phonenumber.replace(/\+/, '')}`;
		try {
			await authService.passwordResetRequest({ phonenumber: phonenumber });
			setStep(2);
			setShowTimer(true);
			setPhone(phonenumber);
		} catch (error) {
			authContext.dispatch({ type: 'phone', payload: phonenumber });
			const err = error as AxiosError;
			if (err.response?.status === 400) {
				if (err.response?.data.message === 'Такого номера нет в системе!') {
					dispatch(
						openDialogModal({
							title: 'Восстановление аккаунта',
							text: 'Данного номера нет в системе. Зарегистрироваться?',
							confirmText: 'Зарегистрироваться',
							confirm: openRegister,
							declineText: 'Нет, изменить номер',
							// decline: () => resetPhoneNumber({ phonenumber: '+7' }),
						})
					);
				} else {
					// обработка обычных ошибок с сервиса и вывод под полем //
					let errMessage = err.response?.data.message ?? JSON.parse(err.response?.data);
					setStep(1);
					setPhoneError('phonenumber', {
						type: 'manual',
						message: errMessage.status_text ?? errMessage,
					});
				}
			}
		}
		setIsLoading(false);
	};

	// second form - code

	const {
		control: controlPassCode,
		handleSubmit: handleSubmitCode,
		formState: { errors: passcodeErrors },
		setError,
	} = useForm<{ passcode: string }>({ resolver: yupResolver(schemaCode) });

	const confirmCode = async (data: { passcode: string }) => {
		setIsLoading(true);

		try {
			const codeData = {
				phonenumber: `+${phone.replace(/\+/, '')}`,
				passcode: data.passcode,
			};
			const response = await authService.checkCode(codeData);
			if (!response.data) {
				throw new Error('Неверный код');
			}
			setStep(3);
			setPasscode(data.passcode);
		} catch (error) {
			setError('passcode', {
				type: 'manual',
				message: 'Неверный код или номер телефона',
			});
		}
		setIsLoading(false);
	};

	// third form - code, phone, new password
	const {
		control: passwordControl,
		handleSubmit: handleSubmitPass,
		formState: { errors: errorsPass },
		setError: setPasswordError,
	} = useForm<FormCodeValues>({ resolver: yupResolver(schemaPass) });

	const { login } = useLogin();

	const confirmRestore = async (data: FormCodeValues) => {
		setIsLoading(true);
		try {
			const confirmData = {
				phonenumber: `+${phone.replace(/\+/, '')}`,
				passcode: passcode,
				password: data.password,
			};
			const response = await authService.passwordConfirmRequest(confirmData);
			if (!response.data) {
				throw response;
			}
			dispatch(closeAuthModal());
			login({ phonenumber: `+${phone.replace(/\+/, '')}`, password: data.password });
			dispatch(
				openNotifyModal({
					title: ' Пароль изменен',
					text: 'Ваш пароль успешно изменен',
					confirmText: 'Ок',
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

	const timerAction = () => {
		setShowTimer(false);
	};

	return {
		isLoading,
		Controller,
		handleSubmit,
		restore,
		handleSubmitCode,
		controlPhoneNumber,
		controlPassCode,
		confirmCode,
		showPassword,
		setShowPassword,
		phoneNumberErrors,
		passcodeErrors,
		passwordControl,
		handleSubmitPass,
		confirmRestore,
		step,
		errorsPass,
		showTimer,
		timerAction,
		phone,
	};
};

export default useRestore;
