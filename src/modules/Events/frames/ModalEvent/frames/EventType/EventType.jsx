import React from 'react';
import SVG from 'react-inlinesvg';

import cameraIcon from './resources/camera.svg';
import userIcon from './resources/user.svg';

import styles from './EventType.module.scss';

const EventType = ({ type, mode }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.type}>
				<SVG src={mode === 'Offline' ? userIcon : cameraIcon} className={styles.image} alt="type" />
			</div>
			<div className={styles.name}>{type}</div>
		</div>
	);
};

export default EventType;
