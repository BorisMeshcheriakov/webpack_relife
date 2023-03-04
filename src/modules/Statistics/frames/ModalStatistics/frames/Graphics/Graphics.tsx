import { GraphicsModal } from 'library/components/statistics';
import { getStatisticsTitle } from 'library/helpers/statistics/statisticsTitle';
import { useAppSelector } from 'library/hooks/common';
import { useStatisticsGraphics } from 'library/hooks/statistics';
import { selectStatisticsModal } from 'library/redux/statistics';
import { isEqual } from 'lodash';
import { memo } from 'react';
import { useParams } from 'react-router-dom';

import st from './Graphics.module.scss';

const Graphics = () => {
	const queryTab = useParams<{ tab: any }>();
	const { list, tab, date, graphicsType } = useAppSelector(selectStatisticsModal, isEqual);
	const { memoInfo, normalizeList } = useStatisticsGraphics({
		statistics: list,
		date,
		tab,
	});

	return (
		<section className={st.wrapper}>
			<div className={st.main}>
				<div className={st.info}>
					<h3 className={st.title}>{getStatisticsTitle(queryTab.tab)}</h3>
					<p className={st.count}>{memoInfo.count}</p>
				</div>

				<div className={st.graph}>
					<GraphicsModal normalizeList={normalizeList} graphicsType={graphicsType} tab={tab.code} />
				</div>
			</div>
		</section>
	);
};

export default memo(Graphics);
