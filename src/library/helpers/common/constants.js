export const ORDER_STATUSES = {
	n: { title: 'Не оплачен', color: '#F62434' },
	1: { title: 'Обработка', color: '#EC8532' },
	0: { title: 'Отменен', color: '#F62434' },
	A: { title: 'Не оплачен', color: '#F62434' },
	P: { title: 'Обработка', color: '#EC8532' },
	D: { title: 'Выполнен', color: '#55B183' },
	S: { title: 'В пути', color: '#55B183' },
	R: { title: 'Готов', color: '#55B183' },
	L: { title: 'Доставлен', color: '#55B183' },
	F: { title: 'Не оплачен', color: '#F62434' },
	DEFAULT: { title: 'Неизвестный', color: '#F62434' },
};

export const USER_ROLES = {
	GUEST: 'guest',
	SPECIALIST: 'specialist',
	CUSTOMER: 'customer',
};

export const MODULE_ROLES = {
	GUEST: 'view_module',
	SELLER: 'can_sell',
	BUYER: 'can_buy',
};
