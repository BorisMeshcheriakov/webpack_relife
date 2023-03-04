import React from 'react';

import useModulePermissions from 'library/hooks/module/useModulePermissions';

import st from './Price.module.scss';

interface Props {
	price: number;
	partnerPrice?: number;
	quantity: number;
}
const Price = ({ price, partnerPrice, quantity }: Props) => {
	const { modulePermissions } = useModulePermissions();

	const isPartner = () => {
		const permissions = modulePermissions.getPermissions('store');
		return permissions?.indexOf('can_sell') !== -1;
	};

	const showPrice = (price: number, quantity: number, partnerPrice?: number) => {
		return (isPartner() && partnerPrice ? partnerPrice * quantity : price * quantity) / 100;
	};

	return (
		<div className={st.price}>
			<div className={st.price__main}>{showPrice(price, quantity, partnerPrice)} ₽</div>
		</div>
	);
};

export default Price;
