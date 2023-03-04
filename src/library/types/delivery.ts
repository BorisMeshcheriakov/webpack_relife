import { CdekCity, CDEKPickupPoint } from 'library/models/delivery';

export interface DeliveryMetadata {
	calendar_min: number;
	calendar_max: number;
	currency: string;
	date_delivery_max: string;
	date_delivery_min: string;
	delivery_sum: number;
	period_max: number;
	period_min: number;
	total_sum: number;
	weight_calc: number;
}

export interface Delivery {
	metadata?: DeliveryMetadata;
	city?: CdekCity;
	point?: CDEKPickupPoint;
}
