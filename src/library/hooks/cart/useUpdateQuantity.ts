import React from 'react';
import { useAppSelector, useAppDispatch } from 'library/hooks/common';
import { selectItem, changeItemQuantity, changeAmount, changeMetadata } from 'library/redux/cart';
import { shopService } from 'library/api/shopService';
import { debounce } from 'lodash';
import { AxiosError } from 'axios';
import { openNotifyModal } from 'library/redux/modal';
import { changeStatus } from 'library/redux/cart';

const useUpdateQuantity = (id: string) => {
	const dispatch = useAppDispatch();
	const item = useAppSelector((state) => selectItem(state, id));
	const [error, setError] = React.useState(false);

	const updateQuantity = async (id: string, value: string) => {
		setError(false);
		dispatch(changeStatus('loading'));

		try {
			const response = await shopService.updateBasketItem(id, value);
			if (!response.data) {
				throw response;
			}
			dispatch(changeAmount({ amount: response.data.amount }));
			dispatch(changeStatus('loaded'));
			if (response.data.delivery_metadata) {
				dispatch(changeMetadata(response.data.delivery_metadata));
			}
		} catch (error) {
			const err = error as AxiosError;
			let message = '';

			if (
				err.response?.status === 400 &&
				err.response?.data[0] === 'Order count more than storage items on store!'
			) {
				message = `Недостаточно товара на складе`;
			} else {
				message = 'Не удалось изменить количество товара';
			}
			dispatch(changeStatus('error'));
			setError(true);
			dispatch(
				openNotifyModal({
					title: 'Ошибка',
					text: message,
					confirmText: 'Ок',
				})
			);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedUpdate = React.useCallback(debounce(updateQuantity, 500), []);

	const handleChange = (value: string) => {
		if (item?.count.toString() !== value) {
			dispatch(changeItemQuantity({ quantity: value, id: id }));
			debouncedUpdate(id, value);
		}
	};

	return {
		count: item ? item.count.toString() : '0',
		handleChange,
		error,
	};
};

export default useUpdateQuantity;
