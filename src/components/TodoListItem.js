import React from 'react';
import PropTypes from 'prop-types';
import style from './TodoListItem.module.css';

    const TodoListItem = ({
        todo: { id, title, isChecked: todoIsChecked },
        onRemoveTodo,
        onEditTodo,
        onCheckboxChange,
    }) => {

    const [isEditing, setIsEditing] = React.useState(false);
    const [editedTitle, setEditedTitle] = React.useState(title);
    const [isChecked, setIsChecked] = React.useState(todoIsChecked);

    const handleRemoveClick = () => {
        onRemoveTodo (id);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onEditTodo({
            id,
            title: editedTitle,
            isChecked
        });
        setIsEditing(false);
    };

    const handleCancelEditClick = () => {
        setIsEditing(false);
        setEditedTitle(title);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleCheckboxChange = () => {
        setIsChecked(prev => !prev);
        onCheckboxChange(id);
    };
    
    return (
<li className={style.ListItem}>
<input
type='checkbox'
checked={isChecked}
onChange={handleCheckboxChange}
/>
    {isEditing ? (
        <>
            <input
                type='text'
                value={editedTitle}
                onChange={handleTitleChange}
                style={{ textDecoration: isChecked ? 'line-through' : 'none' }}
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
        <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
            {title}
        </span>
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
</li>
    );
};


TodoListItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isChecked: PropTypes.bool.isRequired,
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onEditTodo: PropTypes.func.isRequired,
    onCheckboxChange: PropTypes.func.isRequired,
};

export default TodoListItem;
