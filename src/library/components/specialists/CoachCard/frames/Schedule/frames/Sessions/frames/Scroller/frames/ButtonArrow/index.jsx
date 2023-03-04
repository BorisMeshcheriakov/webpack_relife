import React from 'react';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

import arrow from './resources/arrow.svg';

import st from './index.module.scss';

const ButtonArrow = ({ handler, direction }) => {
  
  return (
    <button className={st.more} onClick={handler}>
      <SVG alt="" className={cn(st.icon, direction === 'left' && st.left)} src={arrow} />
    </button>
  );
}

export default ButtonArrow;
