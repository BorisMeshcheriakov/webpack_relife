import { changeTab, selectTab } from 'library/redux/schedules';
import { TabCode } from 'library/types/schedules';
import { useAppDispatch, useAppSelector } from '../common';

const useTabs = () => {
	const dispatch = useAppDispatch();
	const selected = useAppSelector(selectTab);

	const changeSelectedTab = (tab: TabCode) => {
		dispatch(changeTab(tab));
	};

	return {
		selected,
		change: changeSelectedTab,
	};
};

export default useTabs;
