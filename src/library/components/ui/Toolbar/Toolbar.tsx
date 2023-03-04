import React from 'react';
import cn from 'classnames';

import st from './Toolbar.module.scss';

type Props = {
	children?: React.ReactNode | React.ReactNodeArray;
	styles?: string;
};

const Toolbar: React.FC<Props> = ({ children, styles }) => {
	return <div className={cn(st.toolbar, styles)}>{children}</div>;
};

export default Toolbar;
