import st from './index.module.scss';

const Preloader = () => {

  const blocks = new Array(5).fill(new Array(7).fill(''));
  return (
    <div className={st.loader}>
      {
        blocks.map((week, idx) => (
          <div key={idx} className={st.week}>
            {
              week.map((day, idx) => <div key={idx} className={st.block}></div>)
            }
          </div>
        ))
      }
    </div>
  );
};

export default Preloader;
