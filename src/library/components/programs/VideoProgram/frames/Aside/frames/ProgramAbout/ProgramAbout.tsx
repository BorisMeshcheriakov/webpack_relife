import React from 'react';
import cn from 'classnames';

import { Author } from 'library/models/programs';
import { getInitial } from 'library/helpers/user';

import { Card } from 'library/components/ui';

import st from './ProgramAbout.module.scss';

type Props = {
	promoImage: string | undefined;
	author: Author | undefined;
	onClick: () => void;
	isActive: boolean;
};

const ProgramAbout: React.FC<Props> = ({ promoImage, author, onClick, isActive }) => {
	const getName = () => {
		let name = '';
		if (author) {
			const { last_name, first_name, middle_name } = author;
			name = getInitial(first_name, middle_name, last_name);
		}
		return name;
	};

	return (
		<Card className={cn(st.about, isActive && st.active)} onClick={onClick}>
			<img src={promoImage} alt="" />
			<div className={st.about__info}>
				<h4 className={st.about__title}>О программе</h4>
				<span className={st.about__author}>{getName()}</span>
			</div>
		</Card>
	);
};

export default ProgramAbout;
