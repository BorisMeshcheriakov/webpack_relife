import React from 'react';
import styles from './index.module.scss';

const Author = ({author}) => {

    function getAuthorName(){
        return (
          author.last_name +
          ' ' +
          (author.first_name &&
            `${author.first_name[0]}.`) +
          (author.middle_name &&
            `${author.middle_name[0]}.`)
        )
      }

  return <div className={styles.eventAuthor}>{getAuthorName()}</div>
}

export default Author;
