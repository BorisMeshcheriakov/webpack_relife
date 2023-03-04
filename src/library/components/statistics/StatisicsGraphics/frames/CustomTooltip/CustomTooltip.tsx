import { format, isValid, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Statistics } from 'library/models/statistics';
import { Mode } from 'library/types/statistics';
import { FC, memo } from 'react';

import st from './CustomTooltip.module.scss';

interface Props {
	payload: Statistics;
	label?: string;
	tab: Mode;
}

const CustomTooltip: FC<Props> = ({ payload, label, tab }) => {
	return (
		<>
			<div className={st.wrap}>
				<p className={st.count}>{`${payload.count} ${label}`}</p>
				<p className={st.date}>
					{isValid(parseISO(payload.date)) &&
						format(parseISO(payload.date), tab === 'year' ? 'LLLL yyyy' : 'd MMMM yyyy', {
							locale: ru,
						})}
				</p>
				<div className={st.triangle} />
			</div>
		</>
	);
};

export default memo(CustomTooltip);
