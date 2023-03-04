import React from 'react';
import styles from './index.module.scss';

const Presenter = ({title, description, image}) => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.image}>
                <img src={image} alt=""/>
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    );
}

export default Presenter;