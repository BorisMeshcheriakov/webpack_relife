import SVG from 'react-inlinesvg';
import { DateTime } from 'luxon';

import cdekIcon from './resourses/cdek.svg';
import styles from './index.module.scss';

const DeliveryCompany = ({ order }) => {
	const METHODS = {
		CDEK_METHOD: 'C',
		PICKUP: 'S',
	};

	return (
		<div className={styles.delivery__container}>
			<div className={styles.delivery__company}>
				{order.carrier === METHODS.CDEK_METHOD ? (
					<SVG src={cdekIcon} alt="cdekIcon"></SVG>
				) : (
					<div className={styles.pickup}>Самовывоз</div>
				)}
			</div>
			{order.carrier === METHODS.CDEK_METHOD && order.delivery_metadata.date_delivery_max && (
				<div className={styles.delivery__date__wrapper}>
					<div className={styles.delivery__text}>Примерная дата доставки</div>
					<div className={styles.delivery__date}>
						{DateTime.fromISO(order.delivery_metadata.date_delivery_max).toLocaleString({
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default DeliveryCompany;
