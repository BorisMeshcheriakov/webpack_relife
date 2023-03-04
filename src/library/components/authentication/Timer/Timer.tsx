import React from 'react';
import { DateTime } from 'luxon';

import st from './Timer.module.scss';

type Props = {
	timeout: number;
	callback: () => void;
};

const Timer: React.FC<Props> = ({ timeout, callback }) => {
	const [time, setTime] = React.useState<number>(timeout);

	React.useEffect(() => {
		if (time > 0) {
			const timeout = setTimeout(() => {
				setTime(time - 1000);
			}, 1000);

			return () => {
				clearTimeout(timeout);
			};
		} else {
			callback();
		}
	}, [time, setTime, callback]);
	return (
		<div className={st.timer}>
			Запрос нового звонка доступен через {DateTime.fromMillis(time).toFormat('mm:ss')}
		</div>
	);
};

export default Timer;
