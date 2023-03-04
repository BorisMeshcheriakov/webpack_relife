import React from 'react';

import st from './index.module.scss';

const Portrait = ({ image }) => {
  return (
    <img src={image} alt="" className={st.portrait} />
  );
}

export default Portrait;
