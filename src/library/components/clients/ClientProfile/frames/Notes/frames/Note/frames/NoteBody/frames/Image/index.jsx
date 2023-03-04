import cn from 'classnames';

import st from './index.module.scss';;

const Image = ({ image, index }) => {
  return (
    <img alt="" src={image} className={cn(st.image, index === 0 && st.first)} /> 
  );
};

export default Image;
