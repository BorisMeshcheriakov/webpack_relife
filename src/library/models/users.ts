export interface User {
	id?: number;
	username?: string;
	first_name: string;
	last_name: string;
	middle_name?: string;
	email?: string;
	photo?: string | null;
	phone?: string[];
	birth_date: string;
	gender?: string | null;
	websocket_status?: ['o', 'n', 'b'];
	phonenumber?: string;
}

export interface IAm {
	id: number;
	birth_date: string;
	last_name: string;
	first_name: string;
	middle_name: string;
	email: string;
	is_client: boolean;
	is_coach: boolean;
	user: User;
	photo: string | null;
	username: string;
	phone: string;
	gender: string;
	consultation_cost?: number | null;
	consultation_duration?: string | null;
	consultation_offline_cost?: number | null;
	consultation_offline_duration?: string | null;
	consultation_offline_prepayment?: number | null;
	consultation_prepayment?: number | null;
}

export interface Coach {
	address: { id: number; region: number; city: string; address: string };
	birth_date: string;
	description: string;
	email: string;
	first_name: string;
	gender: string;
	id: number;
	instagram: string;
	last_name: string;
	middle_name: string;
	phone: string[];
	photo: string;
	short_description: string;
	specialization: number[];
	tag: number[];
	experience: number;
	consultation_cost: number;
	consultation_duration: string;
	consultation_offline_cost: number;
	consultation_offline_duration: string;
	reseption_duration: string;
	answers_cost: number;
	is_coach: boolean;
	diplom: [{ id: number; image: string; coach: number }];
	coach_video: string;
	user: User;
}

export interface Region {
	id: number;
	created: string;
	modified: string;
	title: string;
	code: number;
	allow_pickup: boolean;
	country: number;
}
