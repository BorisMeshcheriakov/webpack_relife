import React from 'react';

import { numberWithSeparator } from "library/helpers/common/strings";

import styles from "./index.module.scss";



const OrderPrice = (props) => {

    const price = numberWithSeparator(props.price / 100);     // Цена заказа

    return (
        <div className={styles.order__price}>
            <div className={styles.order__price__text}>Стоимость:&nbsp;&nbsp;</div>
            <div className={styles.order__price__price}>{price}&nbsp;&#8381;</div>
        </div>
    );
}

export default OrderPrice;