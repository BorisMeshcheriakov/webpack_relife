import styles from './index.module.scss';

const OrderNumber = ({ orderNumber, date }) => {
	return (
		<div className={styles.order__numberDate}>
			<div className={styles.order__number}>Заказ №{orderNumber}&nbsp;</div>
			{/* <div className={styles.order__date}>от&nbsp;{moment(date).format('D MMMM YYYY')}</div> */}
		</div>
	);
};

export default OrderNumber;
