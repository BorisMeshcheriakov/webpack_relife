import cn from 'classnames';
import { isEqual, startOfDay, getMonth, getDate } from 'date-fns';

import st from './index.module.scss';

const Day = ({ date, now, start, select, highlight }) => {
	const handleClick = () => {
		!isDayNotInMonth() && hasDaySessions() && select(date);
	};

	const isDayNotInMonth = () => {
		return getMonth(date) !== getMonth(start);
	};

	const hasDaySessions = () => {
		return highlight.findIndex((session) => isEqual(session, date)) !== -1;
	};

	const isNow = () => {
		return isEqual(startOfDay(date), startOfDay(now));
	};

	return (
		<div
			className={cn(
				st.day,
				hasDaySessions() ? st.hasOpen : st.empty,
				isNow() && st.now,
				isDayNotInMonth() && st.hidden
			)}
			onClick={() => handleClick()}
		>
			{hasDaySessions() ? getDate(date) : '--'}
			{/* {format(date, 'dd')} */}
		</div>
	);
};

export default Day;
