import { FC } from 'react';
import SVG from 'react-inlinesvg';

import st from './Description.module.scss';

interface Props {
	title: string | number;
	svg?: string;
}

const Description: FC<Props> = ({ title, svg }) => {
	return (
		<div className={st.wrapper}>
			{svg && <SVG src={svg} className={st.svg} />}
			<p>{title}</p>
		</div>
	);
};

export default Description;
