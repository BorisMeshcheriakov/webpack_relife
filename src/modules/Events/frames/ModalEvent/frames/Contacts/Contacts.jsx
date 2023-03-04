import React from 'react';

import phoneIcon from './resources/phone.svg';
import mailIcon from './resources/mail.svg';

import styles from './Contacts.module.scss';

const Contacts = (props) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>{(props.email || props.phone) && 'Контактная информация'}</div>
			<div className={styles.content}>
				{props.phone && (
					<div className={styles.contact}>
						<img className={styles.icon} src={phoneIcon} alt="" />
						<div className={styles.value}>{props.phone && props.phone}</div>
					</div>
				)}
				{props.email && (
					<div className={styles.contact}>
						<img className={styles.icon} src={mailIcon} alt="" />
						<div className={styles.value}>{props.email}</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Contacts;
