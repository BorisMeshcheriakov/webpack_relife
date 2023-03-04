import React from 'react';
import { getFullName } from 'library/helpers/user';

import { useRecommendation } from 'library/hooks/programs';

import st from './Comment.module.scss';
import { User } from 'library/models/users';

const Comment: React.FC = () => {
	const { recommendation } = useRecommendation();

	const getName = (specialist?: User) => {
		let name = '';
		if (specialist) {
			name = getFullName(specialist);
		}
		return name;
	};
	return (
		<div className={st.comment}>
			{recommendation?.coach.photo && (
				<img className={st.comment__photo} src={recommendation?.coach.photo} alt="" />
			)}
			<p>
				Специалист: <span className={st.comment__name}>{getName(recommendation?.coach)}</span>
			</p>
		</div>
	);
};

export default Comment;
