import type { RootState } from 'core/redux/store';

export const selectProducts = (state: RootState) => state.shop.products;
export const selectProductsLoading = (state: RootState) => state.shop.productsLoading;
export const selectProductPage = (state: RootState) => state.shop.productsPage;
export const selectProductsLoaded = (state: RootState) => state.shop.allProductsLoaded;

export const selectOrders = (state: RootState) => state.shop.orders;
export const selectOrdersLoading = (state: RootState) => state.shop.ordersLoading;
export const selectOrdersPage = (state: RootState) => state.shop.ordersPage;
export const selectOrdersLoaded = (state: RootState) => state.shop.allOrdersLoaded;

export const selectSearch = (state: RootState) => state.shop.search;
