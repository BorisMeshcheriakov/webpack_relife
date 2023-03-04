import { FC } from 'react';
import { useMyTickets } from 'library/hooks/events';

import st from './JoinBtn.module.scss';

interface Props {}

const JoinBtn: FC<Props> = () => {
	const { onBuy } = useMyTickets();
	return (
		<div className={st.wrapper} onClick={onBuy}>
			Принять участие
		</div>
	);
};

export default JoinBtn;
