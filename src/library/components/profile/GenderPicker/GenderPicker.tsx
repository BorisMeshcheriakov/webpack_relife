import React from 'react';
import SVG from 'react-inlinesvg';

import st from './GenderPicker.module.scss';

import { icons } from 'resources/icons/profile/';

type Props = {
	register: any;
};

const GenderPicker: React.FC<Props> = ({ register }) => {
	return (
		<div className={st.wrapper} id="select">
			<label htmlFor="select">Пол</label>
			<select {...register}>
				<option value="m">Мужской</option>
				<option value="f">Женский</option>
			</select>
			<SVG src={icons.arrow} className={st.icon} />
		</div>
	);
};

export default GenderPicker;
