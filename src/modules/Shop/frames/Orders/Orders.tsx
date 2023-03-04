import React from 'react';
import useOrders from 'library/hooks/shop/useOrders';

import { OrderCard, Loader, Blank } from 'library/components/shop';

import st from './Orders.module.scss';

const Orders: React.FC = () => {
	const { orders, lastElement, isLoading, search } = useOrders();

	return (
		<div className={st.orders}>
			{isLoading && orders.length === 0 ? (
				<Loader text="Загрузка..." />
			) : (
				orders.map((order) => <OrderCard order={order} key={order.id} />)
			)}

			{!isLoading && orders.length === 0 && search && <Blank text="Заказы не найдны" />}

			{!isLoading && orders.length === 0 && !search && <Blank text="Нет заказов" />}

			<div ref={lastElement} />
		</div>
	);
};

export default Orders;
