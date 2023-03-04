import React from 'react';
import cn from 'classnames';

import st from './Nav.module.scss';

const Nav: React.FC = () => {
	return (
		<nav className={st.nav}>
			<div className={st.nav__item}>
				<h3 className={st.nav__title}>Расписание</h3>
			</div>
			<div className={cn(st.nav__item, st.content_end)}></div>
		</nav>
	);
};

export default Nav;
