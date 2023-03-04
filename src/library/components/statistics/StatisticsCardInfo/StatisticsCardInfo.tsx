import { getStatisticsCardDate } from 'library/helpers/statistics/statisticsDate';
import { Statistics } from 'library/models/statistics';
import { Mode } from 'library/types/statistics';
import { FC, memo } from 'react';
import StatisticsAmount from '../StatisticsAmount';

import st from './StatisticsCardInfo.module.scss';

interface Props {
	statistics: Statistics;
	tab: Mode;
}

const StatisticsCardInfo: FC<Props> = ({ statistics, tab }) => {
	return (
		<div className={st.card} key={statistics.date}>
			<div className={st.description}>
				<div className={st.date}>
					{getStatisticsCardDate(statistics.date ?? statistics.month, tab)}
				</div>
				<div className={st.count}>{statistics.count}</div>
			</div>

			<div className={st.amount}>
				<StatisticsAmount amount={statistics.amount} size="small" />
			</div>
		</div>
	);
};

export default memo(StatisticsCardInfo);
