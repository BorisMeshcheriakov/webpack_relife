import React from 'react';
import { format, parse } from 'date-fns';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

import { ClientList } from 'library/models/clients';

import { clientService } from 'library/api/clientService';
import { useAppDispatch } from '../common';
import { showPopup } from 'library/redux/modal';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface ClientForm {
	photo: File | string;
	last_name: string;
	first_name: string;
	middle_name: string;
	birth_date: Date;
	gender: string;
	phone: string;
	email: string;
}

const schema = yup
	.object({
		last_name: yup.string().required('Необходимо заполнить фамилию'),
		first_name: yup.string().required('Необходимо заполнить имя'),
		phone: yup.string().required('Необходимо заполнить телефон'),
		email: yup.string().required('Необходимо заполнить e-mail'),
		photo: yup.mixed().required(),
	})
	.required();

interface Props {
	client?: ClientList | null;
	onSuccess?: (data: ClientList) => void;
}

const useClientForm = ({ client, onSuccess }: Props) => {
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		control,
		setError,
		formState: { errors },
		reset,
	} = useForm<ClientForm>({
		defaultValues: {
			gender: 'm',
			last_name: '',
			first_name: '',
			middle_name: '',
			phone: '',
			email: '',
		},
		resolver: yupResolver(schema),
	});

	const createFormData = (data: ClientForm) => {
		const clientData = new FormData();
		if (data.photo instanceof File) clientData.append('photo', data.photo);

		if (!client) clientData.append('phone', data.phone);

		clientData.append('last_name', data.last_name);
		clientData.append('first_name', data.first_name);
		clientData.append('middle_name', data.middle_name);
		clientData.append('gender', data.gender);
		clientData.append('birth_date', format(data.birth_date, 'yyyy-MM-dd'));
		clientData.append('email', data.email);
		return clientData;
	};

	const submit = async (data: ClientForm) => {
		let message: string = '';
		try {
			const formData = createFormData(data);
			let clientData: ClientList;
			if (client) {
				const response = await clientService.updateClient(client.id, formData);
				clientData = { ...response.data };

				message = 'обновлен';
				if (!response.data) {
					message = 'обновить';
					throw response;
				}
			} else {
				const response = await clientService.createClient(formData);
				clientData = { ...response.data };
				message = 'создан';
				if (!response.data) {
					message = 'создать';
					throw response;
				}
			}

			onSuccess && onSuccess(clientData);
			dispatch(showPopup({ type: 'success', text: `Клиент успешно ${message}` }));
		} catch (error) {
			let err = error as AxiosError;
			if (err.response?.status === 400) {
				let errorMessages = { ...err.response.data };
				for (const message in errorMessages) {
					if (Object.prototype.hasOwnProperty.call(errorMessages, message)) {
						const text = { message: errorMessages[message][0] };
						setError(message as any, text);
					}
				}
			}

			dispatch(showPopup({ type: 'error', text: `Не удалось ${message} клиента` }));
		}
	};

	React.useEffect(() => {
		if (client) {
			/** Телефон клиента приходит, как массив из строк (вероятно баг)
			 * 	Исправляем кавычки, чтобы спарсить массив, как JSON строку
			 * */

			let phone: string[] = [];
			try {
				phone = JSON.parse(client.phone.replace(/"/g, "'").replace(/'/g, '"'));
			} catch (error) {
				console.error(error);
			}

			// заполняем форму данными клиента
			reset({
				photo: client.photo,
				last_name: client.last_name,
				first_name: client.first_name,
				middle_name: client.middle_name,
				gender: client.gender,
				birth_date: parse(client.birth_date, 'yyyy-MM-dd', new Date()),
				phone: phone.length ? phone[0] : '',
				email: client.email,
			});
		}
	}, [client, reset]);

	return {
		register,
		handleSubmit,
		control,
		errors,
		submit,
	};
};

export default useClientForm;
