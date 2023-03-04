import Delivery from './frames/Delivery';
import Prices from './frames/Prices';

import styles from './index.module.scss';

const Information = ({ order }) => {
	return (
		<section className={styles.information}>
			<div className={styles.content}>
				<Delivery order={order} />
				<Prices order={order} />
			</div>
		</section>
	);
};

export default Information;
