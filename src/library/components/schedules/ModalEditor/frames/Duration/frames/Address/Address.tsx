import { useAppSelector } from 'library/hooks/common';
import { selectIndexAddress } from 'library/redux/schedules';
import React from 'react';
import SVG from 'react-inlinesvg';

import { icons } from 'resources/icons/schedules';

const Address: React.FC = () => {
	const index = useAppSelector(selectIndexAddress);
	return (
		<>
			<SVG src={icons.house} />
			<span style={{ marginLeft: 5 }}>{index >= 0 ? index + 1 : '--'}</span>
		</>
	);
};

export default Address;
