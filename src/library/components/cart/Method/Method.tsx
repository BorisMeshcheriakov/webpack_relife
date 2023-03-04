import st from './Method.module.scss';

import cdek from 'resources/images/cart/cdek.png';
import { useAppSelector } from 'library/hooks/common';
import { selectMetadata } from 'library/redux/cart';

const Method = () => {
	const metadata = useAppSelector(selectMetadata);
	return (
		<div className={st.method}>
			<img className={st.method__image} src={cdek} alt="" />
			{metadata?.total_sum && <span>{metadata.total_sum / 100} ₽</span>}
		</div>
	);
};

export default Method;
