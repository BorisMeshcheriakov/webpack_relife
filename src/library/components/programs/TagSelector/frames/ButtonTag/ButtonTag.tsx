import { FC, memo } from 'react';
import { icons } from 'resources/icons/events';
import SVG from 'react-inlinesvg';

import cn from 'classnames';
import st from './ButtonTag.module.scss';

interface Props {
	id: string;
	onClick: () => void;
	error: boolean;
	selected: number;
	isOpen: boolean;
}

const ButtonTag: FC<Props> = ({ id, onClick, error, selected, isOpen }) => {
	return (
		<div
			className={cn(st.button, selected > 0 && st.number, isOpen && st.open, error && st.error)}
			id={id}
			onClick={onClick}
		>
			<SVG src={icons.filterFix} />
			<p className={cn(st.badge, selected > 0 && st.number)}>{selected > 0 && selected}</p>
		</div>
	);
};

export default memo(ButtonTag);
