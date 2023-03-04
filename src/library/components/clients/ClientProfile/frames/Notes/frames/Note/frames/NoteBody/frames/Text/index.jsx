import st from './index.module.scss';

const Text = ({ text }) => {
  return (
    <p className={st.paragraph}>
      { text }
    </p>
  );
};

export default Text;
