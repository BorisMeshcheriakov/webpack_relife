import { ModeCode } from 'library/types/schedules';
import { Coach, User } from './users';

export interface CoachAvailablePeriods {
	id?: number;
	status: ModeCode[];
	start_time: string;
	end_time: string;
	price?: number;
	address: ScheduleAddress[];
	coach?: Coach;
}

export interface MoveRequest {
	flag: boolean;
	initiator: 'C' | 'P' | null;
	schedule: number | null;
	type: string | null;
}

export interface OriginSchedule {
	id: number;
	payment_status: string;
	consultation_cancelled: true;
	start_time: string;
	end_time: string;
	type: ModeCode;
	user: User;
	price: number;
	coach: Coach;
	consultation_id: number;
	changing_time_process: MoveRequest;
	period: CoachAvailablePeriods;
	address: null | ScheduleAddress[];
}

export interface Meeting {
	join_url: string;
	start_url: string;
}

export interface Consultation {
	cancelled: boolean;
	confirmed: boolean;
	payed: {
		transaction: boolean;
		payed: boolean;
	};
	id: number;
	cost: {
		amount: number;
	};
	user: User;
	start_time: string;
	end_time: string;
	type: ModeCode;
	coach: Coach;
	schedule: OriginSchedule;
	meeting: null | Meeting;
}

export interface ScheduleAddress {
	id: number;
	order: number;
	city: string;
	street: string;
	house: string;
	apartment: string;
	phone: string;
	note: string;
	visible: boolean;
	user: number;
}

export interface ChangeTimeRequest {
	start_time: string;
	new_schedule: OriginSchedule;
	origin_schedule: OriginSchedule;
}
