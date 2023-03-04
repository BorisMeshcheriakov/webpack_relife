import cn from 'classnames';
import { DateTime } from 'luxon';
import useModulePermissions from 'library/hooks/module/useModulePermissions';
import { numberWithSeparator } from 'library/helpers/common/strings';

import styles from './index.module.scss';

/* В пропсах приходит информация о заказе и товарах в нем и ценах */

const Prices = ({ order }) => {
	const { isPartner } = useModulePermissions();

	const calcultePartnerPrice = () => {
		let partner = 0;
		for (const item of order.items) {
			if (item.partner_price) {
				partner += item.partner_price.partner_amount * item.count;
			} else {
				partner += item.product.current_price * item.count;
			}
		}

		return partner;
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.label}>Товаров ({order.items.length}) на сумму:</div>
				<div className={styles.value}>
					{numberWithSeparator(order.original_amount / 100)}{' '}
					<span className={styles.currency}>₽</span>
				</div>
			</div>
			{isPartner() ? (
				<div className={styles.content}>
					<div className={styles.label}>Партнерская скидка:</div>
					<div className={cn(styles.value, styles.value_red)}>
						{numberWithSeparator((order.original_amount - calcultePartnerPrice()) / 100)}
						<span className={styles.currency}>₽</span>
					</div>
				</div>
			) : (
				<div className={styles.content}>
					<div className={styles.label}>Скидка по промокоду:</div>
					<div className={cn(styles.value, styles.value_red)}>
						{numberWithSeparator((order.amount - order.original_amount) / 100)}{' '}
						<span className={styles.currency}>₽</span>
					</div>
				</div>
			)}

			<div className={styles.deliveryNotice}>
				<span className={styles.mark}>*</span>Доставка оплачивается при получении
			</div>
			{order.transaction !== null && (
				<div className={styles.date}>
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

			{isPartner() ? (
				<div className={styles.total}>
					<div className={styles.label}>Общая стоимость заказа:</div>
					<div className={styles.value}>
						{numberWithSeparator(calcultePartnerPrice() / 100)}{' '}
						<span className={styles.currency}>₽</span>
					</div>
				</div>
			) : (
				<div className={styles.total}>
					<div className={styles.label}>Итого:</div>
					<div className={styles.value}>
						{numberWithSeparator(order.amount / 100)} <span className={styles.currency}>₽</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Prices;
