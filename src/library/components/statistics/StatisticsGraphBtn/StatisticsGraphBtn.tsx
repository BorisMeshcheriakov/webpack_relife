import { FC, memo } from 'react';
import { GraphType, Mode } from 'library/types/statistics';
import { default as icons } from 'resources/icons/statistics/icons';
import { ButtonTooltip } from 'library/components/common';
import { getStatisticsDate } from 'library/helpers/statistics/statisticsDate';

import st from './StatisticsGraphBtn.module.scss';

interface Props {
	graph: GraphType;
	tab: Mode;
	date: string;
	handlerTooltip: () => void;
}

const StatisticsGraphBtn: FC<Props> = ({ graph, date, tab, handlerTooltip }) => {
	return (
		<div className={st.graph}>
			{graph !== 'graphic' ? (
				<ButtonTooltip
					icon={icons.graph}
					handler={handlerTooltip}
					tooltip={'Показать в виде графика'}
					bgColor="white"
				/>
			) : (
				<ButtonTooltip
					icon={icons.hist}
					handler={handlerTooltip}
					tooltip={'Показать в виде диаграммы'}
					bgColor="white"
				/>
			)}

			<p className={st.date}>{getStatisticsDate(date, tab)}</p>
		</div>
	);
};

export default memo(StatisticsGraphBtn);
