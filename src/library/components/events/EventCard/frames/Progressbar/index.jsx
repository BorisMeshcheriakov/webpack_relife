import React from 'react';
import styles from './index.module.scss';

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const Progressbar = ({event, value}) => {
    function handleColorDays(days){
        if (days < 0) return 'rgba(0, 0, 0, 0)'
          if (days >= 0 && days <= 7) return '#f5a623'   // оранжевый
          if (days >= 8 && days <= 28) return '#55b183'  // зеленый 
      }

  return (
    <div className={styles.progressbar}>
        <div className={styles.progressbar__group}>
          <span
            className={styles.progressbar__title}>
            Начнется через часов:
          </span>
          <div className={styles.progressbar__image}>
            <CircularProgressbar
              strokeWidth={4}
              value={value}
              minValue={0}
              maxValue={24}
              text={`${value}`}
              styles={buildStyles({
                textSize: '50px',
                textColor: handleColorDays(value),
                pathColor: handleColorDays(value),
                trailColor: '#e8e8e8'
              })}
            />
          </div>
        </div>
    </div>
  )
}

export default Progressbar
