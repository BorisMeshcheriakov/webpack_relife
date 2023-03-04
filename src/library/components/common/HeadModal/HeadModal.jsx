import React from 'react';

import styles from './HeadModal.module.scss';
import logo from 'resources/icons/Logo.svg';

const HeadModal = (props) => {
	return (
		<div className={styles.headerModal} onClick={props.handler} style={props.style}>
			<img src={logo} alt="reLife" />
			<div>{props.title}</div>
		</div>
	);
};

export default HeadModal;
