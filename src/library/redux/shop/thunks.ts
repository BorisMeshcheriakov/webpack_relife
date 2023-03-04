import { createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';
import { RootState } from 'core/redux/store';

import { shopService } from 'library/api/shopService';

import { ProductResponse, OrderResponse } from 'library/models/shop';

export const getProducts = createAsyncThunk<ProductResponse, void, { state: RootState }>(
	'shop/products',
	async (_, { getState, rejectWithValue }) => {
		const { productsPage, search } = getState().shop;

		try {
			const params = queryString.stringify({
				page: productsPage === null ? undefined : productsPage,
				search: search === '' ? undefined : search,
			});
			const response = await shopService.getProducts(params);
			if (!response.data) {
				throw new Error('error loading products');
			}
			return response.data;
		} catch (error) {
			return rejectWithValue('error loading products');
		}
	}
);

export const getOrders = createAsyncThunk<OrderResponse, void, { state: RootState }>(
	'shop/orders',
	async (_, { getState, rejectWithValue }) => {
		const { ordersPage, search } = getState().shop;

		try {
			const params = queryString.stringify({
				page: ordersPage === null ? undefined : ordersPage,
				search: search === '' ? undefined : search,
			});
			const response = await shopService.getOrders(params);

			if (!response.data) {
				throw new Error('error loading orders');
			}
			return response.data;
		} catch (error) {
			return rejectWithValue('error loading orders');
		}
	}
);
