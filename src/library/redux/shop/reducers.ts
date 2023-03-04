import { PayloadAction } from '@reduxjs/toolkit';
import { ShopState } from 'library/types/shop';

export const search = (state: ShopState, action: PayloadAction<string>) => {
	state.search = action.payload;
	state.productsPage = 1;
	state.allProductsLoaded = false;
	state.products = [];

	state.ordersPage = 1;
	state.allOrdersLoaded = false;
	state.orders = [];
};

export const clear = (state: ShopState) => {
	state.products = [];
	state.productsPage = 1;
	state.allProductsLoaded = false;
	state.orders = [];
	state.ordersPage = 1;
	state.allOrdersLoaded = false;
};
