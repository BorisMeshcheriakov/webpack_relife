import { BasketOrder, Order } from 'library/models/shop';

const normalizeClient = (order: BasketOrder | Order) => {
	const splitName = (name: string | null, part: string) => {
		let nameArr: string[] = [];
		if (!name) {
			return null;
		} else {
			nameArr = name.split(' ');
		}
		let namePart: string | null = null;
		switch (part) {
			case 'last_name':
				namePart = nameArr[0];
				break;
			case 'first_name':
				namePart = nameArr[1];
				break;
			case 'middle_name':
				namePart = nameArr[2];
				break;

			default:
				break;
		}
		return namePart;
	};

	const normalizedClient = {
		last_name: splitName(order.full_name, 'last_name'),
		first_name: splitName(order.full_name, 'first_name'),
		middle_name: splitName(order.full_name, 'middle_name'),
		phone: order.phone,
		email: order.email,
	};

	return normalizedClient;
};

export default normalizeClient;
