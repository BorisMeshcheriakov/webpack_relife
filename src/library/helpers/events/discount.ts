import { add, isFuture, isPast, parseISO } from 'date-fns';
import { Discount } from 'library/models/events';
import { getDate, getDateStrict } from './dateSets';
import { numberWithSeparator } from 'library/helpers/common/strings';

export const currentDiscount = (discounts: Discount[]) => {
	return (
		discounts &&
		discounts.find(
			({ discount_from, discount_to }) =>
				isPast(parseISO(discount_from)) && isFuture(add(parseISO(discount_to), { days: 1 }))
		)
	);
};

export const getDiscountCard = (discount: Discount[], cost: number | string) => {
	if (discount) {
		const discountObj = currentDiscount(discount);
		return discountObj
			? `${numberWithSeparator(discountObj?.discount_cost)} руб (до ${getDate(
					discountObj?.discount_to
			  )})`
			: `${numberWithSeparator(cost)} руб`;
	} else return `${numberWithSeparator(cost)} руб`;
};

export const getDiscountEvent = (discounts: Discount[], cost: number | string) => {
	let priceBasic = `${numberWithSeparator(cost)} ₽`;
	let priceSale = '';
	let duration = '';
	if (discounts) {
		const discountObj = currentDiscount(discounts);
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		discountObj
			? ((priceSale = `${numberWithSeparator(discountObj?.discount_cost)} ₽`),
			  (duration += `До ${getDateStrict(discountObj.discount_to)}`))
			: (priceBasic = `${numberWithSeparator(cost)} ₽`);
	}
	return { priceBasic, priceSale, duration };
};
