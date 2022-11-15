import React from 'react';
import styles from '../Page/NewTask.module.css';
const Description = ({placeholder, value, onChange}) => {
  return (
    <div>
      <div>
        <p className={styles.descriptionTextSmall}>Description</p>
      </div>
      <div className={styles.textarea}>
        <textarea placeholder={placeholder} value={value} onChange={onChange}></textarea>
      </div>
    </div>
  );
};

export default Description;
