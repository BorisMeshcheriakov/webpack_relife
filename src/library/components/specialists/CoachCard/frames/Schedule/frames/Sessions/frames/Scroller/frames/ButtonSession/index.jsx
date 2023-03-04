import React from 'react';
import cn from 'classnames';
import { DateTime } from 'luxon';

import st from './index.module.scss';

const ButtonSession = ({ startTime, handler }) => {
	const isActive = (start, selected) => {
		return start.valueOf() === DateTime.fromISO(selected.start_time).valueOf();
	};

	return (
		<button className={cn(st.session, isActive(startTime) && st.active)} onClick={handler}>
			{startTime.toFormat('HH:mm')}
		</button>
	);
};

export default ButtonSession;
