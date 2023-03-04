import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'library/components/ui';
import { Author } from 'library/models/programs';

import st from './AuthorCard.module.scss';
import { useSpecs } from './hooks';

type Props = {
	author: Author;
};

const AuthorCard: React.FC<Props> = ({ author }) => {
	const { coachSpecs } = useSpecs({ coachSpecIds: author.coach.specialization });
	return (
		<Link to={`/specialists/specialist/${author.coach.id}`}>
			<Card className={st.author}>
				<div className={st.card}>
					<img className={st.card__image} src={author.photo} alt="" />
					<div className={st.card__info}>
						<h4>
							{author.last_name} {author.first_name} {author.middle_name}
						</h4>
						<p className={st.card__specs}>{coachSpecs}</p>
					</div>
				</div>
			</Card>
		</Link>
	);
};

export default AuthorCard;
