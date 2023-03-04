import { Order } from 'library/models/shop';

const normalizeOrder = (order: Order) => {
	const normalizedOrder = {
		id: order.id,
		items: order.items.map((item) => ({
			id: item.id,
			title: item.product.title,
			image: item.product.promo_image,
			buyer_price: item.product.current_price,
			count: item.count,
		})),
		amount: order.amount,
		original_amount: order.original_amount,
	};

	return normalizedOrder;
};

export default normalizeOrder;
