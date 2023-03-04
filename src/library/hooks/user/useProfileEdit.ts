import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../common/reduxTypedHooks';
import { setUserData } from 'library/redux/users';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from 'library/helpers/auth';
import useUser from './useUser';
import { usersService } from 'library/api/usersService';

import { openNotifyModal } from 'library/redux/modal';
import { AxiosError } from 'axios';

interface Inputs {
	last_name: string;
	first_name: string;
	middle_name: string;
	email: string;
	image: File;
	phonenumber: string | undefined;
	url: string;
	birth_date: string;
	gender: string;
}

const useProfileEdit = () => {
	const dispatch = useAppDispatch();
	const { push } = useHistory();
	const { state } = useLocation<any>();
	const { user } = useUser();
	const [isDefaultSet, setIsDefaultSet] = React.useState<boolean>(false);
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		control,
		formState: { errors, touchedFields, isSubmitting },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
		defaultValues: {
			last_name: user?.last_name,
			first_name: user?.first_name,
			middle_name: user?.middle_name,
			email: user?.email,
			phonenumber: user?.user?.phonenumber,
			birth_date: user?.birth_date,
			gender: user?.gender,
		},
	});

	const [preview, setPreview] = React.useState<string | ArrayBuffer | null>('');
	// const [isLoading, setIsLoading] = React.useState(false);

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const onSubmit: SubmitHandler<Inputs> = React.useCallback(
		async (data) => {
			// setIsLoading(true);
			const touched = Object.keys(touchedFields);
			let formData: any = { ...data };
			let dataToSave = new FormData();
			let message = '';
			for (const field of touched) {
				dataToSave.append(field, formData[field]);
			}
			formData['birth_date'] !== null && dataToSave.append('birth_date', formData['birth_date']);
			formData['image'].length > 0 && dataToSave.append('photo', formData['image'][0]);

			if (user) {
				const id = user.user?.id ? user.user?.id.toString() : user.id.toString();
				try {
					const response = await usersService.updateMe(id, dataToSave);
					const { data } = response;
					if (!data) {
						throw response;
					}
					dispatch(
						setUserData({
							...user,
							first_name: data.first_name,
							last_name: data.last_name,
							middle_name: data.middle_name,
							photo: data.photo,
							birth_date: data.birth_date,
							gender: data.gender,
							email: data.email,
							user: {
								...user.user,
								photo: data.photo,
								first_name: data.first_name,
								last_name: data.last_name,
								middle_name: data.middle_name,
								birth_date: data.birth_date,
								gender: data.gender,
								email: data.email,
							},
						})
					);
					state?.showError && delete state.showError;
					message = 'Изменения успешно сохранены';
					push('/personal');
				} catch (error) {
					const err = error as AxiosError<{ [index: string]: string[] }>;
					const { data } = { ...err.response };
					if (err.response?.status === 400 && data) {
						for (const message in data) {
							setError(message as any, { type: 'manual', message: data[message][0] });
						}
					}

					message = 'Не удалось сохранить изменения';
				}
			}
			// setIsLoading(false);
			dispatch(
				openNotifyModal({
					title: '',
					text: message,
					confirmText: 'Ок',
				})
			);
		},
		/* eslint-disable-next-line */
		[dispatch, touchedFields, user, state?.showError, setError]
	);

	React.useEffect(() => {
		if (user?.id && !isDefaultSet) {
			setValue('last_name', user.last_name);
			setValue('first_name', user.first_name);
			setValue('middle_name', user.middle_name);
			setValue('email', user.email);
			setValue('phonenumber', user.user?.phonenumber);
			setValue('birth_date', user.birth_date);
			setValue('gender', user.gender);
			setIsDefaultSet(true);
		}
	}, [user, setValue, isDefaultSet]);

	React.useEffect(() => {
		if (isDefaultSet && state?.showError && !isSubmitting && Object.keys(errors).length === 0) {
			setTimeout(() => {
				handleSubmit(onSubmit)();
			}, 500);
		}
	}, [state?.showError, isDefaultSet, handleSubmit, onSubmit, isSubmitting, errors]);

	return {
		user,
		register,
		control,
		onFileChange,
		preview,
		handleSubmit,
		onSubmit,
		errors,
		isLoading: isSubmitting,
		setValue,
	};
};

export default useProfileEdit;
