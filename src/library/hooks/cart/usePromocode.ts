import { AxiosError } from 'axios';
import { shopService } from 'library/api/shopService';
import { changeAmount, selectOrderId } from 'library/redux/cart';
import { openNotifyModal } from 'library/redux/modal';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../common';

const usePromocode = () => {
	const dispatch = useAppDispatch();
	const [code, setCode] = React.useState<string>('');
	const [status, setStatus] = React.useState('idle');
	const id = useAppSelector(selectOrderId);

	const apply = async () => {
		let message = '';
		try {
			setStatus('loading');
			const response = await shopService.applyPromo(id, code);
			if (!response.data) {
				throw response;
			}

			message = `Промокод ${code} успешно применен`;
			setStatus('idle');
			dispatch(changeAmount({ amount: response.data.amount }));
		} catch (error) {
			const err = error as AxiosError;

			if (err.response?.data === 'Revoked promocode!') {
				message = `Промокод ${code} устарел`;
			} else {
				message = `Не удалось применить промокод ${code}`;
			}

			setStatus('idle');
		}
		dispatch(
			openNotifyModal({
				title: ``,
				text: message,
				confirmText: 'Ок',
			})
		);
	};
	return {
		code,
		setCode,
		status,
		apply,
	};
};

export default usePromocode;
