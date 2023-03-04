import React from 'react';

import { Container } from 'library/components/ui';
import { Toolbar, List, Routes } from './frames';

import st from './SessionList.module.scss';

const SessionList: React.FC = () => {
	return (
		<Container>
			<div className={st.list}>
				<Toolbar />
				<List />
				<Routes />
			</div>
		</Container>
	);
};

export default SessionList;
