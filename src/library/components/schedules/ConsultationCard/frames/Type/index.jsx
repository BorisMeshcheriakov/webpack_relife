import React from 'react';
import SVG from 'react-inlinesvg';

import online from './resources/camera.svg';
import offline from './resources/house.svg';

import st from './index.module.scss';

const Type = ({ type }) => {

  const getText = () => {
    switch (type) {
      case 'ON':
        return 'Онлайн'
      case 'OF':
        return 'Личный прием'
      default:
        break;
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'ON':
        return online;
      case 'OF':
        return offline;
      default:
        break;
    }
  }
  
  
  return (
    <div className={st.type}>
      <SVG className={st.type__icon} src={ getIcon() } alt="" />
      <span className={st.type__text}>{ getText() }</span>
    </div>
  )
}

export default Type
