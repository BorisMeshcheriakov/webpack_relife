import { FC } from 'react';
import SVG from 'react-inlinesvg';

import cn from 'classnames';
import st from './Description.module.scss';

interface Props {
	title: string | number;
	svg?: string;
	size: 'large' | 'small';
}

const Description: FC<Props> = ({ title, svg, size }) => {
	return (
		<div
			className={cn(st.wrapper, (size === 'small' && st.small) || (size === 'large' && st.large))}
		>
			{svg && <SVG src={svg} className={st.svg} />}
			<p>{title}</p>
		</div>
	);
};

export default Description;
