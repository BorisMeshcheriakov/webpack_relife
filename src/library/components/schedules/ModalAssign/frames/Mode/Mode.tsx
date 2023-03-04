import React from 'react';
import { ModeCode } from 'library/types/schedules';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { modes } from 'library/helpers/schedules';

import st from './Mode.module.scss';

type Props = {
	mode: ModeCode[];
	changeMode: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
	selectedMode: ModeCode;
};

const Mode: React.FC<Props> = ({ mode, changeMode, selectedMode }) => {
	return mode.length > 1 ? (
		<FormControl>
			<RadioGroup row value={selectedMode} onChange={changeMode}>
				{mode.map((mode) => (
					<FormControlLabel
						key={mode}
						value={mode}
						control={<Radio />}
						label={modes[mode].editorTitle}
					/>
				))}
			</RadioGroup>
		</FormControl>
	) : (
		<div className={st.row__value}>{modes[mode[0]].editorTitle}</div>
	);
};

export default Mode;
