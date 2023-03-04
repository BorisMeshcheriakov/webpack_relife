import { Toolbar } from 'library/components/ui';
import { default as Head } from '../Head';
import { default as List } from '../List';
import { FC } from 'react';

import st from './EventMain.module.scss';

const EventMain: FC = () => {
	return (
		<>
			<Toolbar styles={st.toolbar}>
				<Head />
			</Toolbar>

			<div className={st.workspace}>
				<List />
			</div>
		</>
	);
};

export default EventMain;
