import { FC } from 'react';
import { Head, Main, ModalStatistics } from './frames';
import { Route, Switch } from 'react-router-dom';
import { useLoadStatisitcs } from 'library/hooks/statistics';

import st from './Statistics.module.scss';

const Statistics: FC = () => {
	useLoadStatisitcs();
	return (
		<div className={st.container}>
			<Head />
			<div className={st.main}>
				<Main />
			</div>

			<Switch>
				<Route path="/statistics/:tab" component={ModalStatistics} />
			</Switch>
		</div>
	);
};

export default Statistics;
