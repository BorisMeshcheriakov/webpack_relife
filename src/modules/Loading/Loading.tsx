import React from 'react';
import st from './Loading.module.scss';

const Loading: React.FC = () => {
	return (
		<div className={st.loader}>
			<div className={st.spinner} />
		</div>
	);
};

export default Loading;
