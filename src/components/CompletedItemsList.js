import React from 'react';
import TodoListItem from './TodoListItem';

const CompletedItemsList = ({ completedTasks, onCheckboxChange, onRemoveTodo, onEditTodo }) => {
    return (
        <div>
        <ul>
            {completedTasks.map((task) => (
                <TodoListItem
                    key={task.id}
                    todo={task}
                    onCheckboxChange={onCheckboxChange}
                    onRemoveTodo={onRemoveTodo}
                    onEditTodo={onEditTodo}
                />
            ))}
        </ul>
        </div>
    );
}

export default CompletedItemsList;