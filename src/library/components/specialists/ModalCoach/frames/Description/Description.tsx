import React from 'react';

import st from './Description.module.scss';

type Props = {
	description?: string;
};

const Description: React.FC<Props> = ({ description }) => {
	return <>{description && <article className={st.description}>{description}</article>}</>;
};

export default Description;
