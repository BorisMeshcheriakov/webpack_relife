import { DeliveryMetadata } from 'library/types/delivery';
import { CdekCity, CDEKPickupPoint } from './delivery';

export interface StorageItem {
	id: number;
	product: Product;
	attributevalue: [
		{
			attribute: { id: number; title: string; type: string };
			id: number;
			value: { id: number; title: string; code?: string };
		}
	];
	count: number;
}

export interface Product {
	id: string;
	title: string;
	description: string;
	promo_image: string;
	attribute_values: any[];
	current_price: number;
	partner_price: { partner_amount: number; partner_reward: number } | null;
	images: any[];
	presentation: string;
	product_video: string;
}

export interface ProductRequest {
	page: number;
	search: string;
}

export interface ProductResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Product[];
}

export interface Transaction {
	uid: string;
	amount: number;
	status: ['n', 'p', 'o', 's', 'f'] | string;
	checked: boolean;
	metadata: string;
	created: string;
	modified: string;
}

export interface OrderProduct {
	current_price: number;
	id: number;
	promo_image: string;
	title: string;
}
export interface OrderItem {
	id: string;
	created_at: string;
	updated_at: string;
	metadata: string;
	price: number;
	count: number;
	product: OrderProduct;
	storage: StorageItem[];
	storageitem: number;
	partner_price: {
		partner_amount: number;
	};
}

export interface BasketItem {
	id: string;
	created_at: string;
	updated_at: string;
	metadata: string;
	price: number;
	count: number;
	storageitem: StorageItem;
	partner_price: {
		partner_amount: number;
	};
	storage: StorageItem[];
}

export interface Order {
	id: string;
	items: any[];
	transaction: Transaction;
	user: any;
	original_amount: number | null;
	time_before_deletion?: string;
	short_id?: string;
	created_at?: string;
	updated_at?: string;
	status?: string;
	stored_items?: string;
	full_name: string | null;
	phone: string | null;
	email: string | null;
	carrier?: string;
	city?: string | CdekCity;
	pickup_point?: CDEKPickupPoint;
	source_point_cdek?: number;
	cdek_uid?: string;
	cdek_order_metadata?: string;
	cdek_status?: string;
	delivery_metadata?: DeliveryMetadata;
	zip_code?: string;
	street?: string;
	house?: string;
	apartment?: string;
	amount: number;
	is_basket?: boolean;
	status_change_datetime?: string;
	inner_id?: number;
	promocode?: number;
	pk?: string;
}

export interface BasketOrder {
	id: string;
	items: BasketItem[];
	created_at: string;
	updated_at: string;
	status: ['N', 'A', 'O', 'P', 'D', 'S', 'F', 'R', '1'];
	full_name: string | null;
	phone: string | null;
	email: string | null;
	carrier: ['P', 'C', 'S'] | null;
	city: string | null;
	pickup_point?: CDEKPickupPoint;
	source_point_cdek: string | null;
	cdek_uid: string | null;
	cdek_order_metadata: string;
	cdek_status: string | null;
	delivery_metadata: DeliveryMetadata;
	zip_code: string | null;
	street: string | null;
	house: string | null;
	apartment: string | null;
	amount: number;
	is_basket: boolean;
	status_change_datetime: string;
	inner_id: number;
	rasa_notif: boolean;
	transaction: number | null;
	user: number;
	promocode: number | null;
}

export interface OrderResponse {
	count: 0;
	next: null | string;
	previous: null | string;
	results: Order[];
}

export interface Cart {
	id: string;
	full_name: '';
	items: Item[];
	email: string;
	phone: string;
	pickup_point: number;
	amount: number;
}

export interface Item {
	count: number;
	id: string;
	storageitem: StorageItem;
	partner_price: { partner_amount: number; partner_reward: number };
}

export interface Color {
	code: string;
	id: number;
	title: string;
}

export interface Option {
	id: number;
	title: string;
}

export interface Size {
	code: string;
	id: number;
	title: string;
}

// export interface DetailAttribute {
// 	id: number;
// 	title: string;
// 	type: string;
// 	storage_variations: Color[] | Option[] | string[] | Size[];
// }

export interface SelectableOption {
	id: number;
	title: string;
	code?: string;
}

export interface DetailAttribute {
	id: number;
	is_main: boolean;
	required: boolean;
	title: string;
	type: string;
	storage_variations: SelectableOption[] | string[] | number[];
}

export interface DetailImage {
	id: number;
	url: string;
}

export interface DetailPrice {
	amount: number;
	author: null;
	created_at: string;
	id: number;
	partner_amount: number;
	partner_reward: number;
	product: number;
}

export interface DetailVideo {
	author: number;
	code: string;
	created: string;
	folder: number;
	id: number;
	metadata: null;
	modified: string;
	player_code: string;
	screenshot_url: string;
	status_code: string;
	status_info: string;
	title: string;
}

interface Attribute {
	id: number;
	title: string;
	type: string;
}

// interface AttributeValue {
// 	id: number;
// 	attribute: Attribute;
// 	value: Color | Option | Size;
// }

interface AttributeValue {
	id: number;
	attribute: {
		id: number;
		title: string;
		type: string;
	};
	value: {
		code?: string;
		id: number;
		title: string;
	};
}
export interface DetailStorageItem {
	attributevalue: AttributeValue[];
	count: number;
	id: number;
	product: number;
}

export interface Table {
	group: number;
	id: number;
	title: string;
	table: (string | null)[][];
}
export interface ProductDetail {
	attributes: DetailAttribute[];
	author: null;
	avialable: boolean;
	created_at: string;
	description: string;
	secondary_description: string;
	id: number;
	images: DetailImage[];
	order: number;
	package_height: number;
	package_width: number;
	package_length: number;
	package_weight: number;
	presentation: string;
	price: string;
	product_group: { id: number; tables: Table[] };
	product_price: DetailPrice[];
	product_video: DetailVideo;
	promo_image: string;
	section: number[];
	storageitem: DetailStorageItem[];
	tag: number[];
	title: string;
	updated_at: string;
	warranty: string;
}

export interface BuyResponse {
	redirect_url: string;
}
