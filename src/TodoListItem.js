import React from 'react';
import style from './TodoListItem.module.css';

const TodoListItem = ({ todo, onRemoveTodo }) => {
    const handleRemoveClick = () => {
        onRemoveTodo (todo.id);
    };

    return (
        <li className={style.ListItem}>
        {todo.title}
        <button classname={style.removeButton} type='button' onClick={handleRemoveClick}>Remove</button>        
        </li>
    );
};

export default TodoListItem;
