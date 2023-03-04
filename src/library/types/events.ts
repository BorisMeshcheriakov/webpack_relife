import { Event } from 'library/models/events';
import { Tag } from 'library/models/programs';
import { PresentationVideo } from 'library/models/video';

export interface EventState {
	tags: {
		list: Tag[];
		status: string;
	};
	tab: {
		code: string;
		title: string;
		params: { [x: string]: string };
	};
	events: {
		list: Event[];
		page: number | null;
		status: string;
		tags: Tag[];
		search: string;
	};
	event: Event | null;
	share: {
		id: number;
		isOpen: boolean;
	};
}

export interface GetEventResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Event[];
}

export interface Address {
	country: string | null;
	city: string | null;
	description: string | null;
	house: string | null;
	id?: number;
	image1?: FileList | string;
	image2?: FileList | string;
	image3?: FileList | string;
	office: string | null;
	street: string | null;
	unit: string | null;
}

export interface Coach {
	id?: number;
	first_name: string;
	last_name: string;
	middle_name: string;
	photo: FileList | string;
	description: string;
}

export interface Block {
	id?: number;
	description: string;
	image: FileList | string;
	subtitle: string;
	title: string;
}

export interface Discount {
	discount_cost: number | null;
	discount_from: Date | null;
	discount_to: Date | null;
}

export interface EventDay {
	time_from: Date;
	time_from_day?: Date;
	time_to: Date;
}

export interface FormEditor {
	title: string;
	event_image: FileList | string;
	description: string;
	time_from: null | Date;
	time_to: null | Date;
	timetable: EventDay[];
	event_type: string;
	mode: string;
	cost: null | number;
	prepayment_cost?: null | number;
	places: number;
	discount: Discount[];
	presentation_video?: FileList | number;
	event_coach: Coach[];
	event_block: Block[];
	tag?: number[] | Tag[];
	address: Address;
	phone: string;
	email: string;
}
