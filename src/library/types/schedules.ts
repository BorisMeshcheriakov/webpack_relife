import { ScheduleStatuses } from 'library/helpers/schedules';
import {
	CoachAvailablePeriods,
	Consultation,
	OriginSchedule,
	ScheduleAddress,
} from 'library/models/schedules';
import { Coach, User } from 'library/models/users';
import { LoadStatus } from './common';

export interface SchedulesState {
	tab: TabCode;
	consultations: {
		date: Date;
		status: LoadStatus;
		consultations: CoachAvailablePeriods[];
		busy: OriginSchedule[];
		timezone: string;
	};
	editor: {
		date: Date;
		status: LoadStatus;
		mode: ModeCode;
		consultations: CoachAvailablePeriods[];
		busy: OriginSchedule[];
		mock: CoachAvailablePeriods | null;
		timezone: string;
	};
	address: {
		selected: ScheduleAddress | null;
		list: ScheduleAddress[];
		status: LoadStatus;
	};
	activeConsultation: Consultation | null;
	clientConsultations: {
		status: 'loading' | 'idle';
		hasNext: boolean;
		page: number;
		list: Consultation[];
	};
}

export type Calendar = 'consultations' | 'editor';

export type TabCode = 'day' | 'week' | 'month';

export type Tab = {
	code: TabCode;
	title: string;
	add: (date: Date | number, amount: number) => Date;
	subtract: (date: Date | number, amount: number) => Date;
	format: string;
};

export type ModeCode = 'ON' | 'OF';

export type ScheduleType = 'open' | 'busy' | 'consultation';

export type Mode = {
	code: ModeCode;
	settingsTitle: string;
	editorTitle: string;
	coachPriceKey: string;
	coachDurationKey: string;
	coachPrepaymentKey: string;
	icon: string;
};

export type Block = {
	start: Date;
	end: Date;
};

export interface ScheduleUser {
	last_name: string;
	first_name: string;
	middle_name?: string;
	id: number;
	photo?: string;
}

export interface NormalizedSchedule {
	mode: ModeCode[];
	status: ScheduleStatuses;
	date: string;
	time: string;
	duration: string;
	price: string;
	id: number;
	address: string;
}

export interface NormalizedConsultation {
	mode: string;
	status: ScheduleStatuses;
	date: string;
	time: string;
	duration: string;
	price: string;
	id: number;
	user: User | Coach;
	address: string;
}

export interface SessionUpdate {
	id: number;
	status: ModeCode[];
	address: number[];
}

export interface AddressForm {
	city: string;
	street: string;
	house: string;
	apartment: string;
	phone: string;
	note: string;
}
