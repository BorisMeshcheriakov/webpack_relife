import { createSlice } from '@reduxjs/toolkit';
import { Cart, CartState, Client } from 'library/types/cart';
import * as reducers from './reducers';
import * as extraReducers from './extraReducers';
import * as thunks from './thunks';
import { Delivery } from 'library/types/delivery';

const initialState: CartState = {
	isOpen: false,
	status: 'idle',
	data: {} as Cart,
	delivery: {} as Delivery,
	client: {} as Client,
};

export const cart = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		openCart: reducers.openCart,
		closeCart: reducers.closeCart,
		clearCart: reducers.clearCart,
		changeItemQuantity: reducers.changeItemQuantity,
		changeAmount: reducers.changeAmount,
		changeCity: reducers.changeCity,
		changePoint: reducers.changePoint,
		changeMetadata: reducers.changeMetadata,
		changeStatus: reducers.changeStatus,
	},
	extraReducers: (builder) => {
		builder.addCase(thunks.getCart.pending, extraReducers.getCartPending);
		builder.addCase(thunks.getCart.fulfilled, extraReducers.getCartFullfilled);
		builder.addCase(thunks.getCart.rejected, extraReducers.getCartRejected);

		builder.addCase(thunks.addToCart.pending, extraReducers.addToCartPending);
		builder.addCase(thunks.addToCart.fulfilled, extraReducers.addToCartFullfilled);
		builder.addCase(thunks.addToCart.rejected, extraReducers.addToCartRejected);

		builder.addCase(thunks.removeFromCart.pending, extraReducers.removeFromCartPending);
		builder.addCase(thunks.removeFromCart.fulfilled, extraReducers.removeFromCartFullfilled);
		builder.addCase(thunks.removeFromCart.rejected, extraReducers.removeFromCartRejected);

		builder.addCase(thunks.saveOrder.pending, extraReducers.saveOrderPending);
		builder.addCase(thunks.saveOrder.fulfilled, extraReducers.saveOrderFullfilled);
		builder.addCase(thunks.saveOrder.rejected, extraReducers.saveOrderRejected);
	},
});

export const {
	openCart,
	closeCart,
	clearCart,
	changeItemQuantity,
	changeAmount,
	changeCity,
	changePoint,
	changeMetadata,
	changeStatus,
} = cart.actions;

export * from './selectors';
export * from './thunks';

export default cart.reducer;
