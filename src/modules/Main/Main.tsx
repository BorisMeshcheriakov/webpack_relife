import React from 'react';

import { useCommonSettings } from 'library/hooks/common';

import st from './Main.module.scss';

const Main: React.FC = () => {
	const settings = useCommonSettings();

	return (
		<div className={st.main}>
			{settings.platform_domain && (
				<iframe className={st.frame} title="home" src={`${settings.platform_domain}/home/`} />
			)}
		</div>
	);
};

export default Main;
