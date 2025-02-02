/**
 * ToDo Component - A feature-rich todo list implementation
 *
 * Features:
 * - Add/Edit/Delete todo items
 * - Mark items as complete
 * - Persist data in localStorage
 * - Temporary status messages
 * - Keyboard support (Enter to add)
 */

import React, { useEffect, useState, useCallback } from "react";
import todo from "../assets/todo.svg";
import initialTodos from "../assets/data/todos";
import "./todo.css";

// Helper function to initialize todos from localStorage
const getLocalItems = () => {
  try {
    const list = localStorage.getItem("Lists");
    if (list) {
      return JSON.parse(list);
    }
    // Initialize with default todos if none exist
    localStorage.setItem("Lists", JSON.stringify(initialTodos.slice(0, 4)));
    return initialTodos.slice(0, 4);
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

const ToDo = () => {
  // State management for todo functionality
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems);
  const [editItemId, setEditItemId] = useState(null);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [message, setMessage] = useState("");

  // Persist todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("Lists", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [items]);

  const showTemporaryMessage = useCallback((msg, duration = 2000) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), duration);
  }, []);

  const handleInputChange = (e) => {
    setInputData(e.target.value.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const resetForm = () => {
    setInputData("");
    setEditItemId(null);
    setToggleSubmit(true);
  };

  const addItem = () => {
    if (!inputData) {
      showTemporaryMessage("Please enter some ★[ᴛᴏᴅᴏ]★");
      return;
    }

    if (!toggleSubmit) {
      setItems(
        items.map((item) =>
          item.id === editItemId
            ? { ...item, todo: inputData, updatedAt: new Date().toISOString() }
            : item
        )
      );
      showTemporaryMessage("Task updated successfully!");
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        todo: inputData,
        createdAt: new Date().toISOString(),
        completed: false,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      showTemporaryMessage("Task added successfully!");
    }

    resetForm();
  };

  const updateItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setToggleSubmit(false);
      setInputData(itemToEdit.todo);
      setEditItemId(id);
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    if (id === editItemId) {
      resetForm();
    }
    showTemporaryMessage("Task deleted successfully!");
  };

  const toggleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeAll = () => {
    if (items.length === 0) {
      showTemporaryMessage("List is already empty!");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to remove all items?"
    );
    if (confirmDelete) {
      setItems([]);
      localStorage.setItem("Lists", JSON.stringify([]));
      resetForm();
      showTemporaryMessage("All tasks cleared!");
    }
  };

  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src={todo} alt="todo_logo" />
          <figcaption>Add Your List Here : ✌️</figcaption>
        </figure>

        <div className="addItems">
          <input
            type="text"
            placeholder="✍️ Add Items..."
            value={inputData}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            maxLength={100}
            className={message && !inputData ? "input-error" : ""}
          />
          {toggleSubmit ? (
            <i
              className="fa fa-plus add-btn"
              title="Add Item"
              onClick={addItem}
            />
          ) : (
            <i
              className="fa fa-edit edit-btn"
              title="Update Item"
              onClick={addItem}
            />
          )}
        </div>
        <span className="message">{message}</span>

        <div className="showItems">
          {items.map((item) => (
            <div
              className={`eachItem ${item.completed ? "completed" : ""}`}
              key={item.id}
            >
              <h3 onClick={() => toggleComplete(item.id)}>{item.todo}</h3>
              <div className="todo-btn">
                <i
                  className="fa fa-edit edit-btn"
                  title="Edit Item"
                  onClick={() => updateItem(item.id)}
                />
                <i
                  className="fa fa-trash-o del-btn"
                  title="Delete Item"
                  onClick={() => deleteItem(item.id)}
                />
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDo;
