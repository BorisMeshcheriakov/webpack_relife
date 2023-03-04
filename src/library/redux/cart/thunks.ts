import { createAsyncThunk } from '@reduxjs/toolkit';
import { BasketOrder, Order } from 'library/models/shop';

import { shopService } from 'library/api/shopService';

import { openNotifyModal, openDialogModal } from 'library/redux/modal';
import { openCart } from 'library/redux/cart';
import { AxiosError } from 'axios';
import { RootState } from 'core/redux/store';

export const getCart = createAsyncThunk<BasketOrder, void, {}>(
	'cart/load',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await shopService.getCart();
			if (!response.data) {
				throw new Error('Не удалось загрузить корзину');
			}
			return response.data;
		} catch (error) {
			return rejectWithValue('Не удалось загрузить корзину');
		}
	}
);

export const addToCart = createAsyncThunk<BasketOrder, { count: number; storageitem: number }, {}>(
	'cart/add',
	async (data: { count: number; storageitem: number }, { rejectWithValue, dispatch }) => {
		try {
			const response = await shopService.addToCart(data);

			if (!response.data) {
				throw response;
			}

			dispatch(
				openDialogModal({
					title: 'Товар добавлен',
					text: 'Товар успешно добавлен в корзину',
					confirmText: 'Перейти в корзину',
					confirm: () => dispatch(openCart()),
					declineText: 'Продолжить выбор',
				})
			);
			return response.data;
		} catch (error) {
			const err = error as AxiosError;
			dispatch(
				openNotifyModal({
					title: 'Ошибка',
					text:
						err.response?.status === 400
							? 'Выбрано несоответствующее количество товара'
							: 'Неизвестная ошибка',
					confirmText: 'Ок',
				})
			);
			return rejectWithValue(error);
		}
	}
);

export const removeFromCart = createAsyncThunk<BasketOrder, string, {}>(
	'cart/delete',
	async (id, { rejectWithValue }) => {
		try {
			await shopService.deleteFromCart(id);
			const response = await shopService.getCart();
			return response.data;
		} catch (error) {
			return rejectWithValue('Не удалось удалить товар');
		}
	}
);

export const saveOrder = createAsyncThunk<Order, any, {}>(
	'order/save',
	async (data, { getState, rejectWithValue }) => {
		try {
			const state = getState() as RootState;
			const response = await shopService.saveOrder(data, state.cart.data.id);
			return response.data;
		} catch (error) {
			return rejectWithValue('Не удалось сохранить корзину');
		}
	}
);
