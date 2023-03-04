import React from 'react';

import { CommonImage } from 'library/components/common';
import Attribute from '../Attribute';
import useModulePermissions from 'library/hooks/module/useModulePermissions';

import st from './Product.module.scss';

type Props = {
	product: any;
};

const Product: React.FC<Props> = ({ product }) => {
	const { modulePermissions } = useModulePermissions();

	const isPartner = () => {
		const permissions = modulePermissions.getPermissions('store');
		return permissions?.indexOf('can_sell') !== -1;
	};

	const attributes = (product: any) => {
		let storage = [...product.storage];
		let id = product.storageitem;
		let currentProduct = storage.find((product) => product.id === id);
		return currentProduct?.attributevalue;
	};

	const quantity = {
		attribute: {
			title: 'Кол-во',
		},
		value: {
			title: product.count,
		},
	};

	const getPrice = (product: any) => {
		return (
			(!isPartner()
				? product.count * product.product?.current_price
				: product.count * product.partner_price?.partner_amount) / 100
		);
	};

	return (
		<div className={st.root}>
			<CommonImage src={product.product.promo_image} style={st.image} />
			<div className={st.data}>
				<h3 className={st.data__title}>{product.product.title}</h3>
				<div className={st.data__footer}>
					<div className={st.data__attributes}>
						{attributes(product).map((attribute: any) => (
							<Attribute attribute={attribute} />
						))}
						<Attribute attribute={quantity} />
					</div>
					<div className={st.data__price}>{getPrice(product)} ₽</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
