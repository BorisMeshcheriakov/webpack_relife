import { Title } from 'library/types/statistics';

export const getStatisticsTitle = (title: Title) => {
	switch (title) {
		case 'programs':
			return 'Продано видео программ';
		case 'events':
			return 'Проведено мероприятий';
		case 'consultations':
			return 'Проведено консультаций';
		case 'orders':
			return 'Продано товаров с исп. моего промокода';
		case 'tickets':
			return ' Продано билетов';
	}
};

export const getStatisticsTitleNull = (title: Title) => {
	switch (title) {
		case 'programs':
			return 'За выбранный период вы не продали ни одной видео программы';
		case 'events':
			return 'За выбранный период вы не провели ни одного мероприятия';
		case 'consultations':
			return 'За выбранный период вы не провели ни одной консультации';
		case 'orders':
			return 'За выбранный период вы не продали ни одного товара';
		case 'tickets':
			return 'За выбранный период вы не продали ни одного билета';
	}
};

export const wordOfNum = (number: number, words: string[]) => {
	return words[
		number % 100 > 4 && number % 100 < 20
			? 2
			: [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
	];
};
