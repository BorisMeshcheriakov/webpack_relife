import { FC } from 'react';
import { EventAddress } from 'library/models/events';

import st from './Way.module.scss';

interface Props {
	address: EventAddress;
}

const Way: FC<Props> = ({ address }) => {
	return (
		<div className={st.wrapper}>
			{address && address.description && <div className={st.title}>Как проехать?</div>}
			<div className={st.description}>{address && address.description}</div>
		</div>
	);
};

export default Way;
