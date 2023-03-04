import React from 'react';
import cn from 'classnames';
import qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { useModulePermissions } from 'library/hooks/module';

import { resetEvents, selectTab, setSelectedTab } from 'library/redux/events';

import { tabs } from 'library/helpers/events';

import st from './Tabs.module.scss';

const Tabs: React.FC = () => {
	const dispatch = useAppDispatch();
	const tab = useAppSelector(selectTab);
	const { can_sell, can_buy } = useModulePermissions();

	const onTabChange = (tab: string) => {
		dispatch(resetEvents());
		dispatch(setSelectedTab(tab));
	};

	return (
		<>
			<button
				className={cn(st.tab, tab.code === 'all' && st.active)}
				onClick={() => onTabChange(tabs['all'].code)}
			>
				{tabs['all'].title}
			</button>
			{can_buy && (
				<button
					className={cn(st.tab, tab.code === 'rental' && st.active)}
					onClick={() => onTabChange(tabs['rental'].code)}
				>
					{tabs['rental'].title}
				</button>
			)}
			{can_sell && (
				<button
					className={cn(st.tab, tab.code === 'my' && st.active)}
					onClick={() => onTabChange(tabs['my'].code)}
				>
					{tabs['my'].title}
				</button>
			)}
		</>
	);
};

export default Tabs;
