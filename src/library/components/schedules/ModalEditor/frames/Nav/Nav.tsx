import React from 'react';
import cn from 'classnames';

import { Mode, Info } from './frames';
import { Navigation } from 'library/components/schedules';

import st from './Nav.module.scss';

const Nav: React.FC = () => {
	return (
		<nav className={st.nav}>
			<div className={cn(st.nav__item, st.content_start)}>
				<Mode />
			</div>
			<div className={cn(st.nav__item, st.content_center)}>{/* <Date calendar="editor" /> */}</div>
			<div className={cn(st.nav__item, st.content_end)}>
				{/* <Timezone calendar="editor" /> */}
				<Navigation calendar="editor" />
				<Info />
			</div>
		</nav>
	);
};

export default Nav;
