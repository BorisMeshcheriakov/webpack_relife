export interface Timezone {
	id: number;
	title: string;
}

export interface Country {
	id: number;
	title: string;
}

export interface Region {
	id: number;
	title: string;
	code: number;
}

export interface CdekCity {
	id: number;
	region: Region;
	country: Country;
	timezone: Timezone;
	title: string;
	code: number;
	sub_region: string;
	latitude: string;
	longitude: string;
	payment_limit: string;
}

export interface CityList {
	count: number;
	next: string;
	previous: string;
	results: CdekCity[];
}

export interface CDEKGetPoints {
	point_code: number;
}

export interface CDEKPickupPoint {
	id: number;
	point_code: number;
	latitude: string;
	longitude: string;
	address: string;
	work_time: string;
	code: string;
	city: CdekCity;
	point_type: string;
	phone: string;
}

export interface CalcError {
	code: string;
	message: string;
}

export interface CDEKCalc {
	from_location: number;
	to_location: number;
	order: string;
	delivery_type?: number;
	tariff_code?: number;
	delivery_sum: number;
	period_max?: number;
	period_min?: number;
	total_sum?: number;
	errors?: CalcError[];
}
