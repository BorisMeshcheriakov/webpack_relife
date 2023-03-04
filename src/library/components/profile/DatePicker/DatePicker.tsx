import React, { useState } from 'react';
import cn from 'classnames';
import { month as monthDataset } from 'library/helpers/common/datasets';

import styles from './DatePicker.module.scss';

interface Props {
	onChange: any;
	date: any;
	error: any;
}

const DatePicker: React.FC<Props> = ({ onChange, date, error }) => {
	const [activeTab, setActivTab] = useState('');

	function selectDay(item: any) {
		let dateObj = date;
		dateObj = new Date(dateObj.setDate(item));
		const isoDate = dateObj.toISOString().split('T')[0];
		onChange(isoDate);
		setActivTab('');
	}

	function selectMonth(index: any) {
		let dateObj = date;
		dateObj = new Date(dateObj.setMonth(index));
		const isoDate = dateObj.toISOString().split('T')[0];
		onChange(isoDate);
		setActivTab('');
	}

	function selectYear(item: any) {
		let dateObj = date;
		dateObj = new Date(dateObj.setYear(item));
		const isoDate = dateObj.toISOString().split('T')[0];
		onChange(isoDate);
		setActivTab('');
	}

	function getListDay() {
		var days = [];
		for (var i = 1; i <= 31; i++) {
			days.push(
				<div
					className={styles.itemBirthday}
					key={'days_' + i}
					onClick={(e: any) => selectDay(e.target.textContent)}
				>
					{i}
				</div>
			);
		}
		return days;
	}

	function getListYear() {
		var years = [];
		for (var i = 1930; i <= 2020; i++) {
			years.push(
				<div
					className={styles.itemBirthday}
					key={'year_' + i}
					onClick={(e: any) => selectYear(e.target.textContent)}
				>
					{i}
				</div>
			);
		}
		return years;
	}

	return (
		<div className={styles.boxBirthday}>
			<div className={styles.birthday}>Дата рождения</div>
			<div className={styles.birthday__layer}>Дата рождения</div>
			<div className={cn(styles.dataGroup, error && styles.error)}>
				<div className={styles.parentDay}>
					<div className={styles.day} onClick={() => setActivTab('d')}>
						{date.getDate()}
					</div>
					<div
						className={
							styles.day__overlay + ' ' + (activeTab === 'd' ? styles.day__overlay__active : null)
						}
						onClick={() => setActivTab('')}
					/>
					<div
						className={
							styles.day__block + ' ' + (activeTab === 'd' ? styles.day__block__active : null)
						}
					>
						{getListDay()}
					</div>
				</div>
				<div className={styles.parentDay}>
					<div className={styles.month} onClick={() => setActivTab('m')}>
						{monthDataset.verbal.full.ru[date.getMonth()]}
					</div>
					<div
						className={
							styles.month__overlay +
							' ' +
							(activeTab === 'm' ? styles.month__overlay__active : null)
						}
						onClick={() => setActivTab('')}
					/>
					<div
						className={
							styles.month__block + ' ' + (activeTab === 'm' ? styles.month__block__active : null)
						}
					>
						{monthDataset.verbal.full.ru.map((item, index) => (
							<div className={styles.itemBirthday} key={index} onClick={(e) => selectMonth(index)}>
								{item}
							</div>
						))}
					</div>
				</div>
				<div className={styles.parentDay}>
					<div className={styles.year} onClick={() => setActivTab('y')}>
						{date.getFullYear()}
					</div>
					<div
						className={
							styles.year__overlay + ' ' + (activeTab === 'y' ? styles.year__overlay__active : null)
						}
						onClick={() => setActivTab('')}
					/>
					<div
						className={
							styles.year__block + ' ' + (activeTab === 'y' ? styles.year__block__active : null)
						}
					>
						{getListYear()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DatePicker;
