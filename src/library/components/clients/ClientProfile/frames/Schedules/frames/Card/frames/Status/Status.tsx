import React from 'react';
import cn from 'classnames';

import { Consultation } from 'library/models/schedules';
import { ScheduleStatuses } from 'library/helpers/schedules';

import st from './Status.module.scss';

type Props = {
	consultation: Consultation;
};

const Status: React.FC<Props> = ({ consultation }) => {
	const status = () => {
		let status = ScheduleStatuses.unconfirmed;

		if (consultation.payed.payed) {
			status = ScheduleStatuses.confirmed;
		}

		if (consultation.cancelled) {
			status = ScheduleStatuses.cancelled;
		}
		return status;
	};

	const text = {
		unconfirmed: 'Не подтверждена',
		cancelled: 'Отменена',
		confirmed: '',
	};

	return <div className={cn(st.status, st[status()])}>{text[status()]}</div>;
};

export default Status;
