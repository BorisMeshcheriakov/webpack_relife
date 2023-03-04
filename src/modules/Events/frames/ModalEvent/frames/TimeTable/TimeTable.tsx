import { FC } from 'react';
import { Day } from 'library/models/events';

import st from './TimeTable.module.scss';

interface Props {
	timeTables: Day[];
}

const TimeTable: FC<Props> = (timeTables) => {
	return (
		<div className={st.wrapper}>
			<p className={st.title}>Расписание</p>

			{timeTables.timeTables.map((timeTable, index) => (
				<div className={st.timeTable} key={timeTable.date}>
					<div className={st.stage}>
						<p className={st.stage__index}>{index + 1}</p>
						<p className={st.stage__name}>Этап</p>
					</div>

					<div className={st.timeframe}>
						<p className={st.date}>{timeTable.date}</p>
						<p className={st.time}>{`c ${timeTable.time_from} до ${timeTable.time_to}`}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default TimeTable;
