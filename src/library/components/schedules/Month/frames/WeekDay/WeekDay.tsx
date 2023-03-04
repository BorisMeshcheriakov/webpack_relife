import { format } from 'date-fns';
import React from 'react';
import ru from 'date-fns/locale/ru';

type Props = {
	day: Date;
};

const WeekDay: React.FC<Props> = ({ day }) => {
	return <>{format(day, 'EEEEEE', { locale: ru })}</>;
};

export default WeekDay;
