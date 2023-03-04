import { ButtonAssign } from 'library/components/schedules';
import React from 'react';

import st from './Toolbar.module.scss';

const Toolbar = () => {
	return (
		<div className={st.toolbar}>
			<div className={st.toolbar__left}></div>
			<div className={st.toolbar__right}>
				<ButtonAssign />
			</div>
		</div>
	);
};

export default Toolbar;
