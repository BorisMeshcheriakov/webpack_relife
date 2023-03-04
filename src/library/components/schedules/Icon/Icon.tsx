import React from 'react';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

import st from './Icon.module.scss';

type Props = {
	isActive: boolean;
	isRemove?: boolean;
	src: string;
};

const Icon: React.FC<Props> = ({ isActive, isRemove, src }) => {
	return <SVG className={cn(st.icon, isActive && st.active, isRemove && st.remove)} src={src} />;
};

export default Icon;
