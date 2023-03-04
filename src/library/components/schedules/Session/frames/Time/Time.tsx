import React from 'react';
import { format } from 'date-fns';
import { Statuses } from 'library/helpers/schedules';

type Props = {
	start: Date;
	status: Statuses;
};

const Time: React.FC<Props> = ({ start, status }) => {
	return (
		<>
			{status !== Statuses.empty &&
				(status !== Statuses.remove ? format(start, 'HH:mm') : 'Отменить')}
		</>
	);
};

export default Time;
