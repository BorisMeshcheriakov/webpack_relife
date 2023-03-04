import React from 'react';
import SVG from 'react-inlinesvg';

import st from './index.module.scss';

import tickets from './resources/tickets.svg';

const Tickets = () => (
  <div className={st.tickets}>
    <SVG src={tickets} alt="" className={st.icon} />
    <span>Мои билеты</span>
    <div className={st.dots}>
        <span className={st.dot} />
        <span className={st.dot} />
        <span className={st.dot} />
    </div>
  </div>
);

export default Tickets;