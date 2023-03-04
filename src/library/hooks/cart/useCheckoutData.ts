import { selectAmount, selectCartItems, selectCartStatus } from 'library/redux/cart';
import { useAppSelector } from '../common';
import { useModulePermissions } from '../module';

const useCheckoutData = () => {
	const items = useAppSelector(selectCartItems);
	const cartAmount = useAppSelector(selectAmount);
	const { modulePermissions } = useModulePermissions();
	const status = useAppSelector(selectCartStatus);

	const isPartner = () => {
		const permissions = modulePermissions.getPermissions('store');
		return permissions?.indexOf('can_sell') !== -1;
	};

	const amount = () => {
		// считаем стоимость всех товаров для обычного покупателя

		let amount = 0;
		if (items && items.length) {
			for (const item of items) {
				const price = item.buyer_price;
				const count = item.count;
				amount += price * count;
			}
		}
		return amount;
	};

	const partnerAmount = () => {
		// считаем стоимость всех товаров для партнера
		let amount = 0;
		if (items && items.length) {
			for (const item of items) {
				if (item.partner_price) {
					const price = item.partner_price;
					const count = item.count;
					amount += price * count;
				}
			}
		}
		return amount;
	};

	const discount = () => {
		// рассчитываем скидку, если есть
		if (isPartner()) {
			return amount() - partnerAmount();
		}

		return amount() - cartAmount;
	};

	const finalAmount = () => {
		if (isPartner()) {
			return partnerAmount();
		}

		return cartAmount;
	};

	return {
		amount: amount(),
		discount: discount(),
		final: finalAmount(),
		loadingStatus: status,
	};
};

export default useCheckoutData;
