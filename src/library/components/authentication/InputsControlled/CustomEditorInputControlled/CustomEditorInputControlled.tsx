import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import MaskedInput from 'react-text-mask';

import cn from 'classnames';
import st from './CustomEditorInputControlled.module.scss';

interface Props {
	control: Control<any>;
	name: string;
	error: boolean;
	label: string | undefined;
	mask: RegExp[];
	disabled?: boolean;
	sufix?: string;
}

const CustomEditorInputControlled: FC<Props> = ({
	control,
	label,
	error,
	name,
	mask,
	disabled,
	sufix,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value, onBlur } }) => {
				return (
					<div className={cn(st.controller, error && st.error)}>
						<label
							className={cn(st.label, error && st.error, disabled && st.disabled)}
							htmlFor={name}
						>
							<p>{label}</p>
						</label>
						<div className={st.wrapper}>
							<MaskedInput
								disabled={disabled}
								mask={mask}
								value={value}
								onChange={onChange}
								onBlur={onBlur}
								className={cn(st.input, error && st.error)}
								keepCharPositions={true}
								guide={false}
							/>
							{sufix && <div className={cn(st.sufix, disabled && st.disabled)}>{sufix}</div>}
						</div>
					</div>
				);
			}}
		/>
	);
};

export default CustomEditorInputControlled;
