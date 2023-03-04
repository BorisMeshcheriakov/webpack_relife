import { Product, Order, DetailImage, DetailVideo } from 'library/models/shop';

export interface ShopState {
	products: Product[];
	productsLoading: boolean;
	productsPage: number;
	allProductsLoaded: Boolean;
	orders: Order[];
	ordersLoading: boolean;
	ordersPage: number;
	allOrdersLoaded: boolean;
	search: string;
}

export interface Media {
	image: string;
	images: DetailImage[];
	video: DetailVideo;
	presentation: string;
}

export interface Price {
	amount: number;
	partner_amount: number;
}

export interface Info {
	title: string;
	description: string;
	secondaryDescription: string;
}
