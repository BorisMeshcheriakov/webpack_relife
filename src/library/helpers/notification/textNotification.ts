import { Notification } from 'library/models/notifications';

import { icons } from 'resources/icons/notifications';

export const getTitle = (notification: Notification) => {
	switch (notification.type) {
		case 'R':
			return 'Для вас есть новая рекомендация';

		case 'SA':
			return 'Специалист изменил запись на консультацию';

		case 'ST':
			return 'Клиент изменил запись на консультацию';

		case 'OR':
			return 'Информация о статусе заказа';

		case 'CL':
			return 'Вы записаны на приём';

		case 'CС':
			return 'У вас назначена личная консультация';

		case 'B':
			return 'Уведомление от системы reLife';

		case 'W':
			return 'Запись на вебинар';

		case 'A':
			return 'Получен ответ от специалиста';

		case 'Q':
			return 'Получен вопрос от клиента';

		case 'P':
			return 'Информация о статусе платежа';

		default:
			return 'Уведомление от системы reLife';
	}
};

export const getIcon = (notification: Notification) => {
	switch (notification.type) {
		case 'R':
			return icons.video;

		case 'SA':
			return icons.fil;

		case 'ST':
			return icons.fil;

		case 'OR':
			return icons.shop;

		case 'CL':
			return icons.cons;

		case 'CС':
			return icons.cons;

		case 'B':
			return icons.info;

		case 'W':
			return icons.video;

		case 'A':
			return icons.mesg;
		case 'Q':
			return icons.mesg;

		case 'P':
			return icons.shop;

		default:
			return icons.info;
	}
};
