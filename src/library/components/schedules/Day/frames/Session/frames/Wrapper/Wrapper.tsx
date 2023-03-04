import React from 'react';
import cn from 'classnames';
import { Statuses, Part, Overlap } from 'library/helpers/schedules';

import st from './Wrapper.module.scss';

type Props = {
	children: React.ReactNode;
	part: Part;
	overlap: Overlap;
	status: Statuses;
	onClick: () => void;
	isNow: boolean;
};

const Wrapper: React.FC<Props> = ({ children, part, overlap, status, onClick, isNow }) => {
	return (
		<div className={cn(st.wrapper, st[part])} onClick={onClick}>
			<div className={cn(st.innerWrapper, st[part], st[overlap], st[status], isNow && st.now)}>
				{children}
			</div>
		</div>
	);
};

export default Wrapper;
