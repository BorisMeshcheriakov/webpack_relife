import { Discount } from 'library/models/events';
import { parse } from 'date-fns';

const currentCost = (discount: Discount[]): Discount | undefined => {
	const now = new Date();
	const currentDiscount = discount.find(
		(discount) =>
			parse(discount.discount_from, 'yyyy-MM-dd', new Date()) < now &&
			parse(discount.discount_to, 'yyyy-MM-dd', new Date()) > now
	);

	return currentDiscount;
};

export default currentCost;
