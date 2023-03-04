import { FC, memo } from 'react';
import { Tab } from 'library/types/statistics';

import st from './Tabs.module.scss';
import cn from 'classnames';

interface Props {
	tab: Tab;
	tabs: { [tab: string]: Tab };
	onTabChange: (tab: Tab) => void;
}

const Tabs: FC<Props> = ({ tab, tabs, onTabChange }) => {
	return (
		<div className={st.tabs}>
			<button
				className={cn(st.tab, tab.code === tabs.year.code && st.active)}
				onClick={() => onTabChange(tabs.year)}
			>
				{tabs.year.title}
			</button>

			<button
				className={cn(st.tab, tab.code === 'month' && st.active)}
				onClick={() => onTabChange(tabs.month)}
			>
				{tabs.month.title}
			</button>
		</div>
	);
};

export default memo(Tabs);
