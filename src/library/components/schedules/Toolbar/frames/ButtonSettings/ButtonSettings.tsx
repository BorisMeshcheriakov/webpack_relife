import React from 'react';
import { Settings } from '@mui/icons-material';

import { Link, useRouteMatch } from 'react-router-dom';

import st from './ButtonSettings.module.scss';

const ButtonSettings: React.FC = () => {
	const { url } = useRouteMatch();

	return (
		<Link to={`${url}/editor`} className={st.settings}>
			<div className={st.settings__wrap}>
				<Settings />
			</div>
		</Link>
	);
};

export default ButtonSettings;
