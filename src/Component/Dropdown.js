import React from 'react';
import styles from '../Page/NewTask.module.css';

const Dropdown = ({value, onChange}) => {
  return (
    <div>
      <form>
        <select name="piority" id="piority" className={styles.selectPiorityTodo} value={value} onChange={onChange}>
          <option value="normal ">normal </option>
          <option value="low">low</option>
          <option value="high">high</option>
        </select>
      </form>
    </div>
  );
};

export default Dropdown;
