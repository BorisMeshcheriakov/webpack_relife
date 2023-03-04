import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import st from './Text.module.scss';

type Props = {
	desсription: string;
};

const Text: React.FC<Props> = ({ desсription }) => {
	const { url } = useRouteMatch();
	const { push } = useHistory();
	const maxLength = 300;

	return (
		<section className={st.text}>
			<span>
				{desсription.length <= maxLength ? desсription : `${desсription.slice(0, maxLength)}...  `}
				{desсription.length > maxLength && (
					<span className={st.show} onClick={() => push(`${url}/description`)}>
						Читать полностью
					</span>
				)}
			</span>
		</section>
	);
};

export default Text;
