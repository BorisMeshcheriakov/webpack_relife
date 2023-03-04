import React from 'react';
import SVG from 'react-inlinesvg';

import camera from './resources/camera.svg';

import st from './index.module.scss';

const ButtonAddImage = ({ handler }) => {
  return (
    <button className={st.button} onClick={handler}>
      <SVG className={st.icon} alt="" src={camera} />
    </button>
  );
}

export default ButtonAddImage;
