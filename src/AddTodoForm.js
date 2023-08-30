import React, { useState} from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./AddTodoForm.module.css";

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
        <form className={style.form} onSubmit={handleAddTodo}>
          <InputWithLabel
            children="Title: "
            value={todoTitle}
            onChange={handleTitleChange}
          />
          <button className={style.addButton} type="submit">Add</button>
        
      </form>

    );
};

export default AddTodoForm;