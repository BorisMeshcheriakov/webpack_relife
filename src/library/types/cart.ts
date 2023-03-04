import { CdekCity, CDEKPickupPoint } from 'library/models/delivery';
import { Item, BasketOrder, Order } from 'library/models/shop';
import { Delivery } from './delivery';

export interface CartValues {
	amount: number;
	carrier?: string;
	id: string;
	full_name: string;
	last_name: string;
	first_name: string;
	middle_name: string;
	phone: string;
	email: string;
	city: CdekCity;
	pickup_point: CDEKPickupPoint;
	items: Item[];
	original_amount?: string;
}
export interface SaveCart {
	full_name?: string;
	phoneNumber?: string;
	email?: string;
	pickup_point?: number;
	carrier?: string;
}

export interface Client {
	last_name: string | null;
	first_name: string | null;
	middle_name: string | null;
	phone: string | null;
	email: string | null;
}

export interface CartState {
	isOpen: boolean;
	data: Cart;
	status: string;
	delivery: Delivery;
	client: Client;
}

export interface UseCart {
	close: () => void;
	items: CartItem[];
	// register: any;
	control: any;
	handleSubmit: any;
	// errors: any;
	selectedCity: CdekCity;
	selectedPoint: CDEKPickupPoint;
	setCity: (city: CdekCity) => void;
	setPoint: (point: CDEKPickupPoint) => void;
	status: string;
}

export interface Attribute {
	id: number;
	type: string;
	title: string;
	value: string;
}

export interface CartItem {
	id: string;
	title: string;
	image: string;
	buyer_price: number;
	partner_price: number | undefined;
	count: number;
	available: number;
	attributes: Attribute[];
}

export interface Cart {
	id: string;
	items: CartItem[];
	amount: number;
}
