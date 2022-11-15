import React, {useEffect, useState} from 'react';
import Description from '../Component/Description';
import Dropdown from '../Component/Dropdown';
import Input from '../Component/Input';
import styles from '../Page/NewTask.module.css';
import {v4 as uuidv4} from 'uuid';
import BulkAcion from '../Component/BulkAcion';
import TodoItem from '../Component/TodoItem';
const NewTask = () => {
  const date = new Date();
  const getdate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const storageTodos = JSON.parse(localStorage.getItem('todo'));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(getdate);
  const [piority, setPiority] = useState('normal');
  const updateTitle = event => setTitle(event.target.value);
  const updateDescription = event => setDescription(event.target.value);
  const updateDueDate = event => setDueDate(event.target.value);
  const updatePiority = event => setPiority(event.target.value);
  const [todos, setTodos] = useState(storageTodos ?? []);
  const [check, setcheck] = useState([]);
  const [show, setShow] = useState();
  const [update, setUpdate] = useState([]);
  const [search, setSearch] = useState('');
  const [showhide, setShowhide] = useState(false);
  const [todoIdShowing, setTodoIdShowing] = useState('');
  const handleChangeTask = e => {
    this?.form?.validateFields(e.target);
    // setNewTask(e.target.value);
  };
  const handleAddTodo = () => {
    const id = uuidv4();
    const data = {
      id,
      title,
      description,
      dueDate,
      piority,
    };
    if (title === '') {
      return alert('bạn phải nhập trường title');
    }
    setTodos(prev => [...prev, data]);
    setDescription('');
    setTitle('');
    setPiority('normal');
    setDueDate(getdate);
  };

  const toggleTodo = (id, i) => {
    setcheck(e => [...e, id]);
  };
  const _handleRemove = (id, i) => {
    // if (check === i) {
    const gettodo = JSON.parse(localStorage.getItem('todo'));
    gettodo.splice(i, 1);
    console.log('🚀 ~ file: NewTask.js ~ line 72 ~ handleRemove ~ gettodo', gettodo);
    const jsonTodo = JSON.stringify(gettodo);
    localStorage.setItem('todo', jsonTodo);
    setTodos(gettodo);
    // }
  };
  const handleDeteteCheck = () => {
    const gettodo = JSON.parse(localStorage.getItem('todo'));
    const jsonTodo = JSON.stringify(gettodo.filter(e => !check.includes(e.id)));
    localStorage.setItem('todo', jsonTodo);
    const todo = JSON.parse(localStorage.getItem('todo'));
    console.log('🚀 ~ file: NewTask.js ~ line 84 ~ handleDeteteCheck ~ todo', todo);
    setTodos(todo);
  };
  const _handleShowDetail = (e, i) => {
    const sh = false;
    console.log(!sh);
    setUpdate({
      id: e.id,
      newTask: e.newTask,
      description: e.description,
      today: e.today,
      dropdown: e.dropdown,
    });
    setShow(i);
    setShowhide(!showhide);
  };
  const ChangeNewTask = e => {
    let newEntry = {
      id: update.id,
      ...update,
      newTask: e.target.value,
    };
    setUpdate(newEntry);
  };
  const changeDescription = e => {
    let newEntry = {
      id: update.id,
      ...update,
      description: e.target.value,
    };
    setUpdate(newEntry);
  };
  const changeDueDate = e => {
    let newEntry = {
      id: update.id,
      ...update,
      today: e.target.value,
    };
    setUpdate(newEntry);
  };
  const changeDropdown = e => {
    let newEntry = {
      id: update.id,
      ...update,
      dropdown: e.target.value,
    };
    setUpdate(newEntry);
  };
  const handlUpdate = (id, i) => {
    let filterTodo = [...todos].filter(todo => todo.id !== update.id);
    let updateObject = [...filterTodo, update];
    const jsonTodo = JSON.stringify(updateObject);
    localStorage.setItem('todo', jsonTodo);
    const gettodo = JSON.parse(localStorage.getItem('todo'));

    setTodos(gettodo);
    alert(' cap nhap thanh cong');
    setShow(!i);
  };
  const handleUpdate = ({id, ...others}) => {
    setTodos(prev => prev.map(todoItem => (todoItem.id === id ? {id, ...others} : todoItem)));
    setTodoIdShowing('');
  };

  const handleRemove = ({id}) => {
    console.log('handleRemove', {id});
    setTodos(prev => prev.filter(e => e.id !== id));
  };
  const handleShowDetail = ({id}) => {
    console.log('handleShowDetail', {id});
    setTodoIdShowing(prev => (prev === id ? '' : id));
  };
  const handleCheckTodoItem = ({id, isChecked}) => {
    console.log('handleCheckTodoItem', {id, isChecked});
  };
  const todoAfterFiltered = todos.filter(val => {
    if (!search) {
      return true;
    }
    if (val.title.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    return false;
  });

  const onDebugClick = () => {
    console.log({todos});
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <button onClick={onDebugClick}>debug</button>

        <div className={styles.leftContainer}>
          <div className={styles.header}>
            <h3 className={styles.text}>New Task</h3>
          </div>
          <div className={styles.addTaskInput}>
            <Input placeholder="Add new task..." value={title} onChange={updateTitle} />
          </div>
          {/*  description  */}
          <div className={styles.description}>
            <div>
              <span className={styles.textDescription}>Description</span>
            </div>
            <div className={styles.textareaDescription}>
              <textarea value={description} onChange={updateDescription}></textarea>
            </div>
          </div>
          <div className={styles.dateTime}>
            <div className={styles.dueDate}>
              <span className={styles.textDueDate}>Due Date</span>
              <input type="date" value={dueDate} onChange={updateDueDate} min={dueDate} />
            </div>
            <div className={styles.piority}>
              <span className={styles.textDueDate}>Piority</span>
              <Dropdown value={piority} onChange={updatePiority} />
            </div>
          </div>

          <div className={styles.submit}>
            <button className={styles.add} onClick={handleAddTodo}>
              Add
            </button>
          </div>
        </div>
        <div className={styles.vRuler}>
          <hr className={styles.hr} />
        </div>
        {/* rightcontainer */}
        <div className={styles.rightContainer}>
          <div className={styles.header}>
            <h3 className={styles.text}>To Do List</h3>
          </div>
          <div className={styles.searchTaskInput}>
            <Input placeholder="Search..." onChange={e => setSearch(e.target.value)} />
          </div>
          {todoAfterFiltered.map(todoItem => (
            <TodoItem
              todoIdShowing={todoIdShowing}
              handleUpdate={handleUpdate}
              handleShowDetail={handleShowDetail}
              handleRemove={handleRemove}
              handleCheckTodoItem={handleCheckTodoItem}
              key={todoItem.id}
              {...todoItem}
            />
          ))}
          <div>
            <BulkAcion
              done={styles.done}
              check={styles.check}
              bulkAction={styles.bulkAction}
              btnDoneBulk={styles.btnDoneBulk}
              btnRemoveBulk={styles.btnRemoveBulk}
            />
          </div>
        </div>
        {/* end right */}
      </div>
    </div>
  );
};
export default NewTask;
