import React from 'react';
import SVG from 'react-inlinesvg';
import { DateTime } from 'luxon';

import clock from './resources/clock.svg';

import st from './index.module.scss';

const Time = ({ date }) => {
  return (
    <div className={st.time}>
      <SVG className={st.time__icon} src={clock} alt="" />
      <span className={st.time__text}>{ DateTime.fromISO(date).toFormat('HH:mm') }</span>
    </div>
  )
}

export default Time
