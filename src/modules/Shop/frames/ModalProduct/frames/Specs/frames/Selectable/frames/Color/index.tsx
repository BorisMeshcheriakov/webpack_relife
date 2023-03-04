import React from 'react';
import cn from 'classnames';

import { SelectableOption } from 'library/models/shop';

import st from './index.module.scss';

type Props = {
	isDisabled: boolean;
	isActive: boolean;
	isHighlighted: boolean;
	option: SelectableOption;
};

const Color: React.FC<Props> = ({ isDisabled, isActive, isHighlighted, option }: Props) => {
	return (
		<div
			className={cn(st.button, st.color, isDisabled && st.disabled)}
			style={{
				border: `1px solid ${isActive ? `#4198c5` : isHighlighted ? '#D0021B' : '#fff'}`,
			}}
		>
			<div className={st.button_background} style={{ backgroundColor: `#${option.code}` }} />
		</div>
	);
};

export default Color;
