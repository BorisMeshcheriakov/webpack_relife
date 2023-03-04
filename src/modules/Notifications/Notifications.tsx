import { FC, memo } from 'react';
import { Container, Toolbar } from 'library/components/ui';
import { Head, List } from './frames';

import st from './Notifications.module.scss';

const Notifications: FC = () => {
	return (
		<Container>
			<Toolbar styles={st.toolbar}>
				<Head />
			</Toolbar>

			<div className={st.main}>
				<List />
			</div>
		</Container>
	);
};

export default memo(Notifications);
