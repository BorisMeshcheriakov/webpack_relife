import React from 'react';
import { NavLink } from 'react-router-dom';

import { useWebSettings } from 'library/hooks/common';

import st from './index.module.scss';

const Logo: React.FC = () => {
	const { logo, logo_url } = useWebSettings();
	return (
		<div className={st.logo}>
			{logo_url ? (
				<a href={logo_url}>
					<img src={logo ?? ''} alt="" />
				</a>
			) : (
				<NavLink to="/">
					<img src={logo ?? ''} alt="" />
				</NavLink>
			)}
		</div>
	);
};

export default Logo;
