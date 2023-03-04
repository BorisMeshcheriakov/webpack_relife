import React from 'react';
import cn from 'classnames';

import st from './index.module.scss';

const ButtonRound = ({ children, isActive, handler, theme }) => {

  const getStyle = (theme) => {
    switch(theme) {
      case 'grey':
        return st.grey;
      case 'white':
        return st.white;
      default:
        return st.grey;
    }
  }
  
  return (
    <button 
      className={cn(st.button, getStyle(theme), isActive && st.active)} 
      onClick={handler}
    >
      { children }
    </button>
  );
}

export default ButtonRound;
