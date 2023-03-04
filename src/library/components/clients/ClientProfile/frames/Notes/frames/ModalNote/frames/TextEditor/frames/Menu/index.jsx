import React from 'react';

import st from './index.module.scss';

const Menu = ({ open, addImage, addVideo, showMenu }) => {
  return (
    <div className={st.menu}>
      { open }
      <div className={st.menu__wrapper + ' ' + (showMenu && st.menu__wrapper_active)}>
        { addImage }
        { addVideo }        
      </div>
    </div>
  );
}

export default Menu;
