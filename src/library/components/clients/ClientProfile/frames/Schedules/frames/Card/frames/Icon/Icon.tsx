import { modes } from 'library/helpers/schedules';
import { ModeCode } from 'library/types/schedules';
import React from 'react';
import SVG from 'react-inlinesvg';

import st from './Icon.module.scss';

type Props = {
	type: ModeCode;
};

const Icon: React.FC<Props> = ({ type }) => {
	return (
		<div className={st.icon}>
			<SVG src={modes[type].icon} />
		</div>
	);
};

export default Icon;
