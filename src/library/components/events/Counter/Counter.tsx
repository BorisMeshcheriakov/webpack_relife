import React from 'react';

import st from './Counter.module.scss';

type Props = {
	quantity: number;
};

const Counter: React.FC<Props> = ({ quantity }) => {
	return (
		<div className={st.counter}>
			<h3 className={st.text}>Мои билеты</h3>
			<span className={st.number}>{quantity}</span>
		</div>
	);
};

export default Counter;
