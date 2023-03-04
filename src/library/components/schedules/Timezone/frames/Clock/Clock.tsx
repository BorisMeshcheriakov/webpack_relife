import React from 'react';
import SVG from 'react-inlinesvg';

import { icons } from 'resources/icons/schedules';

const Clock: React.FC = () => {
	return <SVG src={icons.clock} />;
};

export default Clock;
