import { PayloadAction } from '@reduxjs/toolkit';
import { ProductResponse, OrderResponse } from 'library/models/shop';
import { ShopState } from 'library/types/shop';

export const getProductsPending = (state: ShopState) => {
	state.productsLoading = true;
};

export const getProductsFullfilled = (state: ShopState, action: PayloadAction<ProductResponse>) => {
	if (action.payload?.previous === null) {
		state.products = action.payload.results;
		if (action.payload?.next !== null) {
			state.productsPage = state.productsPage + 1;
		} else {
			state.allProductsLoaded = true;
		}
	} else {
		state.products = [...state.products, ...action.payload?.results];
		if (action.payload?.next !== null) {
			state.productsPage = state.productsPage + 1;
		} else {
			state.allProductsLoaded = true;
		}
	}

	state.productsLoading = false;
};

export const getProductsRejected = (state: ShopState) => {
	state.products = [];
	state.allProductsLoaded = true;
	state.productsPage = 1;
	state.productsLoading = false;
};

export const getOrdersPending = (state: ShopState) => {
	state.ordersLoading = true;
};

export const getOrdersFullfilled = (state: ShopState, action: PayloadAction<OrderResponse>) => {
	if (action.payload.previous === null) {
		state.orders = action.payload.results;
		if (action.payload?.next !== null) {
			state.ordersPage = state.ordersPage + 1;
		} else {
			state.allOrdersLoaded = true;
		}
	} else {
		state.orders = [...state.orders, ...action.payload?.results];
		if (action.payload?.next !== null) {
			state.ordersPage = state.ordersPage + 1;
		} else {
			state.allOrdersLoaded = true;
		}
	}

	state.ordersLoading = false;
};

export const getOrdersRejected = (state: ShopState) => {
	state.orders = [];
	state.allOrdersLoaded = true;
	state.ordersPage = 1;
	state.ordersLoading = false;
};
