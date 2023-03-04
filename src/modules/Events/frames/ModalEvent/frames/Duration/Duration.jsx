import React, { useState, useEffect } from 'react';

import SVG from 'react-inlinesvg';

import durationIcon from './resources/duration.svg';

import styles from './Duration.module.scss';

const Duration = (props) => {
	const [eventDuration, setEventDuration] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
	});

	useEffect(() => {
		props.time_from && props.time_to && calculateDuration();
	}, [props.time_from, props.time_to]);

	const calculateDuration = () => {
		let duration = new Date(props.time_to) - new Date(props.time_from);

		let seconds = duration / 1000;
		let minute = Math.floor(seconds / 60);
		let hour = Math.floor(minute / 60);
		minute = minute % 60;
		let day = Math.floor(hour / 24);
		hour = hour % 24;

		setEventDuration({
			days: day,
			hours: hour,
			minutes: minute,
		});
	};

	const roundTo10 = (num) => {
		return Math.round(num / 10) * 10;
	};

	const wordHour = (hour) => {
		if (hour === 1 || hour === 21) {
			return 'час';
		} else if ((hour >= 5 && hour <= 20) || hour === 0) {
			return 'часов';
		} else {
			return 'часа';
		}
	};

	const wordDay = (day) => {
		if (day === 1 || day === 21 || day === 31) {
			return 'день';
		} else if ((day >= 5 && day <= 20) || day >= 25) {
			return 'дней';
		} else return 'дня';
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.icon}>
				<SVG src={durationIcon} />
			</div>
			<div className={styles.value}>
				{eventDuration.days >= 1 && eventDuration.days + 1 + ' ' + wordDay(eventDuration.days + 1)}
				{eventDuration.days < 1 &&
					eventDuration.hours > 0 &&
					' ' + eventDuration.hours + ' ' + wordHour(eventDuration.hours)}
				{eventDuration.days < 1 &&
					eventDuration.minutes > 0 &&
					' ' + roundTo10(eventDuration.minutes) + ' ' + 'минут'}
			</div>
		</div>
	);
};

export default Duration;
