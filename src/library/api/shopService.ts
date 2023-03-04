import xhr from 'core/axios/config';
import { AxiosResponse } from 'axios';

import {
	ProductResponse,
	OrderResponse,
	BasketOrder,
	Order,
	ProductDetail,
	BuyResponse,
} from 'library/models/shop';

const getProducts = async (params: string): Promise<AxiosResponse<ProductResponse>> =>
	xhr.get(`/api/v1/store/product/?${params}`);

const getOrders = async (params: string): Promise<AxiosResponse<OrderResponse>> =>
	xhr.get(`/api/v1/store/order/?${params}`);

const getOrder = async (id: string): Promise<AxiosResponse<Order>> =>
	xhr.get(`/api/v1/store/order/${id}/`);

const cancelOrder = async (id: string): Promise<AxiosResponse<any>> =>
	xhr.delete(`/api/v1/store/order/${id}/`);

const getProduct = async (id: string): Promise<AxiosResponse<ProductDetail>> =>
	xhr.get(`/api/v1/store/product/${id}/`);

const getCart = async (): Promise<AxiosResponse<BasketOrder>> =>
	xhr.get(`/api/v1/store/product/get_basket/`);

const addToCart = async (data: {
	count: number;
	storageitem: number;
}): Promise<AxiosResponse<BasketOrder>> => xhr.post(`/api/v1/store/product/add_to_basket/`, data);

const saveOrder = async (data: any, id: string): Promise<AxiosResponse<Order>> =>
	xhr.patch(`/api/v1/store/order/${id}/`, data);

const deleteFromCart = async (id: string): Promise<AxiosResponse> =>
	xhr.delete(`/api/v1/store/product/${id}/delete_from_basket/`);

const updateBasketItem = async (id: string, quantity: string): Promise<AxiosResponse<Order>> =>
	xhr.patch(`/api/v1/store/product/${id}/update_basket_item/`, { count: quantity });

const buyProduct = async (id: string): Promise<AxiosResponse<BuyResponse>> =>
	xhr.get(`/api/v1/store/product/${id}/buy/`);

const applyPromo = async (id: string, code: string): Promise<AxiosResponse> =>
	xhr.post(`/api/v1/store/order/${id}/apply_promo/`, { code: code });

const getPromo = async (): Promise<AxiosResponse<{ code: string }>> =>
	xhr.get(`/api/v1/store/promocodes/get_promo/`);

const specialBuy = async (id: string): Promise<AxiosResponse> =>
	xhr.get(`/api/v1/store/product/${id}/special_buy/`);

const getStatYear = async (year: string): Promise<AxiosResponse<OrderResponse>> =>
	xhr.get(`/api/v1/store/order/${year}/get_stat_year/`);

const getStatMonth = async (month: string): Promise<AxiosResponse<OrderResponse>> =>
	xhr.get(`/api/v1/store/order/${month}/get_stat_month/`);

const confirmOrderFront = async (orderId: string): Promise<AxiosResponse<any>> =>
	xhr.patch(`/api/v1/store/order/${orderId}/transaction_status/`, { status: 'o' });

export const shopService = {
	getProducts,
	getOrders,
	getOrder,
	cancelOrder,
	getProduct,
	getCart,
	addToCart,
	saveOrder,
	deleteFromCart,
	updateBasketItem,
	buyProduct,
	applyPromo,
	getPromo,
	specialBuy,
	getStatYear,
	getStatMonth,
	confirmOrderFront,
};
