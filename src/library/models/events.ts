import { User } from 'library/models/users';
import { EventDay } from 'library/types/events';
import { PresentationVideo } from './video';

export interface EventAddress {
	id: number;
	image1: string;
	image2: string;
	image3: string;
	city: string;
	street: string;
	house: string;
	unit: string;
	office: string;
	description: string;
	latitude: string;
	longitude: string;
	country: string;
	block: string;
}

export interface Discount {
	id: number;
	discount_cost: number;
	discount_from: string;
	discount_to: string;
}

export interface EventBlock {
	description: string;
	id: number;
	image: string;
	subtitle: string;
	title: string;
}

export interface EventCoach {
	description: string;
	first_name: string;
	id: number;
	last_name: string;
	photo: string;
	second_name: string;
}

export interface Moderator {
	email: string;
	first_name: string;
	id: number;
	last_name: string;
	middle_name: string;
	photo: string;
	role: string;
	username: string;
}

export interface ModerationStatus {
	abbr_status: string;
	id: number;
	moderator: Moderator;
	status: string;
	timestamp: string;
	comment?: string;
}

export interface EventTag {
	title: string;
	pk: number;
}

export interface Day {
	date: string;
	time_from: string;
	time_to: string;
}
export interface Event {
	additional_info: string;
	id: number;
	mode: string;
	address: EventAddress;
	author: User;
	cost: number;
	created: string;
	description: string;
	discount: Discount[];
	email: string;
	event_block: EventBlock[];
	event_coach: EventCoach[];
	event_image: string;
	event_type: string;
	favourite: boolean;
	moderation_status: ModerationStatus;
	modified: string;
	phone: string;
	places: number;
	prepayment_cost: null;
	presentation_image: string;
	presentation_title: string;
	presentation_video: PresentationVideo;
	published: boolean;
	tag: EventTag[];
	time_from: string;
	time_to: string;
	title: string;
	visible: boolean;
	timetable: Day[];
}

export interface TicketDetail {
	id: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	phone: string;
	qrcode: string;
	is_payed: string;
	used: boolean;
	event: Event;
}

export interface TicketsResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: TicketDetail[];
}
