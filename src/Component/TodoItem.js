import React, {useEffect, useState} from 'react';
import styles from '../Page/NewTask.module.css';
import Description from './Description';
import Dropdown from './Dropdown';
const TodoItem = ({
  id,
  title: _title,
  description: _description,
  dueDate: _dueDate,
  piority: _piority,
  handleUpdate,
  handleRemove,
  handleShowDetail,
  handleCheckTodoItem,
  todoIdShowing,
}) => {
  const [title, setTitle] = useState(_title);
  const [description, setDescription] = useState(_dueDate);
  const [dueDate, setDueDate] = useState(_dueDate);
  const [piority, setPiority] = useState(_piority);
  const [isChecked, setIsChecked] = useState(false);
  const updateTitle = event => setTitle(event.target.value);
  const updateDescription = event => setDescription(event.target.value);
  const updateDueDate = event => setDueDate(event.target.value);
  const updatePiority = event => setPiority(event.target.value);
  const updateIsChecked = event => {
    const {checked} = event.target;
    handleCheckTodoItem({id, isChecked: checked});
    setIsChecked(checked);
  };
  const onUpdateClick = () => handleUpdate({id, title, description, dueDate, piority});
  const onRemoveClick = () => handleRemove({id});
  const onShowDetail = () => handleShowDetail({id});

  useEffect(() => {
    setDescription(_description);
    setDueDate(_dueDate);
    setTitle(_title);
    setPiority(_piority);
  }, [_title, _dueDate, _dueDate, _piority]);

  return (
    <div key={id}>
      <div className={styles.detail}>
        <div className={styles.check}>
          <input type="checkbox" checked={isChecked} onChange={updateIsChecked} />
          <span className={styles.work}>{_title}</span>
        </div>
        <div>
          <button className={styles.btnDetail} onClick={onShowDetail}>
            Detail
          </button>
          <button className={styles.btnRemote} onClick={onRemoveClick}>
            Remove
          </button>
        </div>
      </div>

      {todoIdShowing === id ? (
        <div className={styles.smallContainerRight}>
          <div className={styles.doHomeWork}>
            <input type="text" placeholder="todo title" value={title} onChange={updateTitle} />
          </div>
          <div className={styles}>
            <Description placeholder="todo description..." value={description} onChange={updateDescription} />
          </div>
          <div className={styles.dateTimeTodo}>
            <div className={styles.dueDateTodo}>
              <span className={styles.textDueDateTodo}>Due Date</span>
              <input type="date" value={dueDate} onChange={updateDueDate} />
            </div>
            <div className={styles.piorityTodo}>
              <p className={styles.textPiorityTodo}>Piority</p>
              <Dropdown selectPiority={styles.selectPiorityTodo} value={piority} onChange={updatePiority} />
            </div>
          </div>
          <div className={styles.update}>
            <button className={styles.btnUpdate} onClick={onUpdateClick}>
              Update
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TodoItem;
