import { createSlice } from '@reduxjs/toolkit';

import { ShopState } from 'library/types/shop';

import * as reducers from './reducers';
import * as extraReducers from './extraReducers';
import { getOrders, getProducts } from './thunks';

const initialState: ShopState = {
	products: [],
	productsLoading: false,
	productsPage: 1,
	allProductsLoaded: false,
	orders: [],
	ordersLoading: false,
	ordersPage: 1,
	allOrdersLoaded: false,
	search: '',
};

export const shop = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		search: reducers.search,
		clearShop: reducers.clear,
	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, extraReducers.getProductsPending);
		builder.addCase(getProducts.fulfilled, extraReducers.getProductsFullfilled);
		builder.addCase(getProducts.rejected, extraReducers.getProductsRejected);

		builder.addCase(getOrders.pending, extraReducers.getOrdersPending);
		builder.addCase(getOrders.fulfilled, extraReducers.getOrdersFullfilled);
		builder.addCase(getOrders.rejected, extraReducers.getOrdersRejected);
	},
});

export const { search, clearShop } = shop.actions;

export { getOrders, getProducts } from './thunks';

export {
	selectOrders,
	selectOrdersLoading,
	selectOrdersPage,
	selectOrdersLoaded,
	selectProducts,
	selectProductPage,
	selectProductsLoading,
	selectProductsLoaded,
	selectSearch,
} from './selectors';

export default shop.reducer;
