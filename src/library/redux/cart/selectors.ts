import type { RootState } from 'core/redux/store';

export const selectIsCartOpen = (state: RootState) => state.cart.isOpen;

export const selectOrderId = (state: RootState) => state.cart.data.id;
export const selectCartItems = (state: RootState) => state.cart.data.items;
export const selectItem = (state: RootState, id: string) =>
	state.cart.data.items.find((item) => item.id === id);

export const selectCartStatus = (state: RootState) => state.cart.status;

export const selectAmount = (state: RootState) => state.cart.data.amount;

export const selectClient = (state: RootState) => state.cart.client;

export const selectCity = (state: RootState) => state.cart.delivery.city;
export const selectPoint = (state: RootState) => state.cart.delivery.point;
export const selectMetadata = (state: RootState) => state.cart.delivery.metadata;
