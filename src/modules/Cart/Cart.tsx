import React from 'react';
import cn from 'classnames';
import { FormProvider } from 'react-hook-form';

import { useCart, useCheckout } from 'library/hooks/cart';

import { ModalLarge } from 'library/components/common';
import { Blank } from 'library/components/common';

import { Products, Client, Delivery, Checkout } from './frames';

import st from './Cart.module.scss';

const Cart: React.FC = () => {
	const cart = useCart();
	const checkout = useCheckout();

	return (
		<ModalLarge isOpen close={cart.close} title="Корзина">
			{cart.items.length === 0 && <Blank text="Корзина пуста" />}
			{cart.items.length > 0 && (
				<div className={st.wrapper}>
					<section className={st.products}>
						<Products />
					</section>
					<FormProvider {...cart.methods}>
						<form onSubmit={cart.handleSubmit(checkout.payOrder)}>
							<h2 className={st.subtitle}>Получатель</h2>
							<section className={cn(st.block, st.client)}>
								<Client />
							</section>

							<h2 className={st.subtitle}>Доставка</h2>
							<section className={cn(st.block, st.delivery)}>
								<Delivery control={cart.control} />
							</section>

							<h2 className={st.subtitle}>Оплата</h2>
							<section className={cn(st.block, st.checkout)}>
								<Checkout checkoutData={checkout} />
							</section>
						</form>
					</FormProvider>
				</div>
			)}
		</ModalLarge>
	);
};

export default Cart;
