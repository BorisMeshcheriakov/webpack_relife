import React from 'react';
import cn from 'classnames';
import { modes } from 'library/helpers/schedules';
import { useAppDispatch, useAppSelector } from 'library/hooks/common';
import { changeMode, selectMode } from 'library/redux/schedules';
import { ModeCode } from 'library/types/schedules';

import st from './Mode.module.scss';
// import { Icon } from 'library/components/schedules';

const Mode: React.FC = () => {
	const dispatch = useAppDispatch();
	const selectedMode = useAppSelector(selectMode);

	const onModeChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
		dispatch(changeMode(e.currentTarget.value as ModeCode));

	return (
		<div className={st.mode}>
			{Object.keys(modes).map((mode) => (
				<button
					key={modes[mode].code}
					value={modes[mode].code}
					onClick={onModeChange}
					className={cn(st.btn, selectedMode === modes[mode].code && st.active)}
				>
					{/* <Icon src={modes[mode].icon} isActive={mode === selectedMode} /> */}
					<span>{modes[mode].editorTitle}</span>
				</button>
			))}
		</div>
	);
};

export default Mode;
