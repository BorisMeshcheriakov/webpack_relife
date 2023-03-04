import { FC } from 'react';
import { currentDiscount, getDiscountEvent } from 'library/helpers/events/discount';
import { Discount } from 'library/models/events';

import st from './EventPrice.module.scss';

interface Props {
	cost: number | string;
	discounts: Discount[];
}

const EventPrice: FC<Props> = ({ cost, discounts }) => {
	const discount = currentDiscount(discounts);
	const price = getDiscountEvent(discounts, cost);
	return (
		<div className={st.wrapper}>
			{discount ? (
				<div className={st.wrapper__sale}>
					<div className={st.wrapper__sale_old}>
						<p className={st.label}>Обычная цена</p>
						<div className={st.border} />
						<p className={st.price}>{price.priceBasic}</p>
					</div>
					<div>
						<p className={st.label}>{price.duration}</p>
						<p className={st.price}>{price.priceSale}</p>
					</div>
				</div>
			) : (
				<div className={st.wrapper__basic}>
					<p className={st.price}>{price.priceBasic}</p>
				</div>
			)}
		</div>
	);
};

export default EventPrice;
