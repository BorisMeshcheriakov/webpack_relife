import { FC, Dispatch, SetStateAction } from 'react';
import { minutes, hours } from 'library/helpers/events/timePicker';

import st from './TimePopUp.module.scss';

interface Props {
	setChecked: Dispatch<SetStateAction<{ hours: string; minutes: string }>>;
	value: string;
	index: number;
	onChange: (value: string | Date) => void;
	getDate: (value: string, index: number) => Date;
	handler: () => void;
}

const TimePopUp: FC<Props> = ({ setChecked, value, onChange, handler, index, getDate }) => {
	return (
		<div className={st.popap}>
			<div className={st.header}>{value}</div>
			<div className={st.line} />
			<div className={st.main}>
				<div className={st.time}>
					<select
						onChange={(event) =>
							setChecked((prevState) => ({
								...prevState,
								hours: event.target.value,
							}))
						}
						multiple={true}
					>
						{hours.map((item, index) => (
							<option key={index} value={hours[index]}>
								{item}
							</option>
						))}
					</select>
				</div>

				<div className={st.time}>
					<select
						onChange={(event) =>
							setChecked((prevState) => ({
								...prevState,
								minutes: event.target.value,
							}))
						}
						multiple={true}
					>
						{minutes.map((item, index) => (
							<option key={index} value={minutes[index]}>
								{item}
							</option>
						))}
					</select>
				</div>
			</div>
			<button
				type="button"
				className={st.button}
				onClick={() => {
					onChange(getDate(value, index));
					handler();
				}}
			>
				Выбрать время
			</button>
		</div>
	);
};

export default TimePopUp;
