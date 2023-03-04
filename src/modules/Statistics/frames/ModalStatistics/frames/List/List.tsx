import { StatisticsCardInfo } from 'library/components/statistics';
import { useAppSelector } from 'library/hooks/common';
import { selectStatisticsModal } from 'library/redux/statistics';
import { isEqual } from 'lodash';
import { FC, memo } from 'react';

import st from './List.module.scss';

const List: FC = () => {
	const { list, tab } = useAppSelector(selectStatisticsModal, isEqual);
	return (
		<div className={st.list}>
			<div className={st.scroller}>
				{list.list.map((item) => {
					return <StatisticsCardInfo statistics={item} tab={tab.code} key={item.date} />;
				})}
			</div>
		</div>
	);
};

export default memo(List);
