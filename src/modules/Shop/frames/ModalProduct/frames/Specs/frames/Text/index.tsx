import React from 'react';
import { DetailAttribute } from 'library/models/shop';

import st from './index.module.scss';

interface Props {
	text: DetailAttribute;
}

const Text = ({ text }: Props): JSX.Element => {
	const allText = text.storage_variations as string[];

	return (
		<div className={st.text}>
			<span className={st.text__title}>{text.title}</span>
			<p>{allText.join(', ')}</p>
		</div>
	);
};

export default Text;
