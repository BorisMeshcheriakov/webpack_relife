import React from 'react';

import st from './VisitorCounter.module.scss';

type Props = {
	text: string;
	number: number;
};

const VisitorCounter: React.FC<Props> = ({ text, number }) => {
	return (
		<div className={st.counter}>
			<span className={st.text}>{text}</span>
			<span className={st.number}>{number}</span>
		</div>
	);
};

export default VisitorCounter;
