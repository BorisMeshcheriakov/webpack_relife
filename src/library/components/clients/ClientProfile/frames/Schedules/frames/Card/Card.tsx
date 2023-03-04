import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';
import { parseISO } from 'date-fns';

import { Consultation } from 'library/models/schedules';

import { Icon, Data, Status } from './frames';

import st from './Card.module.scss';

type Props = {
	consultation: Consultation;
};

const Card: React.FC<Props> = ({ consultation }) => {
	const { url } = useRouteMatch();

	const isNow = () => {
		const start = parseISO(consultation.start_time);
		const end = parseISO(consultation.end_time);
		const now = new Date();
		return start <= now && now <= end;
	};

	return (
		<li className={cn(st.consultation, isNow() && st.now)}>
			<Link className={st.consultation__link} to={`${url}/consultation/${consultation.id}`}>
				<section className={st.consultation__icon}>
					<Icon type={consultation.type} />
				</section>
				<section className={st.consultation__data}>
					<Data
						type={consultation.type}
						start={consultation.start_time}
						end={consultation.end_time}
					/>
				</section>
				<section className={st.consultation__status}>
					<Status consultation={consultation} />
				</section>
			</Link>
		</li>
	);
};

export default Card;
