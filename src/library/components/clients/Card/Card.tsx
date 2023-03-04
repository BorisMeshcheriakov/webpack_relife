import React, { ReactNode, ReactNodeArray } from 'react';
import cn from 'classnames';

import st from './Card.module.scss';

type Props = {
	children?: ReactNode | ReactNodeArray;
	className?: string;
};

const Card: React.FC<Props> = ({ children, className }) => {
	return <div className={cn(st.card, className)}>{children}</div>;
};

export default Card;
