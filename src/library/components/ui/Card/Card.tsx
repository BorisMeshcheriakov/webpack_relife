import React, { ReactNode, ReactNodeArray } from 'react';
import cn from 'classnames';

import st from './Card.module.scss';

type Props = {
	children?: ReactNode | ReactNodeArray;
	className?: string;
	[x: string]: any;
};

const Card: React.FC<Props> = ({ children, className, onClick }) => {
	return (
		<div onClick={onClick} className={cn(st.card, className)}>
			{children}
		</div>
	);
};

export default Card;
