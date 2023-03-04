import React from 'react';

import st from './index.module.scss';

const Tags = ({ coach }) => {

  const getTags = () => {
    return coach.specialization.map((spec) => (spec.title)).join(', ');
  }
  

  return (
    <div className={st.tags}>
      { getTags() }
    </div>
  );
}

export default Tags;
