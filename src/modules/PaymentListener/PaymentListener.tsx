import { FC, useEffect } from 'react';

import st from './PaymentListener.module.scss';

const PaymentListener: FC = () => {
	useEffect(() => {
		window.parent.postMessage(
			{ source: 'paymentModal', payload: { redirect: window.location.pathname } },
			'*'
		);
	}, []);

	return (
		<div className={st.payment}>
			<div className={st.spinner} />
		</div>
	);
};

export default PaymentListener;
