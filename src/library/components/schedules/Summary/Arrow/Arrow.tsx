import React from 'react';
import SVG from 'react-inlinesvg';

import { icons } from 'resources/icons/schedules';

const Arrow: React.FC = () => {
	return <SVG src={icons.arrow} />;
};

export default Arrow;
