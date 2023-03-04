import React from 'react';
import SVG from 'react-inlinesvg';

import st from './Info.module.scss';

type Props = {
	icon: any;
	data: any;
};

const Info: React.FC<Props> = ({ icon, data }) => {
	return (
		<div className={st.info}>
			<SVG src={icon} className={st.icon} />
			<span>{data}</span>
		</div>
	);
};

export default Info;
