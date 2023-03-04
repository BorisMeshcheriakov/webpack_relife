import React from 'react';

import { DescriptionImage } from '..';

import st from './Description.module.scss';

type Props = {
	description: string;
	image: string;
};

const Description: React.FC<Props> = ({ description, image }) => {
	return (
		<div className={st.description}>
			<DescriptionImage image={image} />
			<div className={st.description__text}>{description}</div>
		</div>
	);
};

export default Description;
