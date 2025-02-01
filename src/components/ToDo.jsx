import React, { useEffect, useState } from 'react'
import todo from '../assets/todo.svg'
import './todo.css'


/* Get items from Local Storage */
const getLocalItems = () => {
    let list = localStorage.getItem('Lists')

    if (list) {
        return JSON.parse(list)
    }
    else {
        return []
    }
}

const ToDo = () => {

    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState(getLocalItems)
    const [editItemId, setEditItemId] = useState(null)
    const [toggleSubmit, setToggleSubmit] = useState(true)

    const [message, setMessage] = useState("")

    /* Add an item */
    const addItem = () => {
        if (!inputData) {
            setMessage("Please enter some ★[ᴛᴏᴅᴏ]★")

            setTimeout(() => {
                setMessage("")
            }, 2000)
        }
        else if (inputData && !toggleSubmit) {
            setItems(
                items.map((item) => {
                    if (item.id === editItemId) {
                        return { ...item, todo: inputData }
                    }
                    return item
                })
            )

            setToggleSubmit(true)
            setInputData('')
            setEditItemId(null)
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), todo: inputData }
            setItems([...items, allInputData])
            setInputData('')
        }
    }

    /* Edit an item */
    const updateItem = (id) => {
        let newEditItem = items.find((item) => {
            return item.id === id
        })

        setToggleSubmit(false)
        setInputData(newEditItem.todo)
        setEditItemId(id)
    }

    /* Delete an item */
    const deleteItem = (id) => {
        console.log("Delete Item Id: " + id)
        const updatedItems = items.filter((item) => {
            return id != item.id
        })

        setItems(updatedItems)
        setToggleSubmit(true)
        setInputData("")
    }

    /* Delete all items */
    const removeAll = () => {
        setItems([])
    }


    /* Add data to Local Storage */
    useEffect(() => {
        localStorage.setItem('Lists', JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src={todo} alt="todo_logo" />
                        <figcaption>Add Your List Here : ✌️ </figcaption>
                    </figure>

                    <div className='addItems'>
                        <input type='text' placeholder='✍️ Add Items...' value={inputData} onChange={(e) => setInputData(e.target.value)} />
                        {
                            toggleSubmit ? <i className='fa fa-plus add-btn' title='Add Item' onClick={addItem} /> :
                                <i className='fa fa-edit edit-btn' title='Update Item' onClick={addItem} />
                        }
                    </div>
                    <span className="message">{message}</span>
                    <div className='showItems'>
                        {
                            items.map((item) => {
                                return (
                                    <div className='eachItem' key={item.id}>
                                        <h3>{item.todo}</h3>
                                        <div className='todo-btn'>
                                            <i className='fa fa-edit edit-btn' title='Edit Item' onClick={() => updateItem(item.id)}></i>
                                            <i className='fa fa-trash-o del-btn' title='Delete Item' onClick={() => deleteItem(item.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* clear all button  */}
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ToDo