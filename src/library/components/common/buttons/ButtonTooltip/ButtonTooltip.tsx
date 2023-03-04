import { Tooltip } from '@mui/material';
import { FC } from 'react';
import SVG from 'react-inlinesvg';

import st from './ButtonTooltip.module.scss';
import cn from 'classnames';

interface Props {
	icon: any;
	handler?: (() => void) | undefined;
	tooltip: string | undefined;
	bgColor?: 'white' | 'gray';
}

const ButtonTooltip: FC<Props> = ({ icon, handler, tooltip = '', bgColor = 'gray' }) => {
	return (
		<Tooltip title={tooltip}>
			<button className={cn(st.button, bgColor === 'gray' ? st.gray : st.white)} onClick={handler}>
				<SVG className={st.icon} src={icon} cacheRequests={true} />
			</button>
		</Tooltip>
	);
};

export default ButtonTooltip;
