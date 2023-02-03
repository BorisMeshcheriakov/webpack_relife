import React from 'react';

import st from './App.scss';

const App: React.FC = () => {
  return (
    <div className={st.app}>
      <header className={st.header}>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptatem facere,
          reprehenderit, tempora odio dolorum perspiciatis neque voluptate nesciunt voluptas quam
          cumque iste nam, minima nisi mollitia nulla cupiditate. Aliquam.
        </h1>
      </header>

      <h1>H1 header</h1>
      <h2>H2 header</h2>
      <h3>H3 header</h3>
      <h4>H4 header</h4>
      <h5>H5 header</h5>
      <h6>H6 header</h6>
    </div>
  );
};

export default App;
