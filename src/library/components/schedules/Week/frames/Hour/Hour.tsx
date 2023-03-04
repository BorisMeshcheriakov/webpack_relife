import React from 'react';
import cn from 'classnames';
import { format, parseISO } from 'date-fns';

import { Calendar } from 'library/types/schedules';

import { isNow } from 'library/helpers/schedules';

import st from './Hour.module.scss';

type Props = {
	hour: string;
	calendar: Calendar;
};

const Hour: React.FC<Props> = ({ hour, calendar }) => {
	const scroll = React.useRef<any>(null);

	React.useEffect(() => {
		if (isNow(parseISO(hour)) || format(parseISO(hour), 'HH:mm') === '09:00') {
			scroll.current && scroll.current.scrollIntoView();
		}
	}, [scroll, hour, calendar]);

	return (
		<div ref={scroll} className={cn(st.hour, isNow(parseISO(hour)) && st.active)}>
			{format(parseISO(hour), 'HH:mm')}
		</div>
	);
};

export default Hour;
