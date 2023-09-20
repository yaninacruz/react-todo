import React from 'react';
import PropTypes from 'prop-types';
import style from './TodoListItem.module.css';

const TodoListItem = ({ todo, onRemoveTodo }) => {
    const handleRemoveClick = () => {
        onRemoveTodo (todo.id);
    };

    return (
        <li className={style.ListItem}>
        {todo.title}
        <button className={style.removeButton} type='button' onClick={handleRemoveClick}>Remove</button>        
        </li>
    );
};

TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
