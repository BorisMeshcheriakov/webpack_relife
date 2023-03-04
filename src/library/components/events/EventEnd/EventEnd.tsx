import { FC } from 'react';

import cn from 'classnames';
import st from './EventEnd.module.scss';

interface Props {
	size: 'small' | 'large';
}

const EventEnd: FC<Props> = ({ size }) => {
	return (
		<div
			className={cn(
				st.wrapper,
				st.close,
				(size === 'small' && st.small) || (size === 'large' && st.large)
			)}
		>
			<p>Мероприятие завершено</p>
		</div>
	);
};

export default EventEnd;
