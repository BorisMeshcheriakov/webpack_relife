import { wordOfNum } from 'library/helpers/statistics/statisticsTitle';
import { Statistics } from 'library/models/statistics';
import { Mode } from 'library/types/statistics';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const useStatisticsTooltip = (tab: Mode) => {
	const titleModal = useParams<{ tab: string }>();
	const [showToolTip, setShowToolTip] = useState<boolean>(false);
	const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });
	const [payload, setPayload] = useState<Statistics>({ count: 0, amount: 0, date: '', month: '' });

	const getTooltipTitle = (title = '', count: number) => {
		switch (title) {
			case 'events':
				return wordOfNum(count, ['мероприятие', 'мероприятия', 'мероприятий']);
			case 'programs':
				return wordOfNum(count, ['видео программа', 'видео программы', 'видео программ']);
			case 'consultations':
				return wordOfNum(count, ['консультация', 'консультации', 'консультаций']);
			case 'orders':
				return wordOfNum(count, ['товар', 'товара', 'товаров']);
		}
	};

	return {
		showToolTip,
		setShowToolTip,
		payload,
		setPayload,
		coordinate,
		setCoordinate,
		tab,
		getTooltipTitle,
		titleModal: titleModal.tab,
	};
};

export default useStatisticsTooltip;
