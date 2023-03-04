import React from 'react';

import st from './ButtonPay.module.scss';

type Props = any;

const ButtonPay: React.FC<Props> = (props) => {
	return (
		<button className={st.button} {...props}>
			Оплатить
		</button>
	);
};

export default ButtonPay;
