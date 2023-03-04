import cn from 'classnames';
import { useHistory } from 'react-router-dom';

import Portrait from './frames/Portrait';
import Name from './frames/Name';
import Tags from './frames/Tags';
import Type from './frames/Type';
import StartDate from './frames/StartDate';
import Time from './frames/Time';
// import Menu from './frames/Menu';
import Status from './frames/Status';

import st from './index.module.scss';

const ConsultationCard = ({ consultation }) => {
	const history = useHistory();

	const getStatus = (consultation) => {
		let status = '';
		if (consultation.cancelled) {
			status = 'cancelled';
		}

		if (!consultation.payed.payed && consultation.payed.transaction) {
			status = 'payment-unconfirmed';
		}

		if (!consultation.payed.payed && !consultation.payed.transaction) {
			status = 'not-payed';
		}

		if (!consultation.confirmed) {
			status = 'moving';
		}
		return status;
	};

	const getStyle = (status) => {
		switch (status) {
			case 'cancelled':
				return st.red;
			case 'payment-unconfirmed':
				return st.yellow;
			case 'not-payed':
				return st.red;
			case 'moving':
				return st.yellow;
			default:
				break;
		}
	};

	return (
		<div className={cn(st.card, getStyle(getStatus(consultation)))}>
			<section
				className={st.card__portrait}
				onClick={() => history.push(`/schedules/consultation/${consultation.id}`)}
			>
				<Portrait image={consultation.coach.photo} />
			</section>
			<section
				className={st.card__info}
				onClick={() => history.push(`/schedules/consultation/${consultation.id}`)}
			>
				<div className={st.card__coach}>
					<Name coach={consultation.coach} />
					<Tags coach={consultation.coach} />
				</div>
				<div className={st.card__time}>
					<Type type={consultation.type} />
					<StartDate date={consultation.start_time} />
					<Time date={consultation.start_time} />
				</div>
			</section>
			<section className={st.card__menu}>
				{/* <Menu consultation={consultation} /> */}
				<Status status={getStatus(consultation)} />
			</section>
		</div>
	);
};

export default ConsultationCard;
