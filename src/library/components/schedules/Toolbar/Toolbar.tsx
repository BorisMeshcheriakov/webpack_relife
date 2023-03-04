import React from 'react';
import cn from 'classnames';

import { Date, Navigation, Timezone } from 'library/components/schedules';
import { Tabs, ButtonSettings } from './frames';

import { useModuleSettings } from 'library/hooks/module';

import st from './Toolbar.module.scss';

const Toolbar: React.FC = () => {
	const { locationRoot } = useModuleSettings();

	return (
		<>
			<section className={cn(st.toolbar, st.white)}>
				<div className={st.toolbar__item}>{locationRoot === 'schedules' && <Tabs />}</div>
				<Date calendar="consultations" />
				<div className={cn(st.toolbar__item, st.content_end)}>
					<Timezone calendar="consultations" />
					<Navigation calendar="consultations" />
					<ButtonSettings />
				</div>
			</section>
			<section className={st.toolbar}>
				<div className={st.toolbar__item}>{/* <Date calendar="consultations" /> */}</div>
				<div className={cn(st.toolbar__item, st.content_end)}></div>
			</section>
		</>
	);
};

export default Toolbar;
