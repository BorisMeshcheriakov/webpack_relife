import React from 'react';

import st from './DescriptionImage.module.scss';

type Props = {
	image: any;
};

const DescriptionImage: React.FC<Props> = ({ image }) => {
	return <img className={st.image} src={image} alt="" />;
};

export default DescriptionImage;
