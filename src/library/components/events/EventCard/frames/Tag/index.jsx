import React from 'react';
import styles from './index.module.scss';

const Tag = ({title='Tag', backgroundColor='#4198C5', color='#FFFFFF'}) => {
    return(
        <div 
        className={styles.wrapper}
        style={{
            backgroundColor,
            color
        }}>{title}</div>
    );
}

export default Tag;