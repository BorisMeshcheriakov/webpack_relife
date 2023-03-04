import React from 'react';
import useModulePermissions from 'library/hooks/module/useModulePermissions';

import st from './index.module.scss';

interface Props {
	quantity: string;
	price: number;
	partnerPrice: number;
}

const Price: React.FC<Props> = ({ price, partnerPrice, quantity }) => {
	const { can_sell } = useModulePermissions();

	const getProductPrice = (price: number, quantity: string): string => {
		const quantityParsed = parseInt(quantity);

		if (quantityParsed && !isNaN(quantityParsed)) {
			if (!can_sell) {
				return `${(price / 100) * quantityParsed} ₽`;
			}

			return `${(partnerPrice / 100) * quantityParsed} ₽`;
		}
		return `0 ₽`;
	};

	return (
		<div className={st.price}>
			<span className={st.price__title}>Стоимость</span>
			<span className={st.price__main}>{getProductPrice(price, quantity)}</span>
		</div>
	);
};

export default Price;
