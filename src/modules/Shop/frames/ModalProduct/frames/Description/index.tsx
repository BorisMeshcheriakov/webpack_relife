import React from 'react';

import st from './index.module.scss';

interface Props {
	text: string;
}

const Description = ({ text }: Props): JSX.Element => (
	<div className={st.text} dangerouslySetInnerHTML={{ __html: text.replaceAll('\r', '</br>') }} />
);

export default Description;
