import React from 'react';
import PropTypes from 'prop-types';
import style from './TodoListItem.module.css';

const TodoListItem = ({ todo, onRemoveTodo, onEditTodo }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedTitle, setEditedTitle] = React.useState(todo.title);
    const [isChecked, setIsChecked] = React.useState(false);

    const handleRemoveClick = () => {
        onRemoveTodo (todo.id);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onEditTodo({
            ...todo,
            title: editedTitle,
        });
        setIsEditing(false);
    };

    const handleCancelEditClick = () => {
        setIsEditing(false);
        setEditedTitle(todo.title);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    
    return (
<li className={style.ListItem}>
<input
type='checkbox'
checked={isChecked}
onChange={handleCheckboxChange}
/>
<span
style={{ textDecoration: isChecked ? 'line-through' : 'none' }}
>
    {isEditing ? (
        <>
            <input
                type='text'
                value={editedTitle}
                onChange={handleTitleChange}
            />
            <button type='button' onClick={handleSaveClick}>
                Save
            </button>
            <button type='button' onClick={handleCancelEditClick}>
                Cancel
            </button>
        </>
    ) : (
    
        <>
            {todo.title}
            <div className={style.buttonsContainer}>
            <button type='button' onClick={handleEditClick}>
                Edit
            </button>
            <button type='button' onClick={handleRemoveClick}>              
                Remove
            </button>
        </div>
        </>
    )}
</span>
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
