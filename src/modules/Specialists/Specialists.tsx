import React from 'react';

import { Container } from 'library/components/ui';
import { Toolbar, List, Routes } from './frames';

import st from './Specialists.module.scss';

const Specialists: React.FC = () => {
	return (
		<Container>
			<div className={st.specialists}>
				<Toolbar />
				<List />
				<Routes />
			</div>
		</Container>
	);
};

export default Specialists;
