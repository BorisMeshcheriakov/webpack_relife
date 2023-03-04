import { Statuses, Part, Overlap } from 'library/helpers/schedules';
import React from 'react';
import cn from 'classnames';

import st from './Border.module.scss';

type Props = {
	status: Statuses;
	part: Part;
	overlap: Overlap;
	isActive: boolean;
	isNow: boolean;
	children: React.ReactNode;
	[x: string]: any;
};

const Border: React.FC<Props> = ({
	status,
	part,
	overlap,
	isActive,
	isNow,
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				st.block,
				st[part],
				st[overlap],
				isActive && st.active,
				st[status],
				isNow && st.now
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export default Border;
