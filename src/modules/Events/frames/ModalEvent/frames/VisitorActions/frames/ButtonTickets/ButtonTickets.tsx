import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Tickets from './frames/Tickets';
import Counter from './frames/Counter';

import st from './ButtonTickets.module.scss';

type Props = {
	quantity: number;
};

const ButtonTickets: React.FC<Props> = ({ quantity }) => {
	const { push } = useHistory();
	const { id } = useParams<{ id: string }>();

	const openModal = () => push(`/events/${id}/tickets`);

	return (
		<button className={st.button} onClick={openModal}>
			<Tickets />
			<Counter quantity={quantity} />
		</button>
	);
};

export default ButtonTickets;
