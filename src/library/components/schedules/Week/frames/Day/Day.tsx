import React from 'react';
import ru from 'date-fns/esm/locale/ru';
import { format, isToday } from 'date-fns';

import st from './Day.module.scss';

type Props = {
	day: Date;
};

const Day: React.FC<Props> = ({ day }) => {
	return (
		<>
			{isToday(day) ? (
				<div className={st.day}>
					{format(day, 'EEEEEE', { locale: ru })}
					<div className={st.day__date}>{format(day, 'dd')}</div>
				</div>
			) : (
				format(day, 'EEEEEE dd', { locale: ru })
			)}
		</>
	);
};

export default Day;
