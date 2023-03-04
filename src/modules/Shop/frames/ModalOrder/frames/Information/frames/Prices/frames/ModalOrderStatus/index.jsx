import React from 'react';

import styles from "./index.module.scss";



const ModalOrderStatus = (props) => {

    return (
        <div className={styles.status} style={{backgroundColor: props.backgroundColor}}>{props.title}</div>
    );
}

export default ModalOrderStatus;