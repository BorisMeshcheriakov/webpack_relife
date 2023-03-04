import React from 'react';
import { ORDER_STATUSES } from 'library/helpers/common/constants';
import { Order } from 'library/models/shop';

import st from './Status.module.scss';

type Props = {
	order: Order;
};

const Status: React.FC<Props> = ({ order }) => {
	const statuses = { ...ORDER_STATUSES } as any;

	const getStatus = () => {
		const orderStatus = order.status;
		const transactionStatus = order.transaction?.status;

		if (orderStatus === 'A' && transactionStatus === 'o') {
			return 'P';
		}

		return orderStatus ? orderStatus : 'F';
	};

	return (
		<span
			className={st.status}
			style={{ backgroundColor: order.status ? statuses[getStatus()].color : '#FFFFFF' }}
		>
			{order.status ? statuses[getStatus()].title : 'Неизвестен'}
		</span>
	);
};

export default Status;
