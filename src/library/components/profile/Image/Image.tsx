import React from 'react';

import st from './Image.module.scss';

interface Props {
	url?: string | null;
	empty: any;
}

const Image: React.FC<Props> = ({ url, empty }) => {
	return <img alt="" src={url ?? empty} className={st.image} />;
};

export default Image;
