import React, { useState } from 'react';
import Description from '../Component/Description';
import Dropdown from '../Component/Dropdown';
import Input from '../Component/Input';
import styles from '../Page/NewTask.module.css'
import { v4 as uuidv4 } from 'uuid';
const NewTask = () => {

    const date = new Date()

    const getdate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

    const storageTodos = JSON.parse(localStorage.getItem('todo'))
    const [today, setToday] = useState(getdate)
    const [newTask, setNewTask] = useState('')
    const [description, setDescription] = useState('')
    const [dropdownt, setDropdown] = useState('normal')
    const [todos, setTodos] = useState(storageTodos ?? [])
    const [check, setcheck] = useState([])
    const [show, setShow] = useState();
    const [update, setUpdate] = useState([])
    const [search, setSearch] = useState('')
    const [showhide, setShowhide] = useState(false)
    const handleToday = (e) => {
        setToday(e.target.value)
    }
    const handleChangeTask = (e) => {
        this?.form?.validateFields(e.target);
        setNewTask(e.target.value)
    }
    const handleAddTodo = () => {
        const id = uuidv4()
        let data = {
            id, newTask, description, today, dropdownt
        }
        if (newTask !== '') {
            setTodos(prev => {
                const newTodo = [
                    ...prev,
                    data
                ]
                const jsonTodo = JSON.stringify(newTodo)
                localStorage.setItem('todo', jsonTodo)

                return newTodo
            }
            )

        } else {
            alert('bạn phải nhập trường title')
        }
        setDescription('')
        setNewTask('')
        setDropdown('normal')
        setToday(getdate)

        // console.log({ newTask, description, today, dropdownt });
    }

    const toggleTodo = (id, i) => {
        setcheck(e =>
            [
                ...e,
                id
            ]
        )
    }
    console.log({ ...check });
    const eid = check.map((e) => {
        return e


    })
    console.log({ eid });

    const handleRemove = (id, i) => {
        // if (check === i) {
        const gettodo = JSON.parse(localStorage.getItem('todo'))
        gettodo.splice(i, 1)
        console.log("🚀 ~ file: NewTask.js ~ line 72 ~ handleRemove ~ gettodo", gettodo)
        const jsonTodo = JSON.stringify(gettodo)
        localStorage.setItem('todo', jsonTodo)
        setTodos(gettodo)
        // }
    }
    const handleDeteteCheck = () => {
        const gettodo = JSON.parse(localStorage.getItem('todo'))
        // gettodo.splice(i, 1)
        var tesst = gettodo.filter((e, i) => {
            console.log({ e });
        })
        console.log(tesst);

        // const jsonTodo = JSON.stringify(gettodo)
        // localStorage.setItem('todo', jsonTodo)
        // setTodos(gettodo)

        // var i = 0;
        // while (i < todos.length) {
        //     if (todos[i] === check) {
        //         todos.splice(i, 1);
        //     } else {
        //         ++i;
        //     }
        // }
        // return todos;
    }
    const handleShowDetail = (e, i) => {
        const sh = false
        console.log(!sh);
        setUpdate({
            id: e.id,
            newTask: e.newTask,
            description: e.description,
            today: e.today,
            dropdownt: e.dropdownt,
        })
        setShow(i)
        setShowhide(!showhide)
    }
    const ChangeNewTask = (e) => {
        let newEntry = {
            id: update.id,
            ...update,
            newTask: e.target.value,
        }
        setUpdate(newEntry)
    }
    const changeDescription = (e) => {
        let newEntry = {
            id: update.id,
            ...update,
            description: e.target.value,
        }
        setUpdate(newEntry)
    }
    const changeDueDate = (e) => {
        let newEntry = {
            id: update.id,
            ...update,
            today: e.target.value,
            // dropdownt: e.target.value,
        }
        setUpdate(newEntry)
    }
    const changeDropdownt = (e) => {
        let newEntry = {
            id: update.id,
            ...update,
            dropdownt: e.target.value,
        }
        setUpdate(newEntry)
    }
    const handlUpdate = (id, i) => {
        let filterTodo = [...todos].filter(todo => todo.id !== update.id)
        let updateObject = [...filterTodo, update]
        const jsonTodo = JSON.stringify(updateObject)
        localStorage.setItem('todo', jsonTodo)
        const gettodo = JSON.parse(localStorage.getItem('todo'))

        setTodos(
            gettodo
        )
        alert(' cap nhap thanh cong')
        setShow(!i)
    }
    // console.log(todos.filter((e) => e.newTask.includes('phuc')));

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <div className={styles.header}>
                        <h3 className={styles.text}>
                            New Task
                        </h3>
                    </div>
                    <div className={styles.addTaskInput} >
                        <Input placeholder='Add new task...' value={newTask} onChange={handleChangeTask} />
                    </div>
                    {/*  description  */}

                    <div className={styles.description}>

                        <div>
                            <span className={styles.textDescription}>
                                Description
                            </span>
                        </div>
                        <div className={styles.textareaDescription}>
                            <textarea
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                            ></textarea>
                        </div>
                    </div>


                    <div className={styles.dateTime}>
                        <div className={styles.dueDate}>
                            <span className={styles.textDueDate}>Due Date</span>
                            <input type="date"
                                value={today}
                                onChange={handleToday}
                                min={today}
                            />
                        </div>
                        <div className={styles.piority}>
                            <span className={styles.textDueDate}>Piority</span>

                            <Dropdown
                                selectPiority={styles.selectPiority}
                                value={dropdownt}
                                onChange={(e) => { setDropdown(e.target.value) }}

                            />
                        </div>
                    </div>

                    <div className={styles.submit}>
                        <button className={styles.add} onClick={handleAddTodo}>Add</button>
                    </div>
                </div>
                <div className={styles.vRuler}>
                    <hr className={styles.hr} />
                </div>

                {/* rightcontainer */}
                <div className={styles.rightContainer}>
                    <div className={styles.header}>
                        <h3 className={styles.text}>
                            To Do List
                        </h3>
                    </div>
                    <div className={styles.searchTaskInput}>
                        <Input placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    {todos && todos?.filter((val) => {


                        if (search === '') {
                            return val
                        } else if (val.newTask.includes(search)) {
                            return val
                        }
                    }).map((e, i) => {



                        return (
                            <div key={e.id}>

                                <div className={styles.detail} >
                                    <div className={styles.check}>
                                        <input type="checkbox" onChange={() => { toggleTodo(e.id, i) }} name="" id="" />
                                        <span className={styles.work}>{e.newTask}</span>
                                    </div>
                                    <div>
                                        <button className={styles.btnDetail} onClick={() => { handleShowDetail(e, i) }}>Detail</button>
                                        <button className={styles.btnRemote} onClick={() => { handleRemove(e.id, i) }}>Remove</button>
                                    </div>
                                </div>

                                {show === i && showhide === true ? (

                                    <div className={styles.smallContainerRight}>

                                        <div className={styles.doHomeWork}>
                                            <input type="text" placeholder='Do homework' defaultValue={update.newTask}
                                                onChange={(e) => { ChangeNewTask(e) }}


                                            />
                                        </div>

                                        <div className={styles}>
                                            <Description
                                                textDescription={styles.descriptionTextSmall}
                                                textareaDescription={styles.textarea}
                                                placeholder='Lorem ipsum...'
                                                defaultValue={update.description}
                                                onChange={(e) => { changeDescription(e) }}

                                            />

                                        </div>

                                        <div className={styles.dateTimeTodo}>
                                            <div className={styles.dueDateTodo}>
                                                <span className={styles.textDueDateTodo}>Due Date</span>
                                                <input type="date" defaultValue={update.today} onChange={(e) => { changeDueDate(e) }} />
                                            </div>
                                            <div className={styles.piorityTodo}>
                                                <p className={styles.textPiorityTodo}>Piority</p>
                                                <Dropdown selectPiority={styles.selectPiorityTodo}
                                                    defaultValue={update.dropdownt}
                                                    onChange={(e) => { changeDropdownt(e) }}
                                                />


                                            </div>


                                        </div>

                                        <div className={styles.update}>
                                            <button className={styles.btnUpdate} onClick={() => { handlUpdate(e.id, i) }}>Update</button>
                                        </div>
                                    </div>

                                ) : null}

                            </div>


                        )
                    })}

                    <div className={styles.done}>
                        <div className={styles.check}>
                            <span className={styles.bulkAction}>Bulk Action</span>
                        </div>
                        <div>
                            <button className={styles.btnDonelBulk}>Done</button>
                            <button className={styles.btnRemoteBulk} onClick={handleDeteteCheck} >Remote</button>
                        </div>
                    </div>


                </div>


                {/* end right */}
            </div >
        </div>
    );
};

export default NewTask;