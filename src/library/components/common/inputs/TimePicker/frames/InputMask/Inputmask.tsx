import { FC } from 'react';
import { AccessTime } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { default as MaskedInput } from 'react-text-mask';
import { default as createAutoCorrectedDatePipe } from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

import cn from 'classnames';
import st from './Inputmask.module.scss';

interface Props {
	value: string;
	mask: (string | RegExp)[];
	disabled?: boolean;
	name: any;
	error: string;
	label: string;
	matches: boolean;
	index: number;
	onChange: (...event: any[]) => void;
	onBlur: () => void;
	handler: (...event: any[]) => void;
	getDate: (value: string, index: number) => Date;
}

const Inputmask: FC<Props> = ({
	mask,
	value,
	onChange,
	handler,
	disabled,
	name,
	error,
	label,
	matches,
	getDate,
	index,
	onBlur,
}) => {
	return (
		<div className={cn(st.inputMask, error && st.error)}>
			<label className={cn(st.label, error && st.error, disabled && st.disabled)} htmlFor={name}>
				<p>{label}</p>
			</label>
			<div
				className={cn(st.wrapper__input, error && st.error)}
				onClick={(event) => !disabled && !matches && handler(event)}
			>
				<MaskedInput
					mask={mask}
					pipe={createAutoCorrectedDatePipe('HH:MM')}
					value={value}
					keepCharPositions={true}
					onBlur={onBlur}
					onChange={(event) => {
						event.target.value.length === 5
							? onChange(getDate(event.target.value, index))
							: onChange(event);
					}}
					placeholder={'чч.мм'}
					guide={false}
					disabled={disabled}
					className={st.input}
				/>
				{matches && (
					<IconButton onClick={handler} disabled={disabled}>
						<AccessTime />
					</IconButton>
				)}
			</div>
		</div>
	);
};

export default Inputmask;
