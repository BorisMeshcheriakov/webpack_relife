import React from 'react';
import SVG from 'react-inlinesvg';
import cn from 'classnames';

import open from './resources/open.svg';

import st from './index.module.scss';

const ButtonOpenMenu = ({ showMenu, setShowMenu }) => {
  return (
    <button className={cn(st.add, showMenu && st.active)} onClick={() => setShowMenu(!showMenu)}>
        <SVG src={open} alt="" className={st.icon} />
    </button>
  );
}

export default ButtonOpenMenu;
