import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { eventService } from 'library/api/eventService';

import { useEvent, useMyTickets } from 'library/hooks/events';

import * as yup from 'yup';
import { useCertificateMessage } from '../common';
import useWindowDimensions from '../common/useWindowDimensions';

interface BuyTickets {
	ticket: {
		email: string;
		first_name: string;
		last_name: string;
		middle_name: string;
		phone: string;
	}[];
	offer_accepted: boolean;
}

const schema = yup
	.object({
		ticket: yup.array().of(
			yup.object({
				first_name: yup.string().required('Заполните имя'),
				last_name: yup.string().required('Заполните фамилию'),
				phone: yup
					.string()
					.required('Телефон не указан')
					.min(6, 'Телефон слишком короткий')
					.nullable(),
			})
		),
		offer_accepted: yup.boolean().oneOf([true], 'Необходимо принять условия соглашения'),
	})
	.required();

const useBuyTickets = () => {
	const event = useEvent();
	const tickets = useMyTickets();

	const [isCheckoutOpen, setIsCheckoutOpen] = React.useState<boolean>(false);

	const { id } = useParams<{ id: string }>();
	const { push } = useHistory();
	const { width } = useWindowDimensions();
	const showCloseBtn = width <= 1024;
	const { onRedirect } = useCertificateMessage();

	const ticketForm = useForm<BuyTickets>({
		defaultValues: {
			ticket: [
				{
					email: '',
					first_name: '',
					last_name: '',
					phone: '',
				},
			],
			offer_accepted: false,
		},
		resolver: yupResolver(schema),
		// mode: 'onChange',
	});

	const onSubmit = async (data: BuyTickets) => {
		// console.log(data);
		// setIsCheckoutOpen(true);
		try {
			const response = await eventService.buyTickets(id, data);
			if (!response.data) {
				throw response;
			}
			// console.log(response);
			if (response.data.redirect_url) {
				onRedirect(response.data.redirect_url);
			}
		} catch (error) {
			// setIsCheckoutOpen(false);
			// console.log(error);
		}
	};

	const onPaySuccess = () => {
		push(`/events/${id}/tickets`);
	};

	const onClose = () => {
		push(`/events/${id}`);
	};

	const onCheckoutClose = () => {
		setIsCheckoutOpen(false);
	};

	return {
		event,
		tickets,
		errors: { ...ticketForm.formState.errors },
		onClose,
		onSubmit,
		ticketForm,
		isCheckoutOpen,
		onCheckoutClose,
		onPaySuccess,
		showCloseBtn,
	};
};

export default useBuyTickets;
