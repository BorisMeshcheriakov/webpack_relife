import React from 'react';

import styles from './index.module.scss';

const Tickets = (props) => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.label}>{props.label}</div>
            <div className={styles.value}>{props.value}</div>
        </div>
    );
}

export default Tickets;