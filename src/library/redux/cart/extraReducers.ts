import { PayloadAction } from '@reduxjs/toolkit';
import { CartState } from 'library/types/cart';
import { BasketOrder, Order } from 'library/models/shop';

import { normalizeCart, normalizeClient } from 'library/helpers/cart';

export const getCartPending = (state: CartState) => {
	state.status = 'loading';
};

export const getCartFullfilled = (state: CartState, action: PayloadAction<BasketOrder>) => {
	state.data = normalizeCart(action.payload);
	state.client = normalizeClient(action.payload);
	state.delivery.city = action.payload.pickup_point?.city;
	state.delivery.point = action.payload.pickup_point;
	state.delivery.metadata = action.payload.delivery_metadata;
	state.status = 'loaded';
};

export const getCartRejected = (state: CartState) => {
	state.status = 'error';
};

export const addToCartPending = (state: CartState) => {
	state.status = 'loading';
};

export const addToCartFullfilled = (state: CartState, action: PayloadAction<BasketOrder>) => {
	state.data = normalizeCart(action.payload);
	state.delivery.metadata = action.payload.delivery_metadata;
	state.status = 'loaded';
};

export const addToCartRejected = (state: CartState) => {
	state.status = 'error';
};

export const removeFromCartPending = (state: CartState) => {
	state.status = 'loading';
};

export const removeFromCartFullfilled = (state: CartState, action: PayloadAction<BasketOrder>) => {
	state.data = normalizeCart(action.payload);
	state.delivery.metadata = action.payload.delivery_metadata;
	state.status = 'loaded';
};

export const removeFromCartRejected = (state: CartState) => {
	state.status = 'error';
};

export const saveOrderPending = (state: CartState) => {
	state.status = 'loading';
};

export const saveOrderFullfilled = (state: CartState, action: PayloadAction<Order>) => {
	if (action.payload.delivery_metadata?.delivery_sum) {
		state.delivery.metadata = action.payload.delivery_metadata;
	}

	if (!state.delivery.point || state.delivery.point.id !== action.payload.pickup_point?.id) {
		state.delivery.point = action.payload.pickup_point;
	}

	state.client = normalizeClient(action.payload);
	state.status = 'loaded';
};

export const saveOrderRejected = (state: CartState) => {
	state.status = 'error';
};
