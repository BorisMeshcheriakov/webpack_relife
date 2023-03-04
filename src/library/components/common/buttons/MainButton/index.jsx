import React from 'react';

import styles from "./index.module.scss";


/**
 * Есть стили по умолчанию, если требутеся изменить стили
 * необходимо в пропе стили (объект) указать их как инлайн стили
 * 
 * @param {String} title - что в кнопке будет написано
 * @param {Function} onclickHandler - функция обработчик при клике на кнопку
 * @param {Object} style - css react стили для кнопки
 * 
 * @returns {JSX}
 */
const MainButton = ({ title, onclickHandler, style = {} }) => {

    return (

        <button className={styles.button} style={style} onClick={onclickHandler}>
            {title}
        </button>

    );
}

export default MainButton;