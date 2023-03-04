import { Coach } from 'library/models/users';
import { ModeCode } from './schedules';

export interface SpecialistsList {
	list: Coach[];
	status: 'idle' | 'loading';
	page: number;
	hasMore: boolean;
}

export interface SpecialistsState {
	mode: ModeCode;
	specialists: SpecialistsList;
	search: string;
}
