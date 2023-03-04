import React from 'react';

import st from './Tickets.module.scss';

type Props = {
	places: number;
	tickets: number;
};

const Tickets: React.FC<Props> = ({ places, tickets }) => {
	return (
		<div className={st.tickets}>
			<span className={st.text}>Осталось билетов</span>
			<span className={st.number}>{!isNaN(places - tickets) && places - tickets}</span>
		</div>
	);
};

export default Tickets;
