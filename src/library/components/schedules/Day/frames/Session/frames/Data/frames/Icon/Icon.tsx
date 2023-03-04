import React from 'react';
import SVG from 'react-inlinesvg';

type Props = {
	src: string | any;
};

const Icon: React.FC<Props> = ({ src }) => {
	return <SVG src={src} />;
};

export default Icon;
