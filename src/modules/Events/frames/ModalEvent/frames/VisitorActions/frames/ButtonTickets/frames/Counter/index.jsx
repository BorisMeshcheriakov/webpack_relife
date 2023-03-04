import React from 'react';

import st from './index.module.scss';

const Counter = ({ quantity }) => (
  <div className={st.counter}>
    <div className={st.value}>{ quantity }</div>
  </div>
)

export default Counter;