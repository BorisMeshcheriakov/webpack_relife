import React from 'react';
import cn from 'classnames';
import { intervalToDuration, parseISO, startOfDay, endOfDay } from 'date-fns';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';

import { getInitial } from 'library/helpers/user';

import st from './ProgramCard.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';

const ProgramCard = ({
	individual,
	// openProgram
}) => {
	// некоторые программы приходят с битыми/неверными данными, ключ program_data бывает равен null
	const program = JSON.parse(individual.program_data);
	const today = new Date();
	const start = parseISO(individual.start_date);
	const end = parseISO(individual.end_date);
	const current = intervalToDuration({ start: startOfDay(start), end: endOfDay(today) });

	const { url } = useRouteMatch();

	const getAuthorName = () => {
		if (program) {
			const { last_name, first_name, middle_name } = program.author;
			return getInitial(first_name, middle_name, last_name);
		}
	};

	const getStatus = () => {
		if (start > today) {
			return 'upcoming';
		} else if (start < today && today < end) {
			return 'current';
		} else if (today > end) {
			return 'past';
		}
	};

	const getRestDays = () => {
		const { days } = intervalToDuration({ start: startOfDay(today), end: endOfDay(end) });
		return days;
	};

	const getStatusData = () => {
		switch (getStatus()) {
			case 'upcoming':
				return '1';
			case 'current':
				return (
					<div className={st.status__current}>
						<div className={st.status__value}>Кол-во дней</div>
						<div className={st.status__progress}>
							<CircularProgressbarWithChildren
								minValue={0}
								maxValue={program.duration}
								value={current.days}
								styles={buildStyles({
									position: 'absolute',
									textColor: '#f5a623',
									pathColor: '#f5a623',
									trailColor: '#fff',
									backgroundColor: '#f1f2f4',
								})}
							>
								<div style={{ fontSize: 14, color: '#ec8532' }}>{getRestDays()}</div>
							</CircularProgressbarWithChildren>
						</div>
					</div>
				);
			case 'past':
				return (
					<div className={st.status__past}>
						{start.toLocaleDateString() + ' - ' + end.toLocaleDateString()}
					</div>
				);
			default: {
				return '1';
			}
		}
	};

	return (
		<Link to={`${url}/program/${individual.program}`}>
			<div
				className={cn(st.program, program.is_new && st.new, program.is_payed && st.payed)}
				// onClick={() => openProgram(program)}
			>
				<img className={st.image} src={program && program.promo_image} alt="" />
				<div className={st.info}>
					<div className={st.wrapper}>
						<span className={st.title}>{program.title}</span>
					</div>
					<span className={st.author}>{getAuthorName()}</span>
				</div>
				<div className={st.status}>{program && getStatusData()}</div>
			</div>
		</Link>
	);
};

export default ProgramCard;
