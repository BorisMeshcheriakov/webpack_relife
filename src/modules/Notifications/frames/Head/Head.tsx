import { FC, memo } from 'react';

import st from './Head.module.scss';

const Head: FC = () => {
	return (
		<section className={st.header}>
			<h3 className={st.title}>Уведомления</h3>
		</section>
	);
};

export default memo(Head);
