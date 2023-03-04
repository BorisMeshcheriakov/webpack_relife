import React from 'react';
import SVG from 'react-inlinesvg'

import cameraIcon from './resources/camera.svg';
import userIcon from './resources/user.svg';

import styles from './index.module.scss';

const EventType = ({event}) => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.type}>
                {
                    event.mode == 'O'?
                    <SVG src={userIcon} className={styles.user} alt="type"/>
                    :
                    <SVG src={cameraIcon} className={styles.camera} alt="type"/>
                }
            </div>
            <div className={styles.name}>{event.event_type}</div>
        </div>
    );
}

export default EventType;