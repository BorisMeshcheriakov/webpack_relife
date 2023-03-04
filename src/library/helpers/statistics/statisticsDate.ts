import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Mode } from 'library/types/statistics';
import { startCase } from 'lodash';

export const getCurrentDayDate = (date?: Date) => {
	return format(date ? date : new Date(), 'yyyy-MM-dd');
};

export const getCurrentMonthDate = (date?: Date) => {
	return format(date ? date : new Date(), 'yyyy-MM');
};

export const getCurrentYearDate = (date?: Date) => {
	return format(date ? date : new Date(), 'yyyy');
};

export const getStatisticsDate = (date: string, tab: Mode) => {
	return format(parseISO(date), tab === 'year' ? 'yyyy' : 'LLLL yyyy', { locale: ru });
};

export const getStatisticsCardDate = (date: string, tab: Mode) => {
	return tab === 'year'
		? startCase(format(parseISO(date), 'LLLL', { locale: ru }))
		: format(parseISO(date), 'dd.MM.yyyy');
};

