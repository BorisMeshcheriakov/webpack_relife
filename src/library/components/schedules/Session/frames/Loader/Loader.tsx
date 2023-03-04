import React from 'react';

import st from './Loader.module.scss';

const Loader: React.FC = () => {
	return (
		<div className={st.wrapper}>
			<div className={st.loader} />
		</div>
	);
};

export default Loader;
