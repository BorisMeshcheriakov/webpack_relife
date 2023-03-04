import { StatisticsCard } from 'library/components/statistics';
import { useAppSelector } from 'library/hooks/common';
import { selectStatisticsListMemo } from 'library/redux/statistics';
import { isEqual } from 'lodash';
import { FC, memo } from 'react';

import st from './Main.module.scss';

const Main: FC = () => {
	const statistics = useAppSelector(selectStatisticsListMemo, isEqual);
	return (
		<div className={st.list}>
			<div className={st.wrap}>
				<StatisticsCard statistics={statistics.consultations} />
				<StatisticsCard statistics={statistics.events} />
				<StatisticsCard statistics={statistics.programs} />
				<StatisticsCard statistics={statistics.orders} />
			</div>
		</div>
	);
};

export default memo(Main);
