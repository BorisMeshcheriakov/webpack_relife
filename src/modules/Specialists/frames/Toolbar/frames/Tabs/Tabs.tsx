import React from 'react';

import { NavTab } from 'library/components/programs';
import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { selectMode, setMode } from 'library/redux/specialists';
import { modes } from 'library/helpers/schedules';

const Tabs: React.FC = () => {
	const dispatch = useAppDispatch();
	const mode = useAppSelector(selectMode);

	return (
		<>
			{Object.keys(modes).map((key) => (
				<NavTab
					key={key}
					isActive={mode === modes[key].code}
					onClick={() => dispatch(setMode(modes[key].code))}
				>
					{modes[key].editorTitle}
				</NavTab>
			))}
		</>
	);
};

export default Tabs;
