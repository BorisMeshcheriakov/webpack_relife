import React from 'react';
import cn from 'classnames';

import st from './NavTab.module.scss';

type Props = {
	isActive: boolean;
	onClick: () => void;
	children: React.ReactNode;
};

const NavTab: React.FC<Props> = ({ children, isActive, onClick }) => {
	return (
		<button className={cn(st.nav, isActive && st.active)} onClick={onClick}>
			{children}
		</button>
	);
};

export default NavTab;
