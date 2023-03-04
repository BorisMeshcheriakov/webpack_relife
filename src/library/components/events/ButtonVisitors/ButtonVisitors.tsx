import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useTickets } from 'library/hooks/events';

import st from './ButtonVisitors.module.scss';

const ButtonVisitors: React.FC = () => {
	const { push } = useHistory();
	const { id, tab } = useParams<{ id: string; tab: string }>();
	const { count } = useTickets();

	const onVisitors = () => {
		push(`/events/${id}/visitors`);
	};

	return (
		<button className={st.visitors} onClick={onVisitors}>
			<div className={st.left}>
				Продано билетов
				<div className={st.dots}>
					<span className={st.dot} />
					<span className={st.dot} />
					<span className={st.dot} />
				</div>
			</div>

			<div className={st.right}>{count}</div>
		</button>
	);
};

export default ButtonVisitors;
