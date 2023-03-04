import React from 'react';
import cn from 'classnames';

import st from './Tab.module.scss';

interface Props {
	isActive: boolean;
	setTab: () => void;
	title: string;
}

const Tab: React.FC<Props> = ({ isActive, setTab, title }) => {
	return (
		<button className={cn(st.tab, isActive && st.active)} onClick={setTab}>
			{title}
		</button>
	);
};

export default Tab;
