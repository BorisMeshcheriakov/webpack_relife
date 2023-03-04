import cn from 'classnames';
import SVG from 'react-inlinesvg';
import { DateTime } from 'luxon';

import cdekIcon from './resourses/cdek.svg';

import { numberWithSeparator } from 'library/helpers/common/strings';

import styles from './index.module.scss';

const Delivery = ({ order }) => {
	const METHODS = {
		CDEK_METHOD: 'C',
		PICKUP: 'S',
	};

	return (
		<div className={styles.container}>
			<div className={styles.delivery}>
				<div className={styles.company}>
					{order.carrier === METHODS.CDEK_METHOD ? (
						<SVG src={cdekIcon} alt="cdekIcon" />
					) : (
						<div className={styles.tag}>Самовывоз</div>
					)}
				</div>
				{order.carrier === METHODS.CDEK_METHOD && (
					<div className={styles.price}>
						{numberWithSeparator(order.delivery_metadata.delivery_sum / 100)}&nbsp;₽
					</div>
				)}
			</div>

			<div className={styles.pickUpPoint}>
				<div className={styles.content}>
					<div className={styles.label}>Адрес доставки</div>
					<div className={styles.value}>
						{order.pickup_point.city.title + ', ' + order.pickup_point.address}
					</div>
				</div>
				{order.transaction !== null && (
					<div className={cn(styles.content)}>
						<div className={styles.label}>Дата заказа</div>
						<div className={styles.value}>
							{DateTime.fromISO(order.transaction.created).toLocaleString({
								day: 'numeric',
								month: 'long',
								year: 'numeric',
							})}
						</div>
					</div>
				)}

				<div className={styles.content}>
					<div className={styles.label}>Получатель</div>
					<div className={styles.value}>{order.full_name}</div>
				</div>
				<div className={styles.content}>
					<div className={styles.label}>Телефон </div>
					<div className={styles.value}>{order.phone}</div>
				</div>
				<div className={styles.content}>
					<div className={styles.label}>e-mail </div>
					<div className={styles.value}>{order.email}</div>
				</div>
			</div>
		</div>
	);
};

export default Delivery;
