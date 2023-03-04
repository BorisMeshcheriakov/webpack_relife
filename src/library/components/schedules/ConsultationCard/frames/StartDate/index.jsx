import React from 'react';
import SVG from 'react-inlinesvg';
import { DateTime } from 'luxon';

import calendar from './resources/calendar.svg';

import st from './index.module.scss';

const StartDate = ({ date }) => {
  return (
    <div className={st.date}>
      <SVG className={st.date__icon} src={calendar} alt="" />
      <span className={st.date__text}>{ DateTime.fromISO(date).toFormat('DDD') }</span>
    </div>
  );
}

export default StartDate;
