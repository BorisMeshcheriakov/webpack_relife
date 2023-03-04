import { addDays, addMonths, addWeeks, subDays, subMonths, subWeeks } from 'date-fns';
import { Mode, Tab } from 'library/types/schedules';
import { icons } from 'resources/icons/schedules';

export const modes: { [x: string]: Mode } = {
	ON: {
		code: 'ON',
		settingsTitle: 'Онлайн консультация',
		editorTitle: 'Онлайн',
		coachPriceKey: 'consultation_cost',
		coachDurationKey: 'consultation_duration',
		coachPrepaymentKey: 'consultation_prepayment',
		icon: icons.camera,
	},
	OF: {
		code: 'OF',
		settingsTitle: 'Личная встреча',
		editorTitle: 'Личный прием',
		coachPriceKey: 'consultation_offline_cost',
		coachDurationKey: 'consultation_offline_duration',
		coachPrepaymentKey: 'consultation_offline_prepayment',
		icon: icons.house,
	},
};

export const tabs: { [x: string]: Tab } = {
	day: {
		code: 'day',
		title: 'День',
		add: addDays,
		subtract: subDays,
		format: 'dd MMMM yyyy',
	},
	week: {
		code: 'week',
		title: 'Неделя',
		add: addWeeks,
		subtract: subWeeks,
		format: 'LLLL yyyy',
	},
	month: {
		code: 'month',
		title: 'Месяц',
		add: addMonths,
		subtract: subMonths,
		format: 'LLLL yyyy',
	},
};

export const timeFormat = "yyyy-MM-dd'T'HH:mm:ssxxx";

export enum Statuses {
	empty = 'empty',
	busy = 'busy',
	open = 'open',
	create = 'create',
	update = 'update',
	remove = 'remove',
	unconfirmed = 'unconfirmed',
}

export enum Part {
	start = 'top',
	middle = 'middle',
	end = 'bottom',
	single = 'single',
}

export enum Overlap {
	bottom = 'overlap_bottom',
	top = 'overlap_top',
	none = 'overlap_none',
}

export enum ScheduleStatuses {
	cancelled = 'cancelled',
	unconfirmed = 'unconfirmed',
	notPayed = 'notPayed',
	confirmed = 'confirmed',
	assign = 'assign',
	paymentAwaiting = 'paymentAwaiting',
	moving = 'moving',
}

export enum ConsultationStatus {
	cancelled = 'cancelled',
	notPayed = 'notPayed',
	unconfirmed = 'unconfirmed',
}
