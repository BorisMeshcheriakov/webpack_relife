import React from 'react';
import cn from 'classnames';

import { getInitial } from 'library/helpers/user';

import { Card } from 'library/components/ui';
import { User } from 'library/models/users';

import st from './Recommendation.module.scss';

interface Props {
	isActive: boolean;
	onClick: () => void;
	specialist?: User;
}

const Recommendation: React.FC<Props> = ({ isActive, onClick, specialist }) => {
	const getName = () => {
		let name = '';
		if (specialist) {
			const { last_name, first_name, middle_name } = specialist;
			name = getInitial(first_name, middle_name, last_name);
		}
		return name;
	};

	return (
		<Card className={cn(st.recommendation, isActive && st.active)} onClick={onClick}>
			<div className={st.recommendation__letter}>K</div>
			<div className={st.recommendation__specialist}>
				<span className={st.recommendation__title}>Комментарий специалиста</span>
				<span className={st.recommendation__name}>{getName()}</span>
			</div>
		</Card>
	);
};

export default Recommendation;
