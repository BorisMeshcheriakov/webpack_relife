import React from 'react'

import st from './index.module.scss';

const Tags = ({ tags = [] }) => {
  return (
    <span className={st.tags}>
      { tags.map(tag => tag.title).join(', ')}
    </span>
  );
};

export default Tags;
