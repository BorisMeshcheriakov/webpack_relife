import React from 'react';

import st from './index.module.scss';

const Name = ({ coach }) => {

  const getName = () => {
    const params = ['last_name', 'first_name', 'middle_name'];
    let name = [];
    for (const param of params) {
      if (coach[param]) {
        name.push(coach[param]);
      }
    }

    return name.join(' ');
  }
  

  return (
    <div className={st.name}>
      { getName() }
    </div>
  );
}

export default Name;
