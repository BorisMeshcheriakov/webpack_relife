import React from 'react';
import cn from 'classnames';

import st from './styles.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'outlined';
	children?: React.ReactNode;
}

export const IconButton: React.FC<Props> = ({ variant = 'outlined', children }) => {
	return <button className={cn(st.btn, st[variant])}>{children}</button>;
};
