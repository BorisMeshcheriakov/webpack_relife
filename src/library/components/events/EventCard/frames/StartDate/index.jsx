import React from 'react';
import SVG from 'react-inlinesvg'
import cn from 'classnames';

import {month as monthes} from 'library/helpers/common/datasets'

import timeIcon from './resources/time.svg'
import calendarIcon from './resources/calendar.svg'

import styles from './index.module.scss';

const StartDate = ({date}) => {
    function getDate(date){
        const dateObject = new Date(date);
        const day = dateObject.getDate();
        const month = monthes.verbal.full2.ru[dateObject.getMonth()].toLowerCase();
        const year = dateObject.getFullYear();

        return day + ' ' + month + ' ' + year;
    }
    function getTime(date){
        const dateObject = new Date(date);
        const hours = (dateObject.getHours()<10?'0':'') + dateObject.getHours();
        const minutes = (dateObject.getMinutes()<10?'0':'') + dateObject.getMinutes();

        return hours + ':' + minutes;
    }
    return(
        <div className={styles.wrapper}>
            <div className={styles.dateItem}>
                <div className={styles.icon}>
                    <SVG src={calendarIcon}/>
                </div>
                <div className={styles.value}>{ getDate(date) }</div>
            </div>
            <div className={styles.dateItem}>
                <div className={styles.icon}>
                    <SVG src={timeIcon}/>
                </div>
                <div className={styles.value}>{ getTime(date) }</div>
            </div>
        </div>
    );
}

export default StartDate;