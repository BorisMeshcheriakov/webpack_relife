import React from 'react';
import cn from 'classnames';

import { useCheckoutData, usePromocode } from 'library/hooks/cart';

import st from './Checkout.module.scss';

import { images } from 'resources/images/cart';

type Props = {
	checkoutData: any;
};

const Checkout: React.FC<Props> = ({ checkoutData }) => {
	const { amount, discount, final, loadingStatus } = useCheckoutData();
	const { code, setCode, status, apply } = usePromocode();

	return (
		<div className={st.checkout}>
			{!checkoutData.isPartner && (
				<div className={st.checkout__promo}>
					<div className={st.row}>
						<div className={cn(st.wrapper, status === 'error' && st.error)}>
							<label htmlFor="promo">Промокод</label>
							<input
								id="promo"
								type="text"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								placeholder="Введите промокод"
								disabled={status === 'loading'}
							/>
						</div>

						<button
							type="button"
							className={st.checkout__applyPromo}
							onClick={apply}
							disabled={status === 'loading'}
						>
							Применить
						</button>
					</div>
					<img className={st.banksLogo} src={images.bank} alt="" />
				</div>
			)}
			<div className={st.checkout__summary}>
				<div className={st.row}>
					<span>{`Товаров (${checkoutData.items.length}) на сумму:`}</span>
					<span>{amount / 100} ₽</span>
				</div>

				<div className={cn(st.row, st.discount)}>
					<span>{checkoutData.isPartner ? 'Партнерская скидка:' : 'Скидка по промокоду:'} </span>
					<span>{discount / 100} ₽</span>
				</div>

				<span className={cn(st.row, st.delivery)}>Доставка оплачивается при получении</span>

				<div className={cn(st.pay)}>
					<span>Итог:</span>
					<span>{final / 100}₽</span>
				</div>

				<button
					className={st.checkout__pay}
					type="submit"
					disabled={loadingStatus !== 'loaded' || status !== 'idle'}
				>
					{checkoutData.isPartner ? 'Оформить' : 'Оплатить'}
				</button>
			</div>
		</div>
	);
};

export default Checkout;
