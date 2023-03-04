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

const Option = ({ isDisabled, isActive, isHighlighted, option }: Props) => {
	return (
		<div
			className={cn(
				st.button,
				st.option,
				isDisabled && st.disabled,
				isActive && st.active,
				isHighlighted && st.highlight
			)}
			key={option.title}
		>
			{option.code ? option.code : option.title}
		</div>
	);
};

export default Option;
