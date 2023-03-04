import { Timezone } from 'library/components/schedules';
import React from 'react';

import { Tabs, Search } from './frames';

import st from './Toolbar.module.scss';

const Toolbar: React.FC = () => {
	return (
		<div className={st.toolbar}>
			<div className={st.toolbar__left}>
				<Tabs />
			</div>
			<div className={st.toolbar__right}>
				<Timezone calendar="consultations" />
				<Search />
			</div>
		</div>
	);
};

export default Toolbar;
