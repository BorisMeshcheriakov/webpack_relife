import React from 'react';

import { useOrder } from 'library/hooks/shop';

import { ModalLarge, Button } from 'library/components/common';
import { Product, Status } from 'library/components/shop';

import Information from './frames/Information/index';

import st from './ModalOrder.module.scss';

const ModalOrder: React.FC = () => {
	const order = useOrder();

	return (
		<ModalLarge isOpen close={order.closeModal} title="Информация о заказе">
			{!!order.order?.id && (
				<>
					<div className={st.status}>
						<Status order={order.order} />
					</div>
					<div className={st.container}>
						<span className={st.id}>ID {order.order.short_id}</span>
						<div className={st.products}>
							{order.order.items.map((item: any) => (
								<Product product={item} />
							))}
						</div>
						<Information order={order.order} />

						{(order.order.status === 'F' || order.order.status === 'A') && (
							<div className={st.buttons}>
								<Button handler={order.repeatPayment}>Оплатить заказ</Button>
							</div>
						)}
					</div>
				</>
			)}
		</ModalLarge>
	);
};

export default ModalOrder;
