import { BasketOrder } from 'library/models/shop';

const normalizeCart = (order: BasketOrder) => {
	const normalizedCart = {
		id: order.id,
		items: order.items.map((item) => ({
			id: item.id,
			title: item.storageitem.product.title,
			image: item.storageitem.product.promo_image ?? '',
			buyer_price: item.storageitem.product.current_price,
			partner_price: item.storageitem.product.partner_price?.partner_amount,
			partner_reward: item.storageitem.product.partner_price?.partner_reward,
			count: item.count,
			available: item.storageitem.count,
			attributes: item.storageitem.attributevalue.map((value) => ({
				id: value.id,
				type: value.attribute.type,
				title: value.attribute.title,
				value: value.value.code ? value.value.code : value.value.title,
			})),
			attributeIds: item.storageitem.attributevalue.map((value) => value.id),
		})),
		itemIds: order.items.map((item) => item.id),
		amount: order.amount,
		promocode: order.promocode,
	};

	return normalizedCart;
};

export default normalizeCart;
