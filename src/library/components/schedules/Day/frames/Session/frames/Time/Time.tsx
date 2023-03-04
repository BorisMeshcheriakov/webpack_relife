import React from 'react';
import cn from 'classnames';
import { format, getMinutes } from 'date-fns';
import { Part, Overlap, isNow } from 'library/helpers/schedules';

import st from './Time.module.scss';

type Props = {
	start: Date;
	part: Part;
	overlap: Overlap;
};

const Time: React.FC<Props> = ({ start, part, overlap }) => {
	const scroll = React.useRef<any>(null);

	const showTime = () => {
		return part === Part.start || part === Part.single || overlap === Overlap.top;
	};

	const isTransparent = () => {
		return showTime() && getMinutes(start) === 30 && part !== Part.start;
	};

	React.useEffect(() => {
		if (isNow(start) || format(start, 'HH:mm') === '09:00')
			scroll.current && scroll.current.scrollIntoView();
	}, [scroll, start]);

	return (
		<div
			ref={scroll}
			className={cn(st.time, isTransparent() && st.transparent, isNow(start) && st.active)}
		>
			{showTime() && format(start, 'HH:mm')}
		</div>
	);
};

export default Time;
