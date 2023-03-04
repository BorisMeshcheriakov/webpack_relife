import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

const Block = ({image, title, description, text, isReversed}) => {
    return(
        <div className={cn(styles.wrapper, isReversed && styles.reversed)}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
            <div className={cn(styles.content, !text && image && styles.content_centered)}>
                {
                image &&
                    <div className={styles.image}>
                        <img src={image} alt=""/>
                    </div>
                }
            <div className={styles.text}>
                {text}
            </div>
            </div>
        </div>
    );
}

export default Block;