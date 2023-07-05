import React, { useState} from "react";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (e) => {
    const newTodoTitle = e.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!todoTitle) return;

    const newTodo = {
      title: todoTitle,
      id: Date.now(),

    };

    onAddTodo (newTodo);
    setTodoTitle("");
  };

  return (
        <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title </label>
        <input 
        type="text" 
        id="todoTitle"
        name="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange} />
        <button type="submit">Add</button>
      </form>

    );
};

export default AddTodoForm;