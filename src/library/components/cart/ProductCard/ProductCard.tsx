import React from 'react';
import cn from 'classnames';
import { CartItem } from 'library/types/cart';

import { QuantityInput, ButtonCross } from 'library/components/common';

import Attributes from './frames/Attributes';
import Price from './frames/Price';

import { useUpdateQuantity, useRemoveProduct } from 'library/hooks/cart';

import st from './ProductCard.module.scss';

interface Props {
	product: CartItem;
}

const ProductCard: React.FC<Props> = ({ product }) => {
	const { count, handleChange, error } = useUpdateQuantity(product.id);
	const { removeProduct } = useRemoveProduct();

	return (
		<div className={cn(st.card, error && st.error)}>
			<img className={st.card__image} src={product.image} alt="" />
			<section className={st.card__information}>
				<h3 className={st.card__title}>{product.title}</h3>
				<div className={st.card__attributes}>
					<Attributes attributes={product.attributes} />
				</div>

				<div className={st.card__details}>
					<div className={st.card__quantity}>
						<div className={st.card__quantity_title}>Количество:</div>
						<div className={st.card__quantity_input}>
							<QuantityInput
								value={count}
								setValue={handleChange}
								maxQuantity={product.available}
							/>
						</div>
					</div>
					<div className={st.card__available}>
						<div className={st.quantity__text}>Доступно для заказа:</div>
						<div className={st.quantity__number}>{product.available} ед.</div>
					</div>
				</div>
			</section>
			<section className={st.card__price}>
				<Price
					price={product.buyer_price}
					partnerPrice={product.partner_price}
					quantity={product.count}
				/>
			</section>
			<div className={st.card__close}>
				<ButtonCross theme="grey" handler={() => removeProduct(product.id)} />
			</div>
		</div>
	);
};

export default ProductCard;
