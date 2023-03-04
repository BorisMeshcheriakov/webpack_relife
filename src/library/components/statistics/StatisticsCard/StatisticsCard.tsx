import { List } from 'library/types/statistics';
import { FC, memo } from 'react';
import { useStatisticsGraphics } from 'library/hooks/statistics';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'library/hooks/common';
import { selectStatisticsMemo } from 'library/redux/statistics';
import { isEqual } from 'lodash';
import { Loader } from 'library/components/common';
import { getStatisticsTitle } from 'library/helpers/statistics/statisticsTitle';
import { default as StatisticsAmount } from '../StatisticsAmount';
import { default as GraphicsCard } from '../StatisicsGraphics/GraphicsCard';

import st from './StatisticsCard.module.scss';

interface Props {
	statistics: List;
}

const StatisticsCard: FC<Props> = ({ statistics }) => {
	const { tab, date, graph } = useAppSelector(selectStatisticsMemo, isEqual);
	const { memoInfo, normalizeList, nullableList } = useStatisticsGraphics({
		statistics,
		tab,
		date,
	});

	return (
		<div className={st.card}>
			{statistics.status === 'loading' ? (
				<Loader />
			) : (
				<Link to={`/statistics/${statistics.title}`} className={st.link}>
					<section className={st.info}>
						<div className={st.wrap}>
							<h3 className={st.title}>{getStatisticsTitle(statistics.title)}</h3>
							<p className={st.count}>{memoInfo.count}</p>
						</div>
						<StatisticsAmount amount={memoInfo.amount} size="large" />
					</section>
					<div className={st.graph}>
						<GraphicsCard
							statistics={statistics}
							normalizeList={normalizeList}
							nullableList={nullableList}
							graphicsType={graph}
							tab={tab.code}
						/>
					</div>
				</Link>
			)}
		</div>
	);
};

export default memo(StatisticsCard);
