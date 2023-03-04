import { CommonTag } from './common';
import { Coach, User } from './users';
import { ProgramVideo, SimplePromoVideo } from './video';

export interface Tag {
	pk: number;
	title?: string;
	specialization?: number;
	count?: number;
	order?: number;
}

export interface VideoTag {
	id: number;
	section: {
		id: number;
		title: string;
	};
	title: string;
}

export interface ListResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

export interface Specialization {
	pk: number;
	title: string;
	tags: Tag[];
	order: number;
}

export interface ProgramResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: ProgramList[];
}

export interface Author {
	id: number;
	username: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	email: string;
	photo: string;
	role: string;
	phonenumber: string;
	coach: Coach;
}

export interface ModerationStatus {
	abbr_status: 'A' | 'N' | 'D' | string;
	comment: '';
	id: number;
	moderator: null;
	status: 'Allow' | 'Decline' | 'Need moderation';
	timestamp: string;
}

export interface Recommended {
	id?: number;
	user: User;
}

export interface Individual {
	coach: Coach | null;
	completed: boolean;
	days_period: number | null;
	duration_days: number;
	end_date: string | null;
	id?: number;
	is_new: boolean;
	is_payed?: boolean;
	program: any;
	program_data: { duration: number };
	program_hash: null;
	recommended_by: Recommended | null;
	start_date: string | null;
	timestamp: string | null;
	transaction: number | null;
	recommendation_comment: string | null;
}

export interface ProgramList {
	description: string;
	favorite: boolean;
	cost: number;
	cost_coach: number;
	image: string;
	pk: number;
	moderation_status: ModerationStatus;
	promo_video: number;
	promo_image: string;
	published: boolean;
	title: string;
	age_from: number;
	age_to: number;
	is_payed: string;
	individual: Individual | null;
	modified: string;
	specialization: number[];
	tag: number[];
	author: Author;
}

export interface ProgramDay {
	day: number;
	exercises: ProgramVideo[];
}

export interface Program {
	author: Author;
	cost: number;
	description: string;
	excluded_videos_period: number[][];
	moderation_status: ModerationStatus;
	favorite: boolean;
	image: string;
	pk: number;
	promo_image: string;
	published: boolean;
	periodicity: boolean;
	title: string;
	is_payed: boolean;
	transaction_status: string;
	individual: Individual | null;
	duration: number;
	cost_coach: number;
	modified: string;
	age_from: number;
	age_to: number;
	promo_video: SimplePromoVideo | null;
	videos: ProgramVideo[] | ProgramDay[];
	tag: Tag[];
	common_tag: CommonTag[];
}

export interface InviteResponse {
	ID?: number;
	invite?: {
		days: number;
		hashcode: string;
		coach: Coach;
		program: {
			author: Author;
			description: string;
			id: number;
			image: string;
			title: string;
		};
		recommendation_comment: string;
	};
	individualprogram_id?: number;
	message?: string;
	status: string;
}

export interface ProgramAssign {
	program: number | string;
	user: number | string;
	days_period: number;
	recommendation_comment?: string;
}
