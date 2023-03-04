import { Cart, CartState } from 'library/types/cart';
import { PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from 'library/types/cart';
import { CdekCity, CDEKPickupPoint } from 'library/models/delivery';
import { DeliveryMetadata } from 'library/types/delivery';

export const openCart = (state: CartState) => {
	state.isOpen = true;
};

export const closeCart = (state: CartState) => {
	state.isOpen = false;
};

export const clearCart = (state: CartState) => {
	state.data = {} as Cart;
	state.status = 'idle';
};

export const changeItemQuantity = (
	state: CartState,
	action: PayloadAction<{ quantity: string; id: string }>
) => {
	let items: CartItem[] = [];
	if (state.data) {
		items = [...state.data.items];

		let idx = items.findIndex((item) => item.id === action.payload.id);
		items[idx] = { ...items[idx], count: parseInt(action.payload.quantity) };
		state.data.items = [...items];
	}
};

export const changeAmount = (state: CartState, action: PayloadAction<{ amount: number }>) => {
	state.data.amount = action.payload.amount;
};

export const changeCity = (state: CartState, action: PayloadAction<CdekCity>) => {
	state.delivery.city = action.payload;
	state.delivery.point = {} as CDEKPickupPoint;
	state.delivery.metadata = {} as DeliveryMetadata;
};

export const changePoint = (state: CartState, action: PayloadAction<CDEKPickupPoint>) => {
	state.delivery.point = action.payload;
};

export const changeMetadata = (state: CartState, action: PayloadAction<DeliveryMetadata>) => {
	state.delivery.metadata = action.payload;
};

export const changeStatus = (state: CartState, action: PayloadAction<string>) => {
	state.status = action.payload;
};
