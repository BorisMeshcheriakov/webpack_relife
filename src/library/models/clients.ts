import { Program, Tag } from './programs';
import { User } from './users';

export interface ClientProgram {
	completed: false;
	cur_day: number;
	days_period: number;
	end_date: string;
	is_new: boolean;
	is_payed: false;
	program_data: Program;
	recommended_by: number;
	start_date: string;
	program: {
		id: number;
		image: string | null;
		image_thumbnail: string | null;
		promo_image: string | null;
		title: string;
		author: {
			first_name: string;
			last_name: string;
			middle_name: string | null;
			id: number;
		};
	};
}

export interface ClientList {
	birth_date: string;
	email: string;
	first_name: string;
	gender: string;
	id: number;
	instagram?: string;
	last_name: string;
	middle_name?: string;
	phone: string;
	photo?: string;
	programs: ClientProgram[];
	tag: number[];
	user: {
		id: number;
		email: string;
	};
}

export interface NoteRecord {
	id: number;
	order: number;
	text: string;
	image: string;
	note: number;
}

export interface Note {
	pk: number;
	user: number;
	patient: User;
	tags: Tag[];
	noterecord: NoteRecord[];
	created: string;
	modified: string;
}
