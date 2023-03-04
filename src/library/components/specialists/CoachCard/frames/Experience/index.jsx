import st from './index.module.scss';

const Experience = ({ experience }) => {

  const getExperience = (experience) => {
    if (!experience) {
      return; 
    }

    if (experience === 1) {
      return `Стаж работы - ${experience} год`;
    } else if (experience < 5) {
      return `Стаж работы - ${experience} года`;
    } else if (experience > 4) {
      return `Стаж работы - ${experience} лет`;
    }
  };

  return (
    <span className={st.exp}>{ getExperience(experience) }</span>
  )
}

export default Experience
