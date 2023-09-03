import React from "react";
import PropTypes from 'prop-types';
import InputWithLabel from "./InputWithLabel";
import style from "./AddTodoForm.module.css";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = React.useState("");

  const handleTitleChange = (e) => {
    const newTodoTitle = e.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    onAddTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle("");
  };

  return (
        <form className={style.form} onSubmit={handleAddTodo}>
        <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
        title="Title"
        children={"Title:"}
        type="text"
        id="TodoTitle"
        ></InputWithLabel>
          <button className={style.addButton} type="submit">Add</button>
        
      </form>

    );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};


export default AddTodoForm;