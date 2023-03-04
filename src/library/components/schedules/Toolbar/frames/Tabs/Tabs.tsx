import React from 'react';
import cn from 'classnames';

import { tabs } from 'library/helpers/schedules';

import { useTabs } from 'library/hooks/schedules';

import st from './Tabs.module.scss';

// TODO Tab component

const Tabs: React.FC = () => {
	const { selected, change } = useTabs();
	return (
		<div className={st.tabs}>
			{Object.keys(tabs).map((tab) => (
				<div
					className={cn(st.tab, selected === tabs[tab].code && st.active)}
					key={tab}
					onClick={() => change(tabs[tab].code)}
				>
					{tabs[tab].title}
				</div>
			))}
		</div>
	);
};

export default Tabs;
